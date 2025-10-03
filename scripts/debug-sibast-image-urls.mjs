import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function debugSibastImages() {
  console.log('\n🔍 Debugging Sibast Image URLs...\n');

  const query = `*[_type == "product" && (brand == "Sibast" || brand == "Sibast Furniture") && slug.current == "no-2-1-dining-table"][0]{
    _id,
    name,
    slug,
    brand,
    "mainImage": image.asset->url,
    "variants": variants[]{
      name,
      "imageUrl": image.asset->url,
      "imageRef": image.asset._ref,
      "imageAsset": image.asset
    }
  }`;

  try {
    const product = await client.fetch(query);
    
    if (!product) {
      console.log('❌ Product not found!');
      return;
    }

    console.log('Product:', product.name);
    console.log('Main Image URL:', product.mainImage);
    console.log('\nVariants:');
    product.variants?.forEach((variant, i) => {
      console.log(`\n${i + 1}. ${variant.name}`);
      console.log('   Image URL:', variant.imageUrl);
      console.log('   Image Ref:', variant.imageRef);
      console.log('   Image Asset:', JSON.stringify(variant.imageAsset, null, 2));
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

debugSibastImages();
