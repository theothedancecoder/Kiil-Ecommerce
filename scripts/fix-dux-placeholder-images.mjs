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

async function fixPlaceholderImages() {
  console.log('🔧 Fixing placeholder image URLs in Sanity...');
  
  try {
    // Get all assets with placeholder URLs
    const placeholderAssets = await client.fetch(`
      *[_type == "sanity.imageAsset" && url match "placeholder-for-*"] {
        _id,
        url,
        originalFilename
      }
    `);

    console.log(`📊 Found ${placeholderAssets.length} placeholder assets to fix`);

    for (const asset of placeholderAssets) {
      console.log(`🔧 Fixing asset: ${asset._id}`);
      console.log(`   Current URL: ${asset.url}`);
      
      // Extract the original filename from the placeholder URL
      const filename = asset.url.replace('https://placeholder-for-', '');
      console.log(`   Target filename: ${filename}`);
      
      // Find the corresponding real image file
      let imagePath = null;
      
      // Map common filenames to their actual paths
      const filenameMappings = {
        'classic soft 88 black.jpg': '/dux/Jetson Classic soft 88/classic soft 88 black.jpg',
        'classic soft 25 brown.jpg': '/dux/Jetson Classic soft 88/classic soft 25 brown.jpg',
        'Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg': '/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg',
        'Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg': '/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg',
        'Jetson Match Flax-dakota 24 leather: 21 NOK  27,990.webp': '/dux/Jetson-Match-Flax-21/Jetson Match Flax-dakota 24 leather: 21 NOK  27,990.webp',
        'Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp',
        'Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 sort laminat.jpg': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 sort laminat.jpg',
        'Inter spisebord fra DUX kr 26 440  Varianter - 100x180 sort laminat.webp': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 26 440  Varianter - 100x180 sort laminat.webp',
        'Inter spisebord fra DUX kr 45 990  Varianter - 100x180 hvit laminat m:2 illeggsplater.webp': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 hvit laminat m:2 illeggsplater.webp',
        'Inter spisebord fra DUX kr 45 990  Varianter - 100x180 sort laminat m:2 illeggsplater.webp': '/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 sort laminat m:2 illeggsplater.webp',
        'inter3.webp': '/dux/Inter-dining-table/lifestyle/inter3.webp',
        'furniture-easy-chair-jetson-black-dakota-88-pie-1-2-scaled.jpg.avif': '/dux/Jetson Classic soft 88/lifestyle/furniture-easy-chair-jetson-black-dakota-88-pie-1-2-scaled.jpg.avif'
      };
      
      imagePath = filenameMappings[filename];
      
      if (!imagePath) {
        console.log(`   ⚠️ No mapping found for: ${filename}`);
        continue;
      }
      
      try {
        // Upload the correct image
        const fs = await import('fs');
        const fullPath = `public${imagePath}`;
        
        if (!fs.existsSync(fullPath)) {
          console.log(`   ❌ File not found: ${fullPath}`);
          continue;
        }
        
        console.log(`   📸 Uploading correct image: ${imagePath}`);
        const imageBuffer = fs.readFileSync(fullPath);
        
        const newAsset = await client.assets.upload('image', imageBuffer, {
          filename: filename
        });
        
        console.log(`   ✅ New asset created: ${newAsset._id}`);
        console.log(`   🔗 New URL: ${newAsset.url}`);
        
        // Update all references to the old asset to point to the new asset
        const referencingDocs = await client.fetch(`
          *[references($oldAssetId)] {
            _id,
            _type
          }
        `, { oldAssetId: asset._id });
        
        console.log(`   📝 Found ${referencingDocs.length} documents referencing this asset`);
        
        for (const doc of referencingDocs) {
          // Get the full document to update references
          const fullDoc = await client.getDocument(doc._id);
          
          // Replace asset references recursively
          const updatedDoc = replaceAssetReferences(fullDoc, asset._id, newAsset._id);
          
          await client.createOrReplace(updatedDoc);
          console.log(`   ✅ Updated document: ${doc._id} (${doc._type})`);
        }
        
        // Delete the old placeholder asset
        await client.delete(asset._id);
        console.log(`   🗑️ Deleted placeholder asset: ${asset._id}`);
        
      } catch (error) {
        console.error(`   ❌ Error processing ${filename}:`, error.message);
      }
    }
    
    console.log('\n🎉 Placeholder image fix completed!');
    
  } catch (error) {
    console.error('❌ Error fixing placeholder images:', error);
    process.exit(1);
  }
}

function replaceAssetReferences(obj, oldAssetId, newAssetId) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => replaceAssetReferences(item, oldAssetId, newAssetId));
  }
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === '_ref' && value === oldAssetId) {
      result[key] = newAssetId;
    } else if (typeof value === 'object') {
      result[key] = replaceAssetReferences(value, oldAssetId, newAssetId);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

fixPlaceholderImages();
