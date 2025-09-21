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

console.log('🚀 Starting Umage image upload to Sanity...');

// A Conversation Piece Dining Chair variants
const conversationPieceImages = [
  {
    name: 'Oak - Sugar Brown',
    localPath: '/umage/A-Conversation-Piece/umage_packshoA%20Conversation%20Piece%20dining%20chair%207,499%20krt_5589c740-01_a-conversation-piece_dining-chair_oak_sugar-brown_-2_900x.webp'
  },
  {
    name: 'Black Oak - Sugar Brown', 
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5131c740-01_a-conversation-piece_dining-chair_black-oak_sugar-brown_-2_900x.webp'
  },
  {
    name: 'Black Oak - White Sands',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5131c740-02_a-conversation-piece_dining-chair_black-oak_white-sands_-2_900x.webp'
  },
  {
    name: 'Oak - White Sands',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5589c740-02_a-conversation-piece_dining-chair_oak_white-sands_-2_900x.webp'
  },
  {
    name: 'Dark Oak - Sugar Brown',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5789c740-01_a-conversation-piece_dining-chair_dark-oak_sugar-brown_-2_900x.webp'
  },
  {
    name: 'Dark Oak - White Sands',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5789c740-02_a-conversation-piece_dining-chair_dark-oak_white-sands_-2_900x.webp'
  },
  {
    name: 'Walnut - Sugar Brown',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5895c740-01_a-conversation-piece_dining-chair_walnut_sugar-brown_-2_900x.webp'
  },
  {
    name: 'Walnut - White Sands',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5895c740-02_a-conversation-piece_dining-chair_walnut_white-sands_-2_900x.webp'
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

async function updateProductWithSanityImages() {
  try {
    // Find the A Conversation Piece product
    const product = await client.fetch(`
      *[_type == "product" && slug.current == "a-conversation-piece-dining-chair"][0]
    `);

    if (!product) {
      console.log('❌ Product not found');
      return;
    }

    console.log(`📦 Found product: ${product.name}`);

    // Upload main product image
    const mainImageAsset = await uploadImageToSanity(
      conversationPieceImages[0].localPath,
      'a-conversation-piece-main.webp'
    );

    // Upload variant images
    const variantAssets = [];
    for (const variant of conversationPieceImages) {
      const asset = await uploadImageToSanity(
        variant.localPath,
        `a-conversation-piece-${variant.name.toLowerCase().replace(/\s+/g, '-')}.webp`
      );
      if (asset) {
        variantAssets.push({
          name: variant.name,
          asset: asset
        });
      }
    }

    // Update product with Sanity image references
    const updatedVariants = product.variants?.map((variant, index) => {
      const matchingAsset = variantAssets.find(va => 
        va.name.toLowerCase().includes(variant.name?.toLowerCase() || '')
      );
      
      if (matchingAsset) {
        return {
          ...variant,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: matchingAsset.asset._id
            }
          }
        };
      }
      return variant;
    }) || [];

    // Update the product
    await client
      .patch(product._id)
      .set({
        image: mainImageAsset ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mainImageAsset._id
          }
        } : product.image,
        variants: updatedVariants
      })
      .commit();

    console.log('✅ Product updated with Sanity CDN images');
    console.log(`📊 Updated ${updatedVariants.length} variants`);

  } catch (error) {
    console.error('❌ Error updating product:', error);
  }
}

updateProductWithSanityImages();
