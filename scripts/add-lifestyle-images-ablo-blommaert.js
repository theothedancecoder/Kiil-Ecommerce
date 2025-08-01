/**
 * Script to add lifestyle images to Ablo Blommaert products
 * Run with: node scripts/add-lifestyle-images-ablo-blommaert.js
 */

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client. Please install @sanity/client:');
    console.error('npm install @sanity/client');
    process.exit(1);
  }
}

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-06-13',
});

// Create sample lifestyle images (placeholder data)
const lifestyleImageData = [
  {
    alt: 'Vintage wall art in modern living room',
    caption: 'Perfect for creating a sophisticated gallery wall'
  },
  {
    alt: 'Ablo Blommaert print in contemporary interior',
    caption: 'Adds timeless elegance to any space'
  }
];

// Main function to add lifestyle images to Ablo Blommaert products
async function addLifestyleImages() {
  try {
    console.log('🎨 Adding lifestyle images to Ablo Blommaert products...');
    
    // Fetch all Ablo Blommaert products
    const products = await client.fetch(`
      *[_type == "product" && brand == "Ablo Blommaert"] {
        _id,
        name,
        lifestyleImages
      }
    `);
    
    console.log(`Found ${products.length} Ablo Blommaert products to update`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const product of products) {
      try {
        console.log(`\n📦 Processing: ${product.name}`);
        
        // Add lifestyle images using patch
        await client
          .patch(product._id)
          .set({
            lifestyleImages: lifestyleImageData
          })
          .commit();
        
        console.log(`✅ Added lifestyle images to: ${product.name}`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ Error updating ${product.name}:`, error);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Lifestyle images update completed!');
    console.log(`✅ Successfully updated: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('\n📋 Changes made:');
      console.log('• Added lifestyle image placeholders to all Ablo Blommaert products');
      console.log('• Each product now has 2 lifestyle image entries with alt text and captions');
      console.log('• Ready for actual lifestyle images to be uploaded to Sanity');
      
      console.log('\n🔄 Next steps:');
      console.log('1. Upload actual lifestyle images to Sanity Studio');
      console.log('2. Replace the placeholder lifestyle image data with real image references');
      console.log('3. Test the product pages to see lifestyle images display');
    }
    
  } catch (error) {
    console.error('💥 Failed to add lifestyle images:', error);
    process.exit(1);
  }
}

// Check environment variables
function checkEnvironment() {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN'
  ];
  
  const missing = required.filter(env => !process.env[env]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(env => console.error(`  - ${env}`));
    console.error('\nPlease set these in your .env.local file');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  checkEnvironment();
  addLifestyleImages();
}

module.exports = { addLifestyleImages };
