#!/usr/bin/env node

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Correct variant data with actual file paths
const correctVariantData = {
  'salon-dining-chair': {
    name: 'Salon Dining Chair',
    variants: [
      {
        name: 'Oiled Oak Base - Supreme Cognac Leather',
        material: 'Oiled Oak',
        leather: 'Supreme Cognac',
        price: 22005,
        imagePath: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22005  Base -  Oiled oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp'
      },
      {
        name: 'Smoked Oak Base - Supreme Dark Chocolate Leather',
        material: 'Smoked Oak',
        leather: 'Supreme Dark Chocolate',
        price: 22005,
        imagePath: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp'
      },
      {
        name: 'Smoked Oak Base - Supreme Cognac Leather',
        material: 'Smoked Oak',
        leather: 'Supreme Cognac',
        price: 22005,
        imagePath: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp'
      },
      {
        name: 'Soaped Oak Base - Supreme Dark Chocolate Leather',
        material: 'Soaped Oak',
        leather: 'Supreme Dark Chocolate',
        price: 22005,
        imagePath: '/Ro-Collection/Salon dining chair/ Salon dining chair NOK  22005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp'
      },
      {
        name: 'Soaped Oak Base - Supreme Cognac Leather',
        material: 'Soaped Oak',
        leather: 'Supreme Cognac',
        price: 22005,
        imagePath: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp'
      }
    ]
  },
  'salon-dining-table-round-120': {
    name: 'Salon Dining Table Ø-120',
    variants: [
      {
        name: 'Oiled Oak',
        material: 'Oiled Oak',
        price: 29940,
        imagePath: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29940  Color -  Oiled oak.webp'
      },
      {
        name: 'Soaped Oak',
        material: 'Soaped Oak',
        price: 29940,
        imagePath: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29940  Color -  Soaped oak.webp'
      },
      {
        name: 'Smoked Oak',
        material: 'Smoked Oak',
        price: 33450,
        imagePath: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  33450  Color -  Smoked oak.webp'
      }
    ]
  },
  'salon-dining-table-round-120-extension': {
    name: 'Salon Dining Table with Extension Option Ø-120',
    variants: [
      {
        name: 'Oiled Oak',
        material: 'Oiled Oak',
        price: 29940,
        imagePath: '/Ro-Collection/Salon dining table with extension option Ø-120/Salon dining table with extension option Ø-120 NOK  29940  Color -  Oiled oak.webp'
      },
      {
        name: 'Soaped Oak',
        material: 'Soaped Oak',
        price: 29940,
        imagePath: '/Ro-Collection/Salon dining table with extension option Ø-120/Salon dining table with extension option Ø-120 NOK  29940  Color -  Soaped oak.webp'
      },
      {
        name: 'Smoked Oak',
        material: 'Smoked Oak',
        price: 33450,
        imagePath: '/Ro-Collection/Salon dining table with extension option Ø-120/Salon dining table with extension option Ø-120 NOK  33450  Color -  Smoked oak.webp'
      }
    ]
  },
  'salon-dining-table-rectangular-extension': {
    name: 'Salon Dining Table with Extension Option',
    variants: [
      {
        name: '190x90 - Oiled Oak',
        material: 'Oiled Oak',
        size: '190x90',
        price: 35190,
        imagePath: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp'
      },
      {
        name: '190x90 - Soaped Oak',
        material: 'Soaped Oak',
        size: '190x90',
        price: 35190,
        imagePath: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  35190  Size -  190x90 190x90 220x100 Color -  Soaped oak.webp'
      },
      {
        name: '190x90 - Smoked Oak',
        material: 'Smoked Oak',
        size: '190x90',
        price: 38700,
        imagePath: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  38700  Size -  190x90 190x90 220x100 Color -  Smoked oak.webp'
      },
      {
        name: '220x100 - Oiled Oak',
        material: 'Oiled Oak',
        size: '220x100',
        price: 37815,
        imagePath: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37815  Size -  220x100 190x90 220x100 Color -  Oiled oak.webp'
      },
      {
        name: '220x100 - Soaped Oak',
        material: 'Soaped Oak',
        size: '220x100',
        price: 37815,
        imagePath: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37815  Size -  220x100 190x90 220x100 Color -  Soaped oak.webp'
      },
      {
        name: '220x100 - Smoked Oak',
        material: 'Smoked Oak',
        size: '220x100',
        price: 41385,
        imagePath: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  41385  Size -  220x100 190x90 220x100 Color -  Smoked oak.webp'
      }
    ]
  },
  'extension-leaf-round-120': {
    name: 'Extension Leaf for Salon Dining Table Ø-120',
    variants: [
      {
        name: 'Black MDF',
        material: 'Black MDF',
        price: 5130,
        imagePath: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  5130  Color -  Black MDF.webp'
      },
      {
        name: 'Oiled Oak',
        material: 'Oiled Oak',
        price: 7950,
        imagePath: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  7950  Color -  Oiled oak.webp'
      },
      {
        name: 'Soaped Oak',
        material: 'Soaped Oak',
        price: 7950,
        imagePath: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  7950  Color -  Soaped oak.webp'
      },
      {
        name: 'Smoked Oak',
        material: 'Smoked Oak',
        price: 9690,
        imagePath: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  9690  Color -  Smoked oak.webp'
      }
    ]
  },
  'extension-plate-rectangular': {
    name: 'Extension Plate for Salon Dining Table',
    variants: [
      {
        name: '50x90 - Black MDF',
        material: 'Black MDF',
        size: '50x90',
        price: 5130,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5130  Size -  50x90 50x100 50x90 Color -  Black MDF.webp'
      },
      {
        name: '50x100 - Black MDF',
        material: 'Black MDF',
        size: '50x100',
        price: 5130,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5130  Size -  50x100 50x100 50x90 Color -  Black MDF.webp'
      },
      {
        name: '50x90 - Oiled Oak',
        material: 'Oiled Oak',
        size: '50x90',
        price: 7950,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7950  Size -  50x90 50x100 50x90 Color -  Oiled oak.webp'
      },
      {
        name: '50x100 - Oiled Oak',
        material: 'Oiled Oak',
        size: '50x100',
        price: 7950,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7950  Size -  50x100 50x100 50x90 Color -  Oiled oak.webp'
      },
      {
        name: '50x90 - Soaped Oak',
        material: 'Soaped Oak',
        size: '50x90',
        price: 7950,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7950  Size -  50x90 50x100 50x90 Color -  Soaped oak.webp'
      },
      {
        name: '50x100 - Soaped Oak',
        material: 'Soaped Oak',
        size: '50x100',
        price: 7950,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7950  Size -  50x100 50x100 50x90 Color -  Soaped oak.webp'
      },
      {
        name: '50x90 - Smoked Oak',
        material: 'Smoked Oak',
        size: '50x90',
        price: 9690,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  9690  Size -  50x90 50x100 50x90 Color -  Smoked oak.webp'
      },
      {
        name: '50x100 - Smoked Oak',
        material: 'Smoked Oak',
        size: '50x100',
        price: 9690,
        imagePath: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  9690  Size -  50x100 50x100 50x90 Color -  Smoked oak.webp'
      }
    ]
  }
};

async function uploadImageToSanity(imagePath, description) {
  try {
    const fullPath = join(projectRoot, 'public', imagePath);
    
    if (!existsSync(fullPath)) {
      console.log(`❌ Image not found: ${fullPath}`);
      return null;
    }

    console.log(`📤 Uploading: ${description}...`);
    
    const imageBuffer = readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: `${description.toLowerCase().replace(/\s+/g, '-')}.webp`,
    });

    console.log(`✅ Uploaded: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${description}:`, error.message);
    return null;
  }
}

async function fixRoCollectionCorrectVariants() {
  console.log('🔧 Fixing RO Collection variants with correct file paths...\n');

  for (const [slug, productData] of Object.entries(correctVariantData)) {
    console.log(`\n📦 Processing: ${productData.name} (${slug})`);
    
    // Find the product in Sanity
    const query = `*[_type == "product" && slug.current == $slug][0]`;
    const product = await client.fetch(query, { slug });
    
    if (!product) {
      console.log(`❌ Product not found: ${slug}`);
      continue;
    }

    // Clear existing variants first
    await client
      .patch(product._id)
      .set({ variants: [] })
      .commit();

    console.log(`🗑️  Cleared existing variants`);

    // Process new variants with correct images
    if (productData.variants && productData.variants.length > 0) {
      console.log(`🔧 Adding ${productData.variants.length} variants with correct images...`);
      
      const variants = [];
      for (const variantData of productData.variants) {
        console.log(`  📝 Processing variant: ${variantData.name}`);
        
        // Upload variant-specific image
        let variantImageAsset = null;
        if (variantData.imagePath) {
          variantImageAsset = await uploadImageToSanity(
            variantData.imagePath, 
            `${productData.name} - ${variantData.name}`
          );
        }

        const variant = {
          _type: 'object',
          _key: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: variantData.name,
          price: variantData.price,
          material: variantData.material,
          leather: variantData.leather,
          size: variantData.size,
        };

        if (variantImageAsset) {
          variant.image = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: variantImageAsset._id
            }
          };
        }

        variants.push(variant);
        
        // Small delay between uploads
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Update product with new variants
      await client
        .patch(product._id)
        .set({ variants })
        .commit();

      console.log(`✅ Added ${variants.length} variants with correct images to ${productData.name}`);
    }

    // Delay between products
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 RO Collection variants fixed with correct images!');
  console.log('\n💡 Next steps:');
  console.log('1. All variants now have their specific correct images');
  console.log('2. Test the /ro-collection pages to verify variant selection works correctly');
  console.log('3. Each variant should show a different image when selected');
}

// Run the fix
fixRoCollectionCorrectVariants().catch(console.error);
