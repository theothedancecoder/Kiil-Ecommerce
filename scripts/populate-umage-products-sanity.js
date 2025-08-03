#!/usr/bin/env node

/**
 * Script to populate Sanity CMS with UMAGE products from static data
 * This will create the actual UMAGE products in Sanity with variants and images
 */

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Need write token for creating documents
  useCdn: false,
  apiVersion: '2024-01-01',
});

// UMAGE products data (extracted from the static data we saw earlier)
const umageProducts = [
  {
    id: "a-conversation-piece-dining-chair",
    name: "A Conversation Piece Dining Chair",
    description: "An elegant dining chair that combines comfort with sophisticated design.",
    price: 7499,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/A-Conversation-Piece/umage_packshoA Conversation Piece dining chair 7,499 krt_5589c740-01_a-conversation-piece_dining-chair_oak_sugar-brown_-2_900x.webp",
        material: "Oak",
        price: 7499,
      },
      {
        name: "Black Oak - Sugar Brown",
        image: "/umage/A-Conversation-Piece/black-oak-sugar-brown.svg",
        material: "Black Oak",
        price: 7499,
      },
      {
        name: "Black Oak - White Sands",
        image: "/umage/A-Conversation-Piece/black-oak-white-sands.svg",
        material: "Black Oak",
        price: 7499,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/A-Conversation-Piece/oak-white-sands.svg",
        material: "Oak",
        price: 7499,
      },
    ],
    designer: "Umage Design Team",
  },
  {
    id: "gather-cafe-table",
    name: "Gather Café Table",
    description: "A versatile café table that brings people together. Perfect for intimate dining, coffee moments, or as a stylish accent piece.",
    price: 8999,
    category: "Tables",
    variants: [
      {
        name: "Beige Travertine",
        image: "/umage/Gather-Café-table/ Gather Café table 8.999 kr.webp",
        material: "Travertine",
        price: 8999,
      },
    ],
    designer: "Umage Design Team",
  },
  {
    id: "heiko-dining-chair",
    name: "Heiko Dining Chair",
    description: "The Heiko dining chair embodies Scandinavian simplicity and comfort.",
    price: 5999,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oak",
        image: "/umage/Heiko-dinning-chair/umage_packshot_5538_heiko_dining-chair_oak_-2_900x.webp",
        material: "Oak",
        price: 5999,
      },
      {
        name: "Walnut",
        image: "/umage/Heiko-dinning-chair/heiko-walnut.svg",
        material: "Walnut",
        price: 6299,
      },
    ],
    designer: "Umage Design Team",
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
        image: "/umage/Audacious-desk/umage_packshot_5608c707-01_audacious_desk_sugar_brown_oak_2_900x.webp",
        material: "Oak",
        price: 12999,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/Audacious-desk/umage_packshot_5608c707-02_audacious_desk_white_sands_oak_2_1200x.webp",
        material: "Oak",
        price: 12999,
      },
    ],
    designer: "Umage Design Team",
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
        image: "/umage/Treasures Dresser/umage_packshot_5624c735-01_treasures-dresser_oak_sugar-brown_-2_900x.webp",
        material: "Oak",
        price: 16999,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/Treasures Dresser/umage_packshot_5624c735-02_treasures-dresser_oak_white-sands_-2_900x.webp",
        material: "Oak",
        price: 16999,
      },
    ],
    designer: "Umage Design Team",
  }
];

async function createUmageProducts() {
  console.log('🚀 Starting UMAGE products migration to Sanity...\n');

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

    // Create categories first
    const categories = [...new Set(umageProducts.map(p => p.category))];
    const categoryDocs = [];

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
        categoryDocs.push(categoryDoc);
        console.log(`✅ Created category: ${categoryName}`);
      } catch (error) {
        console.log(`⚠️  Category ${categoryName} might already exist`);
      }
    }

    console.log('\n📦 Creating UMAGE products...\n');

    // Create products
    for (const product of umageProducts) {
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
        // Main product image (first variant image)
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: `image-${product.id}-main` // This would need to be uploaded separately
          }
        },
        // Product variants
        variants: product.variants.map((variant, index) => ({
          _key: `variant-${index}`,
          name: variant.name,
          material: variant.material,
          price: variant.price,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: `image-${product.id}-variant-${index}` // This would need to be uploaded separately
            }
          }
        })),
        inStock: true,
        stock: 10, // Default stock
        href: `/umage/${productSlug}`,
        roomCategory: 'living-room' // Default room category
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

    console.log('🎉 UMAGE products migration completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Upload product images to Sanity and update image references');
    console.log('2. Review products in Sanity Studio');
    console.log('3. Test the UMAGE page at /umage');
    console.log('4. Ensure USE_SANITY_PRODUCTS=true is set in environment');

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
createUmageProducts();
