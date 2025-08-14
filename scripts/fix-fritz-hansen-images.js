const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-13',
  useCdn: false,
});

// Function to upload image to Sanity
async function uploadImageToSanity(imagePath, productName) {
  try {
    const fullImagePath = path.join(process.cwd(), 'public', imagePath.replace(/^\//, ''));
    if (!fs.existsSync(fullImagePath)) {
      console.log(`⚠️  Image not found: ${fullImagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullImagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
      title: `${productName} - Image`
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      },
      alt: productName
    };
  } catch (error) {
    console.error(`❌ Error uploading image for ${productName}:`, error.message);
    return null;
  }
}

// Fritz Hansen products from static data with their image paths
const fritzHansenStaticData = [
  {
    id: 'fritz-hansen-regatta-chair',
    name: 'Regatta Lounge Chair',
    image: '/Fritz Hansen/Regatta-Chair/S1508500-Regatta-Lounge-Chair.jpg'
  },
  {
    id: 'fritz-hansen-series-7-3107-chair',
    name: 'Series 7™ 3107 Chair',
    image: '/Fritz Hansen/Series-7™-3107-chair/Series 7™ 3107 chair front upholstered with chrome legs NOK  10,999  Color -  Oak veneer:Hallingdal 65 Light Grey 103.png'
  },
  {
    id: 'fritz-hansen-swan-chair-leather',
    name: 'Swan Chair in Leather',
    image: '/Fritz Hansen/Swan-chair-in-leather/Swan chair in leather NOK  89,999  Color -  Aura Leather : Black.png'
  },
  {
    id: 'fritz-hansen-grand-prix-4130',
    name: 'Grand Prix 4130 Chair',
    image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png'
  },
  {
    id: 'fritz-hansen-grand-prix-4130-upholstery',
    name: 'Grand Prix 4130 Upholstered',
    image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : Black:Grey (368).png'
  },
  {
    id: 'fritz-hansen-grand-prix-3130',
    name: 'Grand Prix 3130 Chair',
    image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Midnight Blue (895).png'
  },
  {
    id: 'fritz-hansen-fionia-stool',
    name: 'Fionia Stool',
    image: '/Fritz Hansen/Fionia/Color -  Untreated oak.png'
  },
  {
    id: 'fritz-hansen-swan-chair-textile',
    name: 'Swan Chair in Textile',
    image: '/Fritz Hansen/swan-chair-in-textile/The Swan in textile NOK  53,499  Color -  Canvas : Light Sand 0216.png'
  },
  {
    id: 'fritz-hansen-georg-stool-with-cushion',
    name: 'Georg Stool with Cushion',
    image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Untreated oak.jpg'
  },
  {
    id: 'fritz-hansen-hven-bar-stool',
    name: 'Hven Bar Stool',
    image: '/Fritz Hansen/Hven-bar-stool/Hven bar stool from Skagerak NOK  8,599  Color -  Untreated oak.jpg'
  },
  {
    id: 'fritz-hansen-skagerak-cutter-bench',
    name: 'Skagerak Cutter Bench',
    image: '/Fritz Hansen/Skagerak-Cutter-Bench/Skagerak Cutter Bench NOK  12,499  Variants -  Oak.jpg'
  },
  {
    id: 'fritz-hansen-regatta-lounge-stool',
    name: 'Regatta Lounge Stool',
    image: '/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg'
  },
  {
    id: 'fritz-hansen-regatta-lounge-table',
    name: 'Regatta Lounge Table Ø 60',
    image: '/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg'
  },
  {
    id: 'fritz-hansen-regatta-lounge-bench',
    name: 'Regatta Lounge Bench',
    image: '/Fritz Hansen/Regatta-Bench/S1508650-Regatta-Lounge-Bench.jpg'
  },
  {
    id: 'fritz-hansen-drachmann-chair',
    name: 'Drachmann Chair',
    image: '/Fritz Hansen/Drachmann chair /Drachmann chair NOK  9,699.webp'
  },
  {
    id: 'fritz-hansen-drachmann-table-round',
    name: 'Drachmann Table Ø-126',
    image: '/Fritz Hansen/Drachmann-table-Ø/Drachmann table Ø-126 NOK  24,999.webp'
  },
  {
    id: 'fritz-hansen-drachmann-dining-table',
    name: 'Drachmann Dining Table',
    image: '/Fritz Hansen/Drachmann-dining-table/Drachmann spisebord kr 13 499  Størrelse - 86x86.webp'
  },
  {
    id: 'fritz-hansen-england-bench',
    name: 'England Bench',
    image: '/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png'
  },
  {
    id: 'fritz-hansen-skagen-chair',
    name: 'Skagen Chair',
    image: '/Fritz Hansen/Skagen-chair/Skagen chair NOK  7,999.jpg'
  },
  {
    id: 'fritz-hansen-skagen-bench',
    name: 'Skagen Bench',
    image: '/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg'
  },
  {
    id: 'fritz-hansen-skagen-table',
    name: 'Skagen Table',
    image: '/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg'
  },
  {
    id: 'fritz-hansen-norr-magazine-holder',
    name: 'Norr Magazine Holder',
    image: '/Fritz Hansen/Norr Magazine Holder/Norr Magazine Holder kr  3 299.webp'
  },
  {
    id: 'fritz-hansen-norr-wall-shelf',
    name: 'Norr Wall Shelf',
    image: '/Fritz Hansen/Norr-wall-shelf/Norr wall shelf NOK  4,099.jpg'
  }
];

async function fixFritzHansenImages() {
  console.log('🔧 Fixing Fritz Hansen product images...\n');

  try {
    // Get all Fritz Hansen products from Sanity
    const sanityProducts = await client.fetch(`*[_type == "product" && brand == "Fritz Hansen"] {
      _id,
      name,
      images,
      'imageCount': count(images)
    }`);

    console.log(`Found ${sanityProducts.length} Fritz Hansen products in Sanity`);

    let fixedCount = 0;
    let skippedCount = 0;

    for (const sanityProduct of sanityProducts) {
      // Skip if product already has images
      if (sanityProduct.imageCount > 0) {
        console.log(`⏭️  ${sanityProduct.name} already has ${sanityProduct.imageCount} image(s)`);
        skippedCount++;
        continue;
      }

      // Find matching static data
      const staticData = fritzHansenStaticData.find(item => 
        item.name.toLowerCase().includes(sanityProduct.name.toLowerCase()) ||
        sanityProduct.name.toLowerCase().includes(item.name.toLowerCase()) ||
        item.id.includes(sanityProduct.name.toLowerCase().replace(/[^a-z0-9]/g, '-'))
      );

      if (!staticData) {
        console.log(`⚠️  No static data found for: ${sanityProduct.name}`);
        continue;
      }

      console.log(`🔄 Adding image to: ${sanityProduct.name}`);

      // Upload image
      const imageAsset = await uploadImageToSanity(staticData.image, sanityProduct.name);
      
      if (imageAsset) {
        // Update product with image
        await client
          .patch(sanityProduct._id)
          .set({ images: [imageAsset] })
          .commit();

        console.log(`✅ Successfully added image to: ${sanityProduct.name}`);
        fixedCount++;
      } else {
        console.log(`❌ Failed to add image to: ${sanityProduct.name}`);
      }

      // Small delay to avoid overwhelming Sanity
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n🎉 Fritz Hansen Image Fix Summary:');
    console.log(`   ✅ Fixed: ${fixedCount} products`);
    console.log(`   ⏭️  Skipped: ${skippedCount} products (already had images)`);
    console.log(`   📊 Total processed: ${fixedCount + skippedCount} products`);

  } catch (error) {
    console.error('❌ Error fixing Fritz Hansen images:', error.message);
  }
}

// Run the fix
fixFritzHansenImages().catch(console.error);
