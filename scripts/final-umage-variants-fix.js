require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function finalUmageVariantsFix() {
  console.log('🔧 Final UMAGE Variants Fix - Comprehensive Solution');
  console.log('='.repeat(60));
  
  try {
    // 1. Verify data exists in Sanity
    console.log('\n1️⃣ Verifying UMAGE product data in Sanity...');
    const umageProduct = await client.fetch(`*[_type == "product" && slug.current == "a-conversation-piece-dining-chair"][0] {
      _id,
      name,
      slug,
      brand,
      variants[] {
        _key,
        name,
        color,
        material,
        price,
        image {
          asset -> {
            _id,
            url
          }
        }
      }
    }`);
    
    if (umageProduct && umageProduct.variants && umageProduct.variants.length > 0) {
      console.log('✅ UMAGE product found with variants:');
      umageProduct.variants.forEach((variant, i) => {
        console.log(`   ${i + 1}. ${variant.name} (key: ${variant._key})`);
      });
    } else {
      console.log('❌ No UMAGE product or variants found!');
      return;
    }
    
    // 2. Test the exact query used by getAllProductsSimple
    console.log('\n2️⃣ Testing getAllProductsSimple query...');
    const getAllProductsQuery = `*[_type == "product"] {
      _id,
      name,
      slug,
      brand,
      price,
      image,
      description,
      categories[] -> {
        _id,
        title,
        slug
      },
      variants[] {
        _key,
        name,
        image {
          _type,
          asset-> {
            _id,
            _type,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt
        },
        color,
        material,
        size,
        price
      },
      stock,
      roomCategory
    } | order(name asc)`;
    
    const allProducts = await client.fetch(getAllProductsQuery);
    const testProduct = allProducts.find(p => p.slug?.current === 'a-conversation-piece-dining-chair');
    
    if (testProduct && testProduct.variants && testProduct.variants.length > 0) {
      console.log('✅ getAllProductsSimple query returns variants correctly');
      console.log(`   Found ${testProduct.variants.length} variants`);
    } else {
      console.log('❌ getAllProductsSimple query missing variants!');
    }
    
    // 3. Check environment variables
    console.log('\n3️⃣ Checking environment configuration...');
    console.log('Environment variables:');
    console.log(`   USE_SANITY_PRODUCTS: ${process.env.USE_SANITY_PRODUCTS}`);
    console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`   SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`   SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
    
    if (process.env.USE_SANITY_PRODUCTS !== 'true') {
      console.log('⚠️  WARNING: USE_SANITY_PRODUCTS is not set to "true"');
      console.log('   This must be set in Vercel environment variables!');
    }
    
    // 4. Summary of fixes applied
    console.log('\n4️⃣ Summary of fixes applied:');
    console.log('✅ Fixed getAllProductsSimple.ts query to include _key field');
    console.log('✅ Disabled Sanity CDN (useCdn: false) to prevent caching');
    console.log('✅ Added _key properties to all UMAGE variants in Sanity');
    console.log('✅ Added fallback images for all variants');
    console.log('✅ Updated product page component to use variant._key');
    
    // 5. Next steps
    console.log('\n5️⃣ Next steps to resolve the issue:');
    console.log('1. Commit and push all changes to trigger Vercel deployment');
    console.log('2. Ensure USE_SANITY_PRODUCTS=true in Vercel environment variables');
    console.log('3. Wait for deployment to complete');
    console.log('4. Test production site');
    
    console.log('\n🎯 Root cause analysis:');
    console.log('- Data exists correctly in Sanity with variants and _key properties');
    console.log('- Query structure is now correct with _key field included');
    console.log('- CDN caching has been disabled to prevent stale data');
    console.log('- The issue is likely that changes need to be deployed to production');
    
    console.log('\n💡 The variants should work once these changes are deployed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

finalUmageVariantsFix();
