const { createClient } = require('@sanity/client');

// This script helps diagnose logo loading issues in production
async function diagnoseProductionLogo() {
  console.log('🔍 Diagnosing Production Logo Loading Issues\n');
  
  // Check environment variables
  console.log('📋 Environment Variables Check:');
  const requiredEnvVars = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'NEXT_PUBLIC_SANITY_API_VERSION'
  ];
  
  requiredEnvVars.forEach(envVar => {
    const value = process.env[envVar];
    if (value) {
      console.log(`   ✅ ${envVar}: ${value}`);
    } else {
      console.log(`   ❌ ${envVar}: NOT SET`);
    }
  });
  
  // Test Sanity client configuration
  console.log('\n🔧 Sanity Client Configuration:');
  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13',
      useCdn: true, // Production setting
      perspective: 'published',
    });
    
    console.log('   ✅ Client created successfully');
    console.log(`   Project ID: ${client.config().projectId}`);
    console.log(`   Dataset: ${client.config().dataset}`);
    console.log(`   API Version: ${client.config().apiVersion}`);
    console.log(`   Use CDN: ${client.config().useCdn}`);
    
    // Test the exact query used by getHomepage
    console.log('\n🔍 Testing Homepage Query:');
    const query = `
      *[_type == "homepage"][0] {
        _id,
        title,
        siteSettings {
          logo {
            asset,
            alt
          }
        }
      }
    `;
    
    const result = await client.fetch(query);
    
    if (result) {
      console.log('   ✅ Homepage query successful');
      console.log(`   Document ID: ${result._id}`);
      
      if (result.siteSettings?.logo) {
        console.log('   ✅ Logo configuration found');
        console.log(`   Logo alt: ${result.siteSettings.logo.alt}`);
        console.log(`   Logo asset: ${result.siteSettings.logo.asset ? '✅ Present' : '❌ Missing'}`);
        
        if (result.siteSettings.logo.asset) {
          console.log(`   Asset ref: ${result.siteSettings.logo.asset._ref}`);
          console.log(`   Asset type: ${result.siteSettings.logo.asset._type}`);
        }
      } else {
        console.log('   ❌ No logo configuration found');
      }
    } else {
      console.log('   ❌ No homepage document found');
    }
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // Common production issues and solutions
  console.log('\n🚨 Common Production Issues & Solutions:');
  console.log('');
  console.log('1. Environment Variables Missing:');
  console.log('   - Ensure NEXT_PUBLIC_SANITY_PROJECT_ID is set in production');
  console.log('   - Ensure NEXT_PUBLIC_SANITY_DATASET is set to "production"');
  console.log('   - Check Vercel/deployment platform environment variables');
  console.log('');
  console.log('2. Sanity CDN Issues:');
  console.log('   - CDN might be blocked by corporate firewalls');
  console.log('   - Check browser network tab for failed requests');
  console.log('   - Verify cdn.sanity.io is accessible');
  console.log('');
  console.log('3. Build-time vs Runtime Issues:');
  console.log('   - Logo component is async - check for hydration issues');
  console.log('   - Verify Suspense boundary is working correctly');
  console.log('   - Check for JavaScript errors in browser console');
  console.log('');
  console.log('4. Caching Issues:');
  console.log('   - Clear browser cache and hard refresh');
  console.log('   - Check if CDN cache needs invalidation');
  console.log('   - Verify ISR revalidation is working');
  console.log('');
  console.log('5. Image Processing Issues:');
  console.log('   - Check getImageUrl function for errors');
  console.log('   - Verify imageUrlBuilder is working correctly');
  console.log('   - Test fallback image path exists');
  
  console.log('\n🔧 Debugging Steps for Production:');
  console.log('1. Check browser console for errors');
  console.log('2. Inspect network tab for failed Sanity requests');
  console.log('3. Verify environment variables in deployment platform');
  console.log('4. Test Sanity Studio access and logo upload');
  console.log('5. Check if fallback image loads: /kiil-black-square-bla.png');
}

// Run with environment variables from .env.local for testing
if (require.main === module) {
  require('dotenv').config({ path: '.env.local' });
  diagnoseProductionLogo().catch(console.error);
}

module.exports = { diagnoseProductionLogo };
