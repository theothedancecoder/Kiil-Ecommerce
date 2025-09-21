const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
  useCdn: false,
});

async function fixConversationPieceVariants() {
  console.log('🔧 Fixing A Conversation Piece Dining Chair variants...');

  try {
    // First, upload the correct variant images
    const variantImages = [
      {
        name: 'Oak - Sugar Brown',
        imagePath: 'public/umage/A-Conversation-Piece/umage_packshoA Conversation Piece dining chair 7,499 krt_5589c740-01_a-conversation-piece_dining-chair_oak_sugar-brown_-2_900x.webp'
      },
      {
        name: 'Black Oak - Sugar Brown',
        imagePath: 'public/umage/A-Conversation-Piece/umage_packshot_5131c740-01_a-conversation-piece_dining-chair_black-oak_sugar-brown_-2_900x.webp'
      },
      {
        name: 'Black Oak - White Sands',
        imagePath: 'public/umage/A-Conversation-Piece/umage_packshot_5131c740-02_a-conversation-piece_dining-chair_black-oak_white-sands_-2_900x.webp'
      },
      {
        name: 'Oak - White Sands',
        imagePath: 'public/umage/A-Conversation-Piece/umage_packshot_5589c740-02_a-conversation-piece_dining-chair_oak_white-sands_-2_900x.webp'
      },
      {
        name: 'Dark Oak - Sugar Brown',
        imagePath: 'public/umage/A-Conversation-Piece/umage_packshot_5789c740-01_a-conversation-piece_dining-chair_dark-oak_sugar-brown_-2_900x.webp'
      },
      {
        name: 'Dark Oak - White Sands',
        imagePath: 'public/umage/A-Conversation-Piece/umage_packshot_5789c740-02_a-conversation-piece_dining-chair_dark-oak_white-sands_-2_900x.webp'
      },
      {
        name: 'Walnut - Sugar Brown',
        imagePath: 'public/umage/A-Conversation-Piece/umage_packshot_5895c740-01_a-conversation-piece_dining-chair_walnut_sugar-brown_-2_900x.webp'
      },
      {
        name: 'Walnut - White Sands',
        imagePath: 'public/umage/A-Conversation-Piece/umage_packshot_5895c740-02_a-conversation-piece_dining-chair_walnut_white-sands_-2_900x.webp'
      }
    ];

    const uploadedImages = {};

    // Upload each variant image
    for (const variant of variantImages) {
      if (fs.existsSync(variant.imagePath)) {
        console.log(`📤 Uploading ${variant.name}...`);
        const imageBuffer = fs.readFileSync(variant.imagePath);
        const filename = path.basename(variant.imagePath);
        
        const asset = await client.assets.upload('image', imageBuffer, {
          filename: filename,
        });
        
        uploadedImages[variant.name] = asset._id;
        console.log(`✅ Uploaded ${variant.name}: ${asset._id}`);
      } else {
        console.log(`⚠️  Image not found: ${variant.imagePath}`);
      }
    }

    // Now update the product with correct variant images
    const productId = 'product-umage-a-conversation-piece-dining-chair';
    
    const variants = [
      {
        _key: 'oak-sugar-brown',
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages['Oak - Sugar Brown']
          }
        }
      },
      {
        _key: 'black-oak-sugar-brown',
        name: 'Black Oak - Sugar Brown',
        material: 'Black Oak',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages['Black Oak - Sugar Brown']
          }
        }
      },
      {
        _key: 'black-oak-white-sands',
        name: 'Black Oak - White Sands',
        material: 'Black Oak',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages['Black Oak - White Sands']
          }
        }
      },
      {
        _key: 'oak-white-sands',
        name: 'Oak - White Sands',
        material: 'Oak',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages['Oak - White Sands']
          }
        }
      },
      {
        _key: 'dark-oak-sugar-brown',
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages['Dark Oak - Sugar Brown']
          }
        }
      },
      {
        _key: 'dark-oak-white-sands',
        name: 'Dark Oak - White Sands',
        material: 'Dark Oak',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages['Dark Oak - White Sands']
          }
        }
      },
      {
        _key: 'walnut-sugar-brown',
        name: 'Walnut - Sugar Brown',
        material: 'Walnut',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages['Walnut - Sugar Brown']
          }
        }
      },
      {
        _key: 'walnut-white-sands',
        name: 'Walnut - White Sands',
        material: 'Walnut',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages['Walnut - White Sands']
          }
        }
      }
    ];

    // Update the product with new variants
    console.log('🔄 Updating product variants...');
    const result = await client
      .patch(productId)
      .set({ variants: variants })
      .commit();

    console.log('✅ Successfully updated A Conversation Piece Dining Chair variants!');
    console.log(`Updated ${variants.length} variants with unique images`);

    // Also set the main product image to the first variant
    await client
      .patch(productId)
      .set({ 
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImages['Oak - Sugar Brown']
          }
        }
      })
      .commit();

    console.log('✅ Updated main product image');

  } catch (error) {
    console.error('❌ Error fixing variants:', error);
  }
}

fixConversationPieceVariants();
