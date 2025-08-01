#!/usr/bin/env node

// Production image diagnosis script
console.log('🔍 Diagnosing production image issues...\n');

// Check environment variables
console.log('📋 Environment Variables:');
const requiredVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_API_VERSION'
];

requiredVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`${value ? '✅' : '❌'} ${varName}: ${value || 'MISSING'}`);
});

// Test Sanity connection
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13';

if (projectId && dataset) {
  console.log('\n🔗 Testing Sanity Connection:');
  const testUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=*[_type == "product"][0..2]{_id,name,image}`;
  console.log(`Test URL: ${testUrl}`);
  
  // Test with fetch if available
  if (typeof fetch !== 'undefined') {
    fetch(testUrl)
      .then(response => {
        console.log(`Status: ${response.status} ${response.statusText}`);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      })
      .then(data => {
        console.log(`✅ Found ${data.result?.length || 0} products`);
        if (data.result && data.result.length > 0) {
          data.result.forEach((product, index) => {
            console.log(`  ${index + 1}. ${product.name || 'Unnamed'}`);
            if (product.image) {
              if (product.image.asset) {
                console.log(`     Image: ✅ Has asset reference`);
              } else {
                console.log(`     Image: ❌ No asset reference`);
              }
            } else {
              console.log(`     Image: ❌ No image field`);
            }
          });
        }
      })
      .catch(error => {
        console.log(`❌ Sanity connection failed: ${error.message}`);
      });
  }
}

// Common production issues
console.log('\n🚨 Common Production Issues to Check:');
console.log('1. Static files in /public folder:');
console.log('   - Check if files exist: /public/HAY/, /public/Fritz Hansen/, etc.');
console.log('   - Verify file names match exactly (case-sensitive)');
console.log('   - Check for special characters in folder/file names');

console.log('\n2. Vercel deployment:');
console.log('   - Check Vercel build logs for errors');
console.log('   - Verify /public folder is included in deployment');
console.log('   - Check if files are being excluded by .vercelignore');

console.log('\n3. Image paths:');
console.log('   - Static images should start with /');
console.log('   - Sanity images should use cdn.sanity.io');
console.log('   - Check browser Network tab for 404 errors');

console.log('\n4. Next.js Image optimization:');
console.log('   - May conflict with static images on Vercel');
console.log('   - Check if images load when accessing URLs directly');

console.log('\n📊 Debug Steps:');
console.log('1. Open browser DevTools on production site');
console.log('2. Check Console tab for JavaScript errors');
console.log('3. Check Network tab for failed image requests');
console.log('4. Try accessing image URLs directly in browser');
console.log('5. Compare working dev URLs vs broken prod URLs');

console.log('\n🔧 Quick Fixes to Try:');
console.log('1. Add NEXT_PUBLIC_SANITY_API_VERSION=2025-06-13 to Vercel');
console.log('2. Check .vercelignore doesn\'t exclude /public');
console.log('3. Verify file names match exactly (case-sensitive)');
console.log('4. Test with unoptimized images in next.config.ts');
