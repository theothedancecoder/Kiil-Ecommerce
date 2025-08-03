// Debug script to check production environment variables
console.log('=== PRODUCTION ENVIRONMENT DEBUG ===');

console.log('Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('USE_SANITY_PRODUCTS:', process.env.USE_SANITY_PRODUCTS);
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('NEXT_PUBLIC_SANITY_API_VERSION:', process.env.NEXT_PUBLIC_SANITY_API_VERSION);

// Test Sanity connection
async function testSanityConnection() {
  try {
    const { client } = await import('../sanity/lib/client.ts');
    console.log('\n=== SANITY CLIENT TEST ===');
    console.log('Client configured successfully');
    
    // Test a simple query
    const result = await client.fetch('*[_type == "product"] | order(_createdAt desc) [0...5] { _id, name }');
    console.log('Sample products:', result);
    console.log('Products found:', result.length);
    
  } catch (error) {
    console.error('Sanity connection error:', error);
  }
}

// Test getAllProducts function
async function testGetAllProducts() {
  try {
    console.log('\n=== TESTING getAllProducts ===');
    const { getAllProducts } = await import('../sanity/lib/products/getAllProductsSimple.ts');
    const products = await getAllProducts();
    console.log('getAllProducts result:', products.length, 'products');
    if (products.length > 0) {
      console.log('First product:', products[0]);
    }
  } catch (error) {
    console.error('getAllProducts error:', error);
  }
}

testSanityConnection();
testGetAllProducts();
