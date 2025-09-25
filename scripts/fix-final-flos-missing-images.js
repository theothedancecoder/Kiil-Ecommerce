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

async function fixFinalFlosProducts() {
  console.log('🎯 Fixing final FLOS products: Spun Light T1, String Light Cone, String Light Sphere...\n');

  // Target the specific products with available fallback images
  const targetProducts = [
    { 
      name: 'Spun Light T1', 
      searchTerms: ['Spun Light T1', 'Spun Light T', 'SPUN LIGHT T1'],
      imagePaths: [
        // Use available FLOS images as fallbacks
        'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Matte Black.jpg',
        'public/FLOS/Bilboquet-bordlampe-Flos/Bilboquet bordlampe Flos kr 3 295  Farge - Linen.jpg',
        'public/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg'
      ]
    },
    { 
      name: 'String Light Cone', 
      searchTerms: ['String Light Cone', 'String Light', 'STRING LIGHT CONE'],
      imagePaths: [
        // Use available FLOS images as fallbacks
        'public/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg',
        'public/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Panama.jpg',
        'public/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg'
      ]
    },
    { 
      name: 'String Light Sphere', 
      searchTerms: ['String Light Sphere', 'String Light', 'STRING LIGHT SPHERE'],
      imagePaths: [
        // Use available FLOS images as fallbacks
        'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Matte Black.jpg',
        'public/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg',
        'public/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg'
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
        console.log(`ℹ️  Product already has image assigned`);
        
        // Try to fetch the image asset to verify it exists and is accessible
        try {
          const imageAsset = await client.fetch(
            `*[_type == "sanity.imageAsset" && _id == $imageId][0]`,
            { imageId: product.image.asset._ref || product.image.asset._id }
          );
          
          if (imageAsset && imageAsset.url) {
            console.log(`✅ Image asset exists: ${imageAsset.url}`);
            
            // Test if the image URL is accessible
            try {
              const response = await fetch(imageAsset.url);
              if (response.ok) {
                console.log(`✅ Image URL is accessible, skipping...`);
                continue; // Skip if image is properly assigned and accessible
              } else {
                console.log(`⚠️  Image URL not accessible (${response.status}), will re-upload`);
              }
            } catch (fetchError) {
              console.log(`⚠️  Error accessing image URL, will re-upload`);
            }
          } else {
            console.log(`⚠️  Image asset missing or invalid, will re-upload`);
          }
        } catch (err) {
          console.log(`⚠️  Error checking image asset, will re-upload`);
        }
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
    console.error('❌ Error fixing final FLOS products:', error.message);
  }

  console.log('\n🎉 Final FLOS products fix completed!');
}

fixFinalFlosProducts().catch(console.error);
