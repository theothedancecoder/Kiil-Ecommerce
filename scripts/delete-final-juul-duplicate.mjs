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

async function deleteFinalDuplicate() {
  console.log('🗑️  Deleting final Juul duplicate...\n');

  try {
    // Get the problematic product
    const product = await client.fetch(`
      *[_type == "product" && brand == "Juul" && name == "301 Sofa L-240"][0] {
        _id,
        name,
        slug,
        variants
      }
    `);

    if (product) {
      console.log(`Found: ${product.name} (${product.slug?.current})`);
      console.log(`Variants: ${product.variants?.length || 0}`);
      console.log(`\n🗑️  Deleting...`);
      
      await client.delete(product._id);
      console.log(`✓ Deleted\n`);
    } else {
      console.log('Product not found or already deleted\n');
    }

    // Show final remaining products
    const remaining = await client.fetch(`
      *[_type == "product" && brand == "Juul"] {
        _id,
        name,
        slug,
        image {
          asset->
        },
        variants[] {
          name,
          image {
            asset->
          }
        }
      } | order(name asc)
    `);

    console.log('='.repeat(50));
    console.log(`✅ Final Juul products (${remaining.length}):\n`);
    remaining.forEach((p, i) => {
      const hasImage = p.image?.asset ? '✓' : '✗';
      const variantCount = p.variants?.length || 0;
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   Slug: ${p.slug?.current}`);
      console.log(`   Main Image: ${hasImage}`);
      console.log(`   Variants: ${variantCount}`);
      if (p.variants && p.variants.length > 0) {
        p.variants.forEach((v, vi) => {
          const vHasImage = v.image?.asset ? '✓' : '✗';
          console.log(`      ${vi + 1}. ${v.name} - Image: ${vHasImage}`);
        });
      }
      console.log('');
    });
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

deleteFinalDuplicate();
