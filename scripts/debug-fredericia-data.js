#!/usr/bin/env node

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugFredericiaData() {
  try {
    // Get Fredericia products with all fields
    const fredericiaProducts = await client.fetch(`
      *[_type == "product" && brand == "Fredericia"] | order(name asc) {
        _id,
        name,
        image,
        variants,
        lifestyleImages,
        slug
      }
    `);
    
    console.log('🔍 Debugging Fredericia data from Sanity:');
    console.log(`Found ${fredericiaProducts.length} Fredericia products\n`);
    
    // Check first few products in detail
    fredericiaProducts.slice(0, 3).forEach((product, i) => {
      console.log(`📋 Product ${i+1}: ${product.name}`);
      console.log(`   ID: ${product._id}`);
      console.log(`   Slug: ${product.slug?.current || 'No slug'}`);
      console.log(`   Image: ${product.image ? 'Has image object' : 'No image'}`);
      if (product.image) {
        console.log(`   Image asset: ${product.image.asset ? 'Has asset' : 'No asset'}`);
        if (product.image.asset) {
          console.log(`   Asset ref: ${product.image.asset._ref || product.image.asset._id}`);
        }
      }
      console.log(`   Variants: ${product.variants ? product.variants.length : 0}`);
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant, vi) => {
          console.log(`     Variant ${vi+1}: ${variant.name} - Image: ${variant.image ? 'Yes' : 'No'}`);
        });
      }
      console.log(`   Lifestyle Images: ${product.lifestyleImages ? product.lifestyleImages.length : 0}`);
      console.log('');
    });

    // Check if any products are missing main images
    const missingMainImages = fredericiaProducts.filter(p => !p.image || !p.image.asset);
    console.log(`❌ Products missing main images: ${missingMainImages.length}`);
    missingMainImages.forEach(p => console.log(`   - ${p.name} (${p._id})`));

    // Check variant counts
    const variantCounts = fredericiaProducts.map(p => ({
      name: p.name,
      variantCount: p.variants ? p.variants.length : 0
    }));
    console.log('\n📊 Variant counts:');
    variantCounts.forEach(p => console.log(`   ${p.name}: ${p.variantCount} variants`));

  } catch (error) {
    console.error('Error:', error);
  }
}

debugFredericiaData();
