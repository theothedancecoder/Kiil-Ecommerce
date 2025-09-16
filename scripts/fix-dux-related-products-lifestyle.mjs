import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

// Upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Image not found: ${fullPath}`);
      return null;
    }
    
    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    });
    
    console.log(`✅ Image uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

// Lifestyle images data for the 3 products
const lifestyleImagesData = {
  'lunaria-table': [
    '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp',
    '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp'
  ],
  'sam-dining-chair': [
    '/dux/Sam-Dining-Chair/lifestyle/furniture-chair-sam-armchair-chrome-naturale-camel-pie-2-2-scaled.jpg.avif',
    '/dux/Sam-Dining-Chair/lifestyle/furniture-chair-sam-chair-chrome-naturale-black-pie-1-2-scaled.jpg.avif'
  ],
  'superspider-sheepskin': [
    '/dux/Superspider sheepskin /lifestyle/ererererer.webp',
    '/dux/Superspider sheepskin /lifestyle/Superspider-fatolj-styled.jpg'
  ]
};

// Related products mapping
const relatedProductsData = {
  'lunaria-table': ['sam-dining-chair', 'inter-dining-table'],
  'sam-dining-chair': ['jetson-classic-soft-88', 'inter-dining-table'],
  'superspider-sheepskin': ['jetson-classic-soft-88', 'jetson-match-flax-21']
};

async function fixRelatedProductsAndLifestyle() {
  console.log('🔧 Fixing missing related products and lifestyle images...');
  
  // First, get all Dux products to create reference mapping
  const allDuxProducts = await client.fetch(
    `*[_type == "product" && "dux" in categories[]->slug.current] {
      _id,
      slug,
      name
    }`
  );
  
  const productMap = {};
  allDuxProducts.forEach(product => {
    productMap[product.slug.current] = product;
  });
  
  for (const [productSlug, lifestyleImages] of Object.entries(lifestyleImagesData)) {
    console.log(`\n📦 Processing ${productSlug}...`);
    
    const product = productMap[productSlug];
    if (!product) {
      console.log(`❌ Product ${productSlug} not found`);
      continue;
    }
    
    console.log(`✅ Found product: ${product.name} (${product._id})`);
    
    // Upload and add lifestyle images
    console.log('🖼️  Adding lifestyle images...');
    const lifestyleImageObjects = [];
    
    for (const imagePath of lifestyleImages) {
      console.log(`  📸 Uploading lifestyle image: ${imagePath}`);
      const imageAssetId = await uploadImageToSanity(imagePath);
      
      if (imageAssetId) {
        lifestyleImageObjects.push({
          _type: 'image',
          _key: `lifestyle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          asset: {
            _type: 'reference',
            _ref: imageAssetId
          }
        });
      }
    }
    
    // Add related products
    console.log('🔗 Adding related products...');
    const relatedProductRefs = [];
    const relatedSlugs = relatedProductsData[productSlug] || [];
    
    for (const relatedSlug of relatedSlugs) {
      const relatedProduct = productMap[relatedSlug];
      if (relatedProduct) {
        relatedProductRefs.push({
          _type: 'reference',
          _ref: relatedProduct._id,
          _key: `related-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        });
        console.log(`  🔗 Added related product: ${relatedProduct.name}`);
      }
    }
    
    // Update product with lifestyle images and related products
    try {
      const updateData = {};
      
      if (lifestyleImageObjects.length > 0) {
        updateData.lifestyleImages = lifestyleImageObjects;
      }
      
      if (relatedProductRefs.length > 0) {
        updateData.relatedProducts = relatedProductRefs;
      }
      
      if (Object.keys(updateData).length > 0) {
        await client
          .patch(product._id)
          .set(updateData)
          .commit();
        
        console.log(`✅ Updated ${productSlug} with ${lifestyleImageObjects.length} lifestyle images and ${relatedProductRefs.length} related products`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${productSlug}:`, error.message);
    }
  }
  
  console.log('\n🎉 Related products and lifestyle images fix completed!');
}

fixRelatedProductsAndLifestyle().catch(console.error);
