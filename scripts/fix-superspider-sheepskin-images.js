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

async function fixSuperspiderSheepskinImages() {
  console.log('🔧 Fixing Superspider Sheepskin images...\n');

  try {
    // First, get the current product
    const product = await client.fetch(`
      *[_type == "product" && slug.current == "superspider-sheepskin" && brand == "DUX"][0] {
        _id,
        name,
        variants[] {
          _key,
          name,
          color,
          image
        }
      }
    `);

    if (!product) {
      console.log('❌ Superspider Sheepskin product not found');
      return;
    }

    console.log(`✅ Found product: ${product.name}`);
    console.log(`📋 Product ID: ${product._id}`);

    // Define the image mappings based on the original hardcoded data
    const imageMap = {
      'Scandinavian Grey 22 Sheepskin': '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg',
      'Black 01 Sheepskin': '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg',
      'Off-white 02 Sheepskin': '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg',
      'Cork 19 Sheepskin': '/dux/Superspider sheepskin /Superspider fåreskinn DUX kr 53 815  Farge - Cork 19.jpg'
    };

    console.log('\n📤 Uploading variant images...');
    
    const updatedVariants = [];
    
    for (const variant of product.variants) {
      console.log(`\n🎨 Processing variant: ${variant.name}`);
      
      const imagePath = imageMap[variant.name];
      if (imagePath) {
        const fullPath = path.join(process.cwd(), 'public', imagePath);
        const filename = path.basename(imagePath);
        
        const uploadedImage = await uploadImageToSanity(fullPath, filename);
        
        if (uploadedImage) {
          updatedVariants.push({
            ...variant,
            image: uploadedImage
          });
        } else {
          // Keep the variant but without updating the image
          updatedVariants.push(variant);
        }
      } else {
        console.log(`   ⚠️  No image mapping found for: ${variant.name}`);
        updatedVariants.push(variant);
      }
    }

    // Upload main product image
    console.log('\n📤 Uploading main product image...');
    const mainImagePath = path.join(process.cwd(), 'public/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg');
    const mainImage = await uploadImageToSanity(mainImagePath, 'superspider-sheepskin-main.jpg');

    // Update the product with new images
    console.log('\n💾 Updating product in Sanity...');
    
    const updateData = {
      variants: updatedVariants
    };
    
    if (mainImage) {
      updateData.image = mainImage;
    }

    await client.patch(product._id).set(updateData).commit();
    
    console.log('✅ Product updated successfully!');
    
    // Add features and specifications
    console.log('\n📝 Adding missing features and specifications...');
    
    const features = [
      "Made to order - Expected delivery time approximately 8 weeks",
      "Designed by DUX Design Team in 1987",
      "Classic design combining first-class material selection with modern aesthetics",
      "Available in several colors and different materials (fabric, leather, sheepskin)",
      "Seat and backrest constructed with tubular steel frame",
      "Pirelli strap support system for enhanced comfort",
      "Filled with polyester and fiberfill for optimal comfort",
      "Chrome-plated frame for durability and style",
      "Leather neck cushion included with fabric cover versions"
    ];

    const specifications = [
      { label: "Designer", value: "DUX Design Team" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Design Year", value: "1987" },
      { label: "Width", value: "75 cm" },
      { label: "Height", value: "86 cm" },
      { label: "Seat Height", value: "38 cm" },
      { label: "Depth", value: "149 cm" },
      { label: "Weight", value: "20 kg" },
      { label: "Frame Material", value: "Tubular steel, chrome-plated" },
      { label: "Support System", value: "Pirelli strap for enhanced support" },
      { label: "Filling", value: "Polyester and fiberfill" },
      { label: "Available Materials", value: "Fabric, Leather, Sheepskin" },
      { label: "Available Colors", value: "Black 01, Cork 19, Drake 20, Mohawi 21, Off-white 02, Scandinavian Gray 22" },
      { label: "Style", value: "Modern classic design" },
      { label: "Delivery Time", value: "Approximately 8 weeks (Made to order)" }
    ];

    await client.patch(product._id).set({
      features: features,
      specifications: specifications,
      designer: "DUX Design Team"
    }).commit();

    console.log('✅ Features and specifications added!');
    console.log('\n🎉 Superspider Sheepskin fix complete!');

  } catch (error) {
    console.error('❌ Error fixing Superspider Sheepskin images:', error);
  }
}

fixSuperspiderSheepskinImages();
