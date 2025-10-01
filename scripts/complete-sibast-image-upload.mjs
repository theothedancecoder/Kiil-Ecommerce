import { createClient } from '@sanity/client';
import { createReadStream, existsSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

console.log('🚀 Starting complete Sibast image upload and product creation...\n');

// Sibast products with all variants based on available images
const sibastProducts = [
  {
    _id: "no-2-1-dining-table",
    name: "No. 2.1 Dining Table",
    description: "Iconic dining table designed by Helge Sibast in 1953. Features elegant tapered legs and exceptional craftsmanship. Available with extension leaves for versatile dining arrangements.",
    price: 38799,
    category: "Furniture",
    brand: "Sibast",
    designer: "Helge Sibast",
    slug: "no-2-1-dining-table",
    variants: [
      {
        name: "Table - Oiled Oak",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  38,799  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  Oiled oak.webp",
        material: "Oiled Oak",
        price: 38799,
      },
      {
        name: "Table - White Oiled Oak",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  38,799  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  White oiled oak.webp",
        material: "White Oiled Oak",
        price: 38799,
      },
      {
        name: "Table - Smoked Oak",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  41,784  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  Smoked oak.webp",
        material: "Smoked Oak",
        price: 41784,
      },
      {
        name: "Table w/1 Extension - Oiled Oak",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  45,508  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  Oiled oak.webp",
        material: "Oiled Oak",
        size: "With 1 Extension",
        price: 45508,
      },
      {
        name: "Table w/1 Extension - White Oiled Oak",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  45,508  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  White oiled oak.webp",
        material: "White Oiled Oak",
        size: "With 1 Extension",
        price: 45508,
      },
      {
        name: "Table w/1 Extension - Smoked Oak",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  49,239  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  Smoked oak.webp",
        material: "Smoked Oak",
        size: "With 1 Extension",
        price: 49239,
      },
      {
        name: "Table w/2 Extensions - Oiled Oak",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table kr  52 217  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  Oiled oak.webp",
        material: "Oiled Oak",
        size: "With 2 Extensions",
        price: 52217,
      },
      {
        name: "Table w/2 Extensions - White Oiled Oak",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table kr  52 217  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  White oiled oak.webp",
        material: "White Oiled Oak",
        size: "With 2 Extensions",
        price: 52217,
      },
      {
        name: "Table w/2 Extensions - Smoked Oak",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  56,694  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  Smoked oak.webp",
        material: "Smoked Oak",
        size: "With 2 Extensions",
        price: 56694,
      },
      {
        name: "Table - Walnut",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  59,694  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  Walnut.webp",
        material: "Walnut",
        price: 59694,
      },
      {
        name: "Table w/1 Extension - Walnut",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  70,134  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  Walnut.webp",
        material: "Walnut",
        size: "With 1 Extension",
        price: 70134,
      },
      {
        name: "Table w/2 Extensions - Walnut",
        image: "Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  80,574  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  Walnut.webp",
        material: "Walnut",
        size: "With 2 Extensions",
        price: 80574,
      },
    ],
    lifestyleFolder: "Sibast-Furniture/No.2.1-dining-table/lifestyle",
    features: [
      "Designed by Helge Sibast in 1953",
      "Solid wood construction",
      "Tapered legs with elegant proportions",
      "Available with extension leaves",
      "Timeless Danish design"
    ],
    specifications: [
      { label: "Designer", value: "Helge Sibast" },
      { label: "Year", value: "1953" },
      { label: "Material", value: "Solid wood" },
      { label: "Style", value: "Mid-century Danish" }
    ]
  },
  {
    _id: "no-7-dining-chair",
    name: "No. 7 Dining Chair",
    description: "Classic dining chair with elegant curved backrest and comfortable seat. Available in various wood finishes and upholstery options including leather and fabric.",
    price: 8948,
    category: "Furniture",
    brand: "Sibast",
    designer: "Helge Sibast",
    slug: "no-7-dining-chair",
    variants: [
      {
        name: "Black Beech - Wool Remix Light Grey",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  8,948  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp",
        material: "Black Beech",
        color: "Wool Remix Light Grey",
        price: 8948,
      },
      {
        name: "Black Beech - Aniline Black",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,142  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.webp",
        material: "Black Beech",
        color: "Aniline Black",
        price: 10142,
      },
      {
        name: "Black Beech - Light Grey Aniline",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,142  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp",
        material: "Black Beech",
        color: "Light Grey Aniline",
        price: 10142,
      },
      {
        name: "Black Beech - Cognac Aniline",
        image: "Sibast-Furniture/No.7-dining-chair/Sibast Furniture No. 7 dining chair NOK  10,142  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp",
        material: "Black Beech",
        color: "Cognac Aniline",
        price: 10142,
      },
      {
        name: "Oiled Oak - Wool Remix Light Grey",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,440  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp",
        material: "Oiled Oak",
        color: "Wool Remix Light Grey",
        price: 10440,
      },
      {
        name: "White Oiled Oak - Wool Remix Light Grey",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,440  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp",
        material: "White Oiled Oak",
        color: "Wool Remix Light Grey",
        price: 10440,
      },
      {
        name: "Smoked Oak - Wool Remix Light Grey",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 187  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp",
        material: "Smoked Oak",
        color: "Wool Remix Light Grey",
        price: 11187,
      },
      {
        name: "Oiled Oak - Aniline Black",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 634  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.webp",
        material: "Oiled Oak",
        color: "Aniline Black",
        price: 11634,
      },
      {
        name: "Oiled Oak - Cognac Aniline",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 634  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp",
        material: "Oiled Oak",
        color: "Cognac Aniline",
        price: 11634,
      },
      {
        name: "Smoked Oak - Aniline Black",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  12 381  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.webp",
        material: "Smoked Oak",
        color: "Aniline Black",
        price: 12381,
      },
      {
        name: "Smoked Oak - Cognac Aniline",
        image: "Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  12 381  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp",
        material: "Smoked Oak",
        color: "Cognac Aniline",
        price: 12381,
      },
    ],
    lifestyleFolder: "Sibast-Furniture/No.7-dining-chair/lifestyle",
    features: [
      "Designed by Helge Sibast",
      "Curved backrest for comfort",
      "Multiple wood and upholstery options",
      "Classic Danish design",
      "Exceptional build quality"
    ],
    specifications: [
      { label: "Designer", value: "Helge Sibast" },
      { label: "Material", value: "Solid wood with upholstery" },
      { label: "Style", value: "Mid-century Danish" },
      { label: "Type", value: "Dining chair" }
    ]
  },
  {
    _id: "no-7-dining-chair-full-upholstery",
    name: "No. 7 Dining Chair - Full Upholstery",
    description: "Fully upholstered version of the classic No. 7 dining chair. Offers maximum comfort with complete fabric or leather covering while maintaining the elegant silhouette.",
    price: 12828,
    category: "Furniture",
    brand: "Sibast",
    designer: "Helge Sibast",
    slug: "no-7-dining-chair-full-upholstery",
    variants: [
      {
        name: "Oiled Oak - Wool Remix Light Grey",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  12,828  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp",
        material: "Oiled Oak",
        color: "Wool Remix Light Grey",
        price: 12828,
      },
      {
        name: "White Oiled Oak - Aniline Black",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.jpg",
        material: "White Oiled Oak",
        color: "Aniline Black",
        price: 14022,
      },
      {
        name: "White Oiled Oak - Cognac Aniline",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/Sibast-No-7-dining-chNo. 7 dining chair fully upholstered NOK  14,022  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac anilineair-full-upholstered-oak-white-oil-leather-cognac-aniline-scaled-1-scaled-1.webp",
        material: "White Oiled Oak",
        color: "Cognac Aniline",
        price: 14022,
      },
      {
        name: "White Oiled Oak - Light Grey Aniline",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp",
        material: "White Oiled Oak",
        color: "Light Grey Aniline",
        price: 14022,
      },
      {
        name: "Oiled Oak - Aniline Black",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.jpg",
        material: "Oiled Oak",
        color: "Aniline Black",
        price: 14022,
      },
      {
        name: "Oiled Oak - Cognac Aniline",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp",
        material: "Oiled Oak",
        color: "Cognac Aniline",
        price: 14022,
      },
      {
        name: "Oiled Oak - Light Grey Aniline",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp",
        material: "Oiled Oak",
        color: "Light Grey Aniline",
        price: 14022,
      },
      {
        name: "Smoked Oak - Wool Remix Light Grey",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  13,575  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp",
        material: "Smoked Oak",
        color: "Wool Remix Light Grey",
        price: 13575,
      },
      {
        name: "Smoked Oak - Aniline Black",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,769  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.jpg",
        material: "Smoked Oak",
        color: "Aniline Black",
        price: 14769,
      },
      {
        name: "Smoked Oak - Cognac Aniline",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,769  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp",
        material: "Smoked Oak",
        color: "Cognac Aniline",
        price: 14769,
      },
      {
        name: "Smoked Oak - Light Grey Aniline",
        image: "Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,769  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp",
        material: "Smoked Oak",
        color: "Light Grey Aniline",
        price: 14769,
      },
    ],
    lifestyleFolder: "Sibast-Furniture/No.7-dining-chair-full-upholstery/lifestyle",
    features: [
      "Fully upholstered for maximum comfort",
      "Designed by Helge Sibast",
      "Multiple wood and upholstery combinations",
      "Premium leather and fabric options",
      "Timeless Danish design"
    ],
    specifications: [
      { label: "Designer", value: "Helge Sibast" },
      { label: "Material", value: "Solid wood with full upholstery" },
      { label: "Style", value: "Mid-century Danish" },
      { label: "Type", value: "Dining chair" }
    ]
  },
];

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath, productName, variantName = '') {
  try {
    const fullPath = path.join(__dirname, '..', 'public', imagePath);
    
    if (!existsSync(fullPath)) {
      console.log(`❌ Image file not found: ${fullPath}`);
      return null;
    }

    const displayName = variantName ? `${productName} - ${variantName}` : productName;
    console.log(`📤 Uploading image for ${displayName}...`);
    
    const imageAsset = await client.assets.upload('image', createReadStream(fullPath), {
      filename: path.basename(imagePath),
    });

    console.log(`✅ Uploaded: ${imageAsset._id}`);
    return imageAsset;
  } catch (error) {
    console.error(`❌ Failed to upload image for ${productName}:`, error.message);
    return null;
  }
}

// Helper function to find and upload lifestyle images
async function uploadLifestyleImages(lifestyleFolder) {
  const lifestyleImages = [];
  const lifestylePath = path.join(__dirname, '..', 'public', lifestyleFolder);
  
  if (existsSync(lifestylePath)) {
    try {
      const files = readdirSync(lifestylePath);
      for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
          const imagePath = `${lifestyleFolder}/${file}`;
          const asset = await uploadImageToSanity(imagePath, 'Lifestyle');
          if (asset) {
            lifestyleImages.push({
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id
              }
            });
          }
        }
      }
    } catch (error) {
      console.log(`No lifestyle images found for ${lifestyleFolder}`);
    }
  }
  
  return lifestyleImages;
}

// Helper function to ensure furniture category exists
async function ensureFurnitureCategory() {
  try {
    const existingCategory = await client.fetch(`
      *[_type == "category" && _id == "furniture-category"][0]
    `);

    if (!existingCategory) {
      console.log('📁 Creating furniture category...');
      await client.create({
        _type: 'category',
        _id: 'furniture-category',
        title: 'Furniture',
        slug: {
          _type: 'slug',
          current: 'furniture'
        },
        description: 'Furniture products'
      });
      console.log('✅ Created furniture category');
    } else {
      console.log('✅ Furniture category already exists');
    }
  } catch (error) {
    console.error('❌ Failed to create furniture category:', error.message);
  }
}

// Helper function to create or update product in Sanity
async function createProductInSanity(product) {
  try {
    console.log(`\n🔄 Processing product: ${product.name}`);
    
    // Upload main product image (use first variant's image)
    const mainImageAsset = await uploadImageToSanity(product.variants[0].image, product.name);
    if (!mainImageAsset) {
      console.log(`❌ Skipping ${product.name} - no main image`);
      return false;
    }

    // Upload variant images
    const processedVariants = [];
    for (const variant of product.variants || []) {
      if (variant.image) {
        const variantImageAsset = await uploadImageToSanity(variant.image, product.name, variant.name);
        if (variantImageAsset) {
          processedVariants.push({
            _type: 'variant',
            name: variant.name,
            price: variant.price,
            material: variant.material,
            color: variant.color,
            size: variant.size,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: variantImageAsset._id
              }
            }
          });
        }
      }
    }

    // Upload lifestyle images
    console.log(`📸 Uploading lifestyle images for ${product.name}...`);
    const lifestyleImages = await uploadLifestyleImages(product.lifestyleFolder);

    // Check if product already exists
    const existingProducts = await client.fetch(`
      *[_type == "product" && brand == "Sibast" && slug.current == $slug] {
        _id
      }
    `, { slug: product.slug });

    const productData = {
      _type: 'product',
      name: product.name,
      slug: {
        _type: 'slug',
        current: product.slug
      },
      description: product.description,
      price: product.price,
      brand: product.brand,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageAsset._id
        }
      },
      lifestyleImages: lifestyleImages,
      variants: processedVariants,
      categories: [{
        _type: 'reference',
        _ref: 'furniture-category'
      }],
      designer: product.designer,
      inStock: true,
      stock: 10,
      features: product.features || [],
      specifications: product.specifications || []
    };

    let result;
    if (existingProducts.length > 0) {
      console.log(`🔄 Updating existing product: ${product.name}`);
      result = await client
        .patch(existingProducts[0]._id)
        .set(productData)
        .commit();
    } else {
      console.log(`✨ Creating new product: ${product.name}`);
      result = await client.create(productData);
    }

    console.log(`✅ Successfully processed ${product.name} with ${processedVariants.length} variants`);
    return true;

  } catch (error) {
    console.error(`❌ Failed to process product ${product.name}:`, error.message);
    return false;
  }
}

// Main migration function
async function migrateSibastProducts() {
  console.log(`🎯 Starting migration of ${sibastProducts.length} Sibast products...\n`);

  // Ensure furniture category exists
  await ensureFurnitureCategory();

  let successCount = 0;
  let failureCount = 0;

  for (const product of sibastProducts) {
    const success = await createProductInSanity(product);
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n🎉 Sibast migration completed!');
  console.log(`✅ Successfully migrated: ${successCount} products`);
  console.log(`❌ Failed to migrate: ${failureCount} products`);
  console.log('📝 All products should now be available from Sanity CDN');
  
  if (successCount > 0) {
    console.log('\n🚀 Next steps:');
    console.log('1. Check the Sibast page: https://kiil-ecommerce.vercel.app/sibast');
    console.log('2. Verify all products and variants are displaying correctly');
    console.log('3. Test individual product pages');
  }
}

// Run the migration
migrateSibastProducts().catch(console.error);
