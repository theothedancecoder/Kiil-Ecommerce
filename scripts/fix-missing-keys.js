require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');

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

async function fixMissingKeys() {
  try {
    console.log('🔍 Checking for products with missing keys...');
    
    const product = await client.fetch(`*[_type == "product" && slug.current == "2097-30-chandelier"][0] { 
      _id, name, categories, variants, lifestyleImages 
    }`);
    
    if (!product) {
      console.log('❌ Product not found');
      return;
    }
    
    console.log('📦 Found product:', product.name);
    
    let needsUpdate = false;
    const updates = {};
    
    // Fix categories missing keys
    if (product.categories && product.categories.length > 0) {
      const categoriesWithKeys = product.categories.map(cat => {
        if (!cat._key) {
          console.log('🔧 Adding missing key to category');
          needsUpdate = true;
          return { ...cat, _key: generateKey() };
        }
        return cat;
      });
      if (needsUpdate) {
        updates.categories = categoriesWithKeys;
      }
    }
    
    // Fix variants missing keys
    if (product.variants && product.variants.length > 0) {
      const variantsWithKeys = product.variants.map(variant => {
        if (!variant._key) {
          console.log('🔧 Adding missing key to variant:', variant.name || 'unnamed');
          needsUpdate = true;
          return { ...variant, _key: generateKey() };
        }
        return variant;
      });
      if (needsUpdate) {
        updates.variants = variantsWithKeys;
      }
    }
    
    // Fix lifestyle images missing keys
    if (product.lifestyleImages && product.lifestyleImages.length > 0) {
      const imagesWithKeys = product.lifestyleImages.map(image => {
        if (!image._key) {
          console.log('🔧 Adding missing key to lifestyle image');
          needsUpdate = true;
          return { ...image, _key: generateKey() };
        }
        return image;
      });
      if (needsUpdate) {
        updates.lifestyleImages = imagesWithKeys;
      }
    }
    
    if (needsUpdate) {
      console.log('\n🔧 Updating product with missing keys...');
      await client.patch(product._id).set(updates).commit();
      console.log('✅ Product updated successfully!');
      
      console.log('\n📋 Fixed:');
      if (updates.categories) console.log('- Categories now have keys');
      if (updates.variants) console.log('- Variants now have keys');
      if (updates.lifestyleImages) console.log('- Lifestyle images now have keys');
      
    } else {
      console.log('\n✅ All items already have proper keys!');
    }
    
    // Also check if there are any other FLOS products with missing keys
    console.log('\n🔍 Checking other FLOS products for missing keys...');
    const flosProducts = await client.fetch(`*[_type == "product" && brand == "FLOS"] { 
      _id, name, categories, variants, lifestyleImages 
    }`);
    
    for (const flosProduct of flosProducts) {
      let productNeedsUpdate = false;
      const productUpdates = {};
      
      // Check categories
      if (flosProduct.categories && flosProduct.categories.some(cat => !cat._key)) {
        const categoriesWithKeys = flosProduct.categories.map(cat => 
          cat._key ? cat : { ...cat, _key: generateKey() }
        );
        productUpdates.categories = categoriesWithKeys;
        productNeedsUpdate = true;
      }
      
      // Check variants
      if (flosProduct.variants && flosProduct.variants.some(variant => !variant._key)) {
        const variantsWithKeys = flosProduct.variants.map(variant => 
          variant._key ? variant : { ...variant, _key: generateKey() }
        );
        productUpdates.variants = variantsWithKeys;
        productNeedsUpdate = true;
      }
      
      // Check lifestyle images
      if (flosProduct.lifestyleImages && flosProduct.lifestyleImages.some(img => !img._key)) {
        const imagesWithKeys = flosProduct.lifestyleImages.map(img => 
          img._key ? img : { ...img, _key: generateKey() }
        );
        productUpdates.lifestyleImages = imagesWithKeys;
        productNeedsUpdate = true;
      }
      
      if (productNeedsUpdate) {
        console.log(`🔧 Fixing keys for: ${flosProduct.name}`);
        await client.patch(flosProduct._id).set(productUpdates).commit();
      }
    }
    
    console.log('\n✅ All FLOS products checked and fixed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixMissingKeys();
