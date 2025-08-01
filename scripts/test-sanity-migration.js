#!/usr/bin/env node

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
  useCdn: false
});

console.log('🧪 Testing Sanity Migration Setup...\n');

async function testSanityConnection() {
  try {
    console.log('🔍 Testing Sanity connection...');
    const datasets = await client.datasets.list();
    console.log(`✅ Connected to Sanity project: ${client.config().projectId}`);
    console.log(`📊 Available datasets: ${datasets.map(d => d.name).join(', ')}`);
    return true;
  } catch (error) {
    console.error('❌ Sanity connection failed:', error.message);
    return false;
  }
}

async function testTokenPermissions() {
  try {
    console.log('\n🔑 Testing API token permissions...');
    
    // Try to create a test document
    const testDoc = await client.create({
      _type: 'category',
      title: 'Test Category - DELETE ME',
      slug: {
        _type: 'slug',
        current: 'test-category-delete-me'
      }
    });
    
    console.log('✅ Token has write permissions');
    
    // Clean up test document
    await client.delete(testDoc._id);
    console.log('✅ Test document cleaned up');
    
    return true;
  } catch (error) {
    console.error('❌ Token permission test failed:', error.message);
    console.log('💡 Make sure your SANITY_API_TOKEN has "Editor" permissions');
    return false;
  }
}

async function checkExistingData() {
  try {
    console.log('\n📊 Checking existing Sanity data...');
    
    const products = await client.fetch('*[_type == "product"]');
    const categories = await client.fetch('*[_type == "category"]');
    const assets = await client.fetch('*[_type == "sanity.imageAsset"]');
    
    console.log(`📦 Existing products: ${products.length}`);
    console.log(`📁 Existing categories: ${categories.length}`);
    console.log(`🖼️  Existing image assets: ${assets.length}`);
    
    if (products.length > 0) {
      console.log('\n📋 Sample products:');
      products.slice(0, 3).forEach((product, i) => {
        console.log(`${i + 1}. ${product.name} (${product.brand || 'No brand'})`);
      });
    }
    
    return { products: products.length, categories: categories.length, assets: assets.length };
  } catch (error) {
    console.error('❌ Failed to check existing data:', error.message);
    return null;
  }
}

async function estimateMigrationTime() {
  const fs = require('fs');
  const path = require('path');
  
  console.log('\n⏱️  Estimating migration time...');
  
  // Count images in public folder
  function countImages(dir = path.join(__dirname, '../public'), count = 0) {
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
          count = countImages(itemPath, count);
        } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(item)) {
          count++;
        }
      }
    } catch (error) {
      // Directory might not exist
    }
    return count;
  }
  
  const imageCount = countImages();
  const estimatedMinutes = Math.ceil(imageCount / 60); // ~1 image per second with delays
  
  console.log(`📊 Images to migrate: ${imageCount.toLocaleString()}`);
  console.log(`⏱️  Estimated time: ${estimatedMinutes} minutes`);
  console.log(`💾 Estimated Sanity storage: ${(imageCount * 0.5).toFixed(1)} MB`);
  
  return imageCount;
}

async function validateEnvironment() {
  console.log('\n🔧 Validating environment variables...');
  
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error(`❌ Missing environment variables: ${missing.join(', ')}`);
    console.log('\n💡 Add these to your .env.local file:');
    missing.forEach(key => {
      console.log(`${key}=your_value_here`);
    });
    return false;
  }
  
  console.log('✅ All required environment variables are set');
  return true;
}

async function generateMigrationPlan() {
  console.log('\n📋 Migration Plan:');
  console.log('1. ✅ Environment validation');
  console.log('2. ✅ Sanity connection test');
  console.log('3. ✅ Token permissions check');
  console.log('4. 🔄 Create Sanity products (run: node scripts/create-sanity-products.js)');
  console.log('5. 🔄 Upload images to Sanity (run: node scripts/migrate-images-to-sanity.js)');
  console.log('6. 🔄 Update product documents with image references');
  console.log('7. 🔄 Test application with Sanity images');
  console.log('8. 🔄 Deploy to Vercel');
  console.log('9. 🔄 Remove static images from public folder');
  
  console.log('\n🎯 Expected Results:');
  console.log('• Deployment size: 996MB → ~50MB (95% reduction)');
  console.log('• Image loading: Broken → Fast (Sanity CDN)');
  console.log('• Format support: Original → WebP/AVIF');
  console.log('• Global delivery: No → Yes (CDN)');
  console.log('• Management: File system → Sanity Studio');
}

async function main() {
  const envValid = await validateEnvironment();
  if (!envValid) return;
  
  const connected = await testSanityConnection();
  if (!connected) return;
  
  const hasPermissions = await testTokenPermissions();
  if (!hasPermissions) return;
  
  await checkExistingData();
  const imageCount = await estimateMigrationTime();
  await generateMigrationPlan();
  
  console.log('\n🚀 Ready to start migration!');
  console.log('\n📖 Next steps:');
  console.log('1. Review the SANITY_MIGRATION_GUIDE.md');
  console.log('2. Run: node scripts/create-sanity-products.js');
  console.log('3. Run: node scripts/migrate-images-to-sanity.js');
  
  if (imageCount > 5000) {
    console.log('\n⚠️  Large migration detected:');
    console.log('• Consider running migration during off-peak hours');
    console.log('• Monitor Sanity usage limits');
    console.log('• Have backup of images before starting');
  }
}

if (require.main === module) {
  main().catch(console.error);
}
