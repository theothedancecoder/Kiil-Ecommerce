#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

try {
  let envContent = '';
  
  // Read existing .env.local if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Check if USE_SANITY_PRODUCTS already exists
  if (envContent.includes('USE_SANITY_PRODUCTS=')) {
    // Update existing value
    envContent = envContent.replace(/USE_SANITY_PRODUCTS=.*/g, 'USE_SANITY_PRODUCTS=true');
    console.log('✅ Updated USE_SANITY_PRODUCTS=true in .env.local');
  } else {
    // Add new line
    if (envContent && !envContent.endsWith('\n')) {
      envContent += '\n';
    }
    envContent += 'USE_SANITY_PRODUCTS=true\n';
    console.log('✅ Added USE_SANITY_PRODUCTS=true to .env.local');
  }

  // Write back to file
  fs.writeFileSync(envPath, envContent);
  
  console.log('\n🎉 UMAGE products will now load from Sanity CMS!');
  console.log('💡 Restart your development server to see the changes.');
  
} catch (error) {
  console.error('❌ Error updating .env.local:', error.message);
  process.exit(1);
}
