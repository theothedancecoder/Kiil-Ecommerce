import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function checkVitraProducts() {
  try {
    const products = await client.fetch(`*[_type == 'product' && brand == 'Vitra'] {
      _id,
      name,
      slug,
      brand,
      price,
      'variantCount': count(variants),
      'hasMainImage': defined(image.asset._ref)
    } | order(name asc)`);
    
    console.log(`\n✅ Found ${products.length} Vitra products in Sanity:\n`);
    
    if (products.length === 0) {
      console.log('❌ No Vitra products found in Sanity. Need to migrate them first.\n');
      return;
    }
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   - Slug: ${product.slug?.current || 'NO SLUG'}`);
      console.log(`   - Price: ${product.price || 'NO PRICE'}`);
      console.log(`   - Main Image: ${product.hasMainImage ? '✅' : '❌'}`);
      console.log(`   - Variants: ${product.variantCount || 0}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkVitraProducts();
