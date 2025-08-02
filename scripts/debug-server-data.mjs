import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-13',
  useCdn: false,
});

async function debugServerData() {
  try {
    // Test the exact query from getAllProductsSimple
    const ALL_PRODUCTS_QUERY = `*[_type == "product"][0...1] {
      _id,
      name,
      slug,
      image {
        _type,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
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
          _type,
          asset-> {
            _id,
            _type,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt
        },
        color,
        material,
        size,
        price
      },
      lifestyleImages[] {
        _type,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      },
      roomCategory,
      stock,
      inStock
    } | order(name asc)`;

    console.log("Fetching products from Sanity...");
    const products = await client.fetch(ALL_PRODUCTS_QUERY);

    console.log(`Found ${products?.length || 0} products in Sanity`);
    
    if (products && products.length > 0) {
      const firstProduct = products[0];
      console.log('\n=== SERVER DATA DEBUG ===');
      console.log('Product name:', firstProduct.name);
      console.log('Image object:', firstProduct.image);
      console.log('Image type:', typeof firstProduct.image);
      console.log('Image JSON:', JSON.stringify(firstProduct.image, null, 2));
      
      // Test JSON serialization (what Next.js does)
      console.log('\n=== JSON SERIALIZATION TEST ===');
      const serialized = JSON.stringify(products);
      const deserialized = JSON.parse(serialized);
      
      console.log('After serialization - Image type:', typeof deserialized[0].image);
      console.log('After serialization - Image object:', deserialized[0].image);
      
      // Test what happens when we pass this through a component prop
      console.log('\n=== COMPONENT PROP SIMULATION ===');
      function simulateComponentProp(product) {
        console.log('In component - product.image type:', typeof product.image);
        console.log('In component - product.image value:', product.image);
        
        // This is what happens in ProductThumbWithStock
        if (product.image) {
          console.log('Image exists, calling getImageUrl...');
          // Simulate what getImageUrl would receive
          console.log('getImageUrl would receive:', typeof product.image, product.image);
        }
      }
      
      simulateComponentProp(deserialized[0]);
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

debugServerData();
