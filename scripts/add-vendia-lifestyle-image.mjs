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
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

async function addLifestyleImage() {
  try {
    console.log('🖼️  Adding lifestyle image to Vendia Cafe Table...\n');

    // Get the product
    const product = await client.fetch(
      `*[_type == "product" && slug.current == "vendia-cafe-table"][0] {
        _id,
        name,
        lifestyleImages
      }`
    );

    if (!product) {
      console.log('❌ Vendia Cafe Table not found in Sanity');
      return;
    }

    console.log(`✅ Found product: ${product.name} (${product._id})\n`);

    // Check if lifestyle images already exist
    if (product.lifestyleImages && product.lifestyleImages.length > 0) {
      console.log('⏭️  Product already has lifestyle images, skipping...');
      return;
    }

    // Upload lifestyle image
    const lifestylePath = 'public/Outdoor/Skagerak-by-Fritz-Hansen/Vendia-kafébord/lifestyle/10419549_2.jpg';
    
    if (!fs.existsSync(lifestylePath)) {
      console.log(`❌ Lifestyle image not found: ${lifestylePath}`);
      return;
    }

    console.log('📤 Uploading lifestyle image...');
    const imageId = await uploadImageToSanity(lifestylePath);

    if (!imageId) {
      console.log('❌ Failed to upload lifestyle image');
      return;
    }

    console.log(`✅ Uploaded lifestyle image: ${imageId}\n`);

    // Update product with lifestyle image
    await client
      .patch(product._id)
      .set({
        lifestyleImages: [
          {
            _type: 'image',
            _key: `lifestyle-${Date.now()}`,
            asset: {
              _type: 'reference',
              _ref: imageId
            }
          }
        ]
      })
      .commit();

    console.log('✅ Added lifestyle image to Vendia Cafe Table\n');
    console.log('The lifestyle image will now appear on the product page.');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

addLifestyleImage()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
