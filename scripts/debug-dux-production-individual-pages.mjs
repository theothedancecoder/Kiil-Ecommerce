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

async function debugDuxProductionPages() {
  console.log('🔍 Debugging Dux individual pages production issue...');
  
  try {
    // Check for duplicate products
    console.log('\n📋 Checking for duplicate Dux products...');
    const allDuxQuery = `*[_type == "product" && "dux" in categories[]->slug.current] {
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
      },
      lifestyleImages[] {
        asset-> {
          url
        }
      },
      relatedProducts[]-> {
        _id,
        name,
        slug
      }
    }`;
    
    const allProducts = await client.fetch(allDuxQuery);
    console.log(`Found ${allProducts.length} total Dux products in Sanity`);
    
    // Group by slug to find duplicates
    const productsBySlug = {};
    allProducts.forEach(product => {
      const slug = product.slug?.current;
      if (slug) {
        if (!productsBySlug[slug]) {
          productsBySlug[slug] = [];
        }
        productsBySlug[slug].push(product);
      }
    });
    
    // Check for duplicates
    let duplicatesFound = false;
    Object.entries(productsBySlug).forEach(([slug, products]) => {
      if (products.length > 1) {
        duplicatesFound = true;
        console.log(`\n⚠️  DUPLICATE FOUND: ${slug}`);
        products.forEach((product, index) => {
          console.log(`   ${index + 1}. ${product.name} (${product._id})`);
          console.log(`      Main image: ${product.image?.asset?.url ? '✅' : '❌'}`);
          console.log(`      Variants: ${product.variants?.length || 0}`);
          console.log(`      Lifestyle images: ${product.lifestyleImages?.length || 0}`);
          console.log(`      Related products: ${product.relatedProducts?.length || 0}`);
        });
      }
    });
    
    if (!duplicatesFound) {
      console.log('✅ No duplicate products found');
    }
    
    // Check specific products that should work
    console.log('\n🧪 Testing specific product queries...');
    const testSlugs = ['jetson-classic-soft-88', 'inter-dining-table', 'jetson-match-flax-21'];
    
    for (const slug of testSlugs) {
      console.log(`\n📦 Testing: ${slug}`);
      
      const productQuery = `*[_type == "product" && slug.current == $slug && "dux" in categories[]->slug.current][0] {
        _id,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          _type,
          name,
          price,
          material,
          color,
          size,
          base,
          leather,
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
        },
        relatedProducts[]-> {
          _id,
          name,
          slug,
          price,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }`;
      
      const product = await client.fetch(productQuery, { slug });
      
      if (product) {
        console.log(`   ✅ Product found: ${product.name}`);
        console.log(`   📸 Main image: ${product.image?.asset?.url ? 'YES' : 'NO'}`);
        console.log(`   🔄 Variants: ${product.variants?.length || 0}`);
        if (product.variants?.length > 0) {
          const variantsWithImages = product.variants.filter(v => v.image?.asset?.url);
          console.log(`   🖼️  Variants with images: ${variantsWithImages.length}`);
        }
        console.log(`   🎨 Lifestyle images: ${product.lifestyleImages?.length || 0}`);
        console.log(`   🔗 Related products: ${product.relatedProducts?.length || 0}`);
        
        // Check if URLs are valid
        if (product.image?.asset?.url) {
          console.log(`   🌐 Main image URL: ${product.image.asset.url.substring(0, 80)}...`);
        }
      } else {
        console.log(`   ❌ Product NOT found`);
      }
    }
    
    // Check if there are products without proper images
    console.log('\n🔍 Checking for products without images...');
    const productsWithoutImages = allProducts.filter(p => !p.image?.asset?.url);
    if (productsWithoutImages.length > 0) {
      console.log(`⚠️  Found ${productsWithoutImages.length} products without main images:`);
      productsWithoutImages.forEach(p => {
        console.log(`   - ${p.name} (${p._id})`);
      });
    } else {
      console.log('✅ All products have main images');
    }
    
    // Check for products without variants
    console.log('\n🔍 Checking for products without variants...');
    const productsWithoutVariants = allProducts.filter(p => !p.variants || p.variants.length === 0);
    if (productsWithoutVariants.length > 0) {
      console.log(`⚠️  Found ${productsWithoutVariants.length} products without variants:`);
      productsWithoutVariants.forEach(p => {
        console.log(`   - ${p.name} (${p._id})`);
      });
    } else {
      console.log('✅ All products have variants');
    }
    
  } catch (error) {
    console.error('❌ Error during debugging:', error);
  }
}

debugDuxProductionPages().catch(console.error);
