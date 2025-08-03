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

async function fixUmageVariants() {
  try {
    console.log('🔧 Fixing UMAGE variants production issues...');
    
    // Get all UMAGE products with variants
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
    
    console.log(`Found ${umageProducts.length} UMAGE products to fix`);
    
    for (const product of umageProducts) {
      if (product.variants && product.variants.length > 0) {
        console.log(`\n🔧 Fixing variants for: ${product.name}`);
        
        let needsUpdate = false;
        const updatedVariants = product.variants.map(variant => {
          const updates = { ...variant };
          
          // Add missing _key
          if (!variant._key) {
            updates._key = generateKey();
            needsUpdate = true;
            console.log(`  ✅ Added _key for variant: ${variant.name}`);
          }
          
          // Add missing image (use main product image as fallback)
          if (!variant.image && product.image) {
            updates.image = product.image;
            needsUpdate = true;
            console.log(`  ✅ Added fallback image for variant: ${variant.name}`);
          }
          
          return updates;
        });
        
        if (needsUpdate) {
          await client.patch(product._id).set({ variants: updatedVariants }).commit();
          console.log(`  ✅ Updated variants for ${product.name}`);
        } else {
          console.log(`  ✅ ${product.name} variants already properly configured`);
        }
      }
    }
    
    console.log('\n🎉 All UMAGE variants fixed!');
    
    // Verify the fix
    console.log('\n🔍 Verifying fix for A Conversation Piece Dining Chair...');
    const verifyProduct = await client.fetch(`*[_type == "product" && slug.current == "a-conversation-piece-dining-chair"][0] {
      name,
      variants[] {
        _key,
        name,
        color,
        material,
        image {
          asset -> {
            url
          }
        }
      }
    }`);
    
    if (verifyProduct && verifyProduct.variants) {
      console.log('✅ Verification successful:');
      verifyProduct.variants.forEach((variant, i) => {
        console.log(`  ${i + 1}. ${variant.name}`);
        console.log(`     - Has _key: ${!!variant._key}`);
        console.log(`     - Has image: ${!!variant.image?.asset?.url}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixUmageVariants();
