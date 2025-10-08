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

// Category mapping based on product names and types
const categoryMappings = {
  // Seating
  'chair': 'Seating',
  'armchair': 'Seating',
  'stool': 'Seating',
  'bench': 'Seating',
  'sofa': 'Seating',
  'rocking': 'Seating',
  
  // Tables
  'table': 'Tables',
  'desk': 'Tables',
  
  // Storage
  'componibili': 'Storage',
  
  // Lighting
  'lamp': 'Lighting',
  'light': 'Lighting',
  
  // Accessories
  'clock': 'Accessories',
  'parasol': 'Accessories',
  'cushion': 'Accessories',
  'hang it all': 'Accessories',
  'plate': 'Accessories',
  'base': 'Accessories',
};

// Determine category from product name
function determineCategoryFromName(productName) {
  const nameLower = productName.toLowerCase();
  
  for (const [keyword, category] of Object.entries(categoryMappings)) {
    if (nameLower.includes(keyword)) {
      return category;
    }
  }
  
  return 'Furniture'; // Default category
}

// Ensure category exists
async function ensureCategory(categoryTitle) {
  const existing = await client.fetch(
    `*[_type == "category" && title == $title][0]`,
    { title: categoryTitle }
  );

  if (existing) {
    return existing._id;
  }

  // Create the category
  const category = await client.create({
    _type: 'category',
    title: categoryTitle,
    slug: {
      _type: 'slug',
      current: categoryTitle.toLowerCase().replace(/\s+/g, '-')
    },
    description: `${categoryTitle} products`
  });

  console.log(`   ✅ Created category: ${categoryTitle}`);
  return category._id;
}

async function addCategoriesToProducts() {
  try {
    console.log('🚀 Adding categories to all products without categories...\n');
    console.log('='.repeat(60) + '\n');

    // Get all products without categories
    const products = await client.fetch(
      `*[_type == "product" && (!defined(categories) || length(categories) == 0)] {
        _id,
        name,
        brand
      } | order(brand asc, name asc)`
    );

    console.log(`Found ${products.length} products without categories\n`);

    const categoryCache = {};
    let updated = 0;
    let skipped = 0;

    for (const product of products) {
      try {
        if (!product.name) {
          console.log(`⏭️  Skipping product without name: ${product._id}`);
          skipped++;
          continue;
        }

        // Determine category
        const categoryTitle = determineCategoryFromName(product.name);
        
        // Get or create category
        if (!categoryCache[categoryTitle]) {
          categoryCache[categoryTitle] = await ensureCategory(categoryTitle);
        }
        const categoryId = categoryCache[categoryTitle];

        // Update product
        await client
          .patch(product._id)
          .set({
            categories: [
              {
                _type: 'reference',
                _ref: categoryId,
                _key: `category-${Date.now()}-${Math.random()}`
              }
            ]
          })
          .commit();

        console.log(`✅ ${product.brand || 'Unknown'} - ${product.name} → ${categoryTitle}`);
        updated++;

      } catch (error) {
        console.error(`❌ Error updating ${product.name}:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n✅ Updated ${updated} products`);
    console.log(`⏭️  Skipped ${skipped} products`);
    console.log(`\nCategories used: ${Object.keys(categoryCache).join(', ')}\n`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

addCategoriesToProducts()
  .then(() => {
    console.log('✅ Script completed successfully!');
    console.log('\nAll products now have categories and should appear on the møbler page.\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
