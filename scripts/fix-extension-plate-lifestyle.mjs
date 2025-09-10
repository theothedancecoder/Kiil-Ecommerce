#!/usr/bin/env node

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function uploadImageToSanity(imagePath, description) {
  try {
    const fullPath = join(projectRoot, 'public', imagePath);
    
    if (!existsSync(fullPath)) {
      console.log(`❌ Image not found: ${fullPath}`);
      return null;
    }

    console.log(`📤 Uploading: ${description}...`);
    
    const imageBuffer = readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: `${description.toLowerCase().replace(/\s+/g, '-')}.webp`,
    });

    console.log(`✅ Uploaded: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${description}:`, error.message);
    return null;
  }
}

async function fixExtensionPlateLifestyle() {
  console.log('🔧 Fixing Extension Plate lifestyle image...\n');

  // Find the Extension Plate product
  const query = `
    *[_type == "product" && "ro-collection" in categories[]->slug.current && slug.current == "extension-plate-rectangular"][0] {
      _id,
      name,
      slug,
      lifestyleImages[] {
        asset-> {
          _id,
          url
        }
      }
    }
  `;

  const product = await client.fetch(query);
  
  if (!product) {
    console.log('❌ Extension Plate product not found');
    return;
  }

  console.log(`📦 Found product: ${product.name}`);
  console.log(`📦 Product ID: ${product._id}`);
  
  if (product.lifestyleImages && product.lifestyleImages.length > 0) {
    console.log(`📸 Current lifestyle images: ${product.lifestyleImages.length}`);
    product.lifestyleImages.forEach((img, i) => {
      console.log(`   ${i + 1}. Asset ID: ${img.asset?._id}`);
      console.log(`      URL: ${img.asset?.url}`);
    });
  } else {
    console.log('❌ No lifestyle images found');
  }

  // Upload a fresh lifestyle image
  const lifestylePath = '/Ro-Collection/lifestyle/Gal_2_724663c2-5a86-4611-8289-baf4b34e6c5e.webp';
  const lifestyleAsset = await uploadImageToSanity(lifestylePath, 'Extension Plate Lifestyle');

  if (!lifestyleAsset) {
    console.log('❌ Failed to upload lifestyle image');
    return;
  }

  // Force update the lifestyle images
  console.log('🔄 Updating lifestyle images...');
  
  await client
    .patch(product._id)
    .set({
      lifestyleImages: [{
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: lifestyleAsset._id
        }
      }]
    })
    .commit();

  console.log('✅ Updated Extension Plate with fresh lifestyle image');

  // Verify the update
  const updatedProduct = await client.fetch(`
    *[_id == $id][0] {
      _id,
      name,
      lifestyleImages[] {
        asset-> {
          _id,
          url
        }
      }
    }
  `, { id: product._id });

  console.log('\n🔍 Verification:');
  console.log(`📦 Product: ${updatedProduct.name}`);
  if (updatedProduct.lifestyleImages && updatedProduct.lifestyleImages.length > 0) {
    console.log(`✅ Lifestyle images: ${updatedProduct.lifestyleImages.length}`);
    updatedProduct.lifestyleImages.forEach((img, i) => {
      console.log(`   ${i + 1}. Asset ID: ${img.asset?._id}`);
      console.log(`      URL: ${img.asset?.url}`);
    });
  } else {
    console.log('❌ Still no lifestyle images found');
  }

  console.log('\n🎉 Extension Plate lifestyle image fixed!');
}

// Run the script
fixExtensionPlateLifestyle().catch(console.error);
