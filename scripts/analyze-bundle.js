#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing Next.js bundle...\n');

try {
  // Build the application
  console.log('📦 Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if .next directory exists
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    console.error('❌ .next directory not found. Build may have failed.');
    process.exit(1);
  }

  // Analyze static files
  const staticDir = path.join(nextDir, 'static');
  if (fs.existsSync(staticDir)) {
    console.log('\n📊 Static file analysis:');
    
    const chunks = path.join(staticDir, 'chunks');
    if (fs.existsSync(chunks)) {
      const files = fs.readdirSync(chunks);
      const jsFiles = files.filter(f => f.endsWith('.js'));
      
      console.log(`   JavaScript chunks: ${jsFiles.length}`);
      
      // Find largest chunks
      const fileSizes = jsFiles.map(file => {
        const filePath = path.join(chunks, file);
        const stats = fs.statSync(filePath);
        return { name: file, size: stats.size };
      }).sort((a, b) => b.size - a.size);

      console.log('\n   Largest chunks:');
      fileSizes.slice(0, 5).forEach(file => {
        const sizeKB = (file.size / 1024).toFixed(2);
        console.log(`   - ${file.name}: ${sizeKB} KB`);
      });
    }
  }

  // Check for build manifest
  const buildManifest = path.join(nextDir, 'build-manifest.json');
  if (fs.existsSync(buildManifest)) {
    const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
    console.log('\n📋 Pages analyzed:');
    Object.keys(manifest.pages).forEach(page => {
      console.log(`   - ${page}`);
    });
  }

  console.log('\n✅ Bundle analysis complete!');
  console.log('\n💡 Tips to improve performance:');
  console.log('   - Use dynamic imports for large components');
  console.log('   - Optimize images with Next.js Image component');
  console.log('   - Enable compression in production');
  console.log('   - Use code splitting for vendor libraries');

} catch (error) {
  console.error('❌ Error analyzing bundle:', error.message);
  process.exit(1);
}
