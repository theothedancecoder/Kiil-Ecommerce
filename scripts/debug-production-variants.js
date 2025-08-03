#!/usr/bin/env node

/**
 * Script to debug production variants issue
 */

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Query to get specific product with variants
const BELLHOP_QUERY = `
  *[_type == "product" && slug.current == "bellhop-rechargeable-table-lamp"][0] {
    _id,
    name,
    slug,
    variants[] {
      _key,
      name,
      price,
      color,
      material,
      image {
        asset-> {
          _id,
          url
        }
      }
    }
  }
`;

async function debugProductionVariants() {
  try {
    console.log('🔍 Debugging production variants issue...\n');
    
    console.log('Environment Variables:');
    console.log(`NEXT_PUBLIC_SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`NEXT_PUBLIC_SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
    console.log(`USE_SANITY_PRODUCTS: ${process.env.USE_SANITY_PRODUCTS}`);
    console.log('');

    // Get the specific product
    const product = await client.fetch(BELLHOP_QUERY);
    
    if (!product) {
      console.log('❌ Product not found in Sanity!');
      console.log('This could mean:');
      console.log('1. The slug is incorrect');
      console.log('2. The product was not migrated properly');
      console.log('3. There is a connection issue with Sanity');
      return;
    }

    console.log(`✅ Found product: ${product.name}`);
    console.log(`Product ID: ${product._id}`);
    console.log(`Slug: ${product.slug?.current}`);
    console.log('');

    if (!product.variants || product.variants.length === 0) {
      console.log('❌ No variants found for this product!');
      console.log('This means the variants were not migrated properly.');
    } else {
      console.log(`✅ Found ${product.variants.length} variants:`);
      product.variants.forEach((variant, index) => {
        console.log(`  ${index + 1}. ${variant.name} - ${variant.color} - kr ${variant.price} - ${variant.image?.asset ? 'has image' : 'no image'}`);
      });
    }

    console.log('\n🔧 PRODUCTION DEBUGGING STEPS:');
    console.log('1. Check if USE_SANITY_PRODUCTS=true is set in Vercel environment variables');
    console.log('2. Verify that the product detail page is using getAllProductsSimple correctly');
    console.log('3. Check if there are any build/deployment issues');
    console.log('4. Verify that the variants are being rendered in the component');

    console.log('\n💡 NEXT STEPS:');
    console.log('1. Check Vercel environment variables');
    console.log('2. Redeploy the application');
    console.log('3. Clear any CDN/browser cache');

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the debug
if (require.main === module) {
  debugProductionVariants();
}

module.exports = { debugProductionVariants };
