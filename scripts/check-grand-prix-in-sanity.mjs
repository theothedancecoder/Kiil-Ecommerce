import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function checkGrandPrixProducts() {
  console.log('=== Checking Grand Prix Products in Sanity ===\n');

  const products = await client.fetch(`
    *[_type == "product" && name match "Grand Prix*"] {
      _id,
      name,
      slug,
      image {
        asset-> {
          url
        }
      },
      variants[] {
        name,
        image {
          asset-> {
            url
          }
        }
      }
    }
  `);

  for (const product of products) {
    console.log(`\n📦 ${product.name}`);
    console.log(`   Slug: ${product.slug?.current}`);
    console.log(`   Main Image: ${product.image?.asset?.url || 'MISSING'}`);
    console.log(`   Variants: ${product.variants?.length || 0}`);
    
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((variant, i) => {
        console.log(`     ${i + 1}. ${variant.name}: ${variant.image?.asset?.url ? '✅ Has image' : '❌ No image'}`);
      });
    }
  }

  console.log('\n=== Check Complete ===');
}

checkGrandPrixProducts();
