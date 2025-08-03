#!/usr/bin/env node

/**
 * Script to test the exact data flow that production uses
 */

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Simulate production environment
process.env.NODE_ENV = 'production';

// Sanity client configuration - exactly as used in getAllProductsSimple
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Exact query from getAllProductsSimple
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

async function testProductionDataFlow() {
  try {
    console.log('🔍 Testing Production Data Flow...\n');
    
    // Simulate the exact environment check from getAllProductsSimple
    console.log("Environment check:", {
      USE_SANITY_PRODUCTS: process.env.USE_SANITY_PRODUCTS,
      NODE_ENV: process.env.NODE_ENV,
      SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET
    });
    
    const USE_SANITY_PRODUCTS = process.env.USE_SANITY_PRODUCTS === 'true';
    
    if (!USE_SANITY_PRODUCTS) {
      console.log("❌ CRITICAL: USE_SANITY_PRODUCTS is not 'true'");
      console.log("This means the function will return [] empty array");
      console.log("No products will be loaded, no variants will show");
      return;
    }
    
    console.log("✅ USE_SANITY_PRODUCTS is true, proceeding with Sanity fetch...\n");
    
    // Fetch products using exact same method
    console.log("Fetching products from Sanity using regular client...");
    const products = await client.fetch(ALL_PRODUCTS_QUERY);
    
    console.log(`Found ${products?.length || 0} products in Sanity\n`);
    
    // Find Bellhop specifically
    const bellhop = products.find(p => p.slug?.current === 'bellhop-rechargeable-table-lamp');
    
    if (!bellhop) {
      console.log('❌ Bellhop lamp not found in results!');
      console.log('Available products:');
      products.slice(0, 5).forEach(p => console.log(`- ${p.name} (${p.slug?.current})`));
      return;
    }
    
    console.log('✅ Found Bellhop lamp in results');
    console.log(`Product: ${bellhop.name}`);
    console.log(`Variants: ${bellhop.variants?.length || 0}`);
    
    if (!bellhop.variants || bellhop.variants.length === 0) {
      console.log('❌ NO VARIANTS in the fetched data!');
      console.log('This means the Sanity query is not returning variants');
      console.log('Possible causes:');
      console.log('- Variants not properly saved in Sanity');
      console.log('- Query syntax issue');
      console.log('- Data structure mismatch');
    } else {
      console.log(`✅ Found ${bellhop.variants.length} variants:`);
      bellhop.variants.forEach((v, i) => {
        console.log(`  ${i + 1}. ${v.name} (${v.color})`);
      });
    }
    
    console.log('\n🎯 PRODUCTION ISSUE DIAGNOSIS:');
    if (bellhop.variants && bellhop.variants.length > 0) {
      console.log('✅ Data is correct - variants exist in Sanity response');
      console.log('❓ Issue must be in the React component rendering');
      console.log('❓ Check if product detail page is receiving the variants');
      console.log('❓ Check browser console for JavaScript errors');
    } else {
      console.log('❌ Data issue - variants missing from Sanity response');
      console.log('❓ Need to re-run FLOS migration');
      console.log('❓ Check Sanity Studio to verify variants exist');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testProductionDataFlow();
}

module.exports = { testProductionDataFlow };
