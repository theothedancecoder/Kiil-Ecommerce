import { createClient } from '@sanity/client';

// Create a read-only client first to check current state
const client = createClient({
  projectId: 'hi84i3u4',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
});

async function checkCurrentState() {
  try {
    console.log('Checking current product-category relationships...');
    
    // Get all categories with their products
    const query = `{
      "categories": *[_type == "category"] {
        _id,
        title,
        "slug": slug.current,
        "products": *[_type == "product" && references(^._id)] {
          _id,
          name
        }
      },
      "products": *[_type == "product"] {
        _id,
        name,
        "categories": categories[]->{ _id, title, "slug": slug.current }
      }
    }`;
    
    const result = await client.fetch(query);
    
    console.log('\n=== Current Category Assignments ===\n');
    
    result.categories.forEach(category => {
      console.log(`\nCategory: ${category.title} (${category.slug})`);
      console.log('Products in this category:');
      if (category.products.length === 0) {
        console.log('- No products');
      } else {
        category.products.forEach(product => {
          console.log(`- ${product.name}`);
        });
      }
    });
    
    console.log('\n=== Current Product Assignments ===\n');
    
    result.products.forEach(product => {
      console.log(`\nProduct: ${product.name}`);
      console.log('Assigned to categories:');
      if (!product.categories || product.categories.length === 0) {
        console.log('- No categories');
      } else {
        product.categories.forEach(category => {
          console.log(`- ${category.title} (${category.slug})`);
        });
      }
    });
    
  } catch (error) {
    console.error('Error checking product categories:', error);
    if (error.response) {
      console.log('Error details:', error.response.body);
    }
  }
}

checkCurrentState();
