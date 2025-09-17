import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

async function debugProductionVsWorkingRO() {
  console.log('🔍 Comparing working RO Collection vs broken Dux...');
  
  try {
    // Test RO Collection (working)
    console.log('\n✅ Testing WORKING RO Collection:');
    const roProduct = await client.fetch(`
      *[_type == "product" && "ro-collection" in categories[]->slug.current][0] {
        _id,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[0] {
          name,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);
    
    if (roProduct) {
      console.log(`   Product: ${roProduct.name}`);
      console.log(`   Main Image URL: ${roProduct.image?.asset?.url || 'MISSING'}`);
      console.log(`   Variant Image URL: ${roProduct.variants?.[0]?.image?.asset?.url || 'MISSING'}`);
      
      // Test if RO URLs work
      if (roProduct.image?.asset?.url) {
        try {
          const response = await fetch(roProduct.image.asset.url, { method: 'HEAD' });
          console.log(`   Main Image Status: ${response.status}`);
        } catch (e) {
          console.log(`   Main Image Error: ${e.message}`);
        }
      }
    }
    
    // Test Dux (broken)
    console.log('\n❌ Testing BROKEN Dux:');
    const duxProduct = await client.fetch(`
      *[_type == "product" && "dux" in categories[]->slug.current][0] {
        _id,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[0] {
          name,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);
    
    if (duxProduct) {
      console.log(`   Product: ${duxProduct.name}`);
      console.log(`   Main Image URL: ${duxProduct.image?.asset?.url || 'MISSING'}`);
      console.log(`   Variant Image URL: ${duxProduct.variants?.[0]?.image?.asset?.url || 'MISSING'}`);
      
      // Test if Dux URLs work
      if (duxProduct.image?.asset?.url) {
        try {
          const response = await fetch(duxProduct.image.asset.url, { method: 'HEAD' });
          console.log(`   Main Image Status: ${response.status}`);
        } catch (e) {
          console.log(`   Main Image Error: ${e.message}`);
        }
      }
    }
    
    // Compare URL patterns
    console.log('\n🔍 URL Pattern Analysis:');
    if (roProduct?.image?.asset?.url && duxProduct?.image?.asset?.url) {
      console.log(`   RO URL:  ${roProduct.image.asset.url}`);
      console.log(`   Dux URL: ${duxProduct.image.asset.url}`);
      
      // Check if they follow same pattern
      const roPattern = roProduct.image.asset.url.match(/cdn\.sanity\.io\/images\/([^\/]+)\/([^\/]+)\/(.+)/);
      const duxPattern = duxProduct.image.asset.url.match(/cdn\.sanity\.io\/images\/([^\/]+)\/([^\/]+)\/(.+)/);
      
      if (roPattern && duxPattern) {
        console.log(`   RO Project:  ${roPattern[1]}`);
        console.log(`   RO Dataset:  ${roPattern[2]}`);
        console.log(`   Dux Project: ${duxPattern[1]}`);
        console.log(`   Dux Dataset: ${duxPattern[2]}`);
        
        if (roPattern[1] === duxPattern[1] && roPattern[2] === duxPattern[2]) {
          console.log('   ✅ Same project and dataset - URLs should work identically');
        } else {
          console.log('   ❌ Different project/dataset - this could be the issue!');
        }
      }
    }
    
    // Test with different API versions
    console.log('\n🔧 Testing Different API Versions:');
    const apiVersions = ['2023-05-03', '2025-06-13'];
    
    for (const version of apiVersions) {
      console.log(`\n   Testing API Version: ${version}`);
      const testClient = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
        apiVersion: version,
      });
      
      try {
        const testProduct = await testClient.fetch(`
          *[_type == "product" && slug.current == "jetson-classic-soft-88" && "dux" in categories[]->slug.current][0] {
            name,
            image { asset-> { url } }
          }
        `);
        
        if (testProduct) {
          console.log(`     ✅ ${version}: ${testProduct.name} - ${testProduct.image?.asset?.url ? 'HAS URL' : 'NO URL'}`);
        } else {
          console.log(`     ❌ ${version}: No product found`);
        }
      } catch (error) {
        console.log(`     ❌ ${version}: Error - ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugProductionVsWorkingRO();
