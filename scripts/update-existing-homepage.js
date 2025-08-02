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

async function updateExistingHomepage() {
  console.log('🔄 Updating existing homepage document with extended content...\n');

  try {
    // Get the existing document
    const existingDoc = await client.fetch('*[_type == "homepage"][0]');
    if (!existingDoc) {
      console.error('❌ No existing homepage document found');
      return;
    }

    console.log(`📄 Found existing document: ${existingDoc._id}`);

    // Upload additional images if they don't exist
    console.log('📸 Uploading additional images...');
    
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

    console.log('\n🔄 Updating existing document...');

    // Update the existing document with new fields
    const updatedDoc = {
      ...existingDoc,
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

    const result = await client.createOrReplace(updatedDoc);
    console.log(`✅ Homepage document updated: ${result._id}`);

    // Delete the duplicate document
    console.log('\n🗑️  Cleaning up duplicate document...');
    try {
      await client.delete('homepage-main');
      console.log('✅ Duplicate document removed');
    } catch (error) {
      console.log('ℹ️  No duplicate document to remove');
    }

    console.log('\n🎉 Homepage update complete!');
    console.log('\n📋 Summary:');
    console.log(`   - Site Logo: ${logoImageId ? '✅ Added' : '❌ Failed'}`);
    console.log(`   - Category Images: ${[livingRoomImageId, diningImageId, outdoorImageId].filter(Boolean).length}/3 added`);
    console.log(`   - Brand Logos: ${[montanaLogoId, umageLogoId].filter(Boolean).length}/2 added`);
    console.log(`   - Homepage Document: ✅ Updated`);

  } catch (error) {
    console.error('❌ Error updating homepage:', error);
    process.exit(1);
  }
}

updateExistingHomepage();
