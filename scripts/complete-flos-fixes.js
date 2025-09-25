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
    console.log(`📤 Uploading: ${path.basename(imagePath)}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
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

async function completeFlosFixes() {
  console.log('🔧 Completing FLOS Fixes...\n');

  try {
    // Get all FLOS products
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

    console.log(`Found ${products.length} FLOS products after cleanup`);

    // Step 1: Fix missing images for remaining products
    console.log('\n1. Fixing remaining missing images...');
    const productsNeedingImages = products.filter(p => !p.image?.asset);
    console.log(`Products still needing images: ${productsNeedingImages.length}`);

    // Get all available FLOS images
    const flosImages = [];
    const flosDir = 'public/FLOS';
    
    if (fs.existsSync(flosDir)) {
      const items = fs.readdirSync(flosDir, { withFileTypes: true });
      
      for (const item of items) {
        if (item.isDirectory()) {
          const subDir = path.join(flosDir, item.name);
          const files = fs.readdirSync(subDir);
          
          files.forEach(file => {
            if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
              flosImages.push({
                path: path.join(subDir, file),
                name: file.toLowerCase(),
                dir: item.name.toLowerCase()
              });
            }
          });
        }
      }
    }

    console.log(`Available FLOS images: ${flosImages.length}`);

    // Try to match remaining products with images
    for (const product of productsNeedingImages.slice(0, 10)) { // Limit to avoid overwhelming
      const productName = product.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const slug = product.slug?.current?.replace(/-/g, '') || '';
      
      const matchingImage = flosImages.find(img => {
        const imgName = img.name.replace(/[^a-z0-9]/g, '');
        const imgDir = img.dir.replace(/[^a-z0-9]/g, '');
        
        return (
          imgName.includes(productName) ||
          imgDir.includes(productName) ||
          imgName.includes(slug) ||
          imgDir.includes(slug) ||
          // Specific matching for common FLOS products
          (productName.includes('ktribe') && (imgName.includes('ktribe') || imgDir.includes('ktribe'))) ||
          (productName.includes('kelvin') && (imgName.includes('kelvin') || imgDir.includes('kelvin'))) ||
          (productName.includes('parentesi') && (imgName.includes('parentesi') || imgDir.includes('parentesi'))) ||
          (productName.includes('spun') && (imgName.includes('spun') || imgDir.includes('spun'))) ||
          (productName.includes('string') && (imgName.includes('string') || imgDir.includes('string'))) ||
          (productName.includes('tab') && (imgName.includes('tab') || imgDir.includes('tab'))) ||
          (productName.includes('taccia') && (imgName.includes('taccia') || imgDir.includes('taccia')))
        );
      });

      if (matchingImage) {
        console.log(`🎯 Found match for ${product.name}: ${matchingImage.dir}`);
        const uploadedImage = await uploadImageToSanity(matchingImage.path, product.name);
        
        if (uploadedImage) {
          await client.patch(product._id).set({ image: uploadedImage }).commit();
          console.log(`✅ Updated image for ${product.name}`);
        }
      } else {
        console.log(`⚠️  No image found for ${product.name}`);
      }
    }

    // Step 2: Add lifestyle images
    console.log('\n2. Adding lifestyle images...');
    const productsNeedingLifestyle = products.filter(p => !p.lifestyleImages?.length);
    console.log(`Products needing lifestyle images: ${productsNeedingLifestyle.length}`);

    for (const product of productsNeedingLifestyle.slice(0, 15)) { // Limit to first 15
      const productName = product.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const lifestyleImages = [];

      // Look for lifestyle images in FLOS subdirectories
      if (fs.existsSync(flosDir)) {
        const items = fs.readdirSync(flosDir, { withFileTypes: true });
        
        for (const item of items) {
          if (item.isDirectory()) {
            const subDir = path.join(flosDir, item.name);
            const lifestyleDir = path.join(subDir, 'lifestyle');
            
            if (fs.existsSync(lifestyleDir)) {
              const dirName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
              
              // Check if this directory matches the product
              if (dirName.includes(productName) || productName.includes(dirName)) {
                const lifestyleFiles = fs.readdirSync(lifestyleDir)
                  .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
                  .slice(0, 2); // Max 2 lifestyle images

                for (const file of lifestyleFiles) {
                  const lifestylePath = path.join(lifestyleDir, file);
                  const uploadedLifestyle = await uploadImageToSanity(lifestylePath, `${product.name} - Lifestyle`);
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

    // Step 3: Add related products
    console.log('\n3. Adding related products...');
    const finalProducts = await client.fetch(`
      *[_type == "product" && brand == "FLOS"] | order(name asc) {
        _id,
        name,
        slug
      }
    `);

    // Group products by type for related products
    const productsByType = {
      chandelier: finalProducts.filter(p => p.name.toLowerCase().includes('chandelier')),
      floor: finalProducts.filter(p => p.name.toLowerCase().includes('floor')),
      table: finalProducts.filter(p => p.name.toLowerCase().includes('table')),
      pendant: finalProducts.filter(p => p.name.toLowerCase().includes('pendant')),
      wall: finalProducts.filter(p => p.name.toLowerCase().includes('wall')),
      suspension: finalProducts.filter(p => p.name.toLowerCase().includes('suspension')),
      other: finalProducts.filter(p => 
        !p.name.toLowerCase().includes('chandelier') &&
        !p.name.toLowerCase().includes('floor') &&
        !p.name.toLowerCase().includes('table') &&
        !p.name.toLowerCase().includes('pendant') &&
        !p.name.toLowerCase().includes('wall') &&
        !p.name.toLowerCase().includes('suspension')
      )
    };

    // Add related products for each product
    for (const product of finalProducts.slice(0, 25)) { // Limit to avoid overwhelming
      const productName = product.name.toLowerCase();
      let productType = 'other';
      
      if (productName.includes('chandelier')) productType = 'chandelier';
      else if (productName.includes('floor')) productType = 'floor';
      else if (productName.includes('table')) productType = 'table';
      else if (productName.includes('pendant')) productType = 'pendant';
      else if (productName.includes('wall')) productType = 'wall';
      else if (productName.includes('suspension')) productType = 'suspension';

      const sameTypeProducts = productsByType[productType] || [];
      const relatedProducts = sameTypeProducts
        .filter(p => p._id !== product._id)
        .slice(0, 3)
        .map(p => ({ _type: 'reference', _ref: p._id }));

      if (relatedProducts.length > 0) {
        await client.patch(product._id).set({ relatedProducts }).commit();
        console.log(`✅ Added ${relatedProducts.length} related products for ${product.name}`);
      }
    }

    // Final summary
    console.log('\n🎉 FLOS Fixes Complete!');
    
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

    console.log('\n📊 Final FLOS Summary:');
    console.log(`Total FLOS products: ${finalSummary.length}`);
    console.log(`Products with images: ${finalSummary.filter(p => p.image?.asset).length}`);
    console.log(`Products with variants: ${finalSummary.filter(p => p.variants?.length > 0).length}`);
    console.log(`Products with lifestyle images: ${finalSummary.filter(p => p.lifestyleImages?.length > 0).length}`);
    console.log(`Products with related products: ${finalSummary.filter(p => p.relatedProducts?.length > 0).length}`);

    // Show products still needing attention
    const stillNeedingImages = finalSummary.filter(p => !p.image?.asset);
    if (stillNeedingImages.length > 0) {
      console.log('\n⚠️  Products still needing images:');
      stillNeedingImages.forEach(p => console.log(`   - ${p.name} (${p.slug?.current})`));
    }

  } catch (error) {
    console.error('❌ Error completing FLOS fixes:', error);
  }
}

completeFlosFixes();
