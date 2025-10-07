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

async function updateJuul301Price() {
  try {
    console.log('🔍 Searching for Juul 301 product...\n');
    
    // Find Juul 301 product
    const query = `*[_type == "product" && brand == "Juul" && name match "Juul 301*"][0]`;
    const product = await client.fetch(query);
    
    if (!product) {
      console.log('❌ Juul 301 product not found');
      return;
    }
    
    console.log(`✅ Found product: ${product.name}`);
    console.log(`   Current price: ${product.price}`);
    console.log(`   Current salePrice: ${product.salePrice || 'Not set'}\n`);
    
    // Update the product with sale price
    const result = await client
      .patch(product._id)
      .set({
        price: 44737,
        salePrice: 39990
      })
      .commit();
    
    console.log('✅ Successfully updated Juul 301 pricing:');
    console.log(`   Original price: kr 44,737`);
    console.log(`   Sale price: kr 39,990`);
    console.log(`   Product ID: ${result._id}\n`);
    
  } catch (error) {
    console.error('❌ Error updating Juul 301 price:', error);
  }
}

updateJuul301Price();
