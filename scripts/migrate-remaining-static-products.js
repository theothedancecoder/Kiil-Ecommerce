const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Load static products with TypeScript handling
let allProducts;
try {
  // Try different ways to load the static products
  allProducts = require('../lib/allProducts.ts').allProducts || require('../lib/allProducts.ts').default || require('../lib/allProducts.ts');
  if (Array.isArray(allProducts.allProducts)) {
    allProducts = allProducts.allProducts;
  }
} catch (error) {
  console.error('❌ Failed to load static products:', error.message);
  console.log('💡 Make sure lib/allProducts.ts exists and exports allProducts array');
  process.exit(1);
}

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-13',
  useCdn: false,
});

// Brands that are already migrated (skip these)
const MIGRATED_BRANDS = ['UMAGE', 'FLOS', 'Fredericia'];

// Helper function to create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath, altText = '') {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    // Read the image file
    const imageBuffer = fs.readFileSync(fullPath);
    const filename = path.basename(imagePath);
    
    console.log(`📤 Uploading image: ${filename}`);
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`❌ Failed to upload image ${imagePath}:`, error.message);
    return null;
  }
}

// Helper function to create or get category
async function createOrGetCategory(categoryName) {
  try {
    const slug = createSlug(categoryName);
    
    // Check if category already exists
    const existingCategory = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]`,
      { slug }
    );

    if (existingCategory) {
      console.log(`📂 Using existing category: ${categoryName}`);
      return existingCategory._id;
    }

    // Create new category
    console.log(`📂 Creating new category: ${categoryName}`);
    const category = await client.create({
      _type: 'category',
      title: categoryName,
      slug: {
        _type: 'slug',
        current: slug,
      },
      description: `Products in the ${categoryName} category`,
    });

    return category._id;
  } catch (error) {
    console.error(`❌ Failed to create category ${categoryName}:`, error.message);
    return null;
  }
}

// Helper function to check if product already exists
async function productExists(productId) {
  try {
    const existing = await client.fetch(
      `*[_type == "product" && _id == $id][0]`,
      { id: productId }
    );
    return !!existing;
  } catch (error) {
    console.error(`❌ Error checking if product exists:`, error.message);
    return false;
  }
}

// Main function to migrate a single product
async function migrateProduct(product) {
  try {
    console.log(`\n🔄 Processing: ${product.name} (${product.brand})`);

    // Skip if brand is already migrated
    if (MIGRATED_BRANDS.includes(product.brand)) {
      console.log(`⏭️  Skipping ${product.brand} - already migrated`);
      return { success: true, skipped: true };
    }

    // Check if product already exists
    if (await productExists(product.id)) {
      console.log(`⏭️  Product already exists: ${product.name}`);
      return { success: true, skipped: true };
    }

    // Create category
    const categoryId = await createOrGetCategory(product.category);
    if (!categoryId) {
      throw new Error(`Failed to create category: ${product.category}`);
    }

    // Upload main image
    console.log(`📸 Uploading main image...`);
    const mainImage = await uploadImageToSanity(product.image, product.name);
    if (!mainImage) {
      console.warn(`⚠️  No main image for ${product.name}`);
    }

    // Upload variant images
    const variants = [];
    if (product.variants && product.variants.length > 0) {
      console.log(`🎨 Processing ${product.variants.length} variants...`);
      
      for (const variant of product.variants) {
        const variantImage = variant.image ? await uploadImageToSanity(variant.image, `${product.name} - ${variant.name}`) : null;
        
        variants.push({
          _type: 'object',
          _key: createSlug(variant.name),
          name: variant.name,
          image: variantImage,
          color: variant.color || null,
          material: variant.material || null,
          size: variant.size || null,
          price: variant.price || null,
        });
      }
    }

    // Upload lifestyle images
    const lifestyleImages = [];
    if (product.lifestyleImages && product.lifestyleImages.length > 0) {
      console.log(`🖼️  Processing ${product.lifestyleImages.length} lifestyle images...`);
      
      for (const lifestyleImage of product.lifestyleImages) {
        const uploadedImage = await uploadImageToSanity(lifestyleImage, `${product.name} lifestyle`);
        if (uploadedImage) {
          lifestyleImages.push(uploadedImage);
        }
      }
    }

    // Create product document
    console.log(`💾 Creating product document...`);
    const productDoc = {
      _id: product.id,
      _type: 'product',
      name: product.name,
      slug: {
        _type: 'slug',
        current: createSlug(product.name),
      },
      image: mainImage,
      description: product.description,
      price: product.price,
      brand: product.brand,
      categories: [
        {
          _type: 'reference',
          _ref: categoryId,
        },
      ],
      href: product.href,
      variants: variants,
      lifestyleImages: lifestyleImages,
      roomCategory: product.roomCategory || null,
      stock: 10, // Default stock
      inStock: product.inStock !== false,
    };

    // Create the product in Sanity
    const result = await client.create(productDoc);
    console.log(`✅ Successfully migrated: ${product.name}`);
    
    return { success: true, productId: result._id };

  } catch (error) {
    console.error(`❌ Failed to migrate ${product.name}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Main migration function
async function migrateAllProducts() {
  console.log('🚀 Starting migration of remaining static products to Sanity...\n');
  
  // Filter out already migrated brands
  const productsToMigrate = allProducts.filter(product => 
    !MIGRATED_BRANDS.includes(product.brand)
  );

  console.log(`📊 Found ${productsToMigrate.length} products to migrate`);
  console.log(`📊 Skipping ${MIGRATED_BRANDS.join(', ')} (already migrated)\n`);

  const results = {
    total: productsToMigrate.length,
    successful: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  // Process products one by one
  for (let i = 0; i < productsToMigrate.length; i++) {
    const product = productsToMigrate[i];
    
    console.log(`\n📈 Progress: ${i + 1}/${productsToMigrate.length}`);
    
    const result = await migrateProduct(product);
    
    if (result.success) {
      if (result.skipped) {
        results.skipped++;
      } else {
        results.successful++;
      }
    } else {
      results.failed++;
      results.errors.push({
        product: product.name,
        error: result.error,
      });
    }

    // Add a small delay to avoid overwhelming Sanity
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Print final results
  console.log('\n' + '='.repeat(50));
  console.log('📊 MIGRATION COMPLETE!');
  console.log('='.repeat(50));
  console.log(`✅ Successful: ${results.successful}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📊 Total: ${results.total}`);

  if (results.errors.length > 0) {
    console.log('\n❌ Errors:');
    results.errors.forEach(error => {
      console.log(`  - ${error.product}: ${error.error}`);
    });
  }

  if (results.successful > 0) {
    console.log('\n🎉 Migration completed successfully!');
    console.log('💡 Next steps:');
    console.log('  1. Set USE_SANITY_PRODUCTS=true in your environment');
    console.log('  2. Test your products page');
    console.log('  3. Deploy to production');
  }
}

// Run the migration
if (require.main === module) {
  migrateAllProducts().catch(console.error);
}

module.exports = { migrateAllProducts, migrateProduct };
