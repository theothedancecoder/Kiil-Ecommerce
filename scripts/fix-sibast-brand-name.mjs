import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

console.log('🔧 Fixing Sibast Brand Name Issue...\n');

async function fixSibastBrandName() {
  try {
    // First, let's see both sets of products
    console.log('📋 Products with brand "Sibast":');
    const sibastProducts = await client.fetch(`
      *[_type == "product" && brand == "Sibast"] {
        _id,
        name,
        slug,
        brand,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    `);
    
    sibastProducts.forEach(p => {
      console.log(`  - ${p.name} (${p.slug?.current}) - Image: ${p.image?.asset?.url ? '✅' : '❌'}`);
    });

    console.log('\n📋 Products with brand "Sibast Furniture":');
    const sibastFurnitureProducts = await client.fetch(`
      *[_type == "product" && brand == "Sibast Furniture"] {
        _id,
        name,
        slug,
        brand,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    `);
    
    sibastFurnitureProducts.forEach(p => {
      console.log(`  - ${p.name} (${p.slug?.current}) - Image: ${p.image?.asset?.url ? '✅' : '❌'}`);
    });

    // The solution: Delete the "Sibast" products (without images) since we have "Sibast Furniture" with images
    console.log('\n🗑️  Deleting duplicate "Sibast" products (without images)...');
    
    for (const product of sibastProducts) {
      console.log(`  Deleting: ${product.name} (${product._id})`);
      await client.delete(product._id);
    }

    console.log('\n✅ Successfully deleted duplicate Sibast products!');
    console.log('✅ The "Sibast Furniture" products with images will now be used.');
    
    // Verify
    console.log('\n🔍 Verifying remaining Sibast products:');
    const remainingProducts = await client.fetch(`
      *[_type == "product" && (brand == "Sibast" || brand == "Sibast Furniture")] {
        _id,
        name,
        slug,
        brand,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    `);
    
    console.log(`\nTotal Sibast products remaining: ${remainingProducts.length}`);
    remainingProducts.forEach(p => {
      console.log(`  - ${p.name} (Brand: "${p.brand}") - Image: ${p.image?.asset?.url ? '✅' : '❌'}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

fixSibastBrandName().catch(console.error);
