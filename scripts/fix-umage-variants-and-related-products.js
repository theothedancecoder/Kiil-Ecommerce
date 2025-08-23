const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Complete variant data based on the legacy static data
const completeUmageProducts = {
  'product-umage-a-conversation-piece-dining-chair': {
    variants: [
      {
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp' // Will need to upload correct images
          }
        }
      },
      {
        name: 'Black Oak - Sugar Brown',
        material: 'Black Oak',
        color: 'Sugar Brown',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        name: 'Black Oak - White Sands',
        material: 'Black Oak',
        color: 'White Sands',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - White Sands',
        material: 'Oak',
        color: 'White Sands',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - White Sands',
        material: 'Dark Oak',
        color: 'White Sands',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        name: 'Walnut - Sugar Brown',
        material: 'Walnut',
        color: 'Sugar Brown',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        name: 'Walnut - White Sands',
        material: 'Walnut',
        color: 'White Sands',
        price: 7499,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      }
    ],
    relatedProducts: [
      { _type: 'reference', _ref: 'umage-heiko-dining-chair' },
      { _type: 'reference', _ref: 'umage-heart-n-soul-200-dining-table' },
      { _type: 'reference', _ref: 'umage-comfort-circle-dining-table' }
    ]
  },

  'umage-lounge-around-shuffle-puff': {
    variants: [
      {
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 7999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7adae926bf644824ac31c880c274d0ab9929625c-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - White Sands',
        material: 'Oak',
        color: 'White Sands',
        price: 7999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7adae926bf644824ac31c880c274d0ab9929625c-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - Shadow',
        material: 'Oak',
        color: 'Shadow',
        price: 7999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7adae926bf644824ac31c880c274d0ab9929625c-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 8299,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7adae926bf644824ac31c880c274d0ab9929625c-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - White Sands',
        material: 'Dark Oak',
        color: 'White Sands',
        price: 8299,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7adae926bf644824ac31c880c274d0ab9929625c-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - Shadow',
        material: 'Dark Oak',
        color: 'Shadow',
        price: 8299,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7adae926bf644824ac31c880c274d0ab9929625c-900x900-webp'
          }
        }
      }
    ],
    relatedProducts: [
      { _type: 'reference', _ref: 'umage-lounge-around-3-seater' },
      { _type: 'reference', _ref: 'umage-lounge-around-shuffle-coffee-table' },
      { _type: 'reference', _ref: 'umage-the-reader' }
    ]
  },

  'umage-the-reader': {
    variants: [
      {
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 18999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-dd8b9680613d5493e8feb7d4a1380ece7dc9ddd0-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - Summer Shine',
        material: 'Oak',
        color: 'Summer Shine',
        price: 18999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-dd8b9680613d5493e8feb7d4a1380ece7dc9ddd0-900x900-webp'
          }
        }
      },
      {
        name: 'Black Oak - Sugar Brown',
        material: 'Black Oak',
        color: 'Sugar Brown',
        price: 18999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-dd8b9680613d5493e8feb7d4a1380ece7dc9ddd0-900x900-webp'
          }
        }
      },
      {
        name: 'Black Oak - Summer Shine',
        material: 'Black Oak',
        color: 'Summer Shine',
        price: 18999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-dd8b9680613d5493e8feb7d4a1380ece7dc9ddd0-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 18999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-dd8b9680613d5493e8feb7d4a1380ece7dc9ddd0-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - Summer Shine',
        material: 'Dark Oak',
        color: 'Summer Shine',
        price: 18999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-dd8b9680613d5493e8feb7d4a1380ece7dc9ddd0-900x900-webp'
          }
        }
      }
    ],
    relatedProducts: [
      { _type: 'reference', _ref: 'product-umage-a-conversation-piece-dining-chair' },
      { _type: 'reference', _ref: 'umage-heiko-dining-chair' },
      { _type: 'reference', _ref: 'umage-lounge-around-3-seater' }
    ]
  },

  'umage-lounge-around-3-seater': {
    variants: [
      {
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 24999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-629c36695c2fa91de6c9affadde89f200ca5a662-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - White Sands',
        material: 'Oak',
        color: 'White Sands',
        price: 24999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-629c36695c2fa91de6c9affadde89f200ca5a662-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - Shadow',
        material: 'Oak',
        color: 'Shadow',
        price: 24999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-629c36695c2fa91de6c9affadde89f200ca5a662-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 24999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-629c36695c2fa91de6c9affadde89f200ca5a662-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - White Sands',
        material: 'Dark Oak',
        color: 'White Sands',
        price: 24999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-629c36695c2fa91de6c9affadde89f200ca5a662-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - Shadow',
        material: 'Dark Oak',
        color: 'Shadow',
        price: 24999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-629c36695c2fa91de6c9affadde89f200ca5a662-900x900-webp'
          }
        }
      }
    ],
    relatedProducts: [
      { _type: 'reference', _ref: 'umage-lounge-around-shuffle-coffee-table' },
      { _type: 'reference', _ref: 'umage-lounge-around-shuffle-puff' },
      { _type: 'reference', _ref: 'umage-the-reader' }
    ]
  },

  'umage-treasures-dresser': {
    variants: [
      {
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 16999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - White Sands',
        material: 'Oak',
        color: 'White Sands',
        price: 16999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - Morning Meadows',
        material: 'Oak',
        color: 'Morning Meadows',
        price: 16999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        name: 'Black Oak - Sugar Brown',
        material: 'Black Oak',
        color: 'Sugar Brown',
        price: 16999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        name: 'Black Oak - White Sands',
        material: 'Black Oak',
        color: 'White Sands',
        price: 16999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        name: 'Black Oak - Morning Meadows',
        material: 'Black Oak',
        color: 'Morning Meadows',
        price: 16999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 16999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - White Sands',
        material: 'Dark Oak',
        color: 'White Sands',
        price: 16999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        name: 'Dark Oak - Morning Meadows',
        material: 'Dark Oak',
        color: 'Morning Meadows',
        price: 16999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      }
    ],
    relatedProducts: [
      { _type: 'reference', _ref: 'umage-stories-shelving' },
      { _type: 'reference', _ref: 'umage-audacious-desk' },
      { _type: 'reference', _ref: 'umage-duende-desk' }
    ]
  },

  'umage-audacious-desk': {
    variants: [
      {
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 12999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - White Sands',
        material: 'Oak',
        color: 'White Sands',
        price: 12999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - Sterling',
        material: 'Oak',
        color: 'Sterling',
        price: 12999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - Shadow',
        material: 'Oak',
        color: 'Shadow',
        price: 12999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - Morning Meadows',
        material: 'Oak',
        color: 'Morning Meadows',
        price: 12999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - Hazelnut',
        material: 'Oak',
        color: 'Hazelnut',
        price: 12999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        name: 'Oak - Charcoal',
        material: 'Oak',
        color: 'Charcoal',
        price: 12999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      }
    ],
    relatedProducts: [
      { _type: 'reference', _ref: 'umage-duende-desk' },
      { _type: 'reference', _ref: 'umage-stories-shelving' },
      { _type: 'reference', _ref: 'umage-treasures-dresser' }
    ]
  }
};

async function updateUmageProducts() {
  console.log('🔧 Starting Umage products update...');
  
  try {
    // Get all current Umage products
    const currentProducts = await client.fetch(`
      *[_type == "product" && brand == "UMAGE"] {
        _id,
        name,
        variants,
        relatedProducts
      }
    `);

    console.log(`📦 Found ${currentProducts.length} Umage products to update`);

    for (const product of currentProducts) {
      const productId = product._id;
      const updateData = completeUmageProducts[productId];
      
      if (updateData) {
        console.log(`\n🔄 Updating ${product.name}...`);
        console.log(`   Current variants: ${product.variants?.length || 0}`);
        console.log(`   New variants: ${updateData.variants.length}`);
        
        // Update the product with new variants and related products
        const result = await client
          .patch(productId)
          .set({
            variants: updateData.variants,
            relatedProducts: updateData.relatedProducts
          })
          .commit();
          
        console.log(`   ✅ Updated successfully`);
      } else {
        console.log(`\n⚠️  No update data found for ${product.name} (${productId})`);
      }
    }

    console.log('\n🎉 Umage products update completed!');
    
  } catch (error) {
    console.error('❌ Error updating Umage products:', error);
  }
}

// Add related products to products that don't have complete variant data but need related products
async function addRelatedProductsToOthers() {
  console.log('\n🔗 Adding related products to other Umage products...');
  
  const relatedProductsMap = {
    'umage-gather-cafe-table': [
      { _type: 'reference', _ref: 'umage-heiko-dining-chair' },
      { _type: 'reference', _ref: 'product-umage-a-conversation-piece-dining-chair' },
      { _type: 'reference', _ref: 'umage-asteria-spotlight' }
    ],
    'umage-heiko-dining-chair': [
      { _type: 'reference', _ref: 'umage-gather-cafe-table' },
      { _type: 'reference', _ref: 'product-umage-a-conversation-piece-dining-chair' },
      { _type: 'reference', _ref: 'umage-heart-n-soul-200-dining-table' }
    ],
    'umage-chordis': [
      { _type: 'reference', _ref: 'umage-lemon-squeeze-ceiling-lamp' },
      { _type: 'reference', _ref: 'umage-asteria-spotlight' },
      { _type: 'reference', _ref: 'umage-lemon-squeeze-wall-lamp-single' }
    ],
    'umage-asteria-spotlight': [
      { _type: 'reference', _ref: 'umage-chordis' },
      { _type: 'reference', _ref: 'umage-lemon-squeeze-ceiling-lamp' },
      { _type: 'reference', _ref: 'umage-lemon-squeeze-wall-lamp-single' }
    ],
    'umage-comfort-circle-dining-table': [
      { _type: 'reference', _ref: 'product-umage-a-conversation-piece-dining-chair' },
      { _type: 'reference', _ref: 'umage-heiko-dining-chair' },
      { _type: 'reference', _ref: 'umage-heart-n-soul-200-dining-table' }
    ],
    'umage-duende-desk': [
      { _type: 'reference', _ref: 'umage-audacious-desk' },
      { _type: 'reference', _ref: 'umage-stories-shelving' },
      { _type: 'reference', _ref: 'umage-treasures-dresser' }
    ],
    'umage-heart-n-soul-200-dining-table': [
      { _type: 'reference', _ref: 'product-umage-a-conversation-piece-dining-chair' },
      { _type: 'reference', _ref: 'umage-heiko-dining-chair' },
      { _type: 'reference', _ref: 'umage-heart-n-soul-console-table' }
    ],
    'umage-heart-n-soul-console-table': [
      { _type: 'reference', _ref: 'umage-heart-n-soul-200-dining-table' },
      { _type: 'reference', _ref: 'umage-heart-n-soul-dining-120' },
      { _type: 'reference', _ref: 'umage-stories-shelving' }
    ],
    'umage-heart-n-soul-dining-120': [
      { _type: 'reference', _ref: 'umage-heart-n-soul-200-dining-table' },
      { _type: 'reference', _ref: 'product-umage-a-conversation-piece-dining-chair' },
      { _type: 'reference', _ref: 'umage-heiko-dining-chair' }
    ],
    'umage-heart-n-soul-dining-table': [
      { _type: 'reference', _ref: 'product-umage-a-conversation-piece-dining-chair' },
      { _type: 'reference', _ref: 'umage-heiko-dining-chair' },
      { _type: 'reference', _ref: 'umage-heart-n-soul-200-dining-table' }
    ],
    'umage-italic-table': [
      { _type: 'reference', _ref: 'umage-lounge-around-shuffle-coffee-table' },
      { _type: 'reference', _ref: 'umage-heart-n-soul-console-table' },
      { _type: 'reference', _ref: 'umage-gather-cafe-table' }
    ],
    'umage-lemon-squeeze-ceiling-lamp': [
      { _type: 'reference', _ref: 'umage-chordis' },
      { _type: 'reference', _ref: 'umage-asteria-spotlight' },
      { _type: 'reference', _ref: 'umage-lemon-squeeze-wall-lamp-single' }
    ],
    'umage-lemon-squeeze-wall-lamp-double': [
      { _type: 'reference', _ref: 'umage-lemon-squeeze-wall-lamp-single' },
      { _type: 'reference', _ref: 'umage-lemon-squeeze-ceiling-lamp' },
      { _type: 'reference', _ref: 'umage-asteria-spotlight' }
    ],
    'umage-lemon-squeeze-wall-lamp-single': [
      { _type: 'reference', _ref: 'umage-lemon-squeeze-wall-lamp-double' },
      { _type: 'reference', _ref: 'umage-lemon-squeeze-ceiling-lamp' },
      { _type: 'reference', _ref: 'umage-asteria-spotlight' }
    ],
    'umage-lounge-around-shuffle-coffee-table': [
      { _type: 'reference', _ref: 'umage-lounge-around-3-seater' },
      { _type: 'reference', _ref: 'umage-lounge-around-shuffle-puff' },
      { _type: 'reference', _ref: 'umage-italic-table' }
    ],
    'umage-metal-cover-accessories-asteria': [
      { _type: 'reference', _ref: 'umage-asteria-spotlight' },
      { _type: 'reference', _ref: 'umage-chordis' },
      { _type: 'reference', _ref: 'umage-lemon-squeeze-ceiling-lamp' }
    ],
    'umage-stories-shelving': [
      { _type: 'reference', _ref: 'umage-treasures-dresser' },
      { _type: 'reference', _ref: 'umage-audacious-desk' },
      { _type: 'reference', _ref: 'umage-duende-desk' }
    ],
    'umage-the-socialite-bar-stool': [
      { _type: 'reference', _ref: 'umage-the-socialite-counter-chair' },
      { _type: 'reference', _ref: 'umage-gather-cafe-table' },
      { _type: 'reference', _ref: 'umage-heart-n-soul-200-dining-table' }
    ],
    'umage-the-socialite-counter-chair': [
      { _type: 'reference', _ref: 'umage-the-socialite-bar-stool' },
      { _type: 'reference', _ref: 'umage-gather-cafe-table' },
      { _type: 'reference', _ref: 'umage-heart-n-soul-console-table' }
    ]
  };

  try {
    for (const [productId, relatedProducts] of Object.entries(relatedProductsMap)) {
      console.log(`🔗 Adding related products to ${productId}...`);
      
      await client
        .patch(productId)
        .set({ relatedProducts })
        .commit();
        
      console.log(`   ✅ Added ${relatedProducts.length} related products`);
    }
    
    console.log('\n🎉 Related products update completed!');
    
  } catch (error) {
    console.error('❌ Error adding related products:', error);
  }
}

async function main() {
  console.log('🚀 Starting Umage products enhancement...\n');
  
  await updateUmageProducts();
  await addRelatedProductsToOthers();
  
  console.log('\n✨ All updates completed successfully!');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { updateUmageProducts, addRelatedProductsToOthers };
