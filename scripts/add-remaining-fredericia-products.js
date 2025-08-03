const { createClient } = require('@sanity/client');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');
}
if (!dataset) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET');
}
if (!token) {
  throw new Error('Missing environment variable: SANITY_API_TOKEN');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'published',
});

// The 11 missing Fredericia products that need to be added to Sanity
const missingProducts = [
  {
    id: "delphi-sofa-2-seater",
    name: "Delphi Sofa 2 Seater",
    description: "Contemporary two-seater sofa with clean lines and premium leather upholstery. Perfect centerpiece for modern living spaces.",
    price: 95000,
    image: "/fredericia/delphi-sofa/main.jpg",
    variants: [{ name: "Leather Max 98 Black", image: "/fredericia/delphi-sofa/main.jpg", material: "Leather Max 98", price: 95000 }]
  },
  {
    id: "ej-5-corona-armchair",
    name: "EJ 5 Corona Armchair",
    description: "Elegant armchair designed by Erik Jørgensen, featuring refined proportions and exceptional comfort.",
    price: 69347,
    image: "/fredericia/corona-armchair/main.jpg",
    variants: [{ name: "Omni 301 Black", image: "/fredericia/corona-armchair/main.jpg", material: "Omni 301 leather", price: 69347 }]
  },
  {
    id: "insula-piccolo-side-table",
    name: "Insula Piccolo Side Table",
    description: "Compact side table with elegant proportions and premium materials. Perfect for modern living spaces.",
    price: 5295,
    image: "/fredericia/insula-piccolo-side-table/main.jpg",
    variants: [{ name: "H 58cm", image: "/fredericia/insula-piccolo-side-table/main.jpg", material: "Solid oak", price: 5295 }],
    lifestyleImages: ["/fredericia/insula-piccolo-side-table/lifestyle1.jpg"]
  },
  {
    id: "mogensen-6284-dining-table",
    name: "Mogensen 6284 Dining Table",
    description: "Classic dining table designed by Børge Mogensen, featuring clean lines and exceptional craftsmanship.",
    price: 50395,
    image: "/fredericia/mogensen-dining-table/main.jpg",
    variants: [{ name: "Oak Natural", image: "/fredericia/mogensen-dining-table/main.jpg", material: "Solid oak", price: 50395 }]
  },
  {
    id: "mogensen-j39-dining-chair",
    name: "Mogensen J39 Dining Chair",
    description: "Iconic dining chair designed by Børge Mogensen in 1947. Perfect balance between traditional craftsmanship and modern functionality.",
    price: 8930,
    image: "/fredericia/mogensen-j39-dining-chair/main.jpg",
    variants: [
      { name: "Oiled Oak", image: "/fredericia/mogensen-j39-dining-chair/main.jpg", material: "Solid oak", price: 8930 },
      { name: "Soaped Oak", image: "/fredericia/mogensen-j39-dining-chair/variant1.webp", material: "Solid oak", price: 8930 },
      { name: "Black Oak", image: "/fredericia/mogensen-j39-dining-chair/variant2.jpg", material: "Solid oak", price: 8930 }
    ],
    lifestyleImages: [
      "/fredericia/mogensen-j39-dining-chair/lifestyle1.jpg",
      "/fredericia/mogensen-j39-dining-chair/lifestyle2.jpg"
    ]
  },
  {
    id: "piloti-coffee-table",
    name: "Piloti Coffee Table",
    description: "Contemporary coffee table with architectural design elements. Clean lines and premium materials create a sophisticated centerpiece.",
    price: 9840,
    image: "/fredericia/piloti-coffee-table/main.jpg",
    variants: [{ name: "Light Oiled Oak", image: "/fredericia/piloti-coffee-table/main.jpg", material: "Solid oak", price: 9840 }]
  },
  {
    id: "post-dining-chair-with-wooden-seat",
    name: "Post Dining Chair",
    description: "Minimalist dining chair with wooden seat, designed for comfort and durability. Embodies Scandinavian simplicity.",
    price: 6500,
    image: "/fredericia/post-dining-chair/main.jpg",
    variants: [{ name: "Oak Natural", image: "/fredericia/post-dining-chair/main.jpg", material: "Solid oak", price: 6500 }]
  },
  {
    id: "risom-magazine-table",
    name: "Risom Magazine Table",
    description: "Functional magazine table with elegant design. Perfect for organizing reading materials while maintaining sophisticated aesthetics.",
    price: 6945,
    image: "/fredericia/risom-magazine-table/main.jpg",
    variants: [{ name: "Lacquered Oak", image: "/fredericia/risom-magazine-table/main.jpg", material: "Solid oak", price: 6945 }]
  },
  {
    id: "the-canvas-chair",
    name: "The Canvas Chair",
    description: "Contemporary chair with canvas upholstery, combining comfort with modern aesthetics. Perfect for casual and formal settings.",
    price: 15500,
    image: "/fredericia/canvas-chair/main.jpg",
    variants: [{ name: "Natural Canvas & Oak", image: "/fredericia/canvas-chair/main.jpg", material: "Oak & Canvas", price: 15500 }]
  },
  {
    id: "trinidad-chair",
    name: "Trinidad Chair",
    description: "Iconic chair with distinctive perforated shell design. Available in multiple color combinations with chrome or powder-coated finishes.",
    price: 6245,
    image: "/fredericia/trinidad-chair/main.jpg",
    variants: [
      { name: "Beech & Chrome", image: "/fredericia/trinidad-chair/main.jpg", material: "Beech & Chrome", price: 6245 },
      { name: "Black & Chrome", image: "/fredericia/trinidad-chair/variant1.jpg", material: "Black & Chrome", price: 6245 },
      { name: "Grey & Flint", image: "/fredericia/trinidad-chair/variant2.jpg", material: "Grey & Flint", price: 6245 }
    ]
  },
  {
    id: "wegner-j16-rocking-chair",
    name: "Wegner J16 Rocking Chair",
    description: "Classic rocking chair designed by Hans J. Wegner. Combines traditional craftsmanship with timeless comfort and elegance.",
    price: 30900,
    image: "/fredericia/wegner-j16-rocking-chair/main.jpg",
    variants: [{ name: "Oiled Oak Natural Seat", image: "/fredericia/wegner-j16-rocking-chair/main.jpg", material: "Oiled oak", price: 30900 }]
  }
];

// Helper function to create image path reference (no actual upload)
async function createImageReference(imagePath) {
  try {
    console.log(`Processing image: ${imagePath}`);
    // For now, just return null since we don't have actual image assets
    // The frontend will handle static image paths directly
    return null;
  } catch (error) {
    console.error(`Error processing image ${imagePath}:`, error);
    return null;
  }
}

// Helper function to create slug from product name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Convert static product to Sanity format
async function convertProductToSanityFormat(product) {
  console.log(`Converting product: ${product.name}`);
  
  const slug = createSlug(product.name);
  const mainImage = await createImageReference(product.image);
  
  // Process variants
  const variants = [];
  if (product.variants && product.variants.length > 0) {
    for (const variant of product.variants) {
      const variantImage = await createImageReference(variant.image);
      variants.push({
        _key: `variant-${variant.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        name: variant.name,
        image: variantImage,
        color: variant.color || null,
        material: variant.material || null,
        size: variant.size || null,
        price: variant.price || product.price
      });
    }
  }
  
  // Process lifestyle images
  const lifestyleImages = [];
  if (product.lifestyleImages && product.lifestyleImages.length > 0) {
    for (const imagePath of product.lifestyleImages) {
      const lifestyleImage = await createImageReference(imagePath);
      if (lifestyleImage) {
        lifestyleImages.push({
          _key: `lifestyle-${imagePath.replace(/[^a-zA-Z0-9]/g, '')}`,
          ...lifestyleImage
        });
      }
    }
  }

  return {
    _type: 'product',
    _id: `fredericia-${product.id}`,
    name: product.name,
    slug: {
      _type: 'slug',
      current: slug
    },
    image: mainImage,
    description: product.description,
    price: product.price,
    brand: 'Fredericia',
    categories: [], // You can add categories later if needed
    href: `/fredericia/${product.id}`,
    variants: variants,
    lifestyleImages: lifestyleImages,
    roomCategory: 'furniture', // Default category
    stock: 10, // Default stock
    inStock: true
  };
}

async function addMissingFredericiaProducts() {
  try {
    console.log('🚀 Starting Fredericia products migration...');
    console.log(`📦 Adding ${missingProducts.length} missing products to Sanity\n`);

    // Check existing products first
    const existingProducts = await client.fetch('*[_type == "product" && brand == "Fredericia"]');
    console.log(`📊 Found ${existingProducts.length} existing Fredericia products in Sanity`);
    
    const existingIds = existingProducts.map(p => p._id);
    console.log('Existing product IDs:', existingIds);

    const productsToAdd = [];
    
    for (const product of missingProducts) {
      const sanityId = `fredericia-${product.id}`;
      
      if (existingIds.includes(sanityId)) {
        console.log(`⏭️  Skipping ${product.name} - already exists`);
        continue;
      }
      
      console.log(`✨ Preparing ${product.name}...`);
      const sanityProduct = await convertProductToSanityFormat(product);
      productsToAdd.push(sanityProduct);
    }

    if (productsToAdd.length === 0) {
      console.log('✅ All products already exist in Sanity!');
      return;
    }

    console.log(`\n📤 Uploading ${productsToAdd.length} products to Sanity...`);
    
    // Create products in batches
    const batchSize = 5;
    for (let i = 0; i < productsToAdd.length; i += batchSize) {
      const batch = productsToAdd.slice(i, i + batchSize);
      console.log(`Uploading batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(productsToAdd.length/batchSize)}...`);
      
      const transaction = client.transaction();
      batch.forEach(product => {
        transaction.createOrReplace(product);
      });
      
      await transaction.commit();
      console.log(`✅ Batch ${Math.floor(i/batchSize) + 1} uploaded successfully`);
    }

    // Verify the upload
    const finalCount = await client.fetch('count(*[_type == "product" && brand == "Fredericia"])');
    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`📊 Total Fredericia products in Sanity: ${finalCount}`);
    
    if (finalCount >= 15) {
      console.log('✅ All 15 Fredericia products are now in Sanity!');
    } else {
      console.log(`⚠️  Expected 15 products, but found ${finalCount}. Some products may need manual review.`);
    }

  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
addMissingFredericiaProducts();
