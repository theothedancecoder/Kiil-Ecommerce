require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Important: disable CDN for real-time data
  apiVersion: '2024-01-01',
});

async function debugDevVsProduction() {
  try {
    console.log('🔍 Debugging Development vs Production differences...');
    console.log('Environment variables:');
    console.log('- PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('- DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    console.log('- HAS_TOKEN:', !!process.env.SANITY_API_TOKEN);
    
    // Test the exact query that the production site uses
    console.log('\n🔍 Testing getAllProducts query (production equivalent)...');
    
    const getAllProductsQuery = `*[_type == "product"] {
      _id,
      name,
      slug,
      brand,
      price,
      image,
      description,
      categories[] -> {
        _id,
        title,
        slug
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
      stock,
      roomCategory
    }`;
    
    const allProducts = await client.fetch(getAllProductsQuery);
    const umageProduct = allProducts.find(p => p.slug?.current === 'a-conversation-piece-dining-chair');
    
    if (umageProduct) {
      console.log('✅ UMAGE product found in getAllProducts query');
      console.log('- Name:', umageProduct.name);
      console.log('- Brand:', umageProduct.brand);
      console.log('- Variants count:', umageProduct.variants?.length || 0);
      
      if (umageProduct.variants && umageProduct.variants.length > 0) {
        console.log('\n🎨 Variants details:');
        umageProduct.variants.forEach((variant, i) => {
          console.log(`  ${i + 1}. ${variant.name}`);
          console.log(`     - _key: ${variant._key || 'MISSING'}`);
          console.log(`     - Color: ${variant.color || 'N/A'}`);
          console.log(`     - Material: ${variant.material || 'N/A'}`);
          console.log(`     - Has image: ${!!variant.image?.asset?.url}`);
          console.log(`     - Image URL: ${variant.image?.asset?.url || 'N/A'}`);
        });
        
        console.log('\n✅ Variants are properly structured and should show in production');
      } else {
        console.log('❌ No variants found - this is the production issue!');
      }
    } else {
      console.log('❌ UMAGE product not found in getAllProducts query');
    }
    
    // Test with CDN enabled (like production might be using)
    console.log('\n🔍 Testing with CDN enabled (production behavior)...');
    const clientWithCDN = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      token: process.env.SANITY_API_TOKEN,
      useCdn: true, // This might be causing production issues
      apiVersion: '2024-01-01',
    });
    
    const cdnProducts = await clientWithCDN.fetch(getAllProductsQuery);
    const cdnUmageProduct = cdnProducts.find(p => p.slug?.current === 'a-conversation-piece-dining-chair');
    
    if (cdnUmageProduct) {
      console.log('📊 CDN Results:');
      console.log('- Variants count with CDN:', cdnUmageProduct.variants?.length || 0);
      
      if (cdnUmageProduct.variants?.length !== umageProduct.variants?.length) {
        console.log('🚨 CDN CACHE ISSUE DETECTED!');
        console.log('- Non-CDN variants:', umageProduct.variants?.length || 0);
        console.log('- CDN variants:', cdnUmageProduct.variants?.length || 0);
        console.log('💡 Solution: Need to purge CDN cache or disable CDN for production');
      } else {
        console.log('✅ CDN and non-CDN results match');
      }
    }
    
    // Check if there are any environment-specific issues
    console.log('\n🔍 Checking for environment-specific configurations...');
    
    // Test the specific query used by the product page
    const productPageQuery = `*[_type == "product" && slug.current == "a-conversation-piece-dining-chair"][0] {
      _id,
      name,
      slug,
      brand,
      price,
      image,
      description,
      categories[] -> {
        _id,
        title,
        slug
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
      stock,
      roomCategory
    }`;
    
    const productPageResult = await client.fetch(productPageQuery);
    console.log('📄 Product page query result:');
    console.log('- Found product:', !!productPageResult);
    console.log('- Variants count:', productPageResult?.variants?.length || 0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

debugDevVsProduction();
