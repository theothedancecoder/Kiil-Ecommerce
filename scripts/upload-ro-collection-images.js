/**
 * Script to upload RO Collection images to Sanity and update product documents
 * Run with: node scripts/upload-ro-collection-images.js
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

// Register ts-node to handle TypeScript imports
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
  console.error('Please install it with: npm install --save-dev ts-node');
  process.exit(1);
}

// Import RO Collection data
let roCollectionTablesData, roCollectionChairsData;
try {
  roCollectionTablesData = require('../lib/roCollectionTablesData.ts').roCollectionTablesData;
  roCollectionChairsData = require('../lib/roCollectionChairsData.ts').roCollectionChairsData;
} catch (error) {
  console.error('❌ Could not import RO Collection data.');
  console.error('Error:', error.message);
  process.exit(1);
}

// Combine all RO Collection products
const allRoProducts = [...roCollectionTablesData, ...roCollectionChairsData];

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-06-13',
});

// Helper function to upload image from file path
async function uploadImageToSanity(imagePath, filename) {
  try {
    // Convert relative path to absolute path
    const publicDir = path.join(process.cwd(), 'public');
    const fullImagePath = path.join(publicDir, imagePath.replace(/^\//, ''));
    
    // Check if file exists
    if (!fs.existsSync(fullImagePath)) {
      console.warn(`⚠️  Image file not found: ${fullImagePath}`);
      return null;
    }
    
    // Read the image file
    const imageBuffer = fs.readFileSync(fullImagePath);
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename || path.basename(imagePath),
    });
    
    console.log(`✅ Uploaded image: ${filename || path.basename(imagePath)}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

// Upload images for a single product
async function uploadProductImages(product) {
  const images = {
    mainImage: null,
    lifestyleImages: []
  };
  
  // Upload main product image
  if (product.image) {
    const mainImageRef = await uploadImageToSanity(
      product.image, 
      `${product.slug.current}-main.webp`
    );
    if (mainImageRef) {
      images.mainImage = mainImageRef;
    }
  }
  
  // Upload lifestyle images
  if (product.lifestyleImages && Array.isArray(product.lifestyleImages)) {
    for (let i = 0; i < product.lifestyleImages.length; i++) {
      const lifestyleImagePath = product.lifestyleImages[i];
      const lifestyleImageRef = await uploadImageToSanity(
        lifestyleImagePath,
        `${product.slug.current}-lifestyle-${i + 1}.webp`
      );
      if (lifestyleImageRef) {
        images.lifestyleImages.push(lifestyleImageRef);
      }
    }
  }
  
  // Upload variant images
  const variantImages = [];
  if (product.variants && Array.isArray(product.variants)) {
    for (let i = 0; i < product.variants.length; i++) {
      const variant = product.variants[i];
      if (variant.image) {
        const variantImageRef = await uploadImageToSanity(
          variant.image,
          `${product.slug.current}-variant-${i + 1}.webp`
        );
        if (variantImageRef) {
          variantImages.push({
            variantIndex: i,
            image: variantImageRef
          });
        }
      }
    }
  }
  
  return { ...images, variantImages };
}

// Update product document with image references
async function updateProductWithImages(productId, images) {
  try {
    const sanityProductId = `ro-${productId}`;
    
    // Prepare the update object
    const updateData = {};
    
    if (images.mainImage) {
      updateData.image = images.mainImage;
    }
    
    if (images.lifestyleImages.length > 0) {
      updateData.lifestyleImages = images.lifestyleImages;
    }
    
    // Update variants with images
    if (images.variantImages.length > 0) {
      // First, get the current product to preserve existing variant data
      const currentProduct = await client.getDocument(sanityProductId);
      if (currentProduct && currentProduct.variants) {
        const updatedVariants = currentProduct.variants.map((variant, index) => {
          const variantImage = images.variantImages.find(vi => vi.variantIndex === index);
          if (variantImage) {
            return {
              ...variant,
              image: variantImage.image
            };
          }
          return variant;
        });
        updateData.variants = updatedVariants;
      }
    }
    
    // Update the product document
    await client.patch(sanityProductId).set(updateData).commit();
    console.log(`✅ Updated product ${sanityProductId} with images`);
    
  } catch (error) {
    console.error(`❌ Error updating product ${productId} with images:`, error.message);
  }
}

// Main function to upload all RO Collection images
async function uploadAllRoCollectionImages() {
  try {
    console.log('🚀 Starting RO Collection image upload...');
    console.log(`Processing ${allRoProducts.length} products`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const product of allRoProducts) {
      try {
        console.log(`\n📸 Processing images for: ${product.name}`);
        
        // Upload all images for this product
        const images = await uploadProductImages(product);
        
        // Update the product document with image references
        await updateProductWithImages(product._id, images);
        
        successCount++;
      } catch (error) {
        console.error(`❌ Error processing product ${product.name}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Image upload completed!');
    console.log(`✅ Successfully processed: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('\n🔄 Next steps:');
      console.log('1. Verify images in Sanity Studio');
      console.log('2. Update your app to use Sanity data for RO Collection');
      console.log('3. Test the product pages with Sanity images');
    }
    
  } catch (error) {
    console.error('💥 Image upload failed:', error);
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

// Run upload if called directly
if (require.main === module) {
  checkEnvironment();
  uploadAllRoCollectionImages();
}

module.exports = { uploadAllRoCollectionImages, uploadProductImages, updateProductWithImages };
