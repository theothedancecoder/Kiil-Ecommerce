#!/usr/bin/env node

/**
 * Script to add main thumbnail images to existing UMAGE products in Sanity
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Mapping of product IDs to their main image paths
const productImageMappings = {
  'umage-a-conversation-piece-dining-chair': '/umage/A-Conversation-Piece/umage_packshoA Conversation Piece dining chair 7,499 krt_5589c740-01_a-conversation-piece_dining-chair_oak_sugar-brown_-2_900x.webp',
  'umage-gather-cafe-table': '/umage/Gather-Café-table/ Gather Café table 8.999 kr.webp',
  'umage-heiko-dining-chair': '/umage/Heiko-dinning-chair/umage_packshot_5538_heiko_dining-chair_oak_-2_900x.webp',
  'umage-audacious-desk': '/umage/Audacious-desk/umage_packshot_5608c707-01_audacious_desk_sugar_brown_oak_2_900x.webp',
  'umage-treasures-dresser': '/umage/Treasures Dresser/umage_packshot_5624c735-01_treasures-dresser_oak_sugar-brown_-2_900x.webp',
  'umage-asteria-spotlight': '/umage/Asteria-spotlight/umage_packshot_2496_asteria_spot_plated_brass_4_900x.webp',
  'umage-chordis': '/umage/Chordis/umage_packshot_2523_chordis_brass_-2_900x.webp',
  'umage-comfort-circle-dining-table': '/umage/Comfort-Circle-dining-table/umage_packshot_5156-5156-1_comfort_circle_rippled_black_oak_2_1400x.webp',
  'umage-duende-desk': '/umage/Duende-desk/umage_packshot_5605_duende_oak_1_900x.webp',
  'umage-heart-n-soul-200-dining-table': '/umage/Heart\'n\'Soul-200-dining-table-200/umage_packshot_5658_heart-n-soul_dining-table_oak_-2_6d603e60-d050-4480-8863-d04d03022f7d_900x.webp',
  'umage-heart-n-soul-console-table': '/umage/Heart\'n\'Soul-console-table/umage_packshot_5110_heart-n-soul_console-table_black-oak_-2_900x.webp',
  'umage-heart-n-soul-dining-table': '/umage/Heart\'n\'Soul-Dinning table/umage_packshot_5132_heart-n-soul_dining-table-120_black-oak_-3-_1_900x.webp',
  'umage-heart-n-soul-dining-120': '/umage/Heart\'n\'Soul-dinning-120/umage_packshot_5659_heart_n_soul_dining_table_120_oak_2_f7100c94-d1c3-43d6-9ed0-6893363dac34_900x.webp',
  'umage-italic-table': '/umage/Italic/umage_packshot_5523c5523-2_italic_oak_glass_2_900x.webp',
  'umage-lemon-squeeze-ceiling-lamp': '/umage/Lemon-Squeeze-ceiling-lamp/umage_packshot_2202_lemon-squeeze_pendant-lamp_long_penta_plated-brass_1400x.webp',
  'umage-lemon-squeeze-wall-lamp-double': '/umage/Lemon-Squeeze-wall-lamp,double/umage_packshot_2621_lemon-squeeze_wall-lamp_short_double_plated-brass_2b9ca272-8267-494d-8dd1-41f2461905a6_1400x.webp',
  'umage-lemon-squeeze-wall-lamp-single': '/umage/Lemon-Squeeze-wall-lamp,single/umage_packshot_2200_lemon-squeeze_wall-lamp_long_single_plated-brass_1400x.webp',
  'umage-lounge-around-3-seater': '/umage/Lounge-Around-3-seter/umage_packshot_5550c723-01_lounge_around_3-seater_oak_sugar_brown_2_59509b40-b394-46b2-bbd4-cf8d5fe0f15f_900x.webp',
  'umage-lounge-around-shuffle-coffee-table': '/umage/Lounge-Around-Shuffle-coffee-table/umage_packshot_5552_lounge-around-shuffle_oak_-3_e7c808bb-3f3c-4857-8052-b7c6e0de3f98_900x.webp',
  'umage-lounge-around-shuffle-puff': '/umage/Lounge-Around-Shuffle-puff/umage_packshot_5552c720-01_lounge_around_shuffle_oak_sugar_brown_3_900x.webp',
  'umage-metal-cover-accessories-asteria': '/umage/Metal-Cover-accessories-for-Asteria/4172_900x.webp',
  'umage-stories-shelving': '/umage/Stories-shelving/umage_packshot_5621_stories_oak_2_900x.webp',
  'umage-the-reader': '/umage/The-Reader/umage_packshot_5502-702-01_the_reader_oak_sugar_brown_2_7b723e73-d1fc-4340-9e5b-a540aed0b1aa_900x.webp',
  'umage-the-socialite-bar-stool': '/umage/The-Socialite-bar-stool/umage_packshot_5881_the-socialite_bar-stool_dark-oak_-2_900x.webp',
  'umage-the-socialite-counter-chair': '/umage/The-Socialite-counter-chair/umage_packshot_5119_the-socialite_counter-stool_black-oak_-2_900x.webp'
};

async function uploadImageToSanity(imagePath, productId) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    // Read the image file
    const imageBuffer = fs.readFileSync(fullPath);
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    console.log(`✅ Uploaded image for ${productId}: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Failed to upload image for ${productId}:`, error.message);
    return null;
  }
}

async function updateProductWithImage(productId, imageAssetId) {
  try {
    const product = await client.getDocument(productId);
    if (!product) {
      console.log(`⚠️  Product not found: ${productId}`);
      return;
    }

    // Update the product with the image reference
    const updatedProduct = await client
      .patch(productId)
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

    console.log(`✅ Updated product ${productId} with image`);
  } catch (error) {
    console.error(`❌ Failed to update product ${productId}:`, error.message);
  }
}

async function addUmageProductImages() {
  console.log('🚀 Adding main thumbnail images to UMAGE products in Sanity...\n');

  try {
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
    }
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('Missing SANITY_API_TOKEN environment variable');
    }

    console.log(`📡 Connected to Sanity project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

    let successCount = 0;
    let failCount = 0;

    for (const [productId, imagePath] of Object.entries(productImageMappings)) {
      console.log(`📸 Processing ${productId}...`);
      
      // Upload image to Sanity
      const imageAssetId = await uploadImageToSanity(imagePath, productId);
      
      if (imageAssetId) {
        // Update product with image reference
        await updateProductWithImage(productId, imageAssetId);
        successCount++;
      } else {
        failCount++;
      }
      
      console.log(''); // Add spacing between products
    }

    console.log('🎉 UMAGE product images processing completed!');
    console.log('\n📋 Summary:');
    console.log(`- Successfully processed: ${successCount} products`);
    console.log(`- Failed: ${failCount} products`);
    console.log('\n🔍 Next: Check /umage page to see product thumbnails');

  } catch (error) {
    console.error('❌ Image processing failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure SANITY_API_TOKEN is set in .env.local');
    console.log('2. Verify Sanity project ID and dataset are correct');
    console.log('3. Check that image files exist in public/umage/ directories');
    console.log('4. Ensure you have write permissions in Sanity');
    process.exit(1);
  }
}

// Run the image processing
addUmageProductImages();
