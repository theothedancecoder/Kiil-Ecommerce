import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

const duxProducts = [
  {
    name: "Inter Dining Table",
    slug: "inter-dining-table",
    description: "This is a made to order item. Expected delivery time is approximately 8 weeks. The Inter table is available in two sizes and two colors. A classic cafe table, perfect for smaller dining areas or a classic dining table perfect for 6 people. The plate is made of nanolaminate which is very durable.",
    price: 19490,
    brand: "DUX",
    designer: "DUX Design Team",
    subcategory: "tables",
    roomCategory: "dining",
    features: [
      "Made to order - Expected delivery time approximately 8 weeks",
      "Designed by DUX Design Team in 1986",
      "Available in two sizes: round Ø-110 and rectangular 100×180",
      "Available in two colors: white and black nanolaminate",
      "Classic cafe table perfect for smaller dining areas",
      "Rectangular version perfect for 6 people",
      "Durable nanolaminate tabletop surface",
      "Chrome base construction for stability",
      "Optional insert panels available for extension (55cm each)"
    ],
    specifications: [
      { label: "Designer", value: "DUX Design Team" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Design Year", value: "1986" },
      { label: "Round Table Diameter", value: "Ø-110 cm" },
      { label: "Round Table Height", value: "72 cm" },
      { label: "Rectangular Table Size", value: "100×180 cm" },
      { label: "Rectangular Table Height", value: "72 cm" },
      { label: "Insert Panel Size", value: "55 cm each" },
      { label: "Tabletop Material", value: "Nanolaminate" },
      { label: "Base Material", value: "Chrome" },
      { label: "Available Colors", value: "White laminate, Black laminate" },
      { label: "Round Table Capacity", value: "Perfect for smaller dining areas" },
      { label: "Rectangular Table Capacity", value: "Perfect for 6 people" },
      { label: "Surface Properties", value: "Very durable nanolaminate" },
      { label: "Extension Options", value: "2 insert panels available for rectangular table" },
      { label: "Style", value: "Classic cafe table design" },
      { label: "Delivery Time", value: "Approximately 8 weeks (Made to order)" },
      { label: "Durability", value: "High durability nanolaminate surface" },
      { label: "Base Design", value: "Chrome pedestal base" }
    ]
  },
  {
    name: "Jetson Classic Soft 88",
    slug: "jetson-classic-soft-88",
    description: "Dux is perhaps best known for its patented beds, but the Swedes can really make furniture too. Dux stands for ergonomics, quality and timelessness. We offer the Jetson 88 armchair, a classic that is built on the same base as the chair of the same name that Bruno Mathsson signed in 1966. Jetson has a sophisticated design and a great shape. It is upholstered in Classic Soft leather in black. The swivel chair exudes comfort, and fits in both modern and more classic homes.",
    price: 27990,
    brand: "DUX",
    designer: "Bruno Mathsson",
    subcategory: "chairs",
    roomCategory: "living",
    features: [
      "Ergonomic design for maximum comfort",
      "Swivel functionality for versatility",
      "Premium Classic Soft leather upholstery",
      "Built on Bruno Mathsson's 1966 design foundation",
      "Sophisticated and timeless aesthetic",
      "Suitable for both modern and classic interiors"
    ],
    specifications: [
      { label: "Designer", value: "Bruno Mathsson" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Dimensions", value: "W 65 x D 83 x H 97 cm" },
      { label: "Weight", value: "10 kg" },
      { label: "Material", value: "Classic Soft leather" },
      { label: "Design Options", value: "Classic Soft 25 / flax 21" },
      { label: "Year", value: "1966 (Original design)" },
      { label: "Type", value: "Swivel armchair" }
    ]
  },
  {
    name: "Jetson Match Flax 21",
    slug: "jetson-match-flax-21",
    description: "Jetson Match is a special design of the Jetson armchair, a tribute to Bruno Mathsson and his design of the Swedish design classic. Jetson Match is made of the linen fabric Flax 21 which, together with the edges, frame and neck cushion in black or cognac color of the exclusive Dakota leather, creates a combination of materials that marry incredibly nicely and stylishly together. Jetson Match armchair has a seat element made of tubes with a chrome-plated frame, and rotor construction together with leather and linen. Feel free to use together with the matching Jetson 69 Footstool from Bruno Mathsson International.",
    price: 27990,
    brand: "DUX",
    designer: "Bruno Mathsson",
    subcategory: "chairs",
    roomCategory: "living",
    features: [
      "Special design tribute to Bruno Mathsson's Swedish design classic",
      "Made with premium Flax 21 linen fabric",
      "Exclusive Dakota leather edges, frame and neck cushion",
      "Available in black or cognac Dakota leather combinations",
      "Seat element made of tubes with chrome-plated frame",
      "Rotor construction with leather and linen materials",
      "Sophisticated combination of materials that marry stylishly",
      "Compatible with matching Jetson 69 Footstool",
      "Swivel armchair functionality"
    ],
    specifications: [
      { label: "Designer", value: "Bruno Mathsson" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Collection", value: "Bruno Mathsson International" },
      { label: "Width", value: "65 cm" },
      { label: "Height", value: "97 cm" },
      { label: "Depth", value: "83 cm" },
      { label: "Seat Height", value: "40 cm" },
      { label: "Weight", value: "10 kg" },
      { label: "Dimensions (Packaged)", value: "90 × 90 × 100 cm" },
      { label: "Primary Material", value: "Flax 21 linen fabric" },
      { label: "Accent Material", value: "Dakota leather (edges, frame, neck cushion)" },
      { label: "Frame Material", value: "Chrome-plated metal" },
      { label: "Construction", value: "Rotor construction with tubes" },
      { label: "Leather Options", value: "Black (Dakota 88), Cognac (Dakota 29), Dakota 24" },
      { label: "Finish Combination", value: "Linen, leather, metal" },
      { label: "Type", value: "Swivel armchair" },
      { label: "Style", value: "Swedish design classic tribute" },
      { label: "Matching Accessories", value: "Jetson 69 Footstool available" },
      { label: "Design Heritage", value: "Tribute to Bruno Mathsson's original design" }
    ]
  },
  {
    name: "Lunaria Table",
    slug: "lunaria-table",
    description: "This is a made to order item. Expected delivery time is approximately 8 weeks. The Lunaria series consists of 3 different small tables that look just as good in a group as they do individually. The tables have an organic shape that makes them stand out. Here in wax-oiled ash, but also available in wax-oiled oak and wax-oiled walnut. Contact us at gjovik@kiil.no for a quote.",
    price: 10215,
    brand: "DUX",
    designer: "Claesson Koivisto Rune",
    subcategory: "tables",
    roomCategory: "living",
    features: [
      "Made to order - Expected delivery time approximately 8 weeks",
      "Designed by Claesson Koivisto Rune in 2018",
      "Organic shape that makes them stand out",
      "Available in 3 different sizes (Small, Medium, Large)",
      "Look great individually or as a group",
      "Solid wood construction with wax-oil finish",
      "Available in ash, oak, and walnut wood options",
      "Custom quotes available - contact gjovik@kiil.no",
      "Timeless Scandinavian design aesthetic"
    ],
    specifications: [
      { label: "Designer", value: "Claesson Koivisto Rune" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Design Year", value: "2018" },
      { label: "Collection", value: "Lunaria Series" },
      { label: "Material", value: "Solid wood with wax-oil finish" },
      { label: "Wood Options", value: "Ash, Oak, Walnut" },
      { label: "Small Size - Height", value: "50 cm" },
      { label: "Small Size - Diameter", value: "39 cm" },
      { label: "Medium Size - Height", value: "45 cm" },
      { label: "Medium Size - Diameter", value: "60 cm" },
      { label: "Large Size - Height", value: "40 cm" },
      { label: "Large Size - Diameter", value: "86 cm" },
      { label: "Shape", value: "Organic circular design" },
      { label: "Finish", value: "Wax-oiled" },
      { label: "Usage", value: "Individual or group arrangement" },
      { label: "Style", value: "Modern Scandinavian" },
      { label: "Delivery Time", value: "Approximately 8 weeks (Made to order)" },
      { label: "Custom Orders", value: "Contact gjovik@kiil.no for quotes" },
      { label: "Weight", value: "N/A (Contact for specifications)" },
      { label: "Dimensions", value: "Varies by size selection" }
    ]
  },
  {
    name: "Sam Dining Chair",
    slug: "sam-dining-chair",
    description: "This is a made to order item. Expected delivery time is approximately 12 weeks. Sam is an elegant and comfortable chair from Dux, designed by Sam Larsson in 1974. The dining chair was relaunched in 2015 as part of the DUX Design Revival. The chair has a chrome frame and a tufted seat with cold foam, both the seat and back are upholstered in leather and the back is upholstered in fabric. There is also a decorative buckle on the back of the chair. The chair is available with or without armrests. Sam was relaunched by Dux in 2015.",
    price: 13790,
    brand: "DUX",
    designer: "Sam Larsson",
    subcategory: "chairs",
    roomCategory: "dining",
    features: [
      "Made to order - Expected delivery time approximately 12 weeks",
      "Elegant and comfortable design by Sam Larsson (1974)",
      "Chrome frame with tufted seat and cold foam padding",
      "Seat and back upholstered in premium leather",
      "Back also upholstered in fabric with decorative buckle",
      "Available with or without armrests",
      "Part of DUX Design Revival collection",
      "Relaunched in 2015 from original 1974 design",
      "Multiple leather finish options available"
    ],
    specifications: [
      { label: "Designer", value: "Sam Larsson" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Original Design Year", value: "1974" },
      { label: "Relaunch Year", value: "2015" },
      { label: "Collection", value: "DUX Design Revival" },
      { label: "Weight", value: "8 kg" },
      { label: "Dimensions (Packaged)", value: "65 × 66 × 90 cm" },
      { label: "Width (With Armrest)", value: "62 cm" },
      { label: "Width (Without Armrest)", value: "48 cm" },
      { label: "Depth - Legs (With Armrest)", value: "52.5 cm" },
      { label: "Total Depth (With Armrest)", value: "57 cm" },
      { label: "Depth - Legs (Without Armrest)", value: "50 cm" },
      { label: "Total Depth (Without Armrest)", value: "55 cm" },
      { label: "Seat Height", value: "45 cm, 48 cm" },
      { label: "Height - Armrests", value: "62 cm" },
      { label: "Total Height (With Armrest)", value: "81 cm, 84 cm" },
      { label: "Total Height (Without Armrest)", value: "78 cm, 81 cm" },
      { label: "Padding", value: "Cold foam" },
      { label: "Base Material", value: "Chrome" },
      { label: "Upholstery", value: "Leather (seat and back) + Fabric (back)" },
      { label: "Available Colors", value: "Classic Soft 88, Naturale Camel, Naturale Perle, Naturale Truffle" },
      { label: "Model Options", value: "With Armrest, Without Armrest" },
      { label: "Special Features", value: "Decorative buckle on back, Tufted seat" },
      { label: "Delivery Time", value: "Approximately 12 weeks (Made to order)" }
    ]
  },
  {
    name: "Superspider Sheepskin",
    slug: "superspider-sheepskin",
    description: "This is a made to order item. Expected delivery time is approximately 8 weeks. Superspider was designed by the DUX design team in 1987. It has become a classic and combines first-class material selection with modern design. Available in several colors and different fabrics, leather or sheepskin.",
    price: 53815,
    brand: "DUX",
    designer: "DUX Design Team",
    subcategory: "chairs",
    roomCategory: "living",
    features: [
      "Made to order - Expected delivery time approximately 8 weeks",
      "Designed by DUX Design Team in 1987",
      "Classic design combining first-class material selection with modern aesthetics",
      "Available in several colors and different materials (fabric, leather, sheepskin)",
      "Seat and backrest constructed with tubular steel frame",
      "Pirelli strap support system for enhanced comfort",
      "Filled with polyester and fiberfill for optimal comfort",
      "Chrome-plated frame for durability and style",
      "Leather neck cushion included with fabric cover versions"
    ],
    specifications: [
      { label: "Designer", value: "DUX Design Team" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Design Year", value: "1987" },
      { label: "Width", value: "75 cm" },
      { label: "Height", value: "86 cm" },
      { label: "Seat Height", value: "38 cm" },
      { label: "Depth", value: "149 cm" },
      { label: "Weight", value: "20 kg" },
      { label: "Dimensions (Packaged)", value: "160 × 90 × 100 cm" },
      { label: "Frame Material", value: "Tubular steel, chrome-plated" },
      { label: "Support System", value: "Pirelli strap for enhanced support" },
      { label: "Filling", value: "Polyester and fiberfill" },
      { label: "Available Materials", value: "Fabric, Leather, Sheepskin" },
      { label: "Available Colors", value: "Black 01, Cork 19, Drake 20, Mohawi 21, Off-white 02, Scandinavian Gray 22" },
      { label: "Special Features", value: "Leather neck cushion (with fabric versions)" },
      { label: "Style", value: "Modern classic design" },
      { label: "Material Quality", value: "First-class material selection" },
      { label: "Delivery Time", value: "Approximately 8 weeks (Made to order)" },
      { label: "Design Heritage", value: "Classic since 1987" }
    ]
  }
];

async function createDuxCategory() {
  console.log('🏷️ Creating Dux category...');
  
  const category = {
    _type: 'category',
    title: 'DUX',
    slug: {
      _type: 'slug',
      current: 'dux'
    },
    description: 'Swedish furniture brand known for ergonomic design, quality and timelessness since 1926.'
  };

  try {
    const result = await client.create(category);
    console.log('✅ Dux category created:', result._id);
    return result._id;
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('ℹ️ Dux category already exists, fetching existing...');
      const existing = await client.fetch('*[_type == "category" && slug.current == "dux"][0]');
      return existing._id;
    }
    throw error;
  }
}

async function migrateDuxProducts() {
  console.log('🚀 Starting Dux products migration to Sanity...');
  
  try {
    // Create category first
    const categoryId = await createDuxCategory();
    
    console.log('📦 Migrating Dux products...');
    
    for (const productData of duxProducts) {
      console.log(`\n📝 Creating product: ${productData.name}`);
      
      const product = {
        _type: 'product',
        name: productData.name,
        slug: {
          _type: 'slug',
          current: productData.slug
        },
        description: productData.description,
        price: productData.price,
        brand: productData.brand,
        designer: productData.designer,
        subcategory: productData.subcategory,
        roomCategory: productData.roomCategory,
        features: productData.features,
        specifications: productData.specifications,
        categories: [
          {
            _type: 'reference',
            _ref: categoryId
          }
        ],
        inStock: true,
        stock: 10
      };

      try {
        const result = await client.create(product);
        console.log(`✅ Created product: ${productData.name} (${result._id})`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️ Product ${productData.name} already exists, skipping...`);
        } else {
          console.error(`❌ Error creating product ${productData.name}:`, error.message);
        }
      }
    }
    
    console.log('\n🎉 Dux products migration completed!');
    console.log(`📊 Processed ${duxProducts.length} products`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateDuxProducts();
