require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function mergeHayDuplicates() {
  console.log('🔄 Merging HAY duplicate products...\n');

  try {
    // Get all HAY products
    const hayProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug,
      image,
      variants,
      description,
      price,
      categories
    }`);

    console.log(`Found ${hayProducts.length} HAY products total\n`);

    // Separate products by slug pattern
    const productsWithPrefix = hayProducts.filter(p => p.slug?.current?.startsWith('hay/'));
    const productsWithoutPrefix = hayProducts.filter(p => p.slug?.current && !p.slug.current.startsWith('hay/'));

    console.log(`Products with 'hay/' prefix: ${productsWithPrefix.length}`);
    console.log(`Products without prefix: ${productsWithoutPrefix.length}\n`);

    let mergedCount = 0;
    let deletedCount = 0;

    // Process each prefixed product
    for (const prefixProduct of productsWithPrefix) {
      // Look for a corresponding product without prefix
      const matchingProduct = productsWithoutPrefix.find(p => 
        p.name.toLowerCase() === prefixProduct.name.toLowerCase()
      );
      
      if (matchingProduct) {
        console.log(`🔄 Processing: "${prefixProduct.name}"`);
        console.log(`   - Prefix version: ${prefixProduct.slug?.current} (${prefixProduct.variants?.length || 0} variants)`);
        console.log(`   - Clean version: ${matchingProduct.slug?.current} (${matchingProduct.variants?.length || 0} variants)`);
        
        // Merge data from prefixed version to clean version
        const updateData = {};
        
        // Use the better image if available
        if (prefixProduct.image?.asset && !matchingProduct.image?.asset) {
          updateData.image = prefixProduct.image;
          console.log(`   ✅ Copying image from prefix version`);
        }
        
        // Use the better variants data
        if (prefixProduct.variants && prefixProduct.variants.length > (matchingProduct.variants?.length || 0)) {
          updateData.variants = prefixProduct.variants;
          console.log(`   ✅ Copying ${prefixProduct.variants.length} variants from prefix version`);
        }
        
        // Use better description if available
        if (prefixProduct.description && !matchingProduct.description) {
          updateData.description = prefixProduct.description;
          console.log(`   ✅ Copying description from prefix version`);
        }
        
        // Use better price if available
        if (prefixProduct.price && !matchingProduct.price) {
          updateData.price = prefixProduct.price;
          console.log(`   ✅ Copying price from prefix version`);
        }
        
        // Update the clean version with merged data
        if (Object.keys(updateData).length > 0) {
          try {
            await client.patch(matchingProduct._id).set(updateData).commit();
            console.log(`   ✅ Updated clean version with merged data`);
            mergedCount++;
          } catch (error) {
            console.error(`   ❌ Failed to update clean version:`, error.message);
            continue;
          }
        }
        
        // Delete the prefixed version
        try {
          await client.delete(prefixProduct._id);
          console.log(`   ✅ Deleted prefixed version`);
          deletedCount++;
        } catch (error) {
          console.error(`   ❌ Failed to delete prefixed version:`, error.message);
        }
        
        console.log('');
      } else {
        console.log(`⚠️  No matching clean version found for: ${prefixProduct.name} (${prefixProduct.slug?.current})`);
        console.log('   This product will be kept as-is\n');
      }
    }

    console.log(`🎉 Merge completed!`);
    console.log(`📊 Summary:`);
    console.log(`   - Products merged: ${mergedCount}`);
    console.log(`   - Prefixed products deleted: ${deletedCount}`);
    
    // Verify the cleanup
    const remainingProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug,
      image,
      variants
    }`);
    
    console.log(`   - Remaining HAY products: ${remainingProducts.length}`);
    
    const stillWithPrefix = remainingProducts.filter(p => p.slug?.current?.startsWith('hay/'));
    console.log(`   - Products still with prefix: ${stillWithPrefix.length}`);
    
    const productsWithImages = remainingProducts.filter(p => p.image?.asset);
    console.log(`   - Products with images: ${productsWithImages.length}`);
    
    const productsWithVariants = remainingProducts.filter(p => p.variants && p.variants.length > 0);
    console.log(`   - Products with variants: ${productsWithVariants.length}`);
    
    if (stillWithPrefix.length > 0) {
      console.log(`\n📋 Products still with hay/ prefix:`);
      stillWithPrefix.forEach(p => {
        console.log(`   - ${p.name}: ${p.slug?.current}`);
      });
    }
    
    console.log(`\n📋 Final HAY products list:`);
    remainingProducts.forEach((p, index) => {
      console.log(`   ${index + 1}. ${p.name} (${p.slug?.current}) - Image: ${!!p.image?.asset}, Variants: ${p.variants?.length || 0}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

mergeHayDuplicates();
