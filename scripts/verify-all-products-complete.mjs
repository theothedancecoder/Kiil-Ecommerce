import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function verifyAllProducts() {
  try {
    console.log('🔍 COMPREHENSIVE PRODUCT VERIFICATION\n');
    console.log('=' .repeat(80));

    // Task 1: Check out-of-stock products
    console.log('\n📋 TASK 1: OUT-OF-STOCK PRODUCTS CHECK');
    console.log('=' .repeat(80));

    const allProducts = await client.fetch(
      `*[_type == "product"] | order(name asc) {
        _id,
        name,
        brand,
        inStock,
        stock,
        slug
      }`
    );

    const outOfStockProducts = allProducts.filter(p => 
      !(p.inStock === true || (p.stock !== null && p.stock !== undefined && p.stock > 0))
    );

    console.log(`\nTotal products: ${allProducts.length}`);
    console.log(`Out-of-stock products: ${outOfStockProducts.length}\n`);

    if (outOfStockProducts.length > 0) {
      console.log('❌ OUT-OF-STOCK PRODUCTS FOUND:');
      outOfStockProducts.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} (${p.brand || 'No brand'})`);
        console.log(`   inStock: ${p.inStock}, stock: ${p.stock}`);
        console.log(`   slug: ${p.slug?.current || 'NO SLUG'}\n`);
      });
    } else {
      console.log('✅ No out-of-stock products found!');
    }

    // Task 2: Check products without images
    console.log('\n=' .repeat(80));
    console.log('📋 TASK 2: PRODUCTS WITHOUT IMAGES CHECK');
    console.log('=' .repeat(80));

    const productsWithImageCheck = await client.fetch(
      `*[_type == "product"] | order(name asc) {
        _id,
        name,
        brand,
        slug,
        "hasImage": defined(image.asset._ref),
        "imageRef": image.asset._ref
      }`
    );

    const productsWithoutImages = productsWithImageCheck.filter(p => !p.hasImage);

    console.log(`\nTotal products: ${productsWithImageCheck.length}`);
    console.log(`Products without images: ${productsWithoutImages.length}\n`);

    if (productsWithoutImages.length > 0) {
      console.log('❌ PRODUCTS WITHOUT IMAGES:');
      productsWithoutImages.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} (${p.brand || 'No brand'})`);
        console.log(`   slug: ${p.slug?.current || 'NO SLUG'}\n`);
      });
    } else {
      console.log('✅ All products have images!');
    }

    // Task 3: Check products without slugs (no individual page)
    console.log('\n=' .repeat(80));
    console.log('📋 TASK 3: PRODUCTS WITHOUT SLUGS (NO INDIVIDUAL PAGE)');
    console.log('=' .repeat(80));

    const productsWithoutSlugs = allProducts.filter(p => !p.slug || !p.slug.current);

    console.log(`\nTotal products: ${allProducts.length}`);
    console.log(`Products without slugs: ${productsWithoutSlugs.length}\n`);

    if (productsWithoutSlugs.length > 0) {
      console.log('❌ PRODUCTS WITHOUT SLUGS:');
      productsWithoutSlugs.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} (${p.brand || 'No brand'})`);
        console.log(`   ID: ${p._id}\n`);
      });
    } else {
      console.log('✅ All products have slugs!');
    }

    // Summary
    console.log('\n=' .repeat(80));
    console.log('📊 SUMMARY');
    console.log('=' .repeat(80));
    console.log(`\n✓ Total products in Sanity: ${allProducts.length}`);
    console.log(`${outOfStockProducts.length === 0 ? '✅' : '❌'} Out-of-stock products: ${outOfStockProducts.length}`);
    console.log(`${productsWithoutImages.length === 0 ? '✅' : '❌'} Products without images: ${productsWithoutImages.length}`);
    console.log(`${productsWithoutSlugs.length === 0 ? '✅' : '❌'} Products without slugs: ${productsWithoutSlugs.length}`);

    const allGood = outOfStockProducts.length === 0 && 
                    productsWithoutImages.length === 0 && 
                    productsWithoutSlugs.length === 0;

    console.log(`\n${allGood ? '✅ ALL CHECKS PASSED!' : '❌ ISSUES FOUND - SEE DETAILS ABOVE'}\n`);

    return {
      outOfStockProducts,
      productsWithoutImages,
      productsWithoutSlugs,
      allGood
    };

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

verifyAllProducts()
  .then(() => {
    console.log('✅ Verification complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  });
