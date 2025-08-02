const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function uploadImageAsset(imagePath, filename) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    console.log(`✅ Uploaded ${filename}: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function createExtendedHomepageContent() {
  console.log('🚀 Creating extended homepage content in Sanity...\n');

  try {
    // Upload images
    console.log('📸 Uploading images...');
    
    const heroImageId = await uploadImageAsset(
      path.join(process.cwd(), 'public', 'living-room-collection.jpg'),
      'living-room-collection.jpg'
    );

    const logoImageId = await uploadImageAsset(
      path.join(process.cwd(), 'public', 'kiil-black-square-bla.png'),
      'kiil-black-square-bla.png'
    );

    const livingRoomImageId = await uploadImageAsset(
      path.join(process.cwd(), 'public', 'living-room.jpg'),
      'living-room.jpg'
    );

    const diningImageId = await uploadImageAsset(
      path.join(process.cwd(), 'public', 'dining-collection.webp'),
      'dining-collection.webp'
    );

    const outdoorImageId = await uploadImageAsset(
      path.join(process.cwd(), 'public', 'outdoor-collection.jpg'),
      'outdoor-collection.jpg'
    );

    const montanaLogoId = await uploadImageAsset(
      path.join(process.cwd(), 'public', 'our-collection', 'Montana Logo Svart.png'),
      'Montana Logo Svart.png'
    );

    const umageLogoId = await uploadImageAsset(
      path.join(process.cwd(), 'public', 'our-collection', 'UMAGE_logo_black.png'),
      'UMAGE_logo_black.png'
    );

    console.log('\n📝 Creating homepage document...');

    // Create or update homepage document
    const homepageDoc = {
      _type: 'homepage',
      _id: 'homepage-main',
      title: 'Homepage',
      siteSettings: {
        logo: logoImageId ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: logoImageId,
          },
          alt: 'KIIL',
        } : undefined,
      },
      heroSection: {
        mainHeading: 'Timeless Design',
        subHeading: 'for Modern Living',
        description: 'Discover our curated collection of sophisticated furniture and home accessories, thoughtfully designed to create spaces that inspire and endure.',
        heroImage: heroImageId ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: heroImageId,
          },
          alt: 'Elegant living room with sophisticated furniture',
        } : undefined,
      },
      categorySection: {
        title: 'Shop by Category',
        description: 'From statement furniture to refined accessories, find everything you need to create your perfect space.',
        categories: [
          livingRoomImageId ? {
            title: 'Living Room',
            description: 'Sophisticated seating & tables',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: livingRoomImageId,
              },
              alt: 'Living Room Collection',
            },
            link: '/interior/living-room',
          } : null,
          diningImageId ? {
            title: 'Dining',
            description: 'Tables & chairs for gathering',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: diningImageId,
              },
              alt: 'Dining Collection',
            },
            link: '/interior',
          } : null,
          outdoorImageId ? {
            title: 'Outdoor',
            description: 'Garden & patio essentials',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: outdoorImageId,
              },
              alt: 'Outdoor Collection',
            },
            link: '/utendors',
          } : null,
        ].filter(Boolean),
      },
      brandLogos: {
        montanaLogo: montanaLogoId ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: montanaLogoId,
          },
          alt: 'Montana',
        } : undefined,
        umageLogo: umageLogoId ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: umageLogoId,
          },
          alt: 'Umage',
        } : undefined,
      },
    };

    const result = await client.createOrReplace(homepageDoc);
    console.log(`✅ Homepage document created/updated: ${result._id}`);

    console.log('\n🎉 Extended homepage content creation complete!');
    console.log('\n📋 Summary:');
    console.log(`   - Site Logo: ${logoImageId ? '✅ Uploaded' : '❌ Failed'}`);
    console.log(`   - Hero Image: ${heroImageId ? '✅ Uploaded' : '❌ Failed'}`);
    console.log(`   - Category Images: ${[livingRoomImageId, diningImageId, outdoorImageId].filter(Boolean).length}/3 uploaded`);
    console.log(`   - Brand Logos: ${[montanaLogoId, umageLogoId].filter(Boolean).length}/2 uploaded`);
    console.log(`   - Homepage Document: ✅ Created`);

  } catch (error) {
    console.error('❌ Error creating extended homepage content:', error);
    process.exit(1);
  }
}

createExtendedHomepageContent();
