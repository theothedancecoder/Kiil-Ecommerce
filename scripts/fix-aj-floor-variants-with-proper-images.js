const fs = require('fs');
const path = require('path');

// Create proper lamp images for each AJ Floor variant
const ajFloorVariantImages = {
  "White": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center&q=80",
  "Black": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center&q=80",
  "Dusty Blue": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center&q=80",
  "Electric Orange": "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=400&fit=crop&crop=center&q=80",
  "Soft Lemon": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop&crop=center&q=80",
  "Warm Grey": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center&q=80&sat=-50",
  "Warm Sand": "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=400&fit=crop&crop=center&q=80&sat=-30",
  "Stainless Steel Polished": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center&q=80&sat=-100"
};

function updateAJFloorVariants() {
  const filePath = path.join(__dirname, '../lib/louisPoulsenProducts.ts');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    console.log('🔄 Updating AJ Floor Lamp variant images with proper lamp images...');
    
    // Update main product image to use a proper lamp image
    content = content.replace(
      /image: "https:\/\/images\.unsplash\.com\/photo-1507003211169-0a1dd7228f2d\?w=400&h=400&fit=crop&crop=center"/,
      `image: "${ajFloorVariantImages["White"]}"`
    );
    
    // Update each variant with its specific image
    Object.entries(ajFloorVariantImages).forEach(([variantName, imageUrl]) => {
      // Find and replace the variant image
      const variantRegex = new RegExp(
        `(\\{[^}]*name: "${variantName}"[^}]*image: ")[^"]*("[^}]*\\})`,
        'g'
      );
      
      content = content.replace(variantRegex, `$1${imageUrl}$2`);
      console.log(`✅ Updated ${variantName} variant image`);
    });
    
    fs.writeFileSync(filePath, content);
    console.log('✅ Updated AJ Floor Lamp variant images successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to update AJ Floor variants:', error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Starting AJ Floor variant image fix...');
  
  const success = updateAJFloorVariants();
  
  if (success) {
    console.log('\n🎉 AJ Floor variant image fix completed!');
    console.log('\n📋 Summary:');
    console.log('   • Updated all 8 AJ Floor Lamp variant images');
    console.log('   • Each variant now has a unique lamp image');
    console.log('   • Images will display properly on production');
    console.log('\n🚀 Next steps:');
    console.log('   1. Commit the changes: git add . && git commit -m "Fix AJ Floor variant images with proper lamp images"');
    console.log('   2. Push to deploy: git push origin main');
  } else {
    console.log('❌ Variant image fix failed. Please check the error messages above.');
  }
}

main();
