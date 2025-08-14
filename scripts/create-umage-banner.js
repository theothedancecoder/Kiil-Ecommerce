// Load environment variables
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-06-13',
});

async function createUmageBanner() {
  try {
    console.log('🎯 Creating Umage banner in Sanity...');
    
    // Path to the original Umage banner image
    const imagePath = path.join(__dirname, '..', 'public', 'umage', 'Treasures Dresser', 'lifestyle', 'UMAGE_lifestyle_Treasures_dresser_oak_sugar_brown__2_1_1000x.webp');
    
    // Check if the image exists
    if (!fs.existsSync(imagePath)) {
      console.error('❌ Umage banner image not found at:', imagePath);
      console.log('📁 Available files in Treasures Dresser/lifestyle:');
      const lifestylePath = path.join(__dirname, '..', 'public', 'umage', 'Treasures Dresser', 'lifestyle');
      if (fs.existsSync(lifestylePath)) {
        const files = fs.readdirSync(lifestylePath);
        files.forEach(file => console.log(`   - ${file}`));
      }
      return;
    }
    
    console.log('📸 Found image at:', imagePath);
    
    // Upload the image to Sanity
    console.log('⬆️  Uploading image to Sanity...');
    const imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
      filename: 'umage-treasures-dresser-banner.webp',
      contentType: 'image/webp',
    });
    
    console.log('✅ Image uploaded successfully:', imageAsset._id);
    
    // Create the brand banner document
    console.log('📝 Creating brand banner document...');
    const bannerDoc = {
      _type: 'brandBanner',
      brandName: 'UMAGE',
      slug: {
        _type: 'slug',
        current: 'umage'
      },
      bannerImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      },
      title: 'UMAGE',
      subtitle: 'Scandinavian furniture design that brings people together',
      isActive: true
    };
    
    // Check if banner already exists
    const existingBanner = await client.fetch(
      `*[_type == "brandBanner" && slug.current == "umage"][0]`
    );
    
    let result;
    if (existingBanner) {
      console.log('🔄 Updating existing Umage banner...');
      result = await client.patch(existingBanner._id).set(bannerDoc).commit();
    } else {
      console.log('🆕 Creating new Umage banner...');
      result = await client.create(bannerDoc);
    }
    
    console.log('✅ Umage banner created/updated successfully!');
    console.log('📋 Banner details:');
    console.log(`   - ID: ${result._id}`);
    console.log(`   - Brand: ${result.brandName}`);
    console.log(`   - Slug: ${result.slug.current}`);
    console.log(`   - Title: ${result.title}`);
    console.log(`   - Subtitle: ${result.subtitle}`);
    console.log(`   - Image Asset ID: ${imageAsset._id}`);
    console.log(`   - Image URL: ${imageAsset.url}`);
    
    console.log('\n🎉 Umage banner is now ready to use from Sanity!');
    console.log('🔗 You can view it in Sanity Studio under "Brand Banner" documents');
    
  } catch (error) {
    console.error('❌ Error creating Umage banner:', error);
    
    if (error.message.includes('Insufficient permissions')) {
      console.log('\n💡 Make sure your SANITY_API_TOKEN has write permissions');
    }
    
    if (error.message.includes('ENOENT')) {
      console.log('\n💡 The image file was not found. Check the file path.');
    }
  }
}

// Run the script
createUmageBanner();
