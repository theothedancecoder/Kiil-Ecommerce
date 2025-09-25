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

async function debugGoldmanFloor() {
  console.log('🔍 Debugging Goldman Floor product specifically...\n');

  try {
    // Search for Goldman Floor with multiple strategies
    console.log('1. Searching by slug "goldman-floor"...');
    let products = await client.fetch(
      `*[_type == "product" && slug.current == "goldman-floor"]`
    );
    console.log(`Found ${products.length} products by slug`);

    if (products.length === 0) {
      console.log('2. Searching by name containing "Goldman"...');
      products = await client.fetch(
        `*[_type == "product" && name match "*Goldman*"]`
      );
      console.log(`Found ${products.length} products by name`);
    }

    if (products.length === 0) {
      console.log('3. Searching all FLOS products for Goldman...');
      const allFlosProducts = await client.fetch(
        `*[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id)] {
          _id,
          name,
          slug,
          image,
          brand
        }`
      );
      
      console.log(`Found ${allFlosProducts.length} total FLOS products:`);
      allFlosProducts.forEach(p => {
        console.log(`  - ${p.name} (${p.slug?.current || 'no-slug'}) - Image: ${p.image?.asset ? '✅' : '❌'}`);
      });

      // Look for Goldman in the list
      const goldmanProduct = allFlosProducts.find(p => 
        p.name?.toLowerCase().includes('goldman') || 
        p.slug?.current?.includes('goldman')
      );

      if (goldmanProduct) {
        products = [goldmanProduct];
        console.log(`\n✅ Found Goldman product: ${goldmanProduct.name}`);
      } else {
        console.log('\n❌ No Goldman product found in FLOS products');
        
        // Check if it exists but not in FLOS category
        const anyGoldman = await client.fetch(
          `*[_type == "product" && (name match "*Goldman*" || slug.current match "*goldman*")] {
            _id,
            name,
            slug,
            image,
            brand,
            categories[]-> {
              title
            }
          }`
        );
        
        if (anyGoldman.length > 0) {
          console.log('\n🔍 Found Goldman products in other categories:');
          anyGoldman.forEach(p => {
            console.log(`  - ${p.name} (${p.slug?.current}) - Categories: ${p.categories?.map(c => c.title).join(', ')}`);
          });
        }
        return;
      }
    }

    if (products.length > 0) {
      const product = products[0];
      console.log(`\n📋 Product Details:`);
      console.log(`  ID: ${product._id}`);
      console.log(`  Name: ${product.name}`);
      console.log(`  Slug: ${product.slug?.current}`);
      console.log(`  Brand: ${product.brand}`);
      console.log(`  Has Image: ${product.image?.asset ? '✅ Yes' : '❌ No'}`);
      
      if (product.image?.asset) {
        console.log(`  Image ID: ${product.image.asset._ref || product.image.asset._id}`);
        
        // Try to fetch the image asset details
        try {
          const imageAsset = await client.fetch(
            `*[_type == "sanity.imageAsset" && _id == $imageId][0]`,
            { imageId: product.image.asset._ref || product.image.asset._id }
          );
          
          if (imageAsset) {
            console.log(`  Image URL: ${imageAsset.url}`);
            console.log(`  Image Size: ${imageAsset.size} bytes`);
          } else {
            console.log(`  ⚠️  Image asset not found in Sanity`);
          }
        } catch (err) {
          console.log(`  ⚠️  Error fetching image asset: ${err.message}`);
        }
      }

      // If no image, try to upload one
      if (!product.image?.asset) {
        console.log('\n📤 Attempting to upload image...');
        
        const possibleImages = [
          'public/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Transparent.webp',
          'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif',
          'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg'
        ];

        for (const imagePath of possibleImages) {
          if (fs.existsSync(imagePath)) {
            try {
              console.log(`📤 Uploading: ${path.basename(imagePath)}`);
              const imageBuffer = fs.readFileSync(imagePath);
              const asset = await client.assets.upload('image', imageBuffer, {
                filename: path.basename(imagePath),
              });
              
              const imageObject = {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: asset._id,
                },
                alt: product.name,
              };

              await client.patch(product._id).set({ image: imageObject }).commit();
              console.log(`✅ Successfully uploaded and assigned image to ${product.name}`);
              break;
            } catch (error) {
              console.error(`❌ Failed to upload ${imagePath}:`, error.message);
            }
          }
        }
      }
    }

  } catch (error) {
    console.error('❌ Error debugging Goldman Floor:', error.message);
  }
}

debugGoldmanFloor().catch(console.error);
