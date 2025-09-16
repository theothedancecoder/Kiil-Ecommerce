import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

async function fixMissingDuxImages() {
  console.log('🔧 Fixing missing Dux images - Final Fix...\n');
  
  // Define the products that need images and their corresponding image files
  const productImageMapping = {
    'lunaria-table': {
      imagePath: 'public/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp',
      fallbackPath: 'public/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp'
    },
    'sam-dining-chair': {
      imagePath: 'public/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg',
      fallbackPath: 'public/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg'
    },
    'superspider-sheepskin': {
      imagePath: 'public/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg',
      fallbackPath: 'public/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg'
    }
  };

  try {
    for (const [slug, imageInfo] of Object.entries(productImageMapping)) {
      console.log(`\n🔧 Processing: ${slug}`);
      
      // Find the product in Sanity
      const product = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0] { _id, name, image }`,
        { slug }
      );
      
      if (!product) {
        console.log(`❌ Product ${slug} not found in Sanity`);
        continue;
      }
      
      console.log(`✅ Found product: ${product.name} (${product._id})`);
      
      // Check if product already has an image
      if (product.image?.asset) {
        console.log(`ℹ️  Product ${slug} already has an image, skipping...`);
        continue;
      }
      
      // Try to upload the main image file
      let imageAsset = null;
      let imagePath = imageInfo.imagePath;
      
      // Check if main image file exists
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  Main image not found: ${imagePath}`);
        console.log(`🔄 Trying fallback image: ${imageInfo.fallbackPath}`);
        imagePath = imageInfo.fallbackPath;
        
        if (!fs.existsSync(imagePath)) {
          console.log(`❌ Fallback image also not found: ${imagePath}`);
          continue;
        }
      }
      
      try {
        console.log(`📸 Uploading image: ${imagePath}`);
        
        // Upload the image to Sanity
        const imageBuffer = fs.readFileSync(imagePath);
        const filename = path.basename(imagePath);
        
        imageAsset = await client.assets.upload('image', imageBuffer, {
          filename: filename
        });
        
        console.log(`✅ Image uploaded successfully: ${imageAsset._id}`);
        
        // Update the product with the new image
        await client.patch(product._id).set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          }
        }).commit();
        
        console.log(`✅ Product ${slug} updated with main image`);
        
      } catch (uploadError) {
        console.error(`❌ Error uploading image for ${slug}:`, uploadError.message);
      }
    }
    
    console.log('\n🎉 Missing Dux images fix completed!');
    console.log('🔍 Running verification...\n');
    
    // Verify all products now have images
    const allProducts = await client.fetch(`
      *[_type == "product" && "dux" in categories[]->slug.current] | order(name asc) {
        _id,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    `);
    
    console.log(`📊 Verification Results:`);
    let missingImages = 0;
    
    for (const product of allProducts) {
      const hasImage = !!product.image?.asset?.url;
      console.log(`${hasImage ? '✅' : '❌'} ${product.name} (${product.slug?.current}): ${hasImage ? 'Has Image' : 'Missing Image'}`);
      if (!hasImage) missingImages++;
    }
    
    if (missingImages === 0) {
      console.log('\n🎉 SUCCESS! All Dux products now have images!');
      console.log('🌐 All images will load correctly on production');
    } else {
      console.log(`\n⚠️  ${missingImages} products still missing images`);
    }
    
  } catch (error) {
    console.error('❌ Fix failed:', error);
  }
}

fixMissingDuxImages();
