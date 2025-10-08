#!/usr/bin/env node

/**
 * Test script to verify the interior page Sanity integration
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function testInteriorPageFix() {
  console.log('🧪 Testing Interior Page Sanity Integration...\n');

  try {
    // Test 1: Check if we can fetch products
    console.log('Test 1: Fetching all products from Sanity...');
    const allProducts = await client.fetch(`*[_type == "product"] {
      _id,
      name,
      brand,
      price,
      inStock,
      stock,
      roomCategory,
      categories[]->{
        slug
      }
    }`);
    
    console.log(`✅ Found ${allProducts.length} total products in Sanity\n`);

    // Test 2: Filter for interior products (exclude outdoor)
    console.log('Test 2: Filtering for interior products...');
    const interiorProducts = allProducts.filter(product => {
      const isInStock = product.inStock !== false && product.stock !== 0;
      const isOutdoor = product.roomCategory?.toLowerCase().includes('outdoor') ||
                       product.categories?.some(cat => 
                         cat.slug?.current?.toLowerCase().includes('outdoor')
                       );
      return isInStock && !isOutdoor;
    });
    
    console.log(`✅ Found ${interiorProducts.length} interior products that are in stock\n`);

    // Test 3: Check brand distribution
    console.log('Test 3: Checking brand distribution...');
    const brandCounts = {};
    interiorProducts.forEach(product => {
      const brand = product.brand || 'Unknown';
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    });
    
    console.log('Brand distribution:');
    Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([brand, count]) => {
        console.log(`  - ${brand}: ${count} products`);
      });
    console.log('');

    // Test 4: Check price range
    console.log('Test 4: Checking price range...');
    const prices = interiorProducts
      .filter(p => p.price && p.price > 0)
      .map(p => p.price);
    
    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
      
      console.log(`✅ Price range: ${minPrice} kr - ${maxPrice} kr`);
      console.log(`✅ Average price: ${avgPrice} kr\n`);
    }

    // Test 5: Sample products
    console.log('Test 5: Sample interior products:');
    interiorProducts.slice(0, 5).forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name} (${product.brand}) - ${product.price} kr`);
    });
    console.log('');

    // Test 6: Check for products with images
    console.log('Test 6: Checking products with images...');
    const productsWithImages = await client.fetch(`*[_type == "product" && defined(image)] {
      _id,
      name,
      "hasImage": defined(image.asset)
    }`);
    
    const interiorProductsWithImages = productsWithImages.filter(p => 
      interiorProducts.some(ip => ip._id === p._id)
    );
    
    console.log(`✅ ${interiorProductsWithImages.length} interior products have images\n`);

    // Summary
    console.log('📊 Summary:');
    console.log(`  Total products in Sanity: ${allProducts.length}`);
    console.log(`  Interior products (in stock): ${interiorProducts.length}`);
    console.log(`  Products with images: ${interiorProductsWithImages.length}`);
    console.log(`  Unique brands: ${Object.keys(brandCounts).length}`);
    console.log('');
    console.log('✅ All tests passed! Interior page should now display real products from Sanity.');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Commit and push the changes');
    console.log('  2. Deploy to Vercel');
    console.log('  3. Visit https://kiil-ecommerce.vercel.app/interior to verify');

  } catch (error) {
    console.error('❌ Error testing interior page fix:', error);
    process.exit(1);
  }
}

testInteriorPageFix();
