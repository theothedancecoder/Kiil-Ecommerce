import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function deleteJuulDuplicates() {
  console.log('🗑️  Deleting Juul duplicate products...\n');

  try {
    // Get all Juul products
    const products = await client.fetch(`
      *[_type == "product" && brand == "Juul"] {
        _id,
        name,
        slug,
        image,
        variants
      } | order(name asc)
    `);

    console.log(`Found ${products.length} Juul products:\n`);
    
    products.forEach((p, i) => {
      const hasImage = p.image?.asset ? '✓' : '✗';
      const variantCount = p.variants?.length || 0;
      console.log(`${i + 1}. ${p.name} (${p.slug?.current}) - Image: ${hasImage}, Variants: ${variantCount}`);
    });

    // Products to delete (duplicates/variants that should not be separate products)
    const productsToDelete = [
      '301 Sofa L-240',
      'Sofa 903 L-200',
      'Sofa 903 L-220',
      'Sofa 903 L-240',
      'Juul 903 - Leather Prestige 18', // This seems to be a duplicate of main Juul 903
      'Juul 301 - Mainz 09' // This seems to be a duplicate of main Juul 301
    ];

    console.log('\n' + '='.repeat(50));
    console.log('Products to delete:');
    productsToDelete.forEach(name => console.log(`  - ${name}`));
    console.log('='.repeat(50) + '\n');

    let deleted = 0;

    for (const productName of productsToDelete) {
      const product = products.find(p => p.name === productName);
      
      if (product) {
        console.log(`🗑️  Deleting: ${product.name} (${product._id})`);
        await client.delete(product._id);
        console.log(`   ✓ Deleted\n`);
        deleted++;
      } else {
        console.log(`⚠️  Not found: ${productName}\n`);
      }
    }

    console.log('='.repeat(50));
    console.log(`📊 Deleted ${deleted} duplicate products`);
    console.log('='.repeat(50));

    // Show remaining products
    const remaining = await client.fetch(`
      *[_type == "product" && brand == "Juul"] {
        _id,
        name,
        slug,
        variants
      } | order(name asc)
    `);

    console.log(`\n✅ Remaining Juul products (${remaining.length}):`);
    remaining.forEach((p, i) => {
      const variantCount = p.variants?.length || 0;
      console.log(`${i + 1}. ${p.name} - ${variantCount} variants`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

deleteJuulDuplicates();
