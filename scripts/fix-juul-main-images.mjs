import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function fixJuulMainImages() {
  console.log('🔧 Fixing Juul product main images...\n');

  try {
    // Get all Juul products
    const products = await client.fetch(`
      *[_type == "product" && brand == "Juul"] {
        _id,
        name,
        slug,
        image,
        variants[] {
          name,
          image {
            asset-> {
              _id
            }
          }
        }
      }
    `);

    console.log(`Found ${products.length} Juul products\n`);

    let fixed = 0;
    let skipped = 0;

    for (const product of products) {
      // Check if main image is missing
      if (!product.image || !product.image.asset) {
        console.log(`❌ ${product.name}: Missing main image`);
        
        // Try to use first variant's image as main image
        if (product.variants && product.variants.length > 0 && product.variants[0].image?.asset?._id) {
          const firstVariantImageId = product.variants[0].image.asset._id;
          
          console.log(`   → Setting main image from first variant (${product.variants[0].name})`);
          
          await client
            .patch(product._id)
            .set({
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: firstVariantImageId
                }
              }
            })
            .commit();
          
          console.log(`   ✓ Fixed: ${product.name}\n`);
          fixed++;
        } else {
          console.log(`   ⚠️  No variant images available to use\n`);
          skipped++;
        }
      } else {
        console.log(`✓ ${product.name}: Main image OK`);
        skipped++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Summary:');
    console.log(`✓ Fixed: ${fixed} products`);
    console.log(`→ Skipped (already OK or no variants): ${skipped} products`);
    console.log('='.repeat(50));

    if (fixed > 0) {
      console.log('\n✅ Main images have been fixed!');
      console.log('The product listing page should now display all images correctly.');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixJuulMainImages();
