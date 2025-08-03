#!/usr/bin/env node

const { getUmageProducts } = require('../sanity/lib/products/getUmageProducts.ts');

async function testGetUmageProducts() {
  try {
    console.log('🧪 Testing getUmageProducts function...\n');
    
    const products = await getUmageProducts();
    
    console.log(`📦 getUmageProducts returned: ${products.length} products`);
    
    if (products.length > 0) {
      console.log('\n✅ Products found:');
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} (${product.brand}) - ${product.price} kr`);
      });
    } else {
      console.log('\n❌ No products returned by getUmageProducts');
      console.log('This explains why the UMAGE page shows "No UMAGE products found"');
    }
    
  } catch (error) {
    console.error('❌ Error testing getUmageProducts:', error.message);
    console.error('Stack:', error.stack);
  }
}

testGetUmageProducts();
