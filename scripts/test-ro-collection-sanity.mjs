import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function testRoCollectionProducts() {
  try {
    console.log('Testing RO Collection products in Sanity...');
    
    // First, let's check if there are any products with "ro-collection" category
    const query = `*[_type == "product" && "ro-collection" in categories[]->slug.current] {
      _id,
      name,
      slug,
      categories[]-> {
        title,
        slug
      }
    }`;
    
    const products = await client.fetch(query);
    console.log(`Found ${products.length} RO Collection products in Sanity`);
    
    if (products.length > 0) {
      console.log('First few products:');
      products.slice(0, 3).forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} (${product.slug?.current})`);
        console.log(`   Categories: ${product.categories?.map(cat => cat.title).join(', ')}`);
      });
    } else {
      console.log('No RO Collection products found. Let\'s check what categories exist:');
      
      const categoriesQuery = `*[_type == "category"] {
        title,
        slug
      }`;
      
      const categories = await client.fetch(categoriesQuery);
      console.log('Available categories:');
      categories.forEach(cat => {
        console.log(`- ${cat.title} (${cat.slug?.current})`);
      });
    }
    
  } catch (error) {
    console.error('Error testing RO Collection products:', error);
  }
}

testRoCollectionProducts();
