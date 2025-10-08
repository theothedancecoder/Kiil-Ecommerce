import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Helper to find image files in public folder
function findImageInPublic(productName, brand) {
  const publicDir = path.join(__dirname, '..', 'public');
  const possiblePaths = [
    `Designers-Guild/cushions/${productName}`,
    `Designers-Guild/throws/${productName}`,
    ` Enzo de Gasperi -${productName}`,
    `Ablo-Blommaert/${productName}`,
    `interior-collection/miscellaneous`,
    `Fritz-Hansen/${productName}`,
    `Skagerak/${productName}`,
  ];

  for (const basePath of possiblePaths) {
    const fullPath = path.join(publicDir, basePath);
    if (fs.existsSync(fullPath)) {
      // Look for main image or lifestyle images
      const files = fs.readdirSync(fullPath, { recursive: true });
      const imageFile = files.find(f => 
        typeof f === 'string' && 
        (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp')) &&
        !f.includes('lifestyle')
      );
      
      if (imageFile) {
        return path.join(fullPath, imageFile);
      }
      
      // If no main image, try lifestyle
      const lifestyleFile = files.find(f => 
        typeof f === 'string' && 
        (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp'))
      );
      
      if (lifestyleFile) {
        return path.join(fullPath, lifestyleFile);
      }
    }
  }
  
  return null;
}

async function uploadMissingImages() {
  try {
    console.log('🖼️  UPLOADING MISSING PRODUCT IMAGES FROM PUBLIC FOLDER\n');
    console.log('=' .repeat(80));

    // Get products without images
    const productsWithoutImages = await client.fetch(
      `*[_type == "product" && !defined(image.asset._ref)] {
        _id,
        name,
        brand,
        slug
      } | order(name asc)`
    );

    console.log(`\nFound ${productsWithoutImages.length} products without images in Sanity\n`);

    let uploadedCount = 0;
    let notFoundCount = 0;

    for (const product of productsWithoutImages) {
      const imagePath = findImageInPublic(product.name, product.brand);
      
      if (imagePath && fs.existsSync(imagePath)) {
        try {
          console.log(`📤 Uploading: ${product.name}`);
          console.log(`   Image: ${path.relative(path.join(__dirname, '..'), imagePath)}`);
          
          // Upload image to Sanity
          const imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
            filename: path.basename(imagePath),
          });

          // Update product with image
          await client
            .patch(product._id)
            .set({
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: imageAsset._id,
                },
              },
              inStock: true,
              stock: 10,
            })
            .commit();

          console.log(`   ✅ Uploaded and linked to product\n`);
          uploadedCount++;
        } catch (error) {
          console.error(`   ❌ Failed to upload: ${error.message}\n`);
        }
      } else {
        console.log(`⏭️  Skipped: ${product.name} - no image found in public folder`);
        notFoundCount++;
      }
    }

    console.log('\n' + '=' .repeat(80));
    console.log('📊 SUMMARY');
    console.log('=' .repeat(80));
    console.log(`✅ Successfully uploaded: ${uploadedCount} images`);
    console.log(`⏭️  Not found in public: ${notFoundCount} products`);
    console.log(`\n💡 Products with uploaded images are now marked as in stock!\n`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

uploadMissingImages()
  .then(() => {
    console.log('✅ Upload process complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Upload process failed:', error);
    process.exit(1);
  });
