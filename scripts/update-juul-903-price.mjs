import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function updateJuul903Price() {
  console.log('💰 Updating Juul 903 price...\n');

  try {
    // Find Juul 903 product
    const product = await client.fetch(`
      *[_type == "product" && brand == "Juul" && name == "Juul 903"][0] {
        _id,
        name,
        price,
        salePrice
      }
    `);

    if (!product) {
      console.log('❌ Juul 903 product not found');
      return;
    }

    console.log(`Found: ${product.name}`);
    console.log(`Current price: kr ${product.price || 'Not set'}`);
    console.log(`Current sale price: kr ${product.salePrice || 'Not set'}\n`);

    // Update with new prices
    const newPrice = 35021;
    const newSalePrice = 29990;

    console.log(`Updating to:`);
    console.log(`  Original price: kr ${newPrice.toLocaleString()}`);
    console.log(`  Sale price: kr ${newSalePrice.toLocaleString()}\n`);

    await client
      .patch(product._id)
      .set({
        price: newPrice,
        salePrice: newSalePrice
      })
      .commit();

    console.log('✅ Price updated successfully!');
    console.log(`\nJuul Sofa | 903`);
    console.log(`Fra kr ${newPrice.toLocaleString()} Opprinnelig pris var: kr ${newPrice.toLocaleString()}.kr ${newSalePrice.toLocaleString()}`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateJuul903Price();
