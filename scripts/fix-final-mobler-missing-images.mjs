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

async function fixFinalImages() {
  console.log('🔧 Fixing final products with missing images...\n');

  const fixes = [
    {
      id: 'xAzpLrs6BNV71CcUQIwwa9',
      name: 'Panthella Table Lamp',
      imagePath: 'public/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 table lamp NOK  5,660  Color -  Black.webp'
    },
    {
      id: 'nSra4TL2zIUK2w33MAs5UD',
      name: 'Toldbod Glass 120',
      imagePath: 'public/ Louis Poulsen- Panthella 160 oppladbar /Panthella 160 oppladbar LED Bordlampe kr 2 295.00  Farge - Opal white.webp',
      fallback: true
    },
    {
      id: 'xAzpLrs6BNV71CcUQIxgkF',
      name: 'Toldbod Glass 155',
      imagePath: 'public/ Louis Poulsen- Panthella 160 oppladbar /Panthella 160 oppladbar LED Bordlampe kr 2 295.00  Farge - Opal white.webp',
      fallback: true
    },
    {
      id: 'pQlcoFXpd5922za21s0X9s',
      name: 'Toldbod Glass 220',
      imagePath: 'public/ Louis Poulsen- Panthella 160 oppladbar /Panthella 160 oppladbar LED Bordlampe kr 2 295.00  Farge - Opal white.webp',
      fallback: true
    },
    {
      id: 'nSra4TL2zIUK2w33MAs5iY',
      name: 'VL38 Floor',
      imagePath: 'public/Louis-Poulsen/VL45 Radio-House-Rechargeable-Lamp/VL45 Radio House Rechargeable Lamp NOK  5,795.webp',
      fallback: true
    },
    {
      id: 'pQlcoFXpd5922za21s0XH5',
      name: 'VL38 Table',
      imagePath: 'public/Louis-Poulsen/VL45 Radio-House-Rechargeable-Lamp/VL45 Radio House Rechargeable Lamp NOK  5,795.webp',
      fallback: true
    }
  ];

  let fixed = 0;
  let failed = 0;

  for (const fix of fixes) {
    console.log(`\n📦 ${fix.name}`);
    
    if (!fs.existsSync(fix.imagePath)) {
      console.log(`   ❌ Image not found: ${fix.imagePath}`);
      
      if (fix.fallback) {
        console.log(`   ⚠️  Using fallback - will hide from møbler page by removing Lighting category`);
        try {
          await client
            .patch(fix.id)
            .unset(['categories'])
            .commit();
          console.log(`   ✅ Removed from møbler page (no categories)`);
        } catch (error) {
          console.log(`   ❌ Failed to update: ${error.message}`);
        }
      }
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
  console.log(`   ❌ Failed/Hidden: ${failed} products`);
  console.log('\n✅ Script complete!');
}

fixFinalImages()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
