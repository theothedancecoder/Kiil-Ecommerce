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
  
  const categories = ['Seating', 'Tables', 'Outdoor', 'Furniture'];
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

async function addSkagerakProducts(categoryIds) {
  console.log('🪑 Adding Skagerak products...\n');

  const products = [
    {
      dir: 'Vendia klappstol',
      name: 'Vendia Folding Chair',
      slug: 'vendia-folding-chair',
      description: 'Elegant folding chair from Skagerak by Fritz Hansen. Perfect for outdoor dining and easy storage. Features weather-resistant materials and classic Scandinavian design.',
      price: 4995,
      categories: ['Seating', 'Outdoor', 'Furniture']
    }
  ];

  for (const productData of products) {
    try {
      console.log(`\n📦 Processing: ${productData.name}`);

      // Check if product already exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]`,
        { slug: productData.slug }
      );

      if (existing) {
        console.log(`⏭️  Product already exists, skipping...`);
        continue;
      }

      const productDir = path.join('public/Outdoor/Skagerak-by-Fritz-Hansen', productData.dir);
      
      if (!fs.existsSync(productDir)) {
        console.log(`❌ Directory not found: ${productDir}`);
        continue;
      }

      // Get all image files (excluding lifestyle)
      const files = fs.readdirSync(productDir);
      const imageFiles = files.filter(f => 
        (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) &&
        !f.includes('lifestyle')
      );

      console.log(`   Found ${imageFiles.length} product images`);

      if (imageFiles.length === 0) {
        console.log(`   ⚠️  No images found, skipping...`);
        continue;
      }

      // Upload main image
      const mainImagePath = path.join(productDir, imageFiles[0]);
      console.log(`   Uploading main image: ${imageFiles[0]}`);
      const mainImageId = await uploadImageToSanity(mainImagePath);

      if (!mainImageId) {
        console.log(`   ❌ Failed to upload main image, skipping product...`);
        continue;
      }

      // Create variants from images
      const variants = [];
      for (let i = 0; i < imageFiles.length; i++) {
        const imagePath = path.join(productDir, imageFiles[i]);
        const imageId = await uploadImageToSanity(imagePath);
        
        if (imageId) {
          const filename = imageFiles[i];
          const colorMatch = filename.match(/Color\s*-\s*([^.]+)/i) || 
                           filename.match(/Farge\s*-\s*([^.]+)/i);
          const color = colorMatch ? colorMatch[1].trim() : `Variant ${i + 1}`;

          variants.push({
            _type: 'variant',
            _key: `variant-${i}`,
            name: color,
            color: color,
            price: productData.price,
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

      // Check for lifestyle images
      const lifestyleDir = path.join(productDir, 'lifestyle');
      const lifestyleImages = [];
      
      if (fs.existsSync(lifestyleDir)) {
        const lifestyleFiles = fs.readdirSync(lifestyleDir)
          .filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));
        
        console.log(`   Found ${lifestyleFiles.length} lifestyle images`);
        
        for (const file of lifestyleFiles) {
          const lifestylePath = path.join(lifestyleDir, file);
          const imageId = await uploadImageToSanity(lifestylePath);
          
          if (imageId) {
            lifestyleImages.push({
              _type: 'image',
              _key: `lifestyle-${Date.now()}-${lifestyleImages.length}`,
              asset: {
                _type: 'reference',
                _ref: imageId
              }
            });
          }
        }
      }

      // Create the product
      const product = {
        _type: 'product',
        name: productData.name,
        slug: {
          _type: 'slug',
          current: productData.slug
        },
        brand: 'Skagerak',
        description: productData.description,
        price: productData.price,
        designer: 'Skagerak Design Team',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mainImageId
          }
        },
        variants: variants,
        lifestyleImages: lifestyleImages,
        categories: productData.categories.map((cat, idx) => ({
          _type: 'reference',
          _ref: categoryIds[cat],
          _key: `category-${cat.toLowerCase()}-${Date.now() + idx}`
        })),
        inStock: true,
        stock: 5
      };

      const created = await client.create(product);
      console.log(`   ✅ Created product: ${created._id}`);
      console.log(`   📸 Uploaded ${variants.length} variants`);
      console.log(`   🖼️  Uploaded ${lifestyleImages.length} lifestyle images`);
      console.log(`   🏷️  Added ${productData.categories.length} categories`);

    } catch (error) {
      console.error(`   ❌ Error creating ${productData.name}:`, error.message);
    }
  }

  console.log('\n✅ Finished adding Skagerak products\n');
}

async function main() {
  try {
    console.log('🚀 Adding Skagerak products to Sanity...\n');
    console.log('='.repeat(60) + '\n');

    const categoryIds = await ensureCategories();
    await addSkagerakProducts(categoryIds);

    console.log('='.repeat(60));
    console.log('\n✅ All Skagerak products added successfully!\n');

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
