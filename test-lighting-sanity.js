require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
});

async function testLightingProducts() {
  try {
    console.log('🔍 Testing lighting products in Sanity...\n');

    // Test FLOS products
    const flosProducts = await client.fetch(`
      *[_type == "product" && brand == "FLOS" && "lighting" in categories[]->slug.current] {
        _id,
        name,
        brand,
        price,
        stock,
        inStock,
        image,
        categories[]->{title, slug}
      } | order(name asc)
    `);

    console.log(`✅ Found ${flosProducts.length} FLOS products in Sanity`);

    // Test Louis Poulsen products
    const louisPoulsenProducts = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen" && "lighting" in categories[]->slug.current] {
        _id,
        name,
        brand,
        price,
        stock,
        inStock,
        image,
        categories[]->{title, slug}
      } | order(name asc)
    `);

    console.log(`✅ Found ${louisPoulsenProducts.length} Louis Poulsen products in Sanity`);

    // Test combined query
    const allLightingProducts = await client.fetch(`
      *[_type == "product" && (brand == "FLOS" || brand == "Louis Poulsen") && "lighting" in categories[]->slug.current] {
        _id,
        name,
        brand,
        price,
        stock,
        inStock,
        image,
        categories[]->{title, slug}
      } | order(brand asc, name asc)
    `);

    console.log(`✅ Total lighting products (FLOS + Louis Poulsen): ${allLightingProducts.length}`);

    // Check image data for first few products
    console.log('\n🖼️ Image data check:');
    allLightingProducts.slice(0, 5).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.brand})`);
      console.log(`   Image: ${product.image ? 'Has image data' : 'No image data'}`);
      if (product.image) {
        console.log(`   Image type: ${typeof product.image}`);
        console.log(`   Image keys: ${Object.keys(product.image || {}).join(', ')}`);
      }
    });

    console.log('\n🎉 Lighting products test completed!');

  } catch (error) {
    console.error('❌ Error testing lighting products:', error);
  }
}

testLightingProducts();
