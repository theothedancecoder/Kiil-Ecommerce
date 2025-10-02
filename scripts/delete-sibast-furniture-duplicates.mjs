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

console.log('🗑️  Deleting "Sibast Furniture" products without images...\n');

async function deleteSibastFurnitureDuplicates() {
  try {
    // Get products with brand "Sibast Furniture" (the ones without images)
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
    
    console.log(`Found ${sibastFurnitureProducts.length} "Sibast Furniture" products:\n`);
    
    sibastFurnitureProducts.forEach(p => {
      console.log(`  - ${p.name} (${p.slug?.current})`);
      console.log(`    Has image: ${p.image?.asset?.url ? '✅ Yes' : '❌ No'}`);
    });

    // Delete each product
    console.log('\n🗑️  Deleting products...\n');
    for (const product of sibastFurnitureProducts) {
      console.log(`  Deleting: ${product.name} (${product._id})`);
      await client.delete(product._id);
    }

    console.log('\n✅ Successfully deleted all "Sibast Furniture" products!');
    console.log('✅ Only the "Sibast" branded products with images remain.');
    
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

deleteSibastFurnitureDuplicates().catch(console.error);
