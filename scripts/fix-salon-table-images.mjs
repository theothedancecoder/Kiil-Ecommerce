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

async function fixSalonTableImages() {
  console.log('🔧 Fixing Salon Table images...\n');

  // Get all table products
  const tableProducts = await client.fetch(`
    *[_type == "product" && "ro-collection" in categories[]->slug.current && name match "*Table*"] {
      _id,
      name,
      slug,
      image {
        asset-> {
          _id,
          url
        }
      },
      variants[] {
        _key,
        name,
        material,
        size,
        price,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    }
  `);

  console.log(`📦 Found ${tableProducts.length} table products\n`);

  // Scan for actual table images
  const roCollectionDir = join(projectRoot, 'public', 'Ro-Collection');
  const productDirs = readdirSync(roCollectionDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Find table image directories
  const tableImageDirs = {};
  for (const productDir of productDirs) {
    if (productDir.toLowerCase().includes('table') && !productDir.toLowerCase().includes('chair')) {
      const productPath = join(roCollectionDir, productDir);
      try {
        const files = readdirSync(productPath)
          .filter(file => file.endsWith('.webp'))
          .map(file => `/Ro-Collection/${productDir}/${file}`);
        
        if (files.length > 0) {
          tableImageDirs[productDir] = files;
          console.log(`📁 Found ${productDir}: ${files.length} images`);
        }
      } catch (error) {
        console.log(`⚠️  Could not read ${productDir}`);
      }
    }
  }

  // Fix each table product
  for (const product of tableProducts) {
    console.log(`\n📦 Processing: ${product.name}`);
    console.log(`📦 Slug: ${product.slug?.current}`);
    
    // Find matching images for this specific table
    let matchingImages = [];
    let productType = '';
    
    if (product.name.toLowerCase().includes('ø-120') && product.name.toLowerCase().includes('extension')) {
      // Round table with extension
      productType = 'Round Extension Table';
      for (const [dirName, images] of Object.entries(tableImageDirs)) {
        if (dirName.toLowerCase().includes('extension') && dirName.toLowerCase().includes('ø-120')) {
          matchingImages = images;
          break;
        }
      }
    } else if (product.name.toLowerCase().includes('ø-120')) {
      // Regular round table
      productType = 'Round Table';
      for (const [dirName, images] of Object.entries(tableImageDirs)) {
        if (dirName.toLowerCase().includes('ø-120') && !dirName.toLowerCase().includes('extension')) {
          matchingImages = images;
          break;
        }
      }
    } else if (product.name.toLowerCase().includes('extension') && !product.name.toLowerCase().includes('ø-120')) {
      // Rectangular extension table
      productType = 'Rectangular Extension Table';
      for (const [dirName, images] of Object.entries(tableImageDirs)) {
        if (dirName.toLowerCase().includes('extenstion') || (dirName.toLowerCase().includes('extension') && !dirName.toLowerCase().includes('ø-120'))) {
          matchingImages = images;
          break;
        }
      }
    }

    if (matchingImages.length === 0) {
      console.log(`❌ No matching images found for ${product.name} (${productType})`);
      continue;
    }

    console.log(`✅ Found ${matchingImages.length} images for ${productType}`);

    // Upload new main image
    const mainImageAsset = await uploadImageToSanity(
      matchingImages[0],
      `${product.name} - Main Image`
    );

    if (mainImageAsset) {
      // Update main product image
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

      console.log(`✅ Updated main image for ${product.name}`);
    }

    // Update variants with different images
    if (product.variants && product.variants.length > 0) {
      console.log(`🔧 Updating ${product.variants.length} variants...`);
      
      const updatedVariants = [];
      
      for (let i = 0; i < product.variants.length; i++) {
        const variant = product.variants[i];
        
        // Use different images for different variants, cycling through available images
        const imageIndex = (i + 1) % matchingImages.length; // Start from index 1 for variants
        const imagePath = matchingImages[imageIndex];
        
        console.log(`  📝 Updating variant: ${variant.name} with image ${imageIndex + 1}`);
        
        // Upload the variant image
        const variantImageAsset = await uploadImageToSanity(
          imagePath,
          `${product.name} - ${variant.name} - Variant ${i + 1}`
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

      console.log(`✅ Updated ${updatedVariants.length} variants for ${product.name}`);
    }
    
    // Delay between products
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Salon table images fixed!');
  console.log('\n💡 All table products now have correct table images');
  console.log('🔄 Main images and variants should now show proper table images');
}

// Run the script
fixSalonTableImages().catch(console.error);
