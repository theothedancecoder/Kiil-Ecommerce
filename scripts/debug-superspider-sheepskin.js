const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
});

async function debugSuperspiderSheepskin() {
  console.log('🔍 Debugging Superspider Sheepskin product...\n');

  try {
    // Test the exact query that getDuxProductBySlug uses
    const product = await client.fetch(`
      *[_type == "product" && slug.current == $slug && brand == "DUX"][0] {
        _id,
        name,
        slug,
        description,
        price,
        designer,
        brand,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          _type,
          name,
          price,
          material,
          color,
          size,
          base,
          leather,
          image {
            asset-> {
              _id,
              url
            }
          }
        },
        lifestyleImages[] {
          asset-> {
            _id,
            url
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
          slug,
          price,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `, { slug: 'superspider-sheepskin' });

    if (!product) {
      console.log('❌ Product not found with slug: superspider-sheepskin');
      
      // Let's search for similar products
      const similarProducts = await client.fetch(`
        *[_type == "product" && brand == "DUX" && lower(name) match "*superspider*"] {
          _id,
          name,
          slug,
          brand
        }
      `);
      
      console.log('🔍 Similar products found:', similarProducts);
      return;
    }

    console.log('✅ Product found:', product.name);
    console.log('📋 Product Details:');
    console.log(`   ID: ${product._id}`);
    console.log(`   Name: ${product.name}`);
    console.log(`   Slug: ${product.slug?.current}`);
    console.log(`   Brand: ${product.brand}`);
    console.log(`   Price: kr ${product.price?.toLocaleString()}`);
    console.log(`   Designer: ${product.designer || 'Not specified'}`);
    
    console.log('\n🖼️  Main Image:');
    if (product.image?.asset?.url) {
      console.log(`   ✅ URL: ${product.image.asset.url}`);
      console.log(`   ✅ Asset ID: ${product.image.asset._id}`);
    } else {
      console.log('   ❌ No main image found');
    }

    console.log('\n🎨 Variants:');
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((variant, index) => {
        console.log(`   ${index + 1}. ${variant.name}`);
        console.log(`      Price: kr ${variant.price?.toLocaleString() || 'N/A'}`);
        console.log(`      Material: ${variant.material || 'N/A'}`);
        console.log(`      Color: ${variant.color || 'N/A'}`);
        console.log(`      Image: ${variant.image?.asset?.url ? '✅ ' + variant.image.asset.url : '❌ No image'}`);
        console.log('');
      });
    } else {
      console.log('   ❌ No variants found');
    }

    console.log('\n🏞️  Lifestyle Images:');
    if (product.lifestyleImages && product.lifestyleImages.length > 0) {
      product.lifestyleImages.forEach((image, index) => {
        console.log(`   ${index + 1}. ${image.asset?.url ? '✅ ' + image.asset.url : '❌ No URL'}`);
      });
    } else {
      console.log('   ❌ No lifestyle images found');
    }

    console.log('\n📝 Features:');
    if (product.features && product.features.length > 0) {
      product.features.forEach((feature, index) => {
        console.log(`   ${index + 1}. ${feature}`);
      });
    } else {
      console.log('   ❌ No features found');
    }

    console.log('\n📊 Specifications:');
    if (product.specifications && product.specifications.length > 0) {
      product.specifications.forEach((spec, index) => {
        console.log(`   ${index + 1}. ${spec.label}: ${spec.value}`);
      });
    } else {
      console.log('   ❌ No specifications found');
    }

    console.log('\n🔗 Related Products:');
    if (product.relatedProducts && product.relatedProducts.length > 0) {
      product.relatedProducts.forEach((related, index) => {
        console.log(`   ${index + 1}. ${related.name} (${related.slug?.current})`);
        console.log(`      Price: kr ${related.price?.toLocaleString() || 'N/A'}`);
        console.log(`      Image: ${related.image?.asset?.url ? '✅ Has image' : '❌ No image'}`);
      });
    } else {
      console.log('   ❌ No related products found');
    }

    // Test image URLs directly
    console.log('\n🧪 Testing Image URLs:');
    if (product.image?.asset?.url) {
      console.log(`   Main image URL: ${product.image.asset.url}`);
    }
    
    if (product.variants) {
      product.variants.forEach((variant, index) => {
        if (variant.image?.asset?.url) {
          console.log(`   Variant ${index + 1} image URL: ${variant.image.asset.url}`);
        }
      });
    }

  } catch (error) {
    console.error('❌ Error debugging Superspider Sheepskin:', error);
  }
}

debugSuperspiderSheepskin();
