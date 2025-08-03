#!/usr/bin/env node

/**
 * Script to test the production site directly and check what's happening
 */

const https = require('https');

async function testProductionSite() {
  console.log('🔍 Testing Production Site Directly...\n');
  
  const url = 'https://kiil-ecommerce.vercel.app/products/bellhop-rechargeable-table-lamp';
  
  console.log(`Testing URL: ${url}`);
  console.log('Looking for "Available Options" section in HTML...\n');
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Content Length: ${data.length} characters\n`);
        
        // Check for key indicators
        const hasAvailableOptions = data.includes('Available Options');
        const hasVariantButtons = data.includes('White') && data.includes('Brick Red');
        const hasVariantsSection = data.includes('product.variants');
        const hasReactHydration = data.includes('__NEXT_DATA__');
        
        console.log('🔍 ANALYSIS:');
        console.log(`✅ Page loads: ${res.statusCode === 200 ? 'Yes' : 'No'}`);
        console.log(`❓ Has "Available Options": ${hasAvailableOptions ? 'Yes' : 'No'}`);
        console.log(`❓ Has variant buttons: ${hasVariantButtons ? 'Yes' : 'No'}`);
        console.log(`❓ Has variants in code: ${hasVariantsSection ? 'Yes' : 'No'}`);
        console.log(`❓ Has React hydration: ${hasReactHydration ? 'Yes' : 'No'}`);
        
        // Look for specific patterns
        if (data.includes('product.variants')) {
          console.log('\n✅ Found variants code in HTML');
          
          // Extract the variants section
          const variantsMatch = data.match(/product\.variants[^}]+}/);
          if (variantsMatch) {
            console.log('Variants code snippet:', variantsMatch[0]);
          }
        } else {
          console.log('\n❌ No variants code found in HTML');
        }
        
        // Check for Next.js data
        if (hasReactHydration) {
          console.log('\n✅ React hydration data found');
          
          // Try to extract product data
          const nextDataMatch = data.match(/"pageProps":\{[^}]+\}/);
          if (nextDataMatch) {
            console.log('Page props found - checking for variants...');
            const hasVariantsInProps = nextDataMatch[0].includes('variants');
            console.log(`Variants in page props: ${hasVariantsInProps ? 'Yes' : 'No'}`);
          }
        }
        
        console.log('\n💡 DIAGNOSIS:');
        if (!hasAvailableOptions && !hasVariantButtons) {
          console.log('❌ ISSUE CONFIRMED: Variants not rendering in production');
          console.log('Possible causes:');
          console.log('- Server-side rendering not including variants');
          console.log('- Client-side hydration failing');
          console.log('- Environment variables not set in Vercel');
          console.log('- Build cache using old code');
        } else {
          console.log('✅ Variants appear to be working in production');
        }
        
        resolve();
      });
    }).on('error', (err) => {
      console.error('❌ Error fetching production site:', err.message);
      reject(err);
    });
  });
}

// Run the test
if (require.main === module) {
  testProductionSite().catch(console.error);
}

module.exports = { testProductionSite };
