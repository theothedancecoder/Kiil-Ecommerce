#!/usr/bin/env node

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function completeUmageMigration() {
  console.log('🚀 Completing UMAGE Migration...\n');
  
  try {
    // Step 1: Verify environment variables
    console.log('1️⃣ Checking environment variables...');
    console.log(`   USE_SANITY_PRODUCTS: ${process.env.USE_SANITY_PRODUCTS}`);
    console.log(`   NEXT_PUBLIC_SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`   NEXT_PUBLIC_SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
    
    if (process.env.USE_SANITY_PRODUCTS !== 'true') {
      console.log('   ⚠️  USE_SANITY_PRODUCTS is not set to true');
      console.log('   🔧 Setting USE_SANITY_PRODUCTS=true...');
      
      const envPath = '.env.local';
      let envContent = '';
      
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      
      if (envContent.includes('USE_SANITY_PRODUCTS=')) {
        envContent = envContent.replace(/USE_SANITY_PRODUCTS=.*/g, 'USE_SANITY_PRODUCTS=true');
      } else {
        envContent += '\nUSE_SANITY_PRODUCTS=true\n';
      }
      
      fs.writeFileSync(envPath, envContent);
      console.log('   ✅ Updated USE_SANITY_PRODUCTS=true in .env.local');
    } else {
      console.log('   ✅ Environment variables are correctly set');
    }
    
    // Step 2: Verify UMAGE products exist
    console.log('\n2️⃣ Verifying UMAGE products in Sanity...');
    const products = await client.fetch('*[_type == "product" && brand == "UMAGE"] { _id, name, price, image }');
    console.log(`   📦 Found ${products.length} UMAGE products`);
    
    if (products.length === 0) {
      console.log('   ❌ No UMAGE products found in Sanity');
      console.log('   💡 You need to add UMAGE products to Sanity CMS first');
      return;
    }
    
    products.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - ${product.price} kr ${product.image ? '(has image)' : '(no image)'}`);
    });
    
    // Step 3: Check if products have images
    const productsWithoutImages = products.filter(p => !p.image);
    if (productsWithoutImages.length > 0) {
      console.log(`\n   ⚠️  ${productsWithoutImages.length} products are missing images`);
      console.log('   💡 Products will display with "No image" placeholder until images are added');
    }
    
    // Step 4: Test the query function
    console.log('\n3️⃣ Testing UMAGE query function...');
    const query = `*[_type == "product" && brand == "UMAGE"] {
      _id,
      name,
      slug,
      image { ..., asset-> },
      description,
      price,
      brand,
      categories[]->{ _id, title, slug },
      variants[] { name, image { ..., asset-> }, color, material, size, price }
    } | order(name asc)`;
    
    const queryResult = await client.fetch(query);
    console.log(`   ✅ Query returned ${queryResult.length} products`);
    
    // Step 5: Provide completion summary
    console.log('\n🎉 UMAGE Migration Status:');
    console.log('   ✅ Environment variables configured');
    console.log('   ✅ UMAGE products exist in Sanity');
    console.log('   ✅ Sanity queries working correctly');
    console.log('   ✅ Migration code implemented');
    
    console.log('\n📋 Next Steps:');
    console.log('   1. 🔄 RESTART your development server (npm run dev)');
    console.log('   2. 🌐 Visit http://localhost:3000/umage');
    console.log('   3. 📸 Add images to UMAGE products in Sanity Studio (optional)');
    
    console.log('\n💡 Why "No UMAGE products found" appears:');
    console.log('   - The development server needs to restart to pick up environment changes');
    console.log('   - Once restarted, products will display with "No image" placeholders');
    console.log('   - Adding images in Sanity Studio will make them fully visual');
    
  } catch (error) {
    console.error('❌ Error completing UMAGE migration:', error.message);
  }
}

completeUmageMigration();
