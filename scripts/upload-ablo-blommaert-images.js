/**
 * Script to upload Ablo Blommaert images to Sanity and update products
 * Run with: node scripts/upload-ablo-blommaert-images.js
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

const fs = require('fs');
const path = require('path');

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

// Ablo Blommaert product data with image paths
const abloBlommaertProducts = [
  {
    name: 'Vogue January 1927 B615',
    imagePath: 'public/Ablo Blommaert -Vogue/Vogue January 1927 B615 kr 3 200.00.webp',
    productCode: 'B615',
    productId: 'ablo-blommaert-b615'
  },
  {
    name: 'Vogue July 1926 B609',
    imagePath: 'public/Ablo Blommaert -Vogue/Vogue July 1926 B609 kr 3 200.00.webp',
    productCode: 'B609',
    productId: 'ablo-blommaert-b609'
  },
  {
    name: 'Vogue June 1922 B616',
    imagePath: 'public/Ablo Blommaert -Vogue/Vogue June 1922 B616 kr 3 200.00  Vogue June 1922 B616  Vogue June 1922  B616  65×80 CM  Hvit ramme.webp',
    productCode: 'B616',
    productId: 'ablo-blommaert-b616'
  },
  {
    name: 'Vogue June 1930 B608',
    imagePath: 'public/Ablo Blommaert -Vogue/Vogue June 1930 B608 kr 3 200.00  Vogue June 1930 B608  Vogue June 1930  B608  65×80 CM  Hvit ramme.webp',
    productCode: 'B608',
    productId: 'ablo-blommaert-b608'
  },
  {
    name: 'Vogue May 1927 B607',
    imagePath: 'public/Ablo Blommaert -Vogue/Vogue May 1927 B607 kr 3 200.00  Vogue May 1927 B607   Vogue May 1927  B607  65×80 CM  Hvit ramme.webp',
    productCode: 'B607',
    productId: 'ablo-blommaert-b607'
  },
  {
    name: 'Vogue May 1929 B614',
    imagePath: 'public/Ablo Blommaert -Vogue/Vogue May 1929 B614 kr 3 200.00.webp',
    productCode: 'B614',
    productId: 'ablo-blommaert-b614'
  },
  {
    name: 'Vogue October 1925 B613',
    imagePath: 'public/Ablo Blommaert -Vogue/Vogue October 1925 B613 kr 3 200.00.webp',
    productCode: 'B613',
    productId: 'ablo-blommaert-b613'
  },
  {
    name: 'Vogue September 1926 B610',
    imagePath: 'public/Ablo Blommaert -Vogue/Vogue September 1926 B610 kr 3 200.00.webp',
    productCode: 'B610',
    productId: 'ablo-blommaert-b610'
  }
];

// Upload image to Sanity
async function uploadImageToSanity(imagePath, filename) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Image file not found: ${imagePath}`);
      return null;
    }

    console.log(`📸 Uploading image: ${filename}`);
    
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    
    console.log(`✅ Uploaded image: ${filename} (ID: ${asset._id})`);
    return asset;
  } catch (error) {
    console.error(`❌ Error uploading image ${filename}:`, error);
    return null;
  }
}

// Update product with image reference
async function updateProductWithImage(productId, imageAsset) {
  try {
    const product = await client.getDocument(productId);
    if (!product) {
      console.error(`❌ Product not found: ${productId}`);
      return false;
    }

    const updatedProduct = {
      ...product,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      }
    };

    await client.createOrReplace(updatedProduct);
    console.log(`✅ Updated product with image: ${product.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating product ${productId}:`, error);
    return false;
  }
}

// Main function to upload images and update products
async function uploadAbloBlommaertImages() {
  try {
    console.log('🖼️  Uploading Ablo Blommaert images to Sanity...');
    console.log(`Found ${abloBlommaertProducts.length} products to update`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const productData of abloBlommaertProducts) {
      try {
        console.log(`\n📦 Processing: ${productData.name}`);
        
        // Upload image to Sanity
        const imageAsset = await uploadImageToSanity(
          productData.imagePath, 
          `${productData.productCode}.webp`
        );
        
        if (!imageAsset) {
          console.error(`❌ Failed to upload image for ${productData.name}`);
          errorCount++;
          continue;
        }
        
        // Update product with image reference
        const updated = await updateProductWithImage(productData.productId, imageAsset);
        
        if (updated) {
          successCount++;
        } else {
          errorCount++;
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${productData.name}:`, error);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Image upload completed!');
    console.log(`✅ Successfully updated: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('\n🔄 Next steps:');
      console.log('1. Refresh the wall art page to see the images');
      console.log('2. Verify all thumbnails are displaying correctly');
      console.log('3. Test the overall user experience');
    }
    
  } catch (error) {
    console.error('💥 Failed to upload images:', error);
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
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  checkEnvironment();
  uploadAbloBlommaertImages();
}

module.exports = { uploadAbloBlommaertImages };
