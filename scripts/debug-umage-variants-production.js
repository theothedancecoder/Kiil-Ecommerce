require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugUmageVariants() {
  try {
    console.log('🔍 Debugging UMAGE variants in production...');
    
    // Check the specific product that should have variants
    const product = await client.fetch(`*[_type == "product" && slug.current == "a-conversation-piece-dining-chair"][0] { 
      _id, 
      name, 
      slug, 
      brand, 
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
      }
    }`);
    
    if (product) {
      console.log('📦 Found UMAGE product:', product.name);
      console.log('- Brand:', product.brand);
      console.log('- Variants count:', product.variants?.length || 0);
      
      if (product.variants && product.variants.length > 0) {
        console.log('\n🎨 Variants details:');
        product.variants.forEach((variant, i) => {
          console.log(`  ${i + 1}. ${variant.name || 'Unnamed'}`);
          console.log(`     - Color: ${variant.color || 'N/A'}`);
          console.log(`     - Material: ${variant.material || 'N/A'}`);
          console.log(`     - Price: ${variant.price || 'N/A'}`);
          console.log(`     - Has image: ${!!variant.image?.asset?.url}`);
          console.log(`     - Image URL: ${variant.image?.asset?.url || 'N/A'}`);
          console.log(`     - _key: ${variant._key || 'MISSING'}`);
        });
      } else {
        console.log('❌ No variants found for this product!');
      }
      
      // Check if the issue is with the getAllProducts query
      console.log('\n🔍 Testing getAllProducts query...');
      const allProductsQuery = `*[_type == "product"] {
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
      
      const allProducts = await client.fetch(allProductsQuery);
      const umageProduct = allProducts.find(p => p.slug?.current === 'a-conversation-piece-dining-chair');
      
      if (umageProduct) {
        console.log('✅ Product found in getAllProducts query');
        console.log('- Variants in getAllProducts:', umageProduct.variants?.length || 0);
        
        if (umageProduct.variants && umageProduct.variants.length > 0) {
          console.log('✅ Variants are properly structured in getAllProducts');
        } else {
          console.log('❌ Variants missing in getAllProducts query result');
        }
      } else {
        console.log('❌ Product not found in getAllProducts query');
      }
      
    } else {
      console.log('❌ Product not found with slug: a-conversation-piece-dining-chair');
    }
    
    // Check all UMAGE products for variants
    console.log('\n🔍 Checking all UMAGE products for variants...');
    const umageProducts = await client.fetch(`*[_type == "product" && brand == "UMAGE"] {
      _id,
      name,
      slug,
      variants[] {
        _key,
        name,
        color,
        material
      }
    }`);
    
    console.log(`\n📊 UMAGE Products Variants Summary:`);
    umageProducts.forEach(product => {
      console.log(`- ${product.name}: ${product.variants?.length || 0} variants`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugUmageVariants();
