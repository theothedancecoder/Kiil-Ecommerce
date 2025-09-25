const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function cleanDuxDuplicatesAndPlaceholders() {
  console.log('🔧 Cleaning DUX duplicates and placeholders...\n');

  try {
    // Step 1: Remove duplicates by keeping the most complete version
    console.log('Step 1: Removing duplicates...');
    
    const duxProducts = await client.fetch(`
      *[_type == "product" && brand == "DUX"] | order(name asc, _createdAt desc) {
        _id,
        name,
        slug,
        image,
        variants,
        features,
        specifications
      }
    `);

    console.log(`Found ${duxProducts.length} DUX products`);

    // Group by name
    const productGroups = {};
    duxProducts.forEach(product => {
      if (!productGroups[product.name]) {
        productGroups[product.name] = [];
      }
      productGroups[product.name].push(product);
    });

    // Remove duplicates
    for (const [name, products] of Object.entries(productGroups)) {
      if (products.length > 1) {
        console.log(`\n🔍 ${name}: Found ${products.length} duplicates`);
        
        // Sort by completeness (features, specs, image, variants)
        products.sort((a, b) => {
          const scoreA = (a.features?.length || 0) + (a.specifications?.length || 0) + 
                        (a.image ? 1 : 0) + (a.variants?.length || 0);
          const scoreB = (b.features?.length || 0) + (b.specifications?.length || 0) + 
                        (b.image ? 1 : 0) + (b.variants?.length || 0);
          return scoreB - scoreA; // Descending order
        });

        // Keep the first (most complete), delete the rest
        for (let i = 1; i < products.length; i++) {
          console.log(`   🗑️  Deleting: ${products[i]._id}`);
          await client.delete(products[i]._id);
        }
        
        console.log(`   ✅ Kept: ${products[0]._id}`);
      }
    }

    // Step 2: Check for remaining placeholder images
    console.log('\n\nStep 2: Checking for placeholder images...');
    
    const remainingProducts = await client.fetch(`
      *[_type == "product" && brand == "DUX"] {
        _id,
        name,
        variants[] {
          name,
          image {
            asset-> {
              url
            }
          }
        }
      }
    `);

    let placeholderCount = 0;
    for (const product of remainingProducts) {
      if (product.variants) {
        for (const variant of product.variants) {
          if (variant.image?.asset?.url && variant.image.asset.url.includes('placeholder-for-')) {
            console.log(`❌ ${product.name} - ${variant.name}: ${variant.image.asset.url}`);
            placeholderCount++;
          }
        }
      }
    }

    if (placeholderCount === 0) {
      console.log('✅ No placeholder images found!');
    } else {
      console.log(`⚠️  Found ${placeholderCount} placeholder images`);
    }

    // Step 3: Final verification
    console.log('\n\nStep 3: Final verification...');
    
    const finalProducts = await client.fetch(`
      *[_type == "product" && brand == "DUX"] | order(name asc) {
        _id,
        name,
        slug,
        image,
        variants,
        features,
        specifications
      }
    `);

    console.log(`\n📊 Final Summary:`);
    console.log(`   Total DUX products: ${finalProducts.length}`);
    
    const productNames = new Set(finalProducts.map(p => p.name));
    console.log(`   Unique product names: ${productNames.size}`);
    
    if (finalProducts.length === productNames.size) {
      console.log('   ✅ No duplicates remaining');
    } else {
      console.log('   ❌ Duplicates still exist');
    }

    console.log('\n🎉 Cleanup complete!');

  } catch (error) {
    console.error('❌ Error cleaning DUX products:', error);
  }
}

cleanDuxDuplicatesAndPlaceholders();
