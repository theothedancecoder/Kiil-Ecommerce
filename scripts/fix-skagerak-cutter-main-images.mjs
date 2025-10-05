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

async function fixSkagerakCutterImages() {
  console.log('=== Fixing Skagerak Cutter Main Images ===\n');

  const products = [
    'skagerak-cutter-mini-wardrobe',
    'skagerak-cutter-box',
    'skagerak-cutter-box-low',
    'skagerak-cutter-wardrobe',
  ];

  for (const slug of products) {
    console.log(`\n📦 Checking: ${slug}`);
    
    // Get the product
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        image,
        variants[] {
          name,
          image {
            asset-> {
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
    
    // Check if main image exists
    if (product.image?.asset?._ref) {
      console.log(`   ✅ Main image already set`);
      continue;
    }

    // Use first variant image as main image
    if (product.variants && product.variants.length > 0 && product.variants[0].image?.asset) {
      const firstVariantImageRef = product.variants[0].image.asset._ref;
      
      console.log(`   📤 Setting first variant image as main image`);
      
      await client
        .patch(product._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: firstVariantImageRef,
            },
          },
        })
        .commit();

      console.log(`   ✅ Updated ${product.name} with main image`);
    } else {
      console.log(`   ⚠️  No variant images available`);
    }
  }

  console.log('\n=== Fix Complete ===');
}

fixSkagerakCutterImages();
