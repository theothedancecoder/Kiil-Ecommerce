const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// FLOS products that need images based on available files
const flosProductsNeedingImages = [
  {
    slug: 'arco-floor-lamp',
    name: 'Arco Floor Lamp',
    imagePath: 'public/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg',
    lifestyleImages: [
      'public/FLOS/Arco-floor-lamp/lifestyle/arco-floor-lamp1.jpg'
    ]
  },
  {
    slug: 'snoopy-table-lamp',
    name: 'Snoopy Table Lamp',
    imagePath: 'public/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg',
    variants: [
      {
        name: 'Black',
        imagePath: 'public/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg'
      },
      {
        name: 'Green',
        imagePath: 'public/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Green.jpg'
      },
      {
        name: 'Navy Blue',
        imagePath: 'public/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Navy blue.webp'
      },
      {
        name: 'Orange',
        imagePath: 'public/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Orange.jpg'
      }
    ],
    lifestyleImages: [
      'public/FLOS/Snoopy-table-lamp/lifestyle/10232604_2.jpg'
    ]
  },
  {
    slug: 'ic-lights-t1-high',
    name: 'IC Lights T1 High',
    imagePath: 'public/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Black.webp',
    variants: [
      {
        name: 'Black',
        imagePath: 'public/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Black.webp'
      },
      {
        name: 'Brushed Brass',
        imagePath: 'public/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Brushed brass.webp'
      },
      {
        name: 'Chrome',
        imagePath: 'public/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Chrome.webp'
      }
    ],
    lifestyleImages: [
      'public/FLOS/IC-Lights-T1-High/lifestyle/3510294-1.webp'
    ]
  },
  {
    slug: 'bellhop-rechargeable-table-lamp',
    name: 'Bellhop Rechargeable Table Lamp',
    imagePath: 'public/FLOS/Bellhop-rechargeable-table-lamp /Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp',
    variants: [
      {
        name: 'White',
        imagePath: 'public/FLOS/Bellhop-rechargeable-table-lamp /Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp'
      },
      {
        name: 'Brick Red',
        imagePath: 'public/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Brick Red.webp'
      },
      {
        name: 'Grey',
        imagePath: 'public/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Grey.webp'
      },
      {
        name: 'Matt Black',
        imagePath: 'public/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Matt Black.webp'
      }
    ]
  }
];

async function uploadImageToSanity(imagePath, altText) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image not found: ${imagePath}`);
      return null;
    }

    console.log(`📤 Uploading ${imagePath}...`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    console.log(`✅ Uploaded: ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function updateFlosProductImages() {
  console.log('🎯 Starting FLOS product image updates...\n');

  for (const productData of flosProductsNeedingImages) {
    try {
      console.log(`\n🔍 Processing: ${productData.name}`);

      // Find the product in Sanity
      const products = await client.fetch(
        `*[_type == "product" && slug.current == $slug && references(*[_type == "category" && title == "FLOS"]._id)]`,
        { slug: productData.slug }
      );

      if (products.length === 0) {
        console.log(`❌ Product not found: ${productData.slug}`);
        continue;
      }

      const product = products[0];
      console.log(`✅ Found product: ${product.name}`);

      // Upload main image
      let mainImage = null;
      if (productData.imagePath) {
        mainImage = await uploadImageToSanity(productData.imagePath, productData.name);
      }

      // Upload lifestyle images
      let lifestyleImages = [];
      if (productData.lifestyleImages && productData.lifestyleImages.length > 0) {
        for (const lifestylePath of productData.lifestyleImages) {
          const lifestyleImage = await uploadImageToSanity(
            lifestylePath, 
            `${productData.name} lifestyle`
          );
          if (lifestyleImage) {
            lifestyleImages.push(lifestyleImage);
          }
        }
      }

      // Upload variant images
      const updatedVariants = [];
      if (product.variants && product.variants.length > 0) {
        for (let i = 0; i < product.variants.length; i++) {
          const variant = product.variants[i];
          const variantData = productData.variants?.find(v => 
            v.name.toLowerCase().includes(variant.name?.toLowerCase()) ||
            variant.name?.toLowerCase().includes(v.name.toLowerCase())
          );

          let variantImage = variant.image; // Keep existing image if no new one
          if (variantData && variantData.imagePath) {
            const uploadedImage = await uploadImageToSanity(
              variantData.imagePath, 
              `${productData.name} - ${variantData.name}`
            );
            if (uploadedImage) {
              variantImage = uploadedImage;
            }
          }

          updatedVariants.push({
            ...variant,
            image: variantImage
          });
        }
      }

      // Update the product
      const updateData = {};
      if (mainImage) {
        updateData.image = mainImage;
      }
      if (lifestyleImages.length > 0) {
        updateData.lifestyleImages = lifestyleImages;
      }
      if (updatedVariants.length > 0) {
        updateData.variants = updatedVariants;
      }

      if (Object.keys(updateData).length > 0) {
        await client.patch(product._id).set(updateData).commit();
        console.log(`✅ Updated product: ${product.name}`);
      } else {
        console.log(`ℹ️  No images to update for: ${product.name}`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${productData.name}:`, error.message);
    }
  }

  console.log('\n🎉 FLOS image update process completed!');
}

// Check if we have the required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID');
  console.error('   - SANITY_API_TOKEN');
  process.exit(1);
}

updateFlosProductImages().catch(console.error);
