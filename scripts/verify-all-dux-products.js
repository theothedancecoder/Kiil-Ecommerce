const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
});

async function verifyAllDuxProducts() {
  console.log('🔍 Verifying all DUX products...\n');

  try {
    // Get all DUX products with detailed information
    const duxProducts = await client.fetch(`
      *[_type == "product" && brand == "DUX"] | order(name asc) {
        _id,
        name,
        slug,
        price,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          name,
          price,
          image {
            asset-> {
              _id,
              url
            }
          }
        },
        features,
        specifications[] {
          label,
          value
        },
        relatedProducts[]-> {
          _id,
          name,
          slug
        }
      }
    `);

    console.log(`✅ Found ${duxProducts.length} DUX products\n`);

    // Check for duplicates
    const productNames = {};
    const duplicates = [];
    
    duxProducts.forEach(product => {
      if (productNames[product.name]) {
        duplicates.push(product.name);
      } else {
        productNames[product.name] = true;
      }
    });

    if (duplicates.length > 0) {
      console.log('⚠️  Duplicate products found:');
      duplicates.forEach(name => console.log(`   - ${name}`));
      console.log('');
    }

    // Verify each product
    for (const product of duxProducts) {
      console.log(`📋 ${product.name}`);
      console.log(`   Slug: ${product.slug?.current || 'NO SLUG'}`);
      console.log(`   Price: kr ${product.price?.toLocaleString() || 'NO PRICE'}`);
      
      // Check main image
      if (product.image?.asset?.url) {
        if (product.image.asset.url.includes('placeholder-for-')) {
          console.log(`   ❌ Main image is placeholder: ${product.image.asset.url}`);
        } else {
          console.log(`   ✅ Main image: ${product.image.asset.url.substring(0, 50)}...`);
        }
      } else {
        console.log(`   ❌ No main image`);
      }

      // Check variants
      if (product.variants && product.variants.length > 0) {
        console.log(`   🎨 Variants: ${product.variants.length}`);
        let placeholderCount = 0;
        let validImageCount = 0;
        
        product.variants.forEach(variant => {
          if (variant.image?.asset?.url) {
            if (variant.image.asset.url.includes('placeholder-for-')) {
              placeholderCount++;
            } else {
              validImageCount++;
            }
          }
        });
        
        if (placeholderCount > 0) {
          console.log(`   ❌ ${placeholderCount} variants with placeholder images`);
        }
        if (validImageCount > 0) {
          console.log(`   ✅ ${validImageCount} variants with valid images`);
        }
      } else {
        console.log(`   ⚠️  No variants`);
      }

      // Check features and specifications
      console.log(`   📝 Features: ${product.features?.length || 0}`);
      console.log(`   📊 Specifications: ${product.specifications?.length || 0}`);
      console.log(`   🔗 Related products: ${product.relatedProducts?.length || 0}`);
      
      console.log('');
    }

    // Summary
    const uniqueProducts = Object.keys(productNames).length;
    console.log(`📊 Summary:`);
    console.log(`   Total products: ${duxProducts.length}`);
    console.log(`   Unique products: ${uniqueProducts}`);
    console.log(`   Duplicates: ${duxProducts.length - uniqueProducts}`);

    // Test a few product URLs
    console.log('\n🌐 Testing product URLs:');
    const testProducts = duxProducts.slice(0, 3);
    
    for (const product of testProducts) {
      if (product.slug?.current) {
        const url = `https://kiil-ecommerce.vercel.app/dux/${product.slug.current}`;
        console.log(`   ${product.name}: ${url}`);
      }
    }

  } catch (error) {
    console.error('❌ Error verifying DUX products:', error);
  }
}

verifyAllDuxProducts();
