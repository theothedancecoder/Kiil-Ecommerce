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

console.log('🔧 Fixing Oak - Sugar Brown variant image...');

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

async function fixOakSugarBrownVariant() {
  try {
    // Get the product
    const product = await client.fetch(`
      *[_type == "product" && slug.current == "a-conversation-piece-dining-chair"][0] {
        _id,
        name,
        variants[] {
          _key,
          name,
          color,
          material,
          price,
          image
        }
      }
    `);

    if (!product) {
      console.log('❌ Product not found');
      return;
    }

    console.log(`📦 Found product: ${product.name}`);
    
    // Find the Oak - Sugar Brown variant
    const oakVariant = product.variants.find(v => v._key === '40296e19d603');
    
    if (!oakVariant) {
      console.log('❌ Oak - Sugar Brown variant not found');
      return;
    }

    console.log(`🔧 Processing Oak - Sugar Brown variant`);
    
    // Upload the correct image with the actual filename
    const asset = await uploadImageToSanity(
      '/umage/A-Conversation-Piece/umage_packshoA Conversation Piece dining chair 7,499 krt_5589c740-01_a-conversation-piece_dining-chair_oak_sugar-brown_-2_900x.webp',
      'a-conversation-piece-oak-sugar-brown-unique.webp'
    );

    if (asset) {
      // Update just this variant
      const updatedVariants = product.variants.map(variant => {
        if (variant._key === '40296e19d603') {
          return {
            ...variant,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id
              }
            }
          };
        }
        return variant;
      });

      // Update the product
      await client
        .patch(product._id)
        .set({
          variants: updatedVariants
        })
        .commit();

      console.log('✅ Successfully updated Oak - Sugar Brown variant with unique image!');
      console.log(`📊 New image ID: ${asset._id}`);
    } else {
      console.log('❌ Failed to upload Oak - Sugar Brown image');
    }

  } catch (error) {
    console.error('❌ Error fixing Oak - Sugar Brown variant:', error);
  }
}

fixOakSugarBrownVariant();
