import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

console.log('🔍 Debugging Louis Poulsen production issues...\n');

async function debugProductionIssues() {
  try {
    console.log('📊 Environment Check:');
    console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
    console.log(`Has Token: ${!!process.env.SANITY_API_TOKEN}`);
    
    // Check what's actually in Sanity
    console.log('\n🔍 Checking Louis Poulsen products in Sanity...');
    const products = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen"] | order(name asc) {
        _id,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          name,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);

    console.log(`Found ${products.length} Louis Poulsen products in Sanity:`);
    
    let productsWithImages = 0;
    let productsWithoutImages = 0;
    
    products.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name} (${product._id})`);
      console.log(`   Slug: ${product.slug?.current || 'NO SLUG'}`);
      
      if (product.image?.asset?.url) {
        console.log(`   ✅ Main Image: ${product.image.asset.url}`);
        productsWithImages++;
      } else {
        console.log(`   ❌ NO MAIN IMAGE`);
        productsWithoutImages++;
      }
      
      if (product.variants && product.variants.length > 0) {
        console.log(`   Variants (${product.variants.length}):`);
        product.variants.forEach(variant => {
          if (variant.image?.asset?.url) {
            console.log(`     ✅ ${variant.name}: ${variant.image.asset.url}`);
          } else {
            console.log(`     ❌ ${variant.name}: NO IMAGE`);
          }
        });
      } else {
        console.log(`   No variants`);
      }
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Products with images: ${productsWithImages}`);
    console.log(`❌ Products without images: ${productsWithoutImages}`);
    console.log(`📦 Total products: ${products.length}`);
    
    // Check if we're falling back to static products
    console.log('\n🔍 Checking if production is using static fallback...');
    
    if (products.length === 0) {
      console.log('❌ NO PRODUCTS FOUND IN SANITY - Production is likely using static fallback');
      console.log('🔧 Need to run the migration script to populate Sanity');
    } else if (productsWithoutImages > 0) {
      console.log('⚠️  Some products missing images - Need to upload missing images');
    } else {
      console.log('✅ All products have images in Sanity');
      console.log('🔍 Issue might be with production environment or CDN caching');
    }
    
    // Test a direct Sanity CDN URL
    if (products.length > 0 && products[0].image?.asset?.url) {
      console.log('\n🌐 Testing Sanity CDN access:');
      console.log(`Sample image URL: ${products[0].image.asset.url}`);
      console.log('Try opening this URL in browser to verify CDN access');
    }

  } catch (error) {
    console.error('❌ Error debugging production issues:', error);
  }
}

// Run the debug
debugProductionIssues().catch(console.error);
