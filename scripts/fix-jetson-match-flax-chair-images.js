#!/usr/bin/env node

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function uploadImageToSanity(imagePath, altText) {
  try {
    console.log(`📤 Uploading: ${imagePath}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    console.log(`✅ Uploaded: ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${imagePath}:`, error);
    return null;
  }
}

async function fixJetsonMatchFlaxChairImages() {
  console.log('🔧 Fixing Jetson Match Flax Chair Images...\n');

  try {
    // First, get the product
    const product = await client.fetch(`
      *[_type == "product" && slug.current == "jetson-match-flax-chair" && brand == "DUX"][0] {
        _id,
        name,
        variants[] {
          _key,
          name
        }
      }
    `);

    if (!product) {
      console.error('❌ Jetson Match Flax Chair product not found');
      return;
    }

    console.log(`📦 Found product: ${product.name}`);
    console.log(`🔑 Product ID: ${product._id}`);

    // Upload main product image (use Dakota 88 as main)
    console.log('\n1. Uploading main product image...');
    const mainImage = await uploadImageToSanity(
      'public/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg',
      'Jetson Match Flax Chair - Dakota 88 Leather'
    );

    // Upload lifestyle images
    console.log('\n2. Uploading lifestyle images...');
    const lifestyleImages = [];
    
    const lifestyleImage1 = await uploadImageToSanity(
      'public/dux/Jetson-Match-Flax-21/lifestyle/dux-flax2-scaled-1.jpg',
      'Jetson Match Flax Chair - Lifestyle Image 1'
    );
    if (lifestyleImage1) lifestyleImages.push(lifestyleImage1);

    const lifestyleImage2 = await uploadImageToSanity(
      'public/dux/Jetson-Match-Flax-21/lifestyle/dux-flax3-scaled-1.jpg',
      'Jetson Match Flax Chair - Lifestyle Image 2'
    );
    if (lifestyleImage2) lifestyleImages.push(lifestyleImage2);

    // Upload variant images
    console.log('\n3. Uploading variant images...');
    const variantImageMap = {
      'Dakota 88 Leather': 'public/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg',
      'Dakota 29 Leather': 'public/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg',
      'Dakota 24 Leather': 'public/dux/Jetson-Match-Flax-21/Jetson Match Flax-dakota 24 leather: 21 NOK  27,990.webp'
    };

    const updatedVariants = [];
    for (const variant of product.variants) {
      const imagePath = variantImageMap[variant.name];
      if (imagePath && fs.existsSync(imagePath)) {
        const variantImage = await uploadImageToSanity(imagePath, `Jetson Match Flax Chair - ${variant.name}`);
        updatedVariants.push({
          ...variant,
          image: variantImage
        });
      } else {
        console.log(`⚠️  No image found for variant: ${variant.name}`);
        updatedVariants.push(variant);
      }
    }

    // Update the product with all images
    console.log('\n4. Updating product in Sanity...');
    const updateData = {
      image: mainImage,
      lifestyleImages: lifestyleImages,
      variants: updatedVariants
    };

    await client.patch(product._id).set(updateData).commit();

    console.log('\n🎉 Successfully updated Jetson Match Flax Chair with images!');
    console.log(`✅ Main image: ${mainImage ? 'Added' : 'Failed'}`);
    console.log(`✅ Lifestyle images: ${lifestyleImages.length} added`);
    console.log(`✅ Variant images: ${updatedVariants.filter(v => v.image).length}/${updatedVariants.length} added`);

    // Verify the update
    console.log('\n5. Verifying update...');
    const updatedProduct = await client.fetch(`
      *[_type == "product" && slug.current == "jetson-match-flax-chair" && brand == "DUX"][0] {
        _id,
        name,
        image {
          asset-> {
            url
          }
        },
        variants[] {
          name,
          image {
            asset-> {
              url
            }
          }
        },
        lifestyleImages[] {
          asset-> {
            url
          }
        }
      }
    `);

    console.log('\n📊 Final Status:');
    console.log(`Main Image: ${updatedProduct.image?.asset?.url ? '✅ Present' : '❌ Missing'}`);
    console.log(`Lifestyle Images: ${updatedProduct.lifestyleImages?.length || 0} images`);
    console.log('Variant Images:');
    updatedProduct.variants?.forEach((variant, i) => {
      console.log(`  ${i + 1}. ${variant.name}: ${variant.image?.asset?.url ? '✅ Present' : '❌ Missing'}`);
    });

  } catch (error) {
    console.error('❌ Error fixing Jetson Match Flax Chair images:', error);
  }
}

