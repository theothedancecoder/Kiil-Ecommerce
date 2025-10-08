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

async function findProductsWithMissingImages() {
  try {
    console.log('🔍 Finding all products with missing images...\n');

    // Get all products
    const allProducts = await client.fetch(
      `*[_type == "product"] {
        _id,
        name,
        slug,
        brand,
        image,
        variants
      } | order(brand asc, name asc)`
    );

    console.log(`Total products in Sanity: ${allProducts.length}\n`);

    // Filter products without images
    const productsWithoutImages = allProducts.filter(p => !p.image);
    
    console.log(`\n❌ Products without main images: ${productsWithoutImages.length}\n`);
    
    // Group by brand
    const byBrand = {};
    productsWithoutImages.forEach(p => {
      const brand = p.brand || 'Unknown';
      if (!byBrand[brand]) {
        byBrand[brand] = [];
      }
      byBrand[brand].push(p);
    });

    // Display by brand
    Object.keys(byBrand).sort().forEach(brand => {
      console.log(`\n📦 ${brand} (${byBrand[brand].length} products):`);
      byBrand[brand].forEach((p, index) => {
        console.log(`   ${index + 1}. ${p.name}`);
        console.log(`      Slug: ${p.slug?.current || 'NO SLUG'}`);
        console.log(`      Variants: ${p.variants?.length || 0}`);
      });
    });

    // Also check for products with images but no variants
    const productsWithoutVariants = allProducts.filter(p => 
      p.image && (!p.variants || p.variants.length === 0)
    );

    console.log(`\n\n⚠️  Products with images but no variants: ${productsWithoutVariants.length}\n`);
    
    if (productsWithoutVariants.length > 0 && productsWithoutVariants.length < 20) {
      productsWithoutVariants.forEach((p, index) => {
        console.log(`${index + 1}. ${p.brand} - ${p.name} (${p.slug?.current})`);
      });
    }

    return {
      total: allProducts.length,
      withoutImages: productsWithoutImages.length,
      withoutVariants: productsWithoutVariants.length,
      byBrand
    };

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

findProductsWithMissingImages()
  .then(() => {
    console.log('\n✅ Scan complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  });
