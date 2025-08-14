const { createClient } = require('@sanity/client');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-13',
  useCdn: false,
});

async function checkCurrentProducts() {
  console.log('🔍 Checking current Sanity products...\n');

  try {
    // Get all products
    const products = await client.fetch(`*[_type == "product"] {
      _id,
      name,
      brand,
      slug,
      price,
      "imageCount": count(images),
      "variantCount": count(variants)
    } | order(brand asc, name asc)`);

    console.log(`📊 Total products in Sanity: ${products.length}\n`);

    // Group by brand
    const brandCounts = {};
    products.forEach(product => {
      brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
    });

    console.log('📋 Products by brand:');
    Object.entries(brandCounts).sort().forEach(([brand, count]) => {
      console.log(`   ${brand}: ${count} products`);
    });

    console.log('\n🖼️  Image status:');
    const withImages = products.filter(p => p.imageCount > 0).length;
    const withoutImages = products.filter(p => p.imageCount === 0).length;
    console.log(`   Products with images: ${withImages}`);
    console.log(`   Products without images: ${withoutImages}`);

    console.log('\n🔄 Variant status:');
    const withVariants = products.filter(p => p.variantCount > 0).length;
    const withoutVariants = products.filter(p => p.variantCount === 0).length;
    console.log(`   Products with variants: ${withVariants}`);
    console.log(`   Products without variants: ${withoutVariants}`);

    // Show some sample products
    console.log('\n📝 Sample products:');
    products.slice(0, 10).forEach(product => {
      console.log(`   - ${product.name} (${product.brand}) - ${product.imageCount} images, ${product.variantCount} variants`);
    });

    if (products.length > 10) {
      console.log(`   ... and ${products.length - 10} more products`);
    }

  } catch (error) {
    console.error('❌ Error checking products:', error.message);
  }
}

checkCurrentProducts();
