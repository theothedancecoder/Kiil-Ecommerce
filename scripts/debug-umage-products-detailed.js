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

async function debugUmageProducts() {
  try {
    console.log('🔍 Debugging UMAGE products in detail...\n');
    
    // Get detailed UMAGE products
    const umageProducts = await client.fetch(`*[_type == "product" && brand == "UMAGE"] {
      _id,
      name,
      brand,
      price,
      image,
      variants,
      categories,
      slug,
      description
    }`);
    
    console.log(`🎯 Found ${umageProducts.length} UMAGE products\n`);
    
    umageProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   - ID: ${product._id}`);
      console.log(`   - Brand: ${product.brand}`);
      console.log(`   - Price: ${product.price} kr`);
      console.log(`   - Slug: ${product.slug?.current || 'No slug'}`);
      console.log(`   - Main Image: ${product.image ? 'Has image' : '❌ NO IMAGE'}`);
      console.log(`   - Variants: ${product.variants?.length || 0}`);
      console.log(`   - Categories: ${product.categories?.length || 0}`);
      console.log(`   - Description: ${product.description ? 'Has description' : 'No description'}`);
      
      if (product.image) {
        console.log(`   - Image details:`, JSON.stringify(product.image, null, 4));
      }
      
      if (product.variants && product.variants.length > 0) {
        console.log(`   - Variant details:`);
        product.variants.forEach((variant, vIndex) => {
          console.log(`     ${vIndex + 1}. ${variant.name || 'Unnamed variant'}`);
          console.log(`        - Material: ${variant.material || 'No material'}`);
          console.log(`        - Price: ${variant.price || 'No price'} kr`);
          console.log(`        - Image: ${variant.image ? 'Has image' : '❌ NO IMAGE'}`);
        });
      }
      
      console.log('');
    });
    
    // Check environment variable
    console.log('🔧 Environment Check:');
    console.log(`USE_SANITY_PRODUCTS: ${process.env.USE_SANITY_PRODUCTS}`);
    console.log(`NEXT_PUBLIC_SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`NEXT_PUBLIC_SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
    
  } catch (error) {
    console.error('❌ Error debugging UMAGE products:', error.message);
  }
}

debugUmageProducts();
