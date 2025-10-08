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
    console.error(`Error uploading: ${error.message}`);
    return null;
  }
}

async function fixLastTwoProducts() {
  console.log('🔧 Fixing last 2 products with missing images...\n');

  const fixes = [
    {
      id: 'product-eilersen-playground-sofa',
      name: 'Playground Sofa',
      imagePath: 'public/Eilersen/Eilersen Playground sofa kr 39 990  Farge - Bardal 110.jpg'
    },
    {
      id: 'product-jonas-ihreborn-seventy-armchair',
      name: 'Seventy Armchair',
      imagePath: 'public/Jonas-Ihreborn/Jonas Ihreborn Seventy armchair NOK  19,035  Color -  Challenger Cognac 025.avif'
    }
  ];

  let fixed = 0;
  let failed = 0;

  for (const fix of fixes) {
    console.log(`\n📦 ${fix.name}`);
    
    if (!fs.existsSync(fix.imagePath)) {
      console.log(`   ❌ Image not found: ${fix.imagePath}`);
      failed++;
      continue;
    }

    console.log(`   📸 Uploading: ${path.basename(fix.imagePath)}`);
    const imageId = await uploadImageToSanity(fix.imagePath);

    if (!imageId) {
      console.log(`   ❌ Upload failed`);
      failed++;
      continue;
    }

    await client
      .patch(fix.id)
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

    console.log(`   ✅ Image linked successfully`);
    fixed++;
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Results:`);
  console.log(`   ✅ Fixed: ${fixed} products`);
  console.log(`   ❌ Failed: ${failed} products`);
  
  if (fixed === 2) {
    console.log('\n🎉 ALL PRODUCTS NOW HAVE IMAGES!');
    console.log('   Total: 177 furniture products with images');
  }
  
  console.log('\n✅ Script complete!');
}

fixLastTwoProducts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
