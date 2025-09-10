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

async function fixRemainingExtensionTables() {
  console.log('🔧 Fixing remaining extension table products...\n');

  // Correct mappings for the extension table products with exact file paths
  const extensionTableMappings = {
    'salon-dining-table-round-120-extension': {
      name: 'Salon Dining Table with Extension Option Ø-120',
      mainImage: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp',
      variants: [
        {
          name: 'Oiled Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp'
        },
        {
          name: 'Soaped Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Soaped oak.webp'
        },
        {
          name: 'Smoked Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  33,450  Color -  Smoked oak.webp'
        }
      ]
    },
    'salon-dining-table-extension-round-120': {
      name: 'RO Collection Salon Dining Table with Extension Ø-120',
      mainImage: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp',
      variants: [
        {
          name: 'Oiled Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp'
        },
        {
          name: 'Soaped Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Soaped oak.webp'
        },
        {
          name: 'Smoked Oak',
          image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  33,450  Color -  Smoked oak.webp'
        }
      ]
    }
  };

  // Process each extension table product
  for (const [slug, mapping] of Object.entries(extensionTableMappings)) {
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
    console.log(`📸 Uploading main extension table image...`);
    const mainImageAsset = await uploadImageToSanity(
      mapping.mainImage,
      `${mapping.name} - Main Extension Table Image`
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

      console.log(`✅ Updated main extension table image for ${mapping.name}`);
    }

    // Update variants with correct extension table images
    if (product.variants && product.variants.length > 0 && mapping.variants) {
      console.log(`🔧 Updating ${product.variants.length} variants with extension table images...`);
      
      const updatedVariants = [];
      
      for (let i = 0; i < product.variants.length; i++) {
        const variant = product.variants[i];
        const variantMapping = mapping.variants[i] || mapping.variants[0]; // Fallback to first if not enough mappings
        
        console.log(`  📝 Updating variant: ${variant.name} with extension table image`);
        
        // Upload the correct extension table image for this variant
        const variantImageAsset = await uploadImageToSanity(
          variantMapping.image,
          `${mapping.name} - ${variant.name} - Extension Table Image`
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

      console.log(`✅ Updated ${updatedVariants.length} variants with correct extension table images`);
    }
    
    // Delay between products
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Extension table products fixed with CORRECT table images!');
  console.log('\n💡 All extension table products now have actual extension table images');
  console.log('🔄 No more extension leaf images on extension table products');
}

// Run the script
fixRemainingExtensionTables().catch(console.error);
