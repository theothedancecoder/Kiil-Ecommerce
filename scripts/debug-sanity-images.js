require('dotenv/config');
const { client } = require('../sanity/lib/client');

async function debugSanityImages() {
  console.log('🔍 Debugging Sanity Product Images...\n');
  
  try {
    // Get a few products with their image data
    const query = `*[_type == "product"][0...3] {
      _id,
      name,
      image,
      "imageExpanded": image {
        ...,
        asset->
      }
    }`;
    
    const products = await client.fetch(query);
    
    console.log(`Found ${products.length} products for debugging:\n`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log('   Raw image object:', JSON.stringify(product.image, null, 2));
      console.log('   Expanded image object:', JSON.stringify(product.imageExpanded, null, 2));
      console.log('   Image type:', typeof product.image);
      console.log('   Image has asset?', product.image && 'asset' in product.image);
      if (product.image && product.image.asset) {
        console.log('   Asset type:', typeof product.image.asset);
        console.log('   Asset _ref:', product.image.asset._ref);
      }
      console.log('---\n');
    });
    
    // Test image URL building
    console.log('🔧 Testing image URL building...\n');
    
    const imageUrlBuilder = require('@sanity/image-url');
    const builder = imageUrlBuilder(client);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      try {
        if (product.image) {
          const url = builder.image(product.image).url();
          console.log('   Built URL:', url);
        } else {
          console.log('   No image available');
        }
      } catch (error) {
        console.log('   Error building URL:', error.message);
      }
      console.log('---\n');
    });
    
  } catch (error) {
    console.error('❌ Error debugging Sanity images:', error);
  }
}

debugSanityImages();
