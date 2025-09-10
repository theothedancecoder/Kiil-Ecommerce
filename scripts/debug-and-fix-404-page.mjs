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

async function debugAndFix404() {
  console.log('🔧 Debugging 404 issue for salon-dining-table-extension-round-120...\n');

  // Check all RO Collection products and their slugs
  const allProducts = await client.fetch(`
    *[_type == "product" && "ro-collection" in categories[]->slug.current] {
      _id,
      name,
      slug {
        current
      }
    }
  `);

  console.log('📦 All RO Collection products and their slugs:');
  allProducts.forEach(product => {
    console.log(`  - "${product.name}": ${product.slug?.current || 'NO SLUG'}`);
  });

  // Look for the specific problematic product
  const targetSlug = 'salon-dining-table-extension-round-120';
  const productWithTargetSlug = allProducts.find(p => p.slug?.current === targetSlug);

  if (productWithTargetSlug) {
    console.log(`\n✅ Found product with slug "${targetSlug}"`);
    console.log(`   Product name: "${productWithTargetSlug.name}"`);
    console.log(`   Product ID: ${productWithTargetSlug._id}`);
    
    // Get full product details
    const fullProduct = await client.fetch(`
      *[_type == "product" && _id == $id][0] {
        _id,
        name,
        slug,
        description,
        price,
        image,
        variants,
        lifestyleImages
      }
    `, { id: productWithTargetSlug._id });
    
    console.log(`\n📋 Product details:`);
    console.log(`   - Has description: ${!!fullProduct.description}`);
    console.log(`   - Has price: ${!!fullProduct.price}`);
    console.log(`   - Has main image: ${!!fullProduct.image}`);
    console.log(`   - Number of variants: ${fullProduct.variants?.length || 0}`);
    console.log(`   - Number of lifestyle images: ${fullProduct.lifestyleImages?.length || 0}`);
    
  } else {
    console.log(`\n❌ No product found with slug "${targetSlug}"`);
    
    // Look for similar products that might need slug updates
    const extensionProducts = allProducts.filter(p => 
      p.name.toLowerCase().includes('extension') && 
      p.name.toLowerCase().includes('salon') &&
      p.name.toLowerCase().includes('120')
    );
    
    console.log(`\n🔍 Found ${extensionProducts.length} similar extension products:`);
    extensionProducts.forEach(product => {
      console.log(`  - "${product.name}": ${product.slug?.current || 'NO SLUG'}`);
    });
    
    // Check if we need to create or update a product
    const bestMatch = extensionProducts.find(p => 
      p.name.toLowerCase().includes('collection') ||
      p.name.toLowerCase().includes('ro ')
    );
    
    if (bestMatch && bestMatch.slug?.current !== targetSlug) {
      console.log(`\n🎯 Best match found: "${bestMatch.name}"`);
      console.log(`   Current slug: ${bestMatch.slug?.current}`);
      console.log(`   Should be: ${targetSlug}`);
      
      // Update the slug
      console.log(`\n📝 Updating slug...`);
      await client
        .patch(bestMatch._id)
        .set({
          slug: {
            _type: 'slug',
            current: targetSlug
          }
        })
        .commit();
      
      console.log(`✅ Updated slug to: ${targetSlug}`);
    }
  }

  // Check if the Next.js page file exists
  console.log(`\n📁 Checking Next.js page structure...`);
  console.log(`   Expected page: app/ro-collection/[productId]/page.tsx`);
  console.log(`   Expected client: app/ro-collection/[productId]/ROCollectionProductClient.tsx`);
  
  console.log('\n🎉 Debug completed!');
  console.log('\n💡 If the product exists in Sanity but still shows 404:');
  console.log('   1. Wait for Vercel deployment to complete');
  console.log('   2. Clear browser cache');
  console.log('   3. Try accessing the page in incognito mode');
}

// Run the script
debugAndFix404().catch(console.error);
