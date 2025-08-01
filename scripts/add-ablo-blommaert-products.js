/**
 * Script to add Ablo Blommaert wall art products to Sanity
 * Run with: node scripts/add-ablo-blommaert-products.js
 */

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client. Please install @sanity/client:');
    console.error('npm install @sanity/client');
    process.exit(1);
  }
}

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-06-13',
});

// Helper function to create slug from string
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Ablo Blommaert product data based on the files found in public folder
const abloBlommaertProducts = [
  {
    name: 'Vogue January 1927 B615',
    imagePath: '/Ablo Blommaert -Vogue/Vogue January 1927 B615 kr 3 200.00.webp',
    description: 'Vintage Vogue magazine cover from January 1927. A stunning piece of fashion history that brings timeless elegance to any wall. 65×80 CM with white frame.',
    date: 'January 1927',
    productCode: 'B615'
  },
  {
    name: 'Vogue July 1926 B609',
    imagePath: '/Ablo Blommaert -Vogue/Vogue July 1926 B609 kr 3 200.00.webp',
    description: 'Vintage Vogue magazine cover from July 1926. A captivating piece of fashion history perfect for sophisticated interiors. 65×80 CM with white frame.',
    date: 'July 1926',
    productCode: 'B609'
  },
  {
    name: 'Vogue June 1922 B616',
    imagePath: '/Ablo Blommaert -Vogue/Vogue June 1922 B616 kr 3 200.00  Vogue June 1922 B616  Vogue June 1922  B616  65×80 CM  Hvit ramme.webp',
    description: 'Vintage Vogue magazine cover from June 1922. An exquisite piece of early fashion journalism that adds character to any space. 65×80 CM with white frame.',
    date: 'June 1922',
    productCode: 'B616'
  },
  {
    name: 'Vogue June 1930 B608',
    imagePath: '/Ablo Blommaert -Vogue/Vogue June 1930 B608 kr 3 200.00  Vogue June 1930 B608  Vogue June 1930  B608  65×80 CM  Hvit ramme.webp',
    description: 'Vintage Vogue magazine cover from June 1930. A beautiful representation of 1930s fashion aesthetics. 65×80 CM with white frame.',
    date: 'June 1930',
    productCode: 'B608'
  },
  {
    name: 'Vogue May 1927 B607',
    imagePath: '/Ablo Blommaert -Vogue/Vogue May 1927 B607 kr 3 200.00  Vogue May 1927 B607   Vogue May 1927  B607  65×80 CM  Hvit ramme.webp',
    description: 'Vintage Vogue magazine cover from May 1927. A striking piece that captures the essence of 1920s fashion and style. 65×80 CM with white frame.',
    date: 'May 1927',
    productCode: 'B607'
  },
  {
    name: 'Vogue May 1929 B614',
    imagePath: '/Ablo Blommaert -Vogue/Vogue May 1929 B614 kr 3 200.00.webp',
    description: 'Vintage Vogue magazine cover from May 1929. A sophisticated piece that embodies the glamour of the late 1920s. 65×80 CM with white frame.',
    date: 'May 1929',
    productCode: 'B614'
  },
  {
    name: 'Vogue October 1925 B613',
    imagePath: '/Ablo Blommaert -Vogue/Vogue October 1925 B613 kr 3 200.00.webp',
    description: 'Vintage Vogue magazine cover from October 1925. A remarkable piece from the golden age of fashion illustration. 65×80 CM with white frame.',
    date: 'October 1925',
    productCode: 'B613'
  },
  {
    name: 'Vogue September 1926 B610',
    imagePath: '/Ablo Blommaert -Vogue/Vogue September 1926 B610 kr 3 200.00.webp',
    description: 'Vintage Vogue magazine cover from September 1926. An elegant piece that showcases the artistic vision of 1920s fashion. 65×80 CM with white frame.',
    date: 'September 1926',
    productCode: 'B610'
  }
];

// Create or ensure wall-art category exists
async function createWallArtCategory() {
  console.log('Creating wall-art category...');
  
  const wallArtCategory = {
    _type: 'category',
    _id: 'category-wall-art',
    title: 'Wall Art',
    slug: {
      _type: 'slug',
      current: 'wall-art'
    },
    description: 'Beautiful wall art pieces including vintage prints, posters, and decorative artwork to enhance your interior spaces.'
  };
  
  try {
    await client.createOrReplace(wallArtCategory);
    console.log('✅ Created/updated wall-art category');
    return wallArtCategory;
  } catch (error) {
    console.error('❌ Error creating wall-art category:', error);
    throw error;
  }
}

// Transform Ablo Blommaert product to Sanity format
function transformAbloProduct(productData, wallArtCategory) {
  const productId = `ablo-blommaert-${createSlug(productData.productCode)}`;
  
  return {
    _type: 'product',
    _id: productId,
    name: productData.name,
    slug: {
      _type: 'slug',
      current: createSlug(productData.name)
    },
    description: productData.description,
    price: 3200, // All Ablo Blommaert pieces are 3,200 kr
    brand: 'Ablo Blommaert',
    categories: [{
      _type: 'reference',
      _ref: wallArtCategory._id
    }],
    href: `/ablo-blommaert/${createSlug(productData.name)}`,
    roomCategory: 'living-room', // Wall art typically goes in living spaces
    stock: 5, // Assume limited stock for art pieces
    inStock: true,
    
    // Add custom fields for the vintage prints
    variants: [{
      _type: 'object',
      name: 'Framed Print',
      size: '65×80 CM',
      material: 'Print with white frame',
      color: 'Original vintage colors'
    }],
    
    // Note: In a real implementation, you'd upload the actual image files to Sanity
    // For now, we'll reference the public folder path
    // image: null, // Would be uploaded separately
    
    // Additional metadata
    lifestyleImages: []
  };
}

// Main function to add Ablo Blommaert products
async function addAbloBlommaertProducts() {
  try {
    console.log('🎨 Adding Ablo Blommaert wall art products to Sanity...');
    console.log(`Found ${abloBlommaertProducts.length} products to add`);
    
    // Step 1: Create wall-art category
    const wallArtCategory = await createWallArtCategory();
    
    // Step 2: Transform and upload products
    console.log('\n🖼️  Creating Ablo Blommaert products...');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const productData of abloBlommaertProducts) {
      try {
        const sanityProduct = transformAbloProduct(productData, wallArtCategory);
        await client.createOrReplace(sanityProduct);
        console.log(`✅ Created product: ${sanityProduct.name}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error creating product ${productData.name}:`, error);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Ablo Blommaert products added!');
    console.log(`✅ Successfully added: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('\n🔄 Next steps:');
      console.log('1. Visit /studio to see the products in Sanity');
      console.log('2. Navigate to /interior/home-accessories/wall-art to see them on the site');
      console.log('3. Upload actual images to Sanity assets (optional)');
      console.log('4. Test the product pages and functionality');
    }
    
  } catch (error) {
    console.error('💥 Failed to add Ablo Blommaert products:', error);
    process.exit(1);
  }
}

// Check environment variables
function checkEnvironment() {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN'
  ];
  
  const missing = required.filter(env => !process.env[env]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(env => console.error(`  - ${env}`));
    console.error('\nPlease set these in your .env.local file');
    console.error('You can get the SANITY_API_TOKEN from https://sanity.io/manage');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  checkEnvironment();
  addAbloBlommaertProducts();
}

module.exports = { addAbloBlommaertProducts };
