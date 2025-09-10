#!/usr/bin/env node

import { createClient } from '@sanity/client';
import { readFileSync, existsSync, readdirSync } from 'fs';
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

    console.log(`📤 Uploading lifestyle image: ${description}...`);
    
    const imageBuffer = readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: `lifestyle-${description.toLowerCase().replace(/\s+/g, '-')}.webp`,
    });

    console.log(`✅ Uploaded lifestyle image: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload lifestyle image ${description}:`, error.message);
    return null;
  }
}

async function addMissingLifestyleImages() {
  console.log('🖼️  Adding missing lifestyle images to RO Collection products...\n');

  // Check for lifestyle images
  const lifestyleDir = join(projectRoot, 'public', 'Ro-Collection', 'lifestyle');
  
  if (!existsSync(lifestyleDir)) {
    console.log('❌ Lifestyle directory not found');
    return;
  }

  const lifestyleFiles = readdirSync(lifestyleDir)
    .filter(file => file.endsWith('.webp'))
    .map(file => `/Ro-Collection/lifestyle/${file}`);

  console.log(`📁 Found ${lifestyleFiles.length} lifestyle images:`);
  lifestyleFiles.forEach(file => console.log(`   - ${file}`));

  if (lifestyleFiles.length === 0) {
    console.log('❌ No lifestyle images found');
    return;
  }

  // Get all RO Collection products
  const products = await client.fetch(`
    *[_type == "product" && "ro-collection" in categories[]->slug.current] {
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
  `);

  console.log(`\n📦 Found ${products.length} RO Collection products\n`);

  // Upload the lifestyle image once
  const lifestyleAsset = await uploadImageToSanity(
    lifestyleFiles[0], // Use the first lifestyle image
    'RO Collection Lifestyle'
  );

  if (!lifestyleAsset) {
    console.log('❌ Failed to upload lifestyle image');
    return;
  }

  // Add lifestyle image to products that don't have any
  for (const product of products) {
    console.log(`📦 Processing: ${product.name}`);
    
    const hasLifestyleImages = product.lifestyleImages && product.lifestyleImages.length > 0;
    
    if (hasLifestyleImages) {
      console.log(`✅ ${product.name} already has ${product.lifestyleImages.length} lifestyle image(s)`);
    } else {
      console.log(`📸 Adding lifestyle image to ${product.name}...`);
      
      // Add the lifestyle image
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

      console.log(`✅ Added lifestyle image to ${product.name}`);
    }
    
    // Small delay between updates
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('\n🎉 Lifestyle images added to all RO Collection products!');
  console.log('\n💡 All products now have lifestyle images for enhanced presentation');
}

// Run the script
addMissingLifestyleImages().catch(console.error);
