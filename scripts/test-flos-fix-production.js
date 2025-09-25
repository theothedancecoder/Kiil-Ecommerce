const { getFlosProductBySlug } = require('../sanity/lib/products/getFlosProducts');

async function testFlosProductBySlug() {
  console.log('🔍 Testing getFlosProductBySlug function...');
  
  try {
    // Test the specific product from the URL
    const product = await getFlosProductBySlug('2097-18-chandelier');
    
    if (!product) {
      console.log('❌ Product not found with slug: 2097-18-chandelier');
      return;
    }
    
    console.log('✅ Product found:', product.name);
    console.log('📊 Product details:');
    console.log('  - ID:', product._id);
    console.log('  - Name:', product.name);
    console.log('  - Price:', product.price);
    console.log('  - Designer:', product.designer);
    console.log('  - Main Image:', product.image?.asset?.url ? '✅ Present' : '❌ Missing');
    console.log('  - Variants:', product.variants?.length || 0);
    
    if (product.variants && product.variants.length > 0) {
      console.log('🎨 Variants:');
      product.variants.forEach((variant, index) => {
        console.log(`  ${index + 1}. ${variant.name || variant.color} - Image: ${variant.image?.asset?.url ? '✅' : '❌'}`);
      });
    }
    
    console.log('🖼️ Lifestyle Images:', product.lifestyleImages?.length || 0);
    console.log('🔗 Related Products:', product.relatedProducts?.length || 0);
    
    return product;
    
  } catch (error) {
    console.error('❌ Error testing getFlosProductBySlug:', error);
    throw error;
  }
}

// Run the test
testFlosProductBySlug()
  .then(() => {
    console.log('✅ Test completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });
