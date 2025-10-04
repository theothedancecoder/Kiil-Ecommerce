import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yzq6xiz7',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function debugSibastImages() {
  console.log('🔍 Debugging Sibast image data structure...\n');

  const query = `*[_type == "product" && (brand == "Sibast" || brand == "Sibast Furniture")][0...2] {
    _id,
    name,
    slug,
    brand,
    "mainImage": image.asset->url,
    "mainImageRef": image.asset._ref,
    "variants": variants[] {
      name,
      "imageUrl": image.asset->url,
      "imageRef": image.asset._ref,
      "imageObject": image
    }
  }`;

  const products = await client.fetch(query);
  
  console.log('📦 Sample Sibast Products:\n');
  products.forEach((product, index) => {
    console.log(`\n${index + 1}. ${product.name}`);
    console.log(`   Slug: ${product.slug?.current}`);
    console.log(`   Main Image URL: ${product.mainImage || 'MISSING'}`);
    console.log(`   Main Image Ref: ${product.mainImageRef || 'MISSING'}`);
    
    if (product.variants && product.variants.length > 0) {
      console.log(`   Variants (${product.variants.length}):`);
      product.variants.slice(0, 2).forEach((variant, vIdx) => {
        console.log(`     ${vIdx + 1}. ${variant.name}`);
        console.log(`        Image URL: ${variant.imageUrl || 'MISSING'}`);
        console.log(`        Image Ref: ${variant.imageRef || 'MISSING'}`);
        console.log(`        Image Object:`, JSON.stringify(variant.imageObject, null, 2));
      });
    }
  });
}

debugSibastImages().catch(console.error);
