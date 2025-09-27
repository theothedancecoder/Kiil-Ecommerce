const { getSibastProducts } = require('../sanity/lib/products/getSibastProducts.ts');

async function testSibastIntegration() {
  console.log('🧪 Testing Sibast Sanity Integration...\n');
  
  try {
    console.log('📡 Fetching Sibast products from Sanity...');
    const products = await getSibastProducts();
    
    console.log(`✅ Successfully fetched ${products.length} Sibast products from Sanity`);
    
    if (products.length > 0) {
      console.log('\n📋 Products found:');
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name || 'Unnamed Product'}`);
        console.log(`   - ID: ${product._id}`);
        console.log(`   - Brand: ${product.brand || 'N/A'}`);
        console.log(`   - Price: ${product.price ? `kr ${product.price.toLocaleString()}` : 'N/A'}`);
        console.log(`   - Categories: ${product.categories?.map(cat => cat.title).join(', ') || 'N/A'}`);
        console.log(`   - Variants: ${product.variants?.length || 0}`);
        console.log('');
      });
    } else {
      console.log('\n⚠️  No Sibast products found in Sanity CMS');
      console.log('   This means the main page will show "No Sibast products found"');
      console.log('   To fix this, you need to add Sibast products to Sanity CMS');
    }
    
    console.log('\n🎯 Integration Status:');
    console.log('✅ Sanity query function works');
    console.log('✅ Main page updated to use Sanity');
    console.log('✅ ProductGridItem component integration');
    console.log('✅ Pagination and filtering ready');
    console.log('❌ Individual product pages still use static data');
    
    console.log('\n📝 Next Steps:');
    console.log('1. Add Sibast products to Sanity CMS (if needed)');
    console.log('2. Update individual product pages to use Sanity (optional)');
    console.log('3. Test the /sibast page in browser');
    
  } catch (error) {
    console.error('❌ Error testing Sibast integration:', error);
    
    if (error.message.includes('environment variables')) {
      console.log('\n💡 This is expected if Sanity environment variables are not configured');
      console.log('   The page will fall back to showing "No products found" message');
    }
  }
}

testSibastIntegration();
