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

async function fixTableLifestyleImages() {
  console.log('🔧 Adding missing table lifestyle images...\n');

  // Mapping of table products to their lifestyle images
  const tableLifestyleMappings = {
    'salon-dining-table-round-120': {
      name: 'Salon Dining Table Ø-120',
      lifestyleImages: [
        '/Ro-Collection/Salon dining table Ø-120/lifestyle/Gal_6.webp'
      ]
    },
    'salon-dining-table-round-120-extension': {
      name: 'Salon Dining Table with Extension Option Ø-120',
      lifestyleImages: [
        '/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/SAL-ET-O120OO-720_2_800x800_crop_center@2x.webp',
        '/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/Salon_extension_table_round_1920x1920_re_800x800_crop_center@2x.webp'
      ]
    },
    'salon-dining-table-extension-round-120': {
      name: 'RO Collection Salon Dining Table with Extension Ø-120',
      lifestyleImages: [
        '/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/SAL-ET-O120OO-720_2_800x800_crop_center@2x.webp',
        '/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/Salon_extension_table_round_1920x1920_re_800x800_crop_center@2x.webp'
      ]
    },
    'salon-dining-table-rectangular-extension': {
      name: 'Salon Dining Table with Extension Option',
      lifestyleImages: [
        '/Ro-Collection/lifestyle/Gal_2_724663c2-5a86-4611-8289-baf4b34e6c5e.webp'
      ]
    }
  };

  // Process each table product
  for (const [slug, mapping] of Object.entries(tableLifestyleMappings)) {
    console.log(`\n📦 Processing: ${mapping.name} (${slug})`);
    
    // Find the product in Sanity
    const product = await client.fetch(`
      *[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        lifestyleImages
      }
    `, { slug });
    
    if (!product) {
      console.log(`❌ Product not found: ${slug}`);
      continue;
    }

    console.log(`📸 Current lifestyle images: ${product.lifestyleImages?.length || 0}`);

    // Upload lifestyle images
    const lifestyleAssets = [];
    
    for (let i = 0; i < mapping.lifestyleImages.length; i++) {
      const imagePath = mapping.lifestyleImages[i];
      const asset = await uploadImageToSanity(
        imagePath,
        `${mapping.name} - Lifestyle Image ${i + 1}`
      );
      
      if (asset) {
        lifestyleAssets.push({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        });
      }
      
      // Small delay between uploads
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (lifestyleAssets.length > 0) {
      // Update the product with lifestyle images
      await client
        .patch(product._id)
        .set({ lifestyleImages: lifestyleAssets })
        .commit();

      console.log(`✅ Added ${lifestyleAssets.length} lifestyle images to ${mapping.name}`);
    } else {
      console.log(`❌ No lifestyle images could be uploaded for ${mapping.name}`);
    }
    
    // Delay between products
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Table lifestyle images fixed!');
  console.log('\n💡 All table products now have lifestyle images');
  console.log('🔄 Lifestyle images should now display on product pages');
}

// Run the script
fixTableLifestyleImages().catch(console.error);
