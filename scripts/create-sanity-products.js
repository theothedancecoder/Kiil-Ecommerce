#!/usr/bin/env node

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
  useCdn: false
});

console.log('🏗️  Creating Sanity Products from Static Data...\n');

// Since we can't directly import TypeScript files, let's create a simple test
// You can manually add your static product data here or convert the files to .js
const allProducts = [
  {
    id: 'test-product-1',
    name: 'Test Product 1',
    description: 'A test product for migration',
    price: 1000,
    brand: 'Test Brand',
    category: 'Tables',
    image: '/test/image1.jpg',
    href: '/test-product-1',
    inStock: true,
    variants: []
  }
];

const roCollectionTablesData = [];
const roCollectionChairsData = [];
const cushionsData = [];

// Function to create a category if it doesn't exist
async function createCategory(categoryName, slug) {
  try {
    const existingCategory = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]`,
      { slug }
    );
    
    if (existingCategory) {
      console.log(`✅ Category exists: ${categoryName}`);
      return existingCategory;
    }
    
    const category = await client.create({
      _type: 'category',
      title: categoryName,
      slug: {
        _type: 'slug',
        current: slug
      },
      description: `${categoryName} products`
    });
    
    console.log(`✅ Created category: ${categoryName}`);
    return category;
  } catch (error) {
    console.error(`❌ Failed to create category ${categoryName}:`, error.message);
    return null;
  }
}

// Function to create a product in Sanity
async function createSanityProduct(staticProduct, categoryRef) {
  try {
    // Check if product already exists
    const existingProduct = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug: staticProduct.href.replace('/', '') }
    );
    
    if (existingProduct) {
      console.log(`⚠️  Product exists: ${staticProduct.name}`);
      return existingProduct;
    }
    
    const product = {
      _type: 'product',
      name: staticProduct.name,
      slug: {
        _type: 'slug',
        current: staticProduct.href.replace('/', '')
      },
      description: [
        {
          _type: 'block',
          _key: 'description',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span',
              text: staticProduct.description || `${staticProduct.name} from ${staticProduct.brand}`,
              marks: []
            }
          ]
        }
      ],
      price: staticProduct.price,
      brand: staticProduct.brand,
      categories: categoryRef ? [{ _type: 'reference', _ref: categoryRef._id }] : [],
      stock: staticProduct.inStock ? 10 : 0,
      inStock: staticProduct.inStock,
      // Note: Image will be added later during migration
      image: null,
      // Store variants if they exist
      variants: staticProduct.variants ? staticProduct.variants.map((variant, index) => ({
        _key: `variant-${index}`,
        name: variant.name || `Variant ${index + 1}`,
        color: variant.color,
        material: variant.material,
        size: variant.size,
        price: variant.price || staticProduct.price,
        // Variant images will also be added during migration
        image: null
      })) : []
    };
    
    const result = await client.create(product);
    console.log(`✅ Created product: ${staticProduct.name}`);
    return result;
    
  } catch (error) {
    console.error(`❌ Failed to create product ${staticProduct.name}:`, error.message);
    return null;
  }
}

// Function to process all static products
async function createAllProducts() {
  try {
    console.log('🔍 Checking Sanity connection...');
    await client.fetch('*[_type == "product"][0]');
    console.log('✅ Connected to Sanity\n');
    
    // Create categories first
    console.log('📁 Creating categories...');
    const categories = {};
    
    // Extract unique categories from all products
    const allStaticProducts = [
      ...allProducts,
      ...roCollectionTablesData,
      ...roCollectionChairsData,
      ...cushionsData
    ];
    
    const uniqueCategories = [...new Set(allStaticProducts.map(p => p.category))];
    
    for (const categoryName of uniqueCategories) {
      if (categoryName) {
        const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
        const category = await createCategory(categoryName, slug);
        if (category) {
          categories[categoryName] = category;
        }
      }
    }
    
    console.log(`\n🏗️  Creating products...`);
    let createdCount = 0;
    let existingCount = 0;
    
    // Process all static products
    for (const staticProduct of allStaticProducts) {
      const categoryRef = categories[staticProduct.category];
      const result = await createSanityProduct(staticProduct, categoryRef);
      
      if (result) {
        if (result._createdAt === result._updatedAt) {
          createdCount++;
        } else {
          existingCount++;
        }
      }
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n🎉 Product creation complete!`);
    console.log(`✅ Created: ${createdCount} new products`);
    console.log(`⚠️  Existing: ${existingCount} products already existed`);
    console.log(`📊 Total processed: ${allStaticProducts.length} products`);
    
    console.log(`\n📋 Next steps:`);
    console.log(`1. Run the image migration script to upload images`);
    console.log(`2. Update product documents with image references`);
    console.log(`3. Test the updated application`);
    
  } catch (error) {
    console.error('❌ Failed to create products:', error);
  }
}

// Generate a mapping file for image migration
async function generateImageMapping() {
  try {
    console.log('\n📝 Generating image mapping file...');
    
    const allStaticProducts = [
      ...allProducts,
      ...roCollectionTablesData,
      ...roCollectionChairsData,
      ...cushionsData
    ];
    
    const mapping = {};
    
    for (const product of allStaticProducts) {
      const slug = product.href.replace('/', '');
      mapping[slug] = {
        name: product.name,
        brand: product.brand,
        mainImage: product.image,
        lifestyleImages: product.lifestyleImages || [],
        variants: product.variants ? product.variants.map(v => ({
          name: v.name,
          image: v.image
        })) : []
      };
    }
    
    const mappingPath = path.join(__dirname, 'image-mapping.json');
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
    
    console.log(`✅ Image mapping saved to: ${mappingPath}`);
    console.log(`📊 Mapped ${Object.keys(mapping).length} products`);
    
  } catch (error) {
    console.error('❌ Failed to generate mapping:', error);
  }
}

// Main function
async function main() {
  await createAllProducts();
  await generateImageMapping();
}

if (require.main === module) {
  main();
}

module.exports = { createSanityProduct, createCategory };
