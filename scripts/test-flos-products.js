#!/usr/bin/env node

/**
 * Test script to verify FLOS products are loading correctly from Sanity
 */

const { getFlosProducts, getFlosCategories } = require('../sanity/lib/products/getFlosProducts.ts');
require('dotenv').config({ path: '.env.local' });

async function testFlosProducts() {
  try {
    console.log('🧪 Testing FLOS products from Sanity...\n');

    // Test getFlosProducts
    console.log('📦 Fetching FLOS products...');
    const products = await getFlosProducts();
    
    console.log(`✅ Found ${products.length} FLOS products`);
    
    if (products.length > 0) {
      console.log('\n📋 Sample products:');
      products.slice(0, 3).forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - kr ${product.price?.toLocaleString() || 'N/A'}`);
        console.log(`   ID: ${product._id}`);
        console.log(`   Categories: ${product.categories?.map(cat => cat.title).join(', ') || 'None'}`);
        console.log(`   Designer: ${product.designer || 'N/A'}`);
        console.log(`   Has image: ${product.image?.asset ? 'Yes' : 'No'}`);
        console.log(`   Variants: ${product.variants?.length || 0}`);
        console.log('');
      });
    }

    // Test getFlosCategories
    console.log('📁 Fetching FLOS categories...');
    const categories = await getFlosCategories();
    
    console.log(`✅ Found ${categories.length} categories`);
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.title} (${category.slug?.current || 'no-slug'})`);
    });

    console.log('\n🎉 FLOS products test completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('1. Visit /flos to see the products in action');
    console.log('2. Verify images are loading correctly');
    console.log('3. Test filtering and pagination');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testFlosProducts();
}

module.exports = { testFlosProducts };
