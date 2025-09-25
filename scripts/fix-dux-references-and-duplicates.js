const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function fixDuxReferencesAndDuplicates() {
  console.log('🔧 Fixing DUX references and duplicates...\n');

  try {
    // Step 1: Get all DUX products and identify duplicates
    const duxProducts = await client.fetch(`
      *[_type == "product" && brand == "DUX"] | order(name asc, _createdAt desc) {
        _id,
        name,
        slug,
        image,
        variants,
        features,
        specifications,
        relatedProducts[]-> {
          _id,
          name
        }
      }
    `);

    console.log(`Found ${duxProducts.length} DUX products`);

    // Group by name to find duplicates
    const productGroups = {};
    duxProducts.forEach(product => {
      if (!productGroups[product.name]) {
        productGroups[product.name] = [];
      }
      productGroups[product.name].push(product);
    });

    const duplicateGroups = Object.entries(productGroups).filter(([name, products]) => products.length > 1);
    
    if (duplicateGroups.length === 0) {
      console.log('✅ No duplicates found!');
    } else {
      console.log(`Found duplicates for: ${duplicateGroups.map(([name]) => name).join(', ')}`);
    }

    // Step 2: For each duplicate group, merge data and remove references
    for (const [name, products] of duplicateGroups) {
      console.log(`\n🔍 Processing: ${name} (${products.length} duplicates)`);
      
      // Sort by completeness
      products.sort((a, b) => {
        const scoreA = (a.features?.length || 0) + (a.specifications?.length || 0) + 
                      (a.image ? 1 : 0) + (a.variants?.length || 0);
        const scoreB = (b.features?.length || 0) + (b.specifications?.length || 0) + 
                      (b.image ? 1 : 0) + (b.variants?.length || 0);
        return scoreB - scoreA;
      });

      const keepProduct = products[0];
      const deleteProducts = products.slice(1);
      
      console.log(`   ✅ Keeping: ${keepProduct._id} (most complete)`);
      
      // Step 3: Remove references to products we want to delete
      for (const productToDelete of deleteProducts) {
        console.log(`   🔗 Removing references to: ${productToDelete._id}`);
        
        // Find all products that reference this product
        const referencingProducts = await client.fetch(`
          *[_type == "product" && references($productId)] {
            _id,
            name,
            relatedProducts[]-> {
              _id
            }
          }
        `, { productId: productToDelete._id });

        // Remove the reference from each referencing product
        for (const refProduct of referencingProducts) {
          const updatedRelatedProducts = refProduct.relatedProducts
            .filter(rp => rp._id !== productToDelete._id)
            .map(rp => ({ _type: 'reference', _ref: rp._id }));
          
          await client.patch(refProduct._id).set({
            relatedProducts: updatedRelatedProducts
          }).commit();
          
          console.log(`     ✅ Removed reference from: ${refProduct.name}`);
        }
        
        // Now delete the product
        console.log(`   🗑️  Deleting: ${productToDelete._id}`);
        await client.delete(productToDelete._id);
      }
    }

    // Step 4: Check for placeholder images in remaining products
    console.log('\n\nStep 4: Checking for placeholder images...');
    
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
    const productsWithPlaceholders = [];
    
    for (const product of remainingProducts) {
      let hasPlaceholders = false;
      if (product.variants) {
        for (const variant of product.variants) {
          if (variant.image?.asset?.url && variant.image.asset.url.includes('placeholder-for-')) {
            console.log(`❌ ${product.name} - ${variant.name}: ${variant.image.asset.url}`);
            placeholderCount++;
            hasPlaceholders = true;
          }
        }
      }
      if (hasPlaceholders) {
        productsWithPlaceholders.push(product.name);
      }
    }

    // Step 5: Final summary
    console.log('\n\n📊 Final Summary:');
    
    const finalProducts = await client.fetch(`
      *[_type == "product" && brand == "DUX"] | order(name asc) {
        _id,
        name
      }
    `);

    console.log(`   Total DUX products: ${finalProducts.length}`);
    console.log(`   Unique product names: ${new Set(finalProducts.map(p => p.name)).size}`);
    
    if (placeholderCount === 0) {
      console.log('   ✅ No placeholder images found!');
    } else {
      console.log(`   ⚠️  ${placeholderCount} placeholder images in: ${productsWithPlaceholders.join(', ')}`);
    }

    console.log('\n🎉 DUX cleanup complete!');

  } catch (error) {
    console.error('❌ Error fixing DUX products:', error);
  }
}

fixDuxReferencesAndDuplicates();
