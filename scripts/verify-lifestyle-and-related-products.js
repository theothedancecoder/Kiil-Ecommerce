require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function verifyLifestyleAndRelatedProducts() {
  console.log('🔍 Verifying lifestyle images and related products in Sanity...\n');
  
  try {
    // Get all Umage products with lifestyle images and related products
    const umageProducts = await client.fetch(`*[_type == "product" && brand == "UMAGE"] {
      _id,
      name,
      slug,
      lifestyleImages[] {
        _key,
        asset-> {
          _id,
          url
        }
      },
      relatedProducts[]-> {
        _id,
        name,
        slug
      }
    }`);
    
    console.log(`📦 Found ${umageProducts.length} UMAGE products in Sanity\n`);
    
    let productsWithLifestyle = 0;
    let productsWithRelated = 0;
    let totalLifestyleImages = 0;
    let totalRelatedProducts = 0;
    
    for (const product of umageProducts) {
      const lifestyleCount = product.lifestyleImages?.length || 0;
      const relatedCount = product.relatedProducts?.length || 0;
      
      if (lifestyleCount > 0) productsWithLifestyle++;
      if (relatedCount > 0) productsWithRelated++;
      
      totalLifestyleImages += lifestyleCount;
      totalRelatedProducts += relatedCount;
      
      console.log(`📋 ${product.name} (${product.slug?.current})`);
      console.log(`   📸 Lifestyle images: ${lifestyleCount}`);
      console.log(`   🔗 Related products: ${relatedCount}`);
      
      if (lifestyleCount > 0) {
        product.lifestyleImages.forEach((img, index) => {
          console.log(`      ${index + 1}. ${img.asset?.url ? '✅ Image URL exists' : '❌ No image URL'}`);
        });
      }
      
      if (relatedCount > 0) {
        product.relatedProducts.forEach((rel, index) => {
          console.log(`      ${index + 1}. ${rel.name} (${rel.slug?.current})`);
        });
      }
      
      console.log('');
    }
    
    console.log('📊 Summary:');
    console.log(`   Products with lifestyle images: ${productsWithLifestyle}/${umageProducts.length}`);
    console.log(`   Products with related products: ${productsWithRelated}/${umageProducts.length}`);
    console.log(`   Total lifestyle images: ${totalLifestyleImages}`);
    console.log(`   Total related products: ${totalRelatedProducts}`);
    
  } catch (error) {
    console.error('❌ Error verifying data:', error);
  }
}

async function main() {
  await verifyLifestyleAndRelatedProducts();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { verifyLifestyleAndRelatedProducts };
