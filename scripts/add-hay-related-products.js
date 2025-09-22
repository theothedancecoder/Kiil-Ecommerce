require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function addHayRelatedProducts() {
  try {
    console.log('🔗 Adding related products to HAY products...');
    
    // Get all HAY products
    const hayProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug,
      categories[]->{title}
    } | order(name asc)`);
    
    console.log(`Found ${hayProducts.length} HAY products`);
    
    // Define related product relationships based on categories and product types
    const relatedProductsMap = {
      // Tables should be related to other tables
      "dont-leave-me-dlm-side-table": ["dont-leave-me-xl-dlm-side-table", "kofi-coffee-table-6060", "neu-table-low"],
      "dont-leave-me-xl-dlm-side-table": ["dont-leave-me-dlm-side-table", "neu-table-high", "palissade-low-table"],
      "kofi-coffee-table-6060": ["neu-table-low", "neu-table-high", "palissade-low-table"],
      "neu-table-high": ["neu-table-low", "kofi-coffee-table-6060", "palissade-cone-table-60"],
      "neu-table-low": ["neu-table-high", "kofi-coffee-table-6060", "dont-leave-me-dlm-side-table"],
      "palissade-cone-table-60": ["palissade-low-table", "neu-table-high", "kofi-coffee-table-6060"],
      "palissade-low-table": ["palissade-cone-table-60", "dont-leave-me-xl-dlm-side-table", "neu-table-low"],
      
      // Chairs should be related to other seating
      "palisade-bar-stool": ["palisade-chair", "palissade-dining-chair", "palissade-armchair"],
      "palisade-chair": ["palissade-dining-chair", "palissade-armchair", "palisade-bar-stool"],
      "palissade-armchair": ["palissade-dining-chair", "palisade-chair", "palissade-lounge-chair"],
      "palissade-dining-chair": ["palisade-chair", "palissade-armchair", "palisade-bar-stool"],
      "palissade-lounge-chair": ["palissade-armchair", "palissade-lounge-sofa", "palisade-chair"],
      
      // Sofa and bench
      "palissade-lounge-sofa": ["palissade-lounge-chair", "palissade-bench-l-120", "palissade-armchair"],
      "palissade-bench-l-120": ["palissade-lounge-sofa", "palissade-lounge-chair", "palissade-dining-chair"],
    };
    
    let updatedCount = 0;
    
    for (const product of hayProducts) {
      const slug = product.slug?.current;
      if (!slug) continue;
      
      const relatedSlugs = relatedProductsMap[slug];
      if (!relatedSlugs || relatedSlugs.length === 0) continue;
      
      // Find the related products by their slugs
      const relatedProducts = [];
      for (const relatedSlug of relatedSlugs) {
        const relatedProduct = hayProducts.find(p => p.slug?.current === relatedSlug);
        if (relatedProduct) {
          relatedProducts.push({
            _type: 'reference',
            _ref: relatedProduct._id
          });
        }
      }
      
      if (relatedProducts.length > 0) {
        console.log(`\n📝 Adding ${relatedProducts.length} related products to: ${product.name}`);
        relatedProducts.forEach((_, index) => {
          const relatedSlug = relatedSlugs[index];
          const relatedName = hayProducts.find(p => p.slug?.current === relatedSlug)?.name;
          console.log(`   - ${relatedName}`);
        });
        
        // Update the product with related products
        await client
          .patch(product._id)
          .set({
            relatedProducts: relatedProducts
          })
          .commit();
        
        updatedCount++;
        console.log(`   ✅ Updated successfully`);
      }
    }
    
    console.log(`\n🎉 Added related products to ${updatedCount} HAY products!`);
    
    // Verify the updates
    console.log('\n🔍 Verifying updates...');
    const updatedProducts = await client.fetch(`*[_type == "product" && brand == "HAY" && count(relatedProducts) > 0] {
      _id,
      name,
      "relatedCount": count(relatedProducts),
      relatedProducts[] -> {
        name,
        slug
      }
    }`);
    
    console.log(`\n📊 HAY products now with related products: ${updatedProducts.length}`);
    updatedProducts.forEach(product => {
      console.log(`\n- ${product.name}: ${product.relatedCount} related products`);
      product.relatedProducts?.forEach(related => {
        console.log(`  • ${related.name} (${related.slug?.current})`);
      });
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

addHayRelatedProducts();
