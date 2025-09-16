import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

async function fixDuxDuplicates() {
  console.log('🔧 Fixing Dux duplicate products...');
  
  try {
    // Get all Dux products grouped by slug
    const products = await client.fetch(`
      *[_type == "product" && "dux" in categories[]->slug.current] | order(slug.current asc, _createdAt desc) {
        _id,
        _createdAt,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          name,
          image {
            asset-> {
              _id,
              url
            }
          }
        },
        lifestyleImages[] {
          asset-> {
            _id,
            url
          }
        }
      }
    `);

    console.log(`📊 Found ${products.length} Dux products total`);

    // Group products by slug
    const productsBySlug = {};
    products.forEach(product => {
      const slug = product.slug.current;
      if (!productsBySlug[slug]) {
        productsBySlug[slug] = [];
      }
      productsBySlug[slug].push(product);
    });

    // Process each slug group
    for (const [slug, slugProducts] of Object.entries(productsBySlug)) {
      console.log(`\n📦 Processing slug: ${slug}`);
      console.log(`   Found ${slugProducts.length} products with this slug`);

      if (slugProducts.length === 1) {
        const product = slugProducts[0];
        console.log(`   ✅ Single product: ${product.name}`);
        
        // Check if it has proper images
        const hasMainImage = product.image?.asset?.url && product.image.asset.url.includes('cdn.sanity.io');
        const hasVariants = product.variants && product.variants.length > 0;
        const variantsWithImages = product.variants?.filter(v => v.image?.asset?.url && v.image.asset.url.includes('cdn.sanity.io')).length || 0;
        const hasLifestyle = product.lifestyleImages && product.lifestyleImages.length > 0;
        
        console.log(`   📸 Main image: ${hasMainImage ? '✅' : '❌'}`);
        console.log(`   🎨 Variants: ${hasVariants ? `✅ ${product.variants.length}` : '❌ 0'}`);
        console.log(`   🖼️  Variant images: ${variantsWithImages}/${product.variants?.length || 0}`);
        console.log(`   🏠 Lifestyle images: ${hasLifestyle ? `✅ ${product.lifestyleImages.length}` : '❌ 0'}`);
        
        continue;
      }

      // Multiple products with same slug - need to merge
      console.log(`   ⚠️ Multiple products found, merging...`);
      
      // Find the best product (most complete data)
      let bestProduct = null;
      let bestScore = -1;
      
      for (const product of slugProducts) {
        let score = 0;
        
        // Score based on data completeness
        if (product.image?.asset?.url && product.image.asset.url.includes('cdn.sanity.io')) score += 10;
        if (product.variants && product.variants.length > 0) score += product.variants.length;
        if (product.lifestyleImages && product.lifestyleImages.length > 0) score += product.lifestyleImages.length * 2;
        
        // Prefer newer products if scores are equal
        if (score > bestScore || (score === bestScore && new Date(product._createdAt) > new Date(bestProduct?._createdAt || 0))) {
          bestProduct = product;
          bestScore = score;
        }
        
        console.log(`   📊 ${product.name} (${product._id.slice(-8)}): score ${score}`);
      }
      
      console.log(`   🏆 Best product: ${bestProduct.name} (${bestProduct._id.slice(-8)}) with score ${bestScore}`);
      
      // Delete the other products
      const productsToDelete = slugProducts.filter(p => p._id !== bestProduct._id);
      for (const productToDelete of productsToDelete) {
        console.log(`   🗑️ Deleting duplicate: ${productToDelete.name} (${productToDelete._id.slice(-8)})`);
        await client.delete(productToDelete._id);
      }
      
      console.log(`   ✅ Kept best product: ${bestProduct.name}`);
    }
    
    console.log('\n🎉 Dux duplicate cleanup completed!');
    
    // Show final summary
    const finalProducts = await client.fetch(`
      *[_type == "product" && "dux" in categories[]->slug.current] | order(name asc) {
        _id,
        name,
        slug,
        image {
          asset-> {
            url
          }
        },
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
    
    console.log(`\n📊 Final Dux products: ${finalProducts.length}`);
    finalProducts.forEach(product => {
      const hasMainImage = product.image?.asset?.url && product.image.asset.url.includes('cdn.sanity.io');
      const variantsWithImages = product.variants?.filter(v => v.image?.asset?.url && v.image.asset.url.includes('cdn.sanity.io')).length || 0;
      console.log(`   ${product.name}: Main ${hasMainImage ? '✅' : '❌'}, Variants ${variantsWithImages}/${product.variants?.length || 0}`);
    });
    
  } catch (error) {
    console.error('❌ Error fixing duplicates:', error);
    process.exit(1);
  }
}

fixDuxDuplicates();
