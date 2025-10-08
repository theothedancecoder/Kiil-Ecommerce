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

// Helper to upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`   ⚠️  Image not found: ${imagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    console.log(`   ✅ Uploaded: ${path.basename(imagePath)}`);
    return asset;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function fixMontanaBureauDesk() {
  try {
    console.log('🔧 Fixing Montana Bureau Desk images...\n');

    // Check if product exists in Sanity
    let product = await client.fetch(
      `*[_type == "product" && slug.current == "bureau-desk" && brand == "Montana"][0]`
    );

    const bureauDir = 'public/Montana/BUREAU';
    
    if (!fs.existsSync(bureauDir)) {
      console.log(`❌ Directory not found: ${bureauDir}`);
      return;
    }

    // Get all variant images
    const variantImages = [
      'Montana_Selection_BUREAU_Desk_NewWhite_Suspended_Perspective.png',
      'Montana_Selection_BUREAU_Desk_Nordic_Suspended_Perspective.png',
      'Montana_Selection_BUREAU_Desk_Vanilla_Suspended_Perspective.png',
      'Montana_Selection_BUREAU_Desk_Monarch_Suspended_Perspective.png',
      'Montana_Selection_BUREAU_Desk_Anthracite_Suspended_Perspective.png',
      'Montana_Selection_BUREAU_Desk_Mushroom_Suspended_Perspective.png'
    ];

    const variantNames = ['New White', 'Nordic', 'Vanilla', 'Monarch', 'Anthracite', 'Mushroom'];
    const prices = [15817, 15817, 15817, 15817, 15817, 15817];

    console.log('📸 Uploading variant images...\n');
    
    const uploadedVariants = [];
    for (let i = 0; i < variantImages.length; i++) {
      const imagePath = path.join(bureauDir, variantImages[i]);
      const asset = await uploadImageToSanity(imagePath);
      
      if (asset) {
        uploadedVariants.push({
          _type: 'variant',
          _key: `variant-${i}`,
          name: variantNames[i],
          color: variantNames[i],
          price: prices[i],
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          }
        });
      }
    }

    // Upload lifestyle images
    console.log('\n📸 Uploading lifestyle images...\n');
    const lifestyleDir = 'public/Montana/Selection';
    const lifestyleImages = [
      'Montana_Home21_22_BUREAU_Flint_01_H-scaled.jpg',
      'Montana_Home21_22_BUREAU_Flint_Detail_H-scaled.jpg'
    ];

    const uploadedLifestyleImages = [];
    for (const img of lifestyleImages) {
      const imagePath = path.join(lifestyleDir, img);
      const asset = await uploadImageToSanity(imagePath);
      
      if (asset) {
        uploadedLifestyleImages.push({
          _type: 'image',
          _key: `lifestyle-${uploadedLifestyleImages.length}`,
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        });
      }
    }

    // Create or update the product
    if (!product) {
      console.log('\n➕ Creating Bureau Desk product in Sanity...\n');
      
      // Get or create Furniture category
      let category = await client.fetch(
        `*[_type == "category" && title == "Furniture"][0]`
      );

      if (!category) {
        category = await client.create({
          _type: 'category',
          title: 'Furniture',
          slug: { _type: 'slug', current: 'furniture' }
        });
        console.log(`✅ Created Furniture category: ${category._id}`);
      }

      product = await client.create({
        _type: 'product',
        name: 'Bureau Desk',
        slug: {
          _type: 'slug',
          current: 'bureau-desk'
        },
        brand: 'Montana',
        description: 'BUREAU is a small desk that integrates elegantly into the home office, living room and bedroom. BUREAU has two large shelves that can be completely removed from the module, giving a good overview of the contents. In addition to the shelves, BUREAU has a shelf and a cabinet under the countertop. BUREAU is only available as a wall-mounted module. The module comes with a desk mat.',
        price: 15817,
        designer: 'Petter J. Lassen',
        image: uploadedVariants[3]?.image || uploadedVariants[0]?.image, // Use Monarch as main
        variants: uploadedVariants,
        lifestyleImages: uploadedLifestyleImages,
        categories: [
          {
            _type: 'reference',
            _ref: category._id,
            _key: `category-${Date.now()}`
          }
        ],
        inStock: true,
        stock: 10,
        features: [
          'Two large removable shelves for easy organization',
          'Additional shelf and cabinet under countertop',
          'Wall-mounted design saves floor space',
          'Integrates elegantly into any room',
          'Available in Selection colors (4-week delivery)',
          'Custom colors available upon request',
          'Includes desk mat for premium finish',
          'Premium lacquered finish for durability',
          'Designed by Petter J. Lassen',
          'Made in Denmark with sustainable materials'
        ],
        specifications: [
          { label: 'Designer', value: 'Petter J. Lassen' },
          { label: 'Manufacturer', value: 'Montana' },
          { label: 'Material', value: 'Lacquered MDF' },
          { label: 'Dimensions', value: 'W 93.7 x H 36.6 x D 38 cm' },
          { label: 'Weight', value: '25 kg' },
          { label: 'Installation', value: 'Wall-mounted' },
          { label: 'Finish Options', value: 'New White, Nordic, Vanilla, Monarch, Anthracite, Mushroom' },
          { label: 'Includes', value: 'Desk mat' },
          { label: 'Delivery Time', value: '8 weeks (made to order)' },
          { label: 'Care', value: 'Clean with damp cloth' },
          { label: 'Warranty', value: '5 years structural warranty' },
          { label: 'Origin', value: 'Made in Denmark' }
        ]
      });

      console.log(`✅ Created Bureau Desk product: ${product._id}`);
    } else {
      console.log('\n🔄 Updating existing Bureau Desk product...\n');
      
      await client
        .patch(product._id)
        .set({
          image: uploadedVariants[3]?.image || uploadedVariants[0]?.image,
          variants: uploadedVariants,
          lifestyleImages: uploadedLifestyleImages
        })
        .commit();

      console.log(`✅ Updated Bureau Desk product: ${product._id}`);
    }

    console.log(`\n📊 Summary:`);
    console.log(`   - Uploaded ${uploadedVariants.length} variant images`);
    console.log(`   - Uploaded ${uploadedLifestyleImages.length} lifestyle images`);
    console.log(`   - Product ${product ? 'updated' : 'created'} in Sanity`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

fixMontanaBureauDesk()
  .then(() => {
    console.log('\n✅ Montana Bureau Desk images fixed!');
    console.log('\nNext: Update the bureau-desk page to use Sanity data instead of static images.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });
