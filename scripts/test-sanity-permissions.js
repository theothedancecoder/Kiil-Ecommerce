require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

// Test different token configurations
const tokenConfigs = [
  { name: 'SANITY_API_TOKEN', token: process.env.SANITY_API_TOKEN },
  { name: 'SANITY_API_WRITE_TOKEN', token: process.env.SANITY_API_WRITE_TOKEN },
  { name: 'NEXT_PUBLIC_SANITY_TOKEN', token: process.env.NEXT_PUBLIC_SANITY_TOKEN },
  { name: 'SANITY_WRITE_TOKEN', token: process.env.SANITY_WRITE_TOKEN }
];

async function testPermissions() {
  console.log('🔍 Testing Sanity API permissions...\n');
  
  for (const config of tokenConfigs) {
    if (!config.token) {
      console.log(`❌ ${config.name}: Not found in environment`);
      continue;
    }
    
    console.log(`🧪 Testing ${config.name}...`);
    
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      token: config.token,
      useCdn: false,
      apiVersion: '2024-01-01',
    });
    
    try {
      // Test read permissions
      const products = await client.fetch(`*[_type == "product" && brand == "UMAGE"][0..2] {
        _id,
        name,
        variants
      }`);
      console.log(`  ✅ Read access: Found ${products.length} products`);
      
      // Test write permissions with a simple patch
      if (products.length > 0) {
        const testProduct = products[0];
        console.log(`  🧪 Testing write access on: ${testProduct.name}`);
        
        // Try a minimal update that doesn't change data
        await client.patch(testProduct._id).set({ _updatedAt: new Date().toISOString() }).commit();
        console.log(`  ✅ Write access: Successfully updated ${testProduct.name}`);
        
        return { success: true, token: config.token, name: config.name };
      }
      
    } catch (error) {
      console.log(`  ❌ Error with ${config.name}: ${error.message}`);
    }
  }
  
  return { success: false };
}

async function main() {
  const result = await testPermissions();
  
  if (result.success) {
    console.log(`\n🎉 Found working token: ${result.name}`);
    console.log('✅ Ready to proceed with Umage variants fix!');
  } else {
    console.log('\n❌ No working tokens found with write permissions');
    console.log('Please check your Sanity API tokens configuration');
  }
}

main().catch(console.error);
