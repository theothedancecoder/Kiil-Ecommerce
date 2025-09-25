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

// FLOS products that need images
const flosProductsNeedingImages = [
  {
    slug: 'parentesi-suspension',
    name: 'Parentesi Suspension',
    imagePath: 'public/FLOS/Parentesi-Suspension.jpg',
    variants: [
      {
        name: 'Black',
        imagePath: 'public/FLOS/Parentesi-Suspension-Black.jpg'
      },
      {
        name: 'White',
        imagePath: 'public/FLOS/Parentesi-Suspension-White.jpg'
      }
    ]
  },
  {
    slug: 'arco-floor-lamp',
    name: 'Arco Floor Lamp',
    imagePath: 'public/FLOS/Arco-Floor-Lamp.jpg',
    variants: []
  },
  {
    slug: 'snoopy-table-lamp',
    name: 'Snoopy Table Lamp',
    imagePath: 'public/FLOS/Snoopy-Table-Lamp.jpg',
    variants: [
      {
        name: 'Black',
        imagePath: 'public/FLOS/Snoopy-Table-Lamp-Black.jpg'
      },
      {
        name: 'White',
        imagePath: 'public/FLOS/Snoopy-Table-Lamp-White.jpg'
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

      // Upload variant images
      const updatedVariants = [];
      if (product.variants && product.variants.length > 0) {
        for (let i = 0; i < product.variants.length; i++) {
          const variant = product.variants[i];
          const variantData = productData.variants.find(v => 
            v.name.toLowerCase() === variant.name?.toLowerCase()
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
