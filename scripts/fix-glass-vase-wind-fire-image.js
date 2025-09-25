const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function fixGlassVaseWindFireImage() {
  try {
    console.log('🔄 Fixing Glass Vase Wind & Fire image...');

    // Get the existing product
    const existingProduct = await client.fetch(
      `*[_type == "product" && _id == "serax-glass-vase-wind-fire"][0]`
    );

    if (!existingProduct) {
      console.log('❌ Product not found: serax-glass-vase-wind-fire');
      return;
    }

    console.log('✅ Found existing product:', existingProduct.name);

    // Find the lifestyle image that was successfully uploaded
    const lifestyleImageAssetId = existingProduct.lifestyleImages?.[0]?.asset?._ref;
    
    if (!lifestyleImageAssetId) {
      console.log('❌ No lifestyle image found to use as main image');
      return;
    }

    console.log('✅ Found lifestyle image asset:', lifestyleImageAssetId);

    // Update the product to use the lifestyle image as the main image
    const updatedProduct = await client.createOrReplace({
      ...existingProduct,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: lifestyleImageAssetId
        }
      },
      // Also update variants to use the lifestyle image since the .avif files failed
      variants: existingProduct.variants?.map(variant => ({
        ...variant,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: lifestyleImageAssetId
          }
        }
      })) || []
    });

    console.log('✅ Successfully updated Glass Vase Wind & Fire with working image');
    console.log('✅ Main image and all variants now use the lifestyle image');
    
  } catch (error) {
    console.error('❌ Error fixing Glass Vase Wind & Fire image:', error);
    process.exit(1);
  }
}

fixGlassVaseWindFireImage();
