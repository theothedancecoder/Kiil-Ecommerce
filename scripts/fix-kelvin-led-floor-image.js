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

async function fixKelvinLedFloorImage() {
  console.log('🎯 Fixing Kelvin LED Floor image...\n');

  try {
    // Search for Kelvin LED Floor with multiple strategies
    console.log('1. Searching by slug "kelvin-led-floor"...');
    let products = await client.fetch(
      `*[_type == "product" && slug.current == "kelvin-led-floor"]`
    );
    console.log(`Found ${products.length} products by slug`);

    if (products.length === 0) {
      console.log('2. Searching by name containing "Kelvin"...');
      products = await client.fetch(
        `*[_type == "product" && name match "*Kelvin*"]`
      );
      console.log(`Found ${products.length} products by name`);
    }

    if (products.length === 0) {
      console.log('3. Searching FLOS products for LED Floor...');
      products = await client.fetch(
        `*[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id) && name match "*LED*Floor*"]`
      );
      console.log(`Found ${products.length} products by LED Floor`);
    }

    if (products.length === 0) {
      console.log('❌ Kelvin LED Floor product not found');
      return;
    }

    const product = products[0];
    console.log(`✅ Found product: ${product.name} (${product._id})`);

    // Check if product already has an image
    if (product.image?.asset) {
      console.log(`ℹ️  Product already has image: ${product.image.asset._ref || product.image.asset._id}`);
      return;
    }

    // Try to upload a suitable image for Kelvin LED Floor
    const possibleImages = [
      'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif',
      'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif',
      'public/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Transparent.webp',
      'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg'
    ];

    let uploadedImage = null;
    for (const imagePath of possibleImages) {
      if (fs.existsSync(imagePath)) {
        try {
          console.log(`📤 Uploading: ${path.basename(imagePath)}`);
          const imageBuffer = fs.readFileSync(imagePath);
          const asset = await client.assets.upload('image', imageBuffer, {
            filename: path.basename(imagePath),
          });
          
          uploadedImage = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
            alt: product.name,
          };

          await client.patch(product._id).set({ image: uploadedImage }).commit();
          console.log(`✅ Successfully uploaded and assigned image to ${product.name}`);
          break;
        } catch (error) {
          console.error(`❌ Failed to upload ${imagePath}:`, error.message);
        }
      }
    }

    if (!uploadedImage) {
      console.log(`❌ No suitable image found for ${product.name}`);
    }

  } catch (error) {
    console.error('❌ Error fixing Kelvin LED Floor image:', error.message);
  }

  console.log('\n🎉 Kelvin LED Floor image fix completed!');
}

fixKelvinLedFloorImage().catch(console.error);
