import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkProductsWithoutCategories() {
  try {
    console.log('🔍 Checking all products without categories...\n');

    // Get all products without categories
    const productsWithoutCategories = await client.fetch(
      `*[_type == "product" && (!defined(categories) || length(categories) == 0)] {
        _id,
        name,
        brand,
        slug,
        price
      } | order(brand asc, name asc)`
    );

    console.log(`Found ${productsWithoutCategories.length} products without categories\n`);

    // Group by brand
    const byBrand = {};
    productsWithoutCategories.forEach(product => {
      const brand = product.brand || 'Unknown';
      if (!byBrand[brand]) {
        byBrand[brand] = [];
      }
      byBrand[brand].push(product);
    });

    // Display by brand
    Object.keys(byBrand).sort().forEach(brand => {
      console.log(`\n📦 ${brand} (${byBrand[brand].length} products):`);
      byBrand[brand].forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} (${product.slug?.current || 'no-slug'})`);
      });
    });

    console.log('\n' + '='.repeat(60));
    console.log(`\nTotal: ${productsWithoutCategories.length} products need categories\n`);

    return byBrand;

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

checkProductsWithoutCategories()
  .then(() => {
    console.log('✅ Check complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });
