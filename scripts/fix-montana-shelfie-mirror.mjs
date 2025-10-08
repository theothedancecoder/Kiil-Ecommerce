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

async function uploadImageToSanity(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

async function fixMontanaShelfie() {
  try {
    console.log('🪞 Fixing Montana Shelfie Mirror...\n');

    // Find the product
    const product = await client.fetch(
      `*[_type == "product" && slug.current == "montana-shelfie-mirror"][0] {
        _id,
        name,
        slug,
        image
      }`
    );

    if (!product) {
      console.log('❌ Product not found in Sanity');
      return;
    }

    console.log(`Found: ${product.name}`);
    console.log(`Has image: ${product.image ? 'Yes' : 'No'}\n`);

    if (product.image) {
      console.log('✅ Product already has an image');
      return;
    }

    // Search for image in file system
    const searchDirs = [
      'public/Montana',
      'public/montana',
      'public/interior-collection',
      'public'
    ];

    let imagePath = null;

    for (const dir of searchDirs) {
      if (!fs.existsSync(dir)) continue;

      try {
        const subdirs = fs.readdirSync(dir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);

        for (const subdir of subdirs) {
          if (subdir.toLowerCase().includes('shelfie') || 
              subdir.toLowerCase().includes('mirror')) {
            
            const fullPath = path.join(dir, subdir);
            const files = fs.readdirSync(fullPath);
            const imageFiles = files.filter(f => 
              (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) &&
              !f.startsWith('.')
            );

            if (imageFiles.length > 0) {
              imagePath = path.join(fullPath, imageFiles[0]);
              console.log(`Found image: ${imagePath}\n`);
              break;
            }
          }
        }
        if (imagePath) break;
      } catch (error) {
        continue;
      }
    }

    if (!imagePath) {
      console.log('❌ No image found in file system');
      return;
    }

    // Upload image
    console.log('Uploading image...');
    const imageId = await uploadImageToSanity(imagePath);

    if (!imageId) {
      console.log('❌ Failed to upload image');
      return;
    }

    // Update product
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

    console.log('✅ Product updated successfully!\n');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

fixMontanaShelfie()
  .then(() => {
    console.log('✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });
