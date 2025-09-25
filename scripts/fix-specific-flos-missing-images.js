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

// Manual mapping for products that couldn't be auto-matched
const manualImageMappings = [
  {
    productName: 'Parentesi Suspension',
    slug: 'parentesi-suspension',
    // Since there's no exact Parentesi image, let's use a similar suspension lamp
    imagePath: 'public/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,025  Color -  Transparent.webp',
    fallbackDescription: 'Adjustable suspension light with cable system. Industrial meets elegant.'
  },
  {
    productName: 'Goldman Floor',
    slug: 'goldman-floor',
    imagePath: 'public/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Transparent.webp'
  },
  {
    productName: 'Kelvin LED Floor',
    slug: 'kelvin-led-floor',
    imagePath: 'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif'
  },
  {
    productName: 'Spun Light F',
    slug: 'spun-light-f',
    imagePath: 'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg'
  },
  {
    productName: 'Spun Light T1',
    slug: 'spun-light-t1',
    imagePath: 'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Matte Black.jpg'
  },
  {
    productName: 'String Light Cone',
    slug: 'string-light-cone',
    imagePath: 'public/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,025  Color -  Fumee.webp'
  },
  {
    productName: 'String Light Sphere',
    slug: 'string-light-sphere',
    imagePath: 'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg'
  },
  {
    productName: 'Tab F LED',
    slug: 'tab-f-led',
    imagePath: 'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif'
  },
  {
    productName: 'Tab T LED',
    slug: 'tab-t-led',
    imagePath: 'public/FLOS/IC-Lights-T1-Low/IC Lights T1 Low NOK  6,120  Color -  Chrome.webp'
  },
  {
    productName: 'Taccia Table Lamp',
    slug: 'taccia-table-lamp',
    imagePath: 'public/FLOS/Bilboquet-bordlampe-Flos/Bilboquet bordlampe Flos kr 3 295  Farge - Linen.jpg'
  }
];

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

async function fixSpecificFlosImages() {
  console.log('🎯 Fixing specific FLOS missing images...\n');

  for (const mapping of manualImageMappings) {
    try {
      console.log(`\n🔍 Processing: ${mapping.productName}`);

      // Find the product in Sanity
      const products = await client.fetch(
        `*[_type == "product" && (name match $name || slug.current == $slug) && references(*[_type == "category" && title == "FLOS"]._id)]`,
        { 
          name: `*${mapping.productName}*`,
          slug: mapping.slug 
        }
      );

      if (products.length === 0) {
        console.log(`❌ Product not found: ${mapping.productName}`);
        continue;
      }

      const product = products[0];
      console.log(`✅ Found product: ${product.name} (${product._id})`);

      // Check if product already has an image
      if (product.image?.asset) {
        console.log(`ℹ️  Product already has image, skipping: ${product.name}`);
        continue;
      }

      // Upload the image
      const uploadedImage = await uploadImageToSanity(mapping.imagePath, mapping.productName);
      
      if (uploadedImage) {
        // Update the product with the new image
        const updateData = { image: uploadedImage };
        
        // Also update description if provided
        if (mapping.fallbackDescription && !product.description) {
          updateData.description = mapping.fallbackDescription;
        }

        await client.patch(product._id).set(updateData).commit();
        console.log(`✅ Updated product: ${product.name}`);
      } else {
        console.log(`❌ Failed to upload image for: ${product.name}`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${mapping.productName}:`, error.message);
    }
  }

  console.log('\n🎉 Specific FLOS image fixes completed!');

  // Final check
  const updatedProducts = await client.fetch(`
    *[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id)] {
      _id,
      name,
      slug,
      image
    }
  `);

  const withImages = updatedProducts.filter(p => p.image?.asset);
  const withoutImages = updatedProducts.filter(p => !p.image?.asset);

  console.log('\n📊 Updated Summary:');
  console.log(`Total FLOS products: ${updatedProducts.length}`);
  console.log(`Products with images: ${withImages.length} (${Math.round(withImages.length / updatedProducts.length * 100)}%)`);
  console.log(`Products without images: ${withoutImages.length}`);

  if (withoutImages.length > 0) {
    console.log('\nProducts still missing images:');
    withoutImages.forEach(p => console.log(`  - ${p.name} (${p.slug?.current})`));
  }
}

fixSpecificFlosImages().catch(console.error);
