import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13',
});

console.log('🔧 Sanity Config:');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? 'SET' : 'MISSING');
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET ? 'SET' : 'MISSING');

async function checkLouisPoulsenProducts() {
  try {
    console.log('🔍 Checking Louis Poulsen products in Sanity...');
    
    const products = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen"] {
        _id,
        name,
        slug,
        brand,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          name,
          color,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);
    
    console.log(`📊 Found ${products.length} Louis Poulsen products in Sanity`);
    
    if (products.length === 0) {
      console.log('❌ No Louis Poulsen products found in Sanity');
      console.log('💡 Need to migrate Louis Poulsen products to Sanity like Flos');
      return;
    }
    
    // Check for AJ Floor specifically
    const ajFloor = products.find(p => 
      p.name?.toLowerCase().includes('aj floor') || 
      p.slug?.current === 'aj-floor'
    );
    
    if (ajFloor) {
      console.log('✅ Found AJ Floor in Sanity:', ajFloor.name);
      console.log('🖼️  Main image:', ajFloor.image?.asset?.url ? 'YES' : 'NO');
      console.log('🎨 Variants:', ajFloor.variants?.length || 0);
      if (ajFloor.variants?.length > 0) {
        const variantsWithImages = ajFloor.variants.filter(v => v.image?.asset?.url);
        console.log(`📸 Variants with images: ${variantsWithImages.length}/${ajFloor.variants.length}`);
      }
    } else {
      console.log('❌ AJ Floor not found in Sanity');
    }
    
    // List all products
    console.log('\n📋 All Louis Poulsen products in Sanity:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.slug?.current || 'no-slug'})`);
      console.log(`   Image: ${product.image?.asset?.url ? '✅' : '❌'}`);
      console.log(`   Variants: ${product.variants?.length || 0}`);
    });
    
  } catch (error) {
    console.error('❌ Error checking Sanity:', error.message);
  }
}

checkLouisPoulsenProducts();
