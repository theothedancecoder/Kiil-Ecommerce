const { createClient } = require('@sanity/client');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Load static products with TypeScript handling
let allProducts;
try {
  // Try different ways to load the static products
  allProducts = require('../lib/allProducts.ts').allProducts || require('../lib/allProducts.ts').default || require('../lib/allProducts.ts');
  if (Array.isArray(allProducts.allProducts)) {
    allProducts = allProducts.allProducts;
  }
} catch (error) {
  console.error('❌ Failed to load static products:', error.message);
  console.log('💡 Make sure lib/allProducts.ts exists and exports allProducts array');
  process.exit(1);
}

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-13',
  useCdn: false,
});

// Brands that are already migrated
const MIGRATED_BRANDS = ['UMAGE', 'FLOS', 'Fredericia'];

async function verifyMigrationStatus() {
  console.log('🔍 Checking migration status...\n');

  try {
    // Get all products from Sanity
    const sanityProducts = await client.fetch(`
      *[_type == "product"] {
        _id,
        name,
        brand,
        image,
        variants,
        lifestyleImages
      }
    `);

    console.log(`📊 Found ${sanityProducts.length} products in Sanity\n`);

    // Group by brand
    const sanityByBrand = {};
    sanityProducts.forEach(product => {
      if (!sanityByBrand[product.brand]) {
        sanityByBrand[product.brand] = [];
      }
      sanityByBrand[product.brand].push(product);
    });

    // Group static products by brand
    const staticByBrand = {};
    allProducts.forEach(product => {
      if (!staticByBrand[product.brand]) {
        staticByBrand[product.brand] = [];
      }
      staticByBrand[product.brand].push(product);
    });

    console.log('📈 Migration Status by Brand:');
    console.log('='.repeat(50));

    const allBrands = [...new Set([...Object.keys(staticByBrand), ...Object.keys(sanityByBrand)])].sort();
    
    let totalStatic = 0;
    let totalMigrated = 0;
    let totalMissing = 0;

    for (const brand of allBrands) {
      const staticCount = staticByBrand[brand]?.length || 0;
      const sanityCount = sanityByBrand[brand]?.length || 0;
      const isMigrated = MIGRATED_BRANDS.includes(brand);
      
      totalStatic += staticCount;
      totalMigrated += sanityCount;
      
      let status = '';
      if (isMigrated) {
        status = '✅ COMPLETE (Pre-migrated)';
      } else if (sanityCount >= staticCount && staticCount > 0) {
        status = '✅ COMPLETE';
      } else if (sanityCount > 0 && staticCount > 0) {
        status = `🔄 PARTIAL (${sanityCount}/${staticCount})`;
        totalMissing += (staticCount - sanityCount);
      } else if (staticCount > 0) {
        status = '❌ PENDING';
        totalMissing += staticCount;
      } else if (sanityCount > 0) {
        status = '✅ SANITY ONLY';
      }

      console.log(`${brand.padEnd(20)} | Static: ${staticCount.toString().padStart(3)} | Sanity: ${sanityCount.toString().padStart(3)} | ${status}`);
    }

    console.log('='.repeat(50));
    console.log(`📊 SUMMARY:`);
    console.log(`   Total Static Products: ${totalStatic}`);
    console.log(`   Total in Sanity: ${totalMigrated}`);
    console.log(`   Still Missing: ${totalMissing}`);
    
    if (totalMissing === 0) {
      console.log('\n🎉 All products have been migrated to Sanity!');
      console.log('💡 You can now set USE_SANITY_PRODUCTS=true');
    } else {
      console.log(`\n⚠️  ${totalMissing} products still need migration`);
      console.log('💡 Run: node scripts/migrate-remaining-static-products.js');
    }

    // Check for products with missing images
    console.log('\n🖼️  Checking for products with missing images...');
    const productsWithoutImages = sanityProducts.filter(product => !product.image);
    
    if (productsWithoutImages.length > 0) {
      console.log(`⚠️  Found ${productsWithoutImages.length} products without main images:`);
      productsWithoutImages.forEach(product => {
        console.log(`   - ${product.name} (${product.brand})`);
      });
    } else {
      console.log('✅ All products have main images');
    }

  } catch (error) {
    console.error('❌ Error checking migration status:', error.message);
  }
}

// Run verification
if (require.main === module) {
  verifyMigrationStatus().catch(console.error);
}

module.exports = { verifyMigrationStatus };
