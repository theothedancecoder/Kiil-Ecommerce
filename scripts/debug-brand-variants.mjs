import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function debugBrandVariants(brand) {
  console.log(`\n=== Checking ${brand} Variants ===\n`);
  
  const products = await client.fetch(`
    *[_type == "product" && brand == $brand] {
      _id,
      name,
      slug,
      "mainImage": image.asset->url,
      variants[] {
        _key,
        name,
        "variantImage": image.asset->url,
        color,
        material
      }
    }
  `, { brand });

  console.log(`Found ${products.length} ${brand} products\n`);

  products.forEach(product => {
    console.log(`\n${product.name} (${product.slug?.current})`);
    console.log(`Main Image: ${product.mainImage || 'MISSING'}`);
    
    if (product.variants && product.variants.length > 0) {
      console.log(`Variants (${product.variants.length}):`);
      product.variants.forEach((variant, idx) => {
        console.log(`  ${idx + 1}. ${variant.name}`);
        console.log(`     Image: ${variant.variantImage || 'MISSING - USING MAIN IMAGE'}`);
        if (variant.color) console.log(`     Color: ${variant.color}`);
        if (variant.material) console.log(`     Material: ${variant.material}`);
      });
    } else {
      console.log('No variants');
    }
  });
}

// Check all three brands
await debugBrandVariants('Sibast');
await debugBrandVariants('Sibast Furniture');
await debugBrandVariants('Fritz Hansen');
await debugBrandVariants('Vitra');
