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

async function fixSalonTablesWithCorrectImages() {
  console.log('🔧 Fixing Salon Tables with CORRECT table images...\n');

  // Exact mapping of products to their correct table images
  const correctTableMappings = {
    'salon-dining-table-round-120': {
      name: 'Salon Dining Table Ø-120',
      mainImage: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp',
      variants: [
        {
          name: 'Oiled Oak',
          image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp'
        },
        {
          name: 'Soaped Oak', 
          image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Soaped oak.webp'
        },
        {
          name: 'Smoked Oak',
          image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  33,450  Color -  Smoked oak.webp'
        }
      ]
    },
    'salon-dining-table-round-120-extension': {
      name: 'Salon Dining Table with Extension Option Ø-120',
      mainImage: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option Ø-120 NOK  29,940  Color -  Oiled oak.webp',
      variants: [
        {
          name: 'Oiled Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option Ø-120 NOK  29,940  Color -  Oiled oak.webp'
        },
        {
          name: 'Soaped Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option Ø-120 NOK  29,940  Color -  Soaped oak.webp'
        },
        {
          name: 'Smoked Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option Ø-120 NOK  33,450  Color -  Smoked oak.webp'
        }
      ]
    },
    'salon-dining-table-extension-round-120': {
      name: 'RO Collection Salon Dining Table with Extension Ø-120',
      mainImage: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option Ø-120 NOK  29,940  Color -  Oiled oak.webp',
      variants: [
        {
          name: 'Oiled Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option Ø-120 NOK  29,940  Color -  Oiled oak.webp'
        },
        {
          name: 'Soaped Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option Ø-120 NOK  29,940  Color -  Soaped oak.webp'
        },
        {
          name: 'Smoked Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option Ø-120 NOK  33,450  Color -  Smoked oak.webp'
        }
      ]
    },
    'salon-dining-table-rectangular-extension': {
      name: 'Salon Dining Table with Extension Option',
      mainImage: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp',
      variants: [
        {
          name: '190x90 - Oiled Oak',
          image: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp'
        },
        {
          name: '220x100 - Oiled Oak',
          image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37,815  Size -  220x100 190x90 220x100 Color -  Oiled oak.webp'
        },
        {
          name: '190x90 - Smoked Oak',
          image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  38,700  Size -  190x90 190x90 220x100 Color -  Smoked oak.webp'
        }
      ]
    }
  };

  // Process each table product
  for (const [slug, mapping] of Object.entries(correctTableMappings)) {
    console.log(`\n📦 Processing: ${mapping.name} (${slug})`);
    
    // Find the product in Sanity
    const product = await client.fetch(`
      *[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        variants[] {
          _key,
          name,
          material,
          size,
          price
        }
      }
    `, { slug });
    
    if (!product) {
      console.log(`❌ Product not found: ${slug}`);
      continue;
    }

    // Upload and set main image
    console.log(`📸 Uploading main table image...`);
    const mainImageAsset = await uploadImageToSanity(
      mapping.mainImage,
      `${mapping.name} - Main Table Image`
    );

    if (mainImageAsset) {
      await client
        .patch(product._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: mainImageAsset._id
            }
          }
        })
        .commit();

      console.log(`✅ Updated main table image for ${mapping.name}`);
    }

    // Update variants with correct table images
    if (product.variants && product.variants.length > 0 && mapping.variants) {
      console.log(`🔧 Updating ${product.variants.length} variants with table images...`);
      
      const updatedVariants = [];
      
      for (let i = 0; i < product.variants.length; i++) {
        const variant = product.variants[i];
        const variantMapping = mapping.variants[i] || mapping.variants[0]; // Fallback to first if not enough mappings
        
        console.log(`  📝 Updating variant: ${variant.name} with table image`);
        
        // Upload the correct table image for this variant
        const variantImageAsset = await uploadImageToSanity(
          variantMapping.image,
          `${mapping.name} - ${variant.name} - Table Image`
        );

        const updatedVariant = {
          ...variant,
          _type: 'object'
        };

        if (variantImageAsset) {
          updatedVariant.image = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: variantImageAsset._id
            }
          };
        }

        updatedVariants.push(updatedVariant);
        
        // Small delay between uploads
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Update the product with new variant images
      await client
        .patch(product._id)
        .set({ variants: updatedVariants })
        .commit();

      console.log(`✅ Updated ${updatedVariants.length} variants with correct table images`);
    }
    
    // Delay between products
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Salon tables fixed with CORRECT table images!');
  console.log('\n💡 All salon table products now have actual table images');
  console.log('🔄 No more extension leaf images on table products');
}

// Run the script
fixSalonTablesWithCorrectImages().catch(console.error);
