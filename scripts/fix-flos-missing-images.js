#!/usr/bin/env node

/**
 * Script to fix remaining FLOS missing images by finding alternative image files
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    });

    console.log(`✅ Uploaded image: ${imagePath} -> ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Failed to upload image ${imagePath}:`, error.message);
    return null;
  }
}

// Alternative image paths for missing products
const alternativeImages = {
  '2097-50-chandelier': [
    '/FLOS/2097-50/2097-50-brass.jpg',
    '/FLOS/2097-50/brass.jpg',
    '/FLOS/2097-50/main.jpg',
    '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg' // Use 2097/30 as fallback
  ],
  'ic-f1-floor-lamp': [
    '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Brushed brass.jpg',
    '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.jpg',
    '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.jpg',
    '/FLOS/IC-F1-Floor-Lamp/main.jpg'
  ]
};

// Alternative variant images
const alternativeVariantImages = {
  'ktribe-1-floor-lamp-fumee': [
    '/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Fumee.jpg',
    '/FLOS/KTribe-1-floor-lamp/fumee.jpg',
    '/FLOS/KTribe-2-floor-lamp/KTribe 2 floor lamp NOK  11,720  Color - Fumee.webp' // Use KTribe 2 as fallback
  ]
};

async function findAndUploadAlternativeImage(imagePaths) {
  for (const imagePath of imagePaths) {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    if (fs.existsSync(fullPath)) {
      console.log(`📁 Found alternative image: ${imagePath}`);
      const assetId = await uploadImageToSanity(imagePath);
      if (assetId) {
        return {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId
          }
        };
      }
    }
  }
  return null;
}

async function fixMissingImages() {
  try {
    console.log('🔧 Fixing remaining FLOS missing images...\n');

    // Fix 2097/50 Chandelier
    console.log('🔄 Fixing 2097/50 Chandelier...');
    const chandelier50Image = await findAndUploadAlternativeImage(alternativeImages['2097-50-chandelier']);
    if (chandelier50Image) {
      await client
        .patch('2097-50-chandelier')
        .set({
          image: chandelier50Image,
          variants: [{
            _key: 'brass',
            name: 'Brass',
            price: 35000,
            color: 'Brass',
            image: chandelier50Image
          }]
        })
        .commit();
      console.log('✅ Updated 2097/50 Chandelier with image');
    } else {
      console.log('⚠️  Could not find alternative image for 2097/50 Chandelier');
    }

    // Fix IC F1 Floor Lamp
    console.log('\n🔄 Fixing IC F1 Floor Lamp...');
    const icF1Image = await findAndUploadAlternativeImage(alternativeImages['ic-f1-floor-lamp']);
    if (icF1Image) {
      // Try to upload variant images
      const brassImage = await findAndUploadAlternativeImage(['/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Brushed brass.jpg']);
      const blackImage = await findAndUploadAlternativeImage(['/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.jpg']);
      const chromeImage = await findAndUploadAlternativeImage(['/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.jpg']);

      const variants = [
        {
          _key: 'brushed-brass',
          name: 'Brushed Brass',
          price: 8540,
          color: 'Brushed Brass',
          image: brassImage || icF1Image
        },
        {
          _key: 'black',
          name: 'Black',
          price: 8540,
          color: 'Black',
          image: blackImage || icF1Image
        },
        {
          _key: 'chrome',
          name: 'Chrome',
          price: 8540,
          color: 'Chrome',
          image: chromeImage || icF1Image
        }
      ];

      await client
        .patch('ic-f1-floor-lamp')
        .set({
          image: icF1Image,
          variants: variants
        })
        .commit();
      console.log('✅ Updated IC F1 Floor Lamp with images');
    } else {
      console.log('⚠️  Could not find alternative image for IC F1 Floor Lamp');
    }

    // Fix KTribe 1 Floor Lamp Fumee variant
    console.log('\n🔄 Fixing KTribe 1 Floor Lamp Fumee variant...');
    const fumeeImage = await findAndUploadAlternativeImage(alternativeVariantImages['ktribe-1-floor-lamp-fumee']);
    if (fumeeImage) {
      // Get current product to update just the Fumee variant
      const product = await client.fetch(`*[_type == "product" && _id == "ktribe-1-floor-lamp"][0]`);
      if (product && product.variants) {
        const updatedVariants = product.variants.map(variant => {
          if (variant.name === 'Fumee') {
            return {
              ...variant,
              image: fumeeImage
            };
          }
          return variant;
        });

        await client
          .patch('ktribe-1-floor-lamp')
          .set({
            variants: updatedVariants
          })
          .commit();
        console.log('✅ Updated KTribe 1 Floor Lamp Fumee variant with image');
      }
    } else {
      console.log('⚠️  Could not find alternative image for KTribe 1 Floor Lamp Fumee variant');
    }

    console.log('\n🎉 Image fixing completed!');
    console.log('\n💡 Run the debug script again to verify fixes:');
    console.log('node scripts/debug-flos-missing-images.js');

  } catch (error) {
    console.error('❌ Image fixing failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the fix
if (require.main === module) {
  fixMissingImages();
}

module.exports = { fixMissingImages };
