// Test script to verify FLOS products in Sanity
require('dotenv').config({ path: '.env.local' });

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client');
    process.exit(1);
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-06-13',
});

async function testFlosProducts() {
  try {
    console.log('🔍 Testing FLOS products in Sanity...\n');
    
    // Query FLOS products
    const flosProducts = await client.fetch(`
      *[_type == "product" && brand == "FLOS"] {
        _id,
        name,
        brand,
        price,
        stock,
        inStock,
        categories[]->{
          title,
          slug
        }
      } | order(name asc)
    `);
    
    console.log(`✅ Found ${flosProducts.length} FLOS products in Sanity:\n`);
    
    flosProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Brand: ${product.brand}`);
      console.log(`   Price: kr ${product.price?.toLocaleString() || 'N/A'}`);
      console.log(`   Stock: ${product.stock || 0} (${product.inStock ? 'In Stock' : 'Out of Stock'})`);
      console.log(`   Categories: ${product.categories?.map(c => c.title).join(', ') || 'None'}`);
      console.log('');
    });
    
    // Check if lighting category exists
    const lightingCategory = await client.fetch(`
      *[_type == "category" && slug.current == "lighting"][0] {
        _id,
        title,
        slug
      }
    `);
    
    if (lightingCategory) {
      console.log(`✅ Lighting category found: ${lightingCategory.title} (${lightingCategory._id})`);
    } else {
      console.log('❌ Lighting category not found');
    }
    
    console.log('\n🎉 FLOS products are successfully stored in Sanity!');
    
  } catch (error) {
    console.error('❌ Error testing FLOS products:', error);
  }
}

testFlosProducts();
