#!/usr/bin/env node

/**
 * Test script to verify FLOS products are loading correctly from Sanity
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Query to get all FLOS products
const FLOS_PRODUCTS_QUERY = `
  *[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id)] | order(name asc) {
    _id,
    name,
    description,
    price,
    image,
    categories[]->{
      _id,
      title,
      slug
    },
    brand,
    designer,
    href,
    variants,
    inStock,
    featured
  }
`;

// Query to get FLOS categories
const FLOS_CATEGORIES_QUERY = `
  *[_type == "category" && (title == "FLOS" || title == "Lighting")] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

async function testFlosProducts() {
  try {
    console.log('🧪 Testing FLOS products from Sanity...\n');

    // Test FLOS products
    console.log('📦 Fetching FLOS products...');
    const products = await client.fetch(FLOS_PRODUCTS_QUERY);
    
    console.log(`✅ Found ${products.length} FLOS products`);
    
    if (products.length > 0) {
      console.log('\n📋 Sample products:');
      products.slice(0, 3).forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - kr ${product.price?.toLocaleString() || 'N/A'}`);
        console.log(`   ID: ${product._id}`);
        console.log(`   Categories: ${product.categories?.map(cat => cat.title).join(', ') || 'None'}`);
        console.log(`   Designer: ${product.designer || 'N/A'}`);
        console.log(`   Has image: ${product.image?.asset ? 'Yes' : 'No'}`);
        console.log(`   Variants: ${product.variants?.length || 0}`);
        console.log('');
      });
    }

    // Test FLOS categories
    console.log('📁 Fetching FLOS categories...');
    const categories = await client.fetch(FLOS_CATEGORIES_QUERY);
    
    console.log(`✅ Found ${categories.length} categories`);
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.title} (${category.slug?.current || 'no-slug'})`);
    });

    console.log('\n🎉 FLOS products test completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('1. Visit /flos to see the products in action');
    console.log('2. Verify images are loading correctly');
    console.log('3. Test filtering and pagination');

    // Test specific product details
    if (products.length > 0) {
      console.log('\n🔍 Testing product details...');
      const firstProduct = products[0];
      console.log(`Testing product: ${firstProduct.name}`);
      console.log(`- Has description: ${firstProduct.description ? 'Yes' : 'No'}`);
      console.log(`- Price: ${firstProduct.price || 'Not set'}`);
      console.log(`- Brand: ${firstProduct.brand || 'Not set'}`);
      console.log(`- Designer: ${firstProduct.designer || 'Not set'}`);
      console.log(`- In stock: ${firstProduct.inStock ? 'Yes' : 'No'}`);
      console.log(`- Featured: ${firstProduct.featured ? 'Yes' : 'No'}`);
      
      if (firstProduct.variants && firstProduct.variants.length > 0) {
        console.log(`- Variants (${firstProduct.variants.length}):`);
        firstProduct.variants.slice(0, 2).forEach((variant, idx) => {
          console.log(`  ${idx + 1}. ${variant.name} - kr ${variant.price?.toLocaleString() || 'N/A'}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the test
testFlosProducts();
