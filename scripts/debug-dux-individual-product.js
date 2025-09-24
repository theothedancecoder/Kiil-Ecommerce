require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugDuxIndividualProduct() {
  try {
    console.log('🔍 Debugging DUX individual product page...');
    
    // First, let's check what products exist with slug "inter-dining-table"
    console.log('\n1. Checking for product with slug "inter-dining-table":');
    const productBySlug = await client.fetch(`
      *[_type == "product" && slug.current == "inter-dining-table"][0] {
        _id,
        name,
        slug,
        brand,
        categories[]-> {
          _id,
          title,
          slug
        },
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          name,
          price,
          material,
          color,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);
    
    if (productBySlug) {
      console.log('✅ Found product:', productBySlug.name);
      console.log('- Brand:', productBySlug.brand);
      console.log('- Categories:', productBySlug.categories?.map(c => c.title).join(', '));
      console.log('- Has main image:', !!productBySlug.image?.asset?.url);
      console.log('- Main image URL:', productBySlug.image?.asset?.url);
      console.log('- Variants count:', productBySlug.variants?.length || 0);
      
      if (productBySlug.variants && productBySlug.variants.length > 0) {
        console.log('\n🎨 Variant details:');
        productBySlug.variants.forEach((variant, i) => {
          console.log(`  ${i + 1}. ${variant.name || 'Unnamed'}`);
          console.log(`     - Material: ${variant.material || 'N/A'}`);
          console.log(`     - Color: ${variant.color || 'N/A'}`);
          console.log(`     - Price: ${variant.price || 'N/A'}`);
          console.log(`     - Has image: ${!!variant.image?.asset?.url}`);
          console.log(`     - Image URL: ${variant.image?.asset?.url || 'N/A'}`);
        });
      }
    } else {
      console.log('❌ No product found with slug "inter-dining-table"');
    }
    
    // Check what DUX products exist
    console.log('\n2. Checking all DUX products:');
    const duxProducts = await client.fetch(`
      *[_type == "product" && brand == "DUX"] {
        _id,
        name,
        slug,
        brand,
        categories[]-> {
          title,
          slug
        }
      }
    `);
    
    console.log(`Found ${duxProducts.length} DUX products:`);
    duxProducts.forEach(product => {
      console.log(`- ${product.name} (slug: ${product.slug?.current})`);
    });
    
    // Check what categories exist with "dux" in the slug
    console.log('\n3. Checking categories with "dux" in slug:');
    const duxCategories = await client.fetch(`
      *[_type == "category" && slug.current match "*dux*"] {
        _id,
        title,
        slug
      }
    `);
    
    console.log(`Found ${duxCategories.length} categories with "dux" in slug:`);
    duxCategories.forEach(cat => {
      console.log(`- ${cat.title} (slug: ${cat.slug?.current})`);
    });
    
    // Test the current query that's failing
    console.log('\n4. Testing current getDuxProductBySlug query:');
    const currentQuery = await client.fetch(`
      *[_type == "product" && slug.current == "inter-dining-table" && "dux" in categories[]->slug.current][0] {
        _id,
        name,
        slug,
        brand
      }
    `);
    
    if (currentQuery) {
      console.log('✅ Current query works:', currentQuery.name);
    } else {
      console.log('❌ Current query returns null');
    }
    
    // Test alternative query by brand
    console.log('\n5. Testing alternative query by brand:');
    const brandQuery = await client.fetch(`
      *[_type == "product" && slug.current == "inter-dining-table" && brand == "DUX"][0] {
        _id,
        name,
        slug,
        brand
      }
    `);
    
    if (brandQuery) {
      console.log('✅ Brand query works:', brandQuery.name);
    } else {
      console.log('❌ Brand query returns null');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugDuxIndividualProduct();
