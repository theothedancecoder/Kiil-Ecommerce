const fs = require('fs');
const path = require('path');

async function enableSanityProducts() {
  console.log('🔧 Enabling Sanity Products...\n');
  
  const envLocalPath = path.join(process.cwd(), '.env.local');
  
  try {
    let envContent = '';
    
    // Read existing .env.local if it exists
    if (fs.existsSync(envLocalPath)) {
      envContent = fs.readFileSync(envLocalPath, 'utf8');
      console.log('✅ Found existing .env.local file');
    } else {
      console.log('📝 Creating new .env.local file');
    }
    
    // Check if USE_SANITY_PRODUCTS already exists
    if (envContent.includes('USE_SANITY_PRODUCTS')) {
      // Update existing value
      envContent = envContent.replace(
        /USE_SANITY_PRODUCTS=.*/,
        'USE_SANITY_PRODUCTS=true'
      );
      console.log('🔄 Updated existing USE_SANITY_PRODUCTS to true');
    } else {
      // Add new environment variable
      if (envContent && !envContent.endsWith('\n')) {
        envContent += '\n';
      }
      envContent += 'USE_SANITY_PRODUCTS=true\n';
      console.log('➕ Added USE_SANITY_PRODUCTS=true');
    }
    
    // Write back to .env.local
    fs.writeFileSync(envLocalPath, envContent);
    
    console.log('\n✅ Sanity products have been enabled!');
    console.log('📍 Environment variable added to .env.local');
    console.log('\n🚀 Next steps:');
    console.log('1. Restart your development server (npm run dev)');
    console.log('2. Visit http://localhost:3000/products to see Sanity products');
    console.log('3. Run: node scripts/test-sanity-products.js to verify');
    
  } catch (error) {
    console.error('❌ Error enabling Sanity products:', error);
    console.log('\n🔧 Manual setup:');
    console.log('Add this line to your .env.local file:');
    console.log('USE_SANITY_PRODUCTS=true');
  }
}

enableSanityProducts();
