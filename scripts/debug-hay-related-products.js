require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugHayRelatedProducts() {
  try {
    console.log('🔍 Debugging HAY related products...');
    
    // Get a sample HAY product to see its structure
    const sampleProduct = await client.fetch(`*[_type == "product" && brand == "HAY"][0] {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
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
            _id,
            url
          }
        }
      },
      relatedProducts[] -> {
        _id,
        name,
        slug,
        image {
          asset -> {
            _id,
            url
          }
        },
        variants[] {
          _key,
          name,
          image {
            asset -> {
              _id,
              url
            }
          }
        }
      }
    }`);
    
    if (sampleProduct) {
      console.log('📦 Sample HAY product structure:');
      console.log('- Name:', sampleProduct.name);
      console.log('- Slug:', sampleProduct.slug?.current);
      console.log('- Has main image:', !!sampleProduct.image?.asset?.url);
      console.log('- Variants count:', sampleProduct.variants?.length || 0);
      console.log('- Related products count:', sampleProduct.relatedProducts?.length || 0);
      
      if (sampleProduct.relatedProducts && sampleProduct.relatedProducts.length > 0) {
        console.log('\n🔗 Related products:');
        sampleProduct.relatedProducts.forEach((related, i) => {
          console.log(`  ${i + 1}. ${related.name}`);
          console.log(`     - ID: ${related._id}`);
          console.log(`     - Slug: ${related.slug?.current}`);
          console.log(`     - Has main image: ${!!related.image?.asset?.url}`);
          console.log(`     - Main image URL: ${related.image?.asset?.url || 'N/A'}`);
          console.log(`     - Variants count: ${related.variants?.length || 0}`);
          if (related.variants && related.variants.length > 0) {
            console.log(`     - First variant image: ${related.variants[0]?.image?.asset?.url || 'N/A'}`);
          }
        });
      } else {
        console.log('❌ No related products found for this sample');
      }
    } else {
      console.log('❌ No HAY products found');
    }
    
    // Check if any HAY products have related products
    console.log('\n📊 HAY products with related products:');
    const productsWithRelated = await client.fetch(`*[_type == "product" && brand == "HAY" && count(relatedProducts) > 0] {
      _id,
      name,
      "relatedCount": count(relatedProducts)
    }`);
    
    console.log(`Found ${productsWithRelated.length} HAY products with related products:`);
    productsWithRelated.forEach(product => {
      console.log(`- ${product.name}: ${product.relatedCount} related products`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

debugHayRelatedProducts();
