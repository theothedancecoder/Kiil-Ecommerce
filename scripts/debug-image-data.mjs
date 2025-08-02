import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-13',
  useCdn: false,
});

async function testImageData() {
  try {
    const products = await client.fetch(`*[_type == "product"][0...3] {
      _id,
      name,
      image {
        _type,
        asset-> {
          _id,
          _type,
          url
        },
        alt
      }
    }`);
    
    console.log('Sample product image data:');
    products.forEach(product => {
      console.log(`Product: ${product.name}`);
      console.log('Image object:', JSON.stringify(product.image, null, 2));
      console.log('---');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

testImageData();
