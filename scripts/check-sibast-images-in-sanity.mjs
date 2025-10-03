import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hi84i3u4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function checkSibastImages() {
  try {
    console.log('🔍 Checking Sibast products in Sanity...\n');
    
    const products = await client.fetch(`
      *[_type == "product" && (brand == "Sibast" || brand == "Sibast Furniture")] {
        _id,
        name,
        slug,
        brand,
        "mainImage": image.asset->url,
        "variantCount": count(variants),
        "variants": variants[] {
          name,
          "imageUrl": image.asset->url,
          material,
          size
        }
      }
    `);

    console.log(`Found ${products.length} Sibast products\n`);

    products.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name}`);
      console.log(`   Slug: ${product.slug?.current || 'NO SLUG'}`);
      console.log(`   Brand: ${product.brand}`);
      console.log(`   Main Image: ${product.mainImage ? '✅ YES' : '❌ NO'}`);
      if (product.mainImage) {
        console.log(`   Main Image URL: ${product.mainImage}`);
      }
      console.log(`   Variants: ${product.variantCount || 0}`);
      
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant, vIndex) => {
          console.log(`     ${vIndex + 1}. ${variant.name || 'Unnamed'}`);
          console.log(`        Material: ${variant.material || 'N/A'}`);
          console.log(`        Image: ${variant.imageUrl ? '✅ YES' : '❌ NO'}`);
          if (variant.imageUrl) {
            console.log(`        URL: ${variant.imageUrl}`);
          }
        });
      }
    });

    // Summary
    const productsWithImages = products.filter(p => p.mainImage).length;
    const productsWithoutImages = products.length - productsWithImages;
    
    console.log(`\n\n📊 SUMMARY:`);
    console.log(`   Total Products: ${products.length}`);
    console.log(`   With Main Images: ${productsWithImages}`);
    console.log(`   Without Main Images: ${productsWithoutImages}`);
    
    if (productsWithoutImages > 0) {
      console.log(`\n⚠️  WARNING: ${productsWithoutImages} products don't have images in Sanity!`);
      console.log(`   These will show placeholder images on the site.`);
    }

  } catch (error) {
    console.error('❌ Error checking Sibast images:', error);
  }
}

checkSibastImages();
