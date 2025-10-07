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

async function ensureCategories() {
  console.log('📁 Ensuring categories exist...\n');
  
  const categories = ['Tables', 'Outdoor', 'Furniture'];
  const categoryIds = {};
  
  for (const catName of categories) {
    const existing = await client.fetch(
      `*[_type == "category" && title == $title][0]`,
      { title: catName }
    );

    if (existing) {
      console.log(`✅ ${catName} category exists: ${existing._id}`);
      categoryIds[catName] = existing._id;
    } else {
      const category = await client.create({
        _type: 'category',
        title: catName,
        slug: {
          _type: 'slug',
          current: catName.toLowerCase()
        }
      });
      console.log(`✅ Created ${catName} category: ${category._id}`);
      categoryIds[catName] = category._id;
    }
  }
  
  console.log('');
  return categoryIds;
}

async function addVendiaCafeTable(categoryIds) {
  try {
    console.log('🪑 Adding Vendia Cafe Table...\n');

    // Check if product already exists
    const existing = await client.fetch(
      `*[_type == "product" && slug.current == "vendia-cafe-table"][0]`
    );

    if (existing) {
      console.log('⏭️  Product already exists, skipping...');
      return;
    }

    const productDir = 'public/Outdoor/Skagerak-by-Fritz-Hansen/Vendia-kafébord';
    
    if (!fs.existsSync(productDir)) {
      console.log(`❌ Directory not found: ${productDir}`);
      return;
    }

    // Get all image files
    const files = fs.readdirSync(productDir);
    const imageFiles = files.filter(f => 
      (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) &&
      !f.includes('lifestyle')
    );

    console.log(`Found ${imageFiles.length} images`);

    if (imageFiles.length === 0) {
      console.log('⚠️  No images found');
      return;
    }

    // Upload main image
    const mainImagePath = path.join(productDir, imageFiles[0]);
    console.log(`Uploading main image: ${imageFiles[0]}`);
    const mainImageId = await uploadImageToSanity(mainImagePath);

    if (!mainImageId) {
      console.log('❌ Failed to upload main image');
      return;
    }

    // Create variants from images
    const variants = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const imagePath = path.join(productDir, imageFiles[i]);
      const imageId = await uploadImageToSanity(imagePath);
      
      if (imageId) {
        const filename = imageFiles[i];
        // Extract size/variant info from filename
        const sizeMatch = filename.match(/(\d+x\d+)/i);
        const size = sizeMatch ? sizeMatch[1] : `Variant ${i + 1}`;

        variants.push({
          _type: 'variant',
          _key: `variant-${i}`,
          name: size,
          size: size,
          price: 8995, // Base price
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageId
            }
          }
        });
      }
    }

    // Create the product
    const product = {
      _type: 'product',
      name: 'Vendia Cafe Table',
      slug: {
        _type: 'slug',
        current: 'vendia-cafe-table'
      },
      brand: 'Skagerak',
      description: 'Elegant outdoor cafe table from Skagerak by Fritz Hansen. Perfect for outdoor dining and entertaining. Features weather-resistant materials and timeless Scandinavian design.',
      price: 8995,
      designer: 'Skagerak Design Team',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageId
        }
      },
      variants: variants,
      categories: [
        {
          _type: 'reference',
          _ref: categoryIds['Tables'],
          _key: `category-tables-${Date.now()}`
        },
        {
          _type: 'reference',
          _ref: categoryIds['Outdoor'],
          _key: `category-outdoor-${Date.now() + 1}`
        },
        {
          _type: 'reference',
          _ref: categoryIds['Furniture'],
          _key: `category-furniture-${Date.now() + 2}`
        }
      ],
      inStock: true,
      stock: 5
    };

    const created = await client.create(product);
    console.log(`\n✅ Created Vendia Cafe Table: ${created._id}`);
    console.log(`📸 Uploaded ${variants.length} variants`);
    console.log(`🏷️  Added 3 categories: Tables, Outdoor, Furniture`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Adding Vendia Cafe Table to Sanity...\n');
    console.log('='.repeat(60) + '\n');

    const categoryIds = await ensureCategories();
    await addVendiaCafeTable(categoryIds);

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Vendia Cafe Table added successfully!');
    console.log('\nThe product will be accessible at:');
    console.log('  - /products/vendia-cafe-table (generic route)');
    console.log('  - Should appear on møbler page (has Furniture category)');
    console.log('  - Should appear on outdoor page (has Outdoor category)\n');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

main()
  .then(() => {
    console.log('✅ Script completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
