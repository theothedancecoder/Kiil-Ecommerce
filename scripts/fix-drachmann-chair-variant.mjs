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

async function fixDrachmannChairVariant() {
  console.log('=== Fixing Drachmann Chair Variant Image ===\n');

  const product = await client.fetch(`
    *[_type == "product" && slug.current == "drachmann-chair"][0] {
      _id,
      name,
      image {
        asset-> {
          _id,
          url
        }
      },
      variants
    }
  `);

  if (!product) {
    console.log('❌ Product not found');
    return;
  }

  console.log(`📦 ${product.name}`);
  console.log(`   Main Image: ${product.image?.asset?.url}`);
  console.log(`   Main Image Asset ID: ${product.image?.asset?._id}`);

  // Update the variant to use the main product image
  const updatedVariants = product.variants.map(variant => ({
    ...variant,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: product.image.asset._id,
      },
    },
  }));

  await client
    .patch(product._id)
    .set({ variants: updatedVariants })
    .commit();

  console.log(`   ✅ Updated variant with main image`);
  console.log('\n=== Fix Complete ===');
}

fixDrachmannChairVariant();
