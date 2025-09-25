const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function uploadImageToSanity(imagePath, filename) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`   ❌ Image not found: ${imagePath}`);
      return null;
    }

    console.log(`   📤 Uploading: ${filename}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename
    });
    
    console.log(`   ✅ Uploaded: ${asset.url}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error(`   ❌ Error uploading ${filename}:`, error.message);
    return null;
  }
}

async function fixAllDuxPlaceholderImages() {
  console.log('🔧 Finding and fixing all DUX placeholder images...\n');

  try {
    // Get all DUX products
    const duxProducts = await client.fetch(`
      *[_type == "product" && brand == "DUX"] {
        _id,
        name,
        slug,
        image,
        variants[] {
          _key,
          name,
          image
        },
        lifestyleImages[]
      }
    `);

    console.log(`✅ Found ${duxProducts.length} DUX products`);

    for (const product of duxProducts) {
      console.log(`\n🔍 Checking product: ${product.name}`);
      let needsUpdate = false;
      let updatedProduct = { ...product };

      // Check main image
      if (product.image?.asset?.url && product.image.asset.url.includes('placeholder-for-')) {
        console.log(`   📸 Main image is placeholder: ${product.image.asset.url}`);
        needsUpdate = true;
      }

      // Check variant images
      if (product.variants) {
        const updatedVariants = [];
        for (const variant of product.variants) {
          if (variant.image?.asset?.url && variant.image.asset.url.includes('placeholder-for-')) {
            console.log(`   🎨 Variant "${variant.name}" has placeholder image: ${variant.image.asset.url}`);
            
            // Try to find and upload the real image
            const imageName = variant.image.asset.url.replace('https://placeholder-for-', '');
            const possiblePaths = [
              `/dux/${product.name}/${imageName}`,
              `/dux/${product.slug?.current}/${imageName}`,
              `/dux/${imageName}`,
            ];

            let uploadedImage = null;
            for (const possiblePath of possiblePaths) {
              const fullPath = path.join(process.cwd(), 'public', possiblePath);
              if (fs.existsSync(fullPath)) {
                uploadedImage = await uploadImageToSanity(fullPath, path.basename(possiblePath));
                break;
              }
            }

            if (uploadedImage) {
              updatedVariants.push({
                ...variant,
                image: uploadedImage
              });
              needsUpdate = true;
            } else {
              console.log(`   ⚠️  Could not find real image for variant: ${variant.name}`);
              updatedVariants.push(variant);
            }
          } else {
            updatedVariants.push(variant);
          }
        }
        updatedProduct.variants = updatedVariants;
      }

      // Check lifestyle images
      if (product.lifestyleImages) {
        const updatedLifestyleImages = [];
        for (const lifestyleImage of product.lifestyleImages) {
          if (lifestyleImage.asset?.url && lifestyleImage.asset.url.includes('placeholder-for-')) {
            console.log(`   🏞️  Lifestyle image is placeholder: ${lifestyleImage.asset.url}`);
            
            // Try to find and upload the real image
            const imageName = lifestyleImage.asset.url.replace('https://placeholder-for-', '');
            const possiblePaths = [
              `/dux/${product.name}/lifestyle/${imageName}`,
              `/dux/${product.slug?.current}/lifestyle/${imageName}`,
              `/dux/${product.name}/${imageName}`,
              `/dux/${imageName}`,
            ];

            let uploadedImage = null;
            for (const possiblePath of possiblePaths) {
              const fullPath = path.join(process.cwd(), 'public', possiblePath);
              if (fs.existsSync(fullPath)) {
                uploadedImage = await uploadImageToSanity(fullPath, path.basename(possiblePath));
                break;
              }
            }

            if (uploadedImage) {
              updatedLifestyleImages.push(uploadedImage);
              needsUpdate = true;
            } else {
              console.log(`   ⚠️  Could not find real lifestyle image`);
              updatedLifestyleImages.push(lifestyleImage);
            }
          } else {
            updatedLifestyleImages.push(lifestyleImage);
          }
        }
        updatedProduct.lifestyleImages = updatedLifestyleImages;
      }

      // Update the product if needed
      if (needsUpdate) {
        console.log(`   💾 Updating product: ${product.name}`);
        const updateData = {};
        
        if (updatedProduct.variants !== product.variants) {
          updateData.variants = updatedProduct.variants;
        }
        
        if (updatedProduct.lifestyleImages !== product.lifestyleImages) {
          updateData.lifestyleImages = updatedProduct.lifestyleImages;
        }

        if (Object.keys(updateData).length > 0) {
          await client.patch(product._id).set(updateData).commit();
          console.log(`   ✅ Updated successfully!`);
        }
      } else {
        console.log(`   ✅ No placeholder images found`);
      }
    }

    console.log('\n🎉 All DUX placeholder images have been processed!');

  } catch (error) {
    console.error('❌ Error fixing DUX placeholder images:', error);
  }
}

fixAllDuxPlaceholderImages();
