#!/usr/bin/env node

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

async function addRelatedProducts() {
  console.log('🔧 Adding related products to RO Collection products...\n');

  // Get all RO Collection products
  const products = await client.fetch(`
    *[_type == "product" && "ro-collection" in categories[]->slug.current] {
      _id,
      name,
      slug {
        current
      }
    }
  `);

  console.log(`📦 Found ${products.length} RO Collection products`);

  // Define related products relationships
  const relatedProductsMap = {
    'salon-dining-chair': [
      'salon-dining-table-round-120',
      'salon-dining-table-rectangular-extension'
    ],
    'salon-dining-table-round-120': [
      'salon-dining-chair',
      'salon-dining-table-round-120-extension',
      'extension-leaf-round-120'
    ],
    'salon-dining-table-round-120-extension': [
      'salon-dining-chair',
      'salon-dining-table-round-120',
      'extension-leaf-round-120'
    ],
    'salon-dining-table-extension-round-120': [
      'salon-dining-chair',
      'salon-dining-table-round-120',
      'extension-leaf-round-120'
    ],
    'salon-dining-table-rectangular-extension': [
      'salon-dining-chair',
      'extension-plate-rectangular'
    ],
    'extension-leaf-round-120': [
      'salon-dining-table-round-120',
      'salon-dining-table-round-120-extension'
    ],
    'extension-plate-rectangular': [
      'salon-dining-table-rectangular-extension'
    ]
  };

  // Create a map of slug to product ID
  const slugToIdMap = {};
  products.forEach(product => {
    if (product.slug?.current) {
      slugToIdMap[product.slug.current] = product._id;
    }
  });

  console.log('\n📋 Slug to ID mapping:');
  Object.entries(slugToIdMap).forEach(([slug, id]) => {
    console.log(`  ${slug} -> ${id}`);
  });

  // Update each product with related products
  for (const product of products) {
    const productSlug = product.slug?.current;
    if (!productSlug || !relatedProductsMap[productSlug]) {
      console.log(`\n⚠️  No related products defined for: ${product.name} (${productSlug})`);
      continue;
    }

    const relatedSlugs = relatedProductsMap[productSlug];
    const relatedProductRefs = relatedSlugs
      .map(slug => slugToIdMap[slug])
      .filter(id => id) // Remove any undefined IDs
      .map(id => ({ _type: 'reference', _ref: id }));

    if (relatedProductRefs.length === 0) {
      console.log(`\n⚠️  No valid related product IDs found for: ${product.name}`);
      continue;
    }

    console.log(`\n📦 Updating: ${product.name}`);
    console.log(`   Related products: ${relatedSlugs.join(', ')}`);
    console.log(`   Related IDs: ${relatedProductRefs.map(ref => ref._ref).join(', ')}`);

    try {
      await client
        .patch(product._id)
        .set({
          relatedProducts: relatedProductRefs
        })
        .commit();

      console.log(`✅ Added ${relatedProductRefs.length} related products to ${product.name}`);
    } catch (error) {
      console.error(`❌ Failed to update ${product.name}:`, error);
    }
  }

  console.log('\n🎉 Related products setup completed!');
  console.log('\n💡 Related products should now appear on individual product pages');
}

// Run the script
addRelatedProducts().catch(console.error);
