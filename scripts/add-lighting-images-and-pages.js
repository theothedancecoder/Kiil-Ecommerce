// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client. Please install @sanity/client:');
    console.error('npm install @sanity/client');
    process.exit(1);
  }
}

const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-06-13',
});

// Image mappings for lighting products
const productImageMappings = {
  // FLOS Products
  '2097-18-chandelier': {
    mainImage: '/FLOS/2097-18-chandelier-brass.jpg',
    variants: [
      '/FLOS/2097-18-chandelier-brass.jpg',
      '/FLOS/2097-18-chandelier-chrome.jpg',
      '/FLOS/2097-18-chandelier-matt-white.jpg',
      '/FLOS/2097-18-chandelier-matte-black.jpg'
    ],
    lifestyleImages: ['/FLOS/2097:18 lysekrone /lifestyle/lifestyle.jpg']
  },
  '2097-30-chandelier': {
    mainImage: '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg',
    variants: [
      '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg',
      '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Chrome.webp',
      '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Matt white.jpg',
      '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Matte Black.jpg'
    ],
    lifestyleImages: ['/FLOS/2097-30/lifestyle/lifestyle.jpg']
  },
  '2097-50-chandelier': {
    mainImage: '/FLOS/2097-50/2097-50-main.jpg',
    variants: [],
    lifestyleImages: []
  },
  'ic-lights-table-t1': {
    mainImage: '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Chrome.webp',
    variants: [
      '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Black.webp',
      '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Brushed brass.webp',
      '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Chrome.webp'
    ],
    lifestyleImages: ['/FLOS/IC-Lights-T1-High/lifestyle/3510294-1.webp']
  },
  'ic-lights-suspension-s1': {
    mainImage: '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Chrome.webp',
    variants: [],
    lifestyleImages: []
  },
  'ic-lights-floor-f1': {
    mainImage: '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif',
    variants: [
      '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif',
      '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Brushed brass.avif',
      '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif'
    ],
    lifestyleImages: ['/FLOS/IC-F1-Floor-Lamp/lifestyle/Flos-IC-Gulvlampe-messing-Gulvlamper-Flos-Fls__F3173059-1.webp']
  },
  'arco-floor-lamp': {
    mainImage: '/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg',
    variants: [],
    lifestyleImages: ['/FLOS/Arco-floor-lamp/lifestyle/arco-floor-lamp1.jpg']
  },
  'snoopy-table-lamp': {
    mainImage: '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg',
    variants: [
      '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg',
      '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Green.jpg',
      '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Navy blue.webp',
      '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Orange.jpg'
    ],
    lifestyleImages: ['/FLOS/Snoopy-table-lamp/lifestyle/10232604_2.jpg']
  },
  'bellhop-table': {
    mainImage: '/FLOS/Bellhop-rechargeable-table-lamp /Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp',
    variants: [
      '/FLOS/Bellhop-rechargeable-table-lamp /Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp',
      '/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Brick Red.webp',
      '/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Grey.webp',
      '/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Matt Black.webp'
    ],
    lifestyleImages: []
  },

  // Louis Poulsen Products
  'ph-5-pendant': {
    mainImage: '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Classic.webp',
    variants: [
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Classic.webp',
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Modern.webp',
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge -  Monochrome Black.webp',
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge -  Hues of Blue.webp',
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge -  Hues of Red.webp'
    ],
    lifestyleImages: []
  },
  'ph-3-5-3-table': {
    mainImage: '/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Bordlampe kr 15 965  Farge - Hvit.jpg',
    variants: [
      '/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Bordlampe kr 15 965  Farge - Hvit.jpg',
      '/Louis-Poulsen/PH-3½<edit_file>
<path>scripts/add-lighting-images-and-pages.js</path>
<content>require('dotenv').config({ path: '.env.local' });

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client. Please install @sanity/client:');
    console.error('npm install @sanity/client');
    process.exit(1);
  }
}

const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-06-13',
});

// Image mappings for lighting products
const productImageMappings = {
  // FLOS Products
  '2097-18-chandelier': {
    mainImage: '/FLOS/2097-18-chandelier-brass.jpg',
    variants: [
      '/FLOS/2097-18-chandelier-brass.jpg',
      '/FLOS/2097-18-chandelier-chrome.jpg',
      '/FLOS/2097-18-chandelier-matt-white.jpg',
      '/FLOS/2097-18-chandelier-matte-black.jpg'
    ],
    lifestyleImages: ['/FLOS/2097:18 lysekrone /lifestyle/lifestyle.jpg']
  },
  '2097-30-chandelier': {
    mainImage: '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg',
    variants: [
      '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg',
      '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Chrome.webp',
      '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Matt white.jpg',
      '/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Matte Black.jpg'
    ],
    lifestyleImages: ['/FLOS/2097-30/lifestyle/lifestyle.jpg']
  },
  '2097-50-chandelier': {
    mainImage: '/FLOS/2097-50/2097-50-main.jpg',
    variants: [],
    lifestyleImages: []
  },
  'ic-lights-table-t1': {
    mainImage: '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Chrome.webp',
    variants: [
      '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Black.webp',
      '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Brushed brass.webp',
      '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Chrome.webp'
    ],
    lifestyleImages: ['/FLOS/IC-Lights-T1-High/lifestyle/3510294-1.webp']
  },
  'ic-lights-suspension-s1': {
    mainImage: '/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Chrome.webp',
    variants: [],
    lifestyleImages: []
  },
  'ic-lights-floor-f1': {
    mainImage: '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif',
    variants: [
      '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif',
      '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Brushed brass.avif',
      '/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif'
    ],
    lifestyleImages: ['/FLOS/IC-F1-Floor-Lamp/lifestyle/Flos-IC-Gulvlampe-messing-Gulvlamper-Flos-Fls__F3173059-1.webp']
  },
  'arco-floor-lamp': {
    mainImage: '/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg',
    variants: [],
    lifestyleImages: ['/FLOS/Arco-floor-lamp/lifestyle/arco-floor-lamp1.jpg']
  },
  'snoopy-table-lamp': {
    mainImage: '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg',
    variants: [
      '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg',
      '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Green.jpg',
      '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Navy blue.webp',
      '/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Orange.jpg'
    ],
    lifestyleImages: ['/FLOS/Snoopy-table-lamp/lifestyle/10232604_2.jpg']
  },
  'bellhop-table': {
    mainImage: '/FLOS/Bellhop-rechargeable-table-lamp/Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp',
    variants: [
      '/FLOS/Bellhop-rechargeable-table-lamp/Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp',
      '/FLOS/Bellhop-rechargeable-table-lamp/Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Brick Red.webp',
      '/FLOS/Bellhop-rechargeable-table-lamp/Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Grey.webp',
      '/FLOS/Bellhop-rechargeable-table-lamp/Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Matt Black.webp'
    ],
    lifestyleImages: []
  },

  // Louis Poulsen Products
  'ph-5-pendant': {
    mainImage: '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Classic.webp',
    variants: [
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Classic.webp',
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Modern.webp',
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome Black.webp',
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Blue.webp',
      '/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Red.webp'
    ],
    lifestyleImages: []
  },
  'ph-3-5-3-table': {
    mainImage: '/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Bordlampe kr 15 965  Farge - Hvit.jpg',
    variants: [
      '/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Bordlampe kr 15 965  Farge - Hvit.jpg',
      '/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Bordlampe kr 15 965  Farge - Rød.jpg',
      '/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Table Lamp NOK  15,965  Color -  Green.jpg',
      '/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Table Lamp NOK  15,965  Color -  yellow.jpg'
    ],
    lifestyleImages: []
  },
  'ph-2-1-table': {
    mainImage: '/Louis-Poulsen/PH-2:1-table-lamp/PH 2:1 table lamp NOK  9,585  Color -  High lustre chrome plated.webp',
    variants: [
      '/Louis-Poulsen/PH-2:1-table-lamp/PH 2:1 table lamp NOK  9,585  Color -  High lustre chrome plated.webp',
      '/Louis-Poulsen/PH-2:1-table-lamp/PH 2:1 table lamp NOK  10,815  Color -  Black metallic.webp',
      '/Louis-Poulsen/PH-2:1-table-lamp/PH 2:1 table lamp NOK  10,815  Color -  Brass metallised.webp'
    ],
    lifestyleImages: []
  },
  'panthella-table-250': {
    mainImage: '/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - White.webp',
    variants: [
      '/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - White.webp',
      '/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 table lamp NOK  5,660  Color -  Black.webp',
      '/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Coral.webp',
      '/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Orange.webp'
    ],
    lifestyleImages: []
  },
  'panthella-table-400': {
    mainImage: '/Louis-Poulsen/Panthella-400-Table-Lamp/main.jpg',
    variants: [],
    lifestyleImages: []
  },
  'panthella-floor': {
    mainImage: '/Louis-Poulsen/Panthella-Floor-Lamp/main.jpg',
    variants: [],
    lifestyleImages: []
  },
  'panthella-160-portable': {
    mainImage: '/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal white.webp',
    variants: [
      '/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal white.webp',
      '/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque black.webp',
      '/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque orange.webp',
      '/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque coral.webp'
    ],
    lifestyleImages: []
  },
  'aj-table': {
    mainImage: '/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp',
    variants: [],
    lifestyleImages: []
  },
  'aj-floor': {
    mainImage: '/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp',
    variants: [
      '/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp',
      '/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Black.webp',
      '/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Dusty Blue.webp',
      '/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Electric Orange.webp'
    ],
    lifestyleImages: []
  },
  'aj-wall': {
    mainImage: '/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  White.webp',
    variants: [
      '/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  White.webp',
      '/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Black.webp',
      '/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Electric Orange.webp'
    ],
    lifestyleImages: []
  },
  'njp-table': {
    mainImage: '/Louis-Poulsen/NJP-Table-Lamp/NJP Bordlampe kr 6 840  Farge - White.webp',
    variants: [
      '/Louis-Poulsen/NJP-Table-Lamp/NJP Bordlampe kr 6 840  Farge - White.webp',
      '/Louis-Poulsen/NJP-Table-Lamp/NJP Table Lamp NOK  6,840  Color -  Black.webp',
      '/Louis-Poulsen/NJP-Table-Lamp/NJP Table Lamp NOK  6,840  Color -  Light aluminum gray.webp'
    ],
    lifestyleImages: []
  },
  'njp-floor': {
    mainImage: '/Louis-Poulsen/NJP-Floor-Lamp/NJP Gulvlampe kr 8 855  Farge - White.webp',
    variants: [
      '/Louis-Poulsen/NJP-Floor-Lamp/NJP Gulvlampe kr 8 855  Farge - White.webp',
      '/Louis-Poulsen/NJP-Floor-Lamp/NJP Floor Lamp NOK  8,855  Color -  Light aluminum gray.webp'
    ],
    lifestyleImages: []
  },
  'enigma-425': {
    mainImage: '/Louis-Poulsen/Enigma-425-Pendant/Enigma 425 Pendant NOK  8,995  Color -  Brushed aluminum Black Brushed aluminum Size -  Ø-42.5.webp',
    variants: [
      '/Louis-Poulsen/Enigma-425-Pendant/Enigma 425 Pendant NOK  8,995  Color -  Brushed aluminum Black Brushed aluminum Size -  Ø-42.5.webp',
      '/Louis-Poulsen/Enigma-425-Pendant/Enigma 425 Pendant NOK  8,995  Color -  Black Black Brushed aluminum Size -  Ø-42.5.webp'
    ],
    lifestyleImages: []
  }
};

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${imagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    });
    
    return asset;
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

async function addLightingImagesAndPages() {
  try {
    console.log('🖼️  Adding images to lighting products in Sanity...\n');

    // Get all lighting products
    const lightingProducts = await client.fetch(`
      *[_type == "product" && "lighting" in categories[]->slug.current] {
        _id,
        name,
        slug,
        brand
      } | order(brand asc, name asc)
    `);

    console.log(`📦 Found ${lightingProducts.length} lighting products to process...\n`);

    let processedCount = 0;
    let errorCount = 0;

    for (const product of lightingProducts) {
      try {
        const productSlug = product.slug.current;
        const imageMapping = productImageMappings[productSlug];
        
        if (!imageMapping) {
          console.log(`⏭️  No image mapping found for: ${product.name} (${productSlug})`);
          continue;
        }

        console.log(`🔄 Processing: ${product.name} (${product.brand})`);

        // Upload main image
        let mainImageAsset = null;
        if (imageMapping.mainImage) {
          mainImageAsset = await uploadImageToSanity(imageMapping.mainImage);
          if (mainImageAsset) {
            console.log(`  ✅ Uploaded main image`);
          }
        }

        // Upload variant images (first few)
        const variantAssets = [];
        if (imageMapping.variants && imageMapping.variants.length > 0) {
          for (let i = 0; i < Math.min(imageMapping.variants.length, 4); i++) {
            const variantAsset = await uploadImageToSanity(imageMapping.variants[i]);
            if (variantAsset) {
              variantAssets.push(variantAsset);
            }
          }
          console.log(`  ✅ Uploaded ${variantAssets.length} variant images`);
        }

        // Upload lifestyle images
        const lifestyleAssets = [];
        if (imageMapping.lifestyleImages && imageMapping.lifestyleImages.length > 0) {
          for (const lifestyleImage of imageMapping.lifestyleImages) {
            const lifestyleAsset = await uploadImageToSanity(lifestyleImage);
            if (lifestyleAsset) {
              lifestyleAssets.push(lifestyleAsset);
            }
          }
          console.log(`  ✅ Uploaded ${lifestyleAssets.length} lifestyle images`);
        }

        // Update product with images
        const updateData = {};
        if (mainImageAsset) {
          updateData.image = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: mainImageAsset._id
            }
          };
        }

        if (lifestyleAssets.length > 0) {
          updateData.lifestyleImages = lifestyleAssets.map(asset => ({
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          }));
        }

        if (Object.keys(updateData).length > 0) {
          await client
            .patch(product._id)
            .set(updateData)
            .commit();
          
          console.log(`  ✅ Updated product with images`);
        }

        processedCount++;
        
      } catch (error) {
        console.error(`❌ Error processing ${product.name}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n🎉 Image processing completed!');
    console.log(`✅ Processed: ${processedCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);

    // Verify results
    console.log('\n🔍 Verifying products with images...');
    const productsWithImages = await client.fetch(`
      *[_type == "product" && "lighting" in categories[]->slug.current && defined(image)] {
        name,
        brand
      } | order(brand asc, name asc)
    `);
    
    console.log(`📊 Products with images: ${productsWithImages.length}/${lightingProducts.length}`);

  } catch (error) {
    console.error('💥 Error in addLightingImagesAndPages:', error);
  }
}

// Check environment variables
function checkEnvironment() {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN'
  ];
  
  const missing = required.filter(env => !process.env[env]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(env => console.error(`  - ${env}`));
    console.error('\nPlease set these in your .env.local file');
    process.exit(1);
  }
}

// Check environment variables and run the script
checkEnvironment();
addLightingImagesAndPages();
