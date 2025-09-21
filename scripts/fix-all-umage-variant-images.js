import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

console.log('🔧 Fixing ALL Umage product variant images...');

async function uploadImageToSanity(imagePath, filename) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename
    });

    console.log(`✅ Uploaded: ${filename} -> ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function findImageInPublicFolder(productName, variantName) {
  // Common patterns for Umage image paths
  const possiblePaths = [
    `/umage/${productName}`,
    `/umage/${productName.replace(/\s+/g, '-')}`,
    `/umage/${productName.replace(/\s+/g, '_')}`,
    `/umage/${productName.replace(/\s+/g, '')}`
  ];

  for (const basePath of possiblePaths) {
    const fullBasePath = path.join(process.cwd(), 'public', basePath);
    
    if (fs.existsSync(fullBasePath)) {
      console.log(`📁 Found directory: ${basePath}`);
      
      // List all files in the directory
      const files = fs.readdirSync(fullBasePath);
      console.log(`📄 Files in directory: ${files.length}`);
      
      // Look for files that might match this variant
      const variantKeywords = variantName.toLowerCase().split(/[\s-_]+/);
      
      for (const file of files) {
        const fileLower = file.toLowerCase();
        
        // Check if file contains variant keywords
        const matchCount = variantKeywords.filter(keyword => 
          fileLower.includes(keyword.toLowerCase())
        ).length;
        
        if (matchCount >= 2 || (matchCount >= 1 && variantKeywords.length === 1)) {
          console.log(`🎯 Found potential match: ${file} (${matchCount} keywords matched)`);
          return `${basePath}/${file}`;
        }
      }
      
      // If no specific match, return the first image file
      const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
      if (imageFiles.length > 0) {
        console.log(`📸 Using first image file: ${imageFiles[0]}`);
        return `${basePath}/${imageFiles[0]}`;
      }
    }
  }
  
  return null;
}

async function fixAllUmageVariants() {
  try {
    // Get all Umage products with variants
    const products = await client.fetch(`
      *[_type == "product" && brand == "UMAGE" && count(variants) > 1] {
        _id,
        name,
        slug,
        variants[] {
          _key,
          name,
          color,
          material,
          price,
          image
        }
      }
    `);

    console.log(`📦 Found ${products.length} Umage products with multiple variants`);

    for (const product of products) {
      console.log(`\n🔧 Processing: ${product.name}`);
      console.log(`📊 Variants: ${product.variants?.length || 0}`);
      
      if (!product.variants || product.variants.length <= 1) {
        console.log('⏭️ Skipping - no multiple variants');
        continue;
      }

      // Check if variants are sharing images
      const imageUrls = product.variants
        .map(v => v.image?.asset?._ref || v.image?.asset?.url)
        .filter(Boolean);
      const uniqueUrls = [...new Set(imageUrls)];
      
      if (imageUrls.length === uniqueUrls.length) {
        console.log('✅ All variants already have unique images');
        continue;
      }
      
      console.log(`❌ Problem detected: ${imageUrls.length} variants, ${uniqueUrls.length} unique images`);
      
      // Try to find and upload images for each variant
      const updatedVariants = [];
      
      for (const variant of product.variants) {
        console.log(`\n  🎨 Processing variant: ${variant.name}`);
        
        // Try to find an image for this variant
        const imagePath = await findImageInPublicFolder(product.name, variant.name);
        
        if (imagePath) {
          const asset = await uploadImageToSanity(
            imagePath,
            `${product.slug?.current || product.name.toLowerCase().replace(/\s+/g, '-')}-${variant.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.webp`
          );
          
          if (asset) {
            updatedVariants.push({
              ...variant,
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: asset._id
                }
              }
            });
            console.log(`  ✅ Updated variant: ${variant.name}`);
          } else {
            updatedVariants.push(variant);
            console.log(`  ⚠️ Keeping existing image for: ${variant.name}`);
          }
        } else {
          updatedVariants.push(variant);
          console.log(`  ❌ No image found for: ${variant.name}`);
        }
      }

      // Update the product with new variant images
      if (updatedVariants.length > 0) {
        await client
          .patch(product._id)
          .set({
            variants: updatedVariants
          })
          .commit();
        
        console.log(`✅ Updated product: ${product.name}`);
      }
    }

    console.log('\n🎉 Completed fixing all Umage variant images!');

  } catch (error) {
    console.error('❌ Error fixing Umage variants:', error);
  }
}

fixAllUmageVariants();
