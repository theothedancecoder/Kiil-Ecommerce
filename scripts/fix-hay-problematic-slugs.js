require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function fixHayProblematicSlugs() {
  try {
    console.log('🔧 Fixing HAY products with problematic slugs...');
    
    // Find products with hay/hay/ prefix in slugs
    const problematicProducts = await client.fetch(`*[_type == "product" && brand == "HAY" && slug.current match "hay/hay*"] {
      _id,
      name,
      slug
    }`);
    
    console.log(`Found ${problematicProducts.length} products with problematic slugs:`);
    
    for (const product of problematicProducts) {
      const currentSlug = product.slug.current;
      // Remove the "hay/hay-" prefix and keep the rest
      const newSlug = currentSlug.replace('hay/hay-', '');
      
      console.log(`\n📝 Fixing: ${product.name}`);
      console.log(`   Old slug: ${currentSlug}`);
      console.log(`   New slug: ${newSlug}`);
      
      // Update the slug
      const result = await client
        .patch(product._id)
        .set({
          slug: {
            _type: 'slug',
            current: newSlug
          }
        })
        .commit();
      
      console.log(`   ✅ Updated successfully`);
    }
    
    console.log(`\n🎉 Fixed ${problematicProducts.length} problematic slugs!`);
    
    // Verify the fixes
    console.log('\n🔍 Verifying fixes...');
    const remainingProblematic = await client.fetch(`*[_type == "product" && brand == "HAY" && slug.current match "hay/hay*"] {
      _id,
      name,
      slug
    }`);
    
    if (remainingProblematic.length === 0) {
      console.log('✅ All problematic slugs have been fixed!');
    } else {
      console.log(`⚠️  Still ${remainingProblematic.length} problematic slugs remaining:`);
      remainingProblematic.forEach(p => {
        console.log(`   - ${p.name}: ${p.slug.current}`);
      });
    }
    
    // Show all HAY product URLs now
    console.log('\n📋 All HAY product URLs after fix:');
    const allHayProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug
    } | order(name asc)`);
    
    allHayProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   URL: https://kiil-ecommerce.vercel.app/hay/${product.slug.current}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

fixHayProblematicSlugs();
