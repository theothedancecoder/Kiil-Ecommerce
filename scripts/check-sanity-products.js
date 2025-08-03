#!/usr/bin/env node

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function checkProducts() {
  try {
    console.log('🔍 Checking products in Sanity...\n');
    
    // Check all products
    const allProducts = await client.fetch('*[_type == "product"] | order(_createdAt desc) [0...10] { _id, name, brand, price }');
    console.log(`📦 Total products found: ${allProducts.length}`);
    
    if (allProducts.length > 0) {
      console.log('\n📋 Sample products:');
      allProducts.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} (${product.brand}) - ${product.price} kr`);
      });
    }
    
    // Check specifically for UMAGE products
    const umageProducts = await client.fetch('*[_type == "product" && brand == "UMAGE"] { _id, name, brand, price }');
    console.log(`\n🎯 UMAGE products found: ${umageProducts.length}`);
    
    if (umageProducts.length > 0) {
      console.log('\n✅ UMAGE products in Sanity:');
      umageProducts.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - ${product.price} kr`);
      });
    } else {
      console.log('\n⚠️  No UMAGE products found in Sanity CMS');
      console.log('This explains why the UMAGE page shows "No UMAGE products found"');
    }
    
    // Check categories
    const categories = await client.fetch('*[_type == "category"] { _id, title }');
    console.log(`\n📂 Categories found: ${categories.length}`);
    if (categories.length > 0) {
      categories.forEach((cat, index) => {
        console.log(`${index + 1}. ${cat.title}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking Sanity products:', error.message);
  }
}

checkProducts();
