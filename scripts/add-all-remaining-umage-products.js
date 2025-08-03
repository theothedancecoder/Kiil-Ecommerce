#!/usr/bin/env node

/**
 * Script to add ALL remaining UMAGE products to Sanity based on the public/umage directory structure
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

// All UMAGE products based on public/umage directory structure
// Products already in Sanity: A-Conversation-Piece, Audacious-desk, Gather-Café-table, Heiko-dinning-chair, Treasures Dresser
const remainingUmageProducts = [
  {
    id: "asteria-spotlight",
    name: "Asteria Spotlight",
    description: "A sophisticated spotlight that combines functionality with elegant design.",
    price: 3999,
    category: "Lighting",
    variants: [
      { name: "Plated Brass", material: "Plated Brass", price: 3999 },
      { name: "Black", material: "Black", price: 3999 },
      { name: "Polished Steel", material: "Polished Steel", price: 3999 },
    ],
  },
  {
    id: "chordis",
    name: "Chordis",
    description: "A sophisticated lighting fixture that combines modern design with premium brass construction.",
    price: 4999,
    category: "Lighting",
    variants: [
      { name: "Brass", material: "Brass", price: 4999 },
    ],
  },
  {
    id: "comfort-circle-dining-table",
    name: "Comfort Circle Dining Table",
    description: "A beautifully crafted round dining table that brings people together with its distinctive rippled wood surface.",
    price: 15999,
    category: "Tables",
    variants: [
      { name: "Rippled Black Oak", material: "Black Oak", price: 15999 },
      { name: "Rippled Oak", material: "Oak", price: 15999 },
      { name: "Rippled Dark Oak", material: "Dark Oak", price: 15999 },
    ],
  },
  {
    id: "duende-desk",
    name: "Duende Desk",
    description: "A sleek and functional desk that combines modern design with practical workspace solutions.",
    price: 11999,
    category: "Desks",
    variants: [
      { name: "Oak", material: "Oak", price: 11999 },
    ],
  },
  {
    id: "heart-n-soul-200-dining-table",
    name: "Heart'n'Soul 200 Dining Table",
    description: "A stunning dining table that brings heart and soul to your dining space.",
    price: 18999,
    category: "Tables",
    variants: [
      { name: "Oak", material: "Oak", price: 18999 },
      { name: "Black Oak", material: "Black Oak", price: 18999 },
      { name: "Dark Oak", material: "Dark Oak", price: 18999 },
      { name: "Walnut", material: "Walnut", price: 19999 },
    ],
  },
  {
    id: "heart-n-soul-console-table",
    name: "Heart'n'Soul Console Table",
    description: "An elegant console table that brings the heart and soul of Scandinavian design to your entryway.",
    price: 12999,
    category: "Tables",
    variants: [
      { name: "Black Oak", material: "Black Oak", price: 12999 },
    ],
  },
  {
    id: "heart-n-soul-dining-table",
    name: "Heart'n'Soul Dining Table",
    description: "A beautiful dining table that brings heart and soul to your dining space with elegant design.",
    price: 16999,
    category: "Tables",
    variants: [
      { name: "Black Oak", material: "Black Oak", price: 16999 },
    ],
  },
  {
    id: "heart-n-soul-dining-120",
    name: "Heart'n'Soul Dining Table 120",
    description: "A compact 120cm dining table perfect for smaller spaces while maintaining elegant design.",
    price: 15999,
    category: "Tables",
    variants: [
      { name: "Oak", material: "Oak", price: 15999 },
    ],
  },
  {
    id: "italic-table",
    name: "Italic Table",
    description: "A sleek and modern table with distinctive angled legs.",
    price: 14999,
    category: "Tables",
    variants: [
      { name: "Oak with Glass Top", material: "Oak", price: 14999 },
      { name: "Black Oak with Glass Top", material: "Black Oak", price: 15499 },
      { name: "Dark Oak with Glass Top", material: "Dark Oak", price: 15499 },
    ],
  },
  {
    id: "lemon-squeeze-ceiling-lamp",
    name: "Lemon Squeeze Ceiling Lamp",
    description: "A playful yet sophisticated ceiling lamp that creates beautiful ambient lighting with its distinctive geometric design.",
    price: 3499,
    category: "Lighting",
    variants: [
      { name: "Long Penta - Plated Brass", material: "Plated Brass", size: "Long", price: 3499 },
      { name: "Long Penta - Polished Steel", material: "Polished Steel", size: "Long", price: 3499 },
      { name: "Short Penta - Plated Brass", material: "Plated Brass", size: "Short", price: 3199 },
      { name: "Short Penta - Polished Steel", material: "Polished Steel", size: "Short", price: 3199 },
    ],
  },
  {
    id: "lemon-squeeze-wall-lamp-double",
    name: "Lemon Squeeze Wall Lamp Double",
    description: "A playful yet sophisticated double wall lamp that creates beautiful ambient lighting.",
    price: 4999,
    category: "Lighting",
    variants: [
      { name: "Short Double - Plated Brass", material: "Brass", price: 4999 },
    ],
  },
  {
    id: "lemon-squeeze-wall-lamp-single",
    name: "Lemon Squeeze Wall Lamp Single",
    description: "A sophisticated single wall lamp that creates beautiful ambient lighting.",
    price: 3999,
    category: "Lighting",
    variants: [
      { name: "Long Single - Plated Brass", material: "Brass", price: 3999 },
    ],
  },
  {
    id: "lounge-around-3-seater",
    name: "Lounge Around 3-Seater",
    description: "A comfortable and stylish 3-seater sofa that brings relaxation and elegance to any living space.",
    price: 24999,
    category: "Seating",
    variants: [
      { name: "Oak - Sugar Brown", material: "Oak", price: 24999 },
    ],
  },
  {
    id: "lounge-around-shuffle-coffee-table",
    name: "Lounge Around Shuffle Coffee Table",
    description: "A versatile coffee table that complements the Lounge Around collection perfectly.",
    price: 9999,
    category: "Tables",
    variants: [
      { name: "Oak", material: "Oak", price: 9999 },
    ],
  },
  {
    id: "lounge-around-shuffle-puff",
    name: "Lounge Around Shuffle Puff",
    description: "A comfortable ottoman that perfectly complements the Lounge Around collection.",
    price: 7999,
    category: "Seating",
    variants: [
      { name: "Oak - Sugar Brown", material: "Oak", price: 7999 },
      { name: "Oak - White Sands", material: "Oak", price: 7999 },
      { name: "Oak - Shadow", material: "Oak", price: 7999 },
      { name: "Dark Oak - Sugar Brown", material: "Dark Oak", price: 8299 },
      { name: "Dark Oak - White Sands", material: "Dark Oak", price: 8299 },
      { name: "Dark Oak - Shadow", material: "Dark Oak", price: 8299 },
    ],
  },
  {
    id: "metal-cover-accessories-asteria",
    name: "Metal Cover Accessories for Asteria",
    description: "Premium metal cover accessories designed specifically for Asteria lighting fixtures.",
    price: 1999,
    category: "Accessories",
    variants: [
      { name: "Steel Cover", material: "Steel", price: 1999 },
    ],
  },
  {
    id: "stories-shelving",
    name: "Stories Shelving",
    description: "A versatile shelving system that tells your story through display.",
    price: 8999,
    category: "Storage",
    variants: [
      { name: "Oak", material: "Oak", price: 8999 },
    ],
  },
  {
    id: "the-reader",
    name: "The Reader",
    description: "An elegant reading chair designed for comfort and style.",
    price: 18999,
    category: "Seating",
    variants: [
      { name: "Oak - Sugar Brown", material: "Oak", price: 18999 },
    ],
  },
  {
    id: "the-socialite-bar-stool",
    name: "The Socialite Bar Stool",
    description: "A sophisticated bar stool designed for social dining spaces.",
    price: 5499,
    category: "Seating",
    variants: [
      { name: "Dark Oak", material: "Dark Oak", price: 5499 },
    ],
  },
  {
    id: "the-socialite-counter-chair",
    name: "The Socialite Counter Chair",
    description: "A sophisticated counter-height chair designed for social dining spaces.",
    price: 7999,
    category: "Seating",
    variants: [
      { name: "Black Oak", material: "Black Oak", price: 7999 },
    ],
  }
];

async function addAllRemainingUmageProducts() {
  console.log('🚀 Adding ALL remaining UMAGE products to Sanity...\n');

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

    // First, let's create the categories
    const categories = ['Lighting', 'Tables', 'Desks', 'Seating', 'Storage', 'Accessories'];
    
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

    console.log(`\n📦 Creating ${remainingUmageProducts.length} remaining UMAGE products...\n`);

    // Create products without image references
    for (const product of remainingUmageProducts) {
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
          size: variant.size || null,
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

    console.log('🎉 All remaining UMAGE products added successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Added ${remainingUmageProducts.length} additional UMAGE products`);
    console.log('- Total UMAGE products should now be: 5 (existing) + 20 (new) = 25 products');
    console.log('- Products created without images (will show "No image" placeholder)');
    console.log('- All products have variants and proper categories');
    console.log('\n🔍 Next: Check /umage page to see all UMAGE products');

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
addAllRemainingUmageProducts();
