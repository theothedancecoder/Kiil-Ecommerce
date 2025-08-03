const { getFredericiaProducts, getFredericiaProduct } = require('../sanity/lib/products/getFredericiaProducts');

async function testFredericiaProducts() {
  console.log('🧪 Testing Fredericia Products Migration...\n');

  try {
    // Test getting all Fredericia products
    console.log('📦 Testing getFredericiaProducts()...');
    const products = await getFredericiaProducts();
    console.log(`✅ Found ${products.length} Fredericia products`);
    
    if (products.length > 0) {
      const firstProduct = products[0];
      console.log(`📋 First product: ${firstProduct.name}`);
      console.log(`🏷️  Price: kr ${firstProduct.price?.toLocaleString() || 'N/A'}`);
      console.log(`🔗 Slug: ${firstProduct.slug?.current || 'N/A'}`);
      console.log(`🎨 Variants: ${firstProduct.variants?.length || 0}`);
      
      // Test getting single product by slug
      if (firstProduct.slug?.current) {
        console.log(`\n🔍 Testing getFredericiaProduct('${firstProduct.slug.current}')...`);
        const singleProduct = await getFredericiaProduct(firstProduct.slug.current);
        if (singleProduct) {
          console.log(`✅ Successfully retrieved: ${singleProduct.name}`);
        } else {
          console.log('❌ Failed to retrieve single product');
        }
      }
    }

    console.log('\n🎉 Fredericia migration test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing Fredericia products:', error);
    console.log('\n⚠️  This might be expected if Sanity is not configured or has no Fredericia products yet.');
    console.log('📝 The pages will fall back to static data in this case.');
  }
}

testFredericiaProducts();
