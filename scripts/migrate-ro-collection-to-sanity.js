/**
 * Migration script to upload RO Collection products to Sanity
 * Run with: node scripts/migrate-ro-collection-to-sanity.js
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

// Import RO Collection data
let roCollectionTablesData, roCollectionChairsData;
try {
  roCollectionTablesData = require('../lib/roCollectionTablesData.ts').roCollectionTablesData;
  roCollectionChairsData = require('../lib/roCollectionChairsData.ts').roCollectionChairsData;
} catch (error) {
  console.error('❌ Could not import RO Collection data.');
  console.error('Please ensure the data files exist and export the data arrays.');
  console.error('Error:', error.message);
  process.exit(1);
}

// Combine all RO Collection products
const allRoProducts = [...roCollectionTablesData, ...roCollectionChairsData];

if (!Array.isArray(allRoProducts) || allRoProducts.length === 0) {
  console.error('❌ No RO Collection products found or invalid format.');
  process.exit(1);
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
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

// Create RO Collection category and subcategories
async function createRoCollectionCategories() {
  console.log('Creating RO Collection categories...');
  
  const categories = [
    {
      _type: 'category',
      _id: 'category-ro-collection',
      title: 'RO Collection',
      slug: {
        _type: 'slug',
        current: 'ro-collection'
      },
      description: 'Premium Scandinavian furniture from RO Collection'
    },
    {
      _type: 'category',
      _id: 'category-dining-tables',
      title: 'Dining Tables',
      slug: {
        _type: 'slug',
        current: 'dining-tables'
      },
      description: 'Elegant dining tables for memorable dining experiences'
    },
    {
      _type: 'category',
      _id: 'category-dining-chairs',
      title: 'Dining Chairs',
      slug: {
        _type: 'slug',
        current: 'dining-chairs'
      },
      description: 'Sophisticated dining chairs with premium craftsmanship'
    }
  ];
  
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

// Transform RO Collection product to Sanity format
function transformRoProduct(roProduct, categories) {
  const roCollectionCategory = categories.find(cat => cat.title === 'RO Collection');
  const isTable = roProduct.name.toLowerCase().includes('table');
  const subcategory = categories.find(cat => 
    cat.title === (isTable ? 'Dining Tables' : 'Dining Chairs')
  );
  
  return {
    _type: 'product',
    _id: `ro-${roProduct._id}`,
    name: roProduct.name,
    slug: {
      _type: 'slug',
      current: roProduct.slug.current
    },
    description: roProduct.description,
    price: roProduct.price,
    brand: roProduct.brand,
    categories: [
      roCollectionCategory ? {
        _type: 'reference',
        _ref: roCollectionCategory._id
      } : null,
      subcategory ? {
        _type: 'reference',
        _ref: subcategory._id
      } : null
    ].filter(Boolean),
    
    // Stock information
    stock: roProduct.stock || 0,
    inStock: roProduct.inStock !== false,
    
    // Transform variants
    variants: roProduct.variants ? roProduct.variants.map(variant => ({
      _type: 'productVariant',
      name: variant.name,
      price: variant.price || roProduct.price,
      material: variant.material,
      color: variant.color,
      size: variant.size,
      // Note: Images will need to be uploaded separately
      // image: null
    })) : [],
    
    // Additional RO Collection specific fields
    href: roProduct.href,
    roomCategory: isTable ? 'dining-kitchen' : 'dining-kitchen',
    subcategory: isTable ? 'tables' : 'chairs',
    
    // Lifestyle images paths (for later image upload)
    lifestyleImagePaths: roProduct.lifestyleImages || [],
    mainImagePath: roProduct.image,
    
    // Note: Actual image references will be added after image upload
    // image: null,
    // lifestyleImages: [],
  };
}

// Upload images to Sanity (placeholder for now)
async function uploadRoCollectionImages() {
  console.log('\n📸 Image upload functionality...');
  console.log('Note: This script creates product documents without images.');
  console.log('You will need to upload images separately using the Sanity Studio or another script.');
  
  // TODO: Implement actual image upload
  // This would involve:
  // 1. Reading image files from the public directory
  // 2. Uploading them to Sanity assets
  // 3. Getting the asset references
  // 4. Updating product documents with image references
}

// Main migration function
async function migrateRoCollection() {
  try {
    console.log('🚀 Starting RO Collection migration to Sanity...');
    console.log(`Found ${allRoProducts.length} RO Collection products to migrate`);
    console.log(`- Tables: ${roCollectionTablesData.length}`);
    console.log(`- Chairs: ${roCollectionChairsData.length}`);
    
    // Step 1: Create categories
    const categories = await createRoCollectionCategories();
    
    // Step 2: Transform and upload products
    console.log('\n📦 Creating RO Collection products...');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const roProduct of allRoProducts) {
      try {
        const sanityProduct = transformRoProduct(roProduct, categories);
        await client.createOrReplace(sanityProduct);
        console.log(`✅ Created product: ${sanityProduct.name}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error creating product ${roProduct.name}:`, error);
        errorCount++;
      }
    }
    
    // Step 3: Handle images
    await uploadRoCollectionImages();
    
    console.log('\n🎉 RO Collection migration completed!');
    console.log(`✅ Successfully migrated: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('\n🔄 Next steps:');
      console.log('1. Upload product images to Sanity assets');
      console.log('2. Update product documents with image references');
      console.log('3. Update your app to use Sanity data for RO Collection');
      console.log('4. Test the Sanity queries');
      console.log('\nTo use Sanity data instead of static data:');
      console.log('- Update app/(store)/interior/[...category]/page.tsx');
      console.log('- Modify the dining tables/chairs logic to use getProductByCategory()');
    }
    
  } catch (error) {
    console.error('💥 RO Collection migration failed:', error);
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
    console.error('You can get the SANITY_API_TOKEN from your Sanity project dashboard.');
    process.exit(1);
  }
}

// Run migration if called directly
if (require.main === module) {
  checkEnvironment();
  migrateRoCollection();
}

module.exports = { migrateRoCollection, createRoCollectionCategories, transformRoProduct };
