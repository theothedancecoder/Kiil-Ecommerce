/**
 * Script to update Ablo Blommaert product URLs to match the new route structure
 * Run with: node scripts/update-ablo-blommaert-urls.js
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

// Main function to update Ablo Blommaert product URLs
async function updateAbloBlommaertUrls() {
  try {
    console.log('🔗 Updating Ablo Blommaert product URLs...');
    
    // Fetch all Ablo Blommaert products
    const products = await client.fetch(`
      *[_type == "product" && brand == "Ablo Blommaert"] {
        _id,
        name,
        slug,
        href
      }
    `);
    
    console.log(`Found ${products.length} Ablo Blommaert products to update`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const product of products) {
      try {
        // Create new href based on slug
        const newHref = `/ablo-blommaert/${product.slug.current}`;
        
        console.log(`📝 Updating ${product.name}`);
        console.log(`   Old href: ${product.href || 'none'}`);
        console.log(`   New href: ${newHref}`);
        
        // Update the product with new href
        await client
          .patch(product._id)
          .set({ href: newHref })
          .commit();
        
        console.log(`✅ Updated: ${product.name}`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ Error updating ${product.name}:`, error);
        errorCount++;
      }
    }
    
    console.log('\n🎉 URL update completed!');
    console.log(`✅ Successfully updated: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('\n🔄 Next steps:');
      console.log('1. Test clicking on Ablo Blommaert products in the wall art section');
      console.log('2. Verify individual product pages load correctly');
      console.log('3. Test the purchase flow and add to cart functionality');
    }
    
  } catch (error) {
    console.error('💥 Failed to update URLs:', error);
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
  updateAbloBlommaertUrls();
}

module.exports = { updateAbloBlommaertUrls };
