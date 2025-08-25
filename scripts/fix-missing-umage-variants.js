require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

function generateKey() {
  return uuidv4().replace(/-/g, '').substring(0, 12);
}

// Helper function to extract variant info from filename
function extractVariantInfo(filename) {
  const cleanName = filename.replace(/umage_packshot_|umage_lifestyle_|\d+c?\d*-?\d*_?/g, '');
  const parts = cleanName.split('_');
  
  let material = '';
  let color = '';
  
  // Common material patterns
  if (cleanName.includes('black-oak') || cleanName.includes('black_oak')) {
    material = 'Black Oak';
  } else if (cleanName.includes('dark-oak') || cleanName.includes('dark_oak')) {
    material = 'Dark Oak';
  } else if (cleanName.includes('walnut')) {
    material = 'Walnut';
  } else if (cleanName.includes('oak')) {
    material = 'Oak';
  } else if (cleanName.includes('brass')) {
    material = 'Brass';
  } else if (cleanName.includes('steel')) {
    material = 'Steel';
  } else if (cleanName.includes('travertine')) {
    material = 'Travertine';
  } else if (cleanName.includes('glass')) {
    material = 'Glass';
  }
  
  // Common color patterns
  if (cleanName.includes('sugar-brown') || cleanName.includes('sugar_brown')) {
    color = 'Sugar Brown';
  } else if (cleanName.includes('white-sands') || cleanName.includes('white_sands')) {
    color = 'White Sands';
  } else if (cleanName.includes('morning-meadows') || cleanName.includes('morning_meadows')) {
    color = 'Morning Meadows';
  } else if (cleanName.includes('summer-shine') || cleanName.includes('summer_shine')) {
    color = 'Summer Shine';
  } else if (cleanName.includes('obsidian-black') || cleanName.includes('obsidian_black')) {
    color = 'Obsidian Black';
  } else if (cleanName.includes('cloud-grey') || cleanName.includes('cloud_grey')) {
    color = 'Cloud Grey';
  } else if (cleanName.includes('moss-green') || cleanName.includes('moss_green')) {
    color = 'Moss Green';
  } else if (cleanName.includes('sterling')) {
    color = 'Sterling';
  } else if (cleanName.includes('shadow')) {
    color = 'Shadow';
  } else if (cleanName.includes('hazelnut')) {
    color = 'Hazelnut';
  } else if (cleanName.includes('charcoal')) {
    color = 'Charcoal';
  } else if (cleanName.includes('plated-brass') || cleanName.includes('plated_brass')) {
    color = 'Plated Brass';
  } else if (cleanName.includes('polished-steel') || cleanName.includes('polished_steel')) {
    color = 'Polished Steel';
  } else if (cleanName.includes('black')) {
    color = 'Black';
  } else if (cleanName.includes('beige')) {
    color = 'Beige';
  } else if (cleanName.includes('emperador')) {
    color = 'Brown Emperador';
  }
  
  return { material, color };
}

// Helper function to generate variant name
function generateVariantName(material, color) {
  if (material && color) {
    return `${material} - ${color}`;
  } else if (material) {
    return material;
  } else if (color) {
    return color;
  } else {
    return 'Standard';
  }
}

// Helper function to get base price for product
function getBasePrice(productSlug) {
  const priceMap = {
    'a-conversation-piece-dining-chair': 7499,
    'gather-cafe-table': 8999,
    'heiko-dining-chair': 6999,
    'heart-n-soul-200-dining-table': 19999,
    'heart-n-soul-dining-120': 16999,
    'heart-n-soul-dining-table': 16999,
    'italic-table': 14999,
    'lounge-around-3-seater': 24999
  };
  
  return priceMap[productSlug] || 9999;
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath, filename) {
  try {
    console.log(`    📤 Uploading ${filename}...`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    console.log(`    ✅ Uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`    ❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

// Manual mapping for products that couldn't be found automatically
const manualProductMapping = {
  'A-Conversation-Piece': 'a-conversation-piece-dining-chair',
  'Gather-Café-table': 'gather-cafe-table',
  'Heiko-dinning-chair': 'heiko-dining-chair',
  'Heart\'n\'Soul-200-dining-table-200': 'heart-n-soul-200-dining-table',
  'Heart\'n\'Soul-Dinning table': 'heart-n-soul-dining-table',
  'Heart\'n\'Soul-dinning-120': 'heart-n-soul-dining-120',
  'Italic': 'italic-table',
  'Lounge-Around-3-seter': 'lounge-around-3-seater'
};

// Main function to fix missing Umage products
async function fixMissingUmageVariants() {
  console.log('🚀 Starting fix for missing Umage variants...\n');
  
  const umageDir = path.join(process.cwd(), 'public', 'umage');
  
  if (!fs.existsSync(umageDir)) {
    console.error('❌ Umage directory not found at public/umage');
    return;
  }
  
  // Get all Umage products from Sanity
  const umageProducts = await client.fetch(`*[_type == "product" && brand == "UMAGE"] {
    _id,
    name,
    slug,
    image,
    variants
  }`);
  
  console.log(`📦 Found ${umageProducts.length} UMAGE products in Sanity`);
  
  const productFolders = fs.readdirSync(umageDir).filter(item => {
    const itemPath = path.join(umageDir, item);
    return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
  });
  
  console.log(`📁 Found ${productFolders.length} product folders in public/umage`);
  
  // Focus on the missing products
  const missingProducts = Object.keys(manualProductMapping);
  
  for (const folderName of missingProducts) {
    console.log(`\n🔧 Processing ${folderName}...`);
    
    const productPath = path.join(umageDir, folderName);
    
    if (!fs.existsSync(productPath)) {
      console.log(`  ⚠️  Folder not found: ${folderName}`);
      continue;
    }
    
    const expectedSlug = manualProductMapping[folderName];
    
    // Find matching Sanity product
    const matchingProduct = umageProducts.find(product => {
      const sanitySlug = product.slug?.current;
      return sanitySlug === expectedSlug || 
             sanitySlug === `umage-${expectedSlug}` ||
             sanitySlug?.replace('umage-', '') === expectedSlug;
    });
    
    if (!matchingProduct) {
      console.log(`  ⚠️  No matching Sanity product found for ${folderName} (expected slug: ${expectedSlug})`);
      continue;
    }
    
    console.log(`  ✅ Found matching product: ${matchingProduct.name} (${matchingProduct.slug?.current})`);
    
    // Get all image files in the product folder (excluding lifestyle subfolder)
    const imageFiles = fs.readdirSync(productPath).filter(file => {
      const filePath = path.join(productPath, file);
      return fs.statSync(filePath).isFile() && 
             (file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.png')) &&
             !file.includes('lifestyle');
    });
    
    if (imageFiles.length === 0) {
      console.log(`  ⚠️  No variant images found for ${folderName}`);
      continue;
    }
    
    console.log(`  📸 Found ${imageFiles.length} variant images`);
    
    // Process variants
    const variants = [];
    const processedVariants = new Set();
    
    for (const imageFile of imageFiles) {
      const imagePath = path.join(productPath, imageFile);
      const variantInfo = extractVariantInfo(imageFile);
      const variantName = generateVariantName(variantInfo.material, variantInfo.color);
      
      // Skip duplicates
      if (processedVariants.has(variantName)) {
        continue;
      }
      processedVariants.add(variantName);
      
      // Upload image to Sanity
      const assetId = await uploadImageToSanity(imagePath, imageFile);
      
      if (assetId) {
        const basePrice = getBasePrice(expectedSlug);
        // Add small price variation for premium materials
        let variantPrice = basePrice;
        if (variantInfo.material === 'Walnut') variantPrice += 300;
        if (variantInfo.material === 'Dark Oak') variantPrice += 200;
        
        variants.push({
          _key: generateKey(),
          name: variantName,
          material: variantInfo.material || 'Standard',
          color: variantInfo.color || 'Natural',
          price: variantPrice,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId
            }
          }
        });
        
        console.log(`    ✅ Added variant: ${variantName}`);
      }
    }
    
    if (variants.length === 0) {
      console.log(`  ⚠️  No variants created for ${folderName}`);
      continue;
    }
    
    // Update the product with new variants
    try {
      console.log(`  🔄 Updating ${matchingProduct.name} with ${variants.length} variants...`);
      
      await client
        .patch(matchingProduct._id)
        .set({ variants })
        .commit();
        
      console.log(`  ✅ Updated ${variants.length} variants for ${matchingProduct.name}`);
      
    } catch (error) {
      console.error(`  ❌ Error updating ${folderName}:`, error.message);
    }
  }
  
  console.log('\n🎉 Missing Umage variants fix completed!');
}

async function main() {
  console.log('🎯 Starting fix for missing Umage variants...\n');
  
  await fixMissingUmageVariants();
  
  console.log('\n✨ All missing Umage variants have been updated with correct images!');
  console.log('🔍 You can now check the products to see all variants with proper images.');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fixMissingUmageVariants };
