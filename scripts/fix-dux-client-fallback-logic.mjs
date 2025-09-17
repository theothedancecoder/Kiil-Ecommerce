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

async function checkDuxFallbackProperties() {
  console.log('🔍 Checking if Dux products have fallback imagePath properties...');
  
  try {
    // Check if any Dux products have imagePath properties
    const products = await client.fetch(`
      *[_type == "product" && "dux" in categories[]->slug.current] {
        _id,
        name,
        slug,
        imagePath,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          _type,
          name,
          imagePath,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);

    console.log(`\n📊 Found ${products.length} Dux products`);
    
    let hasImagePath = false;
    let hasVariantImagePath = false;
    
    for (const product of products) {
      console.log(`\n📦 ${product.name}:`);
      console.log(`   imagePath: ${product.imagePath ? '✅ YES' : '❌ NO'}`);
      console.log(`   image.asset.url: ${product.image?.asset?.url ? '✅ YES' : '❌ NO'}`);
      
      if (product.imagePath) hasImagePath = true;
      
      if (product.variants && product.variants.length > 0) {
        console.log(`   Variants (${product.variants.length}):`);
        for (let i = 0; i < Math.min(product.variants.length, 3); i++) {
          const variant = product.variants[i];
          console.log(`     ${variant.name}:`);
          console.log(`       imagePath: ${variant.imagePath ? '✅ YES' : '❌ NO'}`);
          console.log(`       image.asset.url: ${variant.image?.asset?.url ? '✅ YES' : '❌ NO'}`);
          
          if (variant.imagePath) hasVariantImagePath = true;
        }
      }
    }
    
    console.log('\n📋 Summary:');
    console.log(`   Products with imagePath: ${hasImagePath ? '✅ YES' : '❌ NO'}`);
    console.log(`   Variants with imagePath: ${hasVariantImagePath ? '✅ YES' : '❌ NO'}`);
    
    if (!hasImagePath && !hasVariantImagePath) {
      console.log('\n💡 SOLUTION IDENTIFIED:');
      console.log('   Dux products do NOT have imagePath fallback properties');
      console.log('   RO Collection works because it has both asset.url AND imagePath fallbacks');
      console.log('   We need to update DuxProductClient to remove the fallback logic');
      console.log('   OR add imagePath properties to Dux products');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkDuxFallbackProperties();
