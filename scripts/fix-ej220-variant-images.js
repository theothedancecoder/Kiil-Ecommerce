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

async function fixEJ220VariantImages() {
  try {
    console.log('🔧 Fixing EJ220 Sofa 2 Seater variant images...');
    
    // Convert AVIF to JPEG and upload
    const variantImagePath = 'public/fredericia/ej220-sofa/variant1.jpg';
    
    if (!fs.existsSync(variantImagePath)) {
      console.error('❌ Variant image not found:', variantImagePath);
      return;
    }
    
    console.log('🔄 Converting AVIF to JPEG...');
    const jpegBuffer = await sharp(variantImagePath)
      .jpeg({ quality: 90 })
      .toBuffer();
    
    console.log('📤 Uploading converted variant image...');
    const variantImageAsset = await client.assets.upload('image', jpegBuffer, {
      filename: 'ej220-sofa-variant1.jpg',
    });
    
    console.log('✅ Variant image uploaded:', variantImageAsset._id);
    
    // Update the product with variant images
    const productId = 'product-fredericia-ej220-sofa-2-seater';
    
    const updatedProduct = await client
      .patch(productId)
      .set({
        variants: [
          {
            _key: 'variant-1',
            name: 'Leather Max 95 Cognac',
            material: 'Leather Max 95',
            color: 'Cognac',
            price: 98000,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: variantImageAsset._id,
              },
            },
          },
          {
            _key: 'variant-2', 
            name: 'Erik 9998 Broken Grey',
            material: 'Erik fabric',
            color: 'Broken Grey',
            price: 98000,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: variantImageAsset._id,
              },
            },
          },
        ],
      })
      .commit();
    
    console.log('✅ EJ220 Sofa variants updated with images');
    console.log('📊 Updated variants:', updatedProduct.variants?.length || 0);
    
  } catch (error) {
    console.error('❌ Error fixing EJ220 variant images:', error);
  }
}

fixEJ220VariantImages();
