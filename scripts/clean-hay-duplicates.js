require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function cleanHayDuplicates() {
  console.log('🧹 Cleaning HAY duplicate products...\n');

  try {
    // Get all HAY products
    const hayProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug,
      image,
      variants
    }`);

    console.log(`Found ${hayProducts.length} HAY products total\n`);

    // Separate products by slug pattern
    const productsWithPrefix = hayProducts.filter(p => p.slug?.current?.startsWith('hay/'));
    const productsWithoutPrefix = hayProducts.filter(p => p.slug?.current && !p.slug.current.startsWith('hay/'));

    console.log(`Products with 'hay/' prefix: ${productsWithPrefix.length}`);
    console.log(`Products without prefix: ${productsWithoutPrefix.length}\n`);

    // Find duplicates by comparing names
    const duplicatesToDelete = [];
    
    for (const prefixProduct of productsWithPrefix) {
      // Look for a corresponding product without prefix
      const matchingProduct = productsWithoutPrefix.find(p => 
        p.name.toLowerCase() === prefixProduct.name.toLowerCase()
      );
      
      if (matchingProduct) {
        console.log(`🔍 Found duplicate: "${prefixProduct.name}"`);
        console.log(`   - With prefix: ${prefixProduct.slug?.current} (${prefixProduct._id})`);
        console.log(`   - Without prefix: ${matchingProduct.slug?.current} (${matchingProduct._id})`);
        
        // Check which one has more data (images, variants)
        const prefixHasImage = !!prefixProduct.image?.asset;
        const matchingHasImage = !!matchingProduct.image?.asset;
        const prefixVariants = prefixProduct.variants?.length || 0;
        const matchingVariants = matchingProduct.variants?.length || 0;
        
        console.log(`   - Prefix product: Image=${prefixHasImage}, Variants=${prefixVariants}`);
        console.log(`   - Clean product: Image=${matchingHasImage}, Variants=${matchingVariants}`);
        
        // Keep the one with more data, or prefer the clean slug if equal
        if (matchingHasImage && matchingVariants >= prefixVariants) {
          // Keep the clean slug version, delete the prefixed one
          duplicatesToDelete.push({
            id: prefixProduct._id,
            name: prefixProduct.name,
            slug: prefixProduct.slug?.current,
            reason: 'Clean version has equal or better data'
          });
          console.log(`   ✅ Will keep clean version, delete prefixed version\n`);
        } else if (prefixHasImage && prefixVariants > matchingVariants) {
          // Keep the prefixed version, delete the clean one, but first copy data
          console.log(`   ⚠️  Prefixed version has better data - need to merge\n`);
          // We'll handle this case separately
        } else {
          // Default: keep clean version
          duplicatesToDelete.push({
            id: prefixProduct._id,
            name: prefixProduct.name,
            slug: prefixProduct.slug?.current,
            reason: 'Preferring clean slug'
          });
          console.log(`   ✅ Will keep clean version, delete prefixed version\n`);
        }
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   - Total HAY products: ${hayProducts.length}`);
    console.log(`   - Duplicates to delete: ${duplicatesToDelete.length}`);
    console.log(`   - Products after cleanup: ${hayProducts.length - duplicatesToDelete.length}`);

    if (duplicatesToDelete.length > 0) {
      console.log(`\n🗑️  Products to delete:`);
      duplicatesToDelete.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} (${product.slug}) - ${product.reason}`);
      });

      console.log(`\n🔄 Deleting duplicate products...`);
      
      for (const product of duplicatesToDelete) {
        try {
          await client.delete(product.id);
          console.log(`   ✅ Deleted: ${product.name}`);
        } catch (error) {
          console.error(`   ❌ Failed to delete ${product.name}:`, error.message);
        }
      }

      console.log(`\n✅ Cleanup completed!`);
      
      // Verify the cleanup
      const remainingProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
        _id,
        name,
        slug
      }`);
      
      console.log(`\n📊 After cleanup:`);
      console.log(`   - Remaining HAY products: ${remainingProducts.length}`);
      
      const stillWithPrefix = remainingProducts.filter(p => p.slug?.current?.startsWith('hay/'));
      console.log(`   - Products still with prefix: ${stillWithPrefix.length}`);
      
      if (stillWithPrefix.length > 0) {
        console.log(`\n⚠️  Products still with hay/ prefix:`);
        stillWithPrefix.forEach(p => {
          console.log(`   - ${p.name}: ${p.slug?.current}`);
        });
      }
    } else {
      console.log(`\n✅ No duplicates found to delete.`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

cleanHayDuplicates();
