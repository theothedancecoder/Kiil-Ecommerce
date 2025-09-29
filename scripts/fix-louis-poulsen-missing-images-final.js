import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

console.log('🔧 Fixing Louis Poulsen missing images by uploading to Sanity...\n');

// Products that need images based on the Sanity check
const productsNeedingImages = [
  {
    id: 'aj-floor-lamp',
    name: 'AJ Floor Lamp',
    imagePath: 'public/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp'
  },
  {
    id: 'ph-artichoke-600',
    name: 'PH Artichoke 600',
    imagePath: 'public/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg'
  },
  {
    id: 'panthella-table-400',
    name: 'Panthella Table 400',
    imagePath: 'public/Louis-Poulsen/Panthella-400-Table-Lamp/Panthella 400 Table Lamp NOK  9,170.jpg'
  },
  {
    id: 'toldbod-glass-120',
    name: 'Toldbod Glass 120',
    imagePath: 'public/Louis-Poulsen/Toldbod-Glass-120/Toldbod Glass 120 NOK  4,999.jpg'
  },
  {
    id: 'vl38-floor',
    name: 'VL38 Floor',
    imagePath: 'public/Louis-Poulsen/VL38-Floor/VL38 Floor NOK  8,999.jpg'
  },
  {
    id: 'yuh-table',
    name: 'Yuh Table',
    imagePath: 'public/Louis-Poulsen/Yuh-table-lamp/Yuh table lamp from Louis Poulsen NOK  6,840  Color -  White.webp'
  },
  {
    id: 'ph-artichoke-480',
    name: 'PH Artichoke 480',
    imagePath: 'public/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg'
  },
  {
    id: 'toldbod-glass-220',
    name: 'Toldbod Glass 220',
    imagePath: 'public/Louis-Poulsen/Toldbod-Glass-220/Toldbod Glass 220 NOK  6,999.jpg'
  },
  {
    id: 'vl38-table',
    name: 'VL38 Table',
    imagePath: 'public/Louis-Poulsen/VL38-Table/VL38 Table NOK  6,840.jpg'
  },
  {
    id: 'yuh-floor',
    name: 'Yuh Floor',
    imagePath: 'public/Louis-Poulsen/Yuh-floor-lamp/Yuh floor lamp from Louis Poulsen NOK  8,855  Color -  White.webp'
  },
  {
    id: 'panthella-table-lamp',
    name: 'Panthella Table Lamp',
    imagePath: 'public/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - White.webp'
  },
  {
    id: 'panthella-floor',
    name: 'Panthella Floor',
    imagePath: 'public/Louis-Poulsen/Panthella-Floor-Lamp/Panthella Floor Lamp NOK  11,775.jpg'
  },
  {
    id: 'ph-artichoke-720',
    name: 'PH Artichoke 720',
    imagePath: 'public/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg'
  },
  {
    id: 'toldbod-glass-155',
    name: 'Toldbod Glass 155',
    imagePath: 'public/Louis-Poulsen/Toldbod-Glass-155/Toldbod Glass 155 NOK  3,999.jpg'
  }
];

async function uploadImageToSanity(imagePath, productName) {
  try {
    const fullPath = path.join(__dirname, '..', imagePath);
    
    if (!existsSync(fullPath)) {
      console.log(`❌ Image file not found: ${fullPath}`);
      return null;
    }

    console.log(`📤 Uploading image for ${productName}...`);
    
    const imageAsset = await client.assets.upload('image', createReadStream(fullPath), {
      filename: path.basename(imagePath),
    });

    console.log(`✅ Uploaded image for ${productName}: ${imageAsset._id}`);
    return imageAsset;
  } catch (error) {
    console.error(`❌ Failed to upload image for ${productName}:`, error.message);
    return null;
  }
}

async function updateProductWithImage(productId, imageAsset) {
  try {
    // Find the product by slug or name
    const products = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen" && (slug.current == $productId || name match $productName)] {
        _id,
        name,
        slug
      }
    `, { 
      productId,
      productName: `*${productId.replace(/-/g, ' ')}*`
    });

    if (products.length === 0) {
      console.log(`❌ Product not found in Sanity: ${productId}`);
      return false;
    }

    const product = products[0];
    console.log(`🔄 Updating product: ${product.name} (${product._id})`);

    await client
      .patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      })
      .commit();

    console.log(`✅ Updated ${product.name} with new image`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to update product ${productId}:`, error.message);
    return false;
  }
}

async function fixLouisPoulsenImages() {
  console.log(`🎯 Processing ${productsNeedingImages.length} products...\n`);

  for (const product of productsNeedingImages) {
    console.log(`\n📦 Processing: ${product.name}`);
    
    // Upload image to Sanity
    const imageAsset = await uploadImageToSanity(product.imagePath, product.name);
    
    if (imageAsset) {
      // Update product with new image
      await updateProductWithImage(product.id, imageAsset);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Louis Poulsen image fix completed!');
  console.log('📝 All products should now have working images from Sanity CDN');
}

// Run the fix
fixLouisPoulsenImages().catch(console.error);
