import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function finalVerification() {
  console.log('🔍 FINAL VERIFICATION\n');
  
  // Check what will be shown on /products page
  const visibleProducts = await client.fetch(
    `*[_type == "product" && (inStock == true || (defined(stock) && stock > 0))] {
      _id,
      name,
      "hasImage": defined(image.asset._ref),
      "hasSlug": defined(slug.current)
    }`
  );
  
  console.log('📊 PRODUCTS VISIBLE ON /products PAGE:');
  console.log(`   Total: ${visibleProducts.length}`);
  console.log(`   With images: ${visibleProducts.filter(p => p.hasImage).length}`);
  console.log(`   With slugs: ${visibleProducts.filter(p => p.hasSlug).length}`);
  console.log(`   Complete (image + slug): ${visibleProducts.filter(p => p.hasImage && p.hasSlug).length}\n`);
  
  const incomplete = visibleProducts.filter(p => !p.hasImage || !p.hasSlug);
  if (incomplete.length > 0) {
    console.log(`⚠️  ${incomplete.length} visible products are incomplete:`);
    incomplete.forEach(p => {
      console.log(`   - ${p.name}`);
      console.log(`     hasImage: ${p.hasImage}, hasSlug: ${p.hasSlug}`);
    });
  } else {
    console.log('✅ All visible products are complete!');
  }
  
  // Check hidden products
  const hiddenProducts = await client.fetch(
    `*[_type == "product" && !(inStock == true || (defined(stock) && stock > 0))] {
      _id,
      name
    }`
  );
  
  console.log(`\n📊 PRODUCTS HIDDEN (out of stock):`);
  console.log(`   Total: ${hiddenProducts.length}\n`);
  
  console.log('=' .repeat(60));
  console.log('SUMMARY:');
  console.log('=' .repeat(60));
  console.log(`Total products in database: ${visibleProducts.length + hiddenProducts.length}`);
  console.log(`Visible on /products: ${visibleProducts.length}`);
  console.log(`Hidden (out of stock): ${hiddenProducts.length}`);
  console.log(`\n${incomplete.length === 0 ? '✅ ALL VISIBLE PRODUCTS ARE COMPLETE!' : '⚠️  Some visible products need attention'}\n`);
}

finalVerification()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
