import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function checkAudoCopenhagenProducts() {
  console.log('🔍 Checking Audo Copenhagen products in Sanity...\n');

  try {
    const products = await client.fetch(`
      *[_type == "product" && (brand == "Audo Copenhagen" || brand == "AUDO COPENHAGEN" || brand == "Audo")] {
        _id,
        name,
        slug,
        brand,
        price,
        "imageUrl": image.asset->url,
        "imageRef": image.asset._ref,
        "variantCount": count(variants),
        variants[] {
          name,
          color,
          "imageUrl": image.asset->url,
          "imageRef": image.asset._ref
        },
        "lifestyleImageCount": count(lifestyleImages),
        lifestyleImages[] {
          "url": asset->url,
          "ref": asset._ref
        }
      }
    `);

    console.log(`Found ${products.length} Audo Copenhagen products:\n`);

    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   ID: ${product._id}`);
      console.log(`   Slug: ${product.slug?.current || 'NO SLUG'}`);
      console.log(`   Brand: ${product.brand}`);
      console.log(`   Price: kr ${product.price}`);
      console.log(`   Main Image URL: ${product.imageUrl || 'NO IMAGE'}`);
      console.log(`   Main Image Ref: ${product.imageRef || 'NO REF'}`);
      console.log(`   Variants: ${product.variantCount || 0}`);
      
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant, vIndex) => {
          console.log(`     ${vIndex + 1}. ${variant.name || variant.color}`);
          console.log(`        Image URL: ${variant.imageUrl || 'NO IMAGE'}`);
          console.log(`        Image Ref: ${variant.imageRef || 'NO REF'}`);
        });
      }
      
      console.log(`   Lifestyle Images: ${product.lifestyleImageCount || 0}`);
      if (product.lifestyleImages && product.lifestyleImages.length > 0) {
        product.lifestyleImages.forEach((img, lIndex) => {
          console.log(`     ${lIndex + 1}. URL: ${img.url || 'NO URL'}`);
        });
      }
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
  }
}

checkAudoCopenhagenProducts();
