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

async function forceFix() {
  console.log('🚀 FORCE FIXING Dux images - No detection, just fix!\n');
  
  // Define the products that need images and their corresponding image files
  const productImageMapping = {
    'lunaria-table': 'public/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp',
    'sam-dining-chair': 'public/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg',
    'superspider-sheepskin': 'public/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg'
  };

  try {
    for (const [slug, imagePath] of Object.entries(productImageMapping)) {
      console.log(`\n🔧 FORCE PROCESSING: ${slug}`);
      
      // Find the product in Sanity
      const product = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0] { _id, name }`,
        { slug }
      );
      
      if (!product) {
        console.log(`❌ Product ${slug} not found in Sanity`);
        continue;
      }
      
      console.log(`✅ Found product: ${product.name} (${product._id})`);
      
      // Check if image file exists
      if (!fs.existsSync(imagePath)) {
        console.log(`❌ Image file not found: ${imagePath}`);
        continue;
      }
      
      try {
        console.log(`📸 FORCE UPLOADING image: ${imagePath}`);
        
        // Upload the image to Sanity
        const imageBuffer = fs.readFileSync(imagePath);
        const filename = path.basename(imagePath);
        
        const imageAsset = await client.assets.upload('image', imageBuffer, {
          filename: filename
        });
        
        console.log(`✅ Image uploaded successfully: ${imageAsset._id}`);
        console.log(`🔗 Image URL: ${imageAsset.url}`);
        
        // FORCE UPDATE the product with the new image (overwrite any existing)
        await client.patch(product._id).set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          }
        }).commit();
        
        console.log(`✅ FORCE UPDATED product ${slug} with main image`);
        
      } catch (uploadError) {
        console.error(`❌ Error uploading image for ${slug}:`, uploadError.message);
      }
    }
    
    console.log('\n🎉 FORCE FIX completed!');
    console.log('⏳ Waiting 3 seconds for Sanity to sync...');
    
    // Wait for Sanity to sync
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('🔍 Running final verification...\n');
    
    // Verify all products now have images with proper URLs
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
    
    console.log(`📊 FINAL VERIFICATION RESULTS:`);
    let missingImages = 0;
    
    for (const product of allProducts) {
      const hasImage = !!product.image?.asset?.url;
      const imageUrl = product.image?.asset?.url || 'No URL';
      console.log(`${hasImage ? '✅' : '❌'} ${product.name} (${product.slug?.current})`);
      console.log(`    Image: ${hasImage ? 'YES' : 'NO'} | URL: ${imageUrl.substring(0, 80)}${imageUrl.length > 80 ? '...' : ''}`);
      if (!hasImage) missingImages++;
    }
    
    if (missingImages === 0) {
      console.log('\n🎉🎉🎉 SUCCESS! ALL DUX PRODUCTS NOW HAVE IMAGES! 🎉🎉🎉');
      console.log('🌐 All images will load correctly on production');
      console.log('🔄 Please refresh the Dux page to see the changes');
    } else {
      console.log(`\n⚠️  ${missingImages} products still missing images`);
    }
    
  } catch (error) {
    console.error('❌ Force fix failed:', error);
  }
}

forceFix();
