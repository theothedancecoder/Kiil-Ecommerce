#!/usr/bin/env node

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function uploadImageToSanity(imagePath, altText) {
  try {
    console.log(`📤 Uploading: ${imagePath}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    console.log(`✅ Uploaded: ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${imagePath}:`, error.message);
    return null;
  }
}

async function fixAllFlosIssues() {
  console.log('🔧 Fixing All FLOS Issues...\n');

  try {
    // Step 1: Get all FLOS products
    console.log('1. Fetching all FLOS products...');
    const products = await client.fetch(`
      *[_type == "product" && brand == "FLOS"] | order(name asc) {
        _id,
        name,
        slug,
        image,
        variants,
        lifestyleImages,
        relatedProducts
      }
    `);

    console.log(`Found ${products.length} FLOS products`);

    // Step 2: Identify and remove duplicates
    console.log('\n2. Identifying duplicates...');
    const slugMap = new Map();
    const duplicates = [];
    const uniqueProducts = [];

    products.forEach(product => {
      const slug = product.slug?.current;
      if (!slug) {
        console.log(`⚠️  Product without slug: ${product.name} (${product._id})`);
        return;
      }

      if (slugMap.has(slug)) {
        // This is a duplicate
        const existing = slugMap.get(slug);
        console.log(`🔍 Duplicate found: ${product.name} (${slug})`);
        console.log(`   Existing: ${existing._id} - Image: ${existing.image?.asset ? 'YES' : 'NO'}, Variants: ${existing.variants?.length || 0}, Lifestyle: ${existing.lifestyleImages?.length || 0}`);
        console.log(`   Duplicate: ${product._id} - Image: ${product.image?.asset ? 'YES' : 'NO'}, Variants: ${product.variants?.length || 0}, Lifestyle: ${product.lifestyleImages?.length || 0}`);
        
        // Keep the one with more data (image, variants, lifestyle images)
        const existingScore = (existing.image?.asset ? 1 : 0) + (existing.variants?.length || 0) + (existing.lifestyleImages?.length || 0);
        const duplicateScore = (product.image?.asset ? 1 : 0) + (product.variants?.length || 0) + (product.lifestyleImages?.length || 0);
        
        if (duplicateScore > existingScore) {
          // Replace existing with duplicate
          duplicates.push(existing._id);
          slugMap.set(slug, product);
          uniqueProducts[uniqueProducts.findIndex(p => p._id === existing._id)] = product;
          console.log(`   → Keeping duplicate (better data)`);
        } else {
          // Keep existing, mark duplicate for deletion
          duplicates.push(product._id);
          console.log(`   → Keeping existing (better data)`);
        }
      } else {
        slugMap.set(slug, product);
        uniqueProducts.push(product);
      }
    });

    console.log(`\n📊 Duplicate Analysis:`);
    console.log(`   Total products: ${products.length}`);
    console.log(`   Unique products: ${uniqueProducts.length}`);
    console.log(`   Duplicates to remove: ${duplicates.length}`);

    // Step 3: Remove duplicates
    if (duplicates.length > 0) {
      console.log('\n3. Removing duplicates...');
      for (const duplicateId of duplicates) {
        try {
          await client.delete(duplicateId);
          console.log(`✅ Deleted duplicate: ${duplicateId}`);
        } catch (error) {
          console.error(`❌ Failed to delete ${duplicateId}:`, error.message);
        }
      }
    }

    // Step 4: Fix missing images for remaining products
    console.log('\n4. Fixing missing images...');
    const productsNeedingImages = uniqueProducts.filter(p => !p.image?.asset);
    console.log(`Products needing images: ${productsNeedingImages.length}`);

    // Check available FLOS images
    const flosImageDirs = ['public/FLOS', 'public/Flos IC Lights', 'public/Flos IC Lights T1'];
    const availableImages = [];

    for (const dir of flosImageDirs) {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir, { recursive: true });
        files.forEach(file => {
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isFile() && /\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
            availableImages.push(fullPath);
          }
        });
      }
    }

    console.log(`Available images: ${availableImages.length}`);

    // Try to match products with images
    for (const product of productsNeedingImages) {
      const productName = product.name.toLowerCase();
      const slug = product.slug?.current || '';
      
      // Find matching image
      const matchingImage = availableImages.find(imagePath => {
        const imageName = path.basename(imagePath).toLowerCase();
        const imageDir = path.dirname(imagePath).toLowerCase();
        
        // Try various matching strategies
        return (
          imageName.includes(productName.replace(/[^a-z0-9]/g, '')) ||
          imageName.includes(slug.replace(/-/g, '')) ||
          imageDir.includes(productName.replace(/[^a-z0-9]/g, '')) ||
          // Specific FLOS product matching
          (productName.includes('2097') && imageName.includes('2097')) ||
          (productName.includes('arco') && imageName.includes('arco')) ||
          (productName.includes('snoopy') && imageName.includes('snoopy')) ||
          (productName.includes('ic lights') && imageName.includes('ic')) ||
          (productName.includes('ktribe') && imageName.includes('ktribe')) ||
          (productName.includes('bellhop') && imageName.includes('bellhop'))
        );
      });

      if (matchingImage) {
        console.log(`🎯 Found match for ${product.name}: ${matchingImage}`);
        const uploadedImage = await uploadImageToSanity(matchingImage, product.name);
        
        if (uploadedImage) {
          await client.patch(product._id).set({ image: uploadedImage }).commit();
          console.log(`✅ Updated image for ${product.name}`);
        }
      } else {
        console.log(`⚠️  No image found for ${product.name}`);
      }
    }

    // Step 5: Add lifestyle images
    console.log('\n5. Adding lifestyle images...');
    const productsNeedingLifestyle = uniqueProducts.filter(p => !p.lifestyleImages?.length);
    console.log(`Products needing lifestyle images: ${productsNeedingLifestyle.length}`);

    // Look for lifestyle images in subdirectories
    for (const product of productsNeedingLifestyle.slice(0, 10)) { // Limit to first 10 to avoid overwhelming
      const productName = product.name.toLowerCase();
      const lifestyleImages = [];

      // Look for lifestyle subdirectories
      for (const dir of flosImageDirs) {
        if (fs.existsSync(dir)) {
          const subdirs = fs.readdirSync(dir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => path.join(dir, dirent.name));

          for (const subdir of subdirs) {
            const lifestyleDir = path.join(subdir, 'lifestyle');
            if (fs.existsSync(lifestyleDir)) {
              const lifestyleFiles = fs.readdirSync(lifestyleDir)
                .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
                .map(file => path.join(lifestyleDir, file));

              // Check if this lifestyle directory matches the product
              const subdirName = path.basename(subdir).toLowerCase();
              if (subdirName.includes(productName.replace(/[^a-z0-9]/g, '')) ||
                  productName.includes(subdirName.replace(/[^a-z0-9]/g, ''))) {
                
                for (const lifestyleFile of lifestyleFiles.slice(0, 2)) { // Max 2 lifestyle images
                  const uploadedLifestyle = await uploadImageToSanity(lifestyleFile, `${product.name} - Lifestyle`);
                  if (uploadedLifestyle) {
                    lifestyleImages.push(uploadedLifestyle);
                  }
                }
              }
            }
          }
        }
      }

      if (lifestyleImages.length > 0) {
        await client.patch(product._id).set({ lifestyleImages }).commit();
        console.log(`✅ Added ${lifestyleImages.length} lifestyle images for ${product.name}`);
      }
    }

    // Step 6: Add related products
    console.log('\n6. Adding related products...');
    const finalProducts = await client.fetch(`
      *[_type == "product" && brand->name == "FLOS"] | order(name asc) {
        _id,
        name,
        slug,
        category
      }
    `);

    // Group products by category/type for related products
    const productsByType = new Map();
    finalProducts.forEach(product => {
      const type = product.name.toLowerCase().includes('chandelier') ? 'chandelier' :
                   product.name.toLowerCase().includes('floor') ? 'floor' :
                   product.name.toLowerCase().includes('table') ? 'table' :
                   product.name.toLowerCase().includes('pendant') ? 'pendant' :
                   product.name.toLowerCase().includes('wall') ? 'wall' : 'other';
      
      if (!productsByType.has(type)) {
        productsByType.set(type, []);
      }
      productsByType.get(type).push(product);
    });

    // Add related products (same type)
    for (const product of finalProducts.slice(0, 20)) { // Limit to avoid overwhelming
      const productType = product.name.toLowerCase().includes('chandelier') ? 'chandelier' :
                          product.name.toLowerCase().includes('floor') ? 'floor' :
                          product.name.toLowerCase().includes('table') ? 'table' :
                          product.name.toLowerCase().includes('pendant') ? 'pendant' :
                          product.name.toLowerCase().includes('wall') ? 'wall' : 'other';
      
      const sameTypeProducts = productsByType.get(productType) || [];
      const relatedProducts = sameTypeProducts
        .filter(p => p._id !== product._id)
        .slice(0, 3)
        .map(p => ({ _type: 'reference', _ref: p._id }));

      if (relatedProducts.length > 0) {
        await client.patch(product._id).set({ relatedProducts }).commit();
        console.log(`✅ Added ${relatedProducts.length} related products for ${product.name}`);
      }
    }

    console.log('\n🎉 FLOS Issues Fix Complete!');
    
    // Final summary
    const finalSummary = await client.fetch(`
      *[_type == "product" && brand == "FLOS"] {
        _id,
        name,
        image,
        variants,
        lifestyleImages,
        relatedProducts
      }
    `);

    console.log('\n📊 Final Summary:');
    console.log(`Total FLOS products: ${finalSummary.length}`);
    console.log(`Products with images: ${finalSummary.filter(p => p.image?.asset).length}`);
    console.log(`Products with variants: ${finalSummary.filter(p => p.variants?.length > 0).length}`);
    console.log(`Products with lifestyle images: ${finalSummary.filter(p => p.lifestyleImages?.length > 0).length}`);
    console.log(`Products with related products: ${finalSummary.filter(p => p.relatedProducts?.length > 0).length}`);

  } catch (error) {
    console.error('❌ Error fixing FLOS issues:', error);
  }
}

fixAllFlosIssues();
