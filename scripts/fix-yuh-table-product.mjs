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

async function fixYuhTableProduct() {
  try {
    console.log('🔧 Fixing Yuh Table product...\n');

    const productDir = 'public/Louis-Poulsen/Yuh-floor-lamp';
    const imageFiles = [
      'Yuh floor lamp from Louis Poulsen NOK  8,855  Color -  White.webp',
      'Yuh floor lamp from Louis Poulsen NOK  8,855  Color -  Black.webp',
      'Yuh floor lamp from Louis Poulsen NOK  10,550  Color -  Brass:White.webp',
      'Yuh floor lamp from Louis Poulsen NOK  10,550  Color -  Brass:Black.webp',
    ];

    console.log('📤 Uploading images...');
    const uploadedImages = [];
    
    for (const imageFile of imageFiles) {
      const imagePath = path.join(productDir, imageFile);
      console.log(`   Uploading: ${imageFile}`);
      const imageId = await uploadImageToSanity(imagePath);
      if (imageId) {
        uploadedImages.push({ file: imageFile, id: imageId });
      }
    }

    if (uploadedImages.length === 0) {
      console.error('❌ No images were uploaded successfully');
      return;
    }

    console.log(`\n✅ Uploaded ${uploadedImages.length} images\n`);

    // Create variants
    const variants = [
      {
        _type: 'variant',
        _key: 'variant-white',
        name: 'White',
        color: 'White',
        price: 8855,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages[0].id
          }
        }
      },
      {
        _type: 'variant',
        _key: 'variant-black',
        name: 'Black',
        color: 'Black',
        price: 8855,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages[1].id
          }
        }
      },
      {
        _type: 'variant',
        _key: 'variant-brass-white',
        name: 'Brass/White',
        color: 'Brass/White',
        price: 10550,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages[2].id
          }
        }
      },
      {
        _type: 'variant',
        _key: 'variant-brass-black',
        name: 'Brass/Black',
        color: 'Brass/Black',
        price: 10550,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages[3].id
          }
        }
      }
    ];

    // Update the product
    console.log('📝 Updating Yuh Table product in Sanity...');
    
    await client
      .patch('nSra4TL2zIUK2w33MAs60z') // The Yuh Table product ID
      .set({
        name: 'Yuh Floor Lamp',
        description: 'Modern floor lamp with adjustable head designed by GamFratesi. Features a distinctive counterbalance mechanism and elegant brass details.',
        price: 8855,
        designer: 'GamFratesi',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages[0].id
          }
        },
        variants: variants
      })
      .commit();

    console.log('✅ Product updated successfully!\n');
    console.log('Product details:');
    console.log('  Name: Yuh Floor Lamp');
    console.log('  Slug: yuh-table (kept for URL compatibility)');
    console.log(`  Variants: ${variants.length}`);
    console.log('  Main image: White variant');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

fixYuhTableProduct()
  .then(() => {
    console.log('\n✅ Fix complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fix failed:', error);
    process.exit(1);
  });
