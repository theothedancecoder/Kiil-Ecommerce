import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';

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
      filename: imagePath.split('/').pop(),
    });
    return asset._id;
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function fixSwoonLoungeChair() {
  try {
    console.log('🛋️  Fixing Swoon Lounge Chair...\n');

    const product = await client.fetch(
      `*[_type == "product" && slug.current == "swoon-lounge-chair"][0] {
        _id,
        name,
        image
      }`
    );

    if (!product) {
      console.log('❌ Product not found');
      return;
    }

    console.log(`Found: ${product.name}`);
    console.log(`Has image: ${product.image ? 'Yes' : 'No'}\n`);

    if (product.image) {
      console.log('✅ Product already has image');
      return;
    }

    const imagePath = 'public/sales/Swoon-Lounge-chair/Exhibition model Gjøvik – Swoon Lounge NOK  50,996 Original price was- NOK 50,996.NOK  34,900.webp';

    console.log('Uploading image...');
    const imageId = await uploadImageToSanity(imagePath);

    if (!imageId) {
      console.log('❌ Failed to upload image');
      return;
    }

    console.log('✅ Image uploaded');

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

    console.log('✅ Product updated successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

fixSwoonLoungeChair()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  });
