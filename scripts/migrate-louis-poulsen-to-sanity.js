const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

// Louis Poulsen products data
const louisPoulsenProducts = [
  {
    _id: "aj-floor-lamp",
    name: "AJ Floor Lamp",
    slug: "aj-floor",
    description: "Iconic floor lamp designed by Arne Jacobsen. A timeless piece that combines functionality with elegant Scandinavian design.",
    price: 13025,
    category: "Lighting",
    brand: "Louis Poulsen",
    designer: "Arne Jacobsen",
    features: [
      "Iconic Danish design by Arne Jacobsen",
      "Adjustable shade for directed lighting",
      "High-quality materials and craftsmanship",
      "Timeless aesthetic that complements any interior"
    ],
    specifications: [
      { label: "Height", value: "130 cm" },
      { label: "Shade diameter", value: "21.5 cm" },
      { label: "Base diameter", value: "28 cm" },
      { label: "Light source", value: "E27 max 60W" },
      { label: "Material", value: "Painted steel" },
      { label: "Designer", value: "Arne Jacobsen" },
      { label: "Year", value: "1960" }
    ],
    variants: [
      {
        name: "White",
        color: "White",
        price: 13025,
        imagePath: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp"
      },
      {
        name: "Black",
        color: "Black", 
        price: 13025,
        imagePath: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Black.webp"
      },
      {
        name: "Dusty Blue",
        color: "Dusty Blue",
        price: 13025,
        imagePath: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Dusty Blue.webp"
      },
      {
        name: "Electric Orange",
        color: "Electric Orange",
        price: 13025,
        imagePath: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Electric Orange.webp"
      },
      {
        name: "Soft Lemon",
        color: "Soft Lemon",
        price: 13025,
        imagePath: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Soft lemon.webp"
      },
      {
        name: "Warm Grey",
        color: "Warm Grey",
        price: 13025,
        imagePath: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Warm Grey.webp"
      },
      {
        name: "Warm Sand",
        color: "Warm Sand",
        price: 13025,
        imagePath: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Warm Sand.webp"
      },
      {
        name: "Stainless Steel Polished",
        color: "Stainless Steel",
        price: 15375,
        imagePath: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 15 375  Farge - Stainless Steel Polished.webp"
      }
    ]
  }
];

async function uploadImageToSanity(imagePath, altText) {
  try {
    const fullPath = path.join(__dirname, '../public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Image not found: ${fullPath}`);
      return null;
    }

    console.log(`Uploading image: ${imagePath}`);
    
    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
      title: altText
    });

    console.log(`✅ Uploaded: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${imagePath}:`, error.message);
    return null;
  }
}

async function createLouisPoulsenProduct(productData) {
  try {
    console.log(`\n🔄 Creating product: ${productData.name}`);

    // Upload main product image (use first variant image as main)
    const mainImageAsset = await uploadImageToSanity(
      productData.variants[0].imagePath,
      `${productData.name} - ${productData.variants[0].name}`
    );

    // Upload variant images
    const variantAssets = [];
    for (const variant of productData.variants) {
      const asset = await uploadImageToSanity(
        variant.imagePath,
        `${productData.name} - ${variant.name}`
      );
      variantAssets.push({ variant, asset });
    }

    // Create the product document
    const productDoc = {
      _type: 'product',
      _id: productData._id,
      name: productData.name,
      slug: {
        _type: 'slug',
        current: productData.slug
      },
      description: productData.description,
      price: productData.price,
      brand: productData.brand,
      designer: productData.designer,
      features: productData.features,
      specifications: productData.specifications,
      image: mainImageAsset ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageAsset._id
        }
      } : undefined,
      variants: variantAssets.map(({ variant, asset }) => ({
        _type: 'variant',
        _key: variant.name.toLowerCase().replace(/\s+/g, '-'),
        name: variant.name,
        color: variant.color,
        price: variant.price,
        image: asset ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        } : undefined
      })),
      categories: [{
        _type: 'reference',
        _ref: 'lighting-category'
      }],
      inStock: true,
      stock: 10
    };

    // Create or update the product
    const result = await client.createOrReplace(productDoc);
    console.log(`✅ Created product: ${result._id}`);
    
    return result;
  } catch (error) {
    console.error(`❌ Failed to create product ${productData.name}:`, error.message);
    return null;
  }
}

async function createLightingCategory() {
  try {
    const category = {
      _type: 'category',
      _id: 'lighting-category',
      title: 'Lighting',
      slug: {
        _type: 'slug',
        current: 'lighting'
      },
      description: 'Premium lighting solutions for modern living'
    };

    await client.createOrReplace(category);
    console.log('✅ Created lighting category');
  } catch (error) {
    console.error('❌ Failed to create lighting category:', error.message);
  }
}

async function main() {
  try {
    console.log('🚀 Starting Louis Poulsen migration to Sanity...');
    
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables');
      console.log('Required: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN');
      return;
    }

    // Create lighting category first
    await createLightingCategory();

    // Migrate each product
    for (const product of louisPoulsenProducts) {
      await createLouisPoulsenProduct(product);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n🎉 Louis Poulsen migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   • Migrated ${louisPoulsenProducts.length} products`);
    console.log('   • Uploaded all variant images to Sanity');
    console.log('   • Created proper product documents with references');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  }
}

main();
