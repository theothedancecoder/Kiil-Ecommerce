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
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    console.log(`   ✅ Uploaded: ${path.basename(imagePath)}`);
    return asset._id;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function addVippLifestyleImages() {
  try {
    console.log('🖼️  Adding lifestyle images to Vipp products...\n');
    console.log('='.repeat(60) + '\n');

    // Get Vipp products
    const products = await client.fetch(
      `*[_type == "product" && brand match "Vipp*"] {
        _id,
        name,
        slug,
        lifestyleImages
      }`
    );

    console.log(`Found ${products.length} Vipp products\n`);

    // Use the Vipp shower shelf lifestyle image as a generic Vipp lifestyle image
    const lifestyleImagePath = 'public/Montana/Selection/vipp6_showershelf_lifestyle01_low-scaled.webp';
    
    if (!fs.existsSync(lifestyleImagePath)) {
      console.log(`❌ Lifestyle image not found: ${lifestyleImagePath}`);
      return;
    }

    console.log(`📸 Uploading lifestyle image...`);
    const lifestyleImageId = await uploadImageToSanity(lifestyleImagePath);

    if (!lifestyleImageId) {
      console.log(`❌ Failed to upload lifestyle image`);
      return;
    }

    // Add lifestyle image to both products
    for (const product of products) {
      console.log(`\n📦 Processing: ${product.name}`);
      console.log(`   Current lifestyle images: ${product.lifestyleImages?.length || 0}`);

      if (product.lifestyleImages && product.lifestyleImages.length > 0) {
        console.log(`   ⏭️  Product already has lifestyle images, skipping...`);
        continue;
      }

      await client
        .patch(product._id)
        .set({
          lifestyleImages: [
            {
              _type: 'image',
              _key: `lifestyle-${Date.now()}`,
              asset: {
                _type: 'reference',
                _ref: lifestyleImageId
              }
            }
          ]
        })
        .commit();

      console.log(`   ✅ Added lifestyle image to ${product.name}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Vipp lifestyle images added!\n');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

addVippLifestyleImages()
  .then(() => {
    console.log('✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
