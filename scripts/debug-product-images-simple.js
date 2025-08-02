require('dotenv/config');
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13',
  useCdn: false
});

async function debugProductImages() {
  console.log('🔍 Debugging Product Images from Sanity...\n');
  
  try {
    const query = `*[_type == "product"][0...3] {
      _id,
      name,
      image {
        ...,
        asset->
      },
      variants[] {
        name,
        image {
          ...,
          asset->
        }
      }
    }`;
    
    const products = await client.fetch(query);
    
    console.log(`Found ${products.length} products for debugging\n`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log('   Image structure:', JSON.stringify(product.image, null, 2));
      console.log('   Image type:', typeof product.image);
      
      if (product.image) {
        console.log('   Has asset?', 'asset' in product.image);
        if (product.image.asset) {
          console.log('   Asset type:', typeof product.image.asset);
          console.log('   Asset has url?', product.image.asset.url ? 'YES' : 'NO');
          if (product.image.asset.url) {
            console.log('   Asset URL:', product.image.asset.url);
          }
        }
      }
      
      // Check variants
      if (product.variants && product.variants.length > 0) {
        console.log('   Variants:');
        product.variants.slice(0, 2).forEach((variant, vIndex) => {
          console.log(`     ${vIndex + 1}. ${variant.name || 'Unnamed variant'}`);
          if (variant.image) {
            console.log('       Has image asset?', variant.image.asset ? 'YES' : 'NO');
            if (variant.image.asset && variant.image.asset.url) {
              console.log('       Variant image URL:', variant.image.asset.url);
            }
          }
        });
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
    console.error('❌ Error debugging product images:', error);
  }
}

debugProductImages();
