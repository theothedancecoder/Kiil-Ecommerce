import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'oo6yopq9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

console.log('Sanity Config:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'oo6yopq9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  hasToken: !!process.env.SANITY_API_TOKEN
});

const builder = imageUrlBuilder(client);

// Helper to upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(__dirname, '..', 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    console.log(`✅ Uploaded: ${path.basename(imagePath)} -> ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

// Soren Lund products data
const sorenLundProducts = [
  {
    name: 'SL330:SK Footstool',
    slug: 'sl330-sk-footstool',
    price: 17055,
    brand: 'Soren Lund',
    description: 'Elegant footstool with premium leather upholstery and solid wood construction. The SL330:SK combines comfort with sophisticated Scandinavian design, perfect for complementing lounge chairs and creating relaxing seating arrangements.',
    mainImage: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Black.webp',
    variants: [
      {
        name: 'Cognac',
        color: 'Cognac',
        material: 'Premium leather',
        image: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Cognac.jpg',
        price: 17055
      },
      {
        name: 'Black',
        color: 'Black',
        material: 'Premium leather',
        image: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Black.webp',
        price: 17055
      }
    ],
    lifestyleImages: [
      '/Soren-Lund/SL330:SK-footstool/lifestyle/SL-330-genova-teak-768x512.jpg'
    ]
  },
  {
    name: 'SL409 Swivel Chair',
    slug: 'sl409-swivel-chair',
    price: 29935,
    brand: 'Soren Lund',
    description: 'Contemporary swivel chair with ergonomic design and premium materials. The SL409 offers exceptional comfort and mobility, making it perfect for modern offices and home workspaces with its sophisticated Scandinavian aesthetic.',
    mainImage: '/Soren-Lund/SL409-swivel-chair/Soren Lund SL409 swivel chair NOK  29,935  SL409 swivel chair quantity 1 .webp',
    variants: [
      {
        name: 'Standard',
        material: 'Premium upholstery',
        image: '/Soren-Lund/SL409-swivel-chair/Soren Lund SL409 swivel chair NOK  29,935  SL409 swivel chair quantity 1 .webp',
        price: 29935
      }
    ],
    lifestyleImages: []
  },
  {
    name: 'SL330:1 Adjustable Armchair',
    slug: 'sl330-1-adjustable-armchair',
    price: 55160,
    brand: 'Soren Lund',
    description: 'Luxurious adjustable armchair with premium craftsmanship and sophisticated design. The SL330:1 represents the pinnacle of Scandinavian furniture design, offering exceptional comfort and adjustability for the ultimate relaxation experience.',
    mainImage: '/Soren-Lund/SLK-330/Soren Lund SL330:1 adjustable armchair NOK  55,160.webp',
    variants: [
      {
        name: 'Standard',
        material: 'Premium upholstery',
        image: '/Soren-Lund/SLK-330/Soren Lund SL330:1 adjustable armchair NOK  55,160.webp',
        price: 55160
      },
      {
        name: 'Alternative',
        material: 'Premium upholstery',
        image: '/Soren-Lund/SLK-330/SL330:1 adjustable armchair NOK  55,160.jpg',
        price: 55160
      }
    ],
    lifestyleImages: [
      '/Soren-Lund/SLK-330/lifestyle/a1d63a72-3402-4c94-85f0-6065fd782cd3.webp'
    ]
  }
];

async function migrateSorenLundToSanity() {
  console.log('🚀 Starting Soren Lund migration to Sanity...\n');

  for (const productData of sorenLundProducts) {
    console.log(`\n📦 Processing: ${productData.name}`);

    // Upload main image
    console.log('  Uploading main image...');
    const mainImage = await uploadImageToSanity(productData.mainImage);

    // Upload variant images
    console.log('  Uploading variant images...');
    const variants = [];
    for (const variant of productData.variants) {
      const variantImage = await uploadImageToSanity(variant.image);
      if (variantImage) {
        variants.push({
          _key: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          _type: 'variant',
          name: variant.name,
          color: variant.color,
          material: variant.material,
          price: variant.price,
          image: variantImage
        });
      }
    }

    // Upload lifestyle images
    console.log('  Uploading lifestyle images...');
    const lifestyleImages = [];
    for (const lifestyleImg of productData.lifestyleImages) {
      const uploaded = await uploadImageToSanity(lifestyleImg);
      if (uploaded) {
        lifestyleImages.push(uploaded);
      }
    }

    // Create product document
    const product = {
      _type: 'product',
      name: productData.name,
      slug: {
        _type: 'slug',
        current: productData.slug
      },
      price: productData.price,
      brand: productData.brand,
      description: productData.description,
      image: mainImage,
      variants: variants,
      lifestyleImages: lifestyleImages,
      inStock: true,
      stock: 10
    };

    try {
      const result = await client.create(product);
      console.log(`✅ Created product in Sanity: ${result._id}`);
    } catch (error) {
      console.error(`❌ Error creating product:`, error.message);
    }
  }

  console.log('\n✅ Soren Lund migration complete!');
}

migrateSorenLundToSanity().catch(console.error);
