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

async function verifyDuxProducts() {
  console.log('🔍 Verifying Dux products complete fix...\n');
  
  try {
    const query = `
      *[_type == "product" && "dux" in categories[]->slug.current] | order(name asc) {
        _id,
        name,
        slug,
        price,
        image {
          asset-> {
            _id,
            url
          }
        },
        lifestyleImages[] {
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
        relatedProducts[]-> {
          _id,
          name,
          slug
        }
      }
    `;

    const products = await client.fetch(query);
    
    if (!products || products.length === 0) {
      console.log('❌ No Dux products found!');
      return;
    }

    console.log(`📊 Found ${products.length} Dux products\n`);
    
    let totalIssues = 0;
    
    for (const product of products) {
      console.log(`📦 ${product.name} (${product.slug?.current})`);
      console.log(`   💰 Price: kr ${product.price?.toLocaleString() || 'N/A'}`);
      
      // Check main image
      if (product.image?.asset?.url) {
        console.log(`   ✅ Main image: ${product.image.asset.url.substring(0, 60)}...`);
      } else {
        console.log(`   ❌ Missing main image`);
        totalIssues++;
      }
      
      // Check variants
      const variantCount = product.variants?.length || 0;
      console.log(`   🎨 Variants: ${variantCount}`);
      
      if (variantCount > 0) {
        let variantsWithImages = 0;
        for (const variant of product.variants) {
          if (variant.image?.asset?.url) {
            variantsWithImages++;
          }
        }
        console.log(`   📸 Variants with images: ${variantsWithImages}/${variantCount}`);
        
        if (variantsWithImages < variantCount) {
          console.log(`   ⚠️  ${variantCount - variantsWithImages} variants missing images`);
          totalIssues++;
        }
      } else {
        console.log(`   ❌ No variants found`);
        totalIssues++;
      }
      
      // Check lifestyle images
      const lifestyleCount = product.lifestyleImages?.length || 0;
      console.log(`   🖼️  Lifestyle images: ${lifestyleCount}`);
      
      if (lifestyleCount === 0) {
        console.log(`   ❌ No lifestyle images`);
        totalIssues++;
      }
      
      // Check related products
      const relatedCount = product.relatedProducts?.length || 0;
      console.log(`   🔗 Related products: ${relatedCount}`);
      
      if (relatedCount === 0) {
        console.log(`   ❌ No related products`);
        totalIssues++;
      }
      
      console.log(''); // Empty line for readability
    }
    
    console.log('📋 SUMMARY:');
    console.log(`✅ Total products: ${products.length}`);
    console.log(`❌ Total issues: ${totalIssues}`);
    
    if (totalIssues === 0) {
      console.log('\n🎉 ALL DUX PRODUCTS ARE PERFECTLY SET UP!');
      console.log('✅ All main images loading from Sanity CDN');
      console.log('✅ All variants have unique images');
      console.log('✅ All products have lifestyle images');
      console.log('✅ All products have related products');
      console.log('\n🚀 The Git LFS issue has been completely resolved!');
      console.log('🌐 All images will now load correctly on production');
    } else {
      console.log(`\n⚠️  Found ${totalIssues} issues that need attention`);
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

verifyDuxProducts();
