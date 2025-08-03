#!/usr/bin/env node

/**
 * Script to update Gather Café Table thumbnail from lifestyle image to product image
 */

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function updateGatherCafeTableImage() {
  console.log('🔄 Updating Gather Café Table thumbnail to product image...\n');

  try {
    // First, let's find all UMAGE products to see the exact name
    const umageProducts = await client.fetch(`
      *[_type == "product" && brand == "UMAGE"] {
        _id,
        name,
        image
      }
    `);

    console.log('📋 All UMAGE products:');
    umageProducts.forEach(product => {
      console.log(`  - ${product.name}`);
    });

    // Find the Gather Café Table product with more flexible search
    const gatherCafeProduct = umageProducts.find(product => 
      product.name.toLowerCase().includes('gather') && 
      product.name.toLowerCase().includes('café')
    ) || umageProducts.find(product => 
      product.name.toLowerCase().includes('gather') && 
      product.name.toLowerCase().includes('cafe')
    ) || umageProducts.find(product => 
      product.name.toLowerCase().includes('gather')
    );

    if (!gatherCafeProduct) {
      console.error('❌ Gather Café Table product not found');
      console.log('Available products:', umageProducts.map(p => p.name));
      return;
    }

    console.log(`📋 Found product: ${gatherCafeProduct.name}`);
    console.log(`📋 Current image ID: ${gatherCafeProduct.image?.asset?._ref || 'No image'}`);

    // Search for all gather cafe related images
    const gatherImages = await client.fetch(`
      *[_type == "sanity.imageAsset" && originalFilename match "*gather*"] {
        _id,
        originalFilename,
        url
      }
    `);

    console.log(`\n🖼️  Found ${gatherImages.length} Gather Café related images:`);
    gatherImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img._id}: ${img.originalFilename}`);
    });

    // Find the actual product image (not lifestyle)
    const productImage = gatherImages.find(img => 
      img.originalFilename.includes('Gather Café table 8.999 kr.webp') ||
      (img.originalFilename.includes('gather') && 
       img.originalFilename.includes('table') && 
       !img.originalFilename.includes('lifestyle') &&
       !img.originalFilename.includes('heiko') &&
       !img.originalFilename.includes('asteria'))
    );

    if (!productImage) {
      console.error('❌ Could not find the product image for Gather Café Table');
      console.log('\n📋 Available images:');
      gatherImages.forEach(img => console.log(`  - ${img.originalFilename}`));
      return;
    }

    console.log(`\n✅ Found product image: ${productImage.originalFilename}`);
    console.log(`📋 Image ID: ${productImage._id}`);

    // Update the product with the correct image
    const updatedProduct = await client
      .patch(gatherCafeProduct._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: productImage._id
          }
        }
      })
      .commit();

    console.log(`\n🎉 Successfully updated ${gatherCafeProduct.name} with product image!`);
    console.log(`📋 New image: ${productImage.originalFilename}`);
    console.log('\n🔍 Next: Check /umage page to see the updated thumbnail');

  } catch (error) {
    console.error('❌ Failed to update image:', error.message);
    process.exit(1);
  }
}

// Run the update
updateGatherCafeTableImage();
