require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkSpecificProduct() {
  try {
    const product = await client.fetch(`*[_type == "product" && slug.current == "metal-cover-accessories-for-asteria"][0] {
      _id,
      name,
      slug,
      image {
        asset -> {
          url
        }
      },
      variants[] {
        _key,
        name,
        color,
        material,
        price,
        image {
          asset -> {
            url
          }
        }
      },
      lifestyleImages[] {
        asset -> {
          url
        }
      }
    }`);
    
    console.log('🔍 Metal Cover Accessories for Asteria Product Status:');
    if (product) {
      console.log('✅ Product found in Sanity');
      console.log('- Name:', product.name);
      console.log('- Main image URL:', product.image?.asset?.url || 'No main image');
      console.log('- Variants count:', product.variants?.length || 0);
      
      if (product.variants && product.variants.length > 0) {
        console.log('\n🎨 Variants:');
        product.variants.forEach((variant, i) => {
          console.log(`  ${i + 1}. ${variant.name || 'Unnamed'}`);
          console.log(`     - Color: ${variant.color || 'N/A'}`);
          console.log(`     - Material: ${variant.material || 'N/A'}`);
          console.log(`     - Has image: ${!!variant.image?.asset?.url}`);
          console.log(`     - Image URL: ${variant.image?.asset?.url || 'No image'}`);
        });
      }
      
      console.log('\n📸 Lifestyle images:', product.lifestyleImages?.length || 0);
      if (product.lifestyleImages && product.lifestyleImages.length > 0) {
        product.lifestyleImages.forEach((img, i) => {
          console.log(`  ${i + 1}. ${img.asset?.url || 'No URL'}`);
        });
      }
    } else {
      console.log('❌ Product not found with slug: metal-cover-accessories-for-asteria');
      
      // Check if there are similar products
      const similarProducts = await client.fetch(`*[_type == "product" && name match "*metal*cover*" || name match "*asteria*"] {
        _id,
        name,
        slug
      }`);
      
      console.log('\n🔍 Similar products found:');
      similarProducts.forEach(p => {
        console.log(`- ${p.name} (slug: ${p.slug?.current || 'no slug'})`);
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkSpecificProduct();
