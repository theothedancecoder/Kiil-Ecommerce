import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

console.log('Environment check:', {
  hasProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  hasDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
  hasToken: !!process.env.SANITY_API_TOKEN
});

async function checkFredericiaProducts() {
  try {
    const products = await client.fetch(`*[_type == 'product' && brand == 'Fredericia'] {
      _id,
      name,
      slug,
      brand,
      price,
      'variantCount': count(variants),
      'hasMainImage': defined(image.asset._ref),
      variants[] {
        name,
        'hasImage': defined(image.asset._ref)
      }
    } | order(name asc)`);
    
    console.log(`\n✅ Found ${products.length} Fredericia products in Sanity:\n`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   - Slug: ${product.slug?.current || 'NO SLUG'}`);
      console.log(`   - Price: ${product.price || 'NO PRICE'}`);
      console.log(`   - Main Image: ${product.hasMainImage ? '✅' : '❌'}`);
      console.log(`   - Variants: ${product.variantCount || 0}`);
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((v, i) => {
          console.log(`     ${i + 1}. ${v.name} - Image: ${v.hasImage ? '✅' : '❌'}`);
        });
      }
      console.log('');
    });
    
    const withVariants = products.filter(p => p.variantCount > 0).length;
    const withImages = products.filter(p => p.hasMainImage).length;
    
    console.log(`\nSummary:`);
    console.log(`- Total products: ${products.length}`);
    console.log(`- Products with variants: ${withVariants}`);
    console.log(`- Products with main images: ${withImages}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkFredericiaProducts();
