/**
 * Script to properly remove variants from Ablo Blommaert products using patch operations
 * Run with: node scripts/fix-ablo-blommaert-variants.js
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

// Main function to fix Ablo Blommaert products
async function fixAbloBlommaertProducts() {
  try {
    console.log('🔧 Fixing Ablo Blommaert wall art products...');
    console.log('📝 Removing variants using patch operations');
    
    // Fetch all Ablo Blommaert products with full document structure
    const products = await client.fetch(`
      *[_type == "product" && brand == "Ablo Blommaert"] {
        _id,
        _type,
        name,
        slug,
        variants
      }
    `);
    
    console.log(`Found ${products.length} Ablo Blommaert products to update`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const product of products) {
      try {
        console.log(`\n📦 Processing: ${product.name}`);
        
        if (product.variants && product.variants.length > 0) {
          console.log(`   - Found ${product.variants.length} variants to remove`);
          
          // Use patch to unset the variants field
          await client
            .patch(product._id)
            .unset(['variants'])
            .commit();
          
          console.log(`✅ Removed variants from: ${product.name}`);
        } else {
          console.log(`   - No variants found, skipping`);
        }
        
        successCount++;
        
      } catch (error) {
        console.error(`❌ Error updating ${product.name}:`, error);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Product update completed!');
    console.log(`✅ Successfully updated: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('\n📋 Changes made:');
      console.log('• Removed all variants from Ablo Blommaert products');
      console.log('• Wall art products now have cleaner, variant-free display');
      
      console.log('\n🔄 Next steps:');
      console.log('1. Test the updated product pages to verify variants are removed');
      console.log('2. Update the product page component to handle missing variants gracefully');
    }
    
  } catch (error) {
    console.error('💥 Failed to update products:', error);
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
  fixAbloBlommaertProducts();
}

module.exports = { fixAbloBlommaertProducts };
