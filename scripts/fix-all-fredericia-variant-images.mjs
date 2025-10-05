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

async function fixAllFredericiaVariantImages() {
  console.log('=== Fixing All Fredericia Variant Images ===\n');

  const products = await client.fetch(`
    *[_type == "product" && brand == "Fredericia"] {
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
        _key,
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

  console.log(`Found ${products.length} Fredericia products\n`);

  let fixedCount = 0;

  for (const product of products) {
    const hasMainImage = product.image?.asset?._id;
    const hasVariantsWithoutImages = product.variants?.some(v => !v.image?.asset?.url);

    if (hasMainImage && hasVariantsWithoutImages) {
      console.log(`📦 ${product.name}`);
      console.log(`   Main Image: ${product.image.asset.url}`);
      
      // Update variants to use main image if they don't have one
      const updatedVariants = product.variants.map(variant => {
        if (!variant.image?.asset?.url) {
          console.log(`   ✅ Adding image to variant: ${variant.name}`);
          return {
            ...variant,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: product.image.asset._id,
              },
            },
          };
        }
        return variant;
      });

      await client
        .patch(product._id)
        .set({ variants: updatedVariants })
        .commit();

      fixedCount++;
      console.log('');
    }
  }

  console.log(`\n=== Fix Complete ===`);
  console.log(`Fixed ${fixedCount} products with missing variant images`);
}

fixAllFredericiaVariantImages();
