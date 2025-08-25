const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Complete variant data for all 25 Umage products using existing image references
const completeUmageVariants = {
  'product-umage-a-conversation-piece-dining-chair': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak - Sugar Brown',
        material: 'Oak',
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
        _key: 'variant-1',
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
        _key: 'variant-2',
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
        _key: 'variant-3',
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
        _key: 'variant-4',
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 7699,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-5',
        name: 'Dark Oak - White Sands',
        material: 'Dark Oak',
        color: 'White Sands',
        price: 7699,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-6',
        name: 'Walnut - Sugar Brown',
        material: 'Walnut',
        color: 'Sugar Brown',
        price: 7799,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-7',
        name: 'Walnut - White Sands',
        material: 'Walnut',
        color: 'White Sands',
        price: 7799,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      }
    ]
  },

  'umage-asteria-spotlight': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Black',
        material: 'Metal',
        color: 'Black',
        price: 2099,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-1',
        name: 'Plated Brass',
        material: 'Brass',
        color: 'Plated Brass',
        price: 2199,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-2',
        name: 'Polished Steel',
        material: 'Steel',
        color: 'Polished Steel',
        price: 2149,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      }
    ]
  },

  'umage-audacious-desk': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 14999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-1',
        name: 'Oak - White Sands',
        material: 'Oak',
        color: 'White Sands',
        price: 14999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-2',
        name: 'Oak - Sterling',
        material: 'Oak',
        color: 'Sterling',
        price: 14999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-3',
        name: 'Oak - Shadow',
        material: 'Oak',
        color: 'Shadow',
        price: 14999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-4',
        name: 'Oak - Morning Meadows',
        material: 'Oak',
        color: 'Morning Meadows',
        price: 14999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-5',
        name: 'Oak - Hazelnut',
        material: 'Oak',
        color: 'Hazelnut',
        price: 14999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-6',
        name: 'Oak - Charcoal',
        material: 'Oak',
        color: 'Charcoal',
        price: 14999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-a41900652dd5679306458f3996ea807fa0368c75-900x900-webp'
          }
        }
      }
    ]
  },

  'umage-chordis': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Brass',
        material: 'Brass',
        color: 'Brass',
        price: 5699,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-629c36695c2fa91de6c9affadde89f200ca5a662-900x900-webp'
          }
        }
      }
    ]
  },

  'umage-comfort-circle-dining-table': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Black Oak',
        material: 'Black Oak',
        color: 'Black',
        price: 17999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-dd8b9680613d5493e8feb7d4a1380ece7dc9ddd0-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-1',
        name: 'Oak',
        material: 'Oak',
        color: 'Natural',
        price: 17999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-dd8b9680613d5493e8feb7d4a1380ece7dc9ddd0-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-2',
        name: 'Dark Oak',
        material: 'Dark Oak',
        color: 'Dark',
        price: 18199,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-dd8b9680613d5493e8feb7d4a1380ece7dc9ddd0-900x900-webp'
          }
        }
      }
    ]
  },

  'umage-duende-desk': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Black Oak',
        material: 'Black Oak',
        color: 'Black',
        price: 12999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7adae926bf644824ac31c880c274d0ab9929625c-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-1',
        name: 'Oak',
        material: 'Oak',
        color: 'Natural',
        price: 12999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7adae926bf644824ac31c880c274d0ab9929625c-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-2',
        name: 'Dark Oak',
        material: 'Dark Oak',
        color: 'Dark',
        price: 13199,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7adae926bf644824ac31c880c274d0ab9929625c-900x900-webp'
          }
        }
      }
    ]
  },

  'umage-gather-cafe-table': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Beige Travertine',
        material: 'Travertine',
        color: 'Beige',
        price: 8999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-1',
        name: 'Brown Emperador',
        material: 'Marble',
        color: 'Brown Emperador',
        price: 9299,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      }
    ]
  },

  'umage-heiko-dining-chair': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak',
        material: 'Oak',
        color: 'Natural',
        price: 6999,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-1',
        name: 'Walnut',
        material: 'Walnut',
        color: 'Natural',
        price: 7299,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp'
          }
        }
      }
    ]
  },

  'umage-treasures-dresser': {
    variants: [
      {
        _key: 'variant-0',
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
        _key: 'variant-1',
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
        _key: 'variant-2',
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
        _key: 'variant-3',
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
        _key: 'variant-4',
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
        _key: 'variant-5',
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
        _key: 'variant-6',
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 17199,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-7',
        name: 'Dark Oak - White Sands',
        material: 'Dark Oak',
        color: 'White Sands',
        price: 17199,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      },
      {
        _key: 'variant-8',
        name: 'Dark Oak - Morning Meadows',
        material: 'Dark Oak',
        color: 'Morning Meadows',
        price: 17199,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-081fe51e1556ab2ff1e3c336092fa099cb49d70a-900x900-webp'
          }
        }
      }
    ]
  }
};

// Additional products with basic variants
const additionalProducts = {
  'umage-heart-n-soul-200-dining-table': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak - Natural',
        material: 'Oak',
        color: 'Natural',
        price: 19999
      },
      {
        _key: 'variant-1',
        name: 'Black Oak',
        material: 'Black Oak',
        color: 'Black',
        price: 19999
      },
      {
        _key: 'variant-2',
        name: 'Dark Oak',
        material: 'Dark Oak',
        color: 'Dark',
        price: 20199
      },
      {
        _key: 'variant-3',
        name: 'Walnut',
        material: 'Walnut',
        color: 'Natural',
        price: 20499
      },
      {
        _key: 'variant-4',
        name: 'Oak - Obsidian Black',
        material: 'Oak',
        color: 'Obsidian Black',
        price: 19999
      },
      {
        _key: 'variant-5',
        name: 'Oak - Cloud Grey',
        material: 'Oak',
        color: 'Cloud Grey',
        price: 19999
      },
      {
        _key: 'variant-6',
        name: 'Oak - Moss Green',
        material: 'Oak',
        color: 'Moss Green',
        price: 19999
      }
    ]
  },

  'umage-heart-n-soul-console-table': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak - Natural',
        material: 'Oak',
        color: 'Natural',
        price: 12999
      },
      {
        _key: 'variant-1',
        name: 'Black Oak',
        material: 'Black Oak',
        color: 'Black',
        price: 12999
      },
      {
        _key: 'variant-2',
        name: 'Dark Oak',
        material: 'Dark Oak',
        color: 'Dark',
        price: 13199
      },
      {
        _key: 'variant-3',
        name: 'Oak - Cloud Grey',
        material: 'Oak',
        color: 'Cloud Grey',
        price: 12999
      },
      {
        _key: 'variant-4',
        name: 'Oak - Moss Green',
        material: 'Oak',
        color: 'Moss Green',
        price: 12999
      }
    ]
  },

  'umage-heart-n-soul-dining-120': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak - Natural',
        material: 'Oak',
        color: 'Natural',
        price: 16999
      },
      {
        _key: 'variant-1',
        name: 'Black Oak',
        material: 'Black Oak',
        color: 'Black',
        price: 16999
      },
      {
        _key: 'variant-2',
        name: 'Dark Oak',
        material: 'Dark Oak',
        color: 'Dark',
        price: 17199
      },
      {
        _key: 'variant-3',
        name: 'Walnut',
        material: 'Walnut',
        color: 'Natural',
        price: 17499
      },
      {
        _key: 'variant-4',
        name: 'Oak - Obsidian Black',
        material: 'Oak',
        color: 'Obsidian Black',
        price: 16999
      },
      {
        _key: 'variant-5',
        name: 'Oak - Cloud Grey',
        material: 'Oak',
        color: 'Cloud Grey',
        price: 16999
      },
      {
        _key: 'variant-6',
        name: 'Oak - Moss Green',
        material: 'Oak',
        color: 'Moss Green',
        price: 16999
      }
    ]
  },

  'umage-lounge-around-3-seater': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 24999
      },
      {
        _key: 'variant-1',
        name: 'Oak - White Sands',
        material: 'Oak',
        color: 'White Sands',
        price: 24999
      },
      {
        _key: 'variant-2',
        name: 'Oak - Shadow',
        material: 'Oak',
        color: 'Shadow',
        price: 24999
      },
      {
        _key: 'variant-3',
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 25299
      },
      {
        _key: 'variant-4',
        name: 'Dark Oak - White Sands',
        material: 'Dark Oak',
        color: 'White Sands',
        price: 25299
      },
      {
        _key: 'variant-5',
        name: 'Dark Oak - Shadow',
        material: 'Dark Oak',
        color: 'Shadow',
        price: 25299
      }
    ]
  },

  'umage-lounge-around-shuffle-puff': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 7999
      },
      {
        _key: 'variant-1',
        name: 'Oak - White Sands',
        material: 'Oak',
        color: 'White Sands',
        price: 7999
      },
      {
        _key: 'variant-2',
        name: 'Oak - Shadow',
        material: 'Oak',
        color: 'Shadow',
        price: 7999
      },
      {
        _key: 'variant-3',
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 8299
      },
      {
        _key: 'variant-4',
        name: 'Dark Oak - White Sands',
        material: 'Dark Oak',
        color: 'White Sands',
        price: 8299
      },
      {
        _key: 'variant-5',
        name: 'Dark Oak - Shadow',
        material: 'Dark Oak',
        color: 'Shadow',
        price: 8299
      }
    ]
  },

  'umage-lounge-around-shuffle-coffee-table': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak',
        material: 'Oak',
        color: 'Natural',
        price: 8999
      },
      {
        _key: 'variant-1',
        name: 'Dark Oak',
        material: 'Dark Oak',
        color: 'Dark',
        price: 9199
      }
    ]
  },

  'umage-the-reader': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak - Sugar Brown',
        material: 'Oak',
        color: 'Sugar Brown',
        price: 18999
      },
      {
        _key: 'variant-1',
        name: 'Oak - Summer Shine',
        material: 'Oak',
        color: 'Summer Shine',
        price: 18999
      },
      {
        _key: 'variant-2',
        name: 'Black Oak - Sugar Brown',
        material: 'Black Oak',
        color: 'Sugar Brown',
        price: 18999
      },
      {
        _key: 'variant-3',
        name: 'Black Oak - Summer Shine',
        material: 'Black Oak',
        color: 'Summer Shine',
        price: 18999
      },
      {
        _key: 'variant-4',
        name: 'Dark Oak - Sugar Brown',
        material: 'Dark Oak',
        color: 'Sugar Brown',
        price: 19199
      },
      {
        _key: 'variant-5',
        name: 'Dark Oak - Summer Shine',
        material: 'Dark Oak',
        color: 'Summer Shine',
        price: 19199
      }
    ]
  },

  'umage-stories-shelving': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak',
        material: 'Oak',
        color: 'Natural',
        price: 8999
      },
      {
        _key: 'variant-1',
        name: 'Dark Oak',
        material: 'Dark Oak',
        color: 'Dark',
        price: 9199
      }
    ]
  },

  'umage-the-socialite-bar-stool': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak',
        material: 'Oak',
        color: 'Natural',
        price: 4999
      },
      {
        _key: 'variant-1',
        name: 'Black Oak',
        material: 'Black Oak',
        color: 'Black',
        price: 4999
      },
      {
        _key: 'variant-2',
        name: 'Dark Oak',
        material: 'Dark Oak',
        color: 'Dark',
        price: 5199
      }
    ]
  },

  'umage-the-socialite-counter-chair': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak',
        material: 'Oak',
        color: 'Natural',
        price: 4699
      },
      {
        _key: 'variant-1',
        name: 'Black Oak',
        material: 'Black Oak',
        color: 'Black',
        price: 4699
      },
      {
        _key: 'variant-2',
        name: 'Dark Oak',
        material: 'Dark Oak',
        color: 'Dark',
        price: 4899
      }
    ]
  },

  'umage-lemon-squeeze-ceiling-lamp': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Long - Plated Brass',
        material: 'Brass',
        color: 'Plated Brass',
        price: 3999
      },
      {
        _key: 'variant-1',
        name: 'Long - Polished Steel',
        material: 'Steel',
        color: 'Polished Steel',
        price: 3899
      },
      {
        _key: 'variant-2',
        name: 'Short - Plated Brass',
        material: 'Brass',
        color: 'Plated Brass',
        price: 3699
      },
      {
        _key: 'variant-3',
        name: 'Short - Polished Steel',
        material: 'Steel',
        color: 'Polished Steel',
        price: 3599
      }
    ]
  },

  'umage-lemon-squeeze-wall-lamp-single': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Long - Plated Brass',
        material: 'Brass',
        color: 'Plated Brass',
        price: 3499
      },
      {
        _key: 'variant-1',
        name: 'Long - Polished Steel',
        material: 'Steel',
        color: 'Polished Steel',
        price: 3399
      },
      {
        _key: 'variant-2',
        name: 'Short - Plated Brass',
        material: 'Brass',
        color: 'Plated Brass',
        price: 3199
      },
      {
        _key: 'variant-3',
        name: 'Short - Polished Steel',
        material: 'Steel',
        color: 'Polished Steel',
        price: 3099
      }
    ]
  },

  'umage-lemon-squeeze-wall-lamp-double': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Short - Plated Brass',
        material: 'Brass',
        color: 'Plated Brass',
        price: 4999
      },
      {
        _key: 'variant-1',
        name: 'Short - Polished Steel',
        material: 'Steel',
        color: 'Polished Steel',
        price: 4799
      }
    ]
  },

  'umage-italic-table': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Oak - Glass',
        material: 'Oak',
        color: 'Natural',
        price: 14999
      },
      {
        _key: 'variant-1',
        name: 'Black Oak - Glass',
        material: 'Black Oak',
        color: 'Black',
        price: 14999
      },
      {
        _key: 'variant-2',
        name: 'Dark Oak - Glass',
        material: 'Dark Oak',
        color: 'Dark',
        price: 15199
      }
    ]
  },

  'umage-metal-cover-accessories-asteria': {
    variants: [
      {
        _key: 'variant-0',
        name: 'Micro - Steel',
        material: 'Steel',
        color: 'Steel',
        price: 599
      },
      {
        _key: 'variant-1',
        name: 'Micro - Brass',
        material: 'Brass',
        color: 'Brass',
        price: 649
      },
      {
        _key: 'variant-2',
        name: 'Mini - Steel',
        material: 'Steel',
        color: 'Steel',
        price: 699
      },
      {
        _key: 'variant-3',
        name: 'Mini - Brass',
        material: 'Brass',
        color: 'Brass',
        price: 749
      }
    ]
  }
};

// Combine all variant data
const allVariantData = { ...completeUmageVariants, ...additionalProducts };

// Add default image reference to variants that don't have one
function addDefaultImageToVariants(variants, defaultImageRef = 'image-0208fd2a31a998472ac59b2c781baa20c9ec30c1-900x900-webp') {
  return variants.map(variant => ({
    ...variant,
    image: variant.image || {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: defaultImageRef
      }
    }
  }));
}

async function fixAllUmageVariants() {
  console.log('🚀 Starting Umage variants fix with existing images...\n');
  
  try {
    // Get all current Umage products
    const currentProducts = await client.fetch(`
      *[_type == "product" && brand == "UMAGE"] {
        _id,
        name,
        slug,
        variants
      }
    `);

    console.log(`📦 Found ${currentProducts.length} Umage products to update`);

    let updatedCount = 0;

    for (const product of currentProducts) {
      const productId = product._id;
      const productSlug = product.slug?.current;
      
      // Try to find variant data by different possible IDs
      let variantData = null;
      const possibleIds = [
        productId,
        productSlug,
        `umage-${productSlug}`,
        productSlug?.replace('umage-', ''),
        `product-umage-${productSlug?.replace('umage-', '')}`
      ].filter(Boolean);

      for (const id of possibleIds) {
        if (allVariantData[id]) {
          variantData = allVariantData[id];
          break;
        }
      }
      
      if (variantData) {
        console.log(`\n🔄 Updating ${product.name}...`);
        console.log(`   Current variants: ${product.variants?.length || 0}`);
        console.log(`   New variants: ${variantData.variants.length}`);
        
        // Add default images to variants that don't have them
        const variantsWithImages = addDefaultImageToVariants(variantData.variants);
        
        // Update the product with new variants
        const result = await client
          .patch(productId)
          .set({
            variants: variantsWithImages
          })
          .commit();
          
        console.log(`   ✅ Updated successfully with ${variantsWithImages.length} variants`);
        updatedCount++;
      } else {
        console.log(`\n⚠️  No variant data found for ${product.name}`);
        console.log(`     Product ID: ${productId}`);
        console.log(`     Product Slug: ${productSlug}`);
        console.log(`     Tried IDs: ${possibleIds.join(', ')}`);
      }
    }

    console.log(`\n🎉 Umage variants fix completed!`);
    console.log(`📊 Updated ${updatedCount} out of ${currentProducts.length} products`);
    
  } catch (error) {
    console.error('❌ Error updating Umage variants:', error);
  }
}

async function main() {
  console.log('🎯 Starting Umage variants fix process...\n');
  
  await fixAllUmageVariants();
  
  console.log('\n✨ All Umage variants have been updated!');
  console.log('🔍 You can now check the Umage page to see all products with proper variants.');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fixAllUmageVariants };
