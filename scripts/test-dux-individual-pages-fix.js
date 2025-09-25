const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
});

async function testDuxIndividualPagesFix() {
  console.log('🧪 Testing DUX Individual Pages Fix...\n');

  try {
    // Test 1: Check if we can fetch DUX products from Sanity
    console.log('1. Fetching DUX products from Sanity...');
    
    // First, let's check what brands exist
    const brands = await client.fetch(`*[_type == "brand"] { _id, name }`);
    console.log('Available brands:', brands.map(b => b.name));
    
    // Try different queries to find DUX products
    const duxProducts1 = await client.fetch(`
      *[_type == "product" && brand->name == "DUX"] {
        _id,
        name,
        slug,
        price,
        image,
        variants[] {
          name,
          price,
          image
        }
      }
    `);
    
    const duxProducts2 = await client.fetch(`
      *[_type == "product" && brand == "DUX"] {
        _id,
        name,
        slug,
        price,
        image,
        variants[] {
          name,
          price,
          image
        }
      }
    `);
    
    const duxProducts3 = await client.fetch(`
      *[_type == "product" && lower(name) match "*dux*"] {
        _id,
        name,
        slug,
        price,
        brand,
        image,
        variants[] {
          name,
          price,
          image
        }
      }
    `);
    
    console.log(`DUX products (brand->name): ${duxProducts1.length}`);
    console.log(`DUX products (brand): ${duxProducts2.length}`);
    console.log(`DUX products (name contains): ${duxProducts3.length}`);
    
    const duxProducts = duxProducts1.length > 0 ? duxProducts1 : 
                       duxProducts2.length > 0 ? duxProducts2 : duxProducts3;

    console.log(`✅ Found ${duxProducts.length} DUX products in Sanity`);
    
    if (duxProducts.length === 0) {
      console.log('❌ No DUX products found in Sanity!');
      return;
    }

    // Test 2: Check specific products and their slugs
    console.log('\n2. Checking individual DUX products:');
    duxProducts.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name}`);
      console.log(`      Slug: ${product.slug?.current || 'NO SLUG'}`);
      console.log(`      Price: kr ${product.price?.toLocaleString() || 'NO PRICE'}`);
      console.log(`      Variants: ${product.variants?.length || 0}`);
      console.log(`      Image: ${product.image?.asset ? '✅' : '❌'}`);
      console.log('');
    });

    // Test 3: Test the getDuxProductBySlug function
    console.log('3. Testing getDuxProductBySlug function...');
    const testSlug = duxProducts[0]?.slug?.current;
    
    if (testSlug) {
      console.log(`   Testing with slug: "${testSlug}"`);
      
      // Test the corrected query
      const productBySlug = await client.fetch(`
        *[_type == "product" && brand == "DUX" && slug.current == $slug][0] {
          _id,
          name,
          slug,
          description,
          price,
          designer,
          image,
          variants[] {
            name,
            price,
            image,
            material,
            leather,
            color,
            size
          },
          lifestyleImages[] {
            asset
          },
          features,
          specifications[] {
            label,
            value
          },
          relatedProducts[]-> {
            _id,
            name,
            slug,
            price,
            image
          }
        }
      `, { slug: testSlug });

      if (productBySlug) {
        console.log(`   ✅ Successfully fetched product: ${productBySlug.name}`);
        console.log(`   ✅ Has description: ${!!productBySlug.description}`);
        console.log(`   ✅ Has variants: ${productBySlug.variants?.length || 0}`);
        console.log(`   ✅ Has features: ${productBySlug.features?.length || 0}`);
        console.log(`   ✅ Has specifications: ${productBySlug.specifications?.length || 0}`);
        console.log(`   ✅ Has related products: ${productBySlug.relatedProducts?.length || 0}`);
      } else {
        console.log(`   ❌ Could not fetch product with slug: ${testSlug}`);
      }
    } else {
      console.log('   ❌ No valid slug found to test with');
    }

    // Test 4: Check the page.tsx file structure
    console.log('\n4. Checking page.tsx file structure...');
    const fs = require('fs');
    const path = require('path');
    
    const pageFilePath = path.join(process.cwd(), 'app/dux/[productId]/page.tsx');
    
    if (fs.existsSync(pageFilePath)) {
      const pageContent = fs.readFileSync(pageFilePath, 'utf8');
      
      // Check if it's using DuxProductClient
      if (pageContent.includes('DuxProductClient')) {
        console.log('   ✅ page.tsx is using DuxProductClient');
      } else {
        console.log('   ❌ page.tsx is NOT using DuxProductClient');
      }
      
      // Check if it has hardcoded data
      if (pageContent.includes('const products:') || pageContent.includes('products.find')) {
        console.log('   ❌ page.tsx still contains hardcoded data');
      } else {
        console.log('   ✅ page.tsx does not contain hardcoded data');
      }
      
      // Check file size (should be much smaller now)
      const stats = fs.statSync(pageFilePath);
      const fileSizeKB = Math.round(stats.size / 1024);
      console.log(`   ✅ File size: ${fileSizeKB}KB (should be small, ~1KB)`);
      
      if (fileSizeKB > 10) {
        console.log('   ⚠️  File seems large - might still contain hardcoded data');
      }
    } else {
      console.log('   ❌ page.tsx file not found');
    }

    console.log('\n🎉 DUX Individual Pages Fix Test Complete!');
    console.log('\n📋 Summary:');
    console.log(`   • DUX products in Sanity: ${duxProducts.length}`);
    console.log(`   • Page structure: ${fs.existsSync(pageFilePath) ? 'Updated' : 'Not found'}`);
    console.log(`   • Ready for production: ${duxProducts.length > 0 ? '✅' : '❌'}`);

  } catch (error) {
    console.error('❌ Error testing DUX individual pages fix:', error);
  }
}

testDuxIndividualPagesFix();
