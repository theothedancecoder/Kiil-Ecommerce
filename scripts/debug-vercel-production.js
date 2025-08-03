// Debug script specifically for Vercel production issues
console.log('🔍 VERCEL PRODUCTION DEBUG');
console.log('========================');

// Check all environment variables
const envVars = {
  'USE_SANITY_PRODUCTS': process.env.USE_SANITY_PRODUCTS,
  'NEXT_PUBLIC_SANITY_PROJECT_ID': process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_DATASET': process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_API_VERSION': process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  'SANITY_API_TOKEN': process.env.SANITY_API_TOKEN ? 'SET' : 'MISSING',
  'SANITY_API_READ_TOKEN': process.env.SANITY_API_READ_TOKEN ? 'SET' : 'MISSING',
  'NODE_ENV': process.env.NODE_ENV
};

console.log('\n📋 Environment Variables Status:');
Object.entries(envVars).forEach(([key, value]) => {
  const status = value ? '✅' : '❌';
  console.log(`${status} ${key}: ${value || 'MISSING'}`);
});

// Check the specific issue
const USE_SANITY_PRODUCTS = process.env.USE_SANITY_PRODUCTS === 'true';
console.log('\n🎯 Critical Check:');
console.log(`USE_SANITY_PRODUCTS === 'true': ${USE_SANITY_PRODUCTS}`);
console.log(`Raw value: "${process.env.USE_SANITY_PRODUCTS}"`);

if (!USE_SANITY_PRODUCTS) {
  console.log('\n❌ PROBLEM IDENTIFIED:');
  console.log('The USE_SANITY_PRODUCTS environment variable is missing or not set to "true"');
  console.log('This causes getAllProducts() to return an empty array');
  console.log('\n🔧 SOLUTION:');
  console.log('Add USE_SANITY_PRODUCTS=true to your Vercel environment variables');
}

// Test Sanity connection if enabled
async function testSanityInProduction() {
  if (!USE_SANITY_PRODUCTS) {
    console.log('\n⏭️  Skipping Sanity test - USE_SANITY_PRODUCTS is false');
    return;
  }

  try {
    console.log('\n🔗 Testing Sanity Connection...');
    const { getAllProducts } = await import('../sanity/lib/products/getAllProductsSimple.ts');
    const products = await getAllProducts();
    
    console.log(`📦 Products found: ${products.length}`);
    if (products.length > 0) {
      console.log(`✅ First product: ${products[0].name}`);
      console.log(`🖼️  Has image: ${products[0].image ? 'Yes' : 'No'}`);
    }
  } catch (error) {
    console.log('❌ Sanity connection error:', error.message);
  }
}

testSanityInProduction();
