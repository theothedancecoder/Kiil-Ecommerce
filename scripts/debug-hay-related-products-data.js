require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugRelatedProductsData() {
  try {
    console.log('🔍 Debugging HAY related products data structure...');
    
    // Get the Palisade Chair product with its related products
    const product = await client.fetch(`*[_type == "product" && slug.current == "palisade-chair"][0] {
      _id,
      name,
      slug,
      relatedProducts[] -> {
        _id,
        name,
        slug,
        price,
        variants[] {
          name,
          image {
            asset -> {
              _id,
              url
            }
          },
          price
        }
      }
    }`);
    
    if (product) {
      console.log('📦 Found product:', product.name);
      console.log('- Related products count:', product.relatedProducts?.length || 0);
      
      if (product.relatedProducts && product.relatedProducts.length > 0) {
        console.log('\n🔗 Related products details:');
        product.relatedProducts.forEach((related, i) => {
          console.log(`\n  ${i + 1}. ${related.name}`);
          console.log(`     - ID: ${related._id}`);
          console.log(`     - Slug: ${related.slug?.current || 'NO SLUG'}`);
          console.log(`     - Price: ${related.price || 'NO PRICE'}`);
          console.log(`     - Variants count: ${related.variants?.length || 0}`);
          
          if (related.variants && related.variants.length > 0) {
            console.log(`     - First variant image: ${related.variants[0]?.image?.asset?.url || 'NO IMAGE'}`);
            console.log(`     - First variant price: ${related.variants[0]?.price || 'NO VARIANT PRICE'}`);
          }
        });
      } else {
        console.log('❌ No related products found');
      }
      
      // Also check what getAllProducts returns for these same products
      console.log('\n🔍 Checking getAllProducts data for comparison...');
      const allProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
        _id,
        name,
        slug,
        price,
        variants[] {
          name,
          image {
            asset -> {
              _id,
              url
            }
          },
          price
        }
      }`);
      
      console.log(`\n📊 Found ${allProducts.length} HAY products in getAllProducts`);
      
      // Find the related products in the getAllProducts result
      if (product.relatedProducts) {
        product.relatedProducts.forEach((related) => {
          const foundInAll = allProducts.find(p => p._id === related._id);
          console.log(`\n🔍 Related product "${related.name}" in getAllProducts:`);
          if (foundInAll) {
            console.log(`   ✅ Found - Price: ${foundInAll.price}, Variants: ${foundInAll.variants?.length || 0}`);
            if (foundInAll.variants?.[0]) {
              console.log(`   - First variant image: ${foundInAll.variants[0]?.image?.asset?.url || 'NO IMAGE'}`);
            }
          } else {
            console.log(`   ❌ NOT FOUND in getAllProducts`);
          }
        });
      }
      
    } else {
      console.log('❌ Product not found with slug: palisade-chair');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugRelatedProductsData();
