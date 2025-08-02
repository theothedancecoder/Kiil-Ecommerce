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

async function debugProductsFlow() {
  try {
    // Test the exact query from getAllProductsSimple
    const ALL_PRODUCTS_QUERY = `*[_type == "product"][0...2] {
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

    console.log("Fetching products from Sanity using regular client...");
    const products = await client.fetch(ALL_PRODUCTS_QUERY);

    console.log(`Found ${products?.length || 0} products in Sanity`);
    
    // Check the first product's image structure
    if (products && products.length > 0) {
      const firstProduct = products[0];
      console.log('\n=== FIRST PRODUCT DEBUG ===');
      console.log('Product name:', firstProduct.name);
      console.log('Image type:', typeof firstProduct.image);
      console.log('Image structure:', JSON.stringify(firstProduct.image, null, 2));
      
      // Test JSON serialization/deserialization (what happens in Next.js)
      const serialized = JSON.stringify(firstProduct);
      const deserialized = JSON.parse(serialized);
      
      console.log('\n=== AFTER JSON SERIALIZATION ===');
      console.log('Deserialized image type:', typeof deserialized.image);
      console.log('Deserialized image structure:', JSON.stringify(deserialized.image, null, 2));
      
      // Test what happens when we convert to string
      console.log('\n=== STRING CONVERSION TEST ===');
      console.log('Image as string:', String(firstProduct.image));
      console.log('Image toString():', firstProduct.image.toString());
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

debugProductsFlow();
