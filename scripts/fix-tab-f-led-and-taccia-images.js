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

async function fixSpecificFlosProducts() {
  console.log('🎯 Fixing Tab F LED and Taccia Table Lamp images...\n');

  // Target the specific products mentioned
  const targetProducts = [
    { name: 'Tab F LED', searchTerms: ['Tab F LED', 'Tab F', 'TAB F'] },
    { name: 'Taccia Table Lamp', searchTerms: ['Taccia Table Lamp', 'Taccia', 'TACCIA'] }
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
                console.log(`✅ Image URL is accessible`);
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
        console.log(`⚠️  No image assigned, will upload`);
      }

      // Select appropriate image based on product name
      let imagePaths = [];
      
      if (productInfo.name.includes('Tab F')) {
        imagePaths = [
          'public/FLOS/Tab-F-LED-bordlampe-Flos/Tab F LED bordlampe Flos kr 4 995  Farge - Hvit.jpg',
          'public/FLOS/Tab-F-LED-bordlampe-Flos/Tab F LED bordlampe Flos kr 4 995  Farge - Sort.jpg',
          'public/FLOS/Bilboquet-bordlampe-Flos/Bilboquet bordlampe Flos kr 3 295  Farge - Linen.jpg'
        ];
      } else if (productInfo.name.includes('Taccia')) {
        imagePaths = [
          'public/FLOS/Taccia-bordlampe-Flos/Taccia bordlampe Flos kr 7 200  Farge - Hvit.jpg',
          'public/FLOS/Taccia-bordlampe-Flos/Taccia bordlampe Flos kr 7 200  Farge - Sort.jpg',
          'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg'
        ];
      }

      // Try to find an existing image
      let selectedImagePath = null;
      for (const imagePath of imagePaths) {
        if (fs.existsSync(imagePath)) {
          selectedImagePath = imagePath;
          console.log(`✅ Found image: ${imagePath}`);
          break;
        }
      }

      if (selectedImagePath) {
        const uploadedImage = await uploadImageToSanity(selectedImagePath, product.name);
        
        if (uploadedImage) {
          await client.patch(product._id).set({ image: uploadedImage }).commit();
          console.log(`✅ Successfully updated: ${product.name}`);
        } else {
          console.log(`❌ Failed to upload image for: ${product.name}`);
        }
      } else {
        console.log(`❌ No suitable image found for: ${product.name}`);
        console.log(`   Searched paths:`, imagePaths);
      }
    }

  } catch (error) {
    console.error('❌ Error fixing specific FLOS products:', error.message);
  }

  console.log('\n🎉 Tab F LED and Taccia Table Lamp fix completed!');
}

fixSpecificFlosProducts().catch(console.error);
