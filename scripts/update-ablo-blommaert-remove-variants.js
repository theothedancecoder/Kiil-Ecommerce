/**
 * Script to remove variants from Ablo Blommaert wall art products and add lifestyle images
 * Run with: node scripts/update-ablo-blommaert-remove-variants.js
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

// Upload lifestyle image to Sanity
async function uploadLifestyleImage(imagePath, filename) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Lifestyle image not found: ${imagePath}`);
      return null;
    }

    console.log(`📸 Uploading lifestyle image: ${filename}`);
    
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    
    console.log(`✅ Uploaded lifestyle image: ${filename} (ID: ${asset._id})`);
    return asset;
  } catch (error) {
    console.error(`❌ Error uploading lifestyle image ${filename}:`, error);
    return null;
  }
}

// Main function to update Ablo Blommaert products
async function updateAbloBlommaertProducts() {
  try {
    console.log('🎨 Updating Ablo Blommaert wall art products...');
    console.log('📝 Removing variants and adding lifestyle images');
    
    // Fetch all Ablo Blommaert products
    const products = await client.fetch(`
      *[_type == "product" && brand == "Ablo Blommaert"] {
        _id,
        name,
        slug,
        variants
      }
    `);
    
    console.log(`Found ${products.length} Ablo Blommaert products to update`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Create some lifestyle images for wall art context
    const lifestyleImagePaths = [
      'public/interior-collection/wall-art-lifestyle-1.jpg',
      'public/interior-collection/wall-art-lifestyle-2.jpg',
      'public/interior-collection/modern-interior-wall-art.jpg',
      'public/interior-collection/vintage-wall-art-display.jpg'
    ];
    
    // Upload lifestyle images (if they exist)
    const lifestyleAssets = [];
    for (let i = 0; i < lifestyleImagePaths.length; i++) {
      const imagePath = lifestyleImagePaths[i];
      const filename = `wall-art-lifestyle-${i + 1}.jpg`;
      
      // For demo purposes, we'll create placeholder lifestyle image references
      // In a real scenario, you would have actual lifestyle images to upload
      console.log(`📝 Note: Lifestyle image ${filename} would be uploaded from ${imagePath}`);
    }
    
    for (const product of products) {
      try {
        console.log(`\n📦 Processing: ${product.name}`);
        
        // Remove variants and add lifestyle images
        const updatedProduct = {
          ...product,
          variants: undefined, // Remove variants completely
          lifestyleImages: [
            {
              _type: 'image',
              alt: `${product.name} in modern interior setting`,
              caption: 'Styled in a contemporary living space'
            },
            {
              _type: 'image', 
              alt: `${product.name} gallery wall display`,
              caption: 'Perfect for creating a curated gallery wall'
            }
          ]
        };
        
        // Update the product
        await client.createOrReplace(updatedProduct);
        
        console.log(`✅ Updated: ${product.name}`);
        console.log(`   - Removed variants: ${product.variants ? product.variants.length : 0} variants removed`);
        console.log(`   - Added lifestyle images: 2 lifestyle image placeholders added`);
        
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
      console.log('• Added lifestyle image placeholders for better product presentation');
      console.log('• Wall art products now have cleaner, variant-free display');
      
      console.log('\n🔄 Next steps:');
      console.log('1. Test the updated product pages to verify variants are removed');
      console.log('2. Add actual lifestyle images to the public folder if desired');
      console.log('3. Update the product page component to display lifestyle images');
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
  updateAbloBlommaertProducts();
}

module.exports = { updateAbloBlommaertProducts };
