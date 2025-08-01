#!/usr/bin/env node

// Environment validation script for production debugging
const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_API_VERSION'
];

const optionalEnvVars = [
  'NEXT_PUBLIC_BASE_URL',
  'VERCEL_URL',
  'USE_SANITY_PRODUCTS'
];

console.log('🔍 Validating environment variables...\n');

let hasErrors = false;

// Check required variables
console.log('📋 Required Variables:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}${value.length > 20 ? '...' : ''}`);
  } else {
    console.log(`❌ ${varName}: MISSING`);
    hasErrors = true;
  }
});

console.log('\n📋 Optional Variables:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value}`);
  } else {
    console.log(`⚠️  ${varName}: Not set (optional)`);
  }
});

// Test Sanity connection if variables are present
if (!hasErrors) {
  console.log('\n🔗 Testing Sanity connection...');
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13';
  
  const testUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=*[_type == "product"][0..2]{_id,name,image}`;
  
  console.log(`Test URL: ${testUrl}`);
  
  // Simple fetch test (if fetch is available)
  if (typeof fetch !== 'undefined') {
    fetch(testUrl)
      .then(response => {
        if (response.ok) {
          console.log('✅ Sanity connection successful');
          return response.json();
        } else {
          console.log(`❌ Sanity connection failed: ${response.status} ${response.statusText}`);
        }
      })
      .then(data => {
        if (data && data.result) {
          console.log(`📊 Found ${data.result.length} test products`);
          data.result.forEach(product => {
            console.log(`  - ${product.name || 'Unnamed'} (${product._id})`);
            if (product.image) {
              console.log(`    Image: ${product.image.asset ? 'Has asset' : 'No asset'}`);
            }
          });
        }
      })
      .catch(error => {
        console.log(`❌ Sanity test failed: ${error.message}`);
      });
  } else {
    console.log('⚠️  Fetch not available, skipping connection test');
  }
}

if (hasErrors) {
  console.log('\n❌ Environment validation failed. Please set the missing variables.');
  process.exit(1);
} else {
  console.log('\n✅ Environment validation passed!');
}
