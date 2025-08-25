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

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath, filename) {
  try {
    console.log(`    📤 Uploading lifestyle image: ${filename}...`);
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

// Manual mapping for products that need specific folder matching
const productFolderMapping = {
  'a-conversation-piece-dining-chair': 'A-Conversation-Piece',
  'asteria-spotlight': 'Asteria-spotlight',
  'audacious-desk': 'Audacious-desk',
  'chordis': 'Chordis',
  'comfort-circle-dining-table': 'Comfort-Circle-dining-table',
  'duende-desk': 'Duende-desk',
  'gather-cafe-table': 'Gather-Café-table',
  'heart-n-soul-200-dining-table': 'Heart\'n\'Soul-200-dining-table-200',
  'heart-n-soul-console-table': 'Heart\'n\'Soul-console-table',
  'heart-n-soul-dining-table': 'Heart\'n\'Soul-Dinning table',
  'heart-n-soul-dining-120': 'Heart\'n\'Soul-dinning-120',
  'heiko-dining-chair': 'Heiko-dinning-chair',
  'italic-table': 'Italic',
  'lemon-squeeze-ceiling-lamp': 'Lemon-Squeeze-ceiling-lamp',
  'lemon-squeeze-wall-lamp-double': 'Lemon-Squeeze-wall-lamp,double',
  'lemon-squeeze-wall-lamp-single': 'Lemon-Squeeze-wall-lamp,single',
  'lounge-around-3-seater': 'Lounge-Around-3-seter',
  'lounge-around-shuffle-coffee-table': 'Lounge-Around-Shuffle-coffee-table',
  'lounge-around-shuffle-puff': 'Lounge-Around-Shuffle-puff',
  'metal-cover-accessories-asteria': 'Metal-Cover-accessories-for-Asteria',
  'stories-shelving': 'Stories-shelving',
  'the-reader': 'The-Reader',
  'the-socialite-bar-stool': 'The-Socialite-bar-stool',
  'the-socialite-counter-chair': 'The-Socialite-counter-chair',
  'treasures-dresser': 'Treasures Dresser'
};

// Related products mapping - each product gets 2 related products
const relatedProductsMapping = {
  'a-conversation-piece-dining-chair': ['heiko-dining-chair', 'heart-n-soul-200-dining-table'],
  'asteria-spotlight': ['chordis', 'lemon-squeeze-ceiling-lamp'],
  'audacious-desk': ['duende-desk', 'stories-shelving'],
  'chordis': ['asteria-spotlight', 'lemon-squeeze-wall-lamp-single'],
  'comfort-circle-dining-table': ['a-conversation-piece-dining-chair', 'heiko-dining-chair'],
  'duende-desk': ['audacious-desk', 'treasures-dresser'],
  'gather-cafe-table': ['heiko-dining-chair', 'the-socialite-bar-stool'],
  'heart-n-soul-200-dining-table': ['a-conversation-piece-dining-chair', 'heart-n-soul-console-table'],
  'heart-n-soul-console-table': ['heart-n-soul-200-dining-table', 'stories-shelving'],
  'heart-n-soul-dining-table': ['heart-n-soul-dining-120', 'a-conversation-piece-dining-chair'],
  'heart-n-soul-dining-120': ['heart-n-soul-dining-table', 'heiko-dining-chair'],
  'heiko-dining-chair': ['a-conversation-piece-dining-chair', 'gather-cafe-table'],
  'italic-table': ['lounge-around-shuffle-coffee-table', 'heart-n-soul-console-table'],
  'lemon-squeeze-ceiling-lamp': ['lemon-squeeze-wall-lamp-single', 'chordis'],
  'lemon-squeeze-wall-lamp-double': ['lemon-squeeze-wall-lamp-single', 'lemon-squeeze-ceiling-lamp'],
  'lemon-squeeze-wall-lamp-single': ['lemon-squeeze-wall-lamp-double', 'asteria-spotlight'],
  'lounge-around-3-seater': ['lounge-around-shuffle-puff', 'the-reader'],
  'lounge-around-shuffle-coffee-table': ['lounge-around-3-seater', 'italic-table'],
  'lounge-around-shuffle-puff': ['lounge-around-3-seater', 'lounge-around-shuffle-coffee-table'],
  'metal-cover-accessories-asteria': ['asteria-spotlight', 'chordis'],
  'stories-shelving': ['treasures-dresser', 'audacious-desk'],
  'the-reader': ['lounge-around-3-seater', 'treasures-dresser'],
  'the-socialite-bar-stool': ['the-socialite-counter-chair', 'gather-cafe-table'],
  'the-socialite-counter-chair': ['the-socialite-bar-stool', 'heart-n-soul-console-table'],
  'treasures-dresser': ['stories-shelving', 'the-reader']
};

// Main function to add lifestyle images and related products
async function addLifestyleImagesAndRelatedProducts() {
  console.log('🚀 Starting to add lifestyle images and related products to all Umage products...\n');
  
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
    lifestyleImages,
    relatedProducts
  }`);
  
  console.log(`📦 Found ${umageProducts.length} UMAGE products in Sanity`);
  
  for (const product of umageProducts) {
    const productSlug = product.slug?.current;
    if (!productSlug) {
      console.log(`⚠️  Product ${product.name} has no slug, skipping...`);
      continue;
    }
    
    console.log(`\n🔧 Processing ${product.name} (${productSlug})...`);
    
    // Find the corresponding folder
    const folderName = productFolderMapping[productSlug] || 
                      productFolderMapping[productSlug.replace('umage-', '')] ||
                      productSlug;
    
    const productPath = path.join(umageDir, folderName);
    const lifestylePath = path.join(productPath, 'lifestyle');
    
    let lifestyleImages = [];
    
    // Process lifestyle images if folder exists
    if (fs.existsSync(lifestylePath)) {
      const lifestyleFiles = fs.readdirSync(lifestylePath).filter(file => 
        file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.png')
      );
      
      console.log(`  📸 Found ${lifestyleFiles.length} lifestyle images`);
      
      for (const imageFile of lifestyleFiles) {
        const imagePath = path.join(lifestylePath, imageFile);
        const assetId = await uploadImageToSanity(imagePath, imageFile);
        
        if (assetId) {
          lifestyleImages.push({
            _key: generateKey(),
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId
            }
          });
          console.log(`    ✅ Added lifestyle image: ${imageFile}`);
        }
      }
    } else {
      console.log(`  ⚠️  No lifestyle folder found for ${folderName}`);
    }
    
    // Process related products
    const relatedProductSlugs = relatedProductsMapping[productSlug] || 
                               relatedProductsMapping[productSlug.replace('umage-', '')] || 
                               [];
    
    const relatedProducts = [];
    
    for (const relatedSlug of relatedProductSlugs) {
      // Find the related product in our products list
      const relatedProduct = umageProducts.find(p => 
        p.slug?.current === relatedSlug || 
        p.slug?.current === `umage-${relatedSlug}` ||
        p.slug?.current?.replace('umage-', '') === relatedSlug
      );
      
      if (relatedProduct) {
        relatedProducts.push({
          _type: 'reference',
          _ref: relatedProduct._id
        });
        console.log(`  🔗 Added related product: ${relatedProduct.name}`);
      } else {
        console.log(`  ⚠️  Related product not found: ${relatedSlug}`);
      }
    }
    
    // Update the product with lifestyle images and related products
    try {
      const updateData = {};
      
      if (lifestyleImages.length > 0) {
        updateData.lifestyleImages = lifestyleImages;
      }
      
      if (relatedProducts.length > 0) {
        updateData.relatedProducts = relatedProducts;
      }
      
      if (Object.keys(updateData).length > 0) {
        console.log(`  🔄 Updating ${product.name}...`);
        
        await client
          .patch(product._id)
          .set(updateData)
          .commit();
          
        console.log(`  ✅ Updated ${product.name} with ${lifestyleImages.length} lifestyle images and ${relatedProducts.length} related products`);
      } else {
        console.log(`  ⚠️  No updates needed for ${product.name}`);
      }
      
    } catch (error) {
      console.error(`  ❌ Error updating ${product.name}:`, error.message);
    }
  }
  
  console.log('\n🎉 Lifestyle images and related products update completed!');
}

async function main() {
  console.log('🎯 Starting Umage lifestyle images and related products update...\n');
  
  await addLifestyleImagesAndRelatedProducts();
  
  console.log('\n✨ All Umage products have been updated with lifestyle images and related products!');
  console.log('🔍 You can now check the product pages to see the lifestyle images and related products.');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { addLifestyleImagesAndRelatedProducts };
