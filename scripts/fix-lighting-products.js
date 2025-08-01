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

async function fixLightingProducts() {
  try {
    console.log('Fixing lighting products in Sanity...\n');

    // Get the lighting category
    const lightingCategory = await client.fetch(`*[_type == "category" && slug.current == "lighting"][0]`);
    if (!lightingCategory) {
      console.error('❌ Lighting category not found');
      return;
    }
    console.log('✅ Found lighting category:', lightingCategory._id);

    // Get the "Lamps" product
    const lampsProduct = await client.fetch(`*[_type == "product" && name == "Lamps"][0]`);
    if (!lampsProduct) {
      console.error('❌ Lamps product not found');
      return;
    }
    console.log('✅ Found Lamps product:', lampsProduct._id);

    // Update the Lamps product to have proper brand and lighting category
    const existingCategoryRefs = lampsProduct.categories?.map(cat => ({ _ref: cat._id, _type: 'reference' })) || [];
    const hasLightingCategory = existingCategoryRefs.some(ref => ref._ref === lightingCategory._id);
    
    let updatedCategories = existingCategoryRefs;
    if (!hasLightingCategory) {
      updatedCategories = [
        ...existingCategoryRefs,
        { _ref: lightingCategory._id, _type: 'reference' }
      ];
    }

    await client
      .patch(lampsProduct._id)
      .set({ 
        brand: 'Louis Poulsen',
        categories: updatedCategories,
        name: 'Louis Poulsen Lighting Collection',
        description: 'Discover our collection of Louis Poulsen designer lighting including the iconic PH series, Panthella lamps, and more.'
      })
      .commit();

    console.log('✅ Updated Lamps product with Louis Poulsen brand and lighting category');

    // Create some sample FLOS and Louis Poulsen products
    const sampleProducts = [
      {
        _type: 'product',
        name: 'PH 5 Pendant',
        slug: { _type: 'slug', current: 'ph-5-pendant' },
        brand: 'Louis Poulsen',
        description: 'Poul Henningsen\'s iconic three-shade system pendant light',
        price: 4500,
        categories: [{ _ref: lightingCategory._id, _type: 'reference' }],
        stock: 5,
        inStock: true
      },
      {
        _type: 'product',
        name: 'Panthella Table Lamp',
        slug: { _type: 'slug', current: 'panthella-table-lamp' },
        brand: 'Louis Poulsen',
        description: 'Verner Panton\'s sculptural table lamp design',
        price: 3200,
        categories: [{ _ref: lightingCategory._id, _type: 'reference' }],
        stock: 3,
        inStock: true
      },
      {
        _type: 'product',
        name: '2097/30 Chandelier',
        slug: { _type: 'slug', current: '2097-30-chandelier' },
        brand: 'FLOS',
        description: 'Gino Sarfatti\'s iconic chandelier with 30 bulbs',
        price: 28050,
        categories: [{ _ref: lightingCategory._id, _type: 'reference' }],
        stock: 2,
        inStock: true
      },
      {
        _type: 'product',
        name: '2097/50 Chandelier',
        slug: { _type: 'slug', current: '2097-50-chandelier' },
        brand: 'FLOS',
        description: 'Gino Sarfatti\'s grand chandelier with 50 bulbs',
        price: 89999,
        categories: [{ _ref: lightingCategory._id, _type: 'reference' }],
        stock: 1,
        inStock: true
      },
      {
        _type: 'product',
        name: 'IC Lights Table T1',
        slug: { _type: 'slug', current: 'ic-lights-table-t1' },
        brand: 'FLOS',
        description: 'Minimalist table lamp with glass sphere',
        price: 5200,
        categories: [{ _ref: lightingCategory._id, _type: 'reference' }],
        stock: 4,
        inStock: true
      },
      {
        _type: 'product',
        name: 'AJ Floor Lamp',
        slug: { _type: 'slug', current: 'aj-floor-lamp' },
        brand: 'Louis Poulsen',
        description: 'Arne Jacobsen\'s timeless floor lamp design',
        price: 6800,
        categories: [{ _ref: lightingCategory._id, _type: 'reference' }],
        stock: 3,
        inStock: true
      }
    ];

    console.log('\n📦 Creating sample lighting products...');
    
    for (const product of sampleProducts) {
      try {
        const created = await client.create(product);
        console.log(`✅ Created: ${product.name} (${product.brand})`);
      } catch (error) {
        console.error(`❌ Error creating ${product.name}:`, error.message);
      }
    }

    // Verify the results
    console.log('\n🔍 Verifying lighting products...');
    const lightingProducts = await client.fetch(`
      *[_type == "product" && "lighting" in categories[]->slug.current] {
        name,
        brand,
        price
      }
    `);
    
    console.log(`\n📊 Found ${lightingProducts.length} products with lighting category:`);
    lightingProducts.forEach(product => {
      console.log(`  - ${product.name} (${product.brand}) - ${product.price} kr`);
    });

  } catch (error) {
    console.error('Error fixing lighting products:', error);
  }
}

fixLightingProducts();
