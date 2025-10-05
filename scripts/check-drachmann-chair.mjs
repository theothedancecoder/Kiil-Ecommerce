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

async function checkDrachmannChair() {
  console.log('=== Checking Drachmann Chair in Sanity ===\n');

  const product = await client.fetch(`
    *[_type == "product" && slug.current == "drachmann-chair"][0] {
      _id,
      name,
      slug,
      image {
        asset-> {
          _id,
          url
        }
      },
      variants[] {
        name,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    }
  `);

  if (!product) {
    console.log('❌ Product not found in Sanity');
    return;
  }

  console.log(`📦 ${product.name}`);
  console.log(`   Slug: ${product.slug?.current}`);
  console.log(`   Main Image: ${product.image?.asset?.url || 'MISSING'}`);
  console.log(`   Variants: ${product.variants?.length || 0}`);
  
  if (product.variants && product.variants.length > 0) {
    product.variants.forEach((variant, i) => {
      console.log(`     ${i + 1}. ${variant.name}: ${variant.image?.asset?.url || 'NO IMAGE'}`);
    });
  }

  console.log('\n=== Check Complete ===');
}

checkDrachmannChair();
