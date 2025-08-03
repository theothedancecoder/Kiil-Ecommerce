#!/usr/bin/env node

/**
 * Script to test FLOS product links and slug generation
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

// Query to get FLOS products with slug info
const FLOS_LINKS_QUERY = `
  *[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id)] | order(name asc) {
    _id,
    name,
    slug {
      current
    },
    variants[] {
      _key,
      name,
      price,
      color,
      material
    }
  }
`;

async function testFlosProductLinks() {
  try {
    console.log('🔍 Testing FLOS product links and variants...\n');

    // Get all FLOS products
    const products = await client.fetch(FLOS_LINKS_QUERY);
    console.log(`Found ${products.length} FLOS products\n`);

    let productsWithoutSlugs = 0;
    let totalVariants = 0;

    // Check each product
    for (const product of products) {
      console.log(`📦 ${product.name}`);
      
      // Check slug
      if (!product.slug?.current) {
        console.log(`  ❌ Missing slug`);
        productsWithoutSlugs++;
      } else {
        console.log(`  ✅ Slug: ${product.slug.current}`);
        console.log(`  🔗 Link: /products/${product.slug.current}`);
      }

      // Check variants
      if (product.variants && product.variants.length > 0) {
        console.log(`  🎨 ${product.variants.length} variants:`);
        totalVariants += product.variants.length;
        
        product.variants.forEach((variant, index) => {
          const variantInfo = [
            variant.name,
            variant.color,
            variant.material,
            variant.price ? `kr ${variant.price}` : null
          ].filter(Boolean).join(' - ');
          
          console.log(`    ${index + 1}. ${variantInfo}`);
        });
      } else {
        console.log(`  ⚠️  No variants`);
      }
      console.log('');
    }

    // Summary
    console.log('📊 SUMMARY:');
    console.log(`Total products: ${products.length}`);
    console.log(`Products without slugs: ${productsWithoutSlugs}`);
    console.log(`Total variants: ${totalVariants}`);
    console.log('');

    if (productsWithoutSlugs === 0) {
      console.log('✅ All FLOS products have proper slugs for linking!');
      console.log('✅ Product detail pages should show variants correctly!');
      console.log('');
      console.log('🎯 NEXT STEPS:');
      console.log('1. Deploy the updated FLOS page with correct links');
      console.log('2. Test product detail pages in production');
      console.log('3. Verify variants display on individual product pages');
    } else {
      console.log('⚠️  Some products missing slugs - variants may not be accessible');
    }

    console.log('\n🎉 Link testing completed!');

  } catch (error) {
    console.error('❌ Link testing failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testFlosProductLinks();
}

module.exports = { testFlosProductLinks };
