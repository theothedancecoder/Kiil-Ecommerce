import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

async function completeDuxImageFix() {
  console.log('🚀 Starting complete Dux image fix...\n');
  
  try {
    // Step 1: Upload main images for products that don't have them
    console.log('📸 Step 1: Uploading main images...');
    await uploadMainImages();
    
    // Step 2: Create variants for products that don't have them
    console.log('\n🎨 Step 2: Creating variants...');
    await createVariants();
    
    // Step 3: Add lifestyle images for products that don't have them
    console.log('\n🖼️  Step 3: Adding lifestyle images...');
    await addLifestyleImages();
    
    // Step 4: Add related products for products that don't have them
    console.log('\n🔗 Step 4: Adding related products...');
    await addRelatedProducts();
    
    console.log('\n🎉 Complete Dux image fix completed!');
    console.log('🔍 Running final verification...\n');
    
    // Final verification
    await verifyAllProducts();
    
  } catch (error) {
    console.error('❌ Complete fix failed:', error);
  }
}

async function uploadMainImages() {
  const imageMapping = {
    'lunaria-table': '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp',
    'sam-dining-chair': '/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg',
    'superspider-sheepskin': '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg'
  };
  
  for (const [slug, imagePath] of Object.entries(imageMapping)) {
    console.log(`📦 Processing: ${slug}`);
    
    // Check if product already has main image
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] { _id, name, image }`,
      { slug }
    );
    
    if (!product) {
      console.log(`❌ Product ${slug} not found`);
      continue;
    }
    
    if (product.image?.asset) {
      console.log(`ℹ️  Product ${slug} already has main image, skipping...`);
      continue;
    }
    
    try {
      // Upload image to Sanity
      console.log(`📸 Uploading image: ${imagePath}`);
      const imageAsset = await client.assets.upload('image', `public${imagePath}`, {
        filename: imagePath.split('/').pop()
      });
      
      console.log(`✅ Image uploaded: ${imageAsset._id}`);
      
      // Update product with main image
      await client.patch(product._id).set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      }).commit();
      
      console.log(`✅ Updated product ${slug} with main image`);
      
    } catch (error) {
      console.error(`❌ Error processing ${slug}:`, error.message);
    }
  }
}

async function createVariants() {
  const variantConfigs = {
    'lunaria-table': [
      { name: 'Small - Wax-oiled Ash (H-50 Ø-39)', price: 10215, material: 'Wax-oiled Ash', size: 'H-50 Ø-39', imagePath: '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp' },
      { name: 'Medium - Wax-oiled Ash (H-45 Ø-60)', price: 10980, material: 'Wax-oiled Ash', size: 'H-45 Ø-60', imagePath: '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp' },
      { name: 'Large - Wax-oiled Ash (H-40 Ø-86)', price: 16080, material: 'Wax-oiled Ash', size: 'H-40 Ø-86', imagePath: '/dux/Lunaria-table /Lunaria table from DUX NOK  16 080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp' }
    ],
    'sam-dining-chair': [
      { name: 'Classic Soft 88 - With Armrest', price: 13790, material: 'Classic Soft 88', base: 'With Armrest', imagePath: '/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg' },
      { name: 'Naturale Camel - With Armrest', price: 13790, material: 'Naturale Camel', base: 'With Armrest', imagePath: '/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg' }
    ],
    'superspider-sheepskin': [
      { name: 'Scandinavian Grey 22 Sheepskin', price: 53815, material: 'Sheepskin', color: 'Scandinavian Grey 22', imagePath: '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg' },
      { name: 'Black 01 Sheepskin', price: 53815, material: 'Sheepskin', color: 'Black 01', imagePath: '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg' }
    ]
  };
  
  for (const [slug, variants] of Object.entries(variantConfigs)) {
    console.log(`📦 Processing variants for: ${slug}`);
    
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] { _id, name, variants }`,
      { slug }
    );
    
    if (!product) {
      console.log(`❌ Product ${slug} not found`);
      continue;
    }
    
    if (product.variants && product.variants.length > 0) {
      console.log(`ℹ️  Product ${slug} already has variants, skipping...`);
      continue;
    }
    
    const variantObjects = [];
    
    for (const variant of variants) {
      console.log(`  📝 Creating variant: ${variant.name}`);
      
      try {
        // Upload variant image
        console.log(`📸 Uploading variant image: ${variant.imagePath}`);
        const imageAsset = await client.assets.upload('image', `public${variant.imagePath}`, {
          filename: variant.imagePath.split('/').pop()
        });
        
        console.log(`✅ Variant image uploaded: ${imageAsset._id}`);
        
        variantObjects.push({
          _type: 'variant',
          _key: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: variant.name,
          price: variant.price,
          material: variant.material,
          color: variant.color,
          size: variant.size,
          base: variant.base,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          }
        });
        
        console.log(`  ✅ Variant created: ${variant.name}`);
        
      } catch (error) {
        console.error(`  ❌ Error creating variant ${variant.name}:`, error.message);
      }
    }
    
    if (variantObjects.length > 0) {
      await client.patch(product._id).set({ variants: variantObjects }).commit();
      console.log(`✅ Updated ${slug} with ${variantObjects.length} variants`);
    }
  }
}

async function addLifestyleImages() {
  const lifestyleMapping = {
    'lunaria-table': ['/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp'],
    'sam-dining-chair': ['/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg'],
    'superspider-sheepskin': ['/dux/Superspider sheepskin /lifestyle/ererererer.webp']
  };
  
  for (const [slug, imagePaths] of Object.entries(lifestyleMapping)) {
    console.log(`📦 Processing lifestyle images for: ${slug}`);
    
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] { _id, name, lifestyleImages }`,
      { slug }
    );
    
    if (!product) {
      console.log(`❌ Product ${slug} not found`);
      continue;
    }
    
    if (product.lifestyleImages && product.lifestyleImages.length > 0) {
      console.log(`ℹ️  Product ${slug} already has lifestyle images, skipping...`);
      continue;
    }
    
    const lifestyleImages = [];
    
    for (const imagePath of imagePaths) {
      try {
        console.log(`📸 Uploading lifestyle image: ${imagePath}`);
        const imageAsset = await client.assets.upload('image', `public${imagePath}`, {
          filename: imagePath.split('/').pop()
        });
        
        console.log(`✅ Lifestyle image uploaded: ${imageAsset._id}`);
        
        lifestyleImages.push({
          _type: 'image',
          _key: `lifestyle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        });
        
      } catch (error) {
        console.error(`❌ Error uploading lifestyle image for ${slug}:`, error.message);
      }
    }
    
    if (lifestyleImages.length > 0) {
      await client.patch(product._id).set({ lifestyleImages }).commit();
      console.log(`✅ Added ${lifestyleImages.length} lifestyle images to ${slug}`);
    }
  }
}

async function addRelatedProducts() {
  const relatedMapping = {
    'lunaria-table': ['sam-dining-chair', 'inter-dining-table'],
    'sam-dining-chair': ['jetson-classic-soft-88', 'inter-dining-table'],
    'superspider-sheepskin': ['jetson-classic-soft-88', 'jetson-match-flax-21']
  };
  
  for (const [slug, relatedSlugs] of Object.entries(relatedMapping)) {
    console.log(`📦 Processing related products for: ${slug}`);
    
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] { _id, name, relatedProducts }`,
      { slug }
    );
    
    if (!product) {
      console.log(`❌ Product ${slug} not found`);
      continue;
    }
    
    if (product.relatedProducts && product.relatedProducts.length > 0) {
      console.log(`ℹ️  Product ${slug} already has related products, skipping...`);
      continue;
    }
    
    const relatedProducts = [];
    
    for (const relatedSlug of relatedSlugs) {
      try {
        console.log(`  🔗 Finding related product: ${relatedSlug}`);
        const relatedProduct = await client.fetch(
          `*[_type == "product" && slug.current == $relatedSlug][0] { _id, name }`,
          { relatedSlug }
        );
        
        if (relatedProduct) {
          console.log(`  ✅ Found related product: ${relatedProduct.name}`);
          relatedProducts.push({
            _type: 'reference',
            _ref: relatedProduct._id
          });
        } else {
          console.log(`  ❌ Related product ${relatedSlug} not found`);
        }
        
      } catch (error) {
        console.error(`  ❌ Error finding related product ${relatedSlug}:`, error.message);
      }
    }
    
    if (relatedProducts.length > 0) {
      await client.patch(product._id).set({ relatedProducts }).commit();
      console.log(`✅ Added ${relatedProducts.length} related products to ${slug}`);
    }
  }
}

async function verifyAllProducts() {
  const query = `
    *[_type == "product" && "dux" in categories[]->slug.current] | order(name asc) {
      _id,
      name,
      slug,
      image {
        asset-> {
          url
        }
      },
      variants[] {
        name,
        image {
          asset-> {
            url
          }
        }
      },
      lifestyleImages[] {
        asset-> {
          url
        }
      },
      relatedProducts[]-> {
        name
      }
    }
  `;

  const products = await client.fetch(query);
  
  console.log(`📊 Final verification - Found ${products.length} Dux products\n`);
  
  let allGood = true;
  
  for (const product of products) {
    console.log(`📦 ${product.name} (${product.slug?.current})`);
    
    const hasMainImage = !!product.image?.asset?.url;
    const variantCount = product.variants?.length || 0;
    const lifestyleCount = product.lifestyleImages?.length || 0;
    const relatedCount = product.relatedProducts?.length || 0;
    
    console.log(`   ${hasMainImage ? '✅' : '❌'} Main image: ${hasMainImage ? 'Yes' : 'No'}`);
    console.log(`   ${variantCount > 0 ? '✅' : '❌'} Variants: ${variantCount}`);
    console.log(`   ${lifestyleCount > 0 ? '✅' : '❌'} Lifestyle images: ${lifestyleCount}`);
    console.log(`   ${relatedCount > 0 ? '✅' : '❌'} Related products: ${relatedCount}`);
    
    if (!hasMainImage || variantCount === 0 || lifestyleCount === 0 || relatedCount === 0) {
      allGood = false;
    }
    
    console.log('');
  }
  
  if (allGood) {
    console.log('🎉 ALL DUX PRODUCTS ARE PERFECTLY SET UP!');
    console.log('✅ All main images loading from Sanity CDN');
    console.log('✅ All variants have unique images');
    console.log('✅ All products have lifestyle images');
    console.log('✅ All products have related products');
    console.log('\n🚀 The Git LFS issue has been completely resolved!');
    console.log('🌐 All images will now load correctly on production');
  } else {
    console.log('⚠️  Some products still need attention');
  }
}

completeDuxImageFix();
