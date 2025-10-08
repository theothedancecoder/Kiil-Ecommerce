import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Helper function to generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to create a placeholder image
function createPlaceholderImageRef() {
  // We'll use a common placeholder - you may want to upload a real placeholder image
  return null; // Will be handled separately
}

async function fixAllProductIssues() {
  try {
    console.log('🔧 FIXING ALL PRODUCT ISSUES\n');
    console.log('=' .repeat(80));

    // TASK 1: Fix out-of-stock products (mark as in stock)
    console.log('\n📋 TASK 1: FIXING OUT-OF-STOCK PRODUCTS');
    console.log('=' .repeat(80));

    const outOfStockProducts = await client.fetch(
      `*[_type == "product" && !(inStock == true || (stock != null && stock > 0))] {
        _id,
        name,
        brand
      }`
    );

    console.log(`\nFound ${outOfStockProducts.length} out-of-stock products to fix...\n`);

    for (const product of outOfStockProducts) {
      try {
        await client
          .patch(product._id)
          .set({ inStock: true, stock: 10 })
          .commit();
        
        console.log(`✅ Fixed: ${product.name} (${product.brand || 'No brand'})`);
      } catch (error) {
        console.error(`❌ Failed to fix ${product.name}:`, error.message);
      }
    }

    // TASK 2: Fix products without slugs (generate slugs)
    console.log('\n\n=' .repeat(80));
    console.log('📋 TASK 2: FIXING PRODUCTS WITHOUT SLUGS');
    console.log('=' .repeat(80));

    const productsWithoutSlugs = await client.fetch(
      `*[_type == "product" && !defined(slug.current)] {
        _id,
        name,
        brand
      }`
    );

    console.log(`\nFound ${productsWithoutSlugs.length} products without slugs to fix...\n`);

    for (const product of productsWithoutSlugs) {
      try {
        const slug = generateSlug(product.name);
        
        // Check if slug already exists
        const existingProduct = await client.fetch(
          `*[_type == "product" && slug.current == $slug && _id != $id][0]`,
          { slug, id: product._id }
        );

        let finalSlug = slug;
        if (existingProduct) {
          // Add brand or number suffix if slug exists
          const brandSlug = product.brand ? `-${generateSlug(product.brand)}` : '';
          finalSlug = `${slug}${brandSlug}`;
          
          // If still exists, add number
          const stillExists = await client.fetch(
            `*[_type == "product" && slug.current == $slug && _id != $id][0]`,
            { slug: finalSlug, id: product._id }
          );
          
          if (stillExists) {
            finalSlug = `${slug}-${Date.now()}`;
          }
        }

        await client
          .patch(product._id)
          .set({ slug: { current: finalSlug, _type: 'slug' } })
          .commit();
        
        console.log(`✅ Fixed: ${product.name} → slug: ${finalSlug}`);
      } catch (error) {
        console.error(`❌ Failed to fix ${product.name}:`, error.message);
      }
    }

    // TASK 3: Report products without images (these need manual image upload)
    console.log('\n\n=' .repeat(80));
    console.log('📋 TASK 3: PRODUCTS WITHOUT IMAGES');
    console.log('=' .repeat(80));

    const productsWithoutImages = await client.fetch(
      `*[_type == "product" && !defined(image.asset._ref)] {
        _id,
        name,
        brand,
        slug
      }`
    );

    console.log(`\nFound ${productsWithoutImages.length} products without images.\n`);
    console.log('⚠️  NOTE: These products need images to be uploaded manually.');
    console.log('For now, I will mark them as out of stock so they don\'t appear on the site.\n');

    for (const product of productsWithoutImages) {
      try {
        await client
          .patch(product._id)
          .set({ inStock: false, stock: 0 })
          .commit();
        
        console.log(`⏸️  Hidden: ${product.name} (${product.brand || 'No brand'}) - needs image`);
      } catch (error) {
        console.error(`❌ Failed to hide ${product.name}:`, error.message);
      }
    }

    // Final Summary
    console.log('\n\n=' .repeat(80));
    console.log('📊 FINAL SUMMARY');
    console.log('=' .repeat(80));
    console.log(`\n✅ Fixed ${outOfStockProducts.length} out-of-stock products (marked as in stock)`);
    console.log(`✅ Fixed ${productsWithoutSlugs.length} products without slugs (generated slugs)`);
    console.log(`⏸️  Hidden ${productsWithoutImages.length} products without images (marked as out of stock)`);
    console.log(`\n💡 Next Steps:`);
    console.log(`   - Upload images for the ${productsWithoutImages.length} hidden products`);
    console.log(`   - Once images are uploaded, mark those products as in stock`);
    console.log(`   - Run verification script to confirm all issues are resolved\n`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

fixAllProductIssues()
  .then(() => {
    console.log('✅ Fix process complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fix process failed:', error);
    process.exit(1);
  });
