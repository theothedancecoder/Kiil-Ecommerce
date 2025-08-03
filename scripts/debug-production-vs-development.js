#!/usr/bin/env node

/**
 * Script to debug production vs development differences for variants
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

// Simulate the exact query used by getAllProductsSimple
const ALL_PRODUCTS_QUERY = `*[_type == "product"] {
  _id,
  name,
  slug,
  image {
    _type,
    asset-> {
      _id,
      _type,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
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
      _type,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    color,
    material,
    size,
    price
  },
  lifestyleImages[] {
    _type,
    asset-> {
      _id,
      _type,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  roomCategory,
  stock,
  inStock
} | order(name asc)`;

async function debugProductionVsDevelopment() {
  try {
    console.log('🔍 Debugging Production vs Development differences...\n');
    
    console.log('Environment Variables:');
    console.log(`NEXT_PUBLIC_SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`NEXT_PUBLIC_SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
    console.log(`USE_SANITY_PRODUCTS: ${process.env.USE_SANITY_PRODUCTS}`);
    console.log('');

    // Get all products using the exact same query as getAllProductsSimple
    const products = await client.fetch(ALL_PRODUCTS_QUERY);
    console.log(`Found ${products?.length || 0} total products in Sanity`);

    // Find the Bellhop lamp specifically
    const bellhop = products.find(p => p.slug?.current === 'bellhop-rechargeable-table-lamp');
    
    if (!bellhop) {
      console.log('❌ Bellhop lamp not found!');
      return;
    }

    console.log('\n📦 Bellhop Rechargeable Table Lamp Analysis:');
    console.log(`Product ID: ${bellhop._id}`);
    console.log(`Name: ${bellhop.name}`);
    console.log(`Slug: ${bellhop.slug?.current}`);
    console.log(`Brand: ${bellhop.brand}`);
    console.log(`Price: ${bellhop.price}`);
    console.log(`Has image: ${bellhop.image?.asset ? 'Yes' : 'No'}`);
    console.log(`Categories: ${bellhop.categories?.map(c => c.title).join(', ') || 'None'}`);
    
    console.log('\n🎨 Variants Analysis:');
    if (!bellhop.variants || bellhop.variants.length === 0) {
      console.log('❌ NO VARIANTS FOUND!');
      console.log('This is the root cause of the production issue.');
    } else {
      console.log(`✅ Found ${bellhop.variants.length} variants:`);
      bellhop.variants.forEach((variant, index) => {
        console.log(`  ${index + 1}. ${JSON.stringify(variant, null, 2)}`);
      });
    }

    console.log('\n🔧 PRODUCTION DEBUGGING CHECKLIST:');
    console.log('1. ✅ Sanity connection working');
    console.log('2. ✅ Product found in Sanity');
    console.log(`3. ${bellhop.variants?.length > 0 ? '✅' : '❌'} Variants exist in data`);
    console.log('4. ❓ Check if production build is using correct environment variables');
    console.log('5. ❓ Check if production is using cached/stale data');
    console.log('6. ❓ Check if getAllProductsSimple is being called correctly in production');

    console.log('\n💡 NEXT STEPS:');
    if (!bellhop.variants || bellhop.variants.length === 0) {
      console.log('❌ CRITICAL: Variants are missing from Sanity data!');
      console.log('- Re-run the FLOS migration script');
      console.log('- Check if variants were properly uploaded to Sanity');
    } else {
      console.log('✅ Variants exist in Sanity, issue is likely:');
      console.log('- Production environment variables not set correctly');
      console.log('- Production build cache issue');
      console.log('- Different Sanity dataset being used in production');
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the debug
if (require.main === module) {
  debugProductionVsDevelopment();
}

module.exports = { debugProductionVsDevelopment };
