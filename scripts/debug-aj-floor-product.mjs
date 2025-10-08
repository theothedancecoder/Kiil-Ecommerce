import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function debugAJFloorProduct() {
  try {
    console.log('Searching for AJ Floor Lamp product...\n');
    
    const products = await client.fetch(`
      *[_type == "product" && name match "AJ Floor*"] {
        _id,
        name,
        brand,
        slug,
        price,
        "slugCurrent": slug.current
      }
    `);
    
    console.log(`Found ${products.length} products matching "AJ Floor":\n`);
    products.forEach((product, index) => {
      console.log(`Product ${index + 1}:`);
      console.log(`  Name: ${product.name}`);
      console.log(`  Brand: ${product.brand}`);
      console.log(`  Slug object:`, product.slug);
      console.log(`  Slug.current: ${product.slugCurrent}`);
      console.log(`  Price: ${product.price}`);
      console.log(`  Generated href would be: /products/${product.slugCurrent || 'unknown'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

debugAJFloorProduct();
