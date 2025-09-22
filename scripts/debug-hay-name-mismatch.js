require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugNameMismatch() {
  try {
    console.log('🔍 Debugging HAY product name mismatches...');
    
    // Get the Palisade Chair with its related products (expanded)
    const productWithExpanded = await client.fetch(`*[_type == "product" && slug.current == "palisade-chair"][0] {
      _id,
      name,
      slug,
      relatedProducts[] -> {
        _id,
        name,
        slug
      }
    }`);
    
    // Get the same product using getAllProducts style query
    const productFromGetAll = await client.fetch(`*[_type == "product" && slug.current == "palisade-chair"][0] {
      _id,
      name,
      slug,
      relatedProducts[]-> {
        _id,
        name,
        slug
      }
    }`);
    
    console.log('📦 Product with expanded related products:');
    console.log('- Name:', productWithExpanded?.name);
    console.log('- Related products:');
    productWithExpanded?.relatedProducts?.forEach((related, i) => {
      console.log(`  ${i + 1}. ${related.name} (ID: ${related._id}, Slug: ${related.slug?.current})`);
    });
    
    console.log('\n📦 Product from getAllProducts style query:');
    console.log('- Name:', productFromGetAll?.name);
    console.log('- Related products:');
    productFromGetAll?.relatedProducts?.forEach((related, i) => {
      console.log(`  ${i + 1}. ${related.name} (ID: ${related._id}, Slug: ${related.slug?.current})`);
    });
    
    // Now check what getAllProducts actually returns for HAY products
    console.log('\n🔍 Checking what getAllProducts returns for HAY...');
    const allProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug,
      relatedProducts[]-> {
        _id,
        name,
        slug
      }
    }`);
    
    const palisadeChairFromAll = allProducts.find(p => p.slug?.current === 'palisade-chair');
    console.log('\n📊 Palisade Chair from getAllProducts result:');
    if (palisadeChairFromAll) {
      console.log('- Found:', palisadeChairFromAll.name);
      console.log('- Related products count:', palisadeChairFromAll.relatedProducts?.length || 0);
      palisadeChairFromAll.relatedProducts?.forEach((related, i) => {
        console.log(`  ${i + 1}. ${related.name} (ID: ${related._id})`);
      });
    } else {
      console.log('❌ NOT FOUND in getAllProducts result');
    }
    
    // Check if the related product IDs exist in the HAY products
    console.log('\n🔍 Checking if related product IDs exist in HAY products...');
    const hayProductIds = allProducts.map(p => p._id);
    console.log('HAY product IDs:', hayProductIds);
    
    if (productWithExpanded?.relatedProducts) {
      productWithExpanded.relatedProducts.forEach((related) => {
        const existsInHay = hayProductIds.includes(related._id);
        console.log(`- ${related.name} (${related._id}): ${existsInHay ? '✅ EXISTS' : '❌ NOT FOUND'} in HAY products`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugNameMismatch();
