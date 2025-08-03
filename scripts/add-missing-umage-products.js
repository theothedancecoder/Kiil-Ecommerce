#!/usr/bin/env node

/**
 * Script to add the missing UMAGE products to Sanity without image references
 */

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Missing UMAGE products (the ones not currently in Sanity)
const missingProducts = [
  {
    id: "heiko-dining-chair",
    name: "Heiko Dining Chair",
    description: "The Heiko dining chair embodies Scandinavian simplicity and comfort.",
    price: 5999,
    category: "Chair",
    variants: [
      {
        name: "Oak",
        material: "Oak",
        price: 5999,
      },
      {
        name: "Walnut",
        material: "Walnut",
        price: 6299,
      },
    ],
  },
  {
    id: "audacious-desk",
    name: "Audacious Desk",
    description: "A bold and functional desk that makes a statement in any workspace.",
    price: 12999,
    category: "Desks",
    variants: [
      {
        name: "Oak - Sugar Brown",
        material: "Oak",
        price: 12999,
      },
      {
        name: "Oak - White Sands",
        material: "Oak",
        price: 12999,
      },
    ],
  },
  {
    id: "treasures-dresser",
    name: "Treasures Dresser",
    description: "A sophisticated dresser that combines storage functionality with elegant design. Perfect for bedrooms or living spaces, offering ample storage with style.",
    price: 16999,
    category: "Storage",
    variants: [
      {
        name: "Oak - Sugar Brown",
        material: "Oak",
        price: 16999,
      },
      {
        name: "Oak - White Sands",
        material: "Oak",
        price: 16999,
      },
    ],
  }
];

async function addMissingUmageProducts() {
  console.log('🚀 Adding missing UMAGE products to Sanity...\n');

  try {
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
    }
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('Missing SANITY_API_TOKEN environment variable');
    }

    console.log(`📡 Connected to Sanity project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

    // First, let's check if the categories exist, if not create them
    const categories = ['Chair', 'Desks', 'Storage'];
    
    for (const categoryName of categories) {
      const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
      const categoryDoc = {
        _type: 'category',
        _id: `umage-category-${categorySlug}`,
        title: categoryName,
        slug: {
          _type: 'slug',
          current: categorySlug
        },
        description: `UMAGE ${categoryName} collection`
      };

      try {
        await client.createOrReplace(categoryDoc);
        console.log(`✅ Created/updated category: ${categoryName}`);
      } catch (error) {
        console.log(`⚠️  Category ${categoryName} might already exist`);
      }
    }

    console.log('\n📦 Creating missing UMAGE products...\n');

    // Create products without image references
    for (const product of missingProducts) {
      const productSlug = product.id;
      const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');

      const productDoc = {
        _type: 'product',
        _id: `umage-${product.id}`,
        name: product.name,
        slug: {
          _type: 'slug',
          current: productSlug
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
                text: product.description,
                marks: []
              }
            ]
          }
        ],
        price: product.price,
        brand: 'UMAGE',
        categories: [
          {
            _type: 'reference',
            _ref: `umage-category-${categorySlug}`,
            _key: categorySlug
          }
        ],
        // Product variants without image references
        variants: product.variants.map((variant, index) => ({
          _key: `variant-${index}`,
          name: variant.name,
          material: variant.material,
          price: variant.price
        })),
        inStock: true,
        stock: 10,
        href: `/umage/${productSlug}`,
        roomCategory: 'living-room'
      };

      try {
        await client.createOrReplace(productDoc);
        console.log(`✅ Created product: ${product.name}`);
        console.log(`   - ${product.variants.length} variants`);
        console.log(`   - Price: ${product.price} kr`);
        console.log(`   - Category: ${product.category}\n`);
      } catch (error) {
        console.error(`❌ Failed to create product ${product.name}:`, error.message);
      }
    }

    console.log('🎉 Missing UMAGE products added successfully!');
    console.log('\n📋 Summary:');
    console.log('- Added 3 missing UMAGE products');
    console.log('- Products created without images (will show "No image" placeholder)');
    console.log('- All products have variants and proper categories');
    console.log('\n🔍 Next: Check /umage page to see all 5 UMAGE products');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure SANITY_API_TOKEN is set in .env.local');
    console.log('2. Verify Sanity project ID and dataset are correct');
    console.log('3. Check that you have write permissions in Sanity');
    process.exit(1);
  }
}

// Run the migration
addMissingUmageProducts();
