const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-13',
  useCdn: false,
});

async function verifyLogoContent() {
  try {
    console.log('🔍 Verifying logo content in Sanity...\n');
    
    // Fetch homepage data with logo
    const query = `
      *[_type == "homepage"][0] {
        _id,
        title,
        siteSettings {
          logo {
            asset->{
              _id,
              url,
              originalFilename,
              size,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      }
    `;
    
    const homepage = await client.fetch(query);
    
    if (!homepage) {
      console.log('❌ No homepage content found in Sanity');
      console.log('Run: npm run setup:homepage to create homepage content');
      return;
    }
    
    console.log('✅ Homepage document found:');
    console.log(`   Document ID: ${homepage._id}`);
    console.log(`   Title: ${homepage.title}`);
    
    if (homepage.siteSettings && homepage.siteSettings.logo) {
      console.log('\n🏷️  Logo Configuration:');
      console.log(`   Alt Text: "${homepage.siteSettings.logo.alt}"`);
      
      if (homepage.siteSettings.logo.asset) {
        const asset = homepage.siteSettings.logo.asset;
        console.log(`   Asset ID: ${asset._id}`);
        console.log(`   Original Filename: ${asset.originalFilename}`);
        console.log(`   File Size: ${(asset.size / 1024).toFixed(2)} KB`);
        console.log(`   Dimensions: ${asset.metadata.dimensions.width}x${asset.metadata.dimensions.height}`);
        console.log(`   Sanity CDN URL: ${asset.url}`);
        
        // Verify the URL is from Sanity CDN
        if (asset.url.includes('cdn.sanity.io')) {
          console.log('   ✅ Logo is hosted on Sanity CDN');
        } else {
          console.log('   ⚠️  Logo URL does not appear to be from Sanity CDN');
        }
        
        // Test URL accessibility
        console.log('\n🌐 Testing logo URL accessibility...');
        try {
          const response = await fetch(asset.url);
          if (response.ok) {
            console.log('   ✅ Logo URL is accessible');
            console.log(`   Response status: ${response.status}`);
            console.log(`   Content-Type: ${response.headers.get('content-type')}`);
          } else {
            console.log(`   ❌ Logo URL returned status: ${response.status}`);
          }
        } catch (fetchError) {
          console.log(`   ❌ Error accessing logo URL: ${fetchError.message}`);
        }
        
      } else {
        console.log('   ❌ No logo asset found - logo field exists but no image uploaded');
      }
    } else {
      console.log('\n❌ No logo configuration found in siteSettings');
      console.log('   The logo field is not set in Sanity');
      console.log('   The SiteLogo component will use fallback: /kiil-black-square-bla.png');
    }
    
    // Check environment variables
    console.log('\n🔧 Environment Configuration:');
    console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✅ Set' : '❌ Missing'}`);
    console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'Not set'}`);
    console.log(`   API Version: 2025-06-13`);
    
    console.log('\n🎯 Production Diagnosis:');
    if (homepage.siteSettings && homepage.siteSettings.logo && homepage.siteSettings.logo.asset) {
      console.log('✅ Logo is configured in Sanity and should load in production');
      console.log('   If logo is not showing in production, check:');
      console.log('   1. Environment variables are set correctly in production');
      console.log('   2. Sanity client configuration');
      console.log('   3. Network connectivity to Sanity CDN');
      console.log('   4. Browser console for any JavaScript errors');
    } else {
      console.log('❌ Logo is NOT configured in Sanity');
      console.log('   Production will use fallback image: /kiil-black-square-bla.png');
      console.log('   To fix: Upload a logo in Sanity Studio under Homepage > Site Settings > Site Logo');
    }
    
  } catch (error) {
    console.error('❌ Error verifying logo content:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your .env.local file has correct Sanity credentials');
    console.log('2. Verify your Sanity project is accessible');
    console.log('3. Ensure the homepage document exists in Sanity');
  }
}

verifyLogoContent();
