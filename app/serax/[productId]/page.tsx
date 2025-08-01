import { notFound } from "next/navigation";
import SeraxProductClient from "./SeraxProductClient";

interface ProductVariant {
  name: string;
  image: string;
  price: number;
  color?: string;
  material?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  variants: ProductVariant[];
  designer?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  lifestyleImages?: string[];
}

const products: Product[] = [
  {
    id: "broquaine-vase-h38",
    name: "Broquaine Vase H38 cm",
    description: "Elegant ceramic vase with distinctive textured surface and sophisticated form. The Broquaine collection represents contemporary Belgian design at its finest, combining artisanal craftsmanship with modern aesthetics to create pieces that are both functional and sculptural.",
    price: 1395,
    category: "Accessories",
    variants: [
      {
        name: "Natural",
        image: "/Serax/Broquaine-vase-H38-cm/Serax Broquaine vase H38 cm NOK  1,395  Broquaine vase H38 cm quantity 1 .webp",
        color: "Natural",
        price: 1395,
      },
    ],
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
    lifestyleImages: [
      "/Serax/Broquaine-vase-H38-cm/lifestyle/SeraxB7222021_2.webp"
    ],
  },
  {
    id: "broquaine-vase-s-h28",
    name: "Broquaine Vase S H28 cm",
    description: "Smaller version of the elegant Broquaine vase, perfect for intimate spaces and smaller floral arrangements. Features the same distinctive textured surface and sophisticated design aesthetic as the larger version, making it ideal for creating coordinated displays.",
    price: 995,
    category: "Accessories",
    variants: [
      {
        name: "Natural",
        image: "/Serax/Broquaine-vase-S-H28-cm/Broquaine vase S H28 cm kr  995.webp",
        color: "Natural",
        price: 995,
      },
    ],
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
    lifestyleImages: [
      "/Serax/Broquaine-vase-S-H28-cm/lifestyle/Broquaine vase S H28 cm kr  995.webp"
    ],
  },
  {
    id: "catherine-table-lamp-47",
    name: "Catherine Table Lamp 47 cm",
    description: "Sophisticated table lamp with clean lines and contemporary design. The Catherine lamp combines functionality with elegant aesthetics, perfect for modern interiors. Available in classic black and white finishes to complement any decor style.",
    price: 4295,
    category: "Lighting",
    variants: [
      {
        name: "Black",
        image: "/Serax/Catherine-table-lamp-47-cm/Catherine table lamp 47 cm NOK  4,295  Color -  Black.webp",
        color: "Black",
        price: 4295,
      },
      {
        name: "White",
        image: "/Serax/Catherine-table-lamp-47-cm/Catherine table lamp 47 cm NOK  4,295  Color -  White.webp",
        color: "White",
        price: 4295,
      },
    ],
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
    lifestyleImages: [
      "/Serax/Catherine-table-lamp-47-cm/lifestyle/582314-01_70_ProductImageCollection-139c880bd5.webp"
    ],
  },
  {
    id: "glass-vase-wind-fire",
    name: "Glass Vase Wind & Fire",
    description: "Stunning colored glass vase with organic form inspired by natural elements. The Wind & Fire collection captures the essence of movement and energy in glass, creating pieces that are both functional and artistic. Available in vibrant blue and warm yellow tones.",
    price: 1195,
    category: "Accessories",
    variants: [
      {
        name: "Blue",
        image: "/Serax/Glass-Vase-Wind-&-Fire/Glass Vase Wind & Fire Blue NOK  1,195.avif",
        color: "Blue",
        price: 1195,
      },
      {
        name: "Yellow",
        image: "/Serax/Glass-Vase-Wind-&-Fire/Glass Vase Wind & Fire Yellow NOK  1,395.avif",
        color: "Yellow",
        price: 1395,
      },
    ],
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
    lifestyleImages: [
      "/Serax/Glass-Vase-Wind-&-Fire/lifestyle/Ecom_B0820110_02-jpg.webp"
    ],
  },
  {
    id: "helena-vase",
    name: "Helena Vase",
    description: "Minimalist vase with clean geometric lines and contemporary appeal. The Helena vase embodies Scandinavian-inspired design with Belgian craftsmanship, creating a perfect balance between simplicity and sophistication. Available in classic black and white finishes.",
    price: 555,
    category: "Accessories",
    variants: [
      {
        name: "Black",
        image: "/Serax/Helena-vase/Helena vase Fromkr  555  Color -  Black.webp",
        color: "Black",
        price: 555,
      },
      {
        name: "White",
        image: "/Serax/Helena-vase/Helena vase Fromkr  555  Color -  White.webp",
        color: "White",
        price: 555,
      },
    ],
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
    lifestyleImages: [
      "/Serax/Helena-vase/lifestyle/IMG_5616-scaled.jpg.avif"
    ],
  },
  {
    id: "sophisticato-no-15-floor-lamp",
    name: "Sophisticato No. 15 Floor Lamp",
    description: "Striking floor lamp with contemporary design and sophisticated presence. The Sophisticato collection represents the pinnacle of Belgian lighting design, combining modern aesthetics with premium materials to create statement pieces for contemporary interiors.",
    price: 8100,
    category: "Lighting",
    variants: [
      {
        name: "Bluesteel",
        image: "/Serax/Sophisticato-No.-15-Floor-lamp/Sophisticato No. 15 Floor lamp, Bluesteel NOK  8,100.jpeg",
        color: "Bluesteel",
        price: 8100,
      },
    ],
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
    lifestyleImages: [
      "/Serax/Sophisticato-No.-15-Floor-lamp/lifestyle/serax-sofisticato-nr-15-gulvlampe-bluesteel-1.jpeg"
    ],
  },
  {
    id: "vase-l-pure-2-pack",
    name: "Vase L Pure 2 Pack",
    description: "Set of two minimalist vases with pure, clean design aesthetic. Perfect for creating coordinated displays and contemporary floral arrangements, these vases embody the essence of modern Belgian design with their simple yet sophisticated forms.",
    price: 695,
    category: "Accessories",
    variants: [
      {
        name: "Natural Set",
        image: "/Serax/Vase-L-Pure/Vase L Pure 2 pack kr  695.jpeg",
        color: "Natural",
        price: 695,
      },
    ],
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
    lifestyleImages: [],
  },
  {
    id: "vase-stoneware",
    name: "Vase Stoneware",
    description: "Colorful stoneware vase with contemporary design and vibrant color options. Perfect for adding a pop of color to modern interiors, this vase combines durability with playful aesthetics to create pieces that are both functional and decorative.",
    price: 490,
    category: "Accessories",
    variants: [
      {
        name: "Blue",
        image: "/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Blue.webp",
        color: "Blue",
        price: 490,
      },
      {
        name: "Green",
        image: "/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Green.jpeg",
        color: "Green",
        price: 490,
      },
      {
        name: "Light Pink",
        image: "/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Light pink.webp",
        color: "Light Pink",
        price: 490,
      },
      {
        name: "Pink",
        image: "/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Pink.jpeg",
        color: "Pink",
        price: 490,
      },
    ],
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
    lifestyleImages: [
      "/Serax/Vase-Stoneware/lifestyle/Serax2.webp"
    ],
  },
];

export default async function SeraxProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return <SeraxProductClient product={product} />;
}
