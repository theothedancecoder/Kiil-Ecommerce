import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkMissingProducts() {
  try {
    console.log('🔍 Checking Louis Poulsen products in Sanity...\n');

    // Get all Louis Poulsen products from Sanity
    const sanityProducts = await client.fetch(
      `*[_type == "product" && brand == "Louis Poulsen"] {
        _id,
        name,
        slug,
        price,
        image
      }`
    );

    console.log(`✅ Found ${sanityProducts.length} Louis Poulsen products in Sanity:\n`);
    sanityProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (slug: ${product.slug?.current || 'NO SLUG'})`);
    });

    // Get all product directories from public folder
    const louisPoulsenDir = 'public/Louis-Poulsen';
    const productDirs = fs.readdirSync(louisPoulsenDir)
      .filter(item => {
        const fullPath = path.join(louisPoulsenDir, item);
        return fs.statSync(fullPath).isDirectory();
      });

    console.log(`\n📁 Found ${productDirs.length} product directories in public/Louis-Poulsen:\n`);
    productDirs.forEach((dir, index) => {
      console.log(`${index + 1}. ${dir}`);
    });

    // Compare and find missing products
    const sanityProductNames = sanityProducts.map(p => 
      p.name?.toLowerCase().replace(/[^a-z0-9]/g, '')
    );

    const missingProducts = productDirs.filter(dir => {
      const dirNormalized = dir.toLowerCase().replace(/[^a-z0-9]/g, '');
      return !sanityProductNames.some(name => 
        name?.includes(dirNormalized.substring(0, 10)) || 
        dirNormalized.includes(name?.substring(0, 10))
      );
    });

    console.log(`\n❌ Missing products (${missingProducts.length}):\n`);
    missingProducts.forEach((dir, index) => {
      console.log(`${index + 1}. ${dir}`);
      
      // Check if images exist
      const productPath = path.join(louisPoulsenDir, dir);
      const files = fs.readdirSync(productPath);
      const imageFiles = files.filter(f => 
        f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')
      );
      console.log(`   Images: ${imageFiles.length} files`);
    });

    // Check for products with missing categories
    console.log('\n🏷️  Checking product categories...\n');
    const productsWithoutCategories = sanityProducts.filter(p => !p.categories || p.categories.length === 0);
    if (productsWithoutCategories.length > 0) {
      console.log(`⚠️  ${productsWithoutCategories.length} products without categories:`);
      productsWithoutCategories.forEach(p => console.log(`   - ${p.name}`));
    }

    return {
      sanityProducts,
      productDirs,
      missingProducts
    };

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

checkMissingProducts()
  .then(() => {
    console.log('\n✅ Check complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });
