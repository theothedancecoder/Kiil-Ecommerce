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

console.log('🔧 Fixing Umage variant images with correct individual images...');

// Correct mapping of each variant to its specific image
const correctVariantImages = [
  {
    variantKey: '40296e19d603', // Oak - Sugar Brown
    name: 'Oak - Sugar Brown',
    localPath: '/umage/A-Conversation-Piece/umage_packshoA%20Conversation%20Piece%20dining%20chair%207,499%20krt_5589c740-01_a-conversation-piece_dining-chair_oak_sugar-brown_-2_900x.webp'
  },
  {
    variantKey: 'b5cbe0a5454d', // Black Oak - Sugar Brown
    name: 'Black Oak - Sugar Brown',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5131c740-01_a-conversation-piece_dining-chair_black-oak_sugar-brown_-2_900x.webp'
  },
  {
    variantKey: '781563edf27a', // Black Oak - White Sands
    name: 'Black Oak - White Sands',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5131c740-02_a-conversation-piece_dining-chair_black-oak_white-sands_-2_900x.webp'
  },
  {
    variantKey: 'bc21945e9ea0', // Oak - White Sands
    name: 'Oak - White Sands',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5589c740-02_a-conversation-piece_dining-chair_oak_white-sands_-2_900x.webp'
  },
  {
    variantKey: 'a55c6171c976', // Dark Oak - Sugar Brown
    name: 'Dark Oak - Sugar Brown',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5789c740-01_a-conversation-piece_dining-chair_dark-oak_sugar-brown_-2_900x.webp'
  },
  {
    variantKey: 'c43706e2880b', // Dark Oak - White Sands
    name: 'Dark Oak - White Sands',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5789c740-02_a-conversation-piece_dining-chair_dark-oak_white-sands_-2_900x.webp'
  },
  {
    variantKey: '180a285e0d90', // Walnut - Sugar Brown
    name: 'Walnut - Sugar Brown',
    localPath: '/umage/A-Conversation-Piece/umage_packshot_5895c740-01_a-conversation-piece_dining-chair_walnut_sugar-brown_-2_900x.webp'
  },
  {
    variantKey: '5283d36e0907', // Walnut - White Sands
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

async function fixVariantImages() {
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
    console.log(`📊 Current variants: ${product.variants?.length || 0}`);

    // Upload correct images for each variant
    const updatedVariants = [];
    
    for (const variantMapping of correctVariantImages) {
      // Find the variant in the product
      const variant = product.variants.find(v => v._key === variantMapping.variantKey);
      
      if (!variant) {
        console.log(`❌ Variant not found: ${variantMapping.name}`);
        continue;
      }

      console.log(`\n🔧 Processing variant: ${variantMapping.name}`);
      
      // Upload the correct image for this variant
      const asset = await uploadImageToSanity(
        variantMapping.localPath,
        `a-conversation-piece-${variantMapping.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.webp`
      );

      if (asset) {
        updatedVariants.push({
          ...variant,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          }
        });
        console.log(`✅ Updated variant: ${variantMapping.name} with image ${asset._id}`);
      } else {
        // Keep the existing variant if upload failed
        updatedVariants.push(variant);
        console.log(`⚠️ Keeping existing image for: ${variantMapping.name}`);
      }
    }

    // Update the product with the corrected variant images
    await client
      .patch(product._id)
      .set({
        variants: updatedVariants
      })
      .commit();

    console.log('\n✅ Successfully updated all variant images!');
    console.log(`📊 Updated ${updatedVariants.length} variants with unique images`);

  } catch (error) {
    console.error('❌ Error fixing variant images:', error);
  }
}

fixVariantImages();
