import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Mapping of variant images from the old static files
const variantImageMappings = {
  'grand-prix-3130-chair': {
    'Oak': '/Fritz Hanson  3130/Clear Lacquered Veneer : Oak.png',
    'Walnut': '/Fritz Hanson  3130/Clear Lacquered Veneer : Walnut.png',
    'Deep Clay Ash': '/Fritz Hanson  3130/Coloured Veneer : Ash - Deep Clay (145).png',
    'Midnight Blue Ash': '/Fritz Hanson  3130/Coloured Veneer : Ash - Midnight Blue (895).png',
  },
  'grand-prix-4130-chair': {
    'Oak': '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png',
    'Walnut': '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Walnut.png',
    'Black Ash': '/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - Black (195).png',
    'White Ash': '/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - White (105).png',
  },
  'grand-prix-4130-upholstered': {
    'Oak': '/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Oak.png',
    'Walnut': '/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Walnut.png',
    'Black Ash': '/Fritz Hansen Grand Prix 4130 Upholstery/Coloured Veneer : Ash - Black (195).png',
    'Black/Grey Fabric': '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : Black:Grey (368).png',
    'White/Black Fabric': '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : White Black (166)png.png',
  },
  'skagerak-cutter-mini-wardrobe': {
    'Black': '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  black.webp',
    'Oak': '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Garderobe kr 4 199  Varianter - Eik.jpg',
    'Teak': '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  Teak.jpg',
  },
  'regatta-lounge-chair': {
    'Standard': '/Fritz Hansen/Regatta-Chair/S1508500-Regatta-Lounge-Chair.jpg',
  },
  'regatta-lounge-stool': {
    'Standard': '/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg',
  },
  'regatta-lounge-table-60': {
    'Standard': '/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg',
  },
  'georg-stool-with-cushion': {
    'Black Lacquered Oak': '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Black lacquered oak.webp',
    'Untreated Oak': '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Untreated oak.jpg',
  },
  'drachmann-dining-table': {
    '86x86 cm': '/Fritz Hansen/Drachmann-dining-table/Drachmann spisebord kr 13 499  Størrelse - 86x86.webp',
    '156x86 cm': '/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  20,499  Size -  156x86.webp',
    '190x86 cm': '/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  28,499  Size -  190x86.webp',
  },
  'england-bench': {
    'L-152': '/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png',
    'L-180': '/Fritz Hansen/England bench/England bench NOK  23,999  Size -  L-180.png',
  },
  'skagen-chair': {
    'FSC-certified Teak': '/Fritz Hansen/Skagen-chair/Skagen chair NOK  7,999.jpg',
  },
  'skagen-bench': {
    'L-150': '/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg',
  },
  'skagen-table': {
    'FSC-certified Teak': '/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg',
  },
};

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`   ⚠️  File not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const uploadedImage = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    console.log(`   ✅ Uploaded: ${uploadedImage.url}`);
    return uploadedImage;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function fixFritzHansenVariantImages() {
  console.log('=== Fixing Fritz Hansen Variant Images ===\n');

  for (const [productSlug, variantMap] of Object.entries(variantImageMappings)) {
    console.log(`\nProcessing: ${productSlug}`);
    
    // Get the product from Sanity
    const product = await client.fetch(
      `*[_type == "product" && brand == "Fritz Hansen" && slug.current == $slug][0]`,
      { slug: productSlug }
    );

    if (!product) {
      console.log(`  ⚠️  Product not found in Sanity`);
      continue;
    }

    console.log(`  Found product: ${product.name}`);
    console.log(`  Current variants: ${product.variants?.length || 0}`);

    if (!product.variants || product.variants.length === 0) {
      console.log(`  ⚠️  No variants to update`);
      continue;
    }

    // Update each variant with its image
    const updatedVariants = await Promise.all(
      product.variants.map(async (variant) => {
        const imagePath = variantMap[variant.name];
        
        if (!imagePath) {
          console.log(`  ⚠️  No image mapping for variant: ${variant.name}`);
          return variant;
        }

        // Check if variant already has an image
        if (variant.image?.asset?._ref) {
          console.log(`  ℹ️  Variant "${variant.name}" already has image, skipping`);
          return variant;
        }

        console.log(`  📤 Uploading image for variant: ${variant.name}`);
        const uploadedImage = await uploadImageToSanity(imagePath);

        if (!uploadedImage) {
          return variant;
        }

        return {
          ...variant,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImage._id,
            },
          },
        };
      })
    );

    // Update the product in Sanity
    try {
      await client
        .patch(product._id)
        .set({ variants: updatedVariants })
        .commit();
      
      console.log(`  ✅ Updated product with variant images`);
    } catch (error) {
      console.error(`  ❌ Error updating product:`, error.message);
    }
  }

  console.log('\n=== Fix Complete ===');
}

fixFritzHansenVariantImages();
