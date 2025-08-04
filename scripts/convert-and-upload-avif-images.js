#!/usr/bin/env node

/**
 * Script to convert AVIF images to JPEG and upload to Sanity
 */

const { createClient } = require('@sanity/client');
const sharp = require('sharp');
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

// The 3 problematic AVIF images that need conversion
const avifImages = [
  {
    productId: 'fredericia-delphi-sofa-2-seater',
    avifPath: '/fredericia/delphi-sofa/main.jpg', // Actually AVIF
    variants: [
      { name: 'Leather Max 98 Black', avifPath: '/fredericia/delphi-sofa/main.jpg' }
    ]
  },
  {
    productId: 'product-fredericia-ej220-sofa-2-seater',
    avifPath: '/fredericia/ej220-sofa/main.jpg', // Actually AVIF
    variants: [
      { name: 'Premium Fabric', avifPath: '/fredericia/ej220-sofa/main.jpg' }
    ]
  },
  {
    productId: 'fredericia-the-canvas-chair',
    avifPath: '/fredericia/canvas-chair/main.jpg', // Actually AVIF
    variants: [
      { name: 'Natural Canvas & Oak', avifPath: '/fredericia/canvas-chair/main.jpg' }
    ]
  }
];

async function convertAvifToJpeg(avifPath) {
  try {
    const fullAvifPath = path.join(process.cwd(), 'public', avifPath);
    
    if (!fs.existsSync(fullAvifPath)) {
      console.log(`⚠️  AVIF file not found: ${fullAvifPath}`);
      return null;
    }

    // Create a temporary JPEG file
    const tempJpegPath = fullAvifPath.replace('.jpg', '_converted.jpg');
    
    // Convert AVIF to JPEG using Sharp
    await sharp(fullAvifPath)
      .jpeg({ quality: 90 })
      .toFile(tempJpegPath);
    
    console.log(`✅ Converted AVIF to JPEG: ${tempJpegPath}`);
    return tempJpegPath;
  } catch (error) {
    console.error(`❌ Failed to convert AVIF ${avifPath}:`, error.message);
    return null;
  }
}

async function uploadJpegToSanity(jpegPath, productId, imageType = 'main') {
  try {
    if (!jpegPath || !fs.existsSync(jpegPath)) {
      console.log(`⚠️  JPEG file not found: ${jpegPath}`);
      return null;
    }

    // Read the converted JPEG file
    const imageBuffer = fs.readFileSync(jpegPath);
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(jpegPath),
    });

    console.log(`✅ Uploaded ${imageType} image for ${productId}: ${asset._id}`);
    
    // Clean up temporary file
    fs.unlinkSync(jpegPath);
    console.log(`🗑️  Cleaned up temporary file: ${jpegPath}`);
    
    return asset._id;
  } catch (error) {
    console.error(`❌ Failed to upload ${imageType} image for ${productId}:`, error.message);
    return null;
  }
}

async function updateProductWithImages(productId, mainImageAssetId, variantImages) {
  try {
    const product = await client.getDocument(productId);
    if (!product) {
      console.log(`⚠️  Product not found: ${productId}`);
      return;
    }

    const updateData = {};

    // Update main image
    if (mainImageAssetId) {
      updateData.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageAssetId
        }
      };
    }

    // Update variant images
    if (variantImages && variantImages.length > 0 && product.variants) {
      const updatedVariants = product.variants.map(variant => {
        const variantImageData = variantImages.find(vi => vi.name === variant.name);
        if (variantImageData && variantImageData.assetId) {
          return {
            ...variant,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: variantImageData.assetId
              }
            }
          };
        }
        return variant;
      });
      updateData.variants = updatedVariants;
    }

    // Apply the updates
    const updatedProduct = await client
      .patch(productId)
      .set(updateData)
      .commit();

    console.log(`✅ Updated product ${productId} with converted images`);
  } catch (error) {
    console.error(`❌ Failed to update product ${productId}:`, error.message);
  }
}

async function convertAndUploadAvifImages() {
  console.log('🚀 Converting AVIF images to JPEG and uploading to Sanity...\n');

  try {
    console.log(`📡 Connected to Sanity project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

    let successCount = 0;
    let failCount = 0;

    for (const imageData of avifImages) {
      console.log(`🔄 Processing ${imageData.productId}...`);
      
      // Convert and upload main image
      const convertedMainPath = await convertAvifToJpeg(imageData.avifPath);
      const mainImageAssetId = await uploadJpegToSanity(convertedMainPath, imageData.productId, 'main');
      
      // Convert and upload variant images
      const variantImages = [];
      if (imageData.variants) {
        for (const variant of imageData.variants) {
          const convertedVariantPath = await convertAvifToJpeg(variant.avifPath);
          const variantAssetId = await uploadJpegToSanity(convertedVariantPath, imageData.productId, `variant-${variant.name}`);
          if (variantAssetId) {
            variantImages.push({
              name: variant.name,
              assetId: variantAssetId
            });
          }
        }
      }
      
      // Update product with converted images
      if (mainImageAssetId || variantImages.length > 0) {
        await updateProductWithImages(imageData.productId, mainImageAssetId, variantImages);
        successCount++;
      } else {
        failCount++;
      }
      
      console.log(''); // Add spacing between products
    }

    console.log('🎉 AVIF to JPEG conversion and upload completed!');
    console.log('\n📋 Summary:');
    console.log(`- Successfully processed: ${successCount} products`);
    console.log(`- Failed: ${failCount} products`);
    console.log('\n🔍 Next: Check /fredericia page - ALL images should now be visible!');

  } catch (error) {
    console.error('❌ Conversion and upload failed:', error.message);
    process.exit(1);
  }
}

// Run the conversion and upload
convertAndUploadAvifImages();
