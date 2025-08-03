#!/usr/bin/env node

/**
 * Script to fix the 2 missing UMAGE product images by finding their correct IDs in Sanity
 */

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function fixMissingUmageImages() {
  console.log('🔍 Finding and fixing the 2 missing UMAGE product images...\n');

  try {
    // First, let's find all UMAGE products to see their actual IDs
    const umageProducts = await client.fetch(`
      *[_type == "product" && brand == "UMAGE"] {
        _id,
        name,
        image
      }
    `);

    console.log('📋 Found UMAGE products in Sanity:');
    umageProducts.forEach(product => {
      const hasImage = product.image ? '✅' : '❌';
      console.log(`${hasImage} ${product._id}: ${product.name}`);
    });

    // Find the products without images
    const productsWithoutImages = umageProducts.filter(product => !product.image);
    console.log(`\n🔍 Found ${productsWithoutImages.length} products without images:`);
    
    productsWithoutImages.forEach(product => {
      console.log(`❌ ${product._id}: ${product.name}`);
    });

    // The images were already uploaded, we just need to find them and link them
    console.log('\n📸 Looking for uploaded images...');
    
    // Search for the uploaded images by filename patterns
    const conversationPieceImages = await client.fetch(`
      *[_type == "sanity.imageAsset" && originalFilename match "*conversation*"] {
        _id,
        originalFilename,
        url
      }
    `);

    const gatherCafeImages = await client.fetch(`
      *[_type == "sanity.imageAsset" && originalFilename match "*gather*"] {
        _id,
        originalFilename,
        url
      }
    `);

    console.log('\n🖼️  Found conversation piece images:', conversationPieceImages.length);
    conversationPieceImages.forEach(img => console.log(`  - ${img._id}: ${img.originalFilename}`));

    console.log('\n🖼️  Found gather cafe images:', gatherCafeImages.length);
    gatherCafeImages.forEach(img => console.log(`  - ${img._id}: ${img.originalFilename}`));

    // Now let's manually link the images to the correct products
    // We'll search by product name to find the right matches
    
    const conversationPieceProduct = umageProducts.find(p => 
      p.name.toLowerCase().includes('conversation') || 
      p.name.toLowerCase().includes('dining chair')
    );
    
    const gatherCafeProduct = umageProducts.find(p => 
      p.name.toLowerCase().includes('gather') || 
      p.name.toLowerCase().includes('café')
    );

    console.log('\n🎯 Matching products:');
    if (conversationPieceProduct) {
      console.log(`✅ Found conversation piece product: ${conversationPieceProduct._id} - ${conversationPieceProduct.name}`);
    }
    if (gatherCafeProduct) {
      console.log(`✅ Found gather cafe product: ${gatherCafeProduct._id} - ${gatherCafeProduct.name}`);
    }

    // Update products with images
    let updatedCount = 0;

    if (conversationPieceProduct && conversationPieceImages.length > 0 && !conversationPieceProduct.image) {
      const imageAssetId = conversationPieceImages[0]._id;
      await client
        .patch(conversationPieceProduct._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAssetId
            }
          }
        })
        .commit();
      
      console.log(`✅ Updated ${conversationPieceProduct.name} with image ${imageAssetId}`);
      updatedCount++;
    }

    if (gatherCafeProduct && gatherCafeImages.length > 0 && !gatherCafeProduct.image) {
      const imageAssetId = gatherCafeImages[0]._id;
      await client
        .patch(gatherCafeProduct._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAssetId
            }
          }
        })
        .commit();
      
      console.log(`✅ Updated ${gatherCafeProduct.name} with image ${imageAssetId}`);
      updatedCount++;
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} products with images!`);
    console.log('\n🔍 Next: Check /umage page to verify all thumbnails are loading');

  } catch (error) {
    console.error('❌ Failed to fix missing images:', error.message);
    process.exit(1);
  }
}

// Run the fix
fixMissingUmageImages();
