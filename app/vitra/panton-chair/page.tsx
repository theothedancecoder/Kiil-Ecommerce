"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductVariant {
  name: string;
  image: string;
  price: number;
  color: string;
}

export default function PantonChairPage() {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    { name: 'Classic Red', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Classic red.webp', price: 4350, color: 'Classic Red' },
    { name: 'Deep Black', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Deep black.webp', price: 4350, color: 'Deep Black' },
    { name: 'White', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - White.webp', price: 4350, color: 'White' },
    { name: 'Soft Mint', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Soft mint.webp', price: 4350, color: 'Soft Mint' },
    { name: 'Bordeaux', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Bordeaux.webp', price: 4350, color: 'Bordeaux' },
    { name: 'Glacier Blue', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Glacier blue.webp', price: 4350, color: 'Glacier Blue' },
    { name: 'Pale Rose', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Pale Rose.webp', price: 4350, color: 'Pale Rose' }
  ];

  const selectedVariant = variants[selectedVariantIndex];

  const features = [
    "World's first injection-moulded plastic chair made from a single piece",
    "Iconic design by Verner Panton from 1960",
    "Suitable for both indoor and outdoor use",
    "Lightweight yet durable polypropylene construction",
    "Available in 7 vibrant colors",
    "Stackable design for easy storage",
    "Museum-quality craftsmanship by Vitra",
    "Revolutionary cantilever design",
    "Ergonomic seating comfort",
    "Timeless mid-century modern aesthetic"
  ];

  const specifications = [
    { label: "Designer", value: "Verner Panton" },
    { label: "Manufacturer", value: "Vitra" },
    { label: "Material", value: "Polypropylene" },
    { label: "Dimensions", value: "W 50 x D 61 x H 86 cm" },
    { label: "Seat Height", value: "44 cm" },
    { label: "Weight", value: "5.6 kg" },
    { label: "Finish Options", value: "7 colors available" },
    { label: "Package Dimensions", value: "65 × 55 × 91 cm" },
    { label: "Delivery Time", value: "8 weeks (made to order)" },
    { label: "Care", value: "Clean with mild soap and water" },
    { label: "Warranty", value: "2 years manufacturer warranty" },
    { label: "Origin", value: "Swiss design, made in Germany" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/vitra" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Vitra Collection
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">
                Home
              </Link>
              <span className="text-stone-400">/</span>
              <Link href="/vitra" className="text-stone-600 hover:text-stone-800">
                Vitra
              </Link>
              <span className="text-stone-400">/</span>
              <span className="text-stone-800 font-medium">Panton Chair</span>
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
                alt={`Panton Chair - ${selectedVariant.color}`}
                fill
                className="object-contain object-center p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariantIndex(index)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedVariantIndex === index
                      ? "border-red-600"
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
                    {variant.color}
                  </div>
                </button>
              ))}
            </div>

            {/* Lifestyle Images */}
            <div className="grid grid-cols-1 gap-4">
              <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Vitra/Panton-Chair /lifestyle/10133061r_2.webp"
                  alt="Panton Chair lifestyle image 1"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Vitra/Panton-Chair /lifestyle/Panton Chair fra Vitra kr 4 350  Farge - White.webp"
                  alt="Panton Chair lifestyle image 2"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-red-600 uppercase tracking-wider mb-2">
                VITRA COLLECTION
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                Panton Chair
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                The iconic Panton Chair from Vitra. Designed by Verner Panton in 1960 and has become a classic worldwide. 
                The chair can be used both indoors and outdoors, but it is not recommended to leave the chair outside for long periods of time.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Verner Panton
              </div>
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {selectedVariant.price.toLocaleString()}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Color: {selectedVariant.color}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {variants.map((variant, index) => {
                  const getColorStyle = (colorName: string) => {
                    const colorMap: { [key: string]: string } = {
                      'Classic Red': '#DC2626',
                      'Deep Black': '#000000',
                      'White': '#FFFFFF',
                      'Soft Mint': '#86EFAC',
                      'Bordeaux': '#7C2D12',
                      'Glacier Blue': '#7DD3FC',
                      'Pale Rose': '#F9A8D4'
                    };
                    return colorMap[colorName] || '#D1D5DB';
                  };

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`p-3 text-sm border rounded transition-all ${
                        selectedVariantIndex === index
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: getColorStyle(variant.color) }}
                        />
                        <div className="font-medium">{variant.color}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">kr {variant.price.toLocaleString()}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button className="w-full bg-red-600 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-red-700 transition-colors">
              Add to Cart - kr {selectedVariant.price.toLocaleString()}
            </button>

            {/* Made to Order Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Made to Order</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    This item is made to order. Expected delivery time is approximately 8 weeks.
                  </p>
                </div>
              </div>
            </div>

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
                  {features.map((feature, idx) => (
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
                  {specifications.map((spec, idx) => (
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
                href="/vitra"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                View All Vitra Products
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
              More Iconic Vitra Designs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more timeless furniture and accessories from Vitra's legendary collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              href="/vitra/eames-re-plastic-chair-dsr"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/Vitra/Eames-RE-Plastic-Chair-DSR/Eames RE Plastic Chair DSR fra Vitra kr 2 950  Farge - White.webp"
                  alt="Eames RE Plastic Chair DSR"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Chair
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  Eames RE Plastic Chair DSR
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 2,950
                </div>
              </div>
            </Link>

            <Link
              href="/vitra/noguchi-coffee-table"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/Vitra/Noguchi-Coffee-Table/Noguchi Coffee Table fra Vitra kr 28 950.webp"
                  alt="Noguchi Coffee Table"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Table
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  Noguchi Coffee Table
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 28,950
                </div>
              </div>
            </Link>

            <Link
              href="/vitra/hang-it-all"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/Vitra/Hang-It-All/Hang It All fra Vitra kr 2 950  Farge - Multicolour.webp"
                  alt="Hang It All"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Accessory
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  Hang It All
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 2,950
                </div>
              </div>
            </Link>

            <Link
              href="/vitra/ball-clock"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/Vitra/Ball-Clock/Ball Clock fra Vitra kr 4 950  Farge - Multicolour.webp"
                  alt="Ball Clock"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Clock
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  Ball Clock
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 4,950
                </div>
              </div>
            </Link>
          </div>

          {/* View All Products Link */}
          <div className="text-center mt-12">
            <Link
              href="/vitra"
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All Vitra Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
