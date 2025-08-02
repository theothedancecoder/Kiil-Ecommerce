require('dotenv/config');

async function debugProductImages() {
  console.log('🔍 Debugging Product Images from Sanity...\n');
  
  try {
    // Import the getAllProducts function
    const { getAllProducts } = require('../sanity/lib/products/getAllProductsSimple.ts');
    
    const products = await getAllProducts();
    
    console.log(`Found ${products.length} products\n`);
    
    // Debug first 3 products
    products.slice(0, 3).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log('   Image structure:', JSON.stringify(product.image, null, 2));
      console.log('   Image type:', typeof product.image);
      
      if (product.image) {
        console.log('   Has asset?', 'asset' in product.image);
        if (product.image.asset) {
          console.log('   Asset type:', typeof product.image.asset);
          console.log('   Asset structure:', JSON.stringify(product.image.asset, null, 2));
        }
      }
      
      // Check variants
      if (product.variants && product.variants.length > 0) {
        console.log('   Variants:');
        product.variants.slice(0, 2).forEach((variant, vIndex) => {
          console.log(`     ${vIndex + 1}. ${variant.name || 'Unnamed variant'}`);
          console.log('       Variant image:', JSON.stringify(variant.image, null, 2));
        });
      }
      
      console.log('---\n');
    });
    
  } catch (error) {
    console.error('❌ Error debugging product images:', error);
  }
}

debugProductImages();
