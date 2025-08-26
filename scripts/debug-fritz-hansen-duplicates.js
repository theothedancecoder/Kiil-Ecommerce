require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
});

async function debugFritzHansenDuplicates() {
  try {
    console.log('🔍 Fetching all Fritz Hansen products...');
    
    const products = await client.fetch(`
      *[_type == "product" && brand == "Fritz Hansen"] {
        _id,
        name,
        slug,
        brand,
        _createdAt,
        _updatedAt
      } | order(name asc)
    `);

    console.log(`\n📊 Found ${products.length} Fritz Hansen products total`);
    
    // Group by name to find duplicates
    const productsByName = {};
    products.forEach(product => {
      if (!productsByName[product.name]) {
        productsByName[product.name] = [];
      }
      productsByName[product.name].push(product);
    });

    // Find duplicates
    const duplicates = Object.entries(productsByName).filter(([name, products]) => products.length > 1);
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicate products found by name');
    } else {
      console.log(`\n⚠️  Found ${duplicates.length} products with duplicates:`);
      
      duplicates.forEach(([name, products]) => {
        console.log(`\n📦 "${name}" (${products.length} copies):`);
        products.forEach((product, index) => {
          console.log(`  ${index + 1}. ID: ${product._id}`);
          console.log(`     Slug: ${product.slug?.current || 'No slug'}`);
          console.log(`     Created: ${new Date(product._createdAt).toLocaleDateString()}`);
          console.log(`     Updated: ${new Date(product._updatedAt).toLocaleDateString()}`);
        });
      });
    }

    // Group by slug to find slug duplicates
    const productsBySlug = {};
    products.forEach(product => {
      const slug = product.slug?.current;
      if (slug) {
        if (!productsBySlug[slug]) {
          productsBySlug[slug] = [];
        }
        productsBySlug[slug].push(product);
      }
    });

    const slugDuplicates = Object.entries(productsBySlug).filter(([slug, products]) => products.length > 1);
    
    if (slugDuplicates.length === 0) {
      console.log('\n✅ No duplicate products found by slug');
    } else {
      console.log(`\n⚠️  Found ${slugDuplicates.length} products with duplicate slugs:`);
      
      slugDuplicates.forEach(([slug, products]) => {
        console.log(`\n🔗 Slug "${slug}" (${products.length} copies):`);
        products.forEach((product, index) => {
          console.log(`  ${index + 1}. "${product.name}" - ID: ${product._id}`);
        });
      });
    }

    // List all products for reference
    console.log('\n📋 All Fritz Hansen products:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. "${product.name}" - ${product.slug?.current || 'no-slug'} (${product._id})`);
    });

  } catch (error) {
    console.error('❌ Error debugging Fritz Hansen duplicates:', error);
  }
}

debugFritzHansenDuplicates();
