require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugSpecificHayProduct() {
  try {
    console.log('🔍 Debugging specific HAY product: palissade-cone-table-60');
    
    // Check if this specific product exists
    const product = await client.fetch(`*[_type == "product" && slug.current == "palissade-cone-table-60"][0] { 
      _id, 
      name, 
      slug, 
      brand, 
      price,
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
      lifestyleImages[] {
        asset -> {
          _id,
          url
        }
      }
    }`);
    
    if (product) {
      console.log('✅ Found product:', product.name);
      console.log('- Brand:', product.brand);
      console.log('- Slug:', product.slug?.current);
      console.log('- Price:', product.price);
      console.log('- Categories:', product.categories?.length || 0);
      console.log('- Variants:', product.variants?.length || 0);
      console.log('- Description type:', typeof product.description);
      
      if (product.categories) {
        console.log('\n📂 Categories:');
        product.categories.forEach((cat, i) => {
          console.log(`  ${i + 1}. ${cat?.title || 'Unnamed'} (${cat?._id})`);
        });
      }
      
      if (product.variants && product.variants.length > 0) {
        console.log('\n🎨 Variants:');
        product.variants.forEach((variant, i) => {
          console.log(`  ${i + 1}. ${variant?.name || 'Unnamed'}`);
          console.log(`     - Color: ${variant?.color || 'N/A'}`);
          console.log(`     - Material: ${variant?.material || 'N/A'}`);
          console.log(`     - Price: ${variant?.price || 'N/A'}`);
          console.log(`     - Has image: ${!!variant?.image?.asset?.url}`);
          console.log(`     - Image URL: ${variant?.image?.asset?.url || 'N/A'}`);
          console.log(`     - _key: ${variant?._key || 'MISSING'}`);
        });
      } else {
        console.log('❌ No variants found for this product!');
      }
      
      // Test the getAllProducts query specifically
      console.log('\n🔍 Testing getAllProducts query for this product...');
      const allProducts = await client.fetch(`*[_type == "product"] {
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
      }`);
      
      const foundInAll = allProducts.find(p => p.slug?.current === 'palissade-cone-table-60');
      
      if (foundInAll) {
        console.log('✅ Product found in getAllProducts query');
        console.log('- Variants in getAllProducts:', foundInAll.variants?.length || 0);
        console.log('- Categories in getAllProducts:', foundInAll.categories?.length || 0);
        
        // Check if categories is an array
        console.log('- Categories is array:', Array.isArray(foundInAll.categories));
        console.log('- Variants is array:', Array.isArray(foundInAll.variants));
        
        if (foundInAll.categories && foundInAll.categories.length > 0) {
          console.log('- First category:', foundInAll.categories[0]);
        }
        
        if (foundInAll.variants && foundInAll.variants.length > 0) {
          console.log('- First variant:', foundInAll.variants[0]);
        }
        
      } else {
        console.log('❌ Product NOT found in getAllProducts query');
      }
      
    } else {
      console.log('❌ Product not found with slug: palissade-cone-table-60');
      
      // Check if there are any HAY products with similar names
      console.log('\n🔍 Searching for similar HAY products...');
      const similarProducts = await client.fetch(`*[_type == "product" && brand == "HAY" && name match "*palissade*"] {
        _id,
        name,
        slug
      }`);
      
      console.log(`Found ${similarProducts.length} similar products:`);
      similarProducts.forEach(p => {
        console.log(`- ${p.name} (${p.slug?.current})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

debugSpecificHayProduct();
