require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Extended mapping of Sanity product slugs to actual folder names
const folderMapping = {
  'dont-leave-me-dlm-side-table': 'Don`t-leave me-DLM-side-table ',
  'dont-leave-me-xl-dlm-side-table': 'Don`t-leave-me XL–DLM-side-table',
  'kofi-coffee-table-6060': 'Kofi-coffee-table-60×60',
  'kofi-coffee-table-100100': 'Kofi-coffee-table-100×100',
  'kofi-coffee-table-14050': 'Kofi-coffee-table-140×50',
  'kofi-coffee-table-8080': 'Kofi-coffee-table-80×80',
  'neu-table-high': 'Neu-table-high',
  'neu-table-low': 'Neu-table-low',
  'palisade-bar-stool': 'Palisade-Bar-Stool',
  'palisade-chair': 'Palisade-Chair',
  'palissade-armchair': 'Palissade-Armchair',
  'palissade-bench-l120': 'Palissade-Bench-L-120',
  'palissade-cone-table-60': 'Palissade-Cone-Table-Ø-60',
  'palissade-cone-table-70': 'Palissade-Cone-Table-Ø-70',
  'palissade-cone-table-6565': 'Palissade-Cone-Table-65×65',
  'palissade-dining-chair': 'Palissade-Dining-Chair',
  'palissade-lounge-chair': 'Palissade-Lounge-Chair',
  'palissade-low-table': 'Palissade-Low-Table',
  'palissade-chaise-longue': 'Palissade-Chaise-longue',
  'palisade-dining-bench': 'Palisade-Dining-Bench',
  'palisade-dining-bench-armrest': 'Palisade-Dining-Bench-Armrest',
  'palisade-middle-leg': 'Palisade-Middle-leg',
  'palisade-dining-table-90170': 'Palisade-dining-table-90×170',
  'slit-coffee-table-65': 'Slit-coffee-table-Ø-65',
  // Add more mappings as needed
};

async function uploadImageToSanity(imagePath, filename) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image not found: ${imagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });

    console.log(`✅ Uploaded: ${filename}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function fixRemainingHayImages() {
  console.log('🔄 Starting remaining HAY images upload to Sanity...\n');

  try {
    // Get all HAY products from Sanity
    const hayProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug,
      image,
      variants
    }`);

    console.log(`Found ${hayProducts.length} HAY products in Sanity\n`);

    // Filter products that don't have images
    const productsWithoutImages = hayProducts.filter(product => !product.image?.asset);
    console.log(`Products without main images: ${productsWithoutImages.length}\n`);

    let productsUpdated = 0;
    let totalImagesUploaded = 0;

    // First, let's see what folders we actually have
    const hayFolderPath = path.join(process.cwd(), 'public', 'HAY');
    const availableFolders = fs.readdirSync(hayFolderPath).filter(item => {
      const itemPath = path.join(hayFolderPath, item);
      return fs.statSync(itemPath).isDirectory();
    });

    console.log('📁 Available HAY folders:');
    availableFolders.forEach(folder => console.log(`   - ${folder}`));
    console.log('');

    // Process all products, prioritizing those without images
    for (const product of hayProducts) {
      if (!product.slug?.current) {
        console.log(`⚠️  Skipping product without slug: ${product.name}`);
        continue;
      }

      const slug = product.slug.current;
      let folderName = folderMapping[slug];

      // If no mapping found, try to find a matching folder
      if (!folderName) {
        // Try to find a folder that matches the product name
        const productNameLower = product.name.toLowerCase();
        const matchingFolder = availableFolders.find(folder => {
          const folderLower = folder.toLowerCase();
          return folderLower.includes(productNameLower.split(' ')[0]) || 
                 productNameLower.includes(folderLower.split('-')[0]);
        });
        
        if (matchingFolder) {
          folderName = matchingFolder;
          console.log(`🔍 Found matching folder for ${product.name}: ${folderName}`);
        }
      }

      if (!folderName) {
        console.log(`⚠️  No folder mapping found for: ${product.name} (${slug})`);
        continue;
      }

      console.log(`🔄 Processing: ${product.name}`);
      console.log(`   Slug: ${slug}`);
      console.log(`   Folder: ${folderName}`);

      const folderPath = path.join(process.cwd(), 'public', 'HAY', folderName);

      if (!fs.existsSync(folderPath)) {
        console.log(`⚠️  Folder not found: ${folderPath}`);
        continue;
      }

      // Get all image files in the folder
      const files = fs.readdirSync(folderPath).filter(file => 
        file.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/) && !file.startsWith('.')
      );

      if (files.length === 0) {
        console.log(`⚠️  No images found in folder: ${folderPath}`);
        continue;
      }

      console.log(`   Found ${files.length} images`);

      // Upload main product image if missing
      if (!product.image?.asset && files.length > 0) {
        const mainImagePath = path.join(folderPath, files[0]);
        const mainImage = await uploadImageToSanity(mainImagePath, files[0]);
        
        if (mainImage) {
          await client.patch(product._id).set({ image: mainImage }).commit();
          console.log(`   ✅ Set main image: ${files[0]}`);
          totalImagesUploaded++;
          productsUpdated++;
        }
      }

      // Create variants from remaining images if no variants exist
      if ((!product.variants || product.variants.length === 0) && files.length > 1) {
        const variantImages = files.slice(1); // Skip first image (used as main)
        const variants = [];

        for (let i = 0; i < variantImages.length; i++) {
          const file = variantImages[i];
          const imagePath = path.join(folderPath, file);
          
          // Extract color/variant name from filename
          let variantName = file
            .replace(/\.(jpg|jpeg|png|webp)$/i, '')
            .replace(/.*Color\s*-\s*/i, '')
            .replace(/.*Farge\s*-\s*/i, '')
            .replace(/kr\s*\d+.*$/i, '')
            .replace(/.*-\s*/i, '')
            .trim();

          if (!variantName || variantName === file) {
            variantName = `Variant ${i + 1}`;
          }

          const variantImage = await uploadImageToSanity(imagePath, file);
          
          if (variantImage) {
            variants.push({
              _key: `variant-${i}`,
              name: variantName,
              image: variantImage,
              price: product.price || 0,
            });
            totalImagesUploaded++;
            console.log(`   ✅ Created variant: ${variantName}`);
          }
        }

        // Update product with variants
        if (variants.length > 0) {
          await client.patch(product._id).set({ variants }).commit();
          console.log(`   ✅ Updated ${variants.length} variants`);
        }
      }

      console.log(''); // Empty line for readability
    }

    console.log('🎉 Remaining HAY images upload completed!');
    console.log('📊 Summary:');
    console.log(`   - Products updated: ${productsUpdated}`);
    console.log(`   - Total images uploaded: ${totalImagesUploaded}`);
    console.log(`   - Total HAY products in Sanity: ${hayProducts.length}`);
    console.log(`   - Products still without images: ${hayProducts.filter(p => !p.image?.asset).length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixRemainingHayImages();
