import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Juul products data based on images found in public/Juul 903/
const juulProducts = [
  {
    name: 'Juul 903',
    slug: 'juul-903',
    description: 'The Juul 903 is a premium Danish sofa that combines exceptional comfort with timeless Scandinavian design. Featuring a spacious 240x86 cm design, this sofa offers generous seating while maintaining an elegant profile. Crafted with meticulous attention to detail and available in multiple premium leather options.',
    price: 45000,
    brand: 'Juul',
    categories: ['Sofas', 'Living Room'],
    variants: [
      {
        name: 'Leather Prestige 18',
        material: 'Leather Prestige 18',
        price: 45000,
        imagePath: '/Juul 903/Leather Prestige 18.jpeg'
      },
      {
        name: 'Prestige 03',
        material: 'Prestige 03',
        price: 45000,
        imagePath: '/Juul 903/Prestige 03.webp'
      },
      {
        name: 'Prestige 10',
        material: 'Prestige 10',
        price: 45000,
        imagePath: '/Juul 903/prestige 10.jpeg'
      }
    ],
    dimensions: {
      width: '240 cm',
      depth: '86 cm',
      height: '75 cm'
    },
    features: [
      'Premium Danish craftsmanship',
      'Exceptional comfort and support',
      'High-quality leather upholstery',
      'Timeless Scandinavian design',
      'Durable construction',
      'Multiple leather options',
      'Spacious seating for 3-4 people',
      'Made in Denmark'
    ]
  },
  {
    name: 'Juul 301',
    slug: 'juul-301',
    description: 'The Juul 301 represents the pinnacle of Danish furniture design, offering unparalleled comfort and sophisticated aesthetics. This premium sofa features expert craftsmanship and is available in a selection of luxurious leather finishes, each carefully chosen to enhance both durability and visual appeal.',
    price: 38000,
    brand: 'Juul',
    categories: ['Sofas', 'Living Room'],
    variants: [
      {
        name: 'Mainz 09',
        material: 'Mainz 09',
        price: 38000,
        imagePath: '/Juul 903/JUUL 301/mainz 09.jpg'
      },
      {
        name: 'Tobacco 16',
        material: 'Tobacco 16',
        price: 38000,
        imagePath: '/Juul 903/JUUL 301/Tobacco 16.jpg'
      },
      {
        name: 'Tobacco 37',
        material: 'Tobacco 37',
        price: 38000,
        imagePath: '/Juul 903/JUUL 301/Tobacco 37.jpg'
      }
    ],
    dimensions: {
      width: '220 cm',
      depth: '90 cm',
      height: '78 cm'
    },
    features: [
      'Premium Danish craftsmanship',
      'Exceptional comfort and support',
      'High-quality leather upholstery',
      'Timeless Scandinavian design',
      'Durable construction',
      'Multiple leather options',
      'Ergonomic seating design',
      'Made in Denmark'
    ]
  }
];

async function uploadImageFromPath(imagePath) {
  try {
    const fullPath = join(__dirname, '..', 'public', imagePath);
    console.log(`Attempting to read image from: ${fullPath}`);
    
    const imageBuffer = readFileSync(fullPath);
    const filename = imagePath.split('/').pop();
    
    console.log(`Uploading image: ${filename}`);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    
    console.log(`✓ Uploaded: ${filename}`);
    return asset._id;
  } catch (error) {
    console.error(`✗ Failed to upload image ${imagePath}:`, error.message);
    return null;
  }
}

async function createOrUpdateProduct(productData) {
  try {
    console.log(`\n📦 Processing product: ${productData.name}`);
    
    // Check if product already exists
    const existingProduct = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug: productData.slug }
    );

    // Upload main image (first variant image)
    let mainImageRef = null;
    if (productData.variants && productData.variants.length > 0) {
      const mainImageId = await uploadImageFromPath(productData.variants[0].imagePath);
      if (mainImageId) {
        mainImageRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mainImageId
          }
        };
      }
    }

    // Upload variant images
    const variants = [];
    for (const variant of productData.variants) {
      const imageId = await uploadImageFromPath(variant.imagePath);
      if (imageId) {
        variants.push({
          _key: variant.name.toLowerCase().replace(/\s+/g, '-'),
          name: variant.name,
          material: variant.material,
          price: variant.price,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageId
            }
          }
        });
      }
    }

    // Prepare product document
    const productDoc = {
      _type: 'product',
      name: productData.name,
      slug: {
        _type: 'slug',
        current: productData.slug
      },
      description: productData.description,
      price: productData.price,
      brand: productData.brand,
      image: mainImageRef,
      variants: variants,
      inStock: true,
      stock: 10,
    };

    if (existingProduct) {
      console.log(`Updating existing product: ${productData.name}`);
      await client
        .patch(existingProduct._id)
        .set(productDoc)
        .commit();
      console.log(`✓ Updated: ${productData.name}`);
    } else {
      console.log(`Creating new product: ${productData.name}`);
      await client.create(productDoc);
      console.log(`✓ Created: ${productData.name}`);
    }

    return true;
  } catch (error) {
    console.error(`✗ Error processing ${productData.name}:`, error.message);
    return false;
  }
}

async function migrateJuulProducts() {
  console.log('🚀 Starting Juul products migration to Sanity...\n');
  console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is not set');
    console.log('Please set your Sanity API token with write permissions');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const product of juulProducts) {
    const success = await createOrUpdateProduct(product);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration Summary:');
  console.log(`✓ Successfully processed: ${successCount} products`);
  console.log(`✗ Failed: ${failCount} products`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n✅ Juul products have been migrated to Sanity!');
    console.log('You can now view them at: /juul');
  }
}

// Run the migration
migrateJuulProducts().catch(console.error);
