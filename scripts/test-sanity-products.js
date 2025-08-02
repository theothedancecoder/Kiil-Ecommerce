const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-13',
  useCdn: false,
});

async function testSanityProducts() {
  try {
    console.log('🔍 Testing Sanity Products Configuration...\n');
    
    // Check environment variable
    console.log('📋 Environment Check:');
    console.log(`   USE_SANITY_PRODUCTS: ${process.env.USE_SANITY_PRODUCTS || 'NOT SET'}`);
    console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✅ Set' : '❌ Missing'}`);
    console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'Not set'}`);
    
    if (process.env.USE_SANITY_PRODUCTS !== 'true') {
      console.log('\n❌ USE_SANITY_PRODUCTS is not set to "true"');
      console.log('   Run: node scripts/enable-sanity-products.js');
      return;
    }
    
    // Test products query
    console.log('\n🔍 Testing Products Query:');
    const productsQuery = `*[_type == "product"] {
      _id,
      name,
      slug,
      image {
        ...,
        asset->
      },
      description,
      price,
      brand,
      categories[]->{
        _id,
        title,
        slug
      },
      href,
      variants[] {
        name,
        image {
          ...,
          asset->
        },
        color,
        material,
        size,
        price
      },
      lifestyleImages[] {
        ...,
        asset->
      },
      roomCategory,
      stock,
      inStock
    } | order(name asc)`;
    
    const products = await client.fetch(productsQuery);
    
    if (products && products.length > 0) {
      console.log(`   ✅ Found ${products.length} products in Sanity`);
      
      // Show first few products
      console.log('\n📦 Sample Products:');
      products.slice(0, 5).forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name || 'Unnamed Product'}`);
        console.log(`      Brand: ${product.brand || 'No brand'}`);
        console.log(`      Price: ${product.price ? `$${product.price}` : 'No price'}`);
        console.log(`      Slug: ${product.slug?.current || 'No slug'}`);
        console.log(`      Categories: ${product.categories?.map(cat => cat.title).join(', ') || 'None'}`);
        console.log('');
      });
      
      // Test categories
      console.log('🏷️  Testing Categories Query:');
      const categoriesQuery = `*[_type == "category"] {
        _id,
        title,
        slug,
        description
      } | order(title asc)`;
      
      const categories = await client.fetch(categoriesQuery);
      console.log(`   ✅ Found ${categories.length} categories in Sanity`);
      
      if (categories.length > 0) {
        console.log('\n📂 Available Categories:');
        categories.forEach((category, index) => {
          console.log(`   ${index + 1}. ${category.title || 'Unnamed Category'}`);
          console.log(`      Slug: ${category.slug?.current || 'No slug'}`);
        });
      }
      
      console.log('\n🎉 Sanity Products Test Complete!');
      console.log('✅ Your /products page should now load products from Sanity');
      console.log('🌐 Visit: http://localhost:3000/products');
      
    } else {
      console.log('   ❌ No products found in Sanity');
      console.log('\n🔧 Possible Issues:');
      console.log('1. No products have been created in Sanity Studio');
      console.log('2. Products exist but are not published');
      console.log('3. Product schema is different than expected');
      console.log('\n💡 Solutions:');
      console.log('1. Visit your Sanity Studio and create some products');
      console.log('2. Check that products are published (not drafts)');
      console.log('3. Verify the product schema matches the query');
    }
    
  } catch (error) {
    console.error('❌ Error testing Sanity products:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your Sanity credentials in .env.local');
    console.log('2. Verify your Sanity project is accessible');
    console.log('3. Ensure the product schema exists in Sanity');
  }
}

testSanityProducts();
