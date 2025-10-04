import { notFound } from "next/navigation";
import SorenLundProductClient from "./SorenLundProductClient";

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
    id: "sl330-sk-footstool",
    name: "SL330:SK Footstool",
    description: "Elegant footstool with premium leather upholstery and solid wood construction. The SL330:SK combines comfort with sophisticated Scandinavian design, perfect for complementing lounge chairs and creating relaxing seating arrangements in modern interiors.",
    price: 17055,
    category: "Seating",
    variants: [
      {
        name: "Cognac",
        image: "/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Cognac.jpg",
        color: "Cognac",
        material: "Premium leather",
        price: 17055,
      },
      {
        name: "Black",
        image: "/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Black.webp",
        color: "Black",
        material: "Premium leather",
        price: 17055,
      },
    ],
    designer: "Soren Lund Design Studio",
    features: [
      "Premium leather upholstery in cognac and black",
      "Solid wood construction for durability",
      "Sophisticated Scandinavian design aesthetic",
      "Perfect complement to lounge chairs",
      "Comfortable height for relaxation",
      "Exceptional craftsmanship and attention to detail",
      "Sustainable materials and production methods",
      "Versatile design suitable for various interiors",
      "Professional leather treatment for longevity",
      "Handcrafted by skilled Nordic artisans",
    ],
    specifications: [
      { label: "Designer", value: "Soren Lund Design Studio" },
      { label: "Manufacturer", value: "Soren Lund" },
      { label: "Material", value: "Premium leather with solid wood frame" },
      { label: "Color Options", value: "Cognac, Black" },
      { label: "Style", value: "Scandinavian Contemporary" },
      { label: "Dimensions", value: "H 42cm, W 60cm, D 45cm" },
      { label: "Weight", value: "12kg" },
      { label: "Care", value: "Clean with leather conditioner, avoid direct sunlight" },
      { label: "Warranty", value: "5 years manufacturer warranty" },
      { label: "Certification", value: "Sustainable leather sourcing" },
      { label: "Origin", value: "Made in Norway" },
    ],
    lifestyleImages: ["/Soren-Lund/SL330:SK-footstool/lifestyle/SL-330-genova-teak-768x512.jpg"],
  },
  {
    id: "sl409-swivel-chair",
    name: "SL409 Swivel Chair",
    description: "Contemporary swivel chair with ergonomic design and premium materials. The SL409 offers exceptional comfort and mobility, making it perfect for modern offices and home workspaces with its sophisticated Scandinavian aesthetic and professional functionality.",
    price: 29935,
    category: "Seating",
    variants: [
      {
        name: "Standard",
        image: "/Soren-Lund/SL409-swivel-chair/Soren Lund SL409 swivel chair NOK  29,935  SL409 swivel chair quantity 1 .webp",
        material: "Premium upholstery",
        price: 29935,
      },
    ],
    designer: "Soren Lund Design Studio",
    features: [
      "Ergonomic design for optimal comfort during long work sessions",
      "360-degree swivel functionality for easy movement",
      "Premium upholstery with exceptional durability",
      "Adjustable height mechanism for personalized comfort",
      "Sophisticated Scandinavian design aesthetic",
      "Perfect for modern offices and home workspaces",
      "High-quality materials and construction",
      "Smooth-rolling casters for easy mobility",
      "Professional appearance suitable for any environment",
      "Handcrafted with attention to detail",
    ],
    specifications: [
      { label: "Designer", value: "Soren Lund Design Studio" },
      { label: "Manufacturer", value: "Soren Lund" },
      { label: "Material", value: "Premium upholstery with metal base" },
      { label: "Style", value: "Scandinavian Contemporary" },
      { label: "Dimensions", value: "H 85-95cm, W 65cm, D 65cm" },
      { label: "Seat Height", value: "45-55cm (adjustable)" },
      { label: "Weight Capacity", value: "120kg" },
      { label: "Features", value: "360° swivel, height adjustment, rolling casters" },
      { label: "Care", value: "Clean with appropriate upholstery cleaner" },
      { label: "Warranty", value: "5 years manufacturer warranty" },
      { label: "Origin", value: "Made in Norway" },
    ],
    lifestyleImages: [],
  },
  {
    id: "sl330-1-adjustable-armchair",
    name: "SL330:1 Adjustable Armchair",
    description: "Luxurious adjustable armchair with premium craftsmanship and sophisticated design. The SL330:1 represents the pinnacle of Scandinavian furniture design, offering exceptional comfort and adjustability for the ultimate relaxation experience in contemporary interiors.",
    price: 55160,
    category: "Seating",
    variants: [
      {
        name: "Standard",
        image: "/Soren-Lund/SLK-330/Soren Lund SL330:1 adjustable armchair NOK  55,160.webp",
        material: "Premium upholstery",
        price: 55160,
      },
      {
        name: "Alternative",
        image: "/Soren-Lund/SLK-330/SL330:1 adjustable armchair NOK  55,160.jpg",
        material: "Premium upholstery",
        price: 55160,
      },
    ],
    designer: "Soren Lund Design Studio",
    features: [
      "Luxurious adjustable armchair with multiple positions",
      "Premium craftsmanship representing pinnacle of design",
      "Exceptional comfort for ultimate relaxation experience",
      "Sophisticated Scandinavian design aesthetic",
      "High-quality materials and construction throughout",
      "Perfect for living rooms and reading areas",
      "Adjustable mechanisms for personalized comfort",
      "Durable construction for long-lasting use",
      "Professional upholstery with premium materials",
      "Handcrafted by master Nordic artisans",
    ],
    specifications: [
      { label: "Designer", value: "Soren Lund Design Studio" },
      { label: "Manufacturer", value: "Soren Lund" },
      { label: "Material", value: "Premium upholstery with solid wood frame" },
      { label: "Style", value: "Scandinavian Contemporary" },
      { label: "Dimensions", value: "H 95cm, W 85cm, D 90cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Weight", value: "45kg" },
      { label: "Features", value: "Multiple adjustment positions, premium comfort" },
      { label: "Care", value: "Professional cleaning recommended" },
      { label: "Warranty", value: "10 years manufacturer warranty" },
      { label: "Certification", value: "Premium quality certification" },
      { label: "Origin", value: "Made in Norway" },
    ],
    lifestyleImages: ["/Soren-Lund/SLK-330/lifestyle/a1d63a72-3402-4c94-85f0-6065fd782cd3.webp"],
  },
];

// Generate static params for all Soren Lund products
export async function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }));
}

// Allow dynamic params for new products
export const dynamicParams = true;

// Static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function SorenLundProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return <SorenLundProductClient product={product} />;
}
