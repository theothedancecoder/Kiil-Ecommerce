const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-13',
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your .env.local
  useCdn: false,
});

async function uploadImageAndCreateHomepage() {
  try {
    console.log('🚀 Starting homepage content creation...');
    
    // First, upload the hero image to Sanity
    const imagePath = path.join(__dirname, '../public/living-room-collection.jpg');
    
    if (!fs.existsSync(imagePath)) {
      console.error('❌ Hero image not found at:', imagePath);
      console.log('Please make sure the image exists at public/living-room-collection.jpg');
      return;
    }
    
    console.log('📸 Uploading hero image...');
    const imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
      filename: 'living-room-collection.jpg',
    });
    
    console.log('✅ Image uploaded successfully:', imageAsset._id);
    
    // Create the homepage document
    console.log('📝 Creating homepage document...');
    const homepageDoc = {
      _type: 'homepage',
      title: 'Homepage',
      heroSection: {
        mainHeading: 'Timeless Design',
        subHeading: 'for Modern Living',
        description: 'Discover our curated collection of sophisticated furniture and home accessories, thoughtfully designed to create spaces that inspire and endure.',
        heroImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
          alt: 'Elegant living room with sophisticated furniture',
        },
      },
    };
    
    const result = await client.create(homepageDoc);
    console.log('✅ Homepage document created successfully:', result._id);
    
    console.log('🎉 Homepage content setup complete!');
    console.log('You can now visit your homepage to see the image loading from Sanity.');
    
  } catch (error) {
    console.error('❌ Error creating homepage content:', error);
    
    if (error.message.includes('Insufficient permissions')) {
      console.log('\n💡 To fix this, you need to:');
      console.log('1. Go to https://sanity.io/manage');
      console.log('2. Select your project');
      console.log('3. Go to API > Tokens');
      console.log('4. Create a new token with Editor permissions');
      console.log('5. Add it to your .env.local file as SANITY_API_TOKEN=your_token_here');
    }
  }
}

// Check if we have the required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.error('❌ Missing required environment variables:');
  console.log('Please make sure you have NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in your .env.local file');
  process.exit(1);
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ Missing SANITY_API_TOKEN in your .env.local file');
  console.log('You need to create an API token with Editor permissions from https://sanity.io/manage');
  process.exit(1);
}

uploadImageAndCreateHomepage();
