#!/usr/bin/env node

// Test script to verify environment variables are working
console.log('🔍 Testing Environment Variables...\n');

// Check all required environment variables
const requiredVars = {
  'USE_SANITY_PRODUCTS': process.env.USE_SANITY_PRODUCTS,
  'NEXT_PUBLIC_SANITY_PROJECT_ID': process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_DATASET': process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_API_VERSION': process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  'NODE_ENV': process.env.NODE_ENV
};

console.log('Environment Variables:');
console.log('=====================');
Object.entries(requiredVars).forEach(([key, value]) => {
  const status = value ? '✅' : '❌';
  console.log(`${status} ${key}: ${value || 'MISSING'}`);
});

// Test Sanity connection
async function testSanityConnection() {
  console.log('\n🔗 Testing Sanity Connection...');
  console.log('================================');
  
  try {
    // Import and test getAllProducts
    const { getAllProducts } = await import('../sanity/lib/products/getAllProductsSimple.ts');
    const products = await getAllProducts();
    
    if (products.length > 0) {
      console.log(`✅ SUCCESS: Found ${products.length} products`);
      console.log(`📦 Sample product: ${products[0].name}`);
      return true;
    } else {
      console.log('❌ FAILED: No products returned');
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
    return false;
  }
}

// Run tests
async function runTests() {
  const missingVars = Object.entries(requiredVars)
    .filter(([key, value]) => !value && key !== 'NODE_ENV')
    .map(([key]) => key);
  
  if (missingVars.length > 0) {
    console.log(`\n❌ Missing required environment variables: ${missingVars.join(', ')}`);
    console.log('\n📋 To fix this:');
    console.log('1. Check your .env.local file');
    console.log('2. Make sure all required variables are set');
    console.log('3. Restart your development server');
    process.exit(1);
  }
  
  const sanityWorking = await testSanityConnection();
  
  if (sanityWorking) {
    console.log('\n🎉 All tests passed! Environment is configured correctly.');
  } else {
    console.log('\n❌ Tests failed. Check your Sanity configuration.');
    process.exit(1);
  }
}

runTests().catch(console.error);
