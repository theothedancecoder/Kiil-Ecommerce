require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function fixSlug() {
  try {
    console.log('🔧 Fixing Metal Cover Accessories slug...');
    
    const product = await client.fetch(`*[_type == "product" && slug.current == "metal-cover-accessories-asteria"][0] {
      _id,
      name,
      slug,
      image {
        asset -> { url }
      },
      variants[] {
        name,
        image {
          asset -> { url }
        }
      }
    }`);
    
    if (product) {
      console.log('✅ Found product:', product.name);
      console.log('- Current slug:', product.slug.current);
      console.log('- Main image:', !!product.image?.asset?.url);
      console.log('- Variants:', product.variants?.length || 0);
      
      // Update the slug to match the URL
      await client
        .patch(product._id)
        .set({
          slug: {
            _type: 'slug',
            current: 'metal-cover-accessories-for-asteria'
          }
        })
        .commit();
      
      console.log('✅ Updated slug to: metal-cover-accessories-for-asteria');
      console.log('🎉 The URL should now work correctly!');
    } else {
      console.log('❌ Product not found');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixSlug();
