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

async function debugDuxFrontendUrls() {
  console.log('🔍 Debugging Dux frontend URL generation...');
  
  try {
    // Test the exact query that the frontend uses
    const product = await client.fetch(`
      *[_type == "product" && slug.current == "jetson-classic-soft-88" && "dux" in categories[]->slug.current][0] {
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

    if (!product) {
      console.error('❌ Product not found!');
      return;
    }

    console.log('\n📦 Product found:', product.name);
    
    // Test main image
    console.log('\n🖼️  Main Image:');
    console.log('   Raw data:', JSON.stringify(product.image, null, 2));
    if (product.image?.asset?.url) {
      console.log('   ✅ URL:', product.image.asset.url);
      
      // Test if URL is accessible
      try {
        const response = await fetch(product.image.asset.url, { method: 'HEAD' });
        console.log('   📡 HTTP Status:', response.status);
        if (response.status !== 200) {
          console.log('   ❌ URL not accessible!');
        } else {
          console.log('   ✅ URL accessible');
        }
      } catch (fetchError) {
        console.log('   ❌ Fetch error:', fetchError.message);
      }
    } else {
      console.log('   ❌ No URL found');
    }

    // Test variant images
    console.log('\n🔄 Variant Images:');
    if (product.variants && product.variants.length > 0) {
      for (let i = 0; i < product.variants.length; i++) {
        const variant = product.variants[i];
        console.log(`   Variant ${i + 1}: ${variant.name}`);
        console.log('   Raw data:', JSON.stringify(variant.image, null, 2));
        
        if (variant.image?.asset?.url) {
          console.log('   ✅ URL:', variant.image.asset.url);
          
          // Test if URL is accessible
          try {
            const response = await fetch(variant.image.asset.url, { method: 'HEAD' });
            console.log('   📡 HTTP Status:', response.status);
            if (response.status !== 200) {
              console.log('   ❌ URL not accessible!');
            } else {
              console.log('   ✅ URL accessible');
            }
          } catch (fetchError) {
            console.log('   ❌ Fetch error:', fetchError.message);
          }
        } else {
          console.log('   ❌ No URL found');
        }
        console.log('');
      }
    } else {
      console.log('   ❌ No variants found');
    }

    // Test lifestyle images
    console.log('\n🎨 Lifestyle Images:');
    if (product.lifestyleImages && product.lifestyleImages.length > 0) {
      for (let i = 0; i < product.lifestyleImages.length; i++) {
        const lifestyle = product.lifestyleImages[i];
        console.log(`   Lifestyle ${i + 1}:`);
        console.log('   Raw data:', JSON.stringify(lifestyle, null, 2));
        
        if (lifestyle.asset?.url) {
          console.log('   ✅ URL:', lifestyle.asset.url);
          
          // Test if URL is accessible
          try {
            const response = await fetch(lifestyle.asset.url, { method: 'HEAD' });
            console.log('   📡 HTTP Status:', response.status);
            if (response.status !== 200) {
              console.log('   ❌ URL not accessible!');
            } else {
              console.log('   ✅ URL accessible');
            }
          } catch (fetchError) {
            console.log('   ❌ Fetch error:', fetchError.message);
          }
        } else {
          console.log('   ❌ No URL found');
        }
        console.log('');
      }
    } else {
      console.log('   ❌ No lifestyle images found');
    }

    // Test environment variables
    console.log('\n🔧 Environment Check:');
    console.log('   Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('   Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    console.log('   Has Token:', !!process.env.SANITY_API_TOKEN);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugDuxFrontendUrls();
