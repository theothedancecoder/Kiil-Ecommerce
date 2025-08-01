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

async function checkSanityProducts() {
  try {
    console.log('Checking products in Sanity...\n');

    // Get all products
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

    console.log(`📊 Total products in Sanity: ${allProducts.length}\n`);

    if (allProducts.length === 0) {
      console.log('❌ No products found in Sanity. You may need to run the migration script first.');
      return;
    }

    // Group by brand
    const brandGroups = {};
    allProducts.forEach(product => {
      const brand = product.brand || 'No Brand';
      if (!brandGroups[brand]) {
        brandGroups[brand] = [];
      }
      brandGroups[brand].push(product);
    });

    console.log('🏷️  Products by Brand:');
    Object.keys(brandGroups).sort().forEach(brand => {
      console.log(`  ${brand}: ${brandGroups[brand].length} products`);
    });

    // Check for lighting-related brands
    console.log('\n💡 Looking for lighting brands...');
    const lightingBrands = Object.keys(brandGroups).filter(brand => 
      brand.toLowerCase().includes('flos') || 
      brand.toLowerCase().includes('louis') || 
      brand.toLowerCase().includes('poulsen')
    );

    if (lightingBrands.length > 0) {
      console.log('Found lighting brands:');
      lightingBrands.forEach(brand => {
        console.log(`  - ${brand}: ${brandGroups[brand].length} products`);
        brandGroups[brand].slice(0, 3).forEach(product => {
          console.log(`    • ${product.name}`);
        });
        if (brandGroups[brand].length > 3) {
          console.log(`    ... and ${brandGroups[brand].length - 3} more`);
        }
      });
    } else {
      console.log('❌ No FLOS or Louis Poulsen products found');
      console.log('\n🔍 All brands found:');
      Object.keys(brandGroups).forEach(brand => {
        console.log(`  - ${brand}`);
      });
    }

    // Check categories
    console.log('\n📂 Checking categories...');
    const categories = await client.fetch(`
      *[_type == "category"] {
        _id,
        title,
        slug
      }
    `);

    console.log(`Total categories: ${categories.length}`);
    categories.forEach(cat => {
      console.log(`  - ${cat.title} (${cat.slug.current})`);
    });

  } catch (error) {
    console.error('Error checking Sanity products:', error);
  }
}

checkSanityProducts();
