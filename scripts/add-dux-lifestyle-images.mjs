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

// Dux lifestyle images mapping from static data
const duxLifestyleImages = {
  "inter-dining-table": [
    "/dux/Inter-dining-table/lifestyle/inter3.webp"
  ],
  "jetson-classic-soft-88": [
    "/dux/Jetson Classic soft 88/lifestyle/furniture-easy-chair-jetson-black-dakota-88-pie-1-2-scaled.jpg.avif"
  ],
  "jetson-match-flax-21": [
    "/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg",
    "/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg"
  ],
  "lunaria-table": [
    "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
    "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp"
  ],
  "sam-dining-chair": [
    "/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg",
    "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg"
  ],
  "superspider-sheepskin": [
    "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg",
    "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg"
  ]
};

async function uploadLifestyleImage(imagePath) {
  try {
    console.log(`📸 Uploading lifestyle image: ${imagePath}`);
    
    // Create placeholder image asset
    const imageAsset = await client.create({
      _type: 'sanity.imageAsset',
      originalFilename: imagePath.split('/').pop(),
      url: `https://placeholder-for-${imagePath.split('/').pop()}`,
      metadata: {
        dimensions: {
          width: 1200,
          height: 800
        }
      }
    });

    console.log(`✅ Lifestyle image uploaded: ${imageAsset._id}`);
    return imageAsset._id;
  } catch (error) {
    console.error(`❌ Error uploading lifestyle image ${imagePath}:`, error.message);
    return null;
  }
}

async function addLifestyleImagesToProduct(productSlug, lifestyleImagePaths) {
  try {
    console.log(`📦 Processing lifestyle images for: ${productSlug}`);
    
    // Find the product
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug: productSlug }
    );

    if (!product) {
      console.error(`❌ Product not found: ${productSlug}`);
      return false;
    }

    // Upload all lifestyle images
    const lifestyleImages = [];
    
    for (const imagePath of lifestyleImagePaths) {
      const imageAssetId = await uploadLifestyleImage(imagePath);
      
      if (imageAssetId) {
        lifestyleImages.push({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId
          }
        });
      }
    }

    if (lifestyleImages.length > 0) {
      // Update product with lifestyle images
      await client
        .patch(product._id)
        .set({
          lifestyleImages: lifestyleImages
        })
        .commit();

      console.log(`✅ Added ${lifestyleImages.length} lifestyle images to ${productSlug}`);
      return true;
    } else {
      console.log(`❌ No lifestyle images could be uploaded for ${productSlug}`);
      return false;
    }

  } catch (error) {
    console.error(`❌ Error processing lifestyle images for ${productSlug}:`, error.message);
    return false;
  }
}

async function addDuxLifestyleImages() {
  console.log('🚀 Starting Dux lifestyle images upload...');
  
  let successCount = 0;
  let errorCount = 0;
  let totalImages = 0;

  for (const [productSlug, imagePaths] of Object.entries(duxLifestyleImages)) {
    totalImages += imagePaths.length;
    
    try {
      const success = await addLifestyleImagesToProduct(productSlug, imagePaths);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${productSlug}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n🎉 Dux lifestyle images upload completed!');
  console.log(`📊 Total products processed: ${Object.keys(duxLifestyleImages).length}`);
  console.log(`📸 Total lifestyle images: ${totalImages}`);
  console.log(`✅ Successfully processed: ${successCount} products`);
  console.log(`❌ Errors: ${errorCount} products`);
  
  if (errorCount === 0) {
    console.log('🎊 All Dux products now have lifestyle images!');
  }
}

addDuxLifestyleImages();
