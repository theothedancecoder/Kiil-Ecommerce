import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

console.log('Sanity Config:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  hasToken: !!process.env.SANITY_API_TOKEN
});

const kartellProducts = [
  {
    id: 'componibili-classic-2',
    name: 'Componibili Classic 2',
    description: 'Modular storage system with 2 compartments. Iconic cylindrical design perfect for any space.',
    price: 2890,
    image: '/Kartell -Componibili classic 2/Red.webp',
    variants: [
      { name: 'White', image: '/Kartell -Componibili classic 2/white.webp', color: 'White' },
      { name: 'Black', image: '/Kartell -Componibili classic 2/black.webp', color: 'Black' },
      { name: 'Red', image: '/Kartell -Componibili classic 2/Red.webp', color: 'Red' },
      { name: 'Blue', image: '/Kartell -Componibili classic 2/blue.webp', color: 'Blue' },
      { name: 'Green', image: '/Kartell -Componibili classic 2/green.webp', color: 'Green' },
      { name: 'Orange', image: '/Kartell -Componibili classic 2/Orange.webp', color: 'Orange' },
      { name: 'Silver', image: '/Kartell -Componibili classic 2/Silver.webp', color: 'Silver' },
      { name: 'Burgundy', image: '/Kartell -Componibili classic 2/burgundy.webp', color: 'Burgundy' },
      { name: 'Mauve', image: '/Kartell -Componibili classic 2/Mauve.webp', color: 'Mauve' },
      { name: 'Sky Blue', image: '/Kartell -Componibili classic 2/Sky Blue.webp', color: 'Sky Blue' },
      { name: 'Taupe', image: '/Kartell -Componibili classic 2/Taupe.webp', color: 'Taupe' },
      { name: 'Violet', image: '/Kartell -Componibili classic 2/Violet.webp', color: 'Violet' }
    ]
  },
  {
    id: 'componibili-classic-3',
    name: 'Componibili Classic 3',
    description: 'Modular storage system with 3 compartments. Larger version of the iconic cylindrical design.',
    price: 3490,
    image: '/kartell-Componibili classic 3/blue.webp',
    variants: [
      { name: 'White', image: '/kartell-Componibili classic 3/white.webp', color: 'White' },
      { name: 'Black', image: '/kartell-Componibili classic 3/black.avif', color: 'Black' },
      { name: 'Red', image: '/kartell-Componibili classic 3/red.webp', color: 'Red' },
      { name: 'Blue', image: '/kartell-Componibili classic 3/blue.webp', color: 'Blue' },
      { name: 'Green', image: '/kartell-Componibili classic 3/green.webp', color: 'Green' },
      { name: 'Orange', image: '/kartell-Componibili classic 3/orange.webp', color: 'Orange' },
      { name: 'Silver', image: '/kartell-Componibili classic 3/silver.webp', color: 'Silver' },
      { name: 'Burgundy', image: '/kartell-Componibili classic 3/Burgundy.webp', color: 'Burgundy' },
      { name: 'Mauve', image: '/kartell-Componibili classic 3/mauve.webp', color: 'Mauve' },
      { name: 'Sky Blue', image: '/kartell-Componibili classic 3/sky blue.webp', color: 'Sky Blue' },
      { name: 'Taupe', image: '/kartell-Componibili classic 3/Taupe.webp', color: 'Taupe' },
      { name: 'Violet', image: '/kartell-Componibili classic 3/Violet.webp', color: 'Violet' }
    ]
  },
  {
    id: 'kabuki-hanging',
    name: 'Kabuki Hanging Lamp',
    description: 'Elegant pendant light with distinctive pleated shade design inspired by Japanese Kabuki theater.',
    price: 7100,
    image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Green.webp',
    variants: [
      { name: 'White', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - White.webp', color: 'White' },
      { name: 'Black', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Black.webp', color: 'Black' },
      { name: 'Crystal', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Crystal.webp', color: 'Crystal' },
      { name: 'Green', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Green.webp', color: 'Green' },
      { name: 'Light Blue', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Light blue.webp', color: 'Light Blue' }
    ]
  },
  {
    id: 'big-battery',
    name: 'Big Battery Lamp',
    description: 'Portable LED table lamp with rechargeable battery. Perfect for indoor and outdoor use.',
    price: 2890,
    image: '/ Kartell Kartell -Big Battery /light blue.webp',
    variants: [
      { name: 'White', image: '/ Kartell Kartell -Big Battery /white.webp', color: 'White' },
      { name: 'Light Blue', image: '/ Kartell Kartell -Big Battery /light blue.webp', color: 'Light Blue' },
      { name: 'Plum', image: '/ Kartell Kartell -Big Battery /plum.webp', color: 'Plum' },
      { name: 'Coke', image: '/ Kartell Kartell -Big Battery /coke.webp', color: 'Coke' }
    ]
  },
  {
    id: 'pumo-lamp',
    name: 'Pumo Lamp',
    description: 'Table lamp inspired by traditional Apulian ceramic decorations with modern LED technology.',
    price: 3490,
    image: '/Kartell Pumo lamp/AMBER.webp',
    variants: [
      { name: 'White', image: '/Kartell Pumo lamp/WHITE.webp', color: 'White' },
      { name: 'Black', image: '/Kartell Pumo lamp/BLACK.webp', color: 'Black' },
      { name: 'Blue', image: '/Kartell Pumo lamp/BLUE.webp', color: 'Blue' },
      { name: 'Amber', image: '/Kartell Pumo lamp/AMBER.webp', color: 'Amber' }
    ],
    lifestyleImages: [
      '/Kartell Pumo lamp/lifestyle/20250205Pumo-lamp.jpg',
      '/Kartell Pumo lamp/lifestyle/PUMO-LAMPADA_760.jpg'
    ]
  },
  {
    id: 'kabuki-floor-lamp',
    name: 'Kabuki Floor Lamp',
    description: 'Floor version of the iconic Kabuki lamp with pleated shade and adjustable height.',
    price: 8900,
    image: '/kartell-kabui floor indoor lamp/crystal.webp',
    variants: [
      { name: 'White', image: '/kartell-kabui floor indoor lamp/white.webp', color: 'White' },
      { name: 'Black', image: '/kartell-kabui floor indoor lamp/black.webp', color: 'Black' },
      { name: 'Crystal', image: '/kartell-kabui floor indoor lamp/crystal.webp', color: 'Crystal' },
      { name: 'Blue', image: '/kartell-kabui floor indoor lamp/blue.webp', color: 'Blue' },
      { name: 'Green', image: '/kartell-kabui floor indoor lamp/green.webp', color: 'Green' }
    ],
    lifestyleImages: [
      '/kartell-kabui floor indoor lamp/lifestyle/219117-3.jpg',
      '/kartell-kabui floor indoor lamp/lifestyle/Kartell_2315857.jpg'
    ]
  },
  {
    id: 'hhh-stool',
    name: 'H.H.H Stool',
    description: 'Stackable stool with ergonomic design. Perfect for modern interiors and versatile seating.',
    price: 1890,
    image: '/Kartell H.H.H /Orange.webp',
    variants: [
      { name: 'White', image: '/Kartell H.H.H /White.webp', color: 'White' },
      { name: 'Black', image: '/Kartell H.H.H /Black.webp', color: 'Black' },
      { name: 'Blue', image: '/Kartell H.H.H /Blue.webp', color: 'Blue' },
      { name: 'Green', image: '/Kartell H.H.H /Green.webp', color: 'Green' },
      { name: 'Orange', image: '/Kartell H.H.H /Orange.webp', color: 'Orange' },
      { name: 'Bordeaux', image: '/Kartell H.H.H /Bordeaux.webp', color: 'Bordeaux' },
      { name: 'Mustard', image: '/Kartell H.H.H /Mustard.webp', color: 'Mustard' }
    ]
  },
  {
    id: 'liberty-2-seater',
    name: 'Liberty 2 Seater Outdoor',
    description: 'Outdoor sofa with weather-resistant materials. Modern design for contemporary outdoor spaces.',
    price: 12900,
    image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/sage.webp',
    variants: [
      { name: 'Beige', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/beige.webp', color: 'Beige' },
      { name: 'Russet', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/russet.webp', color: 'Russet' },
      { name: 'Sage', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/sage.webp', color: 'Sage' },
      { name: 'Yellow', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/yellow.webp', color: 'Yellow' }
    ]
  },
  {
    id: 'liberty-3-seater',
    name: 'Liberty 3 Seater Outdoor',
    description: 'Larger outdoor sofa for spacious terraces and gardens. Weather-resistant and stylish.',
    price: 16900,
    image: '/kartell-furniture/Plastics outdoor liberty 3 seater/russet.webp',
    variants: [
      { name: 'Beige', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/beige.webp', color: 'Beige' },
      { name: 'Russet', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/russet.webp', color: 'Russet' },
      { name: 'Sage', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/Sage.webp', color: 'Sage' },
      { name: 'Yellow', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/yellow.webp', color: 'Yellow' }
    ]
  }
];

async function uploadImageToSanity(imagePath) {
  try {
    const publicDir = path.join(__dirname, '..', 'public');
    const fullPath = path.join(publicDir, imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${imagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    console.log(`✅ Uploaded: ${imagePath}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function migrateKartellToSanity() {
  console.log('🚀 Starting Kartell migration to Sanity...\n');

  for (const product of kartellProducts) {
    console.log(`\n📦 Processing: ${product.name}`);
    
    // Upload main image
    const mainImageId = await uploadImageToSanity(product.image);
    
    // Upload variant images
    const variants = [];
    for (const variant of product.variants) {
      const variantImageId = await uploadImageToSanity(variant.image);
      if (variantImageId) {
        variants.push({
          _type: 'variant',
          _key: `variant-${Date.now()}-${Math.random()}`,
          name: variant.name,
          color: variant.color,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: variantImageId,
            },
          },
          price: product.price,
        });
      }
    }

    // Upload lifestyle images if they exist
    const lifestyleImages = [];
    if (product.lifestyleImages) {
      for (const lifestyleImage of product.lifestyleImages) {
        const lifestyleImageId = await uploadImageToSanity(lifestyleImage);
        if (lifestyleImageId) {
          lifestyleImages.push({
            _type: 'image',
            _key: `lifestyle-${Date.now()}-${Math.random()}`,
            asset: {
              _type: 'reference',
              _ref: lifestyleImageId,
            },
          });
        }
      }
    }

    // Create product document in Sanity
    const productDoc = {
      _type: 'product',
      _id: `kartell-${product.id}`,
      name: product.name,
      slug: {
        _type: 'slug',
        current: product.id,
      },
      description: product.description,
      price: product.price,
      brand: 'Kartell',
      image: mainImageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageId,
        },
      } : undefined,
      variants: variants.length > 0 ? variants : undefined,
      lifestyleImages: lifestyleImages.length > 0 ? lifestyleImages : undefined,
      inStock: true,
      stock: 10,
    };

    try {
      await client.createOrReplace(productDoc);
      console.log(`✅ Created product in Sanity: ${product.name}`);
    } catch (error) {
      console.error(`❌ Error creating product ${product.name}:`, error.message);
    }
  }

  console.log('\n✨ Kartell migration complete!');
}

migrateKartellToSanity().catch(console.error);
