const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'hi84i3u4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN
});

async function updateVariantImages() {
  try {
    // First get the product
    const product = await client.fetch(`*[_type == 'product' && brand == 'UMAGE' && slug.current == 'a-conversation-piece-dining-chair'][0]`);
    
    if (!product) {
      console.log('Product not found');
      return;
    }
    
    console.log('Found product:', product.name);
    console.log('Product ID:', product._id);
    console.log('Current variants:');
    product.variants.forEach((variant, i) => {
      console.log(`  ${i + 1}. ${variant.name}: ${variant.image?.asset?._ref || 'No image'}`);
    });
    
    // Update the variants with correct images
    const updatedVariants = product.variants.map(variant => {
      if (variant.name === 'Oak with Sugar Brown') {
        return {
          ...variant,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-f1e2c98ff9e889f311abd9f4bdfbbf9574491eb8-900x900-webp'
            }
          }
        };
      } else if (variant.name === 'Oak with White Sands') {
        return {
          ...variant,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-4fe61f9f85528447e99f4ba055305f3924ae086c-900x900-webp'
            }
          }
        };
      }
      return variant;
    });
    
    // Update the product
    const result = await client
      .patch(product._id)
      .set({ variants: updatedVariants })
      .commit();
    
    console.log('\nSuccessfully updated variant images!');
    console.log('Updated variants:');
    updatedVariants.forEach((variant, i) => {
      console.log(`  ${i + 1}. ${variant.name}: ${variant.image.asset._ref}`);
    });
    
  } catch (error) {
    console.error('Error updating variant images:', error);
  }
}

updateVariantImages();
