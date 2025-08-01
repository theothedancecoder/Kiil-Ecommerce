/**
 * Migration script to upload static products to Sanity
 * Run with: node scripts/migrate-products-to-sanity.js
 */

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client. Please install @sanity/client:');
    console.error('npm install @sanity/client');
    process.exit(1);
  }
}
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Register ts-node to handle TypeScript imports
try {
  require('ts-node').register({
    transpileOnly: true,
    compilerOptions: {
      module: 'commonjs',
      moduleResolution: 'node',
      target: 'es2017',
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      skipLibCheck: true
    }
  });
} catch (error) {
  console.error('❌ ts-node is required but not installed.');
  console.error('Please install it with: npm install --save-dev ts-node');
  process.exit(1);
}

// Import your static products data
let allProducts;
try {
  allProducts = require('../lib/allProducts.ts').allProducts;
} catch (error) {
  console.error('❌ Could not import static products data.');
  console.error('Please ensure lib/allProducts.ts exists and exports allProducts.');
  console.error('Error:', error.message);
  process.exit(1);
}

if (!Array.isArray(allProducts) || allProducts.length === 0) {
  console.error('❌ No products found in static data or invalid format.');
  process.exit(1);
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
  apiVersion: '2025-06-13',
});

// Helper function to create slug from string
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Helper function to upload image from URL/path
async function uploadImage(imagePath, filename) {
  try {
    // For now, we'll just return the path as-is
    // In a real migration, you'd upload the actual image files
    console.log(`Would upload image: ${imagePath}`);
    return null; // Return null for now, will need actual image upload logic
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error);
    return null;
  }
}

// Create categories first
async function createCategories() {
  console.log('Creating categories...');
  
  // Extract unique categories from products
  const categorySet = new Set();
  allProducts.forEach(product => {
    categorySet.add(product.category);
  });
  
  const categories = Array.from(categorySet).map(categoryName => ({
    _type: 'category',
    _id: `category-${createSlug(categoryName)}`,
    title: categoryName,
    slug: {
      _type: 'slug',
      current: createSlug(categoryName)
    },
    description: `Products in the ${categoryName} category`
  }));
  
  // Upload categories
  for (const category of categories) {
    try {
      await client.createOrReplace(category);
      console.log(`✅ Created category: ${category.title}`);
    } catch (error) {
      console.error(`❌ Error creating category ${category.title}:`, error);
    }
  }
  
  return categories;
}

// Transform static product to Sanity format
function transformProduct(staticProduct, categories) {
  const categoryRef = categories.find(cat => cat.title === staticProduct.category);
  
  return {
    _type: 'product',
    _id: `product-${staticProduct.id}`,
    name: staticProduct.name,
    slug: {
      _type: 'slug',
      current: createSlug(staticProduct.name)
    },
    description: staticProduct.description,
    price: staticProduct.price,
    brand: staticProduct.brand,
    categories: categoryRef ? [{
      _type: 'reference',
      _ref: categoryRef._id
    }] : [],
    href: staticProduct.href,
    roomCategory: staticProduct.roomCategory,
    stock: staticProduct.inStock ? 10 : 0, // Default stock level
    inStock: staticProduct.inStock !== false,
    
    // Transform variants
    variants: staticProduct.variants ? staticProduct.variants.map(variant => ({
      _type: 'object',
      name: variant.name,
      color: variant.color,
      material: variant.material,
      size: variant.size,
      price: variant.price,
      // image: null, // Will need to upload images separately
    })) : [],
    
    // Note: Images will need to be uploaded separately
    // image: null,
    // lifestyleImages: [],
  };
}

// Main migration function
async function migrateProducts() {
  try {
    console.log('🚀 Starting product migration to Sanity...');
    console.log(`Found ${allProducts.length} products to migrate`);
    
    // Step 1: Create categories
    const categories = await createCategories();
    
    // Step 2: Transform and upload products
    console.log('\n📦 Creating products...');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const staticProduct of allProducts) {
      try {
        const sanityProduct = transformProduct(staticProduct, categories);
        await client.createOrReplace(sanityProduct);
        console.log(`✅ Created product: ${sanityProduct.name}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error creating product ${staticProduct.name}:`, error);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Migration completed!');
    console.log(`✅ Successfully migrated: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('\n🔄 Next steps:');
      console.log('1. Upload product images to Sanity assets');
      console.log('2. Update product documents with image references');
      console.log('3. Test the Sanity queries');
      console.log('4. Enable Sanity products in your app');
    }
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Check environment variables
function checkEnvironment() {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN'
  ];
  
  const missing = required.filter(env => !process.env[env]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(env => console.error(`  - ${env}`));
    console.error('\nPlease set these in your .env.local file');
    process.exit(1);
  }
}

// Run migration if called directly
if (require.main === module) {
  checkEnvironment();
  migrateProducts();
}

module.exports = { migrateProducts, createCategories, transformProduct };
