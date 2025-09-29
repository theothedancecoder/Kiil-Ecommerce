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

console.log('🔍 Finding and removing duplicate Louis Poulsen products...\n');

async function findAndRemoveDuplicates() {
  try {
    // Get all Louis Poulsen products
    const products = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen"] | order(name asc) {
        _id,
        name,
        slug,
        _createdAt
      }
    `);

    console.log(`Found ${products.length} Louis Poulsen products total`);

    // Group products by name to find duplicates
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
      return;
    }

    console.log(`\n🔍 Found ${duplicateGroups.length} groups with duplicates:`);
    
    let totalToDelete = 0;
    const productsToDelete = [];

    for (const [name, duplicates] of duplicateGroups) {
      console.log(`\n📦 "${name}" has ${duplicates.length} duplicates:`);
      
      // Sort by creation date to keep the oldest one (first created)
      duplicates.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt));
      
      const keepProduct = duplicates[0];
      const deleteProducts = duplicates.slice(1);
      
      console.log(`  ✅ Keeping: ${keepProduct._id} (created: ${keepProduct._createdAt})`);
      
      deleteProducts.forEach(product => {
        console.log(`  ❌ Will delete: ${product._id} (created: ${product._createdAt})`);
        productsToDelete.push(product._id);
      });
      
      totalToDelete += deleteProducts.length;
    }

    console.log(`\n🗑️  Total products to delete: ${totalToDelete}`);
    
    if (totalToDelete > 0) {
      console.log('\n🔄 Deleting duplicate products...');
      
      // Delete duplicates in batches
      const batchSize = 10;
      for (let i = 0; i < productsToDelete.length; i += batchSize) {
        const batch = productsToDelete.slice(i, i + batchSize);
        
        for (const productId of batch) {
          try {
            await client.delete(productId);
            console.log(`✅ Deleted: ${productId}`);
          } catch (error) {
            console.error(`❌ Failed to delete ${productId}:`, error.message);
          }
        }
        
        // Small delay between batches
        if (i + batchSize < productsToDelete.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    // Verify final count
    const finalProducts = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen"] | order(name asc) {
        _id,
        name
      }
    `);

    console.log(`\n🎉 Cleanup completed!`);
    console.log(`📊 Final count: ${finalProducts.length} unique Louis Poulsen products`);
    
    if (finalProducts.length > 0) {
      console.log('\n📋 Remaining products:');
      finalProducts.forEach((product, index) => {
        console.log(`  ${index + 1}. ${product.name}`);
      });
    }

  } catch (error) {
    console.error('❌ Error during duplicate cleanup:', error);
  }
}

// Run the cleanup
findAndRemoveDuplicates().catch(console.error);
