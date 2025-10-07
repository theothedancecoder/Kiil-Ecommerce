import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import imageUrlBuilder from '@sanity/image-url';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

// Helper to upload image to Sanity
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

// Step 1: Create or get Lighting category
async function ensureLightingCategory() {
  console.log('📁 Ensuring Lighting category exists...\n');
  
  const existingCategory = await client.fetch(
    `*[_type == "category" && title == "Lighting"][0]`
  );

  if (existingCategory) {
    console.log(`✅ Lighting category already exists: ${existingCategory._id}\n`);
    return existingCategory._id;
  }

  // Create the category
  const category = await client.create({
    _type: 'category',
    title: 'Lighting',
    slug: {
      _type: 'slug',
      current: 'lighting'
    },
    description: 'Lighting products including table lamps, floor lamps, pendant lights, and ceiling lamps'
  });

  console.log(`✅ Created Lighting category: ${category._id}\n`);
  return category._id;
}

// Step 2: Add category to all existing Louis Poulsen products
async function addCategoriesToExistingProducts(categoryId) {
  console.log('🏷️  Adding Lighting category to existing Louis Poulsen products...\n');

  const products = await client.fetch(
    `*[_type == "product" && brand == "Louis Poulsen"] {
      _id,
      name,
      categories
    }`
  );

  console.log(`Found ${products.length} Louis Poulsen products\n`);

  let updated = 0;
  for (const product of products) {
    try {
      // Check if category already exists
      const hasCategory = product.categories?.some(cat => 
        cat._ref === categoryId || cat === categoryId
      );

      if (hasCategory) {
        console.log(`⏭️  ${product.name} - already has Lighting category`);
        continue;
      }

      await client
        .patch(product._id)
        .set({
          categories: [
            {
              _type: 'reference',
              _ref: categoryId,
              _key: `category-${Date.now()}`
            }
          ]
        })
        .commit();

      console.log(`✅ ${product.name} - added Lighting category`);
      updated++;
    } catch (error) {
      console.error(`❌ Error updating ${product.name}:`, error.message);
    }
  }

  console.log(`\n✅ Updated ${updated} products with Lighting category\n`);
}

// Step 3: Add missing products
async function addMissingProducts(categoryId) {
  console.log('➕ Adding missing Louis Poulsen products...\n');

  const missingProducts = [
    {
      dir: 'PH-3½-2½-Floor-Lamp',
      name: 'PH 3½-2½ Floor Lamp',
      slug: 'ph-3-5-2-5-floor-lamp',
      description: 'Classic PH floor lamp with three-shade system designed by Poul Henningsen. Provides glare-free, comfortable lighting.',
      designer: 'Poul Henningsen',
      basePrice: 24995
    },
    {
      dir: 'PH-3½-2½-Glass-Table-Lamp',
      name: 'PH 3½-2½ Glass Table Lamp',
      slug: 'ph-3-5-2-5-glass-table-lamp',
      description: 'Elegant glass table lamp from the PH series. Features the iconic three-shade system with glass shades.',
      designer: 'Poul Henningsen',
      basePrice: 18995
    },
    {
      dir: 'PH-5-Mini-Ceiling-lamp',
      name: 'PH 5 Mini Ceiling Lamp',
      slug: 'ph-5-mini-ceiling-lamp',
      description: 'Compact version of the iconic PH 5 pendant. Perfect for smaller spaces while maintaining the classic design.',
      designer: 'Poul Henningsen',
      basePrice: 7995
    },
    {
      dir: 'PH-5:5-pendant',
      name: 'PH 5/5 Pendant',
      slug: 'ph-5-5-pendant',
      description: 'Larger version of the PH pendant series. Ideal for dining areas and spaces requiring more substantial lighting.',
      designer: 'Poul Henningsen',
      basePrice: 15995
    },
    {
      dir: 'PH-8- Floor-Lamp',
      name: 'PH 8 Floor Lamp',
      slug: 'ph-8-floor-lamp',
      description: 'Large floor lamp from the PH series. Makes a bold statement while providing excellent ambient lighting.',
      designer: 'Poul Henningsen',
      basePrice: 34995
    },
    {
      dir: 'PH-Septima',
      name: 'PH Septima',
      slug: 'ph-septima',
      description: 'Modern interpretation of the PH lamp series with seven shades. Combines classic design with contemporary aesthetics.',
      designer: 'Poul Henningsen',
      basePrice: 12995
    },
    {
      dir: 'PH-Snowball',
      name: 'PH Snowball',
      slug: 'ph-snowball',
      description: 'Spherical pendant lamp with multiple layers creating a snowball effect. A unique piece in the PH collection.',
      designer: 'Poul Henningsen',
      basePrice: 9995
    },
    {
      dir: 'Panthella-400-Table-Lamp',
      name: 'Panthella 400 Table Lamp',
      slug: 'panthella-400-table-lamp-new',
      description: 'Large table lamp with the iconic Panthella mushroom shape. Perfect for making a statement in any room.',
      designer: 'Verner Panton',
      basePrice: 8995
    },
    {
      dir: 'Tomoshi-rechargeable-lamp',
      name: 'Tomoshi Rechargeable Lamp',
      slug: 'tomoshi-rechargeable-lamp',
      description: 'Portable rechargeable lamp with Japanese-inspired design. Perfect for both indoor and outdoor use.',
      designer: 'Setsu & Shinobu Ito',
      basePrice: 2495
    },
    {
      dir: 'VL45 Radio-House-Rechargeable-Lamp',
      name: 'VL45 Radiohus Rechargeable Lamp',
      slug: 'vl45-radiohus-rechargeable-lamp',
      description: 'Portable rechargeable version of the classic Radiohus lamp. Combines vintage design with modern functionality.',
      designer: 'Vilhelm Lauritzen',
      basePrice: 3995
    },
    {
      dir: 'VL45 Radio-Housing Pendant-Ø250',
      name: 'VL45 Radiohus Pendant Ø250',
      slug: 'vl45-radiohus-pendant-250',
      description: 'Pendant version of the iconic Radiohus lamp. A timeless design that works in both classic and modern interiors.',
      designer: 'Vilhelm Lauritzen',
      basePrice: 5995
    }
  ];

  for (const productData of missingProducts) {
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

      const productDir = path.join('public/Louis-Poulsen', productData.dir);
      
      if (!fs.existsSync(productDir)) {
        console.log(`❌ Directory not found: ${productDir}`);
        continue;
      }

      // Get all image files
      const files = fs.readdirSync(productDir);
      const imageFiles = files.filter(f => 
        (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) &&
        !f.includes('lifestyle')
      );

      console.log(`   Found ${imageFiles.length} images`);

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

      // Create variants from other images
      const variants = [];
      for (let i = 0; i < Math.min(imageFiles.length, 8); i++) {
        const imagePath = path.join(productDir, imageFiles[i]);
        const imageId = await uploadImageToSanity(imagePath);
        
        if (imageId) {
          // Extract color/variant info from filename
          const filename = imageFiles[i];
          const colorMatch = filename.match(/Color\s*-\s*([^.]+)/i) || 
                           filename.match(/Farge\s*-\s*([^.]+)/i);
          const color = colorMatch ? colorMatch[1].trim() : `Variant ${i + 1}`;

          variants.push({
            _type: 'variant',
            _key: `variant-${i}`,
            name: color,
            color: color,
            price: productData.basePrice,
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
        name: productData.name,
        slug: {
          _type: 'slug',
          current: productData.slug
        },
        brand: 'Louis Poulsen',
        description: productData.description,
        price: productData.basePrice,
        designer: productData.designer,
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
            _ref: categoryId,
            _key: `category-${Date.now()}`
          }
        ],
        inStock: true,
        stock: 10
      };

      const created = await client.create(product);
      console.log(`   ✅ Created product: ${created._id}`);
      console.log(`   📸 Uploaded ${variants.length} variants`);

    } catch (error) {
      console.error(`   ❌ Error creating ${productData.name}:`, error.message);
    }
  }

  console.log('\n✅ Finished adding missing products\n');
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Louis Poulsen products fix...\n');
    console.log('=' .repeat(60) + '\n');

    // Step 1: Ensure Lighting category exists
    const categoryId = await ensureLightingCategory();

    // Step 2: Add category to existing products
    await addCategoriesToExistingProducts(categoryId);

    // Step 3: Add missing products
    await addMissingProducts(categoryId);

    console.log('=' .repeat(60));
    console.log('\n✅ All done! Louis Poulsen products should now appear on the møbler page.\n');
    console.log('Next steps:');
    console.log('1. Check the møbler page to verify products appear');
    console.log('2. Test individual product pages');
    console.log('3. Deploy to production\n');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

main()
  .then(() => {
    console.log('✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
