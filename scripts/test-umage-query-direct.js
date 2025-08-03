#!/usr/bin/env node

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function testUmageQuery() {
  try {
    console.log('🧪 Testing UMAGE query directly...\n');
    
    // Test the exact query from getUmageProducts
    const query = `*[_type == "product" && brand == "UMAGE"] {
      _id,
      name,
      slug,
      image {
        ...,
        asset->
      },
      description,
      price,
      brand,
      categories[]->{
        _id,
        title,
        slug
      },
      href,
      variants[] {
        name,
        image {
          ...,
          asset->
        },
        color,
        material,
        size,
        price
      },
      lifestyleImages[] {
        ...,
        asset->
      },
      roomCategory,
      stock,
      inStock
    } | order(name asc)`;
    
    console.log('🔍 Environment variables:');
    console.log(`USE_SANITY_PRODUCTS: ${process.env.USE_SANITY_PRODUCTS}`);
    console.log(`NEXT_PUBLIC_SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`NEXT_PUBLIC_SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);
    
    console.log('📡 Executing query...');
    const result = await client.fetch(query);
    
    console.log(`📦 Query returned: ${result.length} products\n`);
    
    if (result.length > 0) {
      console.log('✅ Products found:');
      result.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} (${product.brand}) - ${product.price} kr`);
        console.log(`   - ID: ${product._id}`);
        console.log(`   - Slug: ${product.slug?.current || 'No slug'}`);
        console.log(`   - Image: ${product.image?.asset ? 'Has image' : 'No image'}`);
        console.log(`   - Categories: ${product.categories?.length || 0}`);
        console.log(`   - Variants: ${product.variants?.length || 0}`);
        console.log('');
      });
    } else {
      console.log('❌ No products returned by query');
    }
    
  } catch (error) {
    console.error('❌ Error testing UMAGE query:', error.message);
    console.error('Stack:', error.stack);
  }
}

testUmageQuery();
