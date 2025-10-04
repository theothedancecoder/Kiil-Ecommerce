import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Vitra products data from page.tsx
const vitraProducts = [
  {
    id: 'ball-clock',
    name: 'Ball Clock',
    description: 'Iconic wall clock designed by George Nelson in 1947. A timeless piece that combines functionality with sculptural beauty.',
    price: 3950,
    image: '/Vitra/Ball-Clock/Ball Clock from Vitra NOK  3,950  Color -  Multicolor.jpg',
    category: 'Clocks',
    variants: [
      { name: 'Multicolor', image: '/Vitra/Ball-Clock/Ball Clock from Vitra NOK  3,950  Color -  Multicolor.jpg', color: 'Multicolor' },
      { name: 'Natural Beech', image: '/Vitra/Ball-Clock/Ball Clock fra Vitra kr 3 950  Farge - Natural beech.jpg', color: 'Natural Beech' },
      { name: 'Orange', image: '/Vitra/Ball-Clock/Ball Clock fra Vitra kr 3 950  Farge - Orange.webp', color: 'Orange' },
      { name: 'Cherry', image: '/Vitra/Ball-Clock/Ball Clock from Vitra NOK  4,950  Color -  Cherry.webp', color: 'Cherry', price: 4950 }
    ]
  },
  {
    id: 'sunburst-clock',
    name: 'Sunburst Clock',
    description: 'Another iconic George Nelson design from 1948-1960. Features radiating spokes that create a striking sunburst pattern.',
    price: 5090,
    image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Walnut.webp',
    category: 'Clocks',
    variants: [
      { name: 'Walnut', image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Walnut.webp', color: 'Walnut' },
      { name: 'Black', image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 390.00  Farge - Black.webp', color: 'Black', price: 5390 },
      { name: 'Red', image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Red.webp', color: 'Red' },
      { name: 'Multicolor', image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Multicolor.webp', color: 'Multicolor' }
    ]
  },
  {
    id: 'noguchi-coffee-table',
    name: 'Noguchi Coffee Table',
    description: 'Designed by Isamu Noguchi in 1944, this sculptural coffee table has a rounded glass top resting on two identical wooden elements.',
    price: 31200,
    image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Black lacquered ash.webp',
    category: 'Furniture',
    variants: [
      { name: 'Black Lacquered Ash', image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Black lacquered ash.webp', material: 'Black Lacquered Ash' },
      { name: 'Maple', image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Salary.webp', material: 'Maple' },
      { name: 'Walnut', image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  43,200  Color -  Walnut.webp', material: 'Walnut', price: 43200 }
    ]
  },
  {
    id: 'panton-chair',
    name: 'Panton Chair',
    description: 'Designed by Verner Panton in 1967, the world\'s first injection-moulded plastic chair made from a single piece.',
    price: 4890,
    image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Classic red.webp',
    category: 'Furniture',
    variants: [
      { name: 'Classic Red', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Classic red.webp', color: 'Red' },
      { name: 'Deep Black', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Deep black.webp', color: 'Black' },
      { name: 'White', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - White.webp', color: 'White' },
      { name: 'Soft Mint', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Soft mint.webp', color: 'Mint' }
    ]
  },
  {
    id: 'eames-re-plastic-chair-dsr',
    name: 'Eames RE Plastic Chair DSR',
    description: 'The iconic Eames plastic chair with dowel base, designed by Charles and Ray Eames. A timeless piece of mid-century modern design.',
    price: 4010,
    image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 04 White.webp',
    category: 'Furniture',
    variants: [
      { name: 'White/Chrome', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 04 White.webp', color: 'White', material: 'Chrome Base' },
      { name: 'Deep Black/Chrome', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 12 Deep black.webp', color: 'Deep Black', material: 'Chrome Base' },
      { name: 'Poppy Red/Chrome', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 03 Poppy red.webp', color: 'Poppy Red', material: 'Chrome Base' },
      { name: 'Sea Blue/Chrome', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 83 Sea Blue.webp', color: 'Sea Blue', material: 'Chrome Base' }
    ]
  },
  {
    id: 'hang-it-all',
    name: 'Hang It All',
    description: 'Designed by Charles and Ray Eames in 1953, this playful coat rack features colorful wooden balls on metal hooks.',
    price: 3490,
    image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Multicolor.webp',
    category: 'Accessories',
    variants: [
      { name: 'Multicolor', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Multicolor.webp', color: 'Multicolor' },
      { name: 'Red', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Red.jpg', color: 'Red' },
      { name: 'Green', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Green.jpg', color: 'Green' },
      { name: 'White', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - White.jpg', color: 'White' },
      { name: 'Walnut', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Walnut.jpg', color: 'Walnut' },
      { name: 'Black Ash', image: '/Vitra/Hang-it-all/Hang it all Vitra NOK  3,490  Color -  Black ash.jpg', color: 'Black Ash' },
      { name: 'Marble', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 750  Farge - Marble.jpg', color: 'Marble', price: 3750 }
    ]
  }
];

async function uploadImageToSanity(imagePath) {
  try {
    const publicPath = join(__dirname, '..', 'public', imagePath);
    
    if (!fs.existsSync(publicPath)) {
      console.log(`   ⚠️  Image not found: ${imagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(publicPath);
    const ext = path.extname(imagePath).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif'
    };

    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
      contentType: mimeTypes[ext] || 'image/jpeg',
    });

    console.log(`   ✅ Uploaded: ${path.basename(imagePath)}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function migrateVitraProducts() {
  console.log('\n🚀 Starting Vitra migration to Sanity...\n');

  for (const product of vitraProducts) {
    console.log(`\n📦 Processing: ${product.name}`);
    
    // Upload main image
    console.log('  Uploading main image...');
    const mainImage = await uploadImageToSanity(product.image);
    
    // Upload variant images
    console.log(`  Uploading ${product.variants.length} variant images...`);
    const variants = [];
    for (const variant of product.variants) {
      const variantImage = await uploadImageToSanity(variant.image);
      variants.push({
        _key: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        _type: 'productVariant',
        name: variant.name,
        price: variant.price || product.price,
        color: variant.color || null,
        material: variant.material || null,
        image: variantImage,
      });
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Check if product already exists
    const existing = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug: product.id }
    );

    const productData = {
      _type: 'product',
      name: product.name,
      slug: {
        _type: 'slug',
        current: product.id,
      },
      description: product.description,
      price: product.price,
      brand: 'Vitra',
      image: mainImage,
      variants: variants,
      inStock: true,
      stock: 10,
    };

    try {
      if (existing) {
        // Update existing product
        await client
          .patch(existing._id)
          .set(productData)
          .commit();
        console.log(`  ✅ Updated product in Sanity`);
      } else {
        // Create new product
        await client.create(productData);
        console.log(`  ✅ Created product in Sanity`);
      }
    } catch (error) {
      console.error(`  ❌ Error saving product:`, error.message);
    }
  }

  console.log('\n✅ Vitra migration complete!\n');
  
  // Verify
  const allProducts = await client.fetch(`*[_type == "product" && brand == "Vitra"] | order(name asc)`);
  console.log(`\n📊 Total Vitra products in Sanity: ${allProducts.length}`);
  allProducts.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} - ${p.variants?.length || 0} variants`);
  });
}

migrateVitraProducts();
