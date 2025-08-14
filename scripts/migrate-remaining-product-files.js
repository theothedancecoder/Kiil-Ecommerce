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

// Function to migrate FLOS products (different structure)
async function migrateFlosProduct(product, sourceFile) {
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

    // Upload main image
    let imageAsset = null;
    if (product.image) {
      imageAsset = await uploadImageToSanity(product.image, product.name);
    }

    // Create category
    const categoryIds = [];
    if (product.category) {
      const categoryId = await createOrGetCategory(product.category);
      if (categoryId) categoryIds.push({ _type: 'reference', _ref: categoryId });
    }

    // Process variants
    const processedVariants = [];
    if (product.variants && Array.isArray(product.variants)) {
      for (const variant of product.variants) {
        let variantImageAsset = null;
        
        if (variant.image) {
          variantImageAsset = await uploadImageToSanity(variant.image, `${product.name} - ${variant.name}`);
        }

        const processedVariant = {
          _key: Math.random().toString(36).substr(2, 9),
          name: variant.name,
          price: variant.price || product.price,
          inStock: true,
          stock: 10
        };

        if (variantImageAsset) {
          processedVariant.image = variantImageAsset;
        }

        processedVariants.push(processedVariant);
      }
    }

    // Create the product document
    const productDoc = {
      _id: product._id,
      _type: 'product',
      name: product.name,
      slug: { current: product._id },
      description: product.description || '',
      price: product.price,
      brand: product.brand,
      inStock: true,
      stock: 10,
      categories: categoryIds,
      images: imageAsset ? [imageAsset] : [],
      variants: processedVariants,
      sourceFile: sourceFile
    };

    // Add designer if available
    if (product.designer) {
      productDoc.designer = product.designer;
    }

    await client.create(productDoc);
    console.log(`✅ Successfully migrated: ${product.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Error migrating ${product.name}:`, error.message);
    return false;
  }
}

// Function to migrate sales products (different structure)
async function migrateSalesProduct(product, sourceFile) {
  try {
    // Check if product already exists
    const existingProduct = await client.fetch(
      `*[_type == "product" && _id == $id][0]`,
      { id: product.id }
    );

    if (existingProduct) {
      console.log(`⏭️  Product already exists: ${product.name}`);
      return false;
    }

    console.log(`🔄 Migrating: ${product.name} from ${sourceFile}`);

    // Upload main image
    let imageAsset = null;
    if (product.image) {
      imageAsset = await uploadImageToSanity(product.image, product.name);
    }

    // Create category for sales
    const categoryIds = [];
    const categoryId = await createOrGetCategory('Sale');
    if (categoryId) categoryIds.push({ _type: 'reference', _ref: categoryId });

    // Create the product document
    const productDoc = {
      _id: product.id,
      _type: 'product',
      name: product.name,
      slug: { current: product.id },
      description: product.description || '',
      price: product.originalPrice,
      salePrice: product.salePrice,
      brand: product.brand,
      inStock: true,
      stock: 5, // Limited stock for sale items
      categories: categoryIds,
      images: imageAsset ? [imageAsset] : [],
      sourceFile: sourceFile
    };

    // Add designer if available
    if (product.designer) {
      productDoc.designer = product.designer;
    }

    await client.create(productDoc);
    console.log(`✅ Successfully migrated: ${product.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Error migrating ${product.name}:`, error.message);
    return false;
  }
}

// Main migration function
async function migrateRemainingProductFiles() {
  console.log('🚀 Starting migration of remaining product files...\n');

  let totalMigrated = 0;
  let totalSkipped = 0;

  // Migrate FLOS products
  const flosFilePath = path.join(process.cwd(), 'lib', 'flosProducts.ts');
  if (fs.existsSync(flosFilePath)) {
    console.log(`\n📁 Processing: flosProducts.ts`);
    
    const flosProducts = extractProductsFromFile(flosFilePath);
    console.log(`   Found ${flosProducts.length} FLOS products`);

    for (const product of flosProducts) {
      const result = await migrateFlosProduct(product, 'flosProducts.ts');
      if (result === true) {
        totalMigrated++;
      } else {
        totalSkipped++;
      }
      
      // Small delay to avoid overwhelming Sanity
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  // Migrate sales products
  const salesFilePath = path.join(process.cwd(), 'lib', 'salesData.ts');
  if (fs.existsSync(salesFilePath)) {
    console.log(`\n📁 Processing: salesData.ts`);
    
    const salesProducts = extractProductsFromFile(salesFilePath);
    console.log(`   Found ${salesProducts.length} sale products`);

    for (const product of salesProducts) {
      const result = await migrateSalesProduct(product, 'salesData.ts');
      if (result === true) {
        totalMigrated++;
      } else {
        totalSkipped++;
      }
      
      // Small delay to avoid overwhelming Sanity
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  console.log('\n🎉 Migration Summary:');
  console.log(`   ✅ Migrated: ${totalMigrated} products`);
  console.log(`   ⏭️  Skipped: ${totalSkipped} products (already exist)`);
  console.log(`   📊 Total processed: ${totalMigrated + totalSkipped} products`);
}

// Run the migration
migrateRemainingProductFiles().catch(console.error);
