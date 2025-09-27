// Simple debug script to check AJ Floor variants
console.log('🔍 Debugging AJ Floor variants...\n');

// Import static data directly
const fs = require('fs');
const path = require('path');

// Read the static products file
const staticDataPath = path.join(__dirname, '../lib/louisPoulsenProducts.ts');
const staticData = fs.readFileSync(staticDataPath, 'utf8');

console.log('📊 Static data check:');
console.log('Looking for AJ Floor Lamp in static data...\n');

// Extract the AJ Floor product data
const ajFloorMatch = staticData.match(/{\s*_id:\s*"aj-floor-lamp"[\s\S]*?variants:\s*\[([\s\S]*?)\]/);
if (ajFloorMatch) {
  console.log('✅ Found AJ Floor Lamp in static data');
  
  // Count variants by looking for variant objects
  const variantsSection = ajFloorMatch[1];
  const variantMatches = variantsSection.match(/{\s*name:/g);
  const variantCount = variantMatches ? variantMatches.length : 0;
  
  console.log(`📦 Variants count: ${variantCount}`);
  
  // Extract variant names
  const nameMatches = variantsSection.match(/name:\s*"([^"]+)"/g);
  if (nameMatches) {
    nameMatches.forEach((match, index) => {
      const name = match.match(/name:\s*"([^"]+)"/)[1];
      console.log(`   ${index + 1}. ${name}`);
    });
  }
} else {
  console.log('❌ AJ Floor Lamp not found in static data');
}

console.log('\n🔍 URL matching check:');
const productId = 'aj-floor';

// Check href matching
const hrefMatch = staticData.match(/href:\s*"\/louis-poulsen\/aj-floor"/);
if (hrefMatch) {
  console.log('✅ Found href match for /louis-poulsen/aj-floor');
} else {
  console.log('❌ No href match for /louis-poulsen/aj-floor');
  
  // Look for what href values exist
  const allHrefs = staticData.match(/href:\s*"([^"]+)"/g);
  if (allHrefs) {
    console.log('Available hrefs:');
    allHrefs.forEach(href => {
      console.log(`   ${href}`);
    });
  }
}
