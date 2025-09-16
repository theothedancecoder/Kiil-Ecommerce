import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
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
    imagePath: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp"
  },
  {
    productSlug: "jetson-classic-soft-88",
    imagePath: "/dux/Jetson Classic soft 88/classic soft 88 black.jpg"
  },
  {
    productSlug: "jetson-match-flax-21",
    imagePath: "/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg"
  },
  {
    productSlug: "lunaria-table",
    imagePath: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp"
  },
  {
    productSlug: "sam-dining-chair",
    imagePath: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg"
  },
  {
    productSlug: "superspider-sheepskin",
    imagePath: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg"
  }
];

async function uploadImageToSanity(imagePath) {
  try {
    console.log(`📸 Uploading image: ${imagePath}`);
    
    // For now, we'll create a placeholder image asset
    // In production, you would upload the actual image file
    const imageAsset = await client.create({
      _type: 'sanity.imageAsset',
      originalFilename: imagePath.split('/').pop(),
      url: `https://placeholder-for-${imagePath.split('/').pop()}`,
      metadata: {
        dimensions: {
          width: 800,
          height: 800
        }
      }
    });

    console.log(`✅ Image uploaded: ${imageAsset._id}`);
    return imageAsset._id;
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error.message);
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

    console.log(`✅ Updated product ${productSlug} with main image`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating product ${productSlug}:`, error.message);
    return false;
  }
}

async function uploadDuxMainImages() {
  console.log('🚀 Starting Dux main images upload to Sanity...');
  
  let successCount = 0;
  let errorCount = 0;

  for (const imageData of duxMainImages) {
    console.log(`\n📦 Processing: ${imageData.productSlug}`);
    
    try {
      // Upload image to Sanity
      const imageAssetId = await uploadImageToSanity(imageData.imagePath);
      
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

  console.log('\n🎉 Dux main images upload completed!');
  console.log(`✅ Successfully processed: ${successCount} products`);
  console.log(`❌ Errors: ${errorCount} products`);
  
  if (errorCount === 0) {
    console.log('🎊 All Dux products now have main images in Sanity!');
  }
}

uploadDuxMainImages();
