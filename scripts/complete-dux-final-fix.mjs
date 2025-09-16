import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

const duxProductsData = [
  {
    slug: 'inter-dining-table',
    name: 'Inter Dining Table',
    mainImage: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp',
    lifestyleImages: ['/dux/Inter-dining-table/lifestyle/inter3.webp'],
    variants: [
      {
        name: 'Ø-110 White Laminate',
        price: 19490,
        image: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp'
      },
      {
        name: 'Ø-110 Black Laminate', 
        price: 19490,
        image: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 sort laminat.jpg'
      },
      {
        name: '100×180 White Laminate',
        price: 26440,
        image: '/dux/Inter-dining-table/Inter dining table from DUX NOK  26,440  Variants -  100x180 white laminate.jpg'
      },
      {
        name: '100×180 Black Laminate',
        price: 26440,
        image: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 26 440  Varianter - 100x180 sort laminat.webp'
      },
      {
        name: '100×180 White w/2 Insert Panels',
        price: 45990,
        image: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 hvit laminat m:2 illeggsplater.webp'
      },
      {
        name: '100×180 Black w/2 Insert Panels',
        price: 45990,
        image: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 sort laminat m:2 illeggsplater.webp'
      }
    ]
  },
  {
    slug: 'jetson-classic-soft-88',
    name: 'Jetson Classic Soft 88',
    mainImage: '/dux/Jetson Classic soft 88/classic soft 88 black.jpg',
    lifestyleImages: ['/dux/Jetson Classic soft 88/classic soft 88 black.jpg'],
    variants: [
      {
        name: 'Classic Soft 88 Black',
        price: 27990,
        image: '/dux/Jetson Classic soft 88/classic soft 88 black.jpg'
      },
      {
        name: 'Classic Soft 25 Brown',
        price: 27990,
        image: '/dux/Jetson Classic soft 88/classic soft 25 brown.jpg'
      }
    ]
  },
  {
    slug: 'jetson-match-flax-21',
    name: 'Jetson Match Flax 21',
    mainImage: '/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg',
    lifestyleImages: [
      '/dux/Jetson-Match-Flax-21/lifestyle/dux-flax2-scaled-1.jpg',
      '/dux/Jetson-Match-Flax-21/lifestyle/dux-flax3-scaled-1.jpg'
    ],
    variants: [
      {
        name: 'Flax 21 with Dakota 88 Black',
        price: 27990,
        image: '/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg'
      },
      {
        name: 'Flax 21 with Dakota 29 Cognac',
        price: 27990,
        image: '/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg'
      },
      {
        name: 'Flax 21 with Dakota 24',
        price: 27990,
        image: '/dux/Jetson-Match-Flax-21/Jetson Match Flax-dakota 24 leather: 21 NOK  27,990.webp'
      }
    ]
  }
];

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = `public${imagePath}`;
    
    if (!fs.existsSync(fullPath)) {
      console.log(`   ❌ File not found: ${fullPath}`);
      return null;
    }
    
    console.log(`   📸 Uploading: ${imagePath}`);
    const imageBuffer = fs.readFileSync(fullPath);
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    });
    
    console.log(`   ✅ Uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function completeDuxFinalFix() {
  console.log('🔧 Complete Dux final fix - rebuilding products with proper images...');
  
  try {
    // Get Dux category
    const duxCategory = await client.fetch('*[_type == "category" && slug.current == "dux"][0]');
    if (!duxCategory) {
      console.error('❌ Dux category not found');
      return;
    }

    for (const productData of duxProductsData) {
      console.log(`\n📦 Processing: ${productData.name}`);
      
      // Get existing product
      const existingProduct = await client.fetch(
        '*[_type == "product" && slug.current == $slug][0]',
        { slug: productData.slug }
      );
      
      if (!existingProduct) {
        console.log(`   ❌ Product not found: ${productData.slug}`);
        continue;
      }
      
      console.log(`   📝 Found existing product: ${existingProduct._id}`);
      
      // Upload main image
      const mainImageAssetId = await uploadImageToSanity(productData.mainImage);
      
      // Upload lifestyle images
      const lifestyleImageAssets = [];
      for (const lifestyleImage of productData.lifestyleImages) {
        const assetId = await uploadImageToSanity(lifestyleImage);
        if (assetId) {
          lifestyleImageAssets.push({
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId
            }
          });
        }
      }
      
      // Upload variant images and create variants
      const variants = [];
      for (const variantData of productData.variants) {
        const variantImageAssetId = await uploadImageToSanity(variantData.image);
        
        variants.push({
          _type: 'variant',
          _key: `variant-${variants.length}`,
          name: variantData.name,
          price: variantData.price,
          material: variantData.material || 'Standard',
          color: variantData.color || 'Standard',
          size: variantData.size || 'Standard',
          image: variantImageAssetId ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: variantImageAssetId
            }
          } : null
        });
      }
      
      // Update the product with all new data
      const updateData = {};
      
      if (mainImageAssetId) {
        updateData.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mainImageAssetId
          }
        };
      }
      
      if (lifestyleImageAssets.length > 0) {
        updateData.lifestyleImages = lifestyleImageAssets;
      }
      
      if (variants.length > 0) {
        updateData.variants = variants;
      }
      
      await client.patch(existingProduct._id).set(updateData).commit();
      
      console.log(`   ✅ Updated ${productData.name}:`);
      console.log(`      📸 Main image: ${mainImageAssetId ? '✅' : '❌'}`);
      console.log(`      🎨 Variants: ${variants.length}`);
      console.log(`      🏠 Lifestyle: ${lifestyleImageAssets.length}`);
    }
    
    console.log('\n🎉 Complete Dux final fix completed!');
    
    // Verify final state
    const finalProducts = await client.fetch(`
      *[_type == "product" && "dux" in categories[]->slug.current] | order(name asc) {
        _id,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        },
        variants[] {
          name,
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
        }
      }
    `);
    
    console.log('\n📊 Final verification:');
    finalProducts.forEach(product => {
      const hasMainImage = product.image?.asset?.url && product.image.asset.url.includes('cdn.sanity.io');
      const variantsWithImages = product.variants?.filter(v => v.image?.asset?.url && v.image.asset.url.includes('cdn.sanity.io')).length || 0;
      const lifestyleCount = product.lifestyleImages?.length || 0;
      
      console.log(`   ${product.name}:`);
      console.log(`      📸 Main: ${hasMainImage ? '✅' : '❌'}`);
      console.log(`      🎨 Variants: ${variantsWithImages}/${product.variants?.length || 0}`);
      console.log(`      🏠 Lifestyle: ${lifestyleCount}`);
      
      if (hasMainImage) {
        console.log(`      🔗 Main URL: ${product.image.asset.url}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error in complete fix:', error);
    process.exit(1);
  }
}

completeDuxFinalFix();
