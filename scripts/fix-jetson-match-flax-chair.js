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

async function fixJetsonMatchFlaxChair() {
  console.log('🔧 Fixing Jetson Match Flax Chair...\n');

  try {
    // Get the product
    const product = await client.fetch(`
      *[_type == "product" && slug.current == "jetson-match-flax-chair" && brand == "DUX"][0] {
        _id,
        name,
        variants[] {
          _key,
          name,
          image
        }
      }
    `);

    if (!product) {
      console.log('❌ Jetson Match Flax Chair not found');
      return;
    }

    console.log(`✅ Found product: ${product.name}`);

    // Try to find and upload main image
    console.log('\n📤 Looking for main image...');
    const possibleMainImagePaths = [
      '/dux/Jetson Match Flax Chair/main.jpg',
      '/dux/Jetson Match Flax Chair/Jetson Match Flax Chair.jpg',
      '/dux/jetson-match-flax-chair/main.jpg',
      '/dux/Jetson Match Flax 21/Jetson Match Flax 21 DUX NOK  27,990  Color -  Flax 21.jpg'
    ];

    let mainImage = null;
    for (const imagePath of possibleMainImagePaths) {
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      if (fs.existsSync(fullPath)) {
        mainImage = await uploadImageToSanity(fullPath, 'jetson-match-flax-chair-main.jpg');
        break;
      }
    }

    // Add comprehensive features and specifications
    const features = [
      "Made to order - Expected delivery time approximately 8 weeks",
      "Designed by DUX Design Team",
      "Classic lounge chair with modern aesthetics",
      "Available in premium fabric finishes",
      "Ergonomic design for optimal comfort",
      "Durable steel frame construction",
      "High-quality upholstery materials",
      "Contemporary Scandinavian design",
      "Professional assembly recommended"
    ];

    const specifications = [
      { label: "Designer", value: "DUX Design Team" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Frame Material", value: "Steel frame" },
      { label: "Upholstery", value: "Premium fabric" },
      { label: "Available Colors", value: "Flax 21, and other fabric options" },
      { label: "Comfort", value: "Ergonomic design" },
      { label: "Delivery Time", value: "Approximately 8 weeks (Made to order)" },
      { label: "Assembly", value: "Professional assembly recommended" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Care Instructions", value: "Professional cleaning recommended" },
      { label: "Origin", value: "Scandinavian design" },
      { label: "Category", value: "Lounge Chair" },
      { label: "Collection", value: "Jetson Series" },
      { label: "Design Philosophy", value: "Modern comfort meets classic aesthetics" }
    ];

    // Update the product
    console.log('\n💾 Updating product...');
    const updateData = {
      features: features,
      specifications: specifications,
      designer: "DUX Design Team"
    };

    if (mainImage) {
      updateData.image = mainImage;
    }

    await client.patch(product._id).set(updateData).commit();
    
    console.log('✅ Jetson Match Flax Chair updated successfully!');
    console.log(`   📝 Added ${features.length} features`);
    console.log(`   📊 Added ${specifications.length} specifications`);
    if (mainImage) {
      console.log('   🖼️  Added main image');
    }

  } catch (error) {
    console.error('❌ Error fixing Jetson Match Flax Chair:', error);
  }
}

fixJetsonMatchFlaxChair();
