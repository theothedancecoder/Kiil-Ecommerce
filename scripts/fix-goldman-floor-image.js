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

    console.log(`📤 Uploading: ${imagePath}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    console.log(`✅ Uploaded: ${asset._id}`);
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

async function fixGoldmanFloorImage() {
  console.log('🎯 Fixing Goldman Floor image...\n');

  try {
    // Find the Goldman Floor product
    const products = await client.fetch(
      `*[_type == "product" && (slug.current == "goldman-floor" || name match "*Goldman*") && references(*[_type == "category" && title == "FLOS"]._id)]`
    );

    if (products.length === 0) {
      console.log('❌ Goldman Floor product not found');
      return;
    }

    const product = products[0];
    console.log(`✅ Found product: ${product.name} (${product._id})`);

    // Check if product already has an image
    if (product.image?.asset) {
      console.log(`ℹ️  Product already has image: ${product.image.asset._ref}`);
      return;
    }

    // Try to find a suitable FLOS image
    const possibleImages = [
      'public/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Transparent.webp',
      'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif',
      'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif',
      'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg',
      'public/FLOS/Bilboquet-bordlampe-Flos/Bilboquet bordlampe Flos kr 3 295  Farge - Linen.jpg'
    ];

    let uploadedImage = null;
    for (const imagePath of possibleImages) {
      if (fs.existsSync(imagePath)) {
        uploadedImage = await uploadImageToSanity(imagePath, 'Goldman Floor Lamp');
        if (uploadedImage) break;
      }
    }

    if (uploadedImage) {
      await client.patch(product._id).set({ image: uploadedImage }).commit();
      console.log(`✅ Updated Goldman Floor with image`);
    } else {
      console.log(`❌ No suitable image found for Goldman Floor`);
    }

  } catch (error) {
    console.error('❌ Error fixing Goldman Floor image:', error.message);
  }

  console.log('\n🎉 Goldman Floor image fix completed!');
}

fixGoldmanFloorImage().catch(console.error);
