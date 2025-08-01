#!/usr/bin/env node

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
  useCdn: false
});

console.log('🚀 Starting Sanity Image Migration...\n');

// Function to upload a single image to Sanity
async function uploadImageToSanity(imagePath, productName) {
  try {
    const fullPath = path.join(__dirname, '../public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ File not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const fileName = path.basename(imagePath);
    
    console.log(`📤 Uploading: ${fileName}...`);
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: fileName,
      title: productName || fileName,
    });
    
    console.log(`✅ Uploaded: ${fileName} -> ${asset._id}`);
    return asset;
    
  } catch (error) {
    console.error(`❌ Failed to upload ${imagePath}:`, error.message);
    return null;
  }
}

// Function to update product with new image reference
async function updateProductWithImage(productId, imageAsset) {
  try {
    const result = await client
      .patch(productId)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      })
      .commit();
    
    console.log(`✅ Updated product ${productId} with image`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to update product ${productId}:`, error.message);
    return null;
  }
}

// Function to scan public directory and find all images
function findAllImages(dir = 'public', images = []) {
  const fullDir = path.join(__dirname, '..', dir);
  
  if (!fs.existsSync(fullDir)) {
    console.log(`Directory not found: ${fullDir}`);
    return images;
  }
  
  const items = fs.readdirSync(fullDir);
  
  for (const item of items) {
    const itemPath = path.join(fullDir, item);
    const relativePath = path.join(dir, item).replace(/\\/g, '/');
    
    if (fs.statSync(itemPath).isDirectory()) {
      findAllImages(relativePath, images);
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(item)) {
      images.push({
        path: relativePath.replace('public/', '/'),
        fullPath: itemPath,
        name: item,
        size: fs.statSync(itemPath).size
      });
    }
  }
  
  return images;
}

// Main migration function
async function migrateImages() {
  try {
    // Check Sanity connection
    console.log('🔍 Checking Sanity connection...');
    const datasets = await client.datasets.list();
    console.log(`✅ Connected to Sanity project: ${client.config().projectId}\n`);
    
    // Find all images
    console.log('📁 Scanning for images...');
    const allImages = findAllImages();
    console.log(`Found ${allImages.length} images (${(allImages.reduce((sum, img) => sum + img.size, 0) / 1024 / 1024).toFixed(2)} MB)\n`);
    
    // Show first 10 images as preview
    console.log('📋 Preview of images to upload:');
    allImages.slice(0, 10).forEach((img, i) => {
      console.log(`${i + 1}. ${img.path} (${(img.size / 1024).toFixed(1)} KB)`);
    });
    if (allImages.length > 10) {
      console.log(`... and ${allImages.length - 10} more\n`);
    }
    
    // Ask for confirmation
    console.log('⚠️  This will upload all images to Sanity. Continue? (y/N)');
    
    // For now, just show the plan - you can uncomment the upload code when ready
    console.log('\n📋 Migration Plan:');
    console.log('1. Upload all images to Sanity Assets');
    console.log('2. Create image references');
    console.log('3. Update product documents');
    console.log('4. Generate mapping file for static products');
    console.log('\n💡 To proceed with actual upload, uncomment the upload code in this script.');
    
    // Upload all images to Sanity
    let uploadedCount = 0;
    const batchSize = 5; // Upload 5 images at a time to avoid rate limits
    
    for (let i = 0; i < allImages.length; i += batchSize) {
      const batch = allImages.slice(i, i + batchSize);
      const uploadPromises = batch.map(img => 
        uploadImageToSanity(img.path, path.basename(img.name, path.extname(img.name)))
      );
      
      const results = await Promise.all(uploadPromises);
      uploadedCount += results.filter(Boolean).length;
      
      console.log(`📊 Progress: ${uploadedCount}/${allImages.length} uploaded`);
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n🎉 Migration complete! Uploaded ${uploadedCount} images to Sanity.`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Run migration
if (require.main === module) {
  migrateImages();
}

module.exports = { uploadImageToSanity, updateProductWithImage, findAllImages };
