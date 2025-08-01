// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Try to use the client from next-sanity first, fallback to @sanity/client
let createClient;
try {
  createClient = require('next-sanity').createClient;
} catch (error) {
  try {
    createClient = require('@sanity/client').createClient;
  } catch (fallbackError) {
    console.error('❌ Could not import Sanity client. Please install @sanity/client:');
    console.error('npm install @sanity/client');
    process.exit(1);
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-06-13',
});

// Complete collection of FLOS and Louis Poulsen lighting products
const lightingProducts = [
  // FLOS Products (22 products)
  {
    name: '2097/18 Chandelier',
    slug: '2097-18-chandelier',
    brand: 'FLOS',
    description: 'Iconic Gino Sarfatti chandelier with 18 bulbs. A masterpiece of Italian lighting design.',
    price: 18500,
    stock: 3,
    inStock: true
  },
  {
    name: '2097/30 Chandelier',
    slug: '2097-30-chandelier',
    brand: 'FLOS',
    description: 'Mid-size Sarfatti chandelier with 30 bulbs. Perfect balance of scale and illumination.',
    price: 28050,
    stock: 2,
    inStock: true
  },
  {
    name: '2097/50 Chandelier',
    slug: '2097-50-chandelier',
    brand: 'FLOS',
    description: 'Grand Sarfatti chandelier with 50 bulbs. The ultimate statement lighting piece.',
    price: 89999,
    stock: 1,
    inStock: true
  },
  {
    name: 'IC Lights Table T1',
    slug: 'ic-lights-table-t1',
    brand: 'FLOS',
    description: 'Minimalist table lamp with glass sphere. Contemporary design meets functionality.',
    price: 5200,
    stock: 4,
    inStock: true
  },
  {
    name: 'IC Lights Suspension S1',
    slug: 'ic-lights-suspension-s1',
    brand: 'FLOS',
    description: 'Elegant pendant light with balanced design. Perfect for dining areas.',
    price: 6800,
    stock: 3,
    inStock: true
  },
  {
    name: 'IC Lights Floor F1',
    slug: 'ic-lights-floor-f1',
    brand: 'FLOS',
    description: 'Floor lamp version of the IC Lights series. Sophisticated ambient lighting.',
    price: 8900,
    stock: 2,
    inStock: true
  },
  {
    name: 'Arco Floor Lamp',
    slug: 'arco-floor-lamp',
    brand: 'FLOS',
    description: 'Iconic arc floor lamp by Castiglioni brothers. Carrara marble base with steel arc.',
    price: 45000,
    stock: 1,
    inStock: true
  },
  {
    name: 'Taccia Table Lamp',
    slug: 'taccia-table-lamp',
    brand: 'FLOS',
    description: 'Classic table lamp with glass diffuser. Timeless Italian design.',
    price: 7200,
    stock: 3,
    inStock: true
  },
  {
    name: 'Parentesi Suspension',
    slug: 'parentesi-suspension',
    brand: 'FLOS',
    description: 'Adjustable suspension light with cable system. Industrial meets elegant.',
    price: 4500,
    stock: 5,
    inStock: true
  },
  {
    name: 'Snoopy Table Lamp',
    slug: 'snoopy-table-lamp',
    brand: 'FLOS',
    description: 'Playful table lamp with marble base. Iconic 1960s design.',
    price: 6500,
    stock: 4,
    inStock: true
  },
  {
    name: 'Spun Light T1',
    slug: 'spun-light-t1',
    brand: 'FLOS',
    description: 'Spun aluminum table lamp. Contemporary sculptural lighting.',
    price: 3800,
    stock: 6,
    inStock: true
  },
  {
    name: 'Spun Light F',
    slug: 'spun-light-f',
    brand: 'FLOS',
    description: 'Floor version of the Spun Light series. Modern ambient lighting.',
    price: 5200,
    stock: 3,
    inStock: true
  },
  {
    name: 'Kelvin LED Table',
    slug: 'kelvin-led-table',
    brand: 'FLOS',
    description: 'High-tech LED desk lamp with precise control. Perfect for work spaces.',
    price: 8900,
    stock: 4,
    inStock: true
  },
  {
    name: 'Kelvin LED Floor',
    slug: 'kelvin-led-floor',
    brand: 'FLOS',
    description: 'Floor version of the Kelvin LED series. Advanced lighting technology.',
    price: 12500,
    stock: 2,
    inStock: true
  },
  {
    name: 'Tab T LED',
    slug: 'tab-t-led',
    brand: 'FLOS',
    description: 'Minimalist LED table lamp. Clean lines and efficient lighting.',
    price: 4200,
    stock: 5,
    inStock: true
  },
  {
    name: 'Tab F LED',
    slug: 'tab-f-led',
    brand: 'FLOS',
    description: 'Floor version of the Tab LED series. Elegant and efficient.',
    price: 6800,
    stock: 3,
    inStock: true
  },
  {
    name: 'Goldman Table',
    slug: 'goldman-table',
    brand: 'FLOS',
    description: 'Sophisticated table lamp with brass details. Luxury lighting design.',
    price: 9500,
    stock: 2,
    inStock: true
  },
  {
    name: 'Goldman Floor',
    slug: 'goldman-floor',
    brand: 'FLOS',
    description: 'Floor version of the Goldman series. Statement luxury lighting.',
    price: 15000,
    stock: 1,
    inStock: true
  },
  {
    name: 'Bellhop Table',
    slug: 'bellhop-table',
    brand: 'FLOS',
    description: 'Portable LED table lamp. Modern convenience meets style.',
    price: 2800,
    stock: 8,
    inStock: true
  },
  {
    name: 'Bellhop Floor',
    slug: 'bellhop-floor',
    brand: 'FLOS',
    description: 'Floor version of the Bellhop series. Portable luxury lighting.',
    price: 4200,
    stock: 4,
    inStock: true
  },
  {
    name: 'String Light Sphere',
    slug: 'string-light-sphere',
    brand: 'FLOS',
    description: 'Spherical pendant with LED string technology. Contemporary art meets lighting.',
    price: 12000,
    stock: 2,
    inStock: true
  },
  {
    name: 'String Light Cone',
    slug: 'string-light-cone',
    brand: 'FLOS',
    description: 'Conical pendant with LED string technology. Architectural lighting design.',
    price: 8500,
    stock: 3,
    inStock: true
  },

  // Louis Poulsen Products (23 products)
  {
    name: 'PH 5 Pendant',
    slug: 'ph-5-pendant',
    brand: 'Louis Poulsen',
    description: 'Poul Henningsen\'s iconic three-shade system pendant light. The ultimate Danish design classic.',
    price: 4500,
    stock: 5,
    inStock: true
  },
  {
    name: 'PH 3½-3 Table',
    slug: 'ph-3-5-3-table',
    brand: 'Louis Poulsen',
    description: 'Classic PH table lamp with three-shade system. Perfect reading light.',
    price: 6200,
    stock: 4,
    inStock: true
  },
  {
    name: 'PH 2/1 Table',
    slug: 'ph-2-1-table',
    brand: 'Louis Poulsen',
    description: 'Compact PH table lamp. Ideal for intimate lighting.',
    price: 3800,
    stock: 6,
    inStock: true
  },
  {
    name: 'Panthella Table 250',
    slug: 'panthella-table-250',
    brand: 'Louis Poulsen',
    description: 'Verner Panton\'s sculptural table lamp in 250mm size.',
    price: 3200,
    stock: 5,
    inStock: true
  },
  {
    name: 'Panthella Table 400',
    slug: 'panthella-table-400',
    brand: 'Louis Poulsen',
    description: 'Larger version of the Panthella table lamp in 400mm size.',
    price: 4800,
    stock: 3,
    inStock: true
  },
  {
    name: 'Panthella Floor',
    slug: 'panthella-floor',
    brand: 'Louis Poulsen',
    description: 'Floor version of the iconic Panthella lamp. Statement lighting piece.',
    price: 8500,
    stock: 2,
    inStock: true
  },
  {
    name: 'Panthella 160 Portable',
    slug: 'panthella-160-portable',
    brand: 'Louis Poulsen',
    description: 'Portable LED version of the Panthella. Modern convenience meets classic design.',
    price: 2800,
    stock: 8,
    inStock: true
  },
  {
    name: 'AJ Table',
    slug: 'aj-table',
    brand: 'Louis Poulsen',
    description: 'Arne Jacobsen\'s timeless table lamp design. Danish modernism at its finest.',
    price: 4200,
    stock: 4,
    inStock: true
  },
  {
    name: 'AJ Floor',
    slug: 'aj-floor',
    brand: 'Louis Poulsen',
    description: 'Floor version of the AJ lamp. Iconic Danish design for modern interiors.',
    price: 6800,
    stock: 3,
    inStock: true
  },
  {
    name: 'AJ Wall',
    slug: 'aj-wall',
    brand: 'Louis Poulsen',
    description: 'Wall-mounted version of the AJ lamp. Space-saving elegance.',
    price: 3800,
    stock: 5,
    inStock: true
  },
  {
    name: 'PH Artichoke 480',
    slug: 'ph-artichoke-480',
    brand: 'Louis Poulsen',
    description: 'Poul Henningsen\'s masterpiece pendant in 480mm size. The ultimate design icon.',
    price: 45000,
    stock: 1,
    inStock: true
  },
  {
    name: 'PH Artichoke 600',
    slug: 'ph-artichoke-600',
    brand: 'Louis Poulsen',
    description: 'Larger version of the PH Artichoke in 600mm size. Architectural lighting statement.',
    price: 65000,
    stock: 1,
    inStock: true
  },
  {
    name: 'PH Artichoke 720',
    slug: 'ph-artichoke-720',
    brand: 'Louis Poulsen',
    description: 'Grand version of the PH Artichoke in 720mm size. The ultimate luxury lighting.',
    price: 85000,
    stock: 1,
    inStock: true
  },
  {
    name: 'Toldbod Glass 120',
    slug: 'toldbod-glass-120',
    brand: 'Louis Poulsen',
    description: 'Classic Danish pendant with brass details in 120mm size.',
    price: 2200,
    stock: 6,
    inStock: true
  },
  {
    name: 'Toldbod Glass 155',
    slug: 'toldbod-glass-155',
    brand: 'Louis Poulsen',
    description: 'Medium size Toldbod pendant in 155mm. Traditional Danish design.',
    price: 2800,
    stock: 4,
    inStock: true
  },
  {
    name: 'Toldbod Glass 220',
    slug: 'toldbod-glass-220',
    brand: 'Louis Poulsen',
    description: 'Large Toldbod pendant in 220mm size. Classic maritime inspiration.',
    price: 3500,
    stock: 3,
    inStock: true
  },
  {
    name: 'VL38 Table',
    slug: 'vl38-table',
    brand: 'Louis Poulsen',
    description: 'Vilhelm Lauritzen\'s architectural table lamp. Functionalist design classic.',
    price: 5200,
    stock: 3,
    inStock: true
  },
  {
    name: 'VL38 Floor',
    slug: 'vl38-floor',
    brand: 'Louis Poulsen',
    description: 'Floor version of the VL38 lamp. Architectural lighting for modern spaces.',
    price: 7800,
    stock: 2,
    inStock: true
  },
  {
    name: 'NJP Table',
    slug: 'njp-table',
    brand: 'Louis Poulsen',
    description: 'Nendo\'s contemporary table lamp. Japanese minimalism meets Danish craftsmanship.',
    price: 4800,
    stock: 4,
    inStock: true
  },
  {
    name: 'NJP Floor',
    slug: 'njp-floor',
    brand: 'Louis Poulsen',
    description: 'Floor version of the NJP lamp. Modern functionality with timeless appeal.',
    price: 7200,
    stock: 2,
    inStock: true
  },
  {
    name: 'Yuh Table',
    slug: 'yuh-table',
    brand: 'Louis Poulsen',
    description: 'GamFratesi\'s contemporary table lamp. Italian design meets Danish quality.',
    price: 5500,
    stock: 3,
    inStock: true
  },
  {
    name: 'Yuh Floor',
    slug: 'yuh-floor',
    brand: 'Louis Poulsen',
    description: 'Floor version of the Yuh lamp. Contemporary elegance for modern interiors.',
    price: 8200,
    stock: 2,
    inStock: true
  },
  {
    name: 'Enigma 425',
    slug: 'enigma-425',
    brand: 'Louis Poulsen',
    description: 'Shoichi Uchiyama\'s pendant light. Mysterious beauty in lighting design.',
    price: 12000,
    stock: 2,
    inStock: true
  }
];

async function addAllLightingProducts() {
  try {
    console.log('🚀 Adding complete FLOS and Louis Poulsen lighting collection to Sanity...\n');

    // Get the lighting category
    const lightingCategory = await client.fetch(`*[_type == "category" && slug.current == "lighting"][0]`);
    if (!lightingCategory) {
      console.error('❌ Lighting category not found. Please run the lighting category script first.');
      return;
    }
    console.log('✅ Found lighting category:', lightingCategory._id);

    let createdCount = 0;
    let updatedCount = 0;
    let errorCount = 0;

    console.log(`📦 Processing ${lightingProducts.length} lighting products...\n`);

    for (const productData of lightingProducts) {
      try {
        // Check if product already exists
        const existingProduct = await client.fetch(`*[_type == "product" && slug.current == "${productData.slug}"][0]`);
        
        const sanityProduct = {
          _type: 'product',
          name: productData.name,
          slug: { _type: 'slug', current: productData.slug },
          brand: productData.brand,
          description: productData.description,
          price: productData.price,
          categories: [{ _ref: lightingCategory._id, _type: 'reference' }],
          stock: productData.stock,
          inStock: productData.inStock
        };

        if (existingProduct) {
          // Update existing product
          await client
            .patch(existingProduct._id)
            .set(sanityProduct)
            .commit();
          console.log(`🔄 Updated: ${productData.name} (${productData.brand})`);
          updatedCount++;
        } else {
          // Create new product
          await client.create(sanityProduct);
          console.log(`✅ Created: ${productData.name} (${productData.brand})`);
          createdCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${productData.name}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n🎉 Lighting collection processing completed!');
    console.log(`✅ Created: ${createdCount} products`);
    console.log(`🔄 Updated: ${updatedCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);

    // Verify the results
    console.log('\n🔍 Verifying lighting products in Sanity...');
    const allLightingProducts = await client.fetch(`
      *[_type == "product" && "lighting" in categories[]->slug.current] {
        name,
        brand,
        price
      } | order(brand asc, name asc)
    `);
    
    console.log(`\n📊 Total lighting products in Sanity: ${allLightingProducts.length}`);
    
    // Group by brand
    const flosProducts = allLightingProducts.filter(p => p.brand === 'FLOS');
    const louisPoulsenProducts = allLightingProducts.filter(p => p.brand === 'Louis Poulsen');
    
    console.log(`🔥 FLOS products: ${flosProducts.length}`);
    console.log(`💡 Louis Poulsen products: ${louisPoulsenProducts.length}`);
    
    if (allLightingProducts.length === 45) {
      console.log('\n🎯 Perfect! All 45 lighting products are now in Sanity.');
    } else {
      console.log(`\n⚠️  Expected 45 products, found ${allLightingProducts.length}`);
    }

  } catch (error) {
    console.error('💥 Error adding lighting products:', error);
  }
}

// Check environment variables
function checkEnvironment() {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN'
  ];
  
  const missing = required.filter(env => !process.env[env]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(env => console.error(`  - ${env}`));
    console.error('\nPlease set these in your .env.local file');
    process.exit(1);
  }
}

// Check environment variables and run the script
checkEnvironment();
addAllLightingProducts();
