require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// Mapping of product names to their image directories
const productImageMappings = {
  // FLOS Products
  '2097/18 Chandelier': {
    directory: 'FLOS/2097:18 lysekrone ',
    mainImage: '2097:18 chandelier from Flos NOK  22,270  Color -  Brass.jpg',
    variants: [
      '2097:18 chandelier from Flos NOK  22,270  Color -  Brass.jpg',
      '2097:18 chandelier from Flos NOK  22,270  Color -  Chrome.jpg',
      '2097:18 chandelier from Flos NOK  22,270  Color -  Matt white.jpg',
      '2097:18 chandelier from Flos NOK  22,270  Color -  Matte Black.jpg'
    ],
    lifestyleImages: ['lifestyle/lifestyle.jpg']
  },
  '2097/30 Chandelier': {
    directory: 'FLOS/2097-30',
    mainImage: '2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg',
    variants: [
      '2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg',
      '2097:30 chandelier from Flos NOK  28,050  Color -  Chrome.webp',
      '2097:30 chandelier from Flos NOK  28,050  Color -  Matt white.jpg',
      '2097:30 chandelier from Flos NOK  28,050  Color -  Matte Black.jpg'
    ],
    lifestyleImages: ['lifestyle/lifestyle.jpg']
  },
  '2097/50 Chandelier': {
    directory: 'FLOS/2097-50',
    mainImage: '2097-50-suspension-sarfatti-flos-A1502031-product-still-life-big.jpg'
  },
  'Arco Floor Lamp': {
    directory: 'FLOS/Arco-floor-lamp',
    mainImage: 'Arco floor lamp from Flos NOK  33,195.jpg',
    lifestyleImages: ['lifestyle/arco-floor-lamp1.jpg']
  },
  'Bellhop Floor': {
    directory: 'FLOS/Bellhop-rechargeable-table-lamp ',
    mainImage: 'Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp',
    variants: [
      'Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp',
      'Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Brick Red.webp',
      'Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Cioko.webp',
      'Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Grey Blue.webp',
      'Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Grey.webp',
      'Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Matt Black.webp'
    ]
  },
  'Bellhop Table': {
    directory: 'FLOS/Bellhop-rechargeable-table-lamp ',
    mainImage: 'Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp'
  },
  'IC Lights Floor F1': {
    directory: 'FLOS/IC-F1-Floor-Lamp',
    mainImage: 'IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif',
    variants: [
      'IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif',
      'IC F1 Floor Lamp from Flos NOK  8,540  Color -  Brushed brass.avif',
      'IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif'
    ],
    lifestyleImages: ['lifestyle/Flos-IC-Gulvlampe-messing-Gulvlamper-Flos-Fls__F3173059-1.webp']
  },
  'IC Lights Table T1': {
    directory: 'FLOS/IC-Lights-T1-High',
    mainImage: 'IC Lights T1 High NOK  6,120  Color -  Chrome.webp',
    variants: [
      'IC Lights T1 High NOK  6,120  Color -  Black.webp',
      'IC Lights T1 High NOK  6,120  Color -  Brushed brass.webp',
      'IC Lights T1 High NOK  6,120  Color -  Chrome.webp'
    ],
    lifestyleImages: ['lifestyle/3510294-1.webp']
  },
  'Snoopy Table Lamp': {
    directory: 'FLOS/Snoopy-table-lamp',
    mainImage: 'Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg',
    variants: [
      'Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg',
      'Snoopy table lamp from Flos NOK  15,060  Color -  Green.jpg',
      'Snoopy table lamp from Flos NOK  15,060  Color -  Navy blue.webp',
      'Snoopy table lamp from Flos NOK  15,060  Color -  Orange.jpg'
    ],
    lifestyleImages: ['lifestyle/10232604_2.jpg']
  },

  // Louis Poulsen Products
  'AJ Floor Lamp': {
    directory: 'Louis-Poulsen/AJ-Floor-Lamp',
    mainImage: 'AJ Gulvlampe kr 13 025  Farge - White.webp',
    variants: [
      'AJ Gulvlampe kr 13 025  Farge - Black.webp',
      'AJ Gulvlampe kr 13 025  Farge - Dusty Blue.webp',
      'AJ Gulvlampe kr 13 025  Farge - Electric Orange.webp',
      'AJ Gulvlampe kr 13 025  Farge - Soft lemon.webp',
      'AJ Gulvlampe kr 13 025  Farge - Warm Grey.webp',
      'AJ Gulvlampe kr 13 025  Farge - Warm Sand.webp',
      'AJ Gulvlampe kr 13 025  Farge - White.webp'
    ]
  },
  'Panthella 160 Rechargeable LED Table Lamp': {
    directory: 'Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp',
    mainImage: 'Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal white.webp',
    variants: [
      'Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal beige.webp',
      'Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal pale blue.webp',
      'Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal pale rose.webp',
      'Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal white.webp',
      'Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque black.webp'
    ]
  },
  'PH 5 Ceiling lamp': {
    directory: 'Louis-Poulsen/PH-5-Ceiling-lamp',
    mainImage: 'PH 5 Taklampe kr 11 175  Farge - White Classic.webp',
    variants: [
      'PH 5 Taklampe kr 11 175  Farge - Hues of Blue.webp',
      'PH 5 Taklampe kr 11 175  Farge - Hues of Green.webp',
      'PH 5 Taklampe kr 11 175  Farge - Hues of Grey.webp',
      'PH 5 Taklampe kr 11 175  Farge - Monochrome White.webp',
      'PH 5 Taklampe kr 11 175  Farge - White Classic.webp'
    ]
  },
  'PH 3½-2½ Table Lamp': {
    directory: 'Louis-Poulsen/PH-3½-2½-Table-Lamp',
    mainImage: 'PH 3½-2½ Bordlampe kr 15 965  Farge - Hvit.jpg',
    variants: [
      'PH 3½-2½ Bordlampe kr 15 965  Farge - Hvit.jpg',
      'PH 3½-2½ Bordlampe kr 15 965  Farge - Rød.jpg',
      'PH 3½-2½ Table Lamp NOK  15,965  Color -  Green.jpg',
      'PH 3½-2½ Table Lamp NOK  15,965  Color -  yellow.jpg'
    ]
  }
};

async function uploadImageToSanity(imagePath, filename) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image not found: ${imagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename
    });

    console.log(`✅ Uploaded: ${filename}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message);
    return null;
  }
}

async function updateProductWithImages() {
  try {
    console.log('🚀 Starting to upload lighting images to Sanity...\n');

    // Get all lighting products from Sanity
    const products = await client.fetch(`
      *[_type == "product" && (brand == "FLOS" || brand == "Louis Poulsen") && "lighting" in categories[]->slug.current] {
        _id,
        name,
        brand,
        image
      }
    `);

    console.log(`Found ${products.length} lighting products in Sanity\n`);

    for (const product of products) {
      const mapping = productImageMappings[product.name];
      
      if (!mapping) {
        console.log(`⚠️  No image mapping found for: ${product.name}`);
        continue;
      }

      console.log(`\n📸 Processing images for: ${product.name}`);

      // Upload main image if product doesn't have one
      if (!product.image && mapping.mainImage) {
        const imagePath = path.join(process.cwd(), 'public', mapping.directory, mapping.mainImage);
        const mainImageAsset = await uploadImageToSanity(imagePath, mapping.mainImage);
        
        if (mainImageAsset) {
          await client
            .patch(product._id)
            .set({ image: mainImageAsset })
            .commit();
          
          console.log(`✅ Updated main image for: ${product.name}`);
        }
      } else if (product.image) {
        console.log(`ℹ️  ${product.name} already has a main image`);
      }

      // Upload lifestyle images if they exist
      if (mapping.lifestyleImages && mapping.lifestyleImages.length > 0) {
        const lifestyleAssets = [];
        
        for (const lifestyleImage of mapping.lifestyleImages) {
          const imagePath = path.join(process.cwd(), 'public', mapping.directory, lifestyleImage);
          const asset = await uploadImageToSanity(imagePath, lifestyleImage);
          if (asset) {
            lifestyleAssets.push(asset);
          }
        }

        if (lifestyleAssets.length > 0) {
          await client
            .patch(product._id)
            .set({ lifestyleImages: lifestyleAssets })
            .commit();
          
          console.log(`✅ Updated ${lifestyleAssets.length} lifestyle images for: ${product.name}`);
        }
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n🎉 Image upload completed!');

  } catch (error) {
    console.error('❌ Error updating products with images:', error);
  }
}

updateProductWithImages();
