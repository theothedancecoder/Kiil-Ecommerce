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

async function checkMissingImages() {
  try {
    console.log('🔍 Checking for products with missing images on møbler page...\n');

    // Get all furniture products (products with furniture-related categories)
    const furnitureCategories = [
      'Seating', 'Chair', 'Sofa', 'Tables', 'Furniture', 
      'Storage', 'Desks', 'Footstools', 'Benches', 'Lighting'
    ];

    const products = await client.fetch(
      `*[_type == "product" && count(categories[@->title in $categories]) > 0] | order(name asc) {
        _id,
        name,
        brand,
        slug,
        price,
        image {
          asset-> {
            _id,
            url
          }
        },
        categories[]-> {
          title
        }
      }`,
      { categories: furnitureCategories }
    );

    console.log(`✅ Found ${products.length} furniture products\n`);

    // Check for products without images
    const productsWithoutImages = products.filter(p => !p.image || !p.image.asset);
    
    console.log(`\n❌ Products WITHOUT main images (${productsWithoutImages.length}):\n`);
    productsWithoutImages.forEach((product, index) => {
      console.log(`${index + 1}. ${product.brand} - ${product.name}`);
      console.log(`   Slug: ${product.slug?.current || 'NO SLUG'}`);
      console.log(`   Categories: ${product.categories?.map(c => c.title).join(', ') || 'NONE'}`);
      console.log(`   ID: ${product._id}\n`);
    });

    // Check for products with broken image URLs
    const productsWithImages = products.filter(p => p.image && p.image.asset);
    const productsWithBrokenUrls = productsWithImages.filter(p => 
      !p.image.asset.url || p.image.asset.url.includes('undefined') || p.image.asset.url.includes('null')
    );

    if (productsWithBrokenUrls.length > 0) {
      console.log(`\n⚠️  Products with BROKEN image URLs (${productsWithBrokenUrls.length}):\n`);
      productsWithBrokenUrls.forEach((product, index) => {
        console.log(`${index + 1}. ${product.brand} - ${product.name}`);
        console.log(`   URL: ${product.image.asset.url}`);
        console.log(`   ID: ${product._id}\n`);
      });
    }

    // Summary by brand
    console.log('\n📊 Products without images by brand:\n');
    const byBrand = {};
    productsWithoutImages.forEach(p => {
      const brand = p.brand || 'Unknown';
      byBrand[brand] = (byBrand[brand] || 0) + 1;
    });

    Object.entries(byBrand).forEach(([brand, count]) => {
      console.log(`   ${brand}: ${count} products`);
    });

    return {
      total: products.length,
      withoutImages: productsWithoutImages.length,
      withBrokenUrls: productsWithBrokenUrls.length
    };

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

checkMissingImages()
  .then((stats) => {
    console.log('\n' + '='.repeat(60));
    console.log(`\n📈 Summary:`);
    console.log(`   Total furniture products: ${stats.total}`);
    console.log(`   Products without images: ${stats.withoutImages}`);
    console.log(`   Products with broken URLs: ${stats.withBrokenUrls}`);
    console.log(`   Products with valid images: ${stats.total - stats.withoutImages - stats.withBrokenUrls}`);
    console.log('\n✅ Check complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });
