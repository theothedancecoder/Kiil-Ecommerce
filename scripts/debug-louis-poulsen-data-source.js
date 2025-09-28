const { getLouisPoulsenProducts, getLouisPoulsenProductBySlug } = require('../sanity/lib/products/getLouisPoulsenProducts.ts');

async function debugLouisPoulsenDataSource() {
  console.log('🔍 Debugging Louis Poulsen Data Source...\n');
  
  try {
    // Test Sanity data
    console.log('📡 Checking Sanity CMS for Louis Poulsen products...');
    const sanityProducts = await getLouisPoulsenProducts();
    console.log(`Found ${sanityProducts.length} Louis Poulsen products in Sanity`);
    
    if (sanityProducts.length > 0) {
      console.log('\n📋 Sanity Products:');
      sanityProducts.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name || 'Unnamed'}`);
        console.log(`   - ID: ${product._id}`);
        console.log(`   - Slug: ${product.slug?.current || 'N/A'}`);
        console.log(`   - Image: ${product.image?.asset?.url || 'N/A'}`);
        console.log(`   - Variants: ${product.variants?.length || 0}`);
        if (product.variants && product.variants.length > 0) {
          product.variants.slice(0, 3).forEach((variant, vIndex) => {
            console.log(`     ${vIndex + 1}. ${variant.name}: ${variant.image?.asset?.url || 'No image'}`);
          });
        }
        console.log('');
      });
    }
    
    // Test specific AJ Floor product
    console.log('🎯 Testing AJ Floor product specifically...');
    const ajFloorSanity = await getLouisPoulsenProductBySlug('aj-floor');
    if (ajFloorSanity) {
      console.log('✅ Found AJ Floor in Sanity:');
      console.log(`   - Name: ${ajFloorSanity.name}`);
      console.log(`   - Image: ${ajFloorSanity.image?.asset?.url || 'N/A'}`);
      console.log(`   - Variants: ${ajFloorSanity.variants?.length || 0}`);
    } else {
      console.log('❌ AJ Floor not found in Sanity');
    }
    
    console.log('\n🔍 Current Implementation Analysis:');
    console.log('The Louis Poulsen product page is configured to:');
    console.log('1. First try to get product from Sanity by slug');
    console.log('2. If not found, try to get all Sanity products and find by slug');
    console.log('3. If static product has variants, prefer static data');
    console.log('4. Otherwise use Sanity data');
    console.log('5. Fall back to static data on error');
    
    console.log('\n🚨 Issue Identified:');
    console.log('The static data in lib/louisPoulsenProducts.ts has wrong Unsplash images');
    console.log('These are random photos (including person headshots) instead of lamp images');
    
  } catch (error) {
    console.error('❌ Error debugging Louis Poulsen data source:', error);
    
    if (error.message.includes('environment variables')) {
      console.log('\n💡 Sanity environment variables not configured');
      console.log('   This means the page is definitely using static data');
      console.log('   The wrong images are coming from lib/louisPoulsenProducts.ts');
    }
  }
}

debugLouisPoulsenDataSource();
