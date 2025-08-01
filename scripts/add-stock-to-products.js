/**
 * Add Stock Quantities to Sanity Products
 * This script adds realistic stock quantities to all existing products in Sanity
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Register ts-node for TypeScript support
try {
  require('ts-node').register({
    transpileOnly: true,
    compilerOptions: {
      module: 'commonjs',
      moduleResolution: 'node',
      target: 'es2017',
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      skipLibCheck: true
    }
  });
} catch (error) {
  console.error('❌ ts-node is required but not installed.');
  process.exit(1);
}

const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
});

// Function to generate realistic stock quantities based on product price
function generateStockQuantity(price, brand) {
  // Higher-end products typically have lower stock
  if (price > 50000) return Math.floor(Math.random() * 5) + 1; // 1-5 units
  if (price > 30000) return Math.floor(Math.random() * 8) + 2; // 2-9 units
  if (price > 15000) return Math.floor(Math.random() * 12) + 3; // 3-14 units
  if (price > 5000) return Math.floor(Math.random() * 20) + 5; // 5-24 units
  return Math.floor(Math.random() * 30) + 10; // 10-39 units for lower-priced items
}

// Function to determine if product should be in stock (90% chance)
function shouldBeInStock() {
  return Math.random() > 0.1; // 90% chance of being in stock
}

async function addStockToProducts() {
  try {
    console.log('🚀 Starting stock quantity update for Sanity products...');

    // Fetch all products
    const products = await client.fetch(`
      *[_type == "product"] {
        _id,
        name,
        price,
        brand,
        stock,
        inStock
      }
    `);

    console.log(`Found ${products.length} products to update`);

    let updatedCount = 0;
    let skippedCount = 0;

    // Update each product with stock information
    for (const product of products) {
      const currentStock = product.stock || 0;
      const currentInStock = product.inStock;

      // Generate new stock quantity
      const newStockQuantity = generateStockQuantity(product.price, product.brand);
      const newInStock = shouldBeInStock() && newStockQuantity > 0;

      try {
        // Update the product
        await client
          .patch(product._id)
          .set({
            stock: newStockQuantity,
            inStock: newInStock
          })
          .commit();

        console.log(`✅ Updated ${product.name}: Stock ${newStockQuantity}, In Stock: ${newInStock}`);
        updatedCount++;

      } catch (error) {
        console.error(`❌ Failed to update ${product.name}:`, error.message);
        skippedCount++;
      }
    }

    console.log('\n🎉 Stock update completed!');
    console.log(`✅ Successfully updated: ${updatedCount} products`);
    console.log(`❌ Skipped due to errors: ${skippedCount} products`);

    // Generate summary statistics
    const updatedProducts = await client.fetch(`
      *[_type == "product"] {
        name,
        brand,
        price,
        stock,
        inStock
      } | order(brand asc, name asc)
    `);

    console.log('\n📊 Stock Summary:');
    console.log(`Total products: ${updatedProducts.length}`);
    console.log(`In stock: ${updatedProducts.filter(p => p.inStock).length}`);
    console.log(`Out of stock: ${updatedProducts.filter(p => !p.inStock).length}`);
    console.log(`Total inventory: ${updatedProducts.reduce((sum, p) => sum + (p.stock || 0), 0)} units`);

    // Show stock by brand
    const stockByBrand = updatedProducts.reduce((acc, product) => {
      if (!acc[product.brand]) {
        acc[product.brand] = { total: 0, inStock: 0, outOfStock: 0 };
      }
      acc[product.brand].total += product.stock || 0;
      if (product.inStock) {
        acc[product.brand].inStock++;
      } else {
        acc[product.brand].outOfStock++;
      }
      return acc;
    }, {});

    console.log('\n📈 Stock by Brand:');
    Object.entries(stockByBrand).forEach(([brand, stats]) => {
      console.log(`${brand}: ${stats.total} units (${stats.inStock} in stock, ${stats.outOfStock} out of stock)`);
    });

    console.log('\n🔄 Next steps:');
    console.log('1. Check the Sanity Studio to verify stock quantities');
    console.log('2. Enable USE_SANITY_PRODUCTS=true to use Sanity data');
    console.log('3. Test stock management in your application');

  } catch (error) {
    console.error('❌ Error updating stock quantities:', error);
    process.exit(1);
  }
}

// Run the script
addStockToProducts();
