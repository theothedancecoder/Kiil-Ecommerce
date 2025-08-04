#!/usr/bin/env node

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
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

async function uploadOriginalImageToSanity(imagePath, filename) {
  try {
    console.log(`📤 Uploading original: ${filename}`);
    
    // Check if it's an AVIF file that needs conversion
    const fileExtension = path.extname(imagePath).toLowerCase();
    let imageBuffer;
    let finalFilename = filename;
    
    if (fileExtension === '.avif' || (await isAvifFile(imagePath))) {
      console.log(`  🔄 Converting AVIF to JPEG: ${filename}`);
      imageBuffer = await sharp(imagePath)
        .jpeg({ quality: 95 }) // High quality to preserve original look
        .toBuffer();
      finalFilename = filename.replace(/\.(avif|jpg)$/i, '.jpg');
    } else {
      imageBuffer = fs.readFileSync(imagePath);
    }
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: `fredericia-original-${finalFilename}`,
    });
    
    console.log(`  ✅ Uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`  ❌ Error uploading ${filename}:`, error.message);
    return null;
  }
}

async function isAvifFile(filePath) {
  try {
    const buffer = fs.readFileSync(filePath, { start: 0, end: 12 });
    // Check for AVIF file signature
    return buffer.includes(Buffer.from('ftypavif')) || buffer.includes(Buffer.from('ftypavis'));
  } catch {
    return false;
  }
}

async function updateProductWithOriginalImages(productId, imageAssets) {
  try {
    console.log(`🔄 Updating product with original images: ${productId}`);
    
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
      console.log(`  ✅ Product updated successfully with original images`);
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

async function processAllOriginalImages() {
  const originalDir = 'public/fredericia';
  
  if (!fs.existsSync(originalDir)) {
    console.error('❌ Original images directory not found:', originalDir);
    return;
  }
  
  console.log('🚀 Starting upload of ORIGINAL Fredericia images to Sanity...\n');
  
  let totalUploaded = 0;
  let totalProducts = 0;
  let successfulProducts = 0;
  
  // Get all product directories
  const productDirs = fs.readdirSync(originalDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const productDir of productDirs) {
    const productPath = path.join(originalDir, productDir);
    const productId = productIdMapping[productDir];
    
    if (!productId) {
      console.log(`⚠️  Skipping ${productDir} - no product ID mapping found`);
      continue;
    }
    
    console.log(`\n📁 Processing product: ${productDir} (${productId})`);
    totalProducts++;
    
    // Get all image files in the product directory
    const files = fs.readdirSync(productPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|avif)$/i.test(file)
    );
    
    const imageAssets = {
      main: null,
      lifestyle: [],
      variants: [],
    };
    
    // Upload each original image and categorize
    for (const imageFile of imageFiles) {
      const imagePath = path.join(productPath, imageFile);
      const filename = imageFile;
      
      const assetId = await uploadOriginalImageToSanity(imagePath, filename);
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
    
    // Update the product with new original images
    const success = await updateProductWithOriginalImages(productId, imageAssets);
    if (success) {
      successfulProducts++;
    }
  }
  
  console.log(`\n🎉 Upload and update complete!`);
  console.log(`📊 Statistics:`);
  console.log(`   • Original images uploaded: ${totalUploaded}`);
  console.log(`   • Products processed: ${totalProducts}`);
  console.log(`   • Products updated successfully: ${successfulProducts}`);
  console.log(`\n✨ All Fredericia products now use ORIGINAL images from public folder!`);
}

// Run the script
if (require.main === module) {
  processAllOriginalImages().catch(console.error);
}

module.exports = { uploadOriginalImageToSanity, updateProductWithOriginalImages };
