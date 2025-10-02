import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔍 Debugging Sibast Production Issue...\n');

// Initialize Sanity client with production settings
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true, // Use CDN like production does
  apiVersion: '2024-01-01',
});

async function debugSibastProduction() {
  try {
    console.log('Environment Check:');
    console.log(`  Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`  Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
    console.log(`  Using CDN: true (production mode)\n`);

    // Fetch products exactly as the frontend does
    const products = await client.fetch(`
      *[_type == "product" && brand == "Sibast Furniture"] | order(name asc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        slug,
        description,
        price,
        brand,
        image {
          asset-> {
            _id,
            url
          }
        },
        lifestyleImages[] {
          asset-> {
            _id,
            url
          }
        },
        categories[]-> {
          _id,
          title,
          slug
        },
        variants[] {
          _type,
          name,
          price,
          material,
          color,
          size,
          image {
            asset-> {
              _id,
              url
            }
          }
        },
        stock,
        inStock,
        href,
        designer,
        features,
        specifications[] {
          label,
          value
        },
        relatedProducts[]-> {
          _id,
          name,
          slug,
          price,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);

    console.log(`✅ Found ${products.length} Sibast products\n`);

    if (products.length === 0) {
      console.log('❌ NO PRODUCTS FOUND!');
      console.log('This could mean:');
      console.log('  1. Products are not published in Sanity');
      console.log('  2. Brand name mismatch (check exact spelling)');
      console.log('  3. Dataset issue\n');
      return;
    }

    // Check each product in detail
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   ID: ${product._id}`);
      console.log(`   Slug: ${product.slug?.current || 'MISSING'}`);
      console.log(`   Brand: ${product.brand}`);
      
      // Check image structure
      if (product.image) {
        console.log(`   Image Object: ${JSON.stringify(product.image, null, 2)}`);
        if (product.image.asset) {
          console.log(`   ✅ Image Asset ID: ${product.image.asset._id}`);
          console.log(`   ✅ Image URL: ${product.image.asset.url}`);
        } else {
          console.log(`   ❌ Image asset is NULL or undefined`);
        }
      } else {
        console.log(`   ❌ No image object at all`);
      }
      
      console.log('');
    });

    // Test image URL generation
    console.log('\n📸 Testing Image URL Generation:');
    const firstProduct = products[0];
    if (firstProduct?.image?.asset) {
      const imageUrl = firstProduct.image.asset.url;
      console.log(`  Original URL: ${imageUrl}`);
      
      // Test if URL is accessible
      try {
        const response = await fetch(imageUrl);
        console.log(`  URL Status: ${response.status} ${response.statusText}`);
        console.log(`  Content-Type: ${response.headers.get('content-type')}`);
      } catch (error) {
        console.log(`  ❌ Error fetching image: ${error.message}`);
      }
    }

    // Check for brand name variations
    console.log('\n🔍 Checking for brand name variations:');
    const allBrands = await client.fetch(`
      *[_type == "product"] | order(brand asc) {
        "brand": brand
      }
    `);
    const uniqueBrands = [...new Set(allBrands.map(p => p.brand).filter(Boolean))];
    console.log('  All brands in database:');
    uniqueBrands.forEach(brand => {
      const count = allBrands.filter(p => p.brand === brand).length;
      console.log(`    - "${brand}" (${count} products)`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

debugSibastProduction().catch(console.error);
