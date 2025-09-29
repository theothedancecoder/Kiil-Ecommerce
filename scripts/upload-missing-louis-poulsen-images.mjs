import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

console.log('🔧 Uploading missing Louis Poulsen images to Sanity...\n');

// Map of products that need main images with their corresponding file paths
const missingImageMappings = [
  {
    productName: "AJ Floor Lamp",
    slug: "aj-floor-lamp",
    imagePath: "public/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp"
  },
  {
    productName: "PH Artichoke 480",
    slug: "ph-artichoke-480", 
    imagePath: "public/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg"
  },
  {
    productName: "PH Artichoke 600",
    slug: "ph-artichoke-600",
    imagePath: "public/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg"
  },
  {
    productName: "PH Artichoke 720", 
    slug: "ph-artichoke-720",
    imagePath: "public/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg"
  },
  {
    productName: "Panthella Floor",
    slug: "panthella-floor",
    imagePath: "public/Louis-Poulsen/Panthella-Floor-Lamp/Panthella Floor Lamp NOK  13,975  Color -  Opal white:high luster chrome plated.webp"
  },
  {
    productName: "Panthella Table 400",
    slug: "panthella-table-400", 
    imagePath: "public/Louis-Poulsen/Panthella-400-Table-Lamp/Panthella 400 Table Lamp NOK  9,170.jpg"
  },
  {
    productName: "Panthella Table Lamp",
    slug: "panthella-table-lamp",
    imagePath: "public/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - White.webp"
  },
  {
    productName: "Toldbod Glass 120",
    slug: "toldbod-glass-120",
    imagePath: "public/Louis-Poulsen/Toldbod-Glass-120/Toldbod Glass 120 NOK  4,999.jpg"
  },
  {
    productName: "Toldbod Glass 155",
    slug: "toldbod-glass-155", 
    imagePath: "public/Louis-Poulsen/Toldbod-Glass-155/Toldbod Glass 155 NOK  5,999.jpg"
  },
  {
    productName: "Toldbod Glass 220",
    slug: "toldbod-glass-220",
    imagePath: "public/Louis-Poulsen/Toldbod-Glass-220/Toldbod Glass 220 NOK  6,999.jpg"
  },
  {
    productName: "VL38 Floor",
    slug: "vl38-floor",
    imagePath: "public/Louis-Poulsen/VL38-Floor/VL38 Floor NOK  8,999.jpg"
  },
  {
    productName: "VL38 Table", 
    slug: "vl38-table",
    imagePath: "public/Louis-Poulsen/VL38-Table/VL38 Table NOK  6,840.jpg"
  },
  {
    productName: "Yuh Floor",
    slug: "yuh-floor",
    imagePath: "public/Louis-Poulsen/Yuh-floor-lamp/Yuh floor lamp from Louis Poulsen NOK  8,855  Color -  White.webp"
  },
  {
    productName: "Yuh Table",
    slug: "yuh-table", 
    imagePath: "public/Louis-Poulsen/Yuh-table-lamp/Yuh table lamp from Louis Poulsen NOK  6,840  Color -  White.webp"
  }
];

// Helper function to upload image to Sanity
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

// Helper function to update product with main image
async function updateProductWithMainImage(productName, slug, imageAsset) {
  try {
    // Find the product by slug or name
    const products = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen" && (slug.current == $slug || name match $productName)] {
        _id,
        name,
        slug
      }
    `, { 
      slug,
      productName: `*${productName}*`
    });

    if (products.length === 0) {
      console.log(`❌ Product not found in Sanity: ${productName}`);
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

    console.log(`✅ Updated ${product.name} with main image`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to update product ${productName}:`, error.message);
    return false;
  }
}

async function uploadMissingImages() {
  console.log(`🎯 Processing ${missingImageMappings.length} products with missing images...\n`);

  let successCount = 0;
  let failureCount = 0;

  for (const mapping of missingImageMappings) {
    console.log(`\n📦 Processing: ${mapping.productName}`);
    
    // Upload image to Sanity
    const imageAsset = await uploadImageToSanity(mapping.imagePath, mapping.productName);
    
    if (imageAsset) {
      // Update product with new main image
      const success = await updateProductWithMainImage(mapping.productName, mapping.slug, imageAsset);
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }
    } else {
      failureCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Missing image upload completed!');
  console.log(`✅ Successfully updated: ${successCount} products`);
  console.log(`❌ Failed to update: ${failureCount} products`);
  
  // Final verification
  console.log('\n🔍 Verifying all products now have main images...');
  
  const finalCheck = await client.fetch(`
    *[_type == "product" && brand == "Louis Poulsen"] {
      _id,
      name,
      "hasMainImage": defined(image)
    }
  `);

  const withImages = finalCheck.filter(p => p.hasMainImage).length;
  const withoutImages = finalCheck.filter(p => !p.hasMainImage).length;

  console.log(`\n📊 Final Status:`);
  console.log(`✅ Products with main images: ${withImages}`);
  console.log(`❌ Products without main images: ${withoutImages}`);
  console.log(`📦 Total products: ${finalCheck.length}`);

  if (withoutImages === 0) {
    console.log('\n🎉 SUCCESS: All Louis Poulsen products now have main images!');
    console.log('🌐 The production site should now display all images correctly.');
    console.log('🔄 It may take a few minutes for Vercel to update the cache.');
  } else {
    console.log('\n⚠️  Some products still missing images:');
    finalCheck.filter(p => !p.hasMainImage).forEach(p => {
      console.log(`  - ${p.name} (${p._id})`);
    });
  }
}

// Run the upload
uploadMissingImages().catch(console.error);
