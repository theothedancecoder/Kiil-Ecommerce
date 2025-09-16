import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

// Upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Image not found: ${fullPath}`);
      return null;
    }
    
    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    });
    
    console.log(`✅ Image uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

// Variants data for the 3 missing products
const variantsData = {
  'lunaria-table': [
    {
      name: 'Small - Wax-oiled Ash (H-50 Ø-39)',
      price: 10215,
      material: 'Wax-oiled Ash',
      size: 'H-50 Ø-39',
      imagePath: '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp'
    },
    {
      name: 'Medium - Wax-oiled Ash (H-45 Ø-60)',
      price: 10980,
      material: 'Wax-oiled Ash',
      size: 'H-45 Ø-60',
      imagePath: '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp'
    },
    {
      name: 'Large - Wax-oiled Ash (H-40 Ø-86)',
      price: 16080,
      material: 'Wax-oiled Ash',
      size: 'H-40 Ø-86',
      imagePath: '/dux/Lunaria-table /Lunaria table from DUX NOK  16 080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp'
    }
  ],
  'sam-dining-chair': [
    {
      name: 'Classic Soft 88 - With Armrest',
      price: 13790,
      material: 'Classic Soft 88',
      color: 'Black',
      imagePath: '/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg'
    },
    {
      name: 'Naturale Camel - With Armrest',
      price: 13790,
      material: 'Naturale',
      color: 'Camel',
      imagePath: '/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg'
    },
    {
      name: 'Naturale Perle - With Armrest',
      price: 13790,
      material: 'Naturale',
      color: 'Perle',
      imagePath: '/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Perle.jpg'
    },
    {
      name: 'Naturale Truffle - With Armrest',
      price: 13790,
      material: 'Naturale',
      color: 'Truffle',
      imagePath: '/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Truffle.jpg'
    }
  ],
  'superspider-sheepskin': [
    {
      name: 'Scandinavian Grey 22 Sheepskin',
      price: 53815,
      material: 'Sheepskin',
      color: 'Scandinavian Grey 22',
      imagePath: '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg'
    },
    {
      name: 'Black 01 Sheepskin',
      price: 53815,
      material: 'Sheepskin',
      color: 'Black 01',
      imagePath: '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg'
    },
    {
      name: 'Off-white 02 Sheepskin',
      price: 53815,
      material: 'Sheepskin',
      color: 'Off-white 02',
      imagePath: '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg'
    },
    {
      name: 'Cork 19 Sheepskin',
      price: 53815,
      material: 'Sheepskin',
      color: 'Cork 19',
      imagePath: '/dux/Superspider sheepskin /Superspider fåreskinn DUX kr 53 815  Farge - Cork 19.jpg'
    }
  ]
};

async function fixMissingVariants() {
  console.log('🔧 Force-fixing missing Dux variants...');
  
  for (const [productSlug, variants] of Object.entries(variantsData)) {
    console.log(`\n📦 Processing ${productSlug}...`);
    
    // Find the product
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug && "dux" in categories[]->slug.current][0]`,
      { slug: productSlug }
    );
    
    if (!product) {
      console.log(`❌ Product ${productSlug} not found`);
      continue;
    }
    
    console.log(`✅ Found product: ${product.name} (${product._id})`);
    
    // Create variants with images
    const variantObjects = [];
    
    for (const variantData of variants) {
      console.log(`  📝 Creating variant: ${variantData.name}`);
      
      // Upload variant image
      const imageAssetId = await uploadImageToSanity(variantData.imagePath);
      
      const variant = {
        _type: 'variant',
        _key: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: variantData.name,
        price: variantData.price,
        material: variantData.material,
        color: variantData.color,
        size: variantData.size
      };
      
      if (imageAssetId) {
        variant.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId
          }
        };
      }
      
      variantObjects.push(variant);
      console.log(`  ✅ Variant created: ${variantData.name}`);
    }
    
    // Update product with variants (force overwrite)
    try {
      await client
        .patch(product._id)
        .set({ variants: variantObjects })
        .commit();
      
      console.log(`✅ Updated ${productSlug} with ${variantObjects.length} variants`);
    } catch (error) {
      console.error(`❌ Error updating ${productSlug}:`, error.message);
    }
  }
  
  console.log('\n🎉 Force-fix completed!');
}

fixMissingVariants().catch(console.error);
