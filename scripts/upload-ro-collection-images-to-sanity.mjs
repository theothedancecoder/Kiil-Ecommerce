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

// RO Collection products with their image paths
const roCollectionProducts = [
  {
    slug: 'salon-dining-chair',
    name: 'Salon Dining Chair',
    imagePath: '/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp'
  },
  {
    slug: 'salon-dining-table-round-120',
    name: 'Salon Dining Table Ø-120',
    imagePath: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp'
  },
  {
    slug: 'salon-dining-table-round-120-extension',
    name: 'Salon Dining Table with Extension Option, Ø-120',
    imagePath: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp'
  },
  {
    slug: 'salon-dining-table-rectangular-extension',
    name: 'Salon Dining Table with Extension Option',
    imagePath: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp'
  },
  {
    slug: 'extension-leaf-round-120',
    name: 'Extension Leaf for Salon Dining Table Ø-120',
    imagePath: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  5,130  Color -  Black MDF.webp'
  },
  {
    slug: 'extension-plate-rectangular',
    name: 'Extension Plate for Salon Dining Table',
    imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x90 50x100 50x90 Color -  Black MDF.webp'
  }
];

async function uploadImageToSanity(imagePath, productName) {
  try {
    const fullPath = join(projectRoot, 'public', imagePath);
    
    if (!existsSync(fullPath)) {
      console.log(`❌ Image not found: ${fullPath}`);
      return null;
    }

    console.log(`📤 Uploading image for ${productName}...`);
    
    const imageBuffer = readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: `${productName.toLowerCase().replace(/\s+/g, '-')}.webp`,
    });

    console.log(`✅ Uploaded image for ${productName}: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload image for ${productName}:`, error.message);
    return null;
  }
}

async function updateProductWithImage(slug, imageAsset) {
  try {
    const query = `*[_type == "product" && slug.current == $slug][0]`;
    const product = await client.fetch(query, { slug });
    
    if (!product) {
      console.log(`❌ Product not found: ${slug}`);
      return;
    }

    await client
      .patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      })
      .commit();

    console.log(`✅ Updated product ${slug} with image`);
  } catch (error) {
    console.error(`❌ Failed to update product ${slug}:`, error.message);
  }
}

async function uploadAllRoCollectionImages() {
  console.log('🚀 Starting RO Collection image upload to Sanity...\n');

  for (const product of roCollectionProducts) {
    console.log(`\n📦 Processing: ${product.name}`);
    
    // Upload image to Sanity
    const imageAsset = await uploadImageToSanity(product.imagePath, product.name);
    
    if (imageAsset) {
      // Update product with the new image asset
      await updateProductWithImage(product.slug, imageAsset);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 RO Collection image upload completed!');
  console.log('\n💡 Next steps:');
  console.log('1. The products now have proper Sanity image assets');
  console.log('2. Images should load correctly on production');
  console.log('3. Test the /ro-collection page to verify images are working');
}

// Run the upload
uploadAllRoCollectionImages().catch(console.error);
