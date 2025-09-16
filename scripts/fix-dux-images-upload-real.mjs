import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';
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

// Main product images mapping
const duxMainImages = [
  {
    productSlug: "inter-dining-table",
    imagePath: "public/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp"
  },
  {
    productSlug: "jetson-classic-soft-88",
    imagePath: "public/dux/Jetson Classic soft 88/classic soft 88 black.jpg"
  },
  {
    productSlug: "jetson-match-flax-21",
    imagePath: "public/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg"
  },
  {
    productSlug: "lunaria-table",
    imagePath: "public/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp"
  },
  {
    productSlug: "sam-dining-chair",
    imagePath: "public/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg"
  },
  {
    productSlug: "superspider-sheepskin",
    imagePath: "public/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg"
  }
];

async function uploadRealImageToSanity(imagePath) {
  try {
    console.log(`📸 Uploading real image: ${imagePath}`);
    
    // Read the actual image file
    const imageBuffer = readFileSync(imagePath);
    const filename = imagePath.split('/').pop();
    
    // Upload the actual image file to Sanity
    const imageAsset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });

    console.log(`✅ Real image uploaded: ${imageAsset._id}`);
    console.log(`🔗 Sanity CDN URL: ${imageAsset.url}`);
    return imageAsset._id;
  } catch (error) {
    console.error(`❌ Error uploading real image ${imagePath}:`, error.message);
    return null;
  }
}

async function updateProductWithMainImage(productSlug, imageAssetId) {
  try {
    // Find the product
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug: productSlug }
    );

    if (!product) {
      console.error(`❌ Product not found: ${productSlug}`);
      return false;
    }

    // Update product with main image
    await client
      .patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId
          }
        }
      })
      .commit();

    console.log(`✅ Updated product ${productSlug} with real image`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating product ${productSlug}:`, error.message);
    return false;
  }
}

async function uploadDuxRealImages() {
  console.log('🚀 Starting Dux REAL images upload to Sanity...');
  console.log('🎯 This will fix the Git LFS issue by uploading actual images to Sanity CDN');
  
  let successCount = 0;
  let errorCount = 0;

  for (const imageData of duxMainImages) {
    console.log(`\n📦 Processing: ${imageData.productSlug}`);
    
    try {
      // Upload real image to Sanity
      const imageAssetId = await uploadRealImageToSanity(imageData.imagePath);
      
      if (imageAssetId) {
        // Update product with the image
        const success = await updateProductWithMainImage(imageData.productSlug, imageAssetId);
        if (success) {
          successCount++;
        } else {
          errorCount++;
        }
      } else {
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${imageData.productSlug}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n🎉 Dux REAL images upload completed!');
  console.log(`✅ Successfully processed: ${successCount} products`);
  console.log(`❌ Errors: ${errorCount} products`);
  
  if (errorCount === 0) {
    console.log('🎊 All Dux products now have REAL images from Sanity CDN!');
    console.log('🔥 Git LFS issue should now be resolved!');
  }
}

uploadDuxRealImages();
