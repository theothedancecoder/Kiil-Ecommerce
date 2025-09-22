require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function debugHay404Issue() {
  console.log('🔍 Debugging HAY 404 issue...\n');

  try {
    // Get all HAY products with their slugs
    const hayProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug,
      image
    }`);

    console.log(`Found ${hayProducts.length} HAY products:\n`);

    hayProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Slug: ${product.slug?.current || 'NO SLUG'}`);
      console.log(`   Has Image: ${!!product.image?.asset}`);
      console.log(`   Expected URL: /hay/${product.slug?.current || 'no-slug'}`);
      console.log('');
    });

    // Test a specific product lookup
    const testSlug = 'palisade-bar-stool';
    console.log(`🧪 Testing lookup for slug: "${testSlug}"`);
    
    const foundProduct = hayProducts.find(p => p.slug?.current === testSlug);
    if (foundProduct) {
      console.log(`✅ Found product: ${foundProduct.name}`);
    } else {
      console.log(`❌ Product not found with slug: ${testSlug}`);
    }

    // Check if any products have the old hay/ prefix
    const productsWithPrefix = hayProducts.filter(p => p.slug?.current?.startsWith('hay/'));
    console.log(`\n📊 Products with 'hay/' prefix: ${productsWithPrefix.length}`);
    
    if (productsWithPrefix.length > 0) {
      console.log('Products with hay/ prefix:');
      productsWithPrefix.forEach(p => {
        console.log(`   - ${p.name}: ${p.slug?.current}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugHay404Issue();
