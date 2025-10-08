import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function testUpdatedFilter() {
  try {
    console.log('🧪 Testing updated stock filter...\n');

    // Test the OLD filter (for comparison)
    console.log('📊 OLD FILTER: (inStock == true || stock > 0)');
    const oldFilterQuery = `*[_type == "product" && (inStock == true || stock > 0)] {
      _id,
      name,
      brand,
      inStock,
      stock
    }`;
    
    const oldResults = await client.fetch(oldFilterQuery);
    console.log(`   Results: ${oldResults.length} products\n`);

    // Test the NEW filter
    console.log('📊 NEW FILTER: (inStock == true || (defined(stock) && stock > 0))');
    const newFilterQuery = `*[_type == "product" && (inStock == true || (defined(stock) && stock > 0))] {
      _id,
      name,
      brand,
      inStock,
      stock
    }`;
    
    const newResults = await client.fetch(newFilterQuery);
    console.log(`   Results: ${newResults.length} products\n`);

    // Compare the results
    console.log('=' .repeat(80));
    console.log('COMPARISON:');
    console.log('=' .repeat(80));
    console.log(`Old filter returned: ${oldResults.length} products`);
    console.log(`New filter returned: ${newResults.length} products`);
    console.log(`Difference: ${oldResults.length - newResults.length} products filtered out\n`);

    if (oldResults.length > newResults.length) {
      console.log('✅ SUCCESS! The new filter is more restrictive and filters out products with null values.\n');
      
      // Find which products were filtered out
      const oldIds = new Set(oldResults.map(p => p._id));
      const newIds = new Set(newResults.map(p => p._id));
      
      const filteredOut = oldResults.filter(p => !newIds.has(p._id));
      
      console.log('=' .repeat(80));
      console.log(`PRODUCTS FILTERED OUT (${filteredOut.length}):`);
      console.log('=' .repeat(80));
      filteredOut.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name || 'Unnamed'} (${product.brand || 'No brand'})`);
        console.log(`   inStock: ${product.inStock}`);
        console.log(`   stock: ${product.stock}\n`);
      });
    } else if (oldResults.length === newResults.length) {
      console.log('⚠️  WARNING: Both filters return the same number of products.');
      console.log('   This might mean there are no products with null stock values.\n');
    } else {
      console.log('❌ ERROR: New filter returned MORE products than old filter!');
      console.log('   This should not happen.\n');
    }

    // Verify no out-of-stock products in new results
    const outOfStockInNew = newResults.filter(p => 
      !(p.inStock === true || (p.stock !== null && p.stock !== undefined && p.stock > 0))
    );

    if (outOfStockInNew.length > 0) {
      console.log('=' .repeat(80));
      console.log('❌ ISSUE: Found out-of-stock products in NEW filter results:');
      console.log('=' .repeat(80));
      outOfStockInNew.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name || 'Unnamed'}`);
        console.log(`   inStock: ${product.inStock}, stock: ${product.stock}\n`);
      });
    } else {
      console.log('✅ VERIFIED: All products in new filter results are in stock!\n');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

testUpdatedFilter()
  .then(() => {
    console.log('\n✅ Test complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });
