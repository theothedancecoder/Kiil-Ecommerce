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

async function deleteAllOutOfStockProducts() {
  try {
    console.log('🗑️  DELETING ALL OUT-OF-STOCK PRODUCTS FROM SANITY\n');

    // Get ALL out-of-stock products
    const outOfStockProducts = await client.fetch(
      `*[_type == "product" && !(inStock == true || (stock != null && stock > 0))] {
        _id,
        name,
        brand,
        inStock,
        stock
      }`
    );

    console.log(`Found ${outOfStockProducts.length} out-of-stock products to DELETE\n`);

    if (outOfStockProducts.length === 0) {
      console.log('✅ No out-of-stock products found! All products are in stock.\n');
      return;
    }

    console.log('Deleting products:\n');
    
    for (const product of outOfStockProducts) {
      try {
        await client.delete(product._id);
        console.log(`✅ DELETED: ${product.name} (${product.brand || 'No brand'})`);
      } catch (error) {
        console.error(`❌ Failed to delete ${product.name}:`, error.message);
      }
    }

    console.log(`\n✅ DELETED ${outOfStockProducts.length} out-of-stock products from Sanity!`);
    console.log('These products will NO LONGER appear anywhere on the site.\n');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

deleteAllOutOfStockProducts()
  .then(() => {
    console.log('✅ Deletion complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Deletion failed:', error);
    process.exit(1);
  });
