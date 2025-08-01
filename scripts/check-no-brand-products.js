// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client. Please install @sanity/client:');
    console.error('npm install @sanity/client');
    process.exit(1);
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-06-13',
});

async function checkNoBrandProducts() {
  try {
    console.log('Checking "No Brand" products in Sanity...\n');

    // Get products with no brand or empty brand
    const noBrandProducts = await client.fetch(`
      *[_type == "product" && (brand == null || brand == "" || !defined(brand))] {
        _id,
        name,
        brand,
        categories[]-> {
          title,
          slug
        }
      }
    `);

    console.log(`📊 Products with no brand: ${noBrandProducts.length}\n`);

    if (noBrandProducts.length > 0) {
      console.log('🔍 "No Brand" products:');
      noBrandProducts.forEach((product, index) => {
        const categories = product.categories?.map(cat => cat.title).join(', ') || 'No categories';
        console.log(`  ${index + 1}. ${product.name} (Categories: ${categories})`);
      });
    }

    // Also check products that might have lighting-related names
    console.log('\n💡 Looking for lighting-related product names...');
    const allProducts = await client.fetch(`
      *[_type == "product"] {
        _id,
        name,
        brand,
        categories[]-> {
          title,
          slug
        }
      }
    `);

    const lightingProducts = allProducts.filter(product => {
      const name = product.name.toLowerCase();
      return name.includes('lamp') || 
             name.includes('light') || 
             name.includes('chandelier') || 
             name.includes('pendant') || 
             name.includes('2097') || 
             name.includes('panthella') || 
             name.includes('ph ') ||
             name.includes('artichoke') ||
             name.includes('ic lights') ||
             name.includes('flos') ||
             name.includes('louis') ||
             name.includes('poulsen');
    });

    console.log(`Found ${lightingProducts.length} products with lighting-related names:`);
    lightingProducts.forEach((product, index) => {
      const categories = product.categories?.map(cat => cat.title).join(', ') || 'No categories';
      console.log(`  ${index + 1}. ${product.name} (Brand: ${product.brand || 'No Brand'}, Categories: ${categories})`);
    });

  } catch (error) {
    console.error('Error checking products:', error);
  }
}

checkNoBrandProducts();
