#!/usr/bin/env node

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function debugRoCollectionImages() {
  console.log('🔍 Debugging RO Collection images in Sanity...\n');

  try {
    const query = `
      *[_type == "product" && "ro-collection" in categories[]->slug.current] | order(name asc) {
        _id,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        },
        imagePath
      }
    `;

    const products = await client.fetch(query);
    
    console.log(`Found ${products.length} RO Collection products:\n`);

    let hasImageCount = 0;
    let missingImageCount = 0;

    products.forEach((product, index) => {
      const hasImage = product.image?.asset?.url;
      const hasImagePath = product.imagePath;
      
      if (hasImage) {
        hasImageCount++;
        console.log(`✅ ${index + 1}. ${product.name}`);
        console.log(`   Slug: ${product.slug?.current}`);
        console.log(`   Image URL: ${product.image.asset.url}`);
        console.log(`   Image ID: ${product.image.asset._id}`);
      } else {
        missingImageCount++;
        console.log(`❌ ${index + 1}. ${product.name}`);
        console.log(`   Slug: ${product.slug?.current}`);
        console.log(`   No Sanity image asset`);
        if (hasImagePath) {
          console.log(`   Has imagePath: ${product.imagePath}`);
        }
      }
      console.log('');
    });

    console.log(`\n📊 Summary:`);
    console.log(`✅ Products with images: ${hasImageCount}`);
    console.log(`❌ Products missing images: ${missingImageCount}`);

    if (missingImageCount > 0) {
      console.log(`\n🔧 Products that need image upload:`);
      products.forEach((product) => {
        if (!product.image?.asset?.url) {
          console.log(`- ${product.name} (${product.slug?.current})`);
        }
      });
    }

  } catch (error) {
    console.error('❌ Error debugging RO Collection images:', error.message);
  }
}

// Run the debug
debugRoCollectionImages();
