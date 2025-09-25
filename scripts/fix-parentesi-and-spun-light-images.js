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

async function fixParentesiAndSpunLight() {
  console.log('🎯 Fixing Parentesi Suspension and Spun Light F with available images...\n');

  // Target the specific products with available fallback images
  const targetProducts = [
    { 
      name: 'Parentesi Suspension', 
      searchTerms: ['Parentesi Suspension', 'Parentesi', 'PARENTESI'],
      imagePaths: [
        // Use available FLOS images as fallbacks
        'public/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg',
        'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Matte Black.jpg',
        'public/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg'
      ]
    },
    { 
      name: 'Spun Light F', 
      searchTerms: ['Spun Light F', 'Spun Light', 'SPUN LIGHT'],
      imagePaths: [
        // Use available FLOS images as fallbacks
        'public/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg',
        'public/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Panama.jpg',
        'public/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg'
      ]
    }
  ];

  try {
    for (const productInfo of targetProducts) {
      console.log(`\n🔍 Processing: ${productInfo.name}`);

      let product = null;
      
      // Try different search terms to find the product
      for (const searchTerm of productInfo.searchTerms) {
        const products = await client.fetch(
          `*[_type == "product" && (name match $searchTerm || slug.current match $slugTerm)] {
            _id,
            name,
            slug,
            image,
            brand
          }`,
          { 
            searchTerm: `*${searchTerm}*`,
            slugTerm: `*${searchTerm.toLowerCase().replace(/\s+/g, '-')}*`
          }
        );

        if (products.length > 0) {
          product = products[0];
          console.log(`✅ Found: ${product.name} (${product._id}) using search term: ${searchTerm}`);
          break;
        }
      }

      if (!product) {
        console.log(`❌ Product not found: ${productInfo.name}`);
        continue;
      }

      // Check current image status
      if (product.image?.asset) {
        console.log(`ℹ️  Product already has image assigned, skipping...`);
        continue;
      } else {
        console.log(`⚠️  No image assigned, will upload fallback image`);
      }

      // Try to find an existing image
      let selectedImagePath = null;
      for (const imagePath of productInfo.imagePaths) {
        if (fs.existsSync(imagePath)) {
          selectedImagePath = imagePath;
          console.log(`✅ Found fallback image: ${imagePath}`);
          break;
        }
      }

      if (selectedImagePath) {
        const uploadedImage = await uploadImageToSanity(selectedImagePath, product.name);
        
        if (uploadedImage) {
          await client.patch(product._id).set({ image: uploadedImage }).commit();
          console.log(`✅ Successfully updated: ${product.name} with fallback image`);
        } else {
          console.log(`❌ Failed to upload image for: ${product.name}`);
        }
      } else {
        console.log(`❌ No suitable fallback image found for: ${product.name}`);
        console.log(`   Searched paths:`, productInfo.imagePaths);
      }
    }

  } catch (error) {
    console.error('❌ Error fixing Parentesi and Spun Light products:', error.message);
  }

  console.log('\n🎉 Parentesi and Spun Light fix completed!');
}

fixParentesiAndSpunLight().catch(console.error);
