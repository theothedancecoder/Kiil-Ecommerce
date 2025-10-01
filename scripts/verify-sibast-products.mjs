import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

console.log('🔍 Verifying Sibast products in Sanity...\n');

async function verifySibastProducts() {
  try {
    const products = await client.fetch(`
      *[_type == "product" && brand == "Sibast"] | order(name asc) {
        _id,
        name,
        slug,
        price,
        brand,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          name,
          price,
          material,
          color,
          size,
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

    console.log(`✅ Found ${products.length} Sibast products in Sanity\n`);

    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Slug: ${product.slug?.current || 'N/A'}`);
      console.log(`   Price: kr ${product.price?.toLocaleString() || 'N/A'}`);
      console.log(`   Main Image: ${product.image?.asset?.url ? '✅ Yes' : '❌ No'}`);
      console.log(`   Variants: ${product.variants?.length || 0}`);
      console.log(`   Lifestyle Images: ${product.lifestyleImages?.length || 0}`);
      
      if (product.variants && product.variants.length > 0) {
        console.log(`   Variant Details:`);
        product.variants.forEach((variant, vIndex) => {
          const hasImage = variant.image?.asset?.url ? '✅' : '❌';
          console.log(`     ${vIndex + 1}. ${variant.name} - kr ${variant.price?.toLocaleString()} ${hasImage}`);
        });
      }
      console.log('');
    });

    // Check for any products without images
    const productsWithoutImages = products.filter(p => !p.image?.asset?.url);
    if (productsWithoutImages.length > 0) {
      console.log(`\n⚠️  ${productsWithoutImages.length} products without main images:`);
      productsWithoutImages.forEach(p => console.log(`   - ${p.name}`));
    }

    // Check for variants without images
    let variantsWithoutImages = 0;
    products.forEach(product => {
      if (product.variants) {
        const missingImages = product.variants.filter(v => !v.image?.asset?.url);
        variantsWithoutImages += missingImages.length;
      }
    });

    if (variantsWithoutImages > 0) {
      console.log(`\n⚠️  ${variantsWithoutImages} variants without images`);
    }

    console.log('\n📊 Summary:');
    console.log(`   Total Products: ${products.length}`);
    console.log(`   Total Variants: ${products.reduce((sum, p) => sum + (p.variants?.length || 0), 0)}`);
    console.log(`   Products with Images: ${products.filter(p => p.image?.asset?.url).length}`);
    console.log(`   Products with Lifestyle Images: ${products.filter(p => p.lifestyleImages && p.lifestyleImages.length > 0).length}`);

  } catch (error) {
    console.error('❌ Error verifying Sibast products:', error.message);
  }
}

verifySibastProducts().catch(console.error);
