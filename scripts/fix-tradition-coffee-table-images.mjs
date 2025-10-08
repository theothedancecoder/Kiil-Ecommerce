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
    console.log(`   ✅ Uploaded: ${path.basename(imagePath)}`);
    return asset._id;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function fixCoffeeTableImages() {
  try {
    console.log('🖼️  Fixing In Between Coffee Table SK24 images...\n');

    const product = await client.fetch(
      `*[_type == "product" && slug.current == "in-between-coffee-table-sk24"][0] {
        _id,
        name,
        image,
        variants
      }`
    );

    if (!product) {
      console.log('❌ Product not found in Sanity');
      return;
    }

    console.log(`Found product: ${product.name}`);
    console.log(`Current image: ${product.image ? 'Yes' : 'No'}`);
    console.log(`Current variants: ${product.variants?.length || 0}\n`);

    const productDir = 'public/&Tradition/In-Between-coffee-table';
    
    if (!fs.existsSync(productDir)) {
      console.log(`❌ Directory not found: ${productDir}`);
      return;
    }

    const variants = [
      { name: 'Oiled Oak', material: 'Oiled Oak', price: 6715, image: 'In Between coffee table SK24 NOK  6,715  Color -  Oiled oak.webp' },
      { name: 'Smoked Oiled Oak', material: 'Smoked Oiled Oak', price: 6715, image: 'In Between coffee table SK24 NOK  6,715  Color -  Smoked oiled oak.webp' },
      { name: 'Black Lacquered Oak', material: 'Black Lacquered Oak', price: 6715, image: 'In Between sofabord SK24 kr 6 715  Farge - Sortlakkert eik.webp' },
    ];

    // Upload main image
    const mainImagePath = path.join(productDir, variants[0].image);
    console.log('Uploading main image...');
    const mainImageId = await uploadImageToSanity(mainImagePath);

    if (!mainImageId) {
      console.log('❌ Failed to upload main image');
      return;
    }

    // Upload variant images
    const variantData = [];
    for (const variant of variants) {
      const variantImagePath = path.join(productDir, variant.image);
      
      if (!fs.existsSync(variantImagePath)) {
        console.log(`⚠️  Variant image not found: ${variant.image}`);
        continue;
      }

      const variantImageId = await uploadImageToSanity(variantImagePath);
      
      if (variantImageId) {
        variantData.push({
          _type: 'variant',
          _key: `variant-${variantData.length}`,
          name: variant.name,
          material: variant.material,
          price: variant.price,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: variantImageId
            }
          }
        });
      }
    }

    console.log(`\nUploaded ${variantData.length} variants`);

    // Upload lifestyle image
    const lifestyleDir = path.join(productDir, 'lifestyle');
    const lifestyleImages = [];
    
    if (fs.existsSync(lifestyleDir)) {
      const lifestyleFiles = fs.readdirSync(lifestyleDir)
        .filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));
      
      for (const file of lifestyleFiles) {
        const lifestyleImagePath = path.join(lifestyleDir, file);
        const lifestyleImageId = await uploadImageToSanity(lifestyleImagePath);
        
        if (lifestyleImageId) {
          lifestyleImages.push({
            _type: 'image',
            _key: `lifestyle-${lifestyleImages.length}`,
            asset: {
              _type: 'reference',
              _ref: lifestyleImageId
            }
          });
        }
      }
      
      console.log(`Uploaded ${lifestyleImages.length} lifestyle images`);
    }

    // Update the product
    await client
      .patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mainImageId
          }
        },
        variants: variantData,
        lifestyleImages: lifestyleImages.length > 0 ? lifestyleImages : undefined
      })
      .commit();

    console.log('\n✅ Product updated successfully!');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

fixCoffeeTableImages()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
