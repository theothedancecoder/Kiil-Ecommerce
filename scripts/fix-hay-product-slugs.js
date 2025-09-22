require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Function to create slug from product name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-'); // Remove leading/trailing hyphens
}

async function fixHayProductSlugs() {
  console.log('🔄 Starting HAY product slug fix...\n');

  try {
    // Get HAY products without slugs
    const productsWithoutSlugs = await client.fetch(`*[_type == "product" && brand == "HAY" && !defined(slug.current)] {
      _id,
      name
    }`);

    console.log(`Found ${productsWithoutSlugs.length} HAY products without slugs\n`);

    let productsUpdated = 0;

    for (const product of productsWithoutSlugs) {
      console.log(`🔄 Processing: ${product.name}`);
      
      const slug = createSlug(product.name);
      console.log(`   Generated slug: ${slug}`);

      try {
        // Check if slug already exists
        const existingProduct = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug });
        
        let finalSlug = slug;
        if (existingProduct) {
          // If slug exists, add a number suffix
          let counter = 1;
          let testSlug = `${slug}-${counter}`;
          
          while (true) {
            const testProduct = await client.fetch(`*[_type == "product" && slug.current == $testSlug][0]`, { slug: testSlug });
            if (!testProduct) {
              finalSlug = testSlug;
              break;
            }
            counter++;
            testSlug = `${slug}-${counter}`;
          }
          console.log(`   Slug already exists, using: ${finalSlug}`);
        }

        // Update the product with the slug
        await client.patch(product._id).set({
          slug: {
            _type: 'slug',
            current: finalSlug
          }
        }).commit();

        console.log(`   ✅ Updated slug: ${finalSlug}`);
        productsUpdated++;

      } catch (error) {
        console.error(`   ❌ Failed to update ${product.name}:`, error.message);
      }

      console.log(''); // Empty line for readability
    }

    console.log('🎉 HAY product slug fix completed!');
    console.log('📊 Summary:');
    console.log(`   - Products updated: ${productsUpdated}`);
    console.log(`   - Total products processed: ${productsWithoutSlugs.length}`);

    // Verify the fix
    const remainingWithoutSlugs = await client.fetch(`*[_type == "product" && brand == "HAY" && !defined(slug.current)] {
      name
    }`);

    console.log(`   - Products still without slugs: ${remainingWithoutSlugs.length}`);

    if (remainingWithoutSlugs.length === 0) {
      console.log('\n✅ All HAY products now have slugs!');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixHayProductSlugs();
