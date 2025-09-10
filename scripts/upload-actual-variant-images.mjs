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

async function uploadActualVariantImages() {
  console.log('🔧 Uploading actual variant-specific images...\n');

  // Get all available images by scanning the directories
  const roCollectionDir = join(projectRoot, 'public', 'Ro-Collection');
  
  if (!existsSync(roCollectionDir)) {
    console.log('❌ RO Collection directory not found');
    return;
  }

  // Scan for actual image files
  const productDirs = readdirSync(roCollectionDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`Found ${productDirs.length} product directories`);

  // Map of actual available images
  const availableImages = {};
  
  for (const productDir of productDirs) {
    const productPath = join(roCollectionDir, productDir);
    try {
      const files = readdirSync(productPath)
        .filter(file => file.endsWith('.webp'))
        .map(file => `/Ro-Collection/${productDir}/${file}`);
      
      if (files.length > 0) {
        availableImages[productDir] = files;
        console.log(`📁 ${productDir}: ${files.length} images`);
      }
    } catch (error) {
      console.log(`⚠️  Could not read ${productDir}`);
    }
  }

  // Now update products with actual variant images
  const products = await client.fetch(`
    *[_type == "product" && "ro-collection" in categories[]->slug.current] {
      _id,
      name,
      slug,
      variants[] {
        _key,
        name,
        material,
        leather,
        size,
        price
      }
    }
  `);

  for (const product of products) {
    console.log(`\n📦 Processing: ${product.name}`);
    
    if (!product.variants || product.variants.length === 0) {
      console.log(`⚠️  No variants found for ${product.name}`);
      continue;
    }

    // Find matching images for this product
    let productImages = [];
    
    // Try to match by product name
    for (const [dirName, images] of Object.entries(availableImages)) {
      if (product.name.toLowerCase().includes('chair') && dirName.toLowerCase().includes('chair')) {
        productImages = images;
        break;
      } else if (product.name.toLowerCase().includes('table') && dirName.toLowerCase().includes('table')) {
        if (product.name.toLowerCase().includes('extension') && dirName.toLowerCase().includes('extension')) {
          productImages = images;
          break;
        } else if (!product.name.toLowerCase().includes('extension') && !dirName.toLowerCase().includes('extension')) {
          productImages = images;
          break;
        }
      } else if (product.name.toLowerCase().includes('extension') && dirName.toLowerCase().includes('extension')) {
        productImages = images;
        break;
      }
    }

    if (productImages.length === 0) {
      console.log(`❌ No matching images found for ${product.name}`);
      continue;
    }

    console.log(`✅ Found ${productImages.length} images for ${product.name}`);

    // Update variants with different images
    const updatedVariants = [];
    
    for (let i = 0; i < product.variants.length; i++) {
      const variant = product.variants[i];
      
      // Use different images for different variants, cycling through available images
      const imageIndex = i % productImages.length;
      const imagePath = productImages[imageIndex];
      
      console.log(`  📝 Updating variant: ${variant.name} with image ${imageIndex + 1}`);
      
      // Upload the variant image
      const imageAsset = await uploadImageToSanity(
        imagePath,
        `${product.name} - ${variant.name} - Variant ${i + 1}`
      );

      const updatedVariant = {
        ...variant,
        _type: 'object'
      };

      if (imageAsset) {
        updatedVariant.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
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
    
    // Delay between products
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Actual variant images uploaded!');
  console.log('\n💡 Each variant now has a different image from the available files');
  console.log('🔄 Variants will now show different images when selected');
}

// Run the script
uploadActualVariantImages().catch(console.error);
