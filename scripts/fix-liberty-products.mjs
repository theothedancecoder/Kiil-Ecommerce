import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function fixLibertyProducts() {
  console.log('Fixing Liberty products...\n');
  
  // 1. Delete the duplicate Liberty products without images
  const products = await client.fetch(`
    *[_type == "product" && brand == "Kartell" && name match "Liberty*"] {
      _id,
      name,
      slug,
      image {
        asset-> {
          url
        }
      }
    }
  `);
  
  console.log(`Found ${products.length} Liberty products\n`);
  
  for (const product of products) {
    console.log(`${product.name} (${product.slug?.current})`);
    console.log(`  Image: ${product.image?.asset?.url ? '✓ HAS' : '✗ MISSING'}`);
    
    // Delete products with slugs ending in "-outdoor" (duplicates without images)
    if (product.slug?.current?.endsWith('-outdoor') && !product.image?.asset?.url) {
      console.log(`  ✗ Deleting duplicate: ${product._id}`);
      try {
        await client.delete(product._id);
        console.log(`  ✅ Deleted successfully\n`);
      } catch (error) {
        console.error(`  ❌ Error:`, error.message, '\n');
      }
    } else {
      console.log(`  ✓ Keeping this product\n`);
    }
  }
  
  console.log('✅ Liberty products cleanup complete!');
}

fixLibertyProducts().catch(console.error);
