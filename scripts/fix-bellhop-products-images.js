#!/usr/bin/env node

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function uploadImageToSanity(imagePath, altText) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image not found: ${imagePath}`);
      return null;
    }

    console.log(`📤 Uploading: ${path.basename(imagePath)}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${imagePath}:`, error.message);
    return null;
  }
}

async function fixBellhopProducts() {
  console.log('🎯 Fixing Bellhop and Goldman Table products specifically...\n');

  // Target the specific products that showed placeholder images
  const targetProducts = [
    'Bellhop Floor',
    'Bellhop Rechargeable Table Lamp', 
    'Bellhop Table',
    'Goldman Table'
  ];

  try {
    for (const productName of targetProducts) {
      console.log(`\n🔍 Processing: ${productName}`);

      // Search for the product
      const products = await client.fetch(
        `*[_type == "product" && name match $productName] {
          _id,
          name,
          slug,
          image,
          brand
        }`,
        { productName: `*${productName}*` }
      );

      if (products.length === 0) {
        console.log(`❌ Product not found: ${productName}`);
        continue;
      }

      const product = products[0];
      console.log(`✅ Found: ${product.name} (${product._id})`);

      // Check current image status
      if (product.image?.asset) {
        console.log(`ℹ️  Product already has image assigned`);
        
        // Try to fetch the image asset to verify it exists
        try {
          const imageAsset = await client.fetch(
            `*[_type == "sanity.imageAsset" && _id == $imageId][0]`,
            { imageId: product.image.asset._ref || product.image.asset._id }
          );
          
          if (imageAsset) {
            console.log(`✅ Image asset exists: ${imageAsset.url}`);
            continue; // Skip if image is properly assigned and exists
          } else {
            console.log(`⚠️  Image asset missing, will re-upload`);
          }
        } catch (err) {
          console.log(`⚠️  Error checking image asset, will re-upload`);
        }
      }

      // Select appropriate image based on product type
      let imagePath = null;
      if (productName.includes('Floor')) {
        imagePath = 'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif';
      } else if (productName.includes('Table')) {
        imagePath = 'public/FLOS/IC-Lights-T1-Low/IC Lights T1 Low NOK  6,120  Color -  Chrome.webp';
      } else {
        imagePath = 'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg';
      }

      // Try alternative images if primary doesn't exist
      const alternativeImages = [
        'public/FLOS/Bilboquet-bordlampe-Flos/Bilboquet bordlampe Flos kr 3 295  Farge - Linen.jpg',
        'public/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Transparent.webp',
        'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Matte Black.jpg'
      ];

      if (!fs.existsSync(imagePath)) {
        for (const altPath of alternativeImages) {
          if (fs.existsSync(altPath)) {
            imagePath = altPath;
            break;
          }
        }
      }

      if (imagePath && fs.existsSync(imagePath)) {
        const uploadedImage = await uploadImageToSanity(imagePath, product.name);
        
        if (uploadedImage) {
          await client.patch(product._id).set({ image: uploadedImage }).commit();
          console.log(`✅ Successfully updated: ${product.name}`);
        } else {
          console.log(`❌ Failed to upload image for: ${product.name}`);
        }
      } else {
        console.log(`❌ No suitable image found for: ${product.name}`);
      }
    }

  } catch (error) {
    console.error('❌ Error fixing Bellhop products:', error.message);
  }

  console.log('\n🎉 Bellhop products fix completed!');
}

fixBellhopProducts().catch(console.error);
