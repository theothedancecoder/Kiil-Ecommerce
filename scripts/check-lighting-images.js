// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client. Please install @sanity/client:');
    console.error('npm install @sanity/client');
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

async function checkLightingImages() {
  try {
    console.log('🔍 Checking lighting products image status...\n');

    // Get all lighting products
    const lightingProducts = await client.fetch(`
      *[_type == "product" && "lighting" in categories[]->slug.current && (brand == "FLOS" || brand == "Louis Poulsen")] {
        _id,
        name,
        brand,
        slug,
        "hasImage": defined(image),
        "imageCount": coalesce(count(lifestyleImages), 0)
      } | order(brand asc, name asc)
    `);

    console.log(`📊 Found ${lightingProducts.length} lighting products to check:\n`);

    let withImages = 0;
    let withoutImages = 0;

    lightingProducts.forEach(product => {
      const status = product.hasImage ? '✅' : '❌';
      console.log(`${status} ${product.brand} - ${product.name} (${product.slug.current})`);
      if (product.hasImage) withImages++;
      else withoutImages++;
    });

    console.log('\n📈 Summary:');
    console.log(`✅ Products with images: ${withImages}`);
    console.log(`❌ Products without images: ${withoutImages}`);
    console.log(`📊 Total lighting products: ${lightingProducts.length}`);
    console.log(`📊 Image coverage: ${Math.round((withImages/lightingProducts.length)*100)}%`);

  } catch (error) {
    console.error('💥 Error checking lighting images:', error);
  }
}

checkLightingImages();
