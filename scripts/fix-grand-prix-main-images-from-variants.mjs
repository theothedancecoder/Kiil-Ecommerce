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

async function fixGrandPrixMainImages() {
  console.log('=== Fixing Grand Prix Main Images from Variants ===\n');

  const grandPrixSlugs = [
    'grand-prix-3130-chair',
    'grand-prix-4130-chair',
    'grand-prix-4130-upholstered',
  ];

  for (const slug of grandPrixSlugs) {
    console.log(`\n📦 Processing: ${slug}`);
    
    // Get product with variants
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        image,
        variants[] {
          name,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }`,
      { slug }
    );

    if (!product) {
      console.log(`   ⚠️  Product not found`);
      continue;
    }

    console.log(`   Found: ${product.name}`);

    if (product.image?.asset?._ref) {
      console.log(`   ✅ Already has main image`);
      continue;
    }

    // Get first variant with an image
    const variantWithImage = product.variants?.find(v => v.image?.asset?._id);

    if (!variantWithImage) {
      console.log(`   ⚠️  No variant images available`);
      continue;
    }

    console.log(`   📤 Using variant image: ${variantWithImage.name}`);
    console.log(`   URL: ${variantWithImage.image.asset.url}`);

    // Set the main image to the first variant's image
    await client
      .patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: variantWithImage.image.asset._id,
          },
        },
      })
      .commit();

    console.log(`   ✅ Updated ${product.name} with main image`);
  }

  console.log('\n=== Grand Prix Main Images Fix Complete ===');
}

fixGrandPrixMainImages();
