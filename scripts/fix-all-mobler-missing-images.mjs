import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Helper to upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`   ⚠️  Image file not found: ${imagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    return asset._id;
  } catch (error) {
    console.error(`   ❌ Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

// Helper to find image file for a product
function findProductImage(brand, productName) {
  const brandDirs = {
    'Montana': 'Montana',
    'Louis Poulsen': 'Louis-Poulsen',
    '&Tradition': '&Tradition',
    'Eilersen': 'Eilersen',
    'Jonas Ihreborn': 'Jonas-Ihreborn'
  };

  const brandDir = brandDirs[brand];
  if (!brandDir) {
    console.log(`   ⚠️  Unknown brand directory for: ${brand}`);
    return null;
  }

  const basePath = `public/${brandDir}`;
  
  if (!fs.existsSync(basePath)) {
    console.log(`   ⚠️  Brand directory not found: ${basePath}`);
    return null;
  }

  // Try to find matching product directory
  const dirs = fs.readdirSync(basePath).filter(item => {
    const fullPath = path.join(basePath, item);
    return fs.statSync(fullPath).isDirectory();
  });

  // Normalize product name for matching
  const normalizedName = productName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const matchingDir = dirs.find(dir => {
    const normalizedDir = dir.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normalizedDir.includes(normalizedName.substring(0, 10)) ||
           normalizedName.includes(normalizedDir.substring(0, 10));
  });

  if (!matchingDir) {
    console.log(`   ⚠️  No matching directory found for: ${productName}`);
    console.log(`   Available dirs: ${dirs.slice(0, 5).join(', ')}...`);
    return null;
  }

  const productPath = path.join(basePath, matchingDir);
  const files = fs.readdirSync(productPath);
  const imageFile = files.find(f => 
    (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) &&
    !f.toLowerCase().includes('lifestyle')
  );

  if (!imageFile) {
    console.log(`   ⚠️  No image file found in: ${productPath}`);
    return null;
  }

  return path.join(productPath, imageFile);
}

async function fixMissingImages() {
  try {
    console.log('🔧 Fixing products with missing images...\n');
    console.log('='.repeat(60) + '\n');

    // Get products without images
    const furnitureCategories = [
      'Seating', 'Chair', 'Sofa', 'Tables', 'Furniture', 
      'Storage', 'Desks', 'Footstools', 'Benches', 'Lighting'
    ];

    const products = await client.fetch(
      `*[_type == "product" && count(categories[@->title in $categories]) > 0 && !defined(image.asset)] | order(brand asc, name asc) {
        _id,
        name,
        brand,
        slug
      }`,
      { categories: furnitureCategories }
    );

    console.log(`Found ${products.length} products without images\n`);

    let fixed = 0;
    let failed = 0;

    for (const product of products) {
      console.log(`\n📦 ${product.brand} - ${product.name}`);
      
      // Skip test product
      if (product.brand === 'Test Brand') {
        console.log(`   ⏭️  Skipping test product`);
        continue;
      }

      // Find and upload image
      const imagePath = findProductImage(product.brand, product.name);
      
      if (!imagePath) {
        console.log(`   ❌ Could not find image`);
        failed++;
        continue;
      }

      console.log(`   📸 Found image: ${path.basename(imagePath)}`);
      const imageId = await uploadImageToSanity(imagePath);

      if (!imageId) {
        console.log(`   ❌ Failed to upload image`);
        failed++;
        continue;
      }

      // Update product with image
      await client
        .patch(product._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageId
            }
          }
        })
        .commit();

      console.log(`   ✅ Image uploaded and linked`);
      fixed++;
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n📊 Results:`);
    console.log(`   ✅ Fixed: ${fixed} products`);
    console.log(`   ❌ Failed: ${failed} products`);
    console.log(`   ⏭️  Skipped: ${products.length - fixed - failed} products`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

fixMissingImages()
  .then(() => {
    console.log('\n✅ Script complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
