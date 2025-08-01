"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  name: string;
  image: string;
  price: number;
  material: string;
}

export default function No7DiningChairFullUpholsteryPage() {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  const product = {
    id: "no-7-dining-chair-full-upholstery",
    name: "No.7 Dining Chair Full Upholstery",
    description: "The fully upholstered version of our iconic No.7 dining chair offers enhanced comfort without compromising the elegant design principles that define Danish furniture. Every surface is carefully upholstered with premium materials, creating a luxurious seating experience while maintaining the chair's distinctive silhouette. This version is perfect for those who prioritize comfort during long dinner conversations and formal dining occasions.",
    price: 12828,
    category: "Seating",
    variants: [
      { name: 'Oiled Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  12,828  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Oiled Oak', price: 12828 },
      { name: 'Smoked Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  13,575  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Smoked Oak', price: 13575 },
      { name: 'Oiled Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.jpg', material: 'Oiled Oak', price: 14022 },
      { name: 'Oiled Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Oiled Oak', price: 14022 },
      { name: 'Oiled Oak - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp', material: 'Oiled Oak', price: 14022 },
      { name: 'White Oiled Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.jpg', material: 'White Oiled Oak', price: 14022 },
      { name: 'White Oiled Oak - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp', material: 'White Oiled Oak', price: 14022 },
      { name: 'White Oiled Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/Sibast-No-7-dining-chNo. 7 dining chair fully upholstered NOK  14,022  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac anilineair-full-upholstered-oak-white-oil-leather-cognac-aniline-scaled-1-scaled-1.webp', material: 'White Oiled Oak', price: 14022 },
      { name: 'Smoked Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,769  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.jpg', material: 'Smoked Oak', price: 14769 },
      { name: 'Smoked Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,769  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Smoked Oak', price: 14769 },
      { name: 'Smoked Oak - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,769  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp', material: 'Smoked Oak', price: 14769 },
    ] as ProductVariant[],
    designer: "Arne Vodder",
    features: [
      "Fully upholstered for maximum comfort",
      "Premium wool and leather upholstery options",
      "Enhanced padding for extended dining sessions",
      "Maintains the iconic No.7 silhouette",
      "Available in multiple wood and fabric combinations",
      "Professional upholstery craftsmanship",
      "Perfect for formal dining rooms",
      "Ergonomic design for optimal support",
      "Sustainable materials and production methods",
      "Complements both modern and traditional interiors",
    ],
    specifications: [
      { label: "Designer", value: "Arne Vodder" },
      { label: "Manufacturer", value: "Sibast Furniture" },
      { label: "Frame Material", value: "Solid oak or beech" },
      { label: "Upholstery", value: "Full Wool Remix or Aniline leather" },
      { label: "Dimensions", value: "W 49cm, D 52cm, H 78cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Weight", value: "6.8 kg" },
      { label: "Construction", value: "Traditional joinery with full upholstery" },
      { label: "Padding", value: "High-density foam with down layer" },
      { label: "Care", value: "Professional cleaning recommended" },
      { label: "Warranty", value: "5 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/Sibast-Furniture/No.7-dining-chair-full-upholstery/lifestyle/Sibast-No-7-Dining-and-Bar-Full-Upholstered-Styled-1-scaled.jpg.avif"
    ],
  };

  const selectedVariant = product.variants[selectedVariantIndex];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/sibast" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Sibast Collection
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">
                Home
              </Link>
              <span className="text-stone-400">/</span>
              <Link href="/sibast" className="text-stone-600 hover:text-stone-800">
                Sibast Furniture
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
            <div className="grid grid-cols-4 gap-3">
              {product.variants.slice(0, 8).map((variant, index) => (
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

            {/* Lifestyle Images */}
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

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-amber-600 uppercase tracking-wider mb-2">
                Sibast Furniture Collection
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by {product.designer}
              </div>
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {selectedVariant.price.toLocaleString()}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Configuration: {selectedVariant.material} - {selectedVariant.name.split(' - ')[1]}
              </h3>
              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`p-3 text-sm border rounded transition-all text-left ${
                      selectedVariantIndex === index
                        ? "border-amber-600 bg-amber-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <div className="font-medium">{variant.material} - {variant.name.split(' - ')[1]}</div>
                    <div className="text-xs text-gray-500">kr {variant.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-amber-600 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-amber-700 transition-colors">
              Add to Cart - kr {selectedVariant.price.toLocaleString()}
            </button>

            {/* Collapsible Features */}
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

            {/* Collapsible Specifications */}
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

            {/* Back to Collection */}
            <div className="border-t border-gray-200 pt-8">
              <Link
                href="/sibast"
                className="inline-block bg-gray-100 text-gray-900 px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                View All Sibast Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
