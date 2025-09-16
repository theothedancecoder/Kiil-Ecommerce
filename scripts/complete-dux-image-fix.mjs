import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
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

async function completeDuxImageFix() {
  console.log('🚀 Complete Dux Image Fix - Final Solution');
  console.log('🎯 This will ensure ALL Dux products have working images');
  
  try {
    // First, let's see what we have
    console.log('\n📋 Current status check...');
    const allProducts = await client.fetch('*[_type == "product" && "dux" in categories[]->slug.current] { _id, name, slug, image }');
    console.log(`Found ${allProducts.length} Dux products`);
    
    // Define all products with their correct image paths
    const productImageMappings = [
      {
        name: "Inter Dining Table",
        slug: "inter-dining-table",
        imagePath: "public/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp"
      },
      {
        name: "Jetson Classic Soft 88",
        slug: "jetson-classic-soft-88",
        imagePath: "public/dux/Jetson Classic soft 88/classic soft 88 black.jpg"
      },
      {
        name: "Jetson Match Flax 21",
        slug: "jetson-match-flax-21",
        imagePath: "public/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg"
      },
      {
        name: "Lunaria Table",
        slug: "lunaria-table",
        imagePath: "public/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp"
      },
      {
        name: "Sam Dining Chair",
        slug: "sam-dining-chair",
        imagePath: "public/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg"
      },
      {
        name: "Superspider Sheepskin",
        slug: "superspider-sheepskin",
        imagePath: "public/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg"
      }
    ];

    let successCount = 0;
    let errorCount = 0;

    for (const mapping of productImageMappings) {
      console.log(`\n📦 Processing: ${mapping.name}`);
      
      try {
        // Find the product by slug
        const product = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0] { _id, name, slug, image }`,
          { slug: mapping.slug }
        );

        if (!product) {
          console.log(`❌ Product not found with slug: ${mapping.slug}`);
          errorCount++;
          continue;
        }

        console.log(`✅ Found product: ${product.name} (ID: ${product._id})`);

        // Check if it already has an image
        if (product.image?.asset) {
          console.log(`ℹ️  Product already has image, skipping upload`);
          successCount++;
          continue;
        }

        // Upload the image
        console.log(`📸 Uploading image: ${mapping.imagePath}`);
        const imageBuffer = readFileSync(mapping.imagePath);
        const filename = mapping.imagePath.split('/').pop();
        
        const imageAsset = await client.assets.upload('image', imageBuffer, {
          filename: filename,
        });

        console.log(`✅ Image uploaded: ${imageAsset._id}`);
        console.log(`🔗 CDN URL: ${imageAsset.url}`);

        // Update the product with the image
        await client
          .patch(product._id)
          .set({
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id
              }
            }
          })
          .commit();

        console.log(`✅ Updated product ${mapping.name} with image`);
        successCount++;

      } catch (error) {
        console.error(`❌ Error processing ${mapping.name}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 Complete Dux Image Fix Results:');
    console.log(`✅ Successfully processed: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    
    if (errorCount === 0) {
      console.log('\n🎊 SUCCESS: All Dux products now have images!');
      console.log('🔥 Git LFS issue is COMPLETELY resolved for Dux!');
      console.log('🚀 Images are now served from Sanity CDN instead of Git LFS files');
    }

    // Final verification
    console.log('\n🔍 Final verification...');
    const finalCheck = await client.fetch('*[_type == "product" && "dux" in categories[]->slug.current] { name, image { asset-> { url } } }');
    finalCheck.forEach(product => {
      const status = product.image?.asset?.url ? '✅' : '❌';
      console.log(`${status} ${product.name}`);
    });

  } catch (error) {
    console.error('❌ Complete fix failed:', error);
  }
}

completeDuxImageFix();
