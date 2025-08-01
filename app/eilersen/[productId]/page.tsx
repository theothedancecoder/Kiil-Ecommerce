import { notFound } from "next/navigation";
import EilersenProductClient from "./EilersenProductClient";

interface ProductVariant {
  name: string;
  image: string;
  price: number;
  color: string;
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
    id: "playground-sofa",
    name: "Playground Sofa",
    description: "A comfortable and stylish sofa that combines Danish craftsmanship with modern design. The Playground sofa offers exceptional comfort and timeless elegance, making it the perfect centerpiece for any living space.",
    price: 32990,
    category: "Sofas",
    variants: [
      {
        name: "Bakar 47",
        image: "/Eilersen/Playground sofa kr 32 990  Farge - Bakar 47.jpg",
        color: "Bakar 47",
        price: 32990,
      },
      {
        name: "Tangent 16",
        image: "/Eilersen/Playground sofa kr 36 490  Farge - Tangent 16.jpg",
        color: "Tangent 16",
        price: 36490,
      },
      {
        name: "Berlin 36",
        image: "/Eilersen/Playground sofa kr 37 990  Farge - Berlin 36.jpg",
        color: "Berlin 36",
        price: 37990,
      },
      {
        name: "Bardal 110",
        image: "/Eilersen/Eilersen Playground sofa kr 39 990  Farge - Bardal 110.jpg",
        color: "Bardal 110",
        price: 39990,
      },
    ],
    designer: "Eilersen Design Team",
    features: [
      "Premium Danish craftsmanship since 1895",
      "High-quality upholstery materials",
      "Exceptional comfort and support",
      "Multiple premium fabric options",
      "Durable solid wood frame construction",
      "Timeless Scandinavian design",
      "Perfect for modern living spaces",
      "Easy maintenance and care",
      "5-year manufacturer warranty",
      "Sustainable materials and production",
    ],
    specifications: [
      { label: "Designer", value: "Eilersen Design Team" },
      { label: "Manufacturer", value: "Eilersen" },
      { label: "Material", value: "Premium upholstery with solid wood frame" },
      { label: "Fabric Options", value: "Bakar 47, Tangent 16, Berlin 36, Bardal 110" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Type", value: "3-seater sofa" },
      { label: "Frame", value: "Solid wood construction" },
      { label: "Comfort", value: "High-density foam cushioning" },
      { label: "Care", value: "Professional cleaning recommended" },
      { label: "Warranty", value: "5 years manufacturer warranty" },
      { label: "Origin", value: "Danish design and manufacturing" },
      { label: "Heritage", value: "Eilersen craftsmanship since 1895" },
    ],
    lifestyleImages: [
      "/Eilersen/lifestyle/10696433r_2.jpg"
    ],
  },
];

export default async function EilersenProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return <EilersenProductClient product={product} />;
}
