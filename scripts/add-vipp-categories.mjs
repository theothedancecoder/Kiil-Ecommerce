import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function addVippCategories() {
  try {
    console.log('🔍 Checking Vipp products...\n');

    // Get Vipp products
    const products = await client.fetch(
      `*[_type == "product" && brand match "Vipp*"] {
        _id,
        name,
        brand,
        slug,
        categories
      }`
    );

    console.log(`Found ${products.length} Vipp products:\n`);
    products.forEach(p => {
      console.log(`  - ${p.name}`);
      console.log(`    Categories: ${p.categories?.length || 0}`);
    });

    // Get or create Storage category
    let storageCategory = await client.fetch(
      `*[_type == "category" && title == "Storage"][0]`
    );

    if (!storageCategory) {
      console.log('\n📁 Creating Storage category...');
      storageCategory = await client.create({
        _type: 'category',
        title: 'Storage',
        slug: {
          _type: 'slug',
          current: 'storage'
        },
        description: 'Storage products'
      });
      console.log(`✅ Created Storage category: ${storageCategory._id}\n`);
    } else {
      console.log(`\n✅ Storage category exists: ${storageCategory._id}\n`);
    }

    // Add category to products that don't have it
    let updated = 0;
    for (const product of products) {
      if (!product.categories || product.categories.length === 0) {
        await client
          .patch(product._id)
          .set({
            categories: [
              {
                _type: 'reference',
                _ref: storageCategory._id,
                _key: `category-${Date.now()}-${Math.random()}`
              }
            ]
          })
          .commit();

        console.log(`✅ Added Storage category to: ${product.name}`);
        updated++;
      } else {
        console.log(`⏭️  ${product.name} already has categories`);
      }
    }

    console.log(`\n✅ Updated ${updated} Vipp products with Storage category\n`);
    console.log('Vipp products should now appear on the møbler page!\n');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

addVippCategories()
  .then(() => {
    console.log('✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
