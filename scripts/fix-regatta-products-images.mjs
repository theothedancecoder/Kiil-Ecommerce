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

async function fixRegattaImages() {
  console.log('=== Fixing Regatta Product Images ===\n');

  const regattaProducts = [
    { slug: 'regatta-lounge-bench', dir: 'Regatta-Bench' },
    { slug: 'regatta-lounge-chair', dir: 'Regatta-Chair' },
    { slug: 'regatta-lounge-stool', dir: 'Regatta-stool' },
    { slug: 'regatta-lounge-table-60', dir: 'Regatta-table-Ø-60' },
  ];

  const fritzHansenDir = path.join(process.cwd(), 'public', 'Fritz Hansen');

  for (const { slug, dir } of regattaProducts) {
    console.log(`\n📦 Processing: ${slug}`);
    
    // Get product from Sanity
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        image
      }`,
      { slug }
    );

    if (!product) {
      console.log(`   ⚠️  Product not found in Sanity`);
      continue;
    }

    console.log(`   Found: ${product.name}`);

    if (product.image?.asset?._ref) {
      console.log(`   ✅ Already has main image`);
      continue;
    }

    // Find product directory
    const productPath = path.join(fritzHansenDir, dir);
    
    if (!fs.existsSync(productPath)) {
      console.log(`   ⚠️  Directory not found: ${dir}`);
      continue;
    }

    // Get first image from directory
    const imageFiles = fs.readdirSync(productPath)
      .filter(file => /\.(png|jpg|webp|jpeg)$/i.test(file) && !file.startsWith('.'));

    if (imageFiles.length === 0) {
      console.log(`   ⚠️  No images found in directory`);
      continue;
    }

    const mainImageFile = imageFiles[0];
    const imagePath = `/Fritz Hansen/${dir}/${mainImageFile}`;

    console.log(`   📤 Uploading: ${mainImageFile}`);
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

    console.log(`   ✅ Updated ${product.name}`);
  }

  console.log('\n=== Regatta Images Fix Complete ===');
}

fixRegattaImages();
