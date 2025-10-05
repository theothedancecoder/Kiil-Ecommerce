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

const variantImages = {
  'Essential Leather - Light Grey': '/Fritz Hansen/Swan-chair-in-leather/Svanen stol i skinn kr 77 499  Farge - Essential leather : Light Grey.png',
  'Essential Leather - Walnut': '/Fritz Hansen/Swan-chair-in-leather/Svanen stol i skinn kr 77 499  Farge - Essential leather : Walnut.png',
  'Embrace Leather - Concrete Grey': '/Fritz Hansen/Swan-chair-in-leather/Swan chair in leather NOK  105,499  Color -  Embrace leather : Concrete Grey.png',
  'Aura Leather - Black': '/Fritz Hansen/Swan-chair-in-leather/Swan chair in leather NOK  89,999  Color -  Aura Leather : Black.png',
};

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
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function fixSwanChairVariants() {
  console.log('=== Fixing Swan Chair in Leather Variant Images ===\n');

  const product = await client.fetch(
    `*[_type == "product" && brand == "Fritz Hansen" && slug.current == "swan-chair-in-leather"][0]`
  );

  if (!product) {
    console.log('Product not found');
    return;
  }

  console.log(`Found: ${product.name}`);
  console.log(`Current variants: ${product.variants?.length || 0}\n`);

  const updatedVariants = await Promise.all(
    product.variants.map(async (variant) => {
      const imagePath = variantImages[variant.name];
      
      if (!imagePath) {
        console.log(`⚠️  No image mapping for: ${variant.name}`);
        return variant;
      }

      if (variant.image?.asset?._ref) {
        console.log(`ℹ️  "${variant.name}" already has image`);
        return variant;
      }

      console.log(`📤 Uploading: ${variant.name}`);
      const uploadedImage = await uploadImageToSanity(imagePath);

      if (!uploadedImage) {
        return variant;
      }

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

  await client
    .patch(product._id)
    .set({ variants: updatedVariants })
    .commit();
  
  console.log('\n✅ Swan Chair variants updated successfully');
}

fixSwanChairVariants();
