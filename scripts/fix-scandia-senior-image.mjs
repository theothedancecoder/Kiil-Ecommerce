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
    console.log(`   ✅ Uploaded: ${path.basename(imagePath)}`);
    return asset._id;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function fixScandiaseniorImage() {
  try {
    console.log('🖼️  Fixing Scandia Senior Tilt Armchair image...\n');

    // Find the product in Sanity
    const product = await client.fetch(
      `*[_type == "product" && slug.current == "scandia-senior-black"][0] {
        _id,
        name,
        brand,
        image,
        variants
      }`
    );

    if (!product) {
      console.log('❌ Product not found in Sanity with slug "scandia-senior-black"');
      console.log('Searching for similar products...\n');
      
      const similarProducts = await client.fetch(
        `*[_type == "product" && name match "*Scandia*"] {
          _id,
          name,
          slug,
          brand
        }`
      );
      
      if (similarProducts.length > 0) {
        console.log(`Found ${similarProducts.length} similar products:`);
        similarProducts.forEach(p => {
          console.log(`  - ${p.name} (slug: ${p.slug?.current}, brand: ${p.brand})`);
        });
      }
      return;
    }

    console.log(`Found product: ${product.name}`);
    console.log(`Brand: ${product.brand}`);
    console.log(`Current image: ${product.image ? 'Yes' : 'No'}`);
    console.log(`Current variants: ${product.variants?.length || 0}\n`);

    // Upload main image from sales folder
    const mainImagePath = 'public/sales/Scandia-Senior-Tilt-armchair/Scandia Senior Tilt armchair NOK  29,250 Original price was- NOK 29,250.NOK  24,863Current price is- NOK 24,863.  Color -  Oak Oak White pigmented oak Black Walnut Base -  Black.webp';
    
    if (!fs.existsSync(mainImagePath)) {
      console.log(`❌ Main image not found: ${mainImagePath}`);
      return;
    }

    console.log('Uploading main image...');
    const mainImageId = await uploadImageToSanity(mainImagePath);

    if (!mainImageId) {
      console.log('❌ Failed to upload main image');
      return;
    }

    // Upload variant image
    const variantImagePath = 'public/sales/Scandia-Senior-Tilt-armchair/Scandia Senior Tilt armchair NOK  30,050 Original price was- NOK 30,050.NOK  25,543Current price is- NOK 25,543.  Color -  Black Oak White pigmented oak Black Walnut Base -  Matt chrome.webp';
    
    let variantImageId = null;
    if (fs.existsSync(variantImagePath)) {
      console.log('Uploading variant image...');
      variantImageId = await uploadImageToSanity(variantImagePath);
    }

    // Upload lifestyle images
    const lifestyleImages = [];
    const lifestyleDir = 'public/interior-collection/fjordfiesta';
    
    if (fs.existsSync(lifestyleDir)) {
      const lifestyleFiles = fs.readdirSync(lifestyleDir)
        .filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
      
      for (const file of lifestyleFiles.slice(0, 2)) {
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
        }
      }
      
      console.log(`\nUploaded ${lifestyleImages.length} lifestyle images`);
    }

    // Prepare variants
    const variants = [];
    
    if (variantImageId) {
      variants.push({
        _type: 'variant',
        _key: 'variant-0',
        name: 'Oak with Black Base',
        material: 'Oak',
        color: 'Black Base',
        price: 29250,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mainImageId
          }
        }
      });
      
      variants.push({
        _type: 'variant',
        _key: 'variant-1',
        name: 'Black Oak with Matt Chrome Base',
        material: 'Black Oak',
        color: 'Matt Chrome Base',
        price: 30050,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: variantImageId
          }
        }
      });
    }

    // Update the product
    const updateData = {
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageId
        }
      }
    };

    if (variants.length > 0) {
      updateData.variants = variants;
    }

    if (lifestyleImages.length > 0) {
      updateData.lifestyleImages = lifestyleImages;
    }

    await client
      .patch(product._id)
      .set(updateData)
      .commit();

    console.log('\n✅ Product updated successfully!');
    console.log(`   Main image: ✅`);
    console.log(`   Variants: ${variants.length}`);
    console.log(`   Lifestyle images: ${lifestyleImages.length}`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

fixScandiaseniorImage()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
