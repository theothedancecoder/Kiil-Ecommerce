const { getAllProducts } = require('../sanity/lib/products/getAllProductsSimple.ts');

async function testProductLinks() {
  console.log('Testing product links...\n');
  
  try {
    const products = await getAllProducts();
    console.log(`Total products: ${products.length}`);
    
    // Check products with slugs
    const productsWithSlugs = products.filter(p => p.slug?.current);
    console.log(`Products with slugs: ${productsWithSlugs.length}`);
    
    // Check products without slugs
    const productsWithoutSlugs = products.filter(p => !p.slug?.current);
    console.log(`Products without slugs: ${productsWithoutSlugs.length}`);
    
    console.log('\n--- Products WITHOUT slugs (need fixing) ---');
    productsWithoutSlugs.slice(0, 10).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (ID: ${product._id})`);
    });
    
    console.log('\n--- Products WITH slugs (working) ---');
    productsWithSlugs.slice(0, 10).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} -> /products/${product.slug.current}`);
    });
    
    // Test a few product URLs
    console.log('\n--- Testing product URLs ---');
    const testProducts = productsWithSlugs.slice(0, 3);
    for (const product of testProducts) {
      const url = `http://localhost:3001/products/${product.slug.current}`;
      console.log(`Testing: ${product.name} -> ${url}`);
    }
    
  } catch (error) {
    console.error('Error testing product links:', error);
  }
}

testProductLinks();
