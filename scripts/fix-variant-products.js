const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-13',
  useCdn: false,
});

// Function to extract data from TypeScript files using regex
function extractProductsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const exportMatch = content.match(/export const \w+:\s*\w+\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (!exportMatch) return [];
    const arrayContent = exportMatch[1];
    const products = eval(arrayContent);
    return products;
  } catch (error) {
    console.error(`❌ Error parsing ${filePath}:`, error.message);
    return [];
  }
}

// Function to upload image to Sanity
async function uploadImageToSanity(imagePath, productName) {
  try {
    const fullImagePath = path.join(process.cwd(), 'public', imagePath.replace(/^\//, ''));
    if (!fs.existsSync(fullImagePath)) {
      console.log(`⚠️  Image not found: ${fullImagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullImagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
      title: `${productName} - Image`
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      },
      alt: productName
    };
  } catch (error) {
    console.error(`❌ Error uploading image for ${productName}:`, error.message);
    return null;
  }
}

// Function to create or get category
async function createOrGetCategory(categoryTitle) {
  try {
    const slug = categoryTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    const existingCategory = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]`,
      { slug }
    );

    if (existingCategory) {
      return existingCategory._id;
    }

    const category = await client.create({
      _type: 'category',
      title: categoryTitle,
      slug: { current: slug },
      description: `${categoryTitle} products`
    });

    return category._id;
  } catch (error) {
    console.error(`❌ Error creating category ${categoryTitle}:`, error.message);
    return null;
  }
}

// Function to migrate a single product (fixed version)
async function migrateProductFixed(product, sourceFile) {
  try {
    // Check if product already exists
    const existingProduct = await client.fetch(
      `*[_type == "product" && _id == $id][0]`,
      { id: product._id }
    );

    if (existingProduct) {
      console.log(`⏭️  Product already exists: ${product.name}`);
      return false;
    }

    console.log(`🔄 Migrating: ${product.name} from ${sourceFile}`);

    // Upload main image if it exists
    let imageAsset = null;
    if (product.image) {
      imageAsset = await uploadImageToSanity(product.image, product.name);
    }

    // Create categories
    const categoryIds = [];
    if (product.categories && Array.isArray(product.categories)) {
      for (const category of product.categories) {
        const categoryId = await createOrGetCategory(category.title);
        if (categoryId) categoryIds.push({ _type: 'reference', _ref: categoryId });
      }
    }

    // Create the product document
    const productDoc = {
      _id: product._id,
      _type: 'product',
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price,
      brand: product.brand,
      inStock: product.inStock !== false,
      stock: product.stock || 0,
      categories: categoryIds,
      images: imageAsset ? [imageAsset] : [],
      sourceFile: sourceFile
    };

    // Handle variants properly (without placeholder references)
    if (product.variants && Array.isArray(product.variants)) {
      const processedVariants = [];
      
      for (const variant of product.variants) {
        let variantImageAsset = null;
        
        // Upload variant image if it exists
        if (variant.image) {
          variantImageAsset = await uploadImageToSanity(variant.image, `${product.name} - ${variant.name}`);
        }

        const processedVariant = {
          _key: variant._key || variant.id || Math.random().toString(36).substr(2, 9),
          name: variant.name,
          price: variant.price || product.price,
          inStock: variant.inStock !== false,
          stock: variant.stock || 0
        };

        // Only add image if we successfully uploaded it
        if (variantImageAsset) {
          processedVariant.image = variantImageAsset;
        }

        processedVariants.push(processedVariant);
      }
      
      productDoc.variants = processedVariants;
    }

    await client.create(productDoc);
    console.log(`✅ Successfully migrated: ${product.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Error migrating ${product.name}:`, error.message);
    return false;
  }
}

// Main function to fix failed products
async function fixVariantProducts() {
  console.log('🔧 Fixing products with variant issues...\n');

  const failedFiles = [
    'mirrorsData.ts',
    'outdoorProducts.ts', 
    'roCollectionChairsData.ts',
    'roCollectionTablesData.ts',
    'louisPoulsenProducts.ts'
  ];

  let totalMigrated = 0;
  let totalSkipped = 0;

  for (const fileName of failedFiles) {
    const filePath = path.join(process.cwd(), 'lib', fileName);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${fileName}`);
      continue;
    }

    console.log(`\n📁 Processing: ${fileName}`);
    
    const products = extractProductsFromFile(filePath);
    console.log(`   Found ${products.length} products`);

    if (products.length === 0) {
      continue;
    }

    // Migrate products one by one
    for (const product of products) {
      const result = await migrateProductFixed(product, fileName);
      if (result === true) {
        totalMigrated++;
      } else {
        totalSkipped++;
      }
      
      // Small delay to avoid overwhelming Sanity
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  console.log('\n🎉 Fix Summary:');
  console.log(`   ✅ Migrated: ${totalMigrated} products`);
  console.log(`   ⏭️  Skipped: ${totalSkipped} products (already exist)`);
}

// Run the fix
fixVariantProducts().catch(console.error);
