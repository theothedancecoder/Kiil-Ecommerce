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

async function fixCorrectDuxProducts() {
  console.log('🎯 Fixing the CORRECT Dux products by their actual IDs...\n');
  
  // These are the actual product IDs from the frontend query
  const correctProductMappings = {
    'zJ5guumPDbQ7xmHK1jWXzR': {
      name: 'Lunaria Table',
      slug: 'lunaria-table',
      imagePath: 'public/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp'
    },
    'zJ5guumPDbQ7xmHK1jWYXz': {
      name: 'Sam Dining Chair',
      slug: 'sam-dining-chair',
      imagePath: 'public/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg'
    },
    'zJ5guumPDbQ7xmHK1jWYnL': {
      name: 'Superspider Sheepskin',
      slug: 'superspider-sheepskin',
      imagePath: 'public/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg'
    }
  };

  try {
    for (const [productId, productInfo] of Object.entries(correctProductMappings)) {
      console.log(`\n🔧 FIXING: ${productInfo.name} (${productId})`);
      
      // Check if image file exists
      if (!fs.existsSync(productInfo.imagePath)) {
        console.log(`❌ Image file not found: ${productInfo.imagePath}`);
        continue;
      }
      
      try {
        console.log(`📸 Uploading image: ${productInfo.imagePath}`);
        
        // Upload the image to Sanity
        const imageBuffer = fs.readFileSync(productInfo.imagePath);
        const filename = path.basename(productInfo.imagePath);
        
        const imageAsset = await client.assets.upload('image', imageBuffer, {
          filename: filename
        });
        
        console.log(`✅ Image uploaded: ${imageAsset._id}`);
        console.log(`🔗 Image URL: ${imageAsset.url}`);
        
        // Update the CORRECT product with the new image
        await client.patch(productId).set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          }
        }).commit();
        
        console.log(`✅ UPDATED CORRECT product ${productInfo.name}`);
        
      } catch (uploadError) {
        console.error(`❌ Error uploading image for ${productInfo.name}:`, uploadError.message);
      }
    }
    
    console.log('\n🎉 CORRECT products fixed!');
    console.log('⏳ Waiting 3 seconds for Sanity to sync...');
    
    // Wait for Sanity to sync
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('🔍 Running verification with frontend client...\n');
    
    // Verify with the same query as frontend
    const query = `
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
    `;

    const products = await client.fetch(query);
    
    console.log(`📊 FINAL VERIFICATION:`);
    let allGood = true;
    
    for (const product of products) {
      const hasImage = !!product.image?.asset?.url;
      console.log(`${hasImage ? '✅' : '❌'} ${product.name} (${product.slug?.current}): ${hasImage ? 'HAS IMAGE' : 'NO IMAGE'}`);
      if (!hasImage) allGood = false;
    }
    
    if (allGood) {
      console.log('\n🎉🎉🎉 SUCCESS! ALL DUX PRODUCTS NOW HAVE IMAGES! 🎉🎉🎉');
      console.log('🌐 All images will load correctly on production');
      console.log('🔄 Please refresh the Dux page to see the changes');
    } else {
      console.log('\n⚠️  Some products still missing images');
    }
    
  } catch (error) {
    console.error('❌ Fix failed:', error);
  }
}

fixCorrectDuxProducts();
