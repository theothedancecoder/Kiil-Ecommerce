import { createClient } from '@sanity/client';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

const audoProducts = [
  {
    name: 'Interconnect Candlestick',
    slug: 'interconnect-candlestick',
    description: 'The Interconnect Candlestick embodies Audo Copenhagen\'s philosophy of functional design with sculptural beauty. This elegant modular candlestick system allows you to create unique configurations, making it both a practical lighting solution and an artistic statement piece.',
    price: 5795,
    brand: 'Audo Copenhagen',
    category: 'Accessories',
    designer: 'Audo Copenhagen Design Team',
    material: 'Metal with premium finish',
    dimensions: 'H 15cm, Ø 8cm',
    mainImage: '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass.webp',
    variants: [
      {
        name: 'Brass',
        color: 'Brass',
        price: 5795,
        image: '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass.webp'
      },
      {
        name: 'Black',
        color: 'Black',
        price: 5795,
        image: '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/Interconnect candlestick NOK  5,795  Color -  Black.webp'
      }
    ],
    lifestyleImages: [
      '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/lifestyle/10696988r_2.webp'
    ],
    features: [
      'Modular design allows for unique configurations',
      'Available in premium brass and black finishes',
      'Sculptural beauty meets functional design',
      'Perfect as standalone piece or in groups',
      'High-quality materials and craftsmanship',
      'Suitable for various candle sizes',
      'Easy to clean and maintain',
      'Timeless Scandinavian aesthetic'
    ]
  }
];

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = join(process.cwd(), 'public', imagePath);
    const imageBuffer = readFileSync(fullPath);
    const filename = basename(imagePath);
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    
    console.log(`✅ Uploaded image: ${filename}`);
    return asset;
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

async function migrateAudoCopenhagenProducts() {
  console.log('🚀 Starting Audo Copenhagen migration to Sanity...\n');

  for (const product of audoProducts) {
    try {
      console.log(`\n📦 Processing: ${product.name}`);

      // Upload main image
      console.log('  Uploading main image...');
      const mainImageAsset = await uploadImageToSanity(product.mainImage);
      
      if (!mainImageAsset) {
        console.log(`  ⚠️  Skipping ${product.name} - main image upload failed`);
        continue;
      }

      // Upload variant images
      console.log('  Uploading variant images...');
      const variantsWithImages = [];
      for (const variant of product.variants) {
        const variantImageAsset = await uploadImageToSanity(variant.image);
        if (variantImageAsset) {
          variantsWithImages.push({
            _key: `variant-${variant.color.toLowerCase()}`,
            _type: 'productVariant',
            name: variant.name,
            color: variant.color,
            price: variant.price,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: variantImageAsset._id,
              },
            },
          });
        }
      }

      // Upload lifestyle images
      console.log('  Uploading lifestyle images...');
      const lifestyleImagesWithAssets = [];
      for (const lifestyleImage of product.lifestyleImages) {
        const lifestyleAsset = await uploadImageToSanity(lifestyleImage);
        if (lifestyleAsset) {
          lifestyleImagesWithAssets.push({
            _key: `lifestyle-${Date.now()}-${Math.random()}`,
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: lifestyleAsset._id,
            },
          });
        }
      }

      // Create product document
      const productDoc = {
        _type: 'product',
        _id: `audo-copenhagen-${product.slug}`,
        name: product.name,
        slug: {
          _type: 'slug',
          current: product.slug,
        },
        description: product.description,
        price: product.price,
        brand: product.brand,
        designer: product.designer,
        material: product.material,
        dimensions: product.dimensions,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mainImageAsset._id,
          },
        },
        categories: [
          {
            _type: 'reference',
            _ref: 'category-accessories',
            _key: 'cat-accessories',
          },
        ],
        variants: variantsWithImages,
        lifestyleImages: lifestyleImagesWithAssets,
        features: product.features,
      };

      // Create or update the product
      const result = await client.createOrReplace(productDoc);
      console.log(`  ✅ Successfully created/updated: ${product.name}`);
      console.log(`     Product ID: ${result._id}`);
    } catch (error) {
      console.error(`  ❌ Error processing ${product.name}:`, error.message);
    }
  }

  console.log('\n✨ Audo Copenhagen migration complete!');
}

// Run the migration
migrateAudoCopenhagenProducts().catch(console.error);
