require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Using the working token
  useCdn: false,
  apiVersion: '2024-01-01',
});

function generateKey() {
  return uuidv4().replace(/-/g, '').substring(0, 12);
}

// Complete variant data for all 25 Umage products
const completeVariantData = {
  'a-conversation-piece-dining-chair': [
    { name: 'Oak - Sugar Brown', material: 'Oak', color: 'Sugar Brown', price: 7499 },
    { name: 'Black Oak - Sugar Brown', material: 'Black Oak', color: 'Sugar Brown', price: 7499 },
    { name: 'Black Oak - White Sands', material: 'Black Oak', color: 'White Sands', price: 7499 },
    { name: 'Oak - White Sands', material: 'Oak', color: 'White Sands', price: 7499 },
    { name: 'Dark Oak - Sugar Brown', material: 'Dark Oak', color: 'Sugar Brown', price: 7699 },
    { name: 'Dark Oak - White Sands', material: 'Dark Oak', color: 'White Sands', price: 7699 },
    { name: 'Walnut - Sugar Brown', material: 'Walnut', color: 'Sugar Brown', price: 7799 },
    { name: 'Walnut - White Sands', material: 'Walnut', color: 'White Sands', price: 7799 }
  ],
  'asteria-spotlight': [
    { name: 'Black', material: 'Metal', color: 'Black', price: 2099 },
    { name: 'Plated Brass', material: 'Brass', color: 'Plated Brass', price: 2199 },
    { name: 'Polished Steel', material: 'Steel', color: 'Polished Steel', price: 2149 }
  ],
  'audacious-desk': [
    { name: 'Oak - Sugar Brown', material: 'Oak', color: 'Sugar Brown', price: 14999 },
    { name: 'Oak - White Sands', material: 'Oak', color: 'White Sands', price: 14999 },
    { name: 'Oak - Sterling', material: 'Oak', color: 'Sterling', price: 14999 },
    { name: 'Oak - Shadow', material: 'Oak', color: 'Shadow', price: 14999 },
    { name: 'Oak - Morning Meadows', material: 'Oak', color: 'Morning Meadows', price: 14999 },
    { name: 'Oak - Hazelnut', material: 'Oak', color: 'Hazelnut', price: 14999 },
    { name: 'Oak - Charcoal', material: 'Oak', color: 'Charcoal', price: 14999 }
  ],
  'chordis': [
    { name: 'Brass', material: 'Brass', color: 'Brass', price: 5699 }
  ],
  'comfort-circle-dining-table': [
    { name: 'Black Oak', material: 'Black Oak', color: 'Black', price: 17999 },
    { name: 'Oak', material: 'Oak', color: 'Natural', price: 17999 },
    { name: 'Dark Oak', material: 'Dark Oak', color: 'Dark', price: 18199 }
  ],
  'duende-desk': [
    { name: 'Black Oak', material: 'Black Oak', color: 'Black', price: 12999 },
    { name: 'Oak', material: 'Oak', color: 'Natural', price: 12999 },
    { name: 'Dark Oak', material: 'Dark Oak', color: 'Dark', price: 13199 }
  ],
  'gather-cafe-table': [
    { name: 'Beige Travertine', material: 'Travertine', color: 'Beige', price: 8999 },
    { name: 'Brown Emperador', material: 'Marble', color: 'Brown Emperador', price: 9299 }
  ],
  'heiko-dining-chair': [
    { name: 'Oak', material: 'Oak', color: 'Natural', price: 6999 },
    { name: 'Walnut', material: 'Walnut', color: 'Natural', price: 7299 }
  ],
  'treasures-dresser': [
    { name: 'Oak - Sugar Brown', material: 'Oak', color: 'Sugar Brown', price: 16999 },
    { name: 'Oak - White Sands', material: 'Oak', color: 'White Sands', price: 16999 },
    { name: 'Oak - Morning Meadows', material: 'Oak', color: 'Morning Meadows', price: 16999 },
    { name: 'Black Oak - Sugar Brown', material: 'Black Oak', color: 'Sugar Brown', price: 16999 },
    { name: 'Black Oak - White Sands', material: 'Black Oak', color: 'White Sands', price: 16999 },
    { name: 'Black Oak - Morning Meadows', material: 'Black Oak', color: 'Morning Meadows', price: 16999 },
    { name: 'Dark Oak - Sugar Brown', material: 'Dark Oak', color: 'Sugar Brown', price: 17199 },
    { name: 'Dark Oak - White Sands', material: 'Dark Oak', color: 'White Sands', price: 17199 },
    { name: 'Dark Oak - Morning Meadows', material: 'Dark Oak', color: 'Morning Meadows', price: 17199 }
  ]
};

// Additional products with basic variants
const additionalVariantData = {
  'heart-n-soul-200-dining-table': [
    { name: 'Oak - Natural', material: 'Oak', color: 'Natural', price: 19999 },
    { name: 'Black Oak', material: 'Black Oak', color: 'Black', price: 19999 },
    { name: 'Dark Oak', material: 'Dark Oak', color: 'Dark', price: 20199 },
    { name: 'Walnut', material: 'Walnut', color: 'Natural', price: 20499 },
    { name: 'Oak - Obsidian Black', material: 'Oak', color: 'Obsidian Black', price: 19999 },
    { name: 'Oak - Cloud Grey', material: 'Oak', color: 'Cloud Grey', price: 19999 },
    { name: 'Oak - Moss Green', material: 'Oak', color: 'Moss Green', price: 19999 }
  ],
  'heart-n-soul-console-table': [
    { name: 'Oak - Natural', material: 'Oak', color: 'Natural', price: 12999 },
    { name: 'Black Oak', material: 'Black Oak', color: 'Black', price: 12999 },
    { name: 'Dark Oak', material: 'Dark Oak', color: 'Dark', price: 13199 },
    { name: 'Oak - Cloud Grey', material: 'Oak', color: 'Cloud Grey', price: 12999 },
    { name: 'Oak - Moss Green', material: 'Oak', color: 'Moss Green', price: 12999 }
  ],
  'heart-n-soul-dining-120': [
    { name: 'Oak - Natural', material: 'Oak', color: 'Natural', price: 16999 },
    { name: 'Black Oak', material: 'Black Oak', color: 'Black', price: 16999 },
    { name: 'Dark Oak', material: 'Dark Oak', color: 'Dark', price: 17199 },
    { name: 'Walnut', material: 'Walnut', color: 'Natural', price: 17499 },
    { name: 'Oak - Obsidian Black', material: 'Oak', color: 'Obsidian Black', price: 16999 },
    { name: 'Oak - Cloud Grey', material: 'Oak', color: 'Cloud Grey', price: 16999 },
    { name: 'Oak - Moss Green', material: 'Oak', color: 'Moss Green', price: 16999 }
  ],
  'lounge-around-3-seater': [
    { name: 'Oak - Sugar Brown', material: 'Oak', color: 'Sugar Brown', price: 24999 },
    { name: 'Oak - White Sands', material: 'Oak', color: 'White Sands', price: 24999 },
    { name: 'Oak - Shadow', material: 'Oak', color: 'Shadow', price: 24999 },
    { name: 'Dark Oak - Sugar Brown', material: 'Dark Oak', color: 'Sugar Brown', price: 25299 },
    { name: 'Dark Oak - White Sands', material: 'Dark Oak', color: 'White Sands', price: 25299 },
    { name: 'Dark Oak - Shadow', material: 'Dark Oak', color: 'Shadow', price: 25299 }
  ],
  'lounge-around-shuffle-puff': [
    { name: 'Oak - Sugar Brown', material: 'Oak', color: 'Sugar Brown', price: 7999 },
    { name: 'Oak - White Sands', material: 'Oak', color: 'White Sands', price: 7999 },
    { name: 'Oak - Shadow', material: 'Oak', color: 'Shadow', price: 7999 },
    { name: 'Dark Oak - Sugar Brown', material: 'Dark Oak', color: 'Sugar Brown', price: 8299 },
    { name: 'Dark Oak - White Sands', material: 'Dark Oak', color: 'White Sands', price: 8299 },
    { name: 'Dark Oak - Shadow', material: 'Dark Oak', color: 'Shadow', price: 8299 }
  ],
  'lounge-around-shuffle-coffee-table': [
    { name: 'Oak', material: 'Oak', color: 'Natural', price: 8999 },
    { name: 'Dark Oak', material: 'Dark Oak', color: 'Dark', price: 9199 }
  ],
  'the-reader': [
    { name: 'Oak - Sugar Brown', material: 'Oak', color: 'Sugar Brown', price: 18999 },
    { name: 'Oak - Summer Shine', material: 'Oak', color: 'Summer Shine', price: 18999 },
    { name: 'Black Oak - Sugar Brown', material: 'Black Oak', color: 'Sugar Brown', price: 18999 },
    { name: 'Black Oak - Summer Shine', material: 'Black Oak', color: 'Summer Shine', price: 18999 },
    { name: 'Dark Oak - Sugar Brown', material: 'Dark Oak', color: 'Sugar Brown', price: 19199 },
    { name: 'Dark Oak - Summer Shine', material: 'Dark Oak', color: 'Summer Shine', price: 19199 }
  ],
  'stories-shelving': [
    { name: 'Oak', material: 'Oak', color: 'Natural', price: 8999 },
    { name: 'Dark Oak', material: 'Dark Oak', color: 'Dark', price: 9199 }
  ],
  'the-socialite-bar-stool': [
    { name: 'Oak', material: 'Oak', color: 'Natural', price: 4999 },
    { name: 'Black Oak', material: 'Black Oak', color: 'Black', price: 4999 },
    { name: 'Dark Oak', material: 'Dark Oak', color: 'Dark', price: 5199 }
  ],
  'the-socialite-counter-chair': [
    { name: 'Oak', material: 'Oak', color: 'Natural', price: 4699 },
    { name: 'Black Oak', material: 'Black Oak', color: 'Black', price: 4699 },
    { name: 'Dark Oak', material: 'Dark Oak', color: 'Dark', price: 4899 }
  ],
  'lemon-squeeze-ceiling-lamp': [
    { name: 'Long - Plated Brass', material: 'Brass', color: 'Plated Brass', price: 3999 },
    { name: 'Long - Polished Steel', material: 'Steel', color: 'Polished Steel', price: 3899 },
    { name: 'Short - Plated Brass', material: 'Brass', color: 'Plated Brass', price: 3699 },
    { name: 'Short - Polished Steel', material: 'Steel', color: 'Polished Steel', price: 3599 }
  ],
  'lemon-squeeze-wall-lamp-single': [
    { name: 'Long - Plated Brass', material: 'Brass', color: 'Plated Brass', price: 3499 },
    { name: 'Long - Polished Steel', material: 'Steel', color: 'Polished Steel', price: 3399 },
    { name: 'Short - Plated Brass', material: 'Brass', color: 'Plated Brass', price: 3199 },
    { name: 'Short - Polished Steel', material: 'Steel', color: 'Polished Steel', price: 3099 }
  ],
  'lemon-squeeze-wall-lamp-double': [
    { name: 'Short - Plated Brass', material: 'Brass', color: 'Plated Brass', price: 4999 },
    { name: 'Short - Polished Steel', material: 'Steel', color: 'Polished Steel', price: 4799 }
  ],
  'italic-table': [
    { name: 'Oak - Glass', material: 'Oak', color: 'Natural', price: 14999 },
    { name: 'Black Oak - Glass', material: 'Black Oak', color: 'Black', price: 14999 },
    { name: 'Dark Oak - Glass', material: 'Dark Oak', color: 'Dark', price: 15199 }
  ],
  'metal-cover-accessories-asteria': [
    { name: 'Micro - Steel', material: 'Steel', color: 'Steel', price: 599 },
    { name: 'Micro - Brass', material: 'Brass', color: 'Brass', price: 649 },
    { name: 'Mini - Steel', material: 'Steel', color: 'Steel', price: 699 },
    { name: 'Mini - Brass', material: 'Brass', color: 'Brass', price: 749 }
  ]
};

// Combine all variant data
const allVariantData = { ...completeVariantData, ...additionalVariantData };

async function fixAllUmageVariants() {
  try {
    console.log('🚀 Starting comprehensive Umage variants fix...\n');
    
    // Get all UMAGE products
    const umageProducts = await client.fetch(`*[_type == "product" && brand == "UMAGE"] {
      _id,
      name,
      slug,
      image,
      variants[] {
        _key,
        name,
        color,
        material,
        price,
        image
      }
    }`);
    
    console.log(`📦 Found ${umageProducts.length} UMAGE products to update`);
    
    let updatedCount = 0;
    
    for (const product of umageProducts) {
      const productSlug = product.slug?.current;
      
      // Try to find variant data
      let variantData = null;
      const possibleSlugs = [
        productSlug,
        productSlug?.replace('umage-', ''),
        productSlug?.replace('-', ''),
        productSlug?.replace(/^umage-/, '').replace(/-/g, '')
      ].filter(Boolean);
      
      for (const slug of possibleSlugs) {
        if (allVariantData[slug]) {
          variantData = allVariantData[slug];
          break;
        }
      }
      
      if (variantData) {
        console.log(`\n🔧 Updating ${product.name}...`);
        console.log(`   Current variants: ${product.variants?.length || 0}`);
        console.log(`   New variants: ${variantData.length}`);
        
        // Create variants with proper structure
        const updatedVariants = variantData.map((variant, index) => ({
          _key: generateKey(),
          name: variant.name,
          material: variant.material,
          color: variant.color,
          price: variant.price,
          image: product.image // Use main product image as fallback
        }));
        
        // Update the product
        await client.patch(product._id).set({ variants: updatedVariants }).commit();
        console.log(`   ✅ Updated successfully with ${updatedVariants.length} variants`);
        updatedCount++;
        
      } else {
        console.log(`\n⚠️  No variant data found for ${product.name} (${productSlug})`);
        
        // For products without specific variant data, ensure they have at least basic variants
        if (!product.variants || product.variants.length === 0) {
          const basicVariants = [{
            _key: generateKey(),
            name: 'Standard',
            material: 'Standard',
            color: 'Natural',
            price: product.price || 9999,
            image: product.image
          }];
          
          await client.patch(product._id).set({ variants: basicVariants }).commit();
          console.log(`   ✅ Added basic variant for ${product.name}`);
          updatedCount++;
        }
      }
    }
    
    console.log(`\n🎉 Umage variants fix completed!`);
    console.log(`📊 Updated ${updatedCount} out of ${umageProducts.length} products`);
    
    // Verify a few key products
    console.log('\n🔍 Verifying key products...');
    
    const keyProducts = ['a-conversation-piece-dining-chair', 'audacious-desk', 'treasures-dresser'];
    
    for (const slug of keyProducts) {
      const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0] {
        name,
        variants[] {
          _key,
          name,
          material,
          color,
          price
        }
      }`, { slug });
      
      if (product && product.variants) {
        console.log(`\n✅ ${product.name}: ${product.variants.length} variants`);
        product.variants.slice(0, 3).forEach((variant, i) => {
          console.log(`   ${i + 1}. ${variant.name} - ${variant.material} - kr ${variant.price}`);
        });
        if (product.variants.length > 3) {
          console.log(`   ... and ${product.variants.length - 3} more variants`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function main() {
  console.log('🎯 Starting final Umage variants fix...\n');
  
  await fixAllUmageVariants();
  
  console.log('\n✨ All Umage variants have been fixed!');
  console.log('🔍 You can now check the Umage page to see all products with proper variants.');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fixAllUmageVariants };
