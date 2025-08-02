import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-13',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Import static products - using dynamic import for ES modules
let getAllProducts;

async function loadStaticProducts() {
  try {
    // Import the ES module
    const module = await import('../lib/allProducts.ts');
    getAllProducts = module.getAllProducts;
    console.log(`✅ Loaded ${getAllProducts().length} static products`);
  } catch (error) {
    console.error('❌ Could not import static products:', error.message);
    console.log('💡 Make sure lib/allProducts.ts exists and exports getAllProducts function');
    process.exit(1);
  }
}

async function uploadImageToSanity(imagePath, altText = '') {
  try {
    // Check if it's a URL or local path
    if (imagePath.startsWith('http')) {
      console.log(`   📥 Uploading image from URL: ${imagePath}`);
      const response = await fetch(imagePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      const asset = await client.assets.upload('image', Buffer.from(buffer), {
        filename: path.basename(imagePath),
      });
      return asset._id;
    } else {
      // Local file path
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      if (!fs.existsSync(fullPath)) {
        console.log(`   ⚠️  Image not found: ${fullPath}`);
        return null;
      }
      
      console.log(`   📥 Uploading local image: ${imagePath}`);
      const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
        filename: path.basename(imagePath),
      });
      return asset._id;
    }
  } catch (error) {
    console.error(`   ❌ Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

async function createOrUpdateCategory(categoryName) {
  try {
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Check if category exists
    const existingCategory = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]`,
      { slug }
    );
    
    if (existingCategory) {
      console.log(`   ✅ Category exists: ${categoryName}`);
      return existingCategory._id;
    }
    
    // Create new category
    console.log(`   ➕ Creating category: ${categoryName}`);
    const category = await client.create({
      _type: 'category',
      title: categoryName,
      slug: {
        _type: 'slug',
        current: slug,
      },
      description: `${categoryName} products`,
    });
    
    return category._id;
  } catch (error) {
    console.error(`   ❌ Error creating category ${categoryName}:`, error.message);
    return null;
  }
}

async function migrateStaticProduct(staticProduct) {
  try {
    console.log(`\n🔄 Migrating: ${staticProduct.name} (${staticProduct.brand})`);
    
    // Check if product already exists
    const existingProduct = await client.fetch(
      `*[_type == "product" && name == $name && brand == $brand][0]`,
      { name: staticProduct.name, brand: staticProduct.brand }
    );
    
    if (existingProduct) {
      console.log(`   ⏭️  Product already exists, skipping: ${staticProduct.name}`);
      return existingProduct._id;
    }
    
    // Upload main image
    let mainImageRef = null;
    if (staticProduct.image) {
      mainImageRef = await uploadImageToSanity(staticProduct.image, staticProduct.name);
    }
    
    // Upload variant images
    const variants = [];
    if (staticProduct.variants && staticProduct.variants.length > 0) {
      console.log(`   🎨 Processing ${staticProduct.variants.length} variants...`);
      for (const variant of staticProduct.variants) {
        let variantImageRef = null;
        if (variant.image) {
          variantImageRef = await uploadImageToSanity(variant.image, `${staticProduct.name} - ${variant.name}`);
        }
        
        variants.push({
          _type: 'object',
          _key: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: variant.name,
          ...(variantImageRef && {
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: variantImageRef,
              },
              alt: `${staticProduct.name} - ${variant.name}`,
            },
          }),
          ...(variant.color && { color: variant.color }),
          ...(variant.material && { material: variant.material }),
          ...(variant.size && { size: variant.size }),
          ...(variant.price && { price: variant.price }),
        });
      }
    }
    
    // Upload lifestyle images
    const lifestyleImages = [];
    if (staticProduct.lifestyleImages && staticProduct.lifestyleImages.length > 0) {
      console.log(`   🖼️  Processing ${staticProduct.lifestyleImages.length} lifestyle images...`);
      for (const lifestyleImage of staticProduct.lifestyleImages) {
        const lifestyleImageRef = await uploadImageToSanity(lifestyleImage, `${staticProduct.name} lifestyle`);
        if (lifestyleImageRef) {
          lifestyleImages.push({
            _type: 'image',
            _key: `lifestyle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            asset: {
              _type: 'reference',
              _ref: lifestyleImageRef,
            },
            alt: `${staticProduct.name} lifestyle image`,
          });
        }
      }
    }
    
    // Create or get category
    const categoryRef = await createOrUpdateCategory(staticProduct.category);
    
    // Create product document
    const productDoc = {
      _type: 'product',
      name: staticProduct.name,
      slug: {
        _type: 'slug',
        current: staticProduct.href.replace('/', '').replace(/^\/+/, ''),
      },
      ...(mainImageRef && {
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mainImageRef,
          },
          alt: staticProduct.name,
        },
      }),
      description: staticProduct.description,
      price: staticProduct.price,
      brand: staticProduct.brand,
      ...(categoryRef && {
        categories: [
          {
            _type: 'reference',
            _ref: categoryRef,
            _key: `category-${Date.now()}`,
          },
        ],
      }),
      href: staticProduct.href,
      ...(variants.length > 0 && { variants }),
      ...(lifestyleImages.length > 0 && { lifestyleImages }),
      ...(staticProduct.roomCategory && { roomCategory: staticProduct.roomCategory }),
      stock: staticProduct.inStock ? 10 : 0,
      inStock: staticProduct.inStock !== false,
    };
    
    console.log(`   💾 Creating product document...`);
    const createdProduct = await client.create(productDoc);
    console.log(`   ✅ Successfully migrated: ${staticProduct.name}`);
    
    return createdProduct._id;
  } catch (error) {
    console.error(`   ❌ Error migrating product ${staticProduct.name}:`, error.message);
    return null;
  }
}

async function migrateAllStaticProducts() {
  try {
    console.log('🚀 Starting migration of static products to Sanity...\n');
    
    // Check if we have the required environment variables
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ SANITY_API_TOKEN is required for this migration.');
      console.log('💡 Please add your Sanity API token to .env.local:');
      console.log('   SANITY_API_TOKEN=your_token_here');
      console.log('\n📖 Get your token from: https://sanity.io/manage');
      return;
    }
    
    // Load static products
    await loadStaticProducts();
    const staticProducts = getAllProducts();
    console.log(`📦 Found ${staticProducts.length} static products to migrate\n`);
    
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < staticProducts.length; i++) {
      const product = staticProducts[i];
      console.log(`\n[${i + 1}/${staticProducts.length}] Processing: ${product.name}`);
      
      const result = await migrateStaticProduct(product);
      if (result === 'skipped') {
        skipCount++;
      } else if (result) {
        successCount++;
      } else {
        errorCount++;
      }
      
      // Add a small delay to avoid overwhelming Sanity
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n🎉 Migration completed!');
    console.log(`✅ Successfully migrated: ${successCount} products`);
    console.log(`⏭️  Skipped (already exist): ${skipCount} products`);
    console.log(`❌ Failed: ${errorCount} products`);
    
    if (successCount > 0) {
      console.log('\n🔄 Next steps:');
      console.log('1. Run: node scripts/test-sanity-products.js');
      console.log('2. Visit your products page to see all products from Sanity');
      console.log('3. Consider removing the static products file after verification');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Run the migration
migrateAllStaticProducts();
