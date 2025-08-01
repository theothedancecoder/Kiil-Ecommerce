"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByBrand } from "@/lib/allProducts";

interface ProductVariant {
  name: string;
  image: string;
  price?: number;
  material?: string;
  size?: string;
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
    id: "no-2-1-dining-table",
    name: "No.2.1 Dining Table",
    description: "The No.2.1 dining table represents the pinnacle of Danish furniture design, combining elegant proportions with exceptional functionality. Available in three configurations - standard table, table with one extension leaf, or table with two extension leaves - this piece adapts to your dining needs. Crafted from premium solid wood with traditional joinery techniques, each table showcases the natural beauty of the wood grain while providing a sturdy foundation for memorable meals.",
    price: 38799,
    category: "Tables",
    variants: [
      { name: 'Table - Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  38,799  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  Oiled oak.webp', material: 'Oiled Oak', price: 38799 },
      { name: 'Table - White Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  38,799  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  White oiled oak.webp', material: 'White Oiled Oak', price: 38799 },
      { name: 'Table - Smoked Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  41,784  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  Smoked oak.webp', material: 'Smoked Oak', price: 41784 },
      { name: 'Table - Walnut', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  59,694  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  Walnut.webp', material: 'Walnut', price: 59694 },
      { name: 'Table w/1 Extension - Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  45,508  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  Oiled oak.webp', material: 'Oiled Oak', price: 45508, size: 'With 1 Extension' },
      { name: 'Table w/1 Extension - White Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  45,508  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  White oiled oak.webp', material: 'White Oiled Oak', price: 45508, size: 'With 1 Extension' },
      { name: 'Table w/1 Extension - Smoked Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  49,239  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  Smoked oak.webp', material: 'Smoked Oak', price: 49239, size: 'With 1 Extension' },
      { name: 'Table w/1 Extension - Walnut', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  70,134  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  Walnut.webp', material: 'Walnut', price: 70134, size: 'With 1 Extension' },
      { name: 'Table w/2 Extensions - Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table kr  52 217  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  Oiled oak.webp', material: 'Oiled Oak', price: 52217, size: 'With 2 Extensions' },
      { name: 'Table w/2 Extensions - White Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table kr  52 217  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  White oiled oak.webp', material: 'White Oiled Oak', price: 52217, size: 'With 2 Extensions' },
      { name: 'Table w/2 Extensions - Smoked Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  56,694  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  Smoked oak.webp', material: 'Smoked Oak', price: 56694, size: 'With 2 Extensions' },
      { name: 'Table w/2 Extensions - Walnut', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  80,574  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  Walnut.webp', material: 'Walnut', price: 80574, size: 'With 2 Extensions' },
    ],
    designer: "Arne Vodder",
    features: [
      "Available in three configurations: standard, 1 extension, or 2 extensions",
      "Premium solid wood construction with traditional joinery",
      "Elegant proportions perfect for modern dining rooms",
      "Extension leaves store seamlessly within the table",
      "Hand-finished with natural oil for durability",
      "Accommodates 6-10 people depending on configuration",
      "Timeless Danish design that complements any interior",
      "Sustainable wood sourcing from certified forests",
      "Easy-to-use extension mechanism",
      "Available in four premium wood finishes",
    ],
    specifications: [
      { label: "Designer", value: "Arne Vodder" },
      { label: "Manufacturer", value: "Sibast Furniture" },
      { label: "Material", value: "Solid oak or walnut" },
      { label: "Standard Dimensions", value: "L 200cm, W 95cm, H 73cm" },
      { label: "With 1 Extension", value: "L 250cm, W 95cm, H 73cm" },
      { label: "With 2 Extensions", value: "L 300cm, W 95cm, H 73cm" },
      { label: "Seating Capacity", value: "6-10 people" },
      { label: "Finish", value: "Natural oil treatment" },
      { label: "Construction", value: "Traditional mortise and tenon joinery" },
      { label: "Care", value: "Clean with damp cloth, oil treatment annually" },
      { label: "Warranty", value: "10 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/Sibast-Furniture/No.2.1-dining-table/lifestyle/Sibast-No-2-1-dining-table-2-extensions-walnut-in-setting-Sibast-No-8-No-7-dining-chairs-white-oil-oak-grey-aniline-leather-2.webp"
    ],
  },
  {
    id: "no-7-dining-chair",
    name: "No.7 Dining Chair",
    description: "The No.7 dining chair embodies the essence of Danish design philosophy - where form follows function and beauty emerges from simplicity. This iconic chair features an elegantly curved backrest that provides exceptional comfort while maintaining clean, minimalist lines. Available in various wood finishes and upholstery options, each chair is meticulously crafted using traditional techniques passed down through generations of Danish furniture makers.",
    price: 8948,
    category: "Seating",
    variants: [
      { name: 'Black Beech - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  8,948  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Black Beech', price: 8948 },
      { name: 'Oiled Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,440  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Oiled Oak', price: 10440 },
      { name: 'White Oiled Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,440  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'White Oiled Oak', price: 10440 },
      { name: 'Smoked Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 187  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Smoked Oak', price: 11187 },
      { name: 'Black Beech - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,142  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.webp', material: 'Black Beech', price: 10142 },
      { name: 'Black Beech - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,142  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline .webp', material: 'Black Beech', price: 10142 },
      { name: 'Black Beech - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair/Sibast Furniture No. 7 dining chair NOK  10,142  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Black Beech', price: 10142 },
      { name: 'Oiled Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 634  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.webp', material: 'Oiled Oak', price: 11634 },
      { name: 'Oiled Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 634  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Oiled Oak', price: 11634 },
      { name: 'Oiled Oak - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 634  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline Cognac aniline Light grey aniline Aniline black Wool Remix light grey.webp', material: 'Oiled Oak', price: 11634 },
      { name: 'Smoked Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  12 381  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.webp', material: 'Smoked Oak', price: 12381 },
      { name: 'Smoked Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  12 381  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Smoked Oak', price: 12381 },
    ],
    designer: "Arne Vodder",
    features: [
      "Elegantly curved backrest for exceptional comfort",
      "Available in multiple wood finishes and upholstery options",
      "Traditional Danish craftsmanship with modern comfort",
      "Premium wool and leather upholstery choices",
      "Stackable design for easy storage",
      "Ergonomic seat design for extended dining comfort",
      "Sustainable wood sourcing from certified forests",
      "Hand-finished with natural treatments",
      "Timeless design that complements any dining table",
      "Perfect companion to the No.2.1 dining table",
    ],
    specifications: [
      { label: "Designer", value: "Arne Vodder" },
      { label: "Manufacturer", value: "Sibast Furniture" },
      { label: "Frame Material", value: "Solid oak or beech" },
      { label: "Upholstery", value: "Wool Remix or Aniline leather" },
      { label: "Dimensions", value: "W 49cm, D 52cm, H 78cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Weight", value: "5.2 kg" },
      { label: "Construction", value: "Traditional mortise and tenon joinery" },
      { label: "Finish", value: "Natural oil or lacquer" },
      { label: "Care", value: "Vacuum regularly, professional cleaning recommended" },
      { label: "Warranty", value: "5 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/Sibast-Furniture/No.7-dining-chair/lifestyle/Sibast-No-7-Dining-Chair-Leather-Cognac-Aniline.webp"
    ],
  },
  {
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
    ],
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
  },
];

export default function SibastProductPage({
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
            {product.variants.length > 1 && (
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
                {product.variants.length > 8 && (
                  <div className="flex items-center justify-center bg-gray-100 rounded-lg text-sm text-gray-500">
                    +{product.variants.length - 8}
                  </div>
                )}
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
                Sibast Furniture Collection
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
              kr {(selectedVariant.price || product.price).toLocaleString()}
            </div>

            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Configuration: {selectedVariant.size ? `${selectedVariant.material} - ${selectedVariant.size}` : selectedVariant.material}
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
                      <div className="font-medium">{variant.size ? `${variant.material} - ${variant.size}` : variant.material}</div>
                      <div className="text-xs text-gray-500">kr {(variant.price || product.price).toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-amber-600 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-amber-700 transition-colors">
              Add to Cart - kr {(selectedVariant.price || product.price).toLocaleString()}
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
                href="/sibast"
                className="inline-block bg-gray-100 text-gray-900 px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                View All Sibast Products
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
              Related Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more exceptional pieces from the Sibast Furniture collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter((p) => p.id !== product.id) // Exclude current product
              .map((relatedProduct) => {
                // Function to get the best variant for thumbnail
                const getBestThumbnail = (product: Product) => {
                  if (!product.variants || product.variants.length === 0) {
                    return '';
                  }
                  
                  // Priority order for materials (most appealing first)
                  const materialPriority = [
                    'Walnut', 'Smoked Oak', 'Oiled Oak', 'White Oiled Oak', 'Black Beech'
                  ];
                  
                  // Find the best material variant
                  for (const material of materialPriority) {
                    const variant = product.variants.find((v: ProductVariant) => 
                      v.material === material || v.name.includes(material)
                    );
                    if (variant) {
                      return variant.image;
                    }
                  }
                  
                  // If no priority material found, return the first variant
                  return product.variants[0]?.image || '';
                };

                const thumbnailImage = getBestThumbnail(relatedProduct);

                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/sibast/${relatedProduct.id}`}
                    className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <Image
                        src={thumbnailImage}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        {relatedProduct.category}
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-light text-gray-900">
                          kr {relatedProduct.price.toLocaleString()}
                          {relatedProduct.variants && relatedProduct.variants.length > 1 && (
                            <span className="text-xs text-gray-500 ml-1">+</span>
                          )}
                        </span>
                        {relatedProduct.variants && relatedProduct.variants.length > 1 && (
                          <span className="text-xs text-gray-500">
                            {relatedProduct.variants.length} variants
                          </span>
                        )}
                      </div>
                      
                      {/* Material Swatches for Related Products */}
                      {relatedProduct.variants && relatedProduct.variants.length > 1 && (
                        <div className="flex items-center space-x-1">
                          {relatedProduct.variants.slice(0, 4).map((variant: ProductVariant, index: number) => {
                            // Material mapping for visual swatches
                            const getSwatchColor = (materialName: string) => {
                              const materialMap: { [key: string]: string } = {
                                'Oiled Oak': 'bg-amber-200',
                                'White Oiled Oak': 'bg-stone-100 border-2 border-gray-300',
                                'Smoked Oak': 'bg-amber-800',
                                'Walnut': 'bg-amber-900',
                                'Black Beech': 'bg-gray-900',
                              };
                              
                              // Check if the material name contains any of our mapped materials
                              for (const [key, value] of Object.entries(materialMap)) {
                                if (materialName && materialName.includes(key)) {
                                  return value;
                                }
                              }
                              return 'bg-gray-300';
                            };

                            return (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${getSwatchColor(variant.material || variant.name || '')} shadow-sm`}
                                title={variant.material || variant.name}
                              />
                            );
                          })}
                          {relatedProduct.variants.length > 4 && (
                            <span className="text-xs text-gray-400 ml-1">
                              +{relatedProduct.variants.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>

          {/* View All Products Link */}
          <div className="text-center mt-12">
            <Link
              href="/sibast"
              className="inline-block bg-amber-600 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-amber-700 transition-colors"
            >
              View All Sibast Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
