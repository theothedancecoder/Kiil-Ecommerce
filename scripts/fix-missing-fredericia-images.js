#!/usr/bin/env node

/**
 * Script to fix the 6 missing Fredericia product images
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

// Mapping for the 6 missing products with correct IDs and image paths
const missingProductImages = {
  'product-fredericia-bm71-library-table': {
    mainImage: '/fredericia/bm71-library-table/main.jpg',
    variants: [
      { name: 'Premium Oak', image: '/fredericia/bm71-library-table/main.jpg' }
    ]
  },
  'product-fredericia-delphi-elements-sofa': {
    mainImage: '/fredericia/delphi-elements-sofa/main.jpg',
    variants: [
      { name: 'Steelcut Trio 213', image: '/fredericia/delphi-elements-sofa/main.jpg' }
    ]
  },
  'fredericia-delphi-sofa-2-seater': {
    mainImage: '/fredericia/delphi-sofa-2-seater/main.jpg',
    variants: [
      { name: 'Leather Max 98 Black', image: '/fredericia/delphi-sofa-2-seater/main.jpg' }
    ]
  },
  'product-fredericia-ej220-sofa-2-seater': {
    mainImage: '/fredericia/ej220-sofa-2-seater/main.jpg',
    variants: [
      { name: 'Premium Fabric', image: '/fredericia/ej220-sofa-2-seater/main.jpg' }
    ]
  },
  'fredericia-the-canvas-chair': {
    mainImage: '/fredericia/the-canvas-chair/main.jpg',
    variants: [
      { name: 'Natural Canvas & Oak', image: '/fredericia/the-canvas-chair/main.jpg' }
    ]
  },
  'product-fredericia-wegner-ox-chair': {
    mainImage: '/fredericia/wegner-ox-chair/main.jpg',
    variants: [
      { name: 'Essene Cognac', image: '/fredericia/wegner-ox-chair/main.jpg' }
    ]
  }
};

async function uploadImageToSanity(imagePath, productId, imageType = 'main') {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${fullPath}`);
      
      // Try alternative paths
      const alternatives = [
        imagePath.replace('/main.jpg', '/main.webp'),
        imagePath.replace('/main.jpg', '/main.png'),
        imagePath.replace('delphi-sofa-2-seater', 'delphi-sofa'),
        imagePath.replace('the-canvas-chair', 'canvas-chair'),
        imagePath.replace('ej220-sofa-2-seater', 'ej220-sofa')
      ];
      
      for (const altPath of alternatives) {
        const altFullPath = path.join(process.cwd(), 'public', altPath);
        if (fs.existsSync(altFullPath)) {
          console.log(`✅ Found alternative: ${altPath}`);
          imagePath = altPath;
          break;
        }
      }
      
      const finalPath = path.join(process.cwd(), 'public', imagePath);
      if (!fs.existsSync(finalPath)) {
        console.log(`❌ No alternative found for ${imagePath}`);
        return null;
      }
    }

    // Read the image file
    const imageBuffer = fs.readFileSync(path.join(process.cwd(), 'public', imagePath));
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    console.log(`✅ Uploaded ${imageType} image for ${productId}: ${asset._id}`);
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

    console.log(`✅ Updated product ${productId} with images`);
  } catch (error) {
    console.error(`❌ Failed to update product ${productId}:`, error.message);
  }
}

async function fixMissingFredericiaImages() {
  console.log('🚀 Fixing missing Fredericia product images...\n');

  try {
    console.log(`📡 Connected to Sanity project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

    let successCount = 0;
    let failCount = 0;

    for (const [productId, imageData] of Object.entries(missingProductImages)) {
      console.log(`📸 Processing ${productId}...`);
      
      // Upload main image
      const mainImageAssetId = await uploadImageToSanity(imageData.mainImage, productId, 'main');
      
      // Upload variant images
      const variantImages = [];
      if (imageData.variants) {
        for (const variant of imageData.variants) {
          const variantAssetId = await uploadImageToSanity(variant.image, productId, `variant-${variant.name}`);
          if (variantAssetId) {
            variantImages.push({
              name: variant.name,
              assetId: variantAssetId
            });
          }
        }
      }
      
      // Update product with images
      if (mainImageAssetId || variantImages.length > 0) {
        await updateProductWithImages(productId, mainImageAssetId, variantImages);
        successCount++;
      } else {
        failCount++;
      }
      
      console.log(''); // Add spacing between products
    }

    console.log('🎉 Missing Fredericia images fix completed!');
    console.log('\n📋 Summary:');
    console.log(`- Successfully processed: ${successCount} products`);
    console.log(`- Failed: ${failCount} products`);
    console.log('\n🔍 Next: Check /fredericia page - all images should now be visible!');

  } catch (error) {
    console.error('❌ Image fix failed:', error.message);
    process.exit(1);
  }
}

// Run the fix
fixMissingFredericiaImages();
