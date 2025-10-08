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

// Helper to upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    console.log(`   ✅ Uploaded: ${path.basename(imagePath)}`);
    return asset._id;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function fixVippImages() {
  try {
    console.log('🖼️  Fixing Vipp product images...\n');
    console.log('='.repeat(60) + '\n');

    // Get Vipp products
    const products = await client.fetch(
      `*[_type == "product" && brand match "Vipp*"] {
        _id,
        name,
        slug,
        image,
        lifestyleImages
      }`
    );

    console.log(`Found ${products.length} Vipp products\n`);

    for (const product of products) {
      console.log(`\n📦 Processing: ${product.name}`);
      console.log(`   Slug: ${product.slug?.current}`);
      console.log(`   Current image: ${product.image ? 'Yes' : 'No'}`);
      console.log(`   Lifestyle images: ${product.lifestyleImages?.length || 0}`);

      // Determine the directory name from slug
      let dirName;
      if (product.slug?.current === 'vipp478-chimney-shelf-60') {
        dirName = 'Vipp478-Chimney-shelf';
      } else if (product.slug?.current === 'vipp479-chimney-shelf-120') {
        dirName = 'Vipp478-Chimney-shelf'; // Same directory has both products
      } else {
        console.log(`   ⚠️  Unknown slug, skipping...`);
        continue;
      }

      const productDir = path.join('public/sales', dirName);
      
      if (!fs.existsSync(productDir)) {
        console.log(`   ❌ Directory not found: ${productDir}`);
        continue;
      }

      // Get all image files
      const files = fs.readdirSync(productDir);
      const imageFiles = files.filter(f => 
        (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) &&
        !f.includes('lifestyle')
      );

      console.log(`   Found ${imageFiles.length} images in ${dirName}`);

      if (imageFiles.length === 0) {
        console.log(`   ⚠️  No images found`);
        continue;
      }

      // Find the correct image for this product
      let mainImageFile;
      if (product.slug?.current === 'vipp478-chimney-shelf-60') {
        mainImageFile = imageFiles.find(f => f.includes('478') || f.includes('60 cm'));
      } else if (product.slug?.current === 'vipp479-chimney-shelf-120') {
        mainImageFile = imageFiles.find(f => f.includes('479') || f.includes('120 cm'));
      }

      if (!mainImageFile) {
        console.log(`   ⚠️  Could not find matching image, using first image`);
        mainImageFile = imageFiles[0];
      }

      console.log(`   Selected image: ${mainImageFile}`);

      // Upload main image if missing
      if (!product.image) {
        const mainImagePath = path.join(productDir, mainImageFile);
        const imageId = await uploadImageToSanity(mainImagePath);

        if (imageId) {
          await client
            .patch(product._id)
            .set({
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: imageId
                }
              }
            })
            .commit();

          console.log(`   ✅ Added main image to product`);
        }
      } else {
        console.log(`   ⏭️  Product already has main image`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Vipp image fix complete!\n');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

fixVippImages()
  .then(() => {
    console.log('✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
