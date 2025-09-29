import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

console.log('🔧 Final Louis Poulsen duplicate cleanup...\n');

async function finalDuplicateCleanup() {
  try {
    // Get all Louis Poulsen products with more details
    const products = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen"] | order(name asc) {
        _id,
        name,
        slug,
        _createdAt,
        price,
        image
      }
    `);

    console.log(`Found ${products.length} Louis Poulsen products total`);

    // Group products by name (case-insensitive)
    const productGroups = {};
    products.forEach(product => {
      const key = product.name.toLowerCase().trim();
      if (!productGroups[key]) {
        productGroups[key] = [];
      }
      productGroups[key].push(product);
    });

    // Find duplicates
    const duplicateGroups = Object.entries(productGroups).filter(([name, products]) => products.length > 1);
    
    if (duplicateGroups.length === 0) {
      console.log('✅ No duplicates found!');
      
      // Show final product list
      console.log('\n📋 Final unique products:');
      const uniqueProducts = Object.values(productGroups).map(group => group[0]);
      uniqueProducts.forEach((product, index) => {
        console.log(`  ${index + 1}. ${product.name} (${product._id})`);
      });
      
      return;
    }

    console.log(`\n🔍 Found ${duplicateGroups.length} groups with duplicates:`);
    
    const productsToDelete = [];

    for (const [name, duplicates] of duplicateGroups) {
      console.log(`\n📦 "${name}" has ${duplicates.length} duplicates:`);
      
      // Sort by creation date to keep the oldest one (most stable)
      duplicates.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt));
      
      const keepProduct = duplicates[0];
      const deleteProducts = duplicates.slice(1);
      
      console.log(`  ✅ Keeping: ${keepProduct._id} (${keepProduct.name}) - created: ${keepProduct._createdAt}`);
      
      deleteProducts.forEach(product => {
        console.log(`  ❌ Will delete: ${product._id} (${product.name}) - created: ${product._createdAt}`);
        productsToDelete.push(product._id);
      });
    }

    console.log(`\n🗑️  Total products to delete: ${productsToDelete.length}`);
    
    if (productsToDelete.length > 0) {
      console.log('\n🔄 Deleting duplicate products with retry logic...');
      
      let deletedCount = 0;
      let failedCount = 0;
      
      for (const productId of productsToDelete) {
        let retries = 3;
        let deleted = false;
        
        while (retries > 0 && !deleted) {
          try {
            await client.delete(productId);
            console.log(`✅ Deleted: ${productId}`);
            deletedCount++;
            deleted = true;
          } catch (error) {
            retries--;
            if (retries > 0) {
              console.log(`⚠️  Retry ${4 - retries}/3 for ${productId}: ${error.message}`);
              await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
            } else {
              console.error(`❌ Failed to delete ${productId} after 3 attempts: ${error.message}`);
              failedCount++;
            }
          }
        }
        
        // Small delay between deletions
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      console.log(`\n📊 Deletion summary:`);
      console.log(`✅ Successfully deleted: ${deletedCount} products`);
      console.log(`❌ Failed to delete: ${failedCount} products`);
    }

    // Verify final count
    const finalProducts = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen"] | order(name asc) {
        _id,
        name,
        slug
      }
    `);

    console.log(`\n🎉 Final cleanup completed!`);
    console.log(`📊 Final count: ${finalProducts.length} Louis Poulsen products`);
    
    // Group final products to check for remaining duplicates
    const finalGroups = {};
    finalProducts.forEach(product => {
      const key = product.name.toLowerCase().trim();
      if (!finalGroups[key]) {
        finalGroups[key] = [];
      }
      finalGroups[key].push(product);
    });
    
    const remainingDuplicates = Object.entries(finalGroups).filter(([name, products]) => products.length > 1);
    
    if (remainingDuplicates.length > 0) {
      console.log(`\n⚠️  Still ${remainingDuplicates.length} groups with duplicates:`);
      remainingDuplicates.forEach(([name, products]) => {
        console.log(`  - "${name}": ${products.length} duplicates`);
      });
    } else {
      console.log('\n✅ All duplicates successfully removed!');
    }
    
    console.log('\n📋 Final unique products:');
    const uniqueProducts = Object.values(finalGroups).map(group => group[0]);
    uniqueProducts.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name}`);
    });

  } catch (error) {
    console.error('❌ Error during final cleanup:', error);
  }
}

// Run the final cleanup
finalDuplicateCleanup().catch(console.error);
