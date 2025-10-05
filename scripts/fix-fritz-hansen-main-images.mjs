import { createClient } from '@sanity/client';
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
    console.error(`   ❌ Error uploading:`, error.message);
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

async function fixMainImages() {
  console.log('=== Fixing Fritz Hansen Main Product Images ===\n');

  // Get all Fritz Hansen products
  const products = await client.fetch(
    `*[_type == "product" && brand == "Fritz Hansen"] | order(name asc)`
  );

  console.log(`Found ${products.length} Fritz Hansen products\n`);

  const fritzHansenDir = path.join(process.cwd(), 'public', 'Fritz Hansen');
  
  for (const product of products) {
    if (product.image?.asset?._ref) {
      continue; // Already has main image
    }

    console.log(`\n📦 ${product.name} (${product.slug?.current || 'no-slug'})`);
    console.log(`   ⚠️  Missing main image`);

    // Try to find product directory
    const productDirs = fs.readdirSync(fritzHansenDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const possibleDirs = productDirs.filter(dir => {
      const dirSlug = slugify(dir);
      const productSlug = product.slug?.current || slugify(product.name);
      return dirSlug.includes(productSlug) || productSlug.includes(dirSlug);
    });

    if (possibleDirs.length === 0) {
      console.log(`   ⚠️  No matching directory found`);
      continue;
    }

    const productDir = possibleDirs[0];
    console.log(`   📁 Found directory: ${productDir}`);

    const productPath = path.join(fritzHansenDir, productDir);
    const imageFiles = fs.readdirSync(productPath)
      .filter(file => /\.(png|jpg|webp|jpeg)$/i.test(file) && !file.startsWith('.'));

    if (imageFiles.length === 0) {
      console.log(`   ⚠️  No images found in directory`);
      continue;
    }

    // Use first image as main product image
    const mainImageFile = imageFiles[0];
    const imagePath = `/Fritz Hansen/${productDir}/${mainImageFile}`;

    console.log(`   📤 Uploading main image: ${mainImageFile}`);
    const uploadedImage = await uploadImageToSanity(imagePath);

    if (!uploadedImage) {
      continue;
    }

    await client
      .patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id,
          },
        },
      })
      .commit();

    console.log(`   ✅ Updated ${product.name} with main image`);
  }

  console.log('\n=== Main Images Fix Complete ===');
}

fixMainImages();
