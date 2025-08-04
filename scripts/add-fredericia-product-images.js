#!/usr/bin/env node

/**
 * Script to add main thumbnail images and variant images to existing Fredericia products in Sanity
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

// Mapping of product IDs to their main image paths and variant images
const productImageMappings = {
  'fredericia-delphi-sofa-2-seater': {
    mainImage: '/fredericia/delphi-sofa/main.jpg',
    variants: [
      { name: 'Leather Max 98 Black', image: '/fredericia/delphi-sofa/main.jpg' }
    ]
  },
  'fredericia-ej-5-corona-armchair': {
    mainImage: '/fredericia/corona-armchair/main.jpg',
    variants: [
      { name: 'Omni 301 Black', image: '/fredericia/corona-armchair/main.jpg' }
    ]
  },
  'fredericia-insula-piccolo-side-table': {
    mainImage: '/fredericia/insula-piccolo-side-table/main.jpg',
    variants: [
      { name: 'H 58cm', image: '/fredericia/insula-piccolo-side-table/main.jpg' }
    ],
    lifestyleImages: ['/fredericia/insula-piccolo-side-table/lifestyle1.jpg']
  },
  'fredericia-mogensen-6284-dining-table': {
    mainImage: '/fredericia/mogensen-dining-table/main.jpg',
    variants: [
      { name: 'Oak Natural', image: '/fredericia/mogensen-dining-table/main.jpg' }
    ]
  },
  'fredericia-mogensen-j39-dining-chair': {
    mainImage: '/fredericia/mogensen-j39-dining-chair/main.jpg',
    variants: [
      { name: 'Oiled Oak', image: '/fredericia/mogensen-j39-dining-chair/main.jpg' },
      { name: 'Soaped Oak', image: '/fredericia/mogensen-j39-dining-chair/variant1.webp' },
      { name: 'Black Oak', image: '/fredericia/mogensen-j39-dining-chair/variant2.jpg' }
    ],
    lifestyleImages: [
      '/fredericia/mogensen-j39-dining-chair/lifestyle1.jpg',
      '/fredericia/mogensen-j39-dining-chair/lifestyle2.jpg'
    ]
  },
  'fredericia-piloti-coffee-table': {
    mainImage: '/fredericia/piloti-coffee-table/main.jpg',
    variants: [
      { name: 'Light Oiled Oak', image: '/fredericia/piloti-coffee-table/main.jpg' }
    ]
  },
  'fredericia-post-dining-chair-with-wooden-seat': {
    mainImage: '/fredericia/post-dining-chair/main.jpg',
    variants: [
      { name: 'Oak Natural', image: '/fredericia/post-dining-chair/main.jpg' }
    ]
  },
  'fredericia-risom-magazine-table': {
    mainImage: '/fredericia/risom-magazine-table/main.jpg',
    variants: [
      { name: 'Lacquered Oak', image: '/fredericia/risom-magazine-table/main.jpg' }
    ]
  },
  'fredericia-the-canvas-chair': {
    mainImage: '/fredericia/canvas-chair/main.jpg',
    variants: [
      { name: 'Natural Canvas & Oak', image: '/fredericia/canvas-chair/main.jpg' }
    ]
  },
  'fredericia-trinidad-chair': {
    mainImage: '/fredericia/trinidad-chair/main.jpg',
    variants: [
      { name: 'Beech & Chrome', image: '/fredericia/trinidad-chair/main.jpg' },
      { name: 'Black & Chrome', image: '/fredericia/trinidad-chair/variant1.jpg' },
      { name: 'Grey & Flint', image: '/fredericia/trinidad-chair/variant2.jpg' }
    ]
  },
  'fredericia-wegner-j16-rocking-chair': {
    mainImage: '/fredericia/wegner-j16-rocking-chair/main.jpg',
    variants: [
      { name: 'Oiled Oak Natural Seat', image: '/fredericia/wegner-j16-rocking-chair/main.jpg' }
    ]
  },
  // Also include the existing products that might need images
  'fredericia-delphi-elements-sofa': {
    mainImage: '/fredericia/delphi-elements-sofa/main.jpg',
    variants: [
      { name: 'Steelcut Trio 213', image: '/fredericia/delphi-elements-sofa/main.jpg' }
    ]
  },
  'fredericia-bm71-library-table': {
    mainImage: '/fredericia/bm71-library-table/main.jpg',
    variants: [
      { name: 'Premium Oak', image: '/fredericia/bm71-library-table/main.jpg' }
    ]
  },
  'fredericia-wegner-ox-chair': {
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
      return null;
    }

    // Read the image file
    const imageBuffer = fs.readFileSync(fullPath);
    
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

async function updateProductWithImages(productId, mainImageAssetId, variantImages, lifestyleImages) {
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

    // Update lifestyle images
    if (lifestyleImages && lifestyleImages.length > 0) {
      updateData.lifestyleImages = lifestyleImages.map((assetId, index) => ({
        _key: `lifestyle-${index}`,
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId
        }
      }));
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

async function addFredericiaProductImages() {
  console.log('🚀 Adding images to Fredericia products in Sanity...\n');

  try {
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
    }
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('Missing SANITY_API_TOKEN environment variable');
    }

    console.log(`📡 Connected to Sanity project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

    let successCount = 0;
    let failCount = 0;

    for (const [productId, imageData] of Object.entries(productImageMappings)) {
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

      // Upload lifestyle images
      const lifestyleImageAssets = [];
      if (imageData.lifestyleImages) {
        for (const lifestyleImage of imageData.lifestyleImages) {
          const lifestyleAssetId = await uploadImageToSanity(lifestyleImage, productId, 'lifestyle');
          if (lifestyleAssetId) {
            lifestyleImageAssets.push(lifestyleAssetId);
          }
        }
      }
      
      // Update product with all images
      if (mainImageAssetId || variantImages.length > 0 || lifestyleImageAssets.length > 0) {
        await updateProductWithImages(productId, mainImageAssetId, variantImages, lifestyleImageAssets);
        successCount++;
      } else {
        failCount++;
      }
      
      console.log(''); // Add spacing between products
    }

    console.log('🎉 Fredericia product images processing completed!');
    console.log('\n📋 Summary:');
    console.log(`- Successfully processed: ${successCount} products`);
    console.log(`- Failed: ${failCount} products`);
    console.log('\n🔍 Next: Check /fredericia page to see product thumbnails');
    console.log('🔍 Also check individual product pages for variant images');

  } catch (error) {
    console.error('❌ Image processing failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure SANITY_API_TOKEN is set in .env.local');
    console.log('2. Verify Sanity project ID and dataset are correct');
    console.log('3. Check that image files exist in public/fredericia/ directories');
    console.log('4. Ensure you have write permissions in Sanity');
    process.exit(1);
  }
}

// Run the image processing
addFredericiaProductImages();
