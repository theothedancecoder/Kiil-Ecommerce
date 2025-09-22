require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugRelatedProductsLookup() {
  try {
    console.log('🔍 Debugging HAY related products lookup...');
    
    // Get the Palisade Chair with its related products
    const product = await client.fetch(`*[_type == "product" && _id == "product-hay-palisade-chair"][0] {
      _id,
      name,
      slug,
      relatedProducts[] -> {
        _id,
        name,
        slug,
        price,
        image {
          asset -> {
            url
          }
        },
        variants[] {
          name,
          price,
          image {
            asset -> {
              url
            }
          }
        }
      }
    }`);
    
    console.log('📦 Product:', product?.name);
    console.log('- Related products from Sanity:');
    product?.relatedProducts?.forEach((related, i) => {
      console.log(`  ${i + 1}. ${related.name} (ID: ${related._id})`);
      console.log(`     - Price: ${related.price || 'N/A'}`);
      console.log(`     - Image: ${related.image?.asset?.url ? 'YES' : 'NO'}`);
      console.log(`     - Variants: ${related.variants?.length || 0}`);
    });
    
    // Now get all products using getAllProducts style query
    const allProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug,
      price,
      image {
        asset -> {
          url
        }
      },
      variants[] {
        name,
        price,
        image {
          asset -> {
            url
          }
        }
      }
    }`);
    
    console.log('\n🔍 Checking if related products exist in allProducts array:');
    product?.relatedProducts?.forEach((related) => {
      const foundProduct = allProducts.find(p => p._id === related._id);
      console.log(`- ${related.name} (${related._id}): ${foundProduct ? '✅ FOUND' : '❌ NOT FOUND'}`);
      if (foundProduct) {
        console.log(`  - Price in allProducts: ${foundProduct.price || 'N/A'}`);
        console.log(`  - Variants in allProducts: ${foundProduct.variants?.length || 0}`);
      }
    });
    
    // Check what IDs are actually in allProducts
    console.log('\n📊 All HAY product IDs in allProducts:');
    allProducts.forEach(p => {
      console.log(`- ${p.name}: ${p._id}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugRelatedProductsLookup();
