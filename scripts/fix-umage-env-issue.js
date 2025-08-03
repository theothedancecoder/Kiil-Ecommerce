#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function fixUmageEnvIssue() {
  console.log('🔧 Fixing UMAGE environment variable issue...\n');
  
  try {
    const envPath = '.env.local';
    
    // Check if .env.local exists
    if (!fs.existsSync(envPath)) {
      console.log('❌ .env.local file not found');
      console.log('Creating .env.local with USE_SANITY_PRODUCTS=true...');
      fs.writeFileSync(envPath, 'USE_SANITY_PRODUCTS=true\n');
      console.log('✅ Created .env.local with USE_SANITY_PRODUCTS=true');
    } else {
      // Read current content
      let envContent = fs.readFileSync(envPath, 'utf8');
      console.log('📄 Current .env.local content preview:');
      
      // Show lines that contain USE_SANITY_PRODUCTS
      const lines = envContent.split('\n');
      const relevantLines = lines.filter(line => 
        line.includes('USE_SANITY_PRODUCTS') || 
        line.includes('SANITY') ||
        line.trim() === ''
      );
      
      if (relevantLines.length > 0) {
        relevantLines.forEach((line, index) => {
          if (line.includes('USE_SANITY_PRODUCTS')) {
            console.log(`   ${index + 1}. ${line} ← FOUND`);
          } else if (line.includes('SANITY')) {
            console.log(`   ${index + 1}. ${line}`);
          }
        });
      }
      
      // Check if USE_SANITY_PRODUCTS exists and fix it
      if (envContent.includes('USE_SANITY_PRODUCTS=')) {
        // Replace existing value
        const oldContent = envContent;
        envContent = envContent.replace(/USE_SANITY_PRODUCTS=.*/g, 'USE_SANITY_PRODUCTS=true');
        
        if (oldContent !== envContent) {
          fs.writeFileSync(envPath, envContent);
          console.log('✅ Updated USE_SANITY_PRODUCTS=true in existing .env.local');
        } else {
          console.log('✅ USE_SANITY_PRODUCTS=true already set correctly');
        }
      } else {
        // Add new line
        envContent += '\nUSE_SANITY_PRODUCTS=true\n';
        fs.writeFileSync(envPath, envContent);
        console.log('✅ Added USE_SANITY_PRODUCTS=true to .env.local');
      }
    }
    
    // Test environment variable loading
    console.log('\n🧪 Testing environment variable loading...');
    require('dotenv').config({ path: '.env.local' });
    console.log(`   USE_SANITY_PRODUCTS: ${process.env.USE_SANITY_PRODUCTS}`);
    
    if (process.env.USE_SANITY_PRODUCTS === 'true') {
      console.log('   ✅ Environment variable loads correctly');
    } else {
      console.log('   ❌ Environment variable not loading correctly');
    }
    
    // Provide clear instructions
    console.log('\n📋 Next Steps:');
    console.log('   1. 🛑 STOP your development server (Ctrl+C)');
    console.log('   2. 🚀 START your development server again (npm run dev)');
    console.log('   3. 🌐 Visit http://localhost:3000/umage');
    console.log('   4. ✅ You should now see UMAGE products (with "No image" placeholders)');
    
    console.log('\n💡 Why this happens:');
    console.log('   - Next.js loads environment variables when the server starts');
    console.log('   - Changes to .env.local require a server restart to take effect');
    console.log('   - The products exist in Sanity but need the env var to be loaded');
    
  } catch (error) {
    console.error('❌ Error fixing environment issue:', error.message);
  }
}

fixUmageEnvIssue();
