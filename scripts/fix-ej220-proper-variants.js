#!/usr/bin/env node

const { createClient } = require('@sanity/client');
const fs = require('fs');
const sharp = require('sharp');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function fixEJ220ProperVariants() {
  try {
    console.log('🔧 Fixing EJ220 Sofa 2 Seater with proper variant handling...');
    
    // Get the current product to get the main image reference
    const currentProduct = await client.getDocument('product-fredericia-ej220-sofa-2-seater');
    const mainImageRef = currentProduct.image?.asset?._ref;
    
    if (!mainImageRef) {
      console.error('❌ Main image not found for EJ220');
      return;
    }
    
    console.log('✅ Main image found:', mainImageRef);
    
    // Convert and upload the variant image (for the second variant)
    const variantImagePath = 'public/fredericia/ej220-sofa/variant1.jpg';
    
    if (!fs.existsSync(variantImagePath)) {
      console.error('❌ Variant image not found:', variantImagePath);
      return;
    }
    
    console.log('🔄 Converting AVIF variant image to JPEG...');
    const jpegBuffer = await sharp(variantImagePath)
      .jpeg({ quality: 90 })
      .toBuffer();
    
    console.log('📤 Uploading converted variant image...');
    const variantImageAsset = await client.assets.upload('image', jpegBuffer, {
      filename: 'ej220-sofa-erik-fabric-variant.jpg',
    });
    
    console.log('✅ Variant image uploaded:', variantImageAsset._id);
    
    // Update the product with proper variant images
    const productId = 'product-fredericia-ej220-sofa-2-seater';
    
    const updatedProduct = await client
      .patch(productId)
      .set({
        variants: [
          {
            _key: 'variant-leather-cognac',
            name: 'Leather Max 95 Cognac',
            material: 'Leather Max 95',
            color: 'Cognac',
            price: 98000,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: mainImageRef, // Use main image for leather variant
              },
            },
          },
          {
            _key: 'variant-erik-grey', 
            name: 'Erik 9998 Broken Grey',
            material: 'Erik fabric',
            color: 'Broken Grey',
            price: 98000,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: variantImageAsset._id, // Use specific variant image for fabric
              },
            },
          },
        ],
      })
      .commit();
    
    console.log('✅ EJ220 Sofa variants updated with proper images');
    console.log('📊 Updated variants:', updatedProduct.variants?.length || 0);
    console.log('🔍 Variant 1 (Leather): Uses main product image');
    console.log('🔍 Variant 2 (Erik fabric): Uses specific variant image');
    
  } catch (error) {
    console.error('❌ Error fixing EJ220 variant images:', error);
  }
}

fixEJ220ProperVariants();
