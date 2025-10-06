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

async function checkKartellImages() {
  console.log('Checking Kartell products for missing images...\n');
  
  const products = await client.fetch(`
    *[_type == "product" && brand == "Kartell"] | order(name asc) {
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
  
  console.log(`Found ${products.length} Kartell products\n`);
  
  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   Slug: ${product.slug?.current}`);
    console.log(`   Main Image: ${product.image?.asset?.url ? '✓ HAS IMAGE' : '✗ MISSING'}`);
    if (product.image?.asset?.url) {
      console.log(`   URL: ${product.image.asset.url}`);
    }
    console.log(`   Variants: ${product.variants?.length || 0}`);
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((v, i) => {
        console.log(`     ${i + 1}. ${v.name}: ${v.image?.asset?.url ? '✓' : '✗ MISSING'}`);
      });
    }
    console.log('');
  });
}

checkKartellImages().catch(console.error);
