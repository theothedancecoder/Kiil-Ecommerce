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

// RO Collection products with their variants and lifestyle images
const roCollectionData = {
  'salon-dining-chair': {
    name: 'Salon Dining Chair',
    variants: [
      {
        name: 'Oiled Oak Base - Supreme Dark Chocolate Leather',
        material: 'Oiled Oak',
        leather: 'Supreme Dark Chocolate',
        price: 22005,
        imagePath: '/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp'
      },
      {
        name: 'Smoked Oak Base - Supreme Dark Chocolate Leather',
        material: 'Smoked Oak',
        leather: 'Supreme Dark Chocolate',
        price: 22005,
        imagePath: '/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp'
      },
      {
        name: 'Soaped Oak Base - Supreme Dark Chocolate Leather',
        material: 'Soaped Oak',
        leather: 'Supreme Dark Chocolate',
        price: 22005,
        imagePath: '/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp'
      }
    ],
    lifestyleImages: []
  },
  'salon-dining-table-round-120': {
    name: 'Salon Dining Table Ø-120',
    variants: [
      {
        name: 'Oiled Oak',
        material: 'Oiled Oak',
        price: 29940,
        imagePath: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp'
      }
    ],
    lifestyleImages: []
  },
  'salon-dining-table-round-120-extension': {
    name: 'Salon Dining Table with Extension Option Ø-120',
    variants: [
      {
        name: 'Oiled Oak',
        material: 'Oiled Oak',
        price: 29940,
        imagePath: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp'
      }
    ],
    lifestyleImages: []
  },
  'salon-dining-table-rectangular-extension': {
    name: 'Salon Dining Table with Extension Option',
    variants: [
      {
        name: '190x90 - Oiled Oak',
        material: 'Oiled Oak',
        size: '190x90',
        price: 35190,
        imagePath: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp'
      },
      {
        name: '220x100 - Oiled Oak',
        material: 'Oiled Oak',
        size: '220x100',
        price: 35190,
        imagePath: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp'
      }
    ],
    lifestyleImages: []
  },
  'extension-leaf-round-120': {
    name: 'Extension Leaf for Salon Dining Table Ø-120',
    variants: [
      {
        name: 'Black MDF',
        material: 'Black MDF',
        price: 5130,
        imagePath: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  5,130  Color -  Black MDF.webp'
      }
    ],
    lifestyleImages: []
  },
  'extension-plate-rectangular': {
    name: 'Extension Plate for Salon Dining Table',
    variants: [
      {
        name: '50x90 - Black MDF',
        material: 'Black MDF',
        size: '50x90',
        price: 5130,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x90 50x100 50x90 Color -  Black MDF.webp'
      },
      {
        name: '50x100 - Black MDF',
        material: 'Black MDF',
        size: '50x100',
        price: 5130,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x90 50x100 50x90 Color -  Black MDF.webp'
      }
    ],
    lifestyleImages: []
  }
};

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

async function addVariantsAndLifestyleImages() {
  console.log('🚀 Adding RO Collection variants and lifestyle images...\n');

  for (const [slug, productData] of Object.entries(roCollectionData)) {
    console.log(`\n📦 Processing: ${productData.name} (${slug})`);
    
    // Find the product in Sanity
    const query = `*[_type == "product" && slug.current == $slug][0]`;
    const product = await client.fetch(query, { slug });
    
    if (!product) {
      console.log(`❌ Product not found: ${slug}`);
      continue;
    }

    // Process variants
    if (productData.variants && productData.variants.length > 0) {
      console.log(`🔧 Adding ${productData.variants.length} variants...`);
      
      const variants = [];
      for (const variantData of productData.variants) {
        console.log(`  📝 Processing variant: ${variantData.name}`);
        
        // Upload variant image if it exists
        let variantImageAsset = null;
        if (variantData.imagePath) {
          variantImageAsset = await uploadImageToSanity(
            variantData.imagePath, 
            `${productData.name} - ${variantData.name}`
          );
        }

        const variant = {
          _type: 'object',
          _key: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: variantData.name,
          price: variantData.price,
          material: variantData.material,
          leather: variantData.leather,
          size: variantData.size,
        };

        if (variantImageAsset) {
          variant.image = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: variantImageAsset._id
            }
          };
        }

        variants.push(variant);
      }

      // Update product with variants
      await client
        .patch(product._id)
        .set({ variants })
        .commit();

      console.log(`✅ Added ${variants.length} variants to ${productData.name}`);
    }

    // Process lifestyle images (if any exist in the future)
    if (productData.lifestyleImages && productData.lifestyleImages.length > 0) {
      console.log(`🖼️  Adding ${productData.lifestyleImages.length} lifestyle images...`);
      
      const lifestyleImages = [];
      for (const lifestyleImagePath of productData.lifestyleImages) {
        const lifestyleAsset = await uploadImageToSanity(
          lifestyleImagePath, 
          `${productData.name} - Lifestyle`
        );
        
        if (lifestyleAsset) {
          lifestyleImages.push({
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: lifestyleAsset._id
            }
          });
        }
      }

      if (lifestyleImages.length > 0) {
        await client
          .patch(product._id)
          .set({ lifestyleImages })
          .commit();

        console.log(`✅ Added ${lifestyleImages.length} lifestyle images to ${productData.name}`);
      }
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 RO Collection variants and lifestyle images completed!');
  console.log('\n💡 Next steps:');
  console.log('1. All products now have proper variants with images');
  console.log('2. Variant selection should work on product pages');
  console.log('3. Test the /ro-collection pages to verify everything is working');
}

// Run the script
addVariantsAndLifestyleImages().catch(console.error);
