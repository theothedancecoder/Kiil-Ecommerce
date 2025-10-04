import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hi84i3u4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function deleteDuplicates() {
  console.log('🔍 Checking for Soren Lund products...\n');

  // Get all Soren Lund products
  const products = await client.fetch(`
    *[_type == "product" && brand == "Soren Lund"] {
      _id,
      name,
      slug,
      image {
        asset-> {
          _id,
          url
        }
      }
    }
  `);

  console.log(`Found ${products.length} Soren Lund products:\n`);

  // Separate products with and without images
  const productsWithImages = [];
  const productsWithoutImages = [];

  products.forEach(product => {
    console.log(`📦 ${product.name}`);
    console.log(`   ID: ${product._id}`);
    console.log(`   Slug: ${product.slug?.current || 'N/A'}`);
    console.log(`   Image: ${product.image?.asset?.url ? '✅ Has image' : '❌ No image'}`);
    console.log('');

    if (product.image?.asset?.url) {
      productsWithImages.push(product);
    } else {
      productsWithoutImages.push(product);
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Products with images: ${productsWithImages.length}`);
  console.log(`   Products without images: ${productsWithoutImages.length}`);

  if (productsWithoutImages.length === 0) {
    console.log('\n✅ No duplicates to delete!');
    return;
  }

  console.log(`\n🗑️  Deleting ${productsWithoutImages.length} products without images...\n`);

  for (const product of productsWithoutImages) {
    try {
      await client.delete(product._id);
      console.log(`✅ Deleted: ${product.name} (${product._id})`);
    } catch (error) {
      console.error(`❌ Error deleting ${product.name}:`, error.message);
    }
  }

  console.log('\n✅ Cleanup complete!');
  console.log(`\n📦 Remaining products: ${productsWithImages.length}`);
  productsWithImages.forEach(p => {
    console.log(`   - ${p.name}`);
  });
}

deleteDuplicates().catch(console.error);
