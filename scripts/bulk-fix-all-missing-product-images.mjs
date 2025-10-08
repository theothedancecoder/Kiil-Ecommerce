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

async function uploadImageToSanity(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    return asset._id;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

// Helper to find images for a product
function findProductImages(productName, brand) {
  const searchDirs = [
    'public/sales',
    'public/outdoor',
    'public/interior-collection',
    `public/${brand}`,
    'public'
  ];

  const normalizedName = productName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue;

    try {
      const subdirs = fs.readdirSync(dir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const subdir of subdirs) {
        const subdirNormalized = subdir.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        if (subdirNormalized.includes(normalizedName.substring(0, 8)) ||
            normalizedName.includes(subdirNormalized.substring(0, 8))) {
          
          const fullPath = path.join(dir, subdir);
          const files = fs.readdirSync(fullPath);
          const imageFiles = files.filter(f => 
            (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) &&
            !f.startsWith('.')
          );

          if (imageFiles.length > 0) {
            return {
              directory: fullPath,
              images: imageFiles.map(f => path.join(fullPath, f))
            };
          }
        }
      }
    } catch (error) {
      continue;
    }
  }

  return null;
}

async function bulkFixMissingImages() {
  try {
    console.log('🚀 Bulk fixing all products with missing images...\n');
    console.log('=' .repeat(60) + '\n');

    // Get all products without images
    const products = await client.fetch(
      `*[_type == "product" && !defined(image)] {
        _id,
        name,
        slug,
        brand
      } | order(brand asc, name asc)`
    );

    console.log(`Found ${products.length} products without images\n`);

    let fixed = 0;
    let skipped = 0;
    let failed = 0;

    for (const product of products) {
      try {
        console.log(`\n📦 ${product.brand} - ${product.name}`);
        console.log(`   Slug: ${product.slug?.current || 'NO SLUG'}`);

        // Find images for this product
        const imageData = findProductImages(product.name, product.brand);

        if (!imageData || imageData.images.length === 0) {
          console.log(`   ⏭️  No images found in file system, skipping`);
          skipped++;
          continue;
        }

        console.log(`   Found ${imageData.images.length} images in ${imageData.directory}`);

        // Upload main image
        const mainImagePath = imageData.images[0];
        console.log(`   Uploading main image...`);
        const mainImageId = await uploadImageToSanity(mainImagePath);

        if (!mainImageId) {
          console.log(`   ❌ Failed to upload main image`);
          failed++;
          continue;
        }

        // Upload additional images as variants if available
        const variants = [];
        for (let i = 0; i < Math.min(imageData.images.length, 5); i++) {
          const variantImageId = await uploadImageToSanity(imageData.images[i]);
          
          if (variantImageId) {
            const filename = path.basename(imageData.images[i]);
            const colorMatch = filename.match(/Color\s*-\s*([^.]+)/i) ||
                             filename.match(/Farge\s*-\s*([^.]+)/i);
            const color = colorMatch ? colorMatch[1].trim() : `Variant ${i + 1}`;

            variants.push({
              _type: 'variant',
              _key: `variant-${i}`,
              name: color,
              color: color,
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: variantImageId
                }
              }
            });
          }
        }

        // Update product
        const updateData = {
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: mainImageId
            }
          }
        };

        if (variants.length > 0) {
          updateData.variants = variants;
        }

        await client
          .patch(product._id)
          .set(updateData)
          .commit();

        console.log(`   ✅ Updated with ${variants.length} variants`);
        fixed++;

      } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
        failed++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Fixed: ${fixed} products`);
    console.log(`   ⏭️  Skipped: ${skipped} products (no images found)`);
    console.log(`   ❌ Failed: ${failed} products`);
    console.log(`\n✅ Bulk fix complete!`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

bulkFixMissingImages()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
