const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'hi84i3u4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
});

async function debugProducts() {
  try {
    console.log('=== DEBUGGING PRODUCT ISSUES ===\n');
    
    // Get total count
    const totalCount = await client.fetch('count(*[_type == "product"])');
    console.log(`Total products in Sanity: ${totalCount}\n`);
    
    // Get first 10 products with detailed info
    const products = await client.fetch(`
      *[_type == "product"] | order(name asc) [0...10] {
        _id,
        name,
        slug,
        brand,
        image,
        href
      }
    `);
    
    console.log('=== PRODUCT ANALYSIS ===');
    let hasSlugCount = 0;
    let hasImageCount = 0;
    let hasHrefCount = 0;
    
    products.forEach((product, i) => {
      console.log(`\n${i + 1}. ${product.name}`);
      console.log(`   ID: ${product._id}`);
      
      if (product.slug?.current) {
        console.log(`   Slug: ${product.slug.current} ✓`);
        hasSlugCount++;
      } else {
        console.log(`   Slug: MISSING ❌`);
      }
      
      if (product.image) {
        console.log(`   Image: EXISTS ✓`);
        hasImageCount++;
      } else {
        console.log(`   Image: MISSING ❌`);
      }
      
      if (product.href) {
        console.log(`   Href: ${product.href} ✓`);
        hasHrefCount++;
      } else {
        console.log(`   Href: MISSING ❌`);
      }
      
      console.log(`   Brand: ${product.brand || 'NO BRAND'}`);
    });
    
    console.log('\n=== SUMMARY ===');
    console.log(`Products with slugs: ${hasSlugCount}/${products.length}`);
    console.log(`Products with images: ${hasImageCount}/${products.length}`);
    console.log(`Products with href: ${hasHrefCount}/${products.length}`);
    
    // Check if products have different structures
    console.log('\n=== CHECKING FOR DIFFERENT PRODUCT STRUCTURES ===');
    const allFields = await client.fetch(`
      *[_type == "product"] [0...5] {
        _id,
        name,
        slug,
        brand,
        image,
        href,
        staticImage,
        staticHref,
        staticBrand
      }
    `);
    
    allFields.forEach((product, i) => {
      console.log(`\nProduct ${i + 1}: ${product.name}`);
      Object.keys(product).forEach(key => {
        if (product[key] && key !== '_id' && key !== 'name') {
          console.log(`   ${key}: ${typeof product[key] === 'object' ? 'OBJECT' : product[key]}`);
        }
      });
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

debugProducts();
