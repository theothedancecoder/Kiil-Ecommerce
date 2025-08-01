#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Vercel deployment limits...\n');

// Check public folder size
function getDirectorySize(dirPath) {
  let totalSize = 0;
  let fileCount = 0;
  
  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);
    
    if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    } else {
      totalSize += stats.size;
      fileCount++;
    }
  }
  
  try {
    calculateSize(dirPath);
    return { totalSize, fileCount };
  } catch (error) {
    return { totalSize: 0, fileCount: 0 };
  }
}

const publicPath = path.join(__dirname, '../public');
const { totalSize, fileCount } = getDirectorySize(publicPath);

const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
const sizeInGB = (totalSize / (1024 * 1024 * 1024)).toFixed(2);

console.log('📊 Public Folder Analysis:');
console.log(`Total size: ${sizeInMB} MB (${sizeInGB} GB)`);
console.log(`Total files: ${fileCount.toLocaleString()}`);
console.log('');

// Vercel limits
console.log('⚠️  Vercel Limits:');
console.log('• Hobby Plan: ~100MB total deployment size');
console.log('• Pro Plan: ~500MB total deployment size');
console.log('• Function payload: 50MB max');
console.log('• Recommended: <10,000 files');
console.log('');

// Analysis
if (sizeInMB > 100) {
  console.log('❌ ISSUE IDENTIFIED: Public folder exceeds Vercel limits!');
  console.log('');
  console.log('🔧 Solutions:');
  console.log('1. **Move images to external CDN** (Recommended)');
  console.log('   - Upload to Cloudinary, AWS S3, or similar');
  console.log('   - Update image paths to use CDN URLs');
  console.log('');
  console.log('2. **Use Sanity for all images**');
  console.log('   - Upload images to Sanity CMS');
  console.log('   - Use Sanity\'s built-in CDN');
  console.log('');
  console.log('3. **Reduce image sizes**');
  console.log('   - Compress images (WebP format)');
  console.log('   - Remove unused images');
  console.log('   - Use smaller dimensions');
} else {
  console.log('✅ Public folder size is within Vercel limits');
}

if (fileCount > 10000) {
  console.log('⚠️  High file count may cause deployment timeouts');
}

console.log('');
console.log('💡 Immediate Test:');
console.log('Try accessing this URL directly in your browser:');
console.log('https://your-vercel-domain.vercel.app/Fritz%20Hansen/Regatta-Chair/S1508500-Regatta-Lounge-Chair.jpg');
console.log('');
console.log('If it returns 404, the files aren\'t being deployed to Vercel.');
