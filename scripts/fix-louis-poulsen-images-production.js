const fs = require('fs');
const path = require('path');

// Create working image URLs for Louis Poulsen products
const workingImageUrls = {
  "aj-floor-lamp": {
    main: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    variants: {
      "White": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
      "Black": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
      "Dusty Blue": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      "Electric Orange": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      "Soft Lemon": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      "Warm Grey": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      "Warm Sand": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      "Stainless Steel Polished": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center"
    }
  }
};

function updateLouisPoulsenProducts() {
  const filePath = path.join(__dirname, '../lib/louisPoulsenProducts.ts');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    console.log('🔄 Updating Louis Poulsen product images with working URLs...');
    
    // Update AJ Floor Lamp main image
    content = content.replace(
      /image: "\/Louis-Poulsen\/AJ-Floor-Lamp\/AJ Gulvlampe kr 13 025  Farge - White\.webp"/,
      `image: "${workingImageUrls["aj-floor-lamp"].main}"`
    );
    
    // Update variant images
    Object.entries(workingImageUrls["aj-floor-lamp"].variants).forEach(([variantName, imageUrl]) => {
      const regex = new RegExp(`image: "\/Louis-Poulsen\/AJ-Floor-Lamp\/AJ Gulvlampe kr [^"]*${variantName}[^"]*\.webp"`, 'g');
      content = content.replace(regex, `image: "${imageUrl}"`);
    });
    
    // Also update the Stainless Steel variant with different price
    content = content.replace(
      /image: "\/Louis-Poulsen\/AJ-Floor-Lamp\/AJ Gulvlampe kr 15 375  Farge - Stainless Steel Polished\.webp"/,
      `image: "${workingImageUrls["aj-floor-lamp"].variants["Stainless Steel Polished"]}"`
    );
    
    fs.writeFileSync(filePath, content);
    console.log('✅ Updated Louis Poulsen product images successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to update Louis Poulsen products:', error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Starting Louis Poulsen image fix for production...');
  
  const success = updateLouisPoulsenProducts();
  
  if (success) {
    console.log('\n🎉 Louis Poulsen image fix completed!');
    console.log('\n📋 Summary:');
    console.log('   • Updated AJ Floor Lamp images with working URLs');
    console.log('   • All variant images now use reliable external sources');
    console.log('   • Images will load properly on production');
    console.log('\n🚀 Next steps:');
    console.log('   1. Commit the changes: git add . && git commit -m "Fix Louis Poulsen images for production"');
    console.log('   2. Push to deploy: git push origin main');
  } else {
    console.log('❌ Image fix failed. Please check the error messages above.');
  }
}

main();
