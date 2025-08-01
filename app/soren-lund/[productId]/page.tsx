"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function SorenLundProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = products.find((p) => p.id === params.productId);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  const selectedVariant = product.variants[selectedVariantIndex];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/soren-lund" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Soren Lund Collection
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">
                Home
              </Link>
              <span className="text-stone-400">/</span>
              <Link href="/soren-lund" className="text-stone-600 hover:text-stone-800">
                Soren Lund
              </Link>
              <span className="text-stone-400">/</span>
              <span className="text-stone-800 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={selectedVariant.image}
                alt={`${product.name} - ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            {product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVariantIndex === index
                        ? "border-amber-600"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={`${variant.name} variant`}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.material}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {product.lifestyleImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} lifestyle image ${index + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-amber-600 uppercase tracking-wider mb-2">
                Soren Lund Collection
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
              {product.designer && (
                <div className="mt-4 text-sm text-gray-500">
                  Designed by {product.designer}
                </div>
              )}
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {selectedVariant.price.toLocaleString()}
            </div>

            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Material: {selectedVariant.material}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`p-3 text-sm border rounded transition-all ${
                        selectedVariantIndex === index
                          ? "border-amber-600 bg-amber-50"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-xs text-gray-500">kr {variant.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-amber-600 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-amber-700 transition-colors">
              Add to Cart - kr {selectedVariant.price.toLocaleString()}
            </button>

            {/* Collapsible Features */}
            {product.features && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setFeaturesExpanded(!featuresExpanded)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Features
                  </h3>
                  <span className="text-gray-500">
                    {featuresExpanded ? "−" : "+"}
                  </span>
                </button>
                {featuresExpanded && (
                  <ul className="mt-4 space-y-2 text-gray-600">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Collapsible Specifications */}
            {product.specifications && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setSpecificationsExpanded(!specificationsExpanded)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Specifications
                  </h3>
                  <span className="text-gray-500">
                    {specificationsExpanded ? "−" : "+"}
                  </span>
                </button>
                {specificationsExpanded && (
                  <div className="mt-4 space-y-3 text-gray-600">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium">{spec.label}</span>
                        <span className="text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Back to Collection */}
            <div className="border-t border-gray-200 pt-8">
              <Link
                href="/soren-lund"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                View All Soren Lund Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
