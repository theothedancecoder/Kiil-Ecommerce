import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function uploadImageToSanity(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

async function createPlankBench() {
  try {
    console.log('🪑 Creating Skagerak Plank Bench product...\n');

    // Check if product already exists
    const existing = await client.fetch(
      `*[_type == "product" && slug.current == "plank-bench"][0]`
    );

    if (existing) {
      console.log('✅ Product already exists');
      return;
    }

    // Get Furniture category
    let furnitureCategory = await client.fetch(
      `*[_type == "category" && title == "Furniture"][0]`
    );

    if (!furnitureCategory) {
      console.log('Creating Furniture category...');
      furnitureCategory = await client.create({
        _type: 'category',
        title: 'Furniture',
        slug: {
          _type: 'slug',
          current: 'furniture'
        }
      });
    }

    // Upload main image
    const mainImagePath = 'public/Outdoor/Skagerak-by-Fritz-Hansen/Plank-Bench/Plank Bench NOK  19,999.png';
    console.log('Uploading main image...');
    const mainImageId = await uploadImageToSanity(mainImagePath);

    if (!mainImageId) {
      console.log('❌ Failed to upload main image');
      return;
    }

    // Check for lifestyle images
    const lifestyleDir = 'public/Outdoor/Skagerak-by-Fritz-Hansen/Plank-Bench/lifestyle';
    const lifestyleImages = [];
    
    if (fs.existsSync(lifestyleDir)) {
      const files = fs.readdirSync(lifestyleDir);
      const imageFiles = files.filter(f => 
        (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) &&
        !f.startsWith('.')
      );

      console.log(`Found ${imageFiles.length} lifestyle images`);

      for (const file of imageFiles) {
        const lifestyleImagePath = path.join(lifestyleDir, file);
        const lifestyleImageId = await uploadImageToSanity(lifestyleImagePath);
        
        if (lifestyleImageId) {
          lifestyleImages.push({
            _type: 'image',
            _key: `lifestyle-${Date.now()}-${Math.random()}`,
            asset: {
              _type: 'reference',
              _ref: lifestyleImageId
            }
          });
        }
      }
    }

    // Create the product
    const product = {
      _type: 'product',
      name: 'Plank Bench',
      slug: {
        _type: 'slug',
        current: 'plank-bench'
      },
      brand: 'Skagerak by Fritz Hansen',
      description: 'Elegant outdoor bench from Skagerak by Fritz Hansen. Perfect for gardens, patios, and outdoor spaces.',
      price: 19999,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageId
        }
      },
      categories: [
        {
          _type: 'reference',
          _ref: furnitureCategory._id,
          _key: `category-${Date.now()}`
        }
      ],
      inStock: true,
      stock: 5
    };

    if (lifestyleImages.length > 0) {
      product.lifestyleImages = lifestyleImages;
    }

    const created = await client.create(product);
    console.log(`✅ Created product: ${created._id}`);
    console.log(`   Main image: ✅`);
    console.log(`   Lifestyle images: ${lifestyleImages.length}`);
    console.log(`\n✅ Plank Bench product created successfully!`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

createPlankBench()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  });
