const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Louis Poulsen Git LFS Issue...');

try {
  // Step 1: Remove all Louis Poulsen images from Git cache
  console.log('📁 Removing Louis Poulsen images from Git cache...');
  
  // Get all Louis Poulsen image files
  const result = execSync('find public/Louis-Poulsen -name "*.webp" -o -name "*.jpg" -o -name "*.png"', { encoding: 'utf8' });
  const files = result.trim().split('\n').filter(file => file.length > 0);
  
  console.log(`Found ${files.length} Louis Poulsen image files`);
  
  // Remove files from Git cache in batches to avoid command line length limits
  const batchSize = 10;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    try {
      execSync(`git rm --cached ${batch.map(f => `"${f}"`).join(' ')}`, { stdio: 'inherit' });
      console.log(`✅ Removed batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(files.length/batchSize)} from Git cache`);
    } catch (error) {
      console.log(`⚠️  Some files in batch ${Math.floor(i/batchSize) + 1} were not in cache (this is normal)`);
    }
  }
  
  // Step 2: Re-add files as regular Git files
  console.log('📦 Re-adding files as regular Git files...');
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    execSync(`git add ${batch.map(f => `"${f}"`).join(' ')}`, { stdio: 'inherit' });
    console.log(`✅ Added batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(files.length/batchSize)} as regular Git files`);
  }
  
  // Step 3: Commit the changes
  console.log('💾 Committing changes...');
  execSync('git commit -m "Fix Louis Poulsen images: Remove from Git LFS and add as regular files"', { stdio: 'inherit' });
  
  console.log('🎉 Louis Poulsen Git LFS issue fixed successfully!');
  console.log('📤 Push changes to deploy: git push origin main');
  
} catch (error) {
  console.error('❌ Error fixing Louis Poulsen Git LFS issue:', error.message);
  process.exit(1);
}
