import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

console.log('🔧 Fixing Umage lifestyle images...');

// Lifestyle images from the legacy data that need to be uploaded to Sanity
const lifestyleImageMappings = [
  {
    productSlug: 'a-conversation-piece-dining-chair',
    images: [
      '/umage/A-Conversation-Piece/lifestyle/umage_lifestyle_a-conversation-piece_dining-chair_walnut_morning-meadows_1600x.webp'
    ]
  },
  {
    productSlug: 'asteria-spotlight',
    images: [
      '/umage/Asteria-spotlight/lifestyle/UMAGE_lifestyle_Asteria_Spot_black__2_09905591-6b1a-4cef-87a6-acfe05096aa3.webp'
    ]
  },
  {
    productSlug: 'audacious-desk',
    images: [
      '/umage/Audacious-desk/lifestyle/UMAGE_lifestyle_Audacious_desk_oak_sterling__1_7.webp'
    ]
  },
  {
    productSlug: 'chordis',
    images: [
      '/umage/Chordis/lifestyle/umage_lifestyle_chordis_brass_-2_447687af-b575-4ad7-8839-2266d9adaecb_900x.webp'
    ]
  },
  {
    productSlug: 'comfort-circle-dining-table',
    images: [
      '/umage/Comfort-Circle-dining-table/lifestyle/comfortcircle_blackoak_0c206d3b-220c-4089-a5da-d374ecda1255_900x.webp'
    ]
  },
  {
    productSlug: 'duende-desk',
    images: [
      '/umage/Duende-desk/lifestyle/umage_lifestyle_duende_blackoak__1_c6dcacde-2a16-4cfd-a947-4c95079771c1_900x.webp'
    ]
  },
  {
    productSlug: 'gather-cafe-table',
    images: [
      '/umage/Gather-Café-table/lifestyle/umage_lifestyle_gather_bar-table_brown-emperador_asteria-move_monochrome_leaf_-2_900x.webp',
      '/umage/Gather-Café-table/lifestyle/umage_lifestyle_gather_bar-table_brown-emperador_asteria-move_monochrome_pale-blue_-5_900x.webp'
    ]
  },
  {
    productSlug: 'heart-n-soul-200-dining-table',
    images: [
      '/umage/Heart\'n\'Soul-200-dining-table-200/lifestyle/umage_lifestyle_heart-n-soul_dining-table_oak_-1_900x.webp'
    ]
  }
];

async function uploadImageToSanity(imagePath, filename) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename
    });

    console.log(`✅ Uploaded: ${filename} -> ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function fixLifestyleImages() {
  try {
    for (const mapping of lifestyleImageMappings) {
      console.log(`\n🔧 Processing lifestyle images for: ${mapping.productSlug}`);
      
      // Get the product from Sanity
      const product = await client.fetch(`
        *[_type == "product" && slug.current == $slug][0] {
          _id,
          name,
          lifestyleImages
        }
      `, { slug: mapping.productSlug });

      if (!product) {
        console.log(`❌ Product not found: ${mapping.productSlug}`);
        continue;
      }

      const uploadedImages = [];
      
      for (let i = 0; i < mapping.images.length; i++) {
        const imagePath = mapping.images[i];
        const filename = `${mapping.productSlug}-lifestyle-${i + 1}.webp`;
        
        console.log(`  📸 Processing: ${imagePath}`);
        
        const asset = await uploadImageToSanity(imagePath, filename);
        
        if (asset) {
          uploadedImages.push({
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          });
        }
      }

      if (uploadedImages.length > 0) {
        // Update the product with lifestyle images
        await client
          .patch(product._id)
          .set({
            lifestyleImages: uploadedImages
          })
          .commit();
        
        console.log(`✅ Updated ${product.name} with ${uploadedImages.length} lifestyle images`);
      } else {
        console.log(`⚠️ No lifestyle images uploaded for ${product.name}`);
      }
    }

    console.log('\n🎉 Completed fixing Umage lifestyle images!');

  } catch (error) {
    console.error('❌ Error fixing lifestyle images:', error);
  }
}

fixLifestyleImages();
