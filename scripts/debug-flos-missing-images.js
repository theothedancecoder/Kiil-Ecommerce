#!/usr/bin/env node

/**
 * Script to debug and fix missing FLOS product images
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Query to get all FLOS products with image info
const FLOS_PRODUCTS_QUERY = `
  *[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id)] | order(name asc) {
    _id,
    name,
    image,
    variants
  }
`;

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    });

    console.log(`✅ Uploaded image: ${imagePath} -> ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Failed to upload image ${imagePath}:`, error.message);
    return null;
  }
}

async function debugMissingImages() {
  try {
    console.log('🔍 Debugging FLOS missing images...\n');

    // Get all FLOS products
    const products = await client.fetch(FLOS_PRODUCTS_QUERY);
    console.log(`Found ${products.length} FLOS products\n`);

    let missingMainImages = [];
    let missingVariantImages = [];
    let totalVariants = 0;
    let missingVariantCount = 0;

    // Check each product
    for (const product of products) {
      console.log(`📦 Checking: ${product.name}`);
      
      // Check main image
      if (!product.image?.asset) {
        console.log(`  ❌ Missing main image`);
        missingMainImages.push(product);
      } else {
        console.log(`  ✅ Has main image`);
      }

      // Check variant images
      if (product.variants && product.variants.length > 0) {
        console.log(`  🔄 Checking ${product.variants.length} variants:`);
        
        for (const variant of product.variants) {
          totalVariants++;
          if (!variant.image?.asset) {
            console.log(`    ❌ Missing image for variant: ${variant.name}`);
            missingVariantImages.push({
              productId: product._id,
              productName: product.name,
              variantName: variant.name,
              variant: variant
            });
            missingVariantCount++;
          } else {
            console.log(`    ✅ Has image for variant: ${variant.name}`);
          }
        }
      }
      console.log('');
    }

    // Summary
    console.log('📊 SUMMARY:');
    console.log(`Total products: ${products.length}`);
    console.log(`Products missing main images: ${missingMainImages.length}`);
    console.log(`Total variants: ${totalVariants}`);
    console.log(`Variants missing images: ${missingVariantCount}`);
    console.log('');

    // List missing main images
    if (missingMainImages.length > 0) {
      console.log('❌ Products missing main images:');
      missingMainImages.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} (${product._id})`);
      });
      console.log('');
    }

    // List missing variant images
    if (missingVariantImages.length > 0) {
      console.log('❌ Variants missing images:');
      missingVariantImages.forEach((item, index) => {
        console.log(`${index + 1}. ${item.productName} - ${item.variantName}`);
      });
      console.log('');
    }

    // Try to fix missing images
    if (missingMainImages.length > 0 || missingVariantImages.length > 0) {
      console.log('🔧 Attempting to fix missing images...\n');
      
      // Fix missing main images
      for (const product of missingMainImages) {
        console.log(`🔄 Fixing main image for: ${product.name}`);
        
        // Try to find the first variant with an image
        if (product.variants && product.variants.length > 0) {
          const variantWithImage = product.variants.find(v => v.image?.asset);
          if (variantWithImage) {
            console.log(`  📋 Using image from variant: ${variantWithImage.name}`);
            
            // Update product with variant image
            await client
              .patch(product._id)
              .set({
                image: variantWithImage.image
              })
              .commit();
            
            console.log(`  ✅ Updated main image for ${product.name}`);
          } else {
            console.log(`  ⚠️  No variants with images found for ${product.name}`);
          }
        }
      }
    }

    console.log('\n🎉 Debug completed!');

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the debug
if (require.main === module) {
  debugMissingImages();
}

module.exports = { debugMissingImages };
