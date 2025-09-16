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

async function debugDuxProductionImages() {
  console.log('🔍 Debugging Dux production images...');
  
  const duxProducts = await client.fetch(`
    *[_type == "product" && "dux" in categories[]->slug.current] | order(name asc) {
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
  
  console.log(`\n📊 Found ${duxProducts.length} Dux products\n`);
  
  for (const product of duxProducts) {
    console.log(`📦 ${product.name} (${product.slug.current})`);
    
    // Check main image
    if (product.image?.asset?.url) {
      console.log(`  ✅ Main image: ${product.image.asset.url}`);
    } else {
      console.log(`  ❌ Main image: MISSING`);
    }
    
    // Check variant images
    if (product.variants && product.variants.length > 0) {
      console.log(`  🎨 Variants: ${product.variants.length}`);
      let variantsWithImages = 0;
      product.variants.forEach((variant, index) => {
        if (variant.image?.asset?.url) {
          variantsWithImages++;
          console.log(`    ✅ Variant ${index + 1} (${variant.name}): ${variant.image.asset.url}`);
        } else {
          console.log(`    ❌ Variant ${index + 1} (${variant.name}): NO IMAGE`);
        }
      });
      console.log(`  📸 Variants with images: ${variantsWithImages}/${product.variants.length}`);
    } else {
      console.log(`  ❌ No variants found`);
    }
    
    // Check lifestyle images
    if (product.lifestyleImages && product.lifestyleImages.length > 0) {
      console.log(`  🖼️  Lifestyle images: ${product.lifestyleImages.length}`);
      product.lifestyleImages.forEach((img, index) => {
        if (img.asset?.url) {
          console.log(`    ✅ Lifestyle ${index + 1}: ${img.asset.url}`);
        } else {
          console.log(`    ❌ Lifestyle ${index + 1}: NO URL`);
        }
      });
    } else {
      console.log(`  ❌ No lifestyle images`);
    }
    
    console.log(''); // Empty line for readability
  }
  
  console.log('🎯 Summary: All URLs shown above are Sanity CDN URLs that should work on production');
  console.log('🚨 If images still don\'t show on production, the issue is likely in the frontend component or caching');
}

debugDuxProductionImages().catch(console.error);
