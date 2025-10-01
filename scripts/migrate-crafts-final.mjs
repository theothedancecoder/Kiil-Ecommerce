import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'fs';
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

console.log('🚀 Starting Crafts migration to Sanity...\n');

// Crafts products based on available images
const craftsProducts = [
  {
    _id: "fenomen-wide-ceiling-lamp",
    name: "Fenomen Wide Ceiling Lamp",
    description: "Elegant ceiling lamp from Konsthantverk featuring exceptional craftsmanship and timeless design. The Fenomen Wide provides beautiful ambient lighting with its distinctive wide shade.",
    price: 9701,
    category: "Lighting",
    brand: "Crafts",
    image: "Crafts/Fenomen-Wide-Ceiling-Lamp / Crafts Fenomen Wide Ceiling Lamp from Konsthantverk NOK  9,701.jpg",
    href: "/crafts/fenomen-wide-ceiling-lamp",
    variants: [
      {
        name: "Natural Brass",
        image: "Crafts/Fenomen-Wide-Ceiling-Lamp / Crafts Fenomen Wide Ceiling Lamp from Konsthantverk NOK  9,701.jpg",
        material: "Natural Brass",
        price: 9701,
      },
      {
        name: "Copper",
        image: "Crafts/Fenomen-Wide-Ceiling-Lamp / Crafts Fenomen Wide Ceiling Lamp from Konsthantverk NOK  9,701.jpg",
        material: "Copper",
        price: 10201,
      },
      {
        name: "Bronze",
        image: "Crafts/Fenomen-Wide-Ceiling-Lamp / Crafts Fenomen Wide Ceiling Lamp from Konsthantverk NOK  9,701.jpg",
        material: "Bronze",
        price: 10701,
      },
    ],
    designer: "Konsthantverk",
    features: [
      "Handcrafted by skilled artisans",
      "Premium metal construction",
      "Timeless Scandinavian design",
      "Exceptional light distribution",
      "Sustainable materials"
    ],
    specifications: [
      { label: "Material", value: "Premium metal" },
      { label: "Finish", value: "Hand-polished" },
      { label: "Light Source", value: "E27 LED compatible" },
      { label: "Mounting", value: "Ceiling mount" },
      { label: "Origin", value: "Handcrafted in Scandinavia" }
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

    console.log(`✅ Uploaded image for ${displayName}: ${imageAsset._id}`);
    return imageAsset;
  } catch (error) {
    console.error(`❌ Failed to upload image for ${productName}:`, error.message);
    return null;
  }
}

// Helper function to ensure lighting category exists
async function ensureLightingCategory() {
  try {
    const existingCategory = await client.fetch(`
      *[_type == "category" && _id == "lighting-category"][0]
    `);

    if (!existingCategory) {
      console.log('📁 Creating lighting category...');
      await client.create({
        _type: 'category',
        _id: 'lighting-category',
        title: 'Lighting',
        slug: {
          _type: 'slug',
          current: 'lighting'
        },
        description: 'Lighting products and fixtures'
      });
      console.log('✅ Created lighting category');
    } else {
      console.log('✅ Lighting category already exists');
    }
  } catch (error) {
    console.error('❌ Failed to create lighting category:', error.message);
  }
}

// Helper function to create or update product in Sanity
async function createProductInSanity(product) {
  try {
    console.log(`\n🔄 Processing product: ${product.name}`);
    
    // Upload main product image
    const mainImageAsset = await uploadImageToSanity(product.image, product.name);
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

    // Create slug from href
    const slug = product.href.replace('/crafts/', '');

    // Check if product already exists
    const existingProducts = await client.fetch(`
      *[_type == "product" && brand == "Crafts" && slug.current == $slug] {
        _id
      }
    `, { slug });

    const productData = {
      _type: 'product',
      name: product.name,
      slug: {
        _type: 'slug',
        current: slug
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
      variants: processedVariants,
      categories: [{
        _type: 'reference',
        _ref: 'lighting-category'
      }],
      designer: product.designer,
      inStock: true,
      stock: 10, // Default stock
      features: product.features || [],
      specifications: product.specifications || []
    };

    let result;
    if (existingProducts.length > 0) {
      // Update existing product
      console.log(`🔄 Updating existing product: ${product.name}`);
      result = await client
        .patch(existingProducts[0]._id)
        .set(productData)
        .commit();
    } else {
      // Create new product
      console.log(`✨ Creating new product: ${product.name}`);
      result = await client.create(productData);
    }

    console.log(`✅ Successfully processed ${product.name} (${result._id})`);
    return true;

  } catch (error) {
    console.error(`❌ Failed to process product ${product.name}:`, error.message);
    return false;
  }
}

// Main migration function
async function migrateCraftsProducts() {
  console.log(`🎯 Starting migration of ${craftsProducts.length} Crafts products...\n`);

  // Ensure lighting category exists
  await ensureLightingCategory();

  let successCount = 0;
  let failureCount = 0;

  for (const product of craftsProducts) {
    const success = await createProductInSanity(product);
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Crafts migration completed!');
  console.log(`✅ Successfully migrated: ${successCount} products`);
  console.log(`❌ Failed to migrate: ${failureCount} products`);
  console.log('📝 All products should now be available from Sanity CDN');
  
  if (successCount > 0) {
    console.log('\n🚀 Next steps:');
    console.log('1. Update the Crafts page to use Sanity data');
    console.log('2. Check the Crafts page: https://kiil-ecommerce.vercel.app/crafts');
    console.log('3. Verify all products are displaying correctly');
  }
}

// Run the migration
migrateCraftsProducts().catch(console.error);
