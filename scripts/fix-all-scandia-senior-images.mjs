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
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function fixAllScandiaProducts() {
  try {
    console.log('🖼️  Fixing all Scandia Senior products...\n');

    // Find all Scandia products
    const products = await client.fetch(
      `*[_type == "product" && name match "*Scandia*"] {
        _id,
        name,
        slug,
        brand,
        image,
        variants
      }`
    );

    console.log(`Found ${products.length} Scandia products:\n`);
    products.forEach(p => {
      console.log(`  - ${p.name} (slug: ${p.slug?.current})`);
      console.log(`    Has image: ${p.image ? 'Yes' : 'No'}`);
      console.log(`    Variants: ${p.variants?.length || 0}\n`);
    });

    // Get available images
    const salesDir = 'public/sales/Scandia-Senior-Tilt-armchair';
    const imageFiles = fs.readdirSync(salesDir)
      .filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));

    console.log(`\nFound ${imageFiles.length} images in sales folder\n`);

    // Upload lifestyle images once (shared across products)
    const lifestyleImages = [];
    const lifestyleDir = 'public/interior-collection/fjordfiesta';
    
    if (fs.existsSync(lifestyleDir)) {
      const lifestyleFiles = fs.readdirSync(lifestyleDir)
        .filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
      
      console.log('Uploading lifestyle images...');
      for (const file of lifestyleFiles.slice(0, 3)) {
        const lifestylePath = path.join(lifestyleDir, file);
        const lifestyleImageId = await uploadImageToSanity(lifestylePath);
        
        if (lifestyleImageId) {
          lifestyleImages.push({
            _type: 'image',
            _key: `lifestyle-${lifestyleImages.length}`,
            asset: {
              _type: 'reference',
              _ref: lifestyleImageId
            }
          });
          console.log(`   ✅ ${file}`);
        }
      }
      console.log(`\nUploaded ${lifestyleImages.length} lifestyle images\n`);
    }

    // Upload main images
    console.log('Uploading product images...');
    const uploadedImages = [];
    for (const imageFile of imageFiles) {
      const imagePath = path.join(salesDir, imageFile);
      const imageId = await uploadImageToSanity(imagePath);
      
      if (imageId) {
        uploadedImages.push({
          filename: imageFile,
          imageId: imageId
        });
        console.log(`   ✅ ${imageFile}`);
      }
    }

    // Update each product
    console.log(`\n📝 Updating ${products.length} products...\n`);

    for (const product of products) {
      try {
        // Skip if already has image
        if (product.image) {
          console.log(`⏭️  ${product.name} - already has image, skipping`);
          continue;
        }

        // Use the first uploaded image as main image
        const mainImage = uploadedImages[0];
        
        if (!mainImage) {
          console.log(`❌ ${product.name} - no images available`);
          continue;
        }

        // Create variants from all images
        const variants = uploadedImages.map((img, index) => {
          // Extract variant info from filename
          const baseMatch = img.filename.match(/Base\s*-\s*([^.]+)/i);
          const colorMatch = img.filename.match(/Color\s*-\s*([^B]+)Base/i);
          const priceMatch = img.filename.match(/NOK\s*([\d,]+)/);
          
          const baseName = baseMatch ? baseMatch[1].trim() : `Variant ${index + 1}`;
          const colorName = colorMatch ? colorMatch[1].trim() : '';
          const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 29250;

          return {
            _type: 'variant',
            _key: `variant-${index}`,
            name: `${colorName} - ${baseName}`.trim(),
            material: colorName || 'Oak',
            color: baseName,
            price: price,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: img.imageId
              }
            }
          };
        });

        // Update product
        await client
          .patch(product._id)
          .set({
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: mainImage.imageId
              }
            },
            variants: variants,
            lifestyleImages: lifestyleImages
          })
          .commit();

        console.log(`✅ ${product.name} - updated with ${variants.length} variants and ${lifestyleImages.length} lifestyle images`);

      } catch (error) {
        console.error(`❌ Error updating ${product.name}:`, error.message);
      }
    }

    console.log('\n✅ All Scandia Senior products updated!');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

fixAllScandiaProducts()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
