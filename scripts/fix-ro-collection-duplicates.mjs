#!/usr/bin/env node

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

async function fixRoCollectionDuplicates() {
  console.log('🔧 Fixing RO Collection duplicate products...\n');

  try {
    // Get all RO Collection products
    const query = `
      *[_type == "product" && "ro-collection" in categories[]->slug.current] | order(name asc) {
        _id,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    `;

    const products = await client.fetch(query);
    console.log(`Found ${products.length} RO Collection products\n`);

    // Group products by slug to find duplicates
    const productsBySlug = {};
    products.forEach(product => {
      const slug = product.slug?.current;
      if (slug) {
        if (!productsBySlug[slug]) {
          productsBySlug[slug] = [];
        }
        productsBySlug[slug].push(product);
      }
    });

    // Process each slug group
    for (const [slug, slugProducts] of Object.entries(productsBySlug)) {
      if (slugProducts.length > 1) {
        console.log(`🔍 Found ${slugProducts.length} products with slug: ${slug}`);
        
        // Find the product with an image (keep this one)
        const productWithImage = slugProducts.find(p => p.image?.asset?.url);
        const productsWithoutImage = slugProducts.filter(p => !p.image?.asset?.url);
        
        if (productWithImage && productsWithoutImage.length > 0) {
          console.log(`✅ Keeping: ${productWithImage.name} (has image)`);
          
          // Delete duplicates without images
          for (const duplicate of productsWithoutImage) {
            console.log(`🗑️  Deleting duplicate: ${duplicate.name} (no image)`);
            await client.delete(duplicate._id);
          }
        } else if (productsWithoutImage.length === slugProducts.length) {
          // All products are missing images, keep the first one
          console.log(`⚠️  All products missing images for slug: ${slug}`);
          console.log(`✅ Keeping: ${slugProducts[0].name}`);
          
          // Delete the rest
          for (let i = 1; i < slugProducts.length; i++) {
            console.log(`🗑️  Deleting duplicate: ${slugProducts[i].name}`);
            await client.delete(slugProducts[i]._id);
          }
        }
        console.log('');
      }
    }

    console.log('🎉 Duplicate cleanup completed!\n');

    // Now check the final state
    const finalProducts = await client.fetch(query);
    console.log(`📊 Final count: ${finalProducts.length} RO Collection products\n`);

    let hasImageCount = 0;
    let missingImageCount = 0;

    finalProducts.forEach((product, index) => {
      const hasImage = product.image?.asset?.url;
      
      if (hasImage) {
        hasImageCount++;
        console.log(`✅ ${index + 1}. ${product.name} (${product.slug?.current})`);
      } else {
        missingImageCount++;
        console.log(`❌ ${index + 1}. ${product.name} (${product.slug?.current}) - NO IMAGE`);
      }
    });

    console.log(`\n📊 Final Summary:`);
    console.log(`✅ Products with images: ${hasImageCount}`);
    console.log(`❌ Products missing images: ${missingImageCount}`);

  } catch (error) {
    console.error('❌ Error fixing RO Collection duplicates:', error.message);
  }
}

// Run the fix
fixRoCollectionDuplicates();
