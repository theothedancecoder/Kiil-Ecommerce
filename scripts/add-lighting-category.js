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

// Check environment variables
function checkEnvironment() {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN'
  ];
  
  const missing = required.filter(env => !process.env[env]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(env => console.error(`  - ${env}`));
    console.error('\nPlease set these in your .env.local file');
    process.exit(1);
  }
}

async function addLightingCategory() {
  try {
    console.log('Starting to add lighting category to FLOS and Louis Poulsen products...');

    // First, create or get the lighting category
    let lightingCategory;
    try {
      // Try to find existing lighting category
      const existingCategory = await client.fetch(`*[_type == "category" && slug.current == "lighting"][0]`);
      
      if (existingCategory) {
        lightingCategory = existingCategory;
        console.log('Found existing lighting category:', lightingCategory._id);
      } else {
        // Create new lighting category
        lightingCategory = await client.create({
          _type: 'category',
          title: 'Lighting',
          slug: {
            _type: 'slug',
            current: 'lighting'
          },
          description: 'Designer lighting products including chandeliers, table lamps, floor lamps, and pendant lights'
        });
        console.log('Created new lighting category:', lightingCategory._id);
      }
    } catch (error) {
      console.error('Error with lighting category:', error);
      return;
    }

    // Get all FLOS and Louis Poulsen products
    const products = await client.fetch(`
      *[_type == "product" && (brand == "FLOS" || brand == "Louis Poulsen")] {
        _id,
        name,
        brand,
        categories[]-> {
          _id,
          title,
          slug
        }
      }
    `);

    console.log(`Found ${products.length} FLOS and Louis Poulsen products`);

    let updatedCount = 0;

    for (const product of products) {
      try {
        // Check if product already has lighting category
        const hasLightingCategory = product.categories?.some(cat => cat.slug.current === 'lighting');
        
        if (!hasLightingCategory) {
          // Add lighting category to existing categories
          const existingCategoryRefs = product.categories?.map(cat => ({ _ref: cat._id, _type: 'reference' })) || [];
          const updatedCategories = [
            ...existingCategoryRefs,
            { _ref: lightingCategory._id, _type: 'reference' }
          ];

          await client
            .patch(product._id)
            .set({ categories: updatedCategories })
            .commit();

          console.log(`✅ Added lighting category to: ${product.name} (${product.brand})`);
          updatedCount++;
        } else {
          console.log(`⏭️  Already has lighting category: ${product.name} (${product.brand})`);
        }
      } catch (error) {
        console.error(`❌ Error updating ${product.name}:`, error);
      }
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} products with lighting category!`);
    
    // Verify the results
    const verifyProducts = await client.fetch(`
      *[_type == "product" && "lighting" in categories[]->slug.current] {
        name,
        brand
      }
    `);
    
    console.log(`\n📊 Verification: ${verifyProducts.length} products now have lighting category:`);
    verifyProducts.forEach(product => {
      console.log(`  - ${product.name} (${product.brand})`);
    });

  } catch (error) {
    console.error('Error in addLightingCategory:', error);
  }
}

// Check environment variables and run the script
checkEnvironment();
addLightingCategory();
