import { notFound } from "next/navigation";
import AudoCopenhagenProductClient from "./AudoCopenhagenProductClient";

interface ProductVariant {
  name: string;
  image: string;
  price?: number;
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
    id: "interconnect-candlestick",
    name: "Interconnect Candlestick",
    description: "The Interconnect Candlestick embodies Audo Copenhagen's philosophy of functional design with sculptural beauty. This elegant modular candlestick system allows you to create unique configurations, making it both a practical lighting solution and an artistic statement piece. Crafted with meticulous attention to detail, each piece can stand alone or be combined with others to create stunning arrangements that reflect your personal style.",
    price: 5795,
    category: "Accessories",
    variants: [
      { name: 'Brass', image: '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass.webp', color: 'Brass', price: 5795 },
      { name: 'Black', image: '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/Interconnect candlestick NOK  5,795  Color -  Black.webp', color: 'Black', price: 5795 },
    ],
    designer: "Audo Copenhagen Design Team",
    features: [
      "Modular design allows for unique configurations",
      "Available in premium brass and black finishes",
      "Sculptural beauty meets functional design",
      "Perfect as standalone piece or in groups",
      "High-quality materials and craftsmanship",
      "Suitable for various candle sizes",
      "Easy to clean and maintain",
      "Timeless Scandinavian aesthetic",
      "Creates ambient lighting atmosphere",
      "Ideal for dining tables and mantels",
    ],
    specifications: [
      { label: "Designer", value: "Audo Copenhagen Design Team" },
      { label: "Manufacturer", value: "Audo Copenhagen" },
      { label: "Material", value: "Metal with premium finish" },
      { label: "Dimensions", value: "H 15cm, Ø 8cm" },
      { label: "Weight", value: "0.8 kg" },
      { label: "Finish Options", value: "Brass, Black" },
      { label: "Candle Compatibility", value: "Standard dinner candles" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Assembly", value: "No assembly required" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Designed in Denmark" },
    ],
    lifestyleImages: [
      "/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/lifestyle/10696988r_2.webp"
    ],
  },
];

export default async function AudoCopenhagenProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return <AudoCopenhagenProductClient product={product} />;
}
