#!/usr/bin/env node

/**
 * Script to debug FLOS product variants for production issues
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

// Query to get FLOS products with detailed variant info
const FLOS_VARIANTS_QUERY = `
  *[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id)] | order(name asc) {
    _id,
    name,
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

async function debugVariantsProduction() {
  try {
    console.log('🔍 Debugging FLOS product variants for production...\n');

    // Get all FLOS products with variants
    const products = await client.fetch(FLOS_VARIANTS_QUERY);
    console.log(`Found ${products.length} FLOS products\n`);

    let totalVariants = 0;
    let variantsWithoutKeys = 0;
    let variantsWithoutImages = 0;
    let variantsWithoutNames = 0;

    // Check each product's variants
    for (const product of products) {
      console.log(`📦 ${product.name}`);
      
      if (!product.variants || product.variants.length === 0) {
        console.log(`  ⚠️  No variants found`);
        continue;
      }

      console.log(`  🔄 ${product.variants.length} variants:`);
      
      for (const variant of product.variants) {
        totalVariants++;
        
        // Check for missing _key
        if (!variant._key) {
          console.log(`    ❌ Missing _key for variant: ${variant.name || 'unnamed'}`);
          variantsWithoutKeys++;
        }
        
        // Check for missing name
        if (!variant.name) {
          console.log(`    ❌ Missing name for variant with key: ${variant._key || 'no-key'}`);
          variantsWithoutNames++;
        }
        
        // Check for missing image
        if (!variant.image?.asset) {
          console.log(`    ❌ Missing image for variant: ${variant.name || variant._key || 'unnamed'}`);
          variantsWithoutImages++;
        }
        
        // Show variant details
        console.log(`    ✅ ${variant.name || 'unnamed'} (key: ${variant._key || 'missing'}) - ${variant.color || variant.material || 'no color/material'} - ${variant.price ? `kr ${variant.price}` : 'no price'} - ${variant.image?.asset ? 'has image' : 'no image'}`);
      }
      console.log('');
    }

    // Summary
    console.log('📊 VARIANTS SUMMARY:');
    console.log(`Total products: ${products.length}`);
    console.log(`Total variants: ${totalVariants}`);
    console.log(`Variants without _key: ${variantsWithoutKeys}`);
    console.log(`Variants without names: ${variantsWithoutNames}`);
    console.log(`Variants without images: ${variantsWithoutImages}`);
    console.log('');

    // Check if there are issues that could cause production problems
    if (variantsWithoutKeys > 0 || variantsWithoutNames > 0) {
      console.log('⚠️  PRODUCTION ISSUES DETECTED:');
      if (variantsWithoutKeys > 0) {
        console.log(`- ${variantsWithoutKeys} variants missing _key (required for React rendering)`);
      }
      if (variantsWithoutNames > 0) {
        console.log(`- ${variantsWithoutNames} variants missing names (required for display)`);
      }
      console.log('\n🔧 These issues can cause variants to not display properly in production.');
      console.log('💡 Run the fix script to resolve these issues.');
    } else {
      console.log('✅ No critical variant issues detected for production!');
    }

    console.log('\n🎉 Variant debugging completed!');

  } catch (error) {
    console.error('❌ Variant debugging failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the debug
if (require.main === module) {
  debugVariantsProduction();
}

module.exports = { debugVariantsProduction };
