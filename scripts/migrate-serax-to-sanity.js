const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

const seraxProducts = [
  {
    name: "Broquaine Vase H38 cm",
    slug: { _type: "slug", current: "broquaine-vase-h38" },
    description: "Elegant ceramic vase with distinctive textured surface and sophisticated form. The Broquaine collection represents contemporary Belgian design at its finest, combining artisanal craftsmanship with modern aesthetics to create pieces that are both functional and sculptural.",
    price: 1395,
    brand: "Serax",
    designer: "Serax Design Studio",
    features: [
      "Contemporary Belgian design excellence",
      "Distinctive textured ceramic surface with artisanal appeal",
      "Perfect height for fresh or dried flower arrangements",
      "Sophisticated neutral color palette complements any decor",
      "Handcrafted ceramic construction with attention to detail",
      "Versatile size suitable for various interior styles",
      "Modern sculptural form that works as standalone art piece",
      "Premium quality materials ensuring durability",
      "Easy to clean and maintain",
      "Suitable for both residential and commercial spaces",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "High-quality ceramic" },
      { label: "Height", value: "38 cm" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Finish", value: "Textured ceramic with natural glaze" },
      { label: "Care", value: "Clean with damp cloth, avoid abrasive cleaners" },
      { label: "Use", value: "Decorative vase for fresh or dried flowers" },
      { label: "Weight", value: "Approximately 1.2 kg" },
      { label: "Warranty", value: "1 year manufacturer warranty" },
      { label: "Origin", value: "Belgian design and craftsmanship" },
    ],
    variants: [
      {
        _type: "variant",
        name: "Natural",
        color: "Natural",
        price: 1395,
      },
    ],
    inStock: true,
    stock: 10,
  },
  {
    name: "Broquaine Vase S H28 cm",
    slug: { _type: "slug", current: "broquaine-vase-s-h28" },
    description: "Smaller version of the elegant Broquaine vase, perfect for intimate spaces and smaller floral arrangements. Features the same distinctive textured surface and sophisticated design aesthetic as the larger version, making it ideal for creating coordinated displays.",
    price: 995,
    brand: "Serax",
    designer: "Serax Design Studio",
    features: [
      "Compact size perfect for smaller spaces and intimate settings",
      "Same distinctive textured surface as the larger Broquaine vase",
      "Ideal for creating intimate floral arrangements",
      "Contemporary Belgian design aesthetic with timeless appeal",
      "Handcrafted ceramic construction with artisanal quality",
      "Neutral color palette that complements any interior",
      "Modern sculptural form with elegant proportions",
      "Premium quality ceramic materials for longevity",
      "Easy maintenance and cleaning",
      "Perfect for pairing with larger Broquaine pieces",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "High-quality ceramic" },
      { label: "Height", value: "28 cm" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Finish", value: "Textured ceramic with natural glaze" },
      { label: "Care", value: "Clean with damp cloth, avoid harsh chemicals" },
      { label: "Use", value: "Decorative vase for small arrangements" },
      { label: "Weight", value: "Approximately 0.8 kg" },
      { label: "Warranty", value: "1 year manufacturer warranty" },
      { label: "Origin", value: "Belgian design and craftsmanship" },
    ],
    variants: [
      {
        _type: "variant",
        name: "Natural",
        color: "Natural",
        price: 995,
      },
    ],
    inStock: true,
    stock: 8,
  },
  {
    name: "Catherine Table Lamp 47 cm",
    slug: { _type: "slug", current: "catherine-table-lamp-47" },
    description: "Sophisticated table lamp with clean lines and contemporary design. The Catherine lamp combines functionality with elegant aesthetics, perfect for modern interiors. Available in classic black and white finishes to complement any decor style.",
    price: 4295,
    brand: "Serax",
    designer: "Serax Design Studio",
    features: [
      "Contemporary Belgian lighting design with timeless appeal",
      "Clean lines and minimalist aesthetic for modern interiors",
      "Available in classic black and white color options",
      "Perfect height for table and desk use in various settings",
      "High-quality construction materials ensuring durability",
      "Elegant proportions that complement contemporary decor",
      "Versatile design suitable for residential and commercial use",
      "Professional lighting quality with warm ambient illumination",
      "Easy assembly and maintenance",
      "Suitable for bedside, desk, or accent lighting applications",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "Metal base with fabric shade" },
      { label: "Height", value: "47 cm" },
      { label: "Color Options", value: "Black, White" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Light Source", value: "E27 bulb (not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "On/off switch on cord" },
      { label: "Care", value: "Clean with soft cloth, vacuum shade gently" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Belgian design" },
    ],
    variants: [
      {
        _type: "variant",
        name: "Black",
        color: "Black",
        price: 4295,
      },
      {
        _type: "variant",
        name: "White",
        color: "White",
        price: 4295,
      },
    ],
    inStock: true,
    stock: 5,
  },
  {
    name: "Glass Vase Wind & Fire",
    slug: { _type: "slug", current: "glass-vase-wind-fire" },
    description: "Stunning colored glass vase with organic form inspired by natural elements. The Wind & Fire collection captures the essence of movement and energy in glass, creating pieces that are both functional and artistic. Available in vibrant blue and warm yellow tones.",
    price: 1195,
    brand: "Serax",
    designer: "Serax Design Studio",
    features: [
      "Stunning colored glass construction with artistic appeal",
      "Organic form inspired by natural wind and fire elements",
      "Available in vibrant blue and warm yellow color options",
      "Perfect for contemporary floral arrangements and displays",
      "Handcrafted glass artistry with unique character",
      "Each piece has slight variations due to artisanal production",
      "Premium quality colored glass with excellent clarity",
      "Modern Belgian design aesthetic with artistic expression",
      "Suitable for both functional use and decorative display",
      "Creates beautiful light effects when placed near windows",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "Colored glass" },
      { label: "Color Options", value: "Blue (NOK 1,195), Yellow (NOK 1,395)" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Finish", value: "Smooth colored glass with organic form" },
      { label: "Care", value: "Hand wash with care, avoid extreme temperature changes" },
      { label: "Use", value: "Decorative vase for flowers or standalone art piece" },
      { label: "Production", value: "Handcrafted with slight variations" },
      { label: "Warranty", value: "1 year manufacturer warranty" },
      { label: "Origin", value: "Belgian design and glass artistry" },
    ],
    variants: [
      {
        _type: "variant",
        name: "Blue",
        color: "Blue",
        price: 1195,
      },
      {
        _type: "variant",
        name: "Yellow",
        color: "Yellow",
        price: 1395,
      },
    ],
    inStock: true,
    stock: 12,
  },
  {
    name: "Helena Vase",
    slug: { _type: "slug", current: "helena-vase" },
    description: "Minimalist vase with clean geometric lines and contemporary appeal. The Helena vase embodies Scandinavian-inspired design with Belgian craftsmanship, creating a perfect balance between simplicity and sophistication. Available in classic black and white finishes.",
    price: 555,
    brand: "Serax",
    designer: "Serax Design Studio",
    features: [
      "Minimalist geometric design with clean, precise lines",
      "Available in classic black and white color options",
      "Scandinavian-inspired aesthetic with Belgian craftsmanship",
      "Perfect for modern and contemporary interior styles",
      "Versatile size suitable for various floral arrangements",
      "Clean lines and contemporary appeal for any space",
      "High-quality ceramic construction with smooth finish",
      "Affordable luxury design piece with premium quality",
      "Easy to clean and maintain for everyday use",
      "Timeless design that complements any decor style",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "High-quality ceramic" },
      { label: "Color Options", value: "Black, White" },
      { label: "Style", value: "Contemporary Belgian with Scandinavian influence" },
      { label: "Finish", value: "Matte ceramic with smooth surface" },
      { label: "Care", value: "Clean with damp cloth, dishwasher safe" },
      { label: "Use", value: "Decorative vase for flowers or standalone piece" },
      { label: "Dimensions", value: "Medium size suitable for various arrangements" },
      { label: "Warranty", value: "1 year manufacturer warranty" },
      { label: "Origin", value: "Belgian design and production" },
    ],
    variants: [
      {
        _type: "variant",
        name: "Black",
        color: "Black",
        price: 555,
      },
      {
        _type: "variant",
        name: "White",
        color: "White",
        price: 555,
      },
    ],
    inStock: true,
    stock: 15,
  },
  {
    name: "Sophisticato No. 15 Floor Lamp",
    slug: { _type: "slug", current: "sophisticato-no-15-floor-lamp" },
    description: "Striking floor lamp with contemporary design and sophisticated presence. The Sophisticato collection represents the pinnacle of Belgian lighting design, combining modern aesthetics with premium materials to create statement pieces for contemporary interiors.",
    price: 8100,
    brand: "Serax",
    designer: "Serax Design Studio",
    features: [
      "Sophisticated contemporary floor lamp design with artistic appeal",
      "Distinctive bluesteel finish with premium metallic appearance",
      "Perfect for modern living spaces and contemporary interiors",
      "High-quality construction materials ensuring longevity",
      "Elegant proportions and refined details throughout",
      "Professional lighting quality with excellent illumination",
      "Belgian design excellence with attention to craftsmanship",
      "Statement piece that enhances any contemporary interior",
      "Stable base design for safety and style",
      "Easy assembly and maintenance for convenience",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "Metal with bluesteel finish" },
      { label: "Color", value: "Bluesteel" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Type", value: "Floor lamp" },
      { label: "Light Source", value: "E27 bulb (not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "Foot switch on cord" },
      { label: "Care", value: "Clean with soft cloth, avoid abrasive cleaners" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Belgian design and manufacturing" },
    ],
    variants: [
      {
        _type: "variant",
        name: "Bluesteel",
        color: "Bluesteel",
        price: 8100,
      },
    ],
    inStock: true,
    stock: 3,
  },
  {
    name: "Vase L Pure 2 Pack",
    slug: { _type: "slug", current: "vase-l-pure-2-pack" },
    description: "Set of two minimalist vases with pure, clean design aesthetic. Perfect for creating coordinated displays and contemporary floral arrangements, these vases embody the essence of modern Belgian design with their simple yet sophisticated forms.",
    price: 695,
    brand: "Serax",
    designer: "Serax Design Studio",
    features: [
      "Set of two coordinating vases for versatile display options",
      "Pure, minimalist design aesthetic with clean lines",
      "Perfect for creating coordinated floral displays",
      "Contemporary Belgian design with timeless appeal",
      "Versatile size suitable for various arrangement styles",
      "Clean lines and modern appeal for any interior",
      "High-quality ceramic construction with smooth finish",
      "Excellent value as a coordinated set",
      "Easy to clean and maintain for everyday use",
      "Suitable for both individual and grouped displays",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "High-quality ceramic" },
      { label: "Quantity", value: "2 pieces in set" },
      { label: "Style", value: "Contemporary Belgian minimalist" },
      { label: "Finish", value: "Natural ceramic with smooth surface" },
      { label: "Care", value: "Clean with damp cloth, dishwasher safe" },
      { label: "Use", value: "Decorative vases for coordinated displays" },
      { label: "Value", value: "Excellent value as a complete set" },
      { label: "Warranty", value: "1 year manufacturer warranty" },
      { label: "Origin", value: "Belgian design and craftsmanship" },
    ],
    variants: [
      {
        _type: "variant",
        name: "Natural Set",
        color: "Natural",
        price: 695,
      },
    ],
    inStock: true,
    stock: 6,
  },
  {
    name: "Vase Stoneware",
    slug: { _type: "slug", current: "vase-stoneware" },
    description: "Colorful stoneware vase with contemporary design and vibrant color options. Perfect for adding a pop of color to modern interiors, this vase combines durability with playful aesthetics to create pieces that are both functional and decorative.",
    price: 490,
    brand: "Serax",
    designer: "Serax Design Studio",
    features: [
      "Vibrant colored stoneware construction with excellent durability",
      "Available in multiple cheerful color options",
      "Perfect for adding personality and color to any interior",
      "Contemporary Belgian design with playful aesthetic",
      "Durable stoneware material suitable for everyday use",
      "Versatile size perfect for various floral arrangements",
      "Modern aesthetic with vibrant, cheerful colors",
      "Affordable design piece with premium quality",
      "Easy maintenance and cleaning for convenience",
      "Great for mixing and matching with other Serax pieces",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "High-quality stoneware" },
      { label: "Color Options", value: "Blue, Green, Light Pink, Pink" },
      { label: "Style", value: "Contemporary Belgian with playful colors" },
      { label: "Finish", value: "Colored stoneware with smooth glaze" },
      { label: "Care", value: "Clean with damp cloth, dishwasher safe" },
      { label: "Use", value: "Decorative vase for colorful displays" },
      { label: "Durability", value: "Stoneware construction for longevity" },
      { label: "Warranty", value: "1 year manufacturer warranty" },
      { label: "Origin", value: "Belgian design and production" },
    ],
    variants: [
      {
        _type: "variant",
        name: "Blue",
        color: "Blue",
        price: 490,
      },
      {
        _type: "variant",
        name: "Green",
        color: "Green",
        price: 490,
      },
      {
        _type: "variant",
        name: "Light Pink",
        color: "Light Pink",
        price: 490,
      },
      {
        _type: "variant",
        name: "Pink",
        color: "Pink",
        price: 490,
      },
    ],
    inStock: true,
    stock: 20,
  },
];

async function migrateSeraxProducts() {
  console.log('Starting Serax products migration to Sanity...');
  
  try {
    // Create categories first
    const accessoriesCategory = await client.createOrReplace({
      _id: 'serax-accessories',
      _type: 'category',
      title: 'Accessories',
      slug: { _type: 'slug', current: 'accessories' },
      description: 'Home accessories and decorative items'
    });

    const lightingCategory = await client.createOrReplace({
      _id: 'serax-lighting',
      _type: 'category',
      title: 'Lighting',
      slug: { _type: 'slug', current: 'lighting' },
      description: 'Contemporary lighting fixtures'
    });

    console.log('Categories created successfully');

    // Create products
    for (const product of seraxProducts) {
      const categoryRef = product.name.toLowerCase().includes('lamp') || product.name.toLowerCase().includes('light')
        ? { _type: 'reference', _ref: 'serax-lighting' }
        : { _type: 'reference', _ref: 'serax-accessories' };

      const sanityProduct = {
        _id: `serax-${product.slug.current}`,
        _type: 'product',
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        brand: product.brand,
        designer: product.designer,
        features: product.features,
        specifications: product.specifications,
        variants: product.variants,
        categories: [categoryRef],
        inStock: product.inStock,
        stock: product.stock,
      };

      const result = await client.createOrReplace(sanityProduct);
      console.log(`Created/updated product: ${product.name}`);
    }

    console.log('✅ Serax products migration completed successfully!');
    console.log(`✅ Migrated ${seraxProducts.length} products to Sanity`);
    
  } catch (error) {
    console.error('❌ Error migrating Serax products:', error);
    process.exit(1);
  }
}

migrateSeraxProducts();
