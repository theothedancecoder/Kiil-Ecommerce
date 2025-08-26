require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
});

async function removeFritzHansenDuplicates() {
  try {
    console.log('🔍 Identifying Fritz Hansen duplicates to remove...');
    
    // These are the duplicate products without slugs that should be removed
    const duplicateIds = [
      'drachmann-chair',
      'drachmann-dining-table', 
      'england-bench',
      'fionia-stool',
      'regatta-lounge-bench',
      'regatta-lounge-stool',
      'skagen-bench',
      'skagen-table'
    ];

    console.log(`\n🗑️  Will remove ${duplicateIds.length} duplicate products:`);
    duplicateIds.forEach((id, index) => {
      console.log(`${index + 1}. ${id}`);
    });

    // Confirm these are the products without slugs
    const productsToDelete = await client.fetch(`
      *[_type == "product" && brand == "Fritz Hansen" && _id in $ids] {
        _id,
        name,
        slug,
        _createdAt
      }
    `, { ids: duplicateIds });

    console.log('\n📋 Products to be deleted:');
    productsToDelete.forEach((product, index) => {
      console.log(`${index + 1}. "${product.name}" - ${product.slug?.current || 'NO SLUG'} (${product._id})`);
      console.log(`   Created: ${new Date(product._createdAt).toLocaleDateString()}`);
    });

    // Verify all products to delete have no slug
    const hasSlug = productsToDelete.some(p => p.slug?.current);
    if (hasSlug) {
      console.log('\n❌ ERROR: Some products to delete have slugs! Aborting to prevent data loss.');
      return;
    }

    console.log('\n⚠️  This will permanently delete these duplicate products.');
    console.log('The products with proper slugs will remain.');
    
    // Delete the duplicate products
    console.log('\n🗑️  Deleting duplicate products...');
    
    for (const id of duplicateIds) {
      try {
        await client.delete(id);
        console.log(`✅ Deleted: ${id}`);
      } catch (error) {
        console.error(`❌ Failed to delete ${id}:`, error.message);
      }
    }

    console.log('\n🎉 Cleanup complete! Verifying results...');
    
    // Verify cleanup
    const remainingProducts = await client.fetch(`
      *[_type == "product" && brand == "Fritz Hansen"] {
        _id,
        name,
        slug
      } | order(name asc)
    `);

    console.log(`\n📊 Remaining Fritz Hansen products: ${remainingProducts.length}`);
    
    // Check for any remaining duplicates
    const productsByName = {};
    remainingProducts.forEach(product => {
      if (!productsByName[product.name]) {
        productsByName[product.name] = [];
      }
      productsByName[product.name].push(product);
    });

    const remainingDuplicates = Object.entries(productsByName).filter(([name, products]) => products.length > 1);
    
    if (remainingDuplicates.length === 0) {
      console.log('✅ No duplicate products remaining!');
    } else {
      console.log(`⚠️  Still ${remainingDuplicates.length} products with duplicates:`);
      remainingDuplicates.forEach(([name, products]) => {
        console.log(`- "${name}" (${products.length} copies)`);
      });
    }

  } catch (error) {
    console.error('❌ Error removing Fritz Hansen duplicates:', error);
  }
}

removeFritzHansenDuplicates();
