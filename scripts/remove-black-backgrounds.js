#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function removeBlackBackground(inputPath, outputPath) {
  try {
    // Read the image and get its metadata
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Processing: ${inputPath}`);
    console.log(`  Original size: ${metadata.width}x${metadata.height}`);
    
    // Method 1: Simple approach - replace very dark pixels with transparency
    // Create a mask for black/very dark pixels
    const { data, info } = await image
      .ensureAlpha() // Ensure the image has an alpha channel
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    // Process the raw pixel data
    const channels = info.channels;
    const threshold = 30; // Darkness threshold (0-255)
    
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // If pixel is very dark (close to black), make it transparent
      if (r < threshold && g < threshold && b < threshold) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }
    
    // Save the processed image
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: channels
      }
    })
    .png()
    .toFile(outputPath);
    
    console.log(`  ✅ Saved: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error processing ${inputPath}:`, error.message);
    return false;
  }
}

async function processAllFredericiaImages() {
  const fredericiaDir = 'public/fredericia';
  
  if (!fs.existsSync(fredericiaDir)) {
    console.error('Fredericia directory not found:', fredericiaDir);
    return;
  }
  
  // Create output directory
  const outputDir = 'public/fredericia-processed';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('🎨 Starting black background removal for Fredericia images...\n');
  
  let processedCount = 0;
  let totalCount = 0;
  
  // Get all subdirectories in fredericia folder
  const productDirs = fs.readdirSync(fredericiaDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const productDir of productDirs) {
    const productPath = path.join(fredericiaDir, productDir);
    const outputProductPath = path.join(outputDir, productDir);
    
    // Create output product directory
    if (!fs.existsSync(outputProductPath)) {
      fs.mkdirSync(outputProductPath, { recursive: true });
    }
    
    console.log(`\n📁 Processing product: ${productDir}`);
    
    // Get all image files in the product directory
    const files = fs.readdirSync(productPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|avif)$/i.test(file)
    );
    
    for (const imageFile of imageFiles) {
      const inputPath = path.join(productPath, imageFile);
      const outputFileName = imageFile.replace(/\.(jpg|jpeg|avif)$/i, '.png');
      const outputPath = path.join(outputProductPath, outputFileName);
      
      totalCount++;
      const success = await removeBlackBackground(inputPath, outputPath);
      if (success) {
        processedCount++;
      }
    }
  }
  
  console.log(`\n🎉 Processing complete!`);
  console.log(`📊 Successfully processed: ${processedCount}/${totalCount} images`);
  console.log(`📂 Output directory: ${outputDir}`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Review the processed images in ${outputDir}`);
  console.log(`   2. If satisfied, replace the original images`);
  console.log(`   3. Update Sanity with the new transparent images`);
}

// Alternative function for more precise black background removal
async function removeBlackBackgroundPrecise(inputPath, outputPath) {
  try {
    console.log(`Processing (precise): ${inputPath}`);
    
    // More sophisticated approach using color replacement
    await sharp(inputPath)
      .png()
      .composite([{
        input: Buffer.from([0, 0, 0, 0]), // Transparent pixel
        raw: { width: 1, height: 1, channels: 4 },
        tile: true,
        blend: 'dest-in'
      }])
      .toFile(outputPath);
    
    console.log(`  ✅ Saved (precise): ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error processing ${inputPath}:`, error.message);
    return false;
  }
}

// Run the script
if (require.main === module) {
  processAllFredericiaImages().catch(console.error);
}

module.exports = { removeBlackBackground, processAllFredericiaImages };
