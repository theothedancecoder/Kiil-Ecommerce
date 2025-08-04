#!/usr/bin/env node

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Corrected mapping of folder names to actual product IDs in Sanity
const productIdMapping = {
  'bm71-library-table': 'product-fredericia-bm71-library-table',
  'canvas-chair': 'fredericia-the-canvas-chair',
  'corona-armchair': 'fredericia-ej-5-corona-armchair',
  'delphi-elements-sofa': 'product-fredericia-delphi-elements-sofa',
  'delphi-sofa': 'fredericia-delphi-sofa-2-seater',
  'ej220-sofa': 'product-fredericia-ej220-sofa-2-seater',
  'insula-piccolo-side-table': 'fredericia-insula-piccolo-side-table',
  'mogensen-dining-table': 'fredericia-mogensen-6284-dining-table',
  'mogensen-j39-dining-chair': 'fredericia-mogensen-j39-dining-chair',
  'piloti-coffee-table': 'fredericia-piloti-coffee-table',
  'post-dining-chair': 'fredericia-post-dining-chair-with-wooden-seat',
  'risom-magazine-table': 'fredericia-risom-magazine-table',
  'trinidad-chair': 'fredericia-trinidad-chair',
  'wegner-j16-rocking-chair': 'fredericia-wegner-j16-rocking-chair',
  'wegner-ox-chair': 'product-fredericia-wegner-ox-chair',
};

async function uploadImageToSanity(imagePath, filename) {
  try {
    console.log(`📤 Uploading: ${filename}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    console.log(`  ✅ Uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`  ❌ Error uploading ${filename}:`, error.message);
    return null;
  }
}

async function updateProductWithNewImages(productId, imageAssets) {
  try {
    console.log(`🔄 Updating product: ${productId}`);
    
    // Get current product data
    const currentProduct = await client.getDocument(productId);
    if (!currentProduct) {
      console.error(`  ❌ Product not found: ${productId}`);
      return false;
    }
    
    const updates = {};
    
    // Update main image if available
    if (imageAssets.main) {
      updates.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssets.main,
        },
      };
      console.log(`  📸 Updated main image`);
    }
    
    // Update lifestyle images if available
    if (imageAssets.lifestyle && imageAssets.lifestyle.length > 0) {
      updates.lifestyleImages = imageAssets.lifestyle.map(assetId => ({
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
      }));
      console.log(`  🖼️  Updated ${imageAssets.lifestyle.length} lifestyle images`);
    }
    
    // Update variant images if available
    if (imageAssets.variants && imageAssets.variants.length > 0 && currentProduct.variants) {
      const updatedVariants = currentProduct.variants.map((variant, index) => {
        if (imageAssets.variants[index]) {
          return {
            ...variant,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAssets.variants[index],
              },
            },
          };
        }
        return variant;
      });
      updates.variants = updatedVariants;
      console.log(`  🎨 Updated ${imageAssets.variants.length} variant images`);
    }
    
    // Apply updates
    if (Object.keys(updates).length > 0) {
      await client.patch(productId).set(updates).commit();
      console.log(`  ✅ Product updated successfully`);
      return true;
    } else {
      console.log(`  ⚠️  No updates needed`);
      return true;
    }
    
  } catch (error) {
    console.error(`  ❌ Error updating product ${productId}:`, error.message);
    return false;
  }
}

async function processAllProcessedImages() {
  const processedDir = 'public/fredericia-processed';
  
  if (!fs.existsSync(processedDir)) {
    console.error('❌ Processed images directory not found:', processedDir);
    return;
  }
  
  console.log('🚀 Starting upload of processed Fredericia images to Sanity (CORRECTED)...\n');
  
  let totalUploaded = 0;
  let totalProducts = 0;
  let successfulProducts = 0;
  
  // Get all product directories
  const productDirs = fs.readdirSync(processedDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const productDir of productDirs) {
    const productPath = path.join(processedDir, productDir);
    const productId = productIdMapping[productDir];
    
    if (!productId) {
      console.log(`⚠️  Skipping ${productDir} - no product ID mapping found`);
      continue;
    }
    
    console.log(`\n📁 Processing product: ${productDir} (${productId})`);
    totalProducts++;
    
    // Get all PNG files in the product directory
    const files = fs.readdirSync(productPath);
    const imageFiles = files.filter(file => file.endsWith('.png'));
    
    const imageAssets = {
      main: null,
      lifestyle: [],
      variants: [],
    };
    
    // Upload each image and categorize
    for (const imageFile of imageFiles) {
      const imagePath = path.join(productPath, imageFile);
      const filename = `fredericia-transparent-${productDir}-${imageFile}`;
      
      const assetId = await uploadImageToSanity(imagePath, filename);
      if (assetId) {
        totalUploaded++;
        
        // Categorize the image
        if (imageFile.startsWith('main.')) {
          imageAssets.main = assetId;
        } else if (imageFile.startsWith('lifestyle')) {
          imageAssets.lifestyle.push(assetId);
        } else if (imageFile.startsWith('variant')) {
          imageAssets.variants.push(assetId);
        }
      }
    }
    
    // Update the product with new images
    const success = await updateProductWithNewImages(productId, imageAssets);
    if (success) {
      successfulProducts++;
    }
  }
  
  console.log(`\n🎉 Upload and update complete!`);
  console.log(`📊 Statistics:`);
  console.log(`   • Images uploaded: ${totalUploaded}`);
  console.log(`   • Products processed: ${totalProducts}`);
  console.log(`   • Products updated successfully: ${successfulProducts}`);
  console.log(`\n✨ All Fredericia products now have transparent backgrounds!`);
}

// Run the script
if (require.main === module) {
  processAllProcessedImages().catch(console.error);
}

module.exports = { uploadImageToSanity, updateProductWithNewImages };
