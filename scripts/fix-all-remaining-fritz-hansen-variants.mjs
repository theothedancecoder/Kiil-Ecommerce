import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const uploadedImage = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    return uploadedImage;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[™®©]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function scanAndUploadVariants() {
  console.log('=== Scanning All Fritz Hansen Products for Variant Images ===\n');

  const fritzHansenDir = path.join(process.cwd(), 'public', 'Fritz Hansen');
  
  if (!fs.existsSync(fritzHansenDir)) {
    console.log('Fritz Hansen directory not found');
    return;
  }

  const productDirs = fs.readdirSync(fritzHansenDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`Found ${productDirs.length} product directories\n`);

  for (const productDir of productDirs) {
    const productPath = path.join(fritzHansenDir, productDir);
    const imageFiles = fs.readdirSync(productPath)
      .filter(file => /\.(png|jpg|webp|jpeg)$/i.test(file) && !file.startsWith('.'));

    if (imageFiles.length < 2) {
      continue; // Skip products with less than 2 images (no variants)
    }

    console.log(`\n📦 Processing: ${productDir}`);
    console.log(`   Found ${imageFiles.length} variant images`);

    // Try to find product in Sanity by slug
    const possibleSlugs = [
      slugify(productDir),
      slugify(productDir.replace(/-/g, ' ')),
      productDir.toLowerCase(),
    ];

    let product = null;
    for (const slug of possibleSlugs) {
      product = await client.fetch(
        `*[_type == "product" && brand == "Fritz Hansen" && slug.current == $slug][0]`,
        { slug }
      );
      if (product) break;
    }

    if (!product) {
      console.log(`   ⚠️  Product not found in Sanity (tried slugs: ${possibleSlugs.join(', ')})`);
      continue;
    }

    console.log(`   ✅ Found in Sanity: ${product.name}`);
    console.log(`   Current variants: ${product.variants?.length || 0}`);

    if (!product.variants || product.variants.length === 0) {
      console.log(`   ⚠️  No variants defined in Sanity`);
      continue;
    }

    // Upload images for variants that don't have them
    let updated = false;
    const updatedVariants = await Promise.all(
      product.variants.map(async (variant, index) => {
        if (variant.image?.asset?._ref) {
          return variant; // Already has image
        }

        // Try to match variant to image file
        const imageFile = imageFiles[index] || imageFiles[0];
        const imagePath = `/Fritz Hansen/${productDir}/${imageFile}`;

        console.log(`   📤 Uploading for variant "${variant.name}": ${imageFile}`);
        const uploadedImage = await uploadImageToSanity(imagePath);

        if (!uploadedImage) {
          return variant;
        }

        updated = true;
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

    if (updated) {
      await client
        .patch(product._id)
        .set({ variants: updatedVariants })
        .commit();
      console.log(`   ✅ Updated ${product.name}`);
    } else {
      console.log(`   ℹ️  All variants already have images`);
    }
  }

  console.log('\n=== Scan Complete ===');
}

scanAndUploadVariants();
