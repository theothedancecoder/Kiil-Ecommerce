const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

// Mapping of product slugs to their image paths
const productImageMappings = {
  'broquaine-vase-h38': {
    mainImage: '/Serax/Broquaine-vase-H38-cm/Serax Broquaine vase H38 cm NOK  1,395  Broquaine vase H38 cm quantity 1 .webp',
    lifestyleImages: [
      '/Serax/Broquaine-vase-H38-cm/lifestyle/SeraxB7222021_2.webp'
    ],
    variants: [
      {
        name: 'Natural',
        image: '/Serax/Broquaine-vase-H38-cm/Serax Broquaine vase H38 cm NOK  1,395  Broquaine vase H38 cm quantity 1 .webp'
      }
    ]
  },
  'broquaine-vase-s-h28': {
    mainImage: '/Serax/Broquaine-vase-S-H28-cm/Broquaine vase S H28 cm kr  995.webp',
    lifestyleImages: [
      '/Serax/Broquaine-vase-S-H28-cm/lifestyle/Broquaine vase S H28 cm kr  995.webp'
    ],
    variants: [
      {
        name: 'Natural',
        image: '/Serax/Broquaine-vase-S-H28-cm/Broquaine vase S H28 cm kr  995.webp'
      }
    ]
  },
  'catherine-table-lamp-47': {
    mainImage: '/Serax/Catherine-table-lamp-47-cm/Catherine table lamp 47 cm NOK  4,295  Color -  Black.webp',
    lifestyleImages: [
      '/Serax/Catherine-table-lamp-47-cm/lifestyle/582314-01_70_ProductImageCollection-139c880bd5.webp'
    ],
    variants: [
      {
        name: 'Black',
        image: '/Serax/Catherine-table-lamp-47-cm/Catherine table lamp 47 cm NOK  4,295  Color -  Black.webp'
      },
      {
        name: 'White',
        image: '/Serax/Catherine-table-lamp-47-cm/Catherine table lamp 47 cm NOK  4,295  Color -  White.webp'
      }
    ]
  },
  'glass-vase-wind-fire': {
    mainImage: '/Serax/Glass-Vase-Wind-&-Fire/Glass Vase Wind & Fire Blue NOK  1,195.avif',
    lifestyleImages: [
      '/Serax/Glass-Vase-Wind-&-Fire/lifestyle/Ecom_B0820110_02-jpg.webp'
    ],
    variants: [
      {
        name: 'Blue',
        image: '/Serax/Glass-Vase-Wind-&-Fire/Glass Vase Wind & Fire Blue NOK  1,195.avif'
      },
      {
        name: 'Yellow',
        image: '/Serax/Glass-Vase-Wind-&-Fire/Glass Vase Wind & Fire Yellow NOK  1,395.avif'
      }
    ]
  },
  'helena-vase': {
    mainImage: '/Serax/Helena-vase/Helena vase Fromkr  555  Color -  Black.webp',
    lifestyleImages: [
      '/Serax/Helena-vase/lifestyle/IMG_5616-scaled.jpg.avif'
    ],
    variants: [
      {
        name: 'Black',
        image: '/Serax/Helena-vase/Helena vase Fromkr  555  Color -  Black.webp'
      },
      {
        name: 'White',
        image: '/Serax/Helena-vase/Helena vase Fromkr  555  Color -  White.webp'
      }
    ]
  },
  'sophisticato-no-15-floor-lamp': {
    mainImage: '/Serax/Sophisticato-No.-15-Floor-lamp/Sophisticato No. 15 Floor lamp, Bluesteel NOK  8,100.jpeg',
    lifestyleImages: [
      '/Serax/Sophisticato-No.-15-Floor-lamp/lifestyle/serax-sofisticato-nr-15-gulvlampe-bluesteel-1.jpeg'
    ],
    variants: [
      {
        name: 'Bluesteel',
        image: '/Serax/Sophisticato-No.-15-Floor-lamp/Sophisticato No. 15 Floor lamp, Bluesteel NOK  8,100.jpeg'
      }
    ]
  },
  'vase-l-pure-2-pack': {
    mainImage: '/Serax/Vase-L-Pure/Vase L Pure 2 pack kr  695.jpeg',
    lifestyleImages: [],
    variants: [
      {
        name: 'Natural Set',
        image: '/Serax/Vase-L-Pure/Vase L Pure 2 pack kr  695.jpeg'
      }
    ]
  },
  'vase-stoneware': {
    mainImage: '/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Blue.webp',
    lifestyleImages: [
      '/Serax/Vase-Stoneware/lifestyle/Serax2.webp'
    ],
    variants: [
      {
        name: 'Blue',
        image: '/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Blue.webp'
      },
      {
        name: 'Green',
        image: '/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Green.jpeg'
      },
      {
        name: 'Light Pink',
        image: '/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Light pink.webp'
      },
      {
        name: 'Pink',
        image: '/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Pink.jpeg'
      }
    ]
  }
};

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    });

    console.log(`✅ Uploaded image: ${imagePath} -> ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Failed to upload image ${imagePath}:`, error.message);
    return null;
  }
}

async function updateProductWithImages(productSlug, imageMapping) {
  try {
    console.log(`\n🔄 Processing images for product: ${productSlug}`);

    // Get the existing product
    const existingProduct = await client.fetch(
      `*[_type == "product" && _id == "serax-${productSlug}"][0]`
    );

    if (!existingProduct) {
      console.log(`⚠️  Product not found: serax-${productSlug}`);
      return;
    }

    // Upload main image
    let mainImageAssetId = null;
    if (imageMapping.mainImage) {
      mainImageAssetId = await uploadImageToSanity(imageMapping.mainImage);
    }

    // Upload lifestyle images
    const lifestyleImageAssets = [];
    for (const lifestyleImage of imageMapping.lifestyleImages || []) {
      const assetId = await uploadImageToSanity(lifestyleImage);
      if (assetId) {
        lifestyleImageAssets.push({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId
          }
        });
      }
    }

    // Process variant images
    const updatedVariants = [];
    if (existingProduct.variants && imageMapping.variants) {
      for (let i = 0; i < existingProduct.variants.length; i++) {
        const existingVariant = existingProduct.variants[i];
        const imageVariant = imageMapping.variants.find(v => v.name === existingVariant.name);
        
        let variantImageAssetId = null;
        if (imageVariant && imageVariant.image) {
          variantImageAssetId = await uploadImageToSanity(imageVariant.image);
        }

        updatedVariants.push({
          ...existingVariant,
          image: variantImageAssetId ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: variantImageAssetId
            }
          } : existingVariant.image
        });
      }
    }

    // Update the product with images
    const updateData = {
      ...existingProduct,
      image: mainImageAssetId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageAssetId
        }
      } : existingProduct.image,
      lifestyleImages: lifestyleImageAssets.length > 0 ? lifestyleImageAssets : existingProduct.lifestyleImages,
      variants: updatedVariants.length > 0 ? updatedVariants : existingProduct.variants
    };

    const updatedProduct = await client.createOrReplace(updateData);
    console.log(`✅ Updated product with images: ${productSlug}`);
    return updatedProduct;

  } catch (error) {
    console.error(`❌ Failed to update product ${productSlug}:`, error.message);
    throw error;
  }
}

async function addSeraxImagesToSanity() {
  try {
    console.log('🚀 Starting Serax images upload to Sanity...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const [productSlug, imageMapping] of Object.entries(productImageMappings)) {
      try {
        await updateProductWithImages(productSlug, imageMapping);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to process ${productSlug}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n🎉 Image upload completed!');
    console.log(`✅ Successfully processed: ${successCount} products`);
    console.log(`❌ Failed: ${errorCount} products`);
    console.log(`📊 Total: ${Object.keys(productImageMappings).length} products`);

    if (successCount > 0) {
      console.log('\n💡 Next steps:');
      console.log('1. Check the Serax page to verify images are displaying');
      console.log('2. Test individual product pages');
      console.log('3. Verify all variants have correct images');
    }

  } catch (error) {
    console.error('❌ Image upload failed:', error.message);
    process.exit(1);
  }
}

// Run the image upload
if (require.main === module) {
  addSeraxImagesToSanity();
}

module.exports = { addSeraxImagesToSanity };
