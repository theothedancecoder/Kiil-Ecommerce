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

async function checkBM71() {
  console.log('=== Checking BM71 Library Table in Sanity ===\n');

  const product = await client.fetch(`
    *[_type == "product" && slug.current == "bm71-library-table"][0] {
      _id,
      name,
      slug,
      brand,
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
    console.log('❌ Product NOT found in Sanity');
    console.log('   This product may only exist in legacy data');
    return;
  }

  console.log(`📦 ${product.name}`);
  console.log(`   Brand: ${product.brand}`);
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

checkBM71();
