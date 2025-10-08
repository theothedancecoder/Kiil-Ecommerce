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

async function debugOutOfStockProducts() {
  try {
    console.log('🔍 Checking product stock status in Sanity...\n');

    // Get all products with their stock status
    const allProducts = await client.fetch(
      `*[_type == "product"] | order(name asc) {
        _id,
        name,
        brand,
        inStock,
        stock,
        "shouldShow": inStock == true || stock > 0
      }`
    );

    console.log(`Total products in Sanity: ${allProducts.length}\n`);

    // Separate in-stock and out-of-stock
    const inStockProducts = allProducts.filter(p => p.inStock === true || (p.stock && p.stock > 0));
    const outOfStockProducts = allProducts.filter(p => !(p.inStock === true || (p.stock && p.stock > 0)));

    console.log(`✅ In-stock products: ${inStockProducts.length}`);
    console.log(`❌ Out-of-stock products: ${outOfStockProducts.length}\n`);

    console.log('=' .repeat(80));
    console.log('OUT-OF-STOCK PRODUCTS (should be hidden):');
    console.log('=' .repeat(80) + '\n');

    outOfStockProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name || 'Unnamed'} (${product.brand || 'No brand'})`);
      console.log(`   inStock: ${product.inStock}`);
      console.log(`   stock: ${product.stock}`);
      console.log(`   shouldShow: ${product.shouldShow}\n`);
    });

    // Check the query that should filter them
    console.log('=' .repeat(80));
    console.log('TESTING FILTER QUERY:');
    console.log('=' .repeat(80) + '\n');

    const filteredProducts = await client.fetch(
      `*[_type == "product" && (inStock == true || stock > 0)] {
        _id,
        name,
        brand,
        inStock,
        stock
      }`
    );

    console.log(`Products returned by filter query: ${filteredProducts.length}`);
    console.log(`Expected: ${inStockProducts.length}\n`);

    if (filteredProducts.length !== inStockProducts.length) {
      console.log('⚠️  MISMATCH! Filter query is not working correctly.\n');
      
      // Find products that should be filtered but aren't
      const shouldBeFiltered = filteredProducts.filter(p => 
        !(p.inStock === true || (p.stock && p.stock > 0))
      );
      
      if (shouldBeFiltered.length > 0) {
        console.log(`Found ${shouldBeFiltered.length} products that passed the filter but shouldn't have:\n`);
        shouldBeFiltered.forEach(p => {
          console.log(`- ${p.name}: inStock=${p.inStock}, stock=${p.stock}`);
        });
      }
    } else {
      console.log('✅ Filter query is working correctly!\n');
    }

    // Sample some products to show their exact values
    console.log('=' .repeat(80));
    console.log('SAMPLE PRODUCT DATA (first 5 out-of-stock):');
    console.log('=' .repeat(80) + '\n');

    for (let i = 0; i < Math.min(5, outOfStockProducts.length); i++) {
      const product = outOfStockProducts[i];
      const fullProduct = await client.fetch(
        `*[_type == "product" && _id == $id][0] {
          _id,
          name,
          brand,
          inStock,
          stock,
          "rawInStock": inStock,
          "rawStock": stock,
          "typeOfInStock": type::of(inStock),
          "typeOfStock": type::of(stock)
        }`,
        { id: product._id }
      );
      
      console.log(`${i + 1}. ${fullProduct.name}`);
      console.log(`   Raw data:`, JSON.stringify(fullProduct, null, 2));
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

debugOutOfStockProducts()
  .then(() => {
    console.log('\n✅ Debug complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });
