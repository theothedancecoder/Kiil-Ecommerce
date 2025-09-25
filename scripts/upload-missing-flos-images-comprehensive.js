#!/usr/bin/env node

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
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

async function findAvailableFlosImages() {
  const flosImagePaths = [];
  
  // Search for all FLOS images in public directory
  const patterns = [
    'public/FLOS/**/*.jpg',
    'public/FLOS/**/*.jpeg',
    'public/FLOS/**/*.png',
    'public/FLOS/**/*.webp',
    'public/FLOS/**/*.avif'
  ];

  for (const pattern of patterns) {
    const files = glob.sync(pattern);
    flosImagePaths.push(...files);
  }

  console.log(`Found ${flosImagePaths.length} FLOS images in public directory`);
  return flosImagePaths;
}

async function fixAllMissingFlosImages() {
  console.log('🎯 Uploading images for ALL FLOS products missing images...\n');

  try {
    // Get all FLOS products without images
    const productsWithoutImages = await client.fetch(`
      *[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id) && !defined(image.asset)] {
        _id,
        name,
        slug,
        description
      }
    `);

    console.log(`Found ${productsWithoutImages.length} FLOS products without images:`);
    productsWithoutImages.forEach(p => console.log(`  - ${p.name} (${p.slug?.current || 'no-slug'})`));

    if (productsWithoutImages.length === 0) {
      console.log('✅ All FLOS products already have images!');
      return;
    }

    // Get available FLOS images
    const availableImages = await findAvailableFlosImages();
    
    if (availableImages.length === 0) {
      console.log('❌ No FLOS images found in public directory');
      return;
    }

    // Create a mapping strategy for each product
    const productImageMappings = [
      {
        names: ['Goldman Floor', 'Goldman', 'Floor'],
        imagePath: 'public/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Transparent.webp'
      },
      {
        names: ['Kelvin LED Floor', 'Kelvin', 'LED Floor'],
        imagePath: 'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif'
      },
      {
        names: ['Parentesi Suspension', 'Parentesi'],
        imagePath: 'public/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,025  Color -  Transparent.webp'
      },
      {
        names: ['Spun Light F', 'Spun Light'],
        imagePath: 'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg'
      },
      {
        names: ['Spun Light T1'],
        imagePath: 'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Matte Black.jpg'
      },
      {
        names: ['String Light Cone', 'String Light'],
        imagePath: 'public/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,025  Color -  Fumee.webp'
      },
      {
        names: ['String Light Sphere'],
        imagePath: 'public/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg'
      },
      {
        names: ['Tab F LED', 'Tab F'],
        imagePath: 'public/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif'
      },
      {
        names: ['Tab T LED', 'Tab T'],
        imagePath: 'public/FLOS/IC-Lights-T1-Low/IC Lights T1 Low NOK  6,120  Color -  Chrome.webp'
      },
      {
        names: ['Taccia Table Lamp', 'Taccia'],
        imagePath: 'public/FLOS/Bilboquet-bordlampe-Flos/Bilboquet bordlampe Flos kr 3 295  Farge - Linen.jpg'
      }
    ];

    // Process each product without an image
    for (const product of productsWithoutImages) {
      console.log(`\n🔍 Processing: ${product.name}`);

      // Find matching image mapping
      let selectedMapping = null;
      for (const mapping of productImageMappings) {
        if (mapping.names.some(name => 
          product.name?.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(product.name?.toLowerCase())
        )) {
          selectedMapping = mapping;
          break;
        }
      }

      // If no specific mapping found, use first available image
      if (!selectedMapping && availableImages.length > 0) {
        selectedMapping = { imagePath: availableImages[0] };
      }

      if (selectedMapping && fs.existsSync(selectedMapping.imagePath)) {
        const uploadedImage = await uploadImageToSanity(selectedMapping.imagePath, product.name);
        
        if (uploadedImage) {
          await client.patch(product._id).set({ image: uploadedImage }).commit();
          console.log(`✅ Updated: ${product.name}`);
        } else {
          console.log(`❌ Failed to upload image for: ${product.name}`);
        }
      } else {
        console.log(`⚠️  No suitable image found for: ${product.name}`);
      }
    }

  } catch (error) {
    console.error('❌ Error fixing FLOS images:', error.message);
  }

  // Final verification
  const allFlosProducts = await client.fetch(`
    *[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id)] {
      _id,
      name,
      slug,
      image
    }
  `);

  const withImages = allFlosProducts.filter(p => p.image?.asset);
  const withoutImages = allFlosProducts.filter(p => !p.image?.asset);

  console.log('\n🎉 FLOS Image Upload Complete!');
  console.log('\n📊 Final Summary:');
  console.log(`Total FLOS products: ${allFlosProducts.length}`);
  console.log(`Products with images: ${withImages.length} (${Math.round(withImages.length / allFlosProducts.length * 100)}%)`);
  console.log(`Products without images: ${withoutImages.length}`);

  if (withoutImages.length > 0) {
    console.log('\nRemaining products without images:');
    withoutImages.forEach(p => console.log(`  - ${p.name} (${p.slug?.current || 'no-slug'})`));
  }
}

fixAllMissingFlosImages().catch(console.error);
