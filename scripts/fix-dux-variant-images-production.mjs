import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

// Image mappings for variants that are showing as placeholders
const variantImageMappings = {
  'jetson-classic-soft-88': {
    'Classic Soft 88 Black': '/dux/Jetson Classic soft 88/classic soft 88 black.jpg',
    'Classic Soft 25 Brown': '/dux/Jetson Classic soft 88/classic soft 25 brown.jpg'
  },
  'jetson-match-flax-21': {
    'Flax 21 with Dakota 88 Black': '/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg',
    'Flax 21 with Dakota 29 Cognac': '/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg',
    'Flax 21 with Dakota 24': '/dux/Jetson-Match-Flax-21/Jetson Match Flax-dakota 24 leather: 21 NOK  27,990.webp'
  },
  'inter-dining-table': {
    'Ø-110 White Laminate': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp',
    'Ø-110 Black Laminate': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 sort laminat.jpg',
    '100×180 White Laminate': '/dux/Inter-dining-table/Inter dining table from DUX NOK  26,440  Variants -  100x180 white laminate.jpg',
    '100×180 Black Laminate': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 26 440  Varianter - 100x180 sort laminat.webp',
    '100×180 White w/2 Insert Panels': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 hvit laminat m:2 illeggsplater.webp',
    '100×180 Black w/2 Insert Panels': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 sort laminat m:2 illeggsplater.webp'
  }
};

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = `public${imagePath}`;
    console.log(`📸 Uploading image: ${imagePath}`);
    
    // Read the file and upload to Sanity
    const fs = await import('fs');
    const imageBuffer = fs.readFileSync(fullPath);
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: imagePath.split('/').pop()
    });
    
    console.log(`✅ Image uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

async function fixVariantImages() {
  console.log('🔧 Fixing Dux variant images with placeholder URLs...');
  
  try {
    // Get all Dux products
    const products = await client.fetch(`
      *[_type == "product" && "dux" in categories[]->slug.current] {
        _id,
        name,
        slug,
        variants[] {
          _key,
          name,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);

    for (const product of products) {
      const productSlug = product.slug.current;
      const mappings = variantImageMappings[productSlug];
      
      if (!mappings) {
        console.log(`ℹ️ No mappings for ${product.name}, skipping...`);
        continue;
      }

      console.log(`\n📦 Processing variants for: ${product.name}`);
      
      for (const variant of product.variants || []) {
        const variantName = variant.name;
        const imagePath = mappings[variantName];
        
        if (!imagePath) {
          console.log(`  ⚠️ No mapping for variant: ${variantName}`);
          continue;
        }

        // Check if variant already has a proper Sanity image
        if (variant.image?.asset?.url && variant.image.asset.url.includes('cdn.sanity.io')) {
          console.log(`  ✅ Variant "${variantName}" already has Sanity image`);
          continue;
        }

        console.log(`  🔧 Fixing variant: ${variantName}`);
        
        // Upload the image
        const assetId = await uploadImageToSanity(imagePath);
        
        if (assetId) {
          // Update the variant with the new image
          await client
            .patch(product._id)
            .set({
              [`variants[_key=="${variant._key}"].image`]: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: assetId
                }
              }
            })
            .commit();
          
          console.log(`  ✅ Updated variant "${variantName}" with new image`);
        }
      }
    }
    
    console.log('\n🎉 Dux variant image fix completed!');
    
  } catch (error) {
    console.error('❌ Error fixing variant images:', error);
    process.exit(1);
  }
}

fixVariantImages();
