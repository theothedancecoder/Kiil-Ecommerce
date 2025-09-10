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

async function fix404ProductSlug() {
  console.log('🔧 Fixing 404 product slug issue...\n');

  // First, let's see what products we have and their slugs
  const allProducts = await client.fetch(`
    *[_type == "product" && "ro-collection" in categories[]->slug.current] {
      _id,
      name,
      slug
    }
  `);

  console.log('📦 Current RO Collection products:');
  allProducts.forEach(product => {
    console.log(`  - ${product.name}: ${product.slug?.current || 'NO SLUG'}`);
  });

  // Look for the problematic product
  const problematicProduct = await client.fetch(`
    *[_type == "product" && slug.current == "salon-dining-table-extension-round-120"][0] {
      _id,
      name,
      slug
    }
  `);

  if (problematicProduct) {
    console.log(`\n✅ Found product: ${problematicProduct.name}`);
    console.log(`   Current slug: ${problematicProduct.slug?.current}`);
  } else {
    console.log('\n❌ Product with slug "salon-dining-table-extension-round-120" not found');
    
    // Let's look for similar products
    const similarProducts = await client.fetch(`
      *[_type == "product" && "ro-collection" in categories[]->slug.current && name match "*extension*"] {
        _id,
        name,
        slug
      }
    `);
    
    console.log('\n🔍 Products with "extension" in name:');
    similarProducts.forEach(product => {
      console.log(`  - ${product.name}: ${product.slug?.current || 'NO SLUG'}`);
    });

    // Check if there's a product that should have this slug
    const targetProduct = similarProducts.find(p => 
      p.name.toLowerCase().includes('salon') && 
      p.name.toLowerCase().includes('extension') && 
      p.name.toLowerCase().includes('120') &&
      p.name.toLowerCase().includes('collection')
    );

    if (targetProduct) {
      console.log(`\n🎯 Found target product: ${targetProduct.name}`);
      console.log(`   Current slug: ${targetProduct.slug?.current}`);
      
      // Update the slug to match the expected URL
      console.log('\n📝 Updating slug to match expected URL...');
      
      await client
        .patch(targetProduct._id)
        .set({
          slug: {
            _type: 'slug',
            current: 'salon-dining-table-extension-round-120'
          }
        })
        .commit();

      console.log('✅ Updated slug successfully!');
      console.log(`   New slug: salon-dining-table-extension-round-120`);
    } else {
      console.log('\n❌ Could not find a suitable product to update');
    }
  }

  console.log('\n🎉 Slug fix completed!');
}

// Run the script
fix404ProductSlug().catch(console.error);
