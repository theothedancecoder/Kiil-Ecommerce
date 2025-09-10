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

async function fixMissingRoCollectionImage() {
  console.log('🔧 Fixing missing RO Collection image...\n');

  try {
    // Find the product missing an image
    const query = `*[_type == "product" && slug.current == "salon-dining-table-extension-round-120"][0]`;
    const product = await client.fetch(query);
    
    if (!product) {
      console.log('❌ Product not found with slug: salon-dining-table-extension-round-120');
      return;
    }

    console.log(`📦 Found product: ${product.name}`);
    
    if (product.image?.asset?.url) {
      console.log('✅ Product already has an image!');
      return;
    }

    // Try to find a suitable image for this product
    // This appears to be the same as the round 120 extension table
    const imagePath = '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp';
    const fullPath = join(projectRoot, 'public', imagePath);
    
    if (!existsSync(fullPath)) {
      console.log(`❌ Image not found: ${fullPath}`);
      console.log('🔍 Let me check what images are available...');
      
      // List available RO Collection images
      const roDir = join(projectRoot, 'public', 'Ro-Collection');
      if (existsSync(roDir)) {
        const { readdirSync } = await import('fs');
        const subdirs = readdirSync(roDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);
        
        console.log('📁 Available RO Collection directories:');
        subdirs.forEach(dir => console.log(`  - ${dir}`));
      }
      return;
    }

    console.log(`📤 Uploading image for ${product.name}...`);
    
    const imageBuffer = readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: `${product.name.toLowerCase().replace(/\s+/g, '-')}.webp`,
    });

    console.log(`✅ Uploaded image: ${asset._id}`);

    // Update the product with the new image
    await client
      .patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      })
      .commit();

    console.log(`✅ Updated product ${product.name} with image`);
    console.log(`🌐 Image URL: ${asset.url}`);

  } catch (error) {
    console.error('❌ Error fixing missing image:', error.message);
  }
}

// Run the fix
fixMissingRoCollectionImage();
