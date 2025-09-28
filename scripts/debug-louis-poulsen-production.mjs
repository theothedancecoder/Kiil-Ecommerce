import { louisPoulsenProducts } from '../lib/louisPoulsenProducts.ts';

console.log('🔍 Debugging Louis Poulsen Production Issue...\n');

// Check static data
console.log('📋 Static Data Check:');
const ajFloorStatic = louisPoulsenProducts.find(p => p._id === 'aj-floor-lamp');
if (ajFloorStatic) {
  console.log(`✅ Found AJ Floor in static data:`);
  console.log(`   - Name: ${ajFloorStatic.name}`);
  console.log(`   - Main Image: ${ajFloorStatic.image}`);
  console.log(`   - Variants: ${ajFloorStatic.variants.length}`);
  
  console.log('\n🎨 Variant Images:');
  ajFloorStatic.variants.forEach((variant, index) => {
    console.log(`   ${index + 1}. ${variant.name}: ${variant.image}`);
  });
  
  // Check if any variants still have Unsplash URLs
  const unsplashVariants = ajFloorStatic.variants.filter(v => v.image.includes('unsplash.com'));
  if (unsplashVariants.length > 0) {
    console.log('\n❌ Found variants with Unsplash URLs:');
    unsplashVariants.forEach(v => {
      console.log(`   - ${v.name}: ${v.image}`);
    });
  } else {
    console.log('\n✅ All variants use proper Louis Poulsen images');
  }
} else {
  console.log('❌ AJ Floor not found in static data');
}

console.log('\n🔍 Possible Issues:');
console.log('1. Vercel deployment caching - changes may take time to propagate');
console.log('2. Browser caching - try hard refresh or incognito mode');
console.log('3. Sanity data might be overriding static data');
console.log('4. Image files might not be accessible in production');

console.log('\n💡 Next Steps:');
console.log('1. Wait for Vercel deployment to complete');
console.log('2. Check if Sanity has Louis Poulsen data with wrong images');
console.log('3. Force a new deployment if needed');
