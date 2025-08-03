import { getFredericiaProducts } from '../sanity/lib/products/getFredericiaProducts.ts';

async function testFredericiaProducts() {
  try {
    console.log('Testing Fredericia products from Sanity...\n');
    
    const products = await getFredericiaProducts();
    console.log(`Found ${products.length} Fredericia products in Sanity\n`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   ID: ${product._id}`);
      console.log(`   Slug: ${product.slug?.current || 'No slug'}`);
      console.log(`   Image: ${product.image ? 'Has image' : 'No image'}`);
      console.log(`   Image Asset: ${product.image?.asset ? 'Has asset' : 'No asset'}`);
      console.log(`   Price: ${product.price || 'No price'}`);
      console.log(`   Variants: ${product.variants?.length || 0}`);
      if (product.variants?.length > 0) {
        product.variants.forEach((variant, vIndex) => {
          console.log(`     ${vIndex + 1}. ${variant.name} - ${variant.material || 'No material'}`);
        });
      }
      console.log('');
    });
    
  } catch (error) {
    console.error('Error testing Fredericia products:', error);
  }
}

testFredericiaProducts();
