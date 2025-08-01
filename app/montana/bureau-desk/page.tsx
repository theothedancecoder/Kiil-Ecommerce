"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ColorVariant {
  id: string;
  name: string;
  colorCode: string;
  image: string;
  price: number;
}

export default function BureauDeskPage() {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(3); // Start with Monarch
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  const variants: ColorVariant[] = [
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_NewWhite_Suspended_Perspective.png',
      price: 15817
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Nordic_Suspended_Perspective.png',
      price: 15817
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Vanilla_Suspended_Perspective.png',
      price: 15817
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Monarch_Suspended_Perspective.png',
      price: 15817
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Anthracite_Suspended_Perspective.png',
      price: 15817
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Mushroom_Suspended_Perspective.png',
      price: 15817
    }
  ];

  const selectedVariant = variants[selectedVariantIndex];

  const features = [
    "Two large removable shelves for easy organization",
    "Additional shelf and cabinet under countertop",
    "Wall-mounted design saves floor space",
    "Integrates elegantly into any room",
    "Available in Selection colors (4-week delivery)",
    "Custom colors available upon request",
    "Includes desk mat for premium finish",
    "Premium lacquered finish for durability",
    "Designed by Petter J. Lassen",
    "Made in Denmark with sustainable materials"
  ];

  const specifications = [
    { label: "Designer", value: "Petter J. Lassen" },
    { label: "Manufacturer", value: "Montana" },
    { label: "Material", value: "Lacquered MDF" },
    { label: "Dimensions", value: "W 93.7 x H 36.6 x D 38 cm" },
    { label: "Weight", value: "25 kg" },
    { label: "Installation", value: "Wall-mounted" },
    { label: "Finish Options", value: "New White, Nordic, Vanilla, Monarch, Anthracite, Mushroom" },
    { label: "Includes", value: "Desk mat" },
    { label: "Delivery Time", value: "8 weeks (made to order)" },
    { label: "Care", value: "Clean with damp cloth" },
    { label: "Warranty", value: "5 years structural warranty" },
    { label: "Origin", value: "Made in Denmark" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/montana" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Montana Collection
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">
                Home
              </Link>
              <span className="text-stone-400">/</span>
              <Link href="/montana" className="text-stone-600 hover:text-stone-800">
                Montana
              </Link>
              <span className="text-stone-400">/</span>
              <span className="text-stone-800 font-medium">Bureau Desk</span>
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
                alt={`Bureau Desk - ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {variants.map((variant, index) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantIndex(index)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedVariantIndex === index
                      ? "border-blue-600"
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
                    {variant.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Lifestyle Images */}
            <div className="grid grid-cols-1 gap-4">
              <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Montana/Selection/Montana_Home21_22_BUREAU_Flint_01_H-scaled.jpg"
                  alt="Bureau desk lifestyle image 1"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Montana/Selection/Montana_Home21_22_BUREAU_Flint_Detail_H-scaled.jpg"
                  alt="Bureau desk lifestyle image 2"
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
              <div className="text-sm text-blue-600 uppercase tracking-wider mb-2">
                MONTANA COLLECTION
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                Bureau Desk
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                BUREAU is a small desk that integrates elegantly into the home office, living room and bedroom. 
                BUREAU has two large shelves that can be completely removed from the module, giving a good overview 
                of the contents. In addition to the shelves, BUREAU has a shelf and a cabinet under the countertop. 
                BUREAU is only available as a wall-mounted module. The module comes with a desk mat.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Petter J. Lassen
              </div>
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {selectedVariant.price.toLocaleString()}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Color: {selectedVariant.name}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`p-3 text-sm border rounded transition-all ${
                      selectedVariantIndex === index
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: variant.colorCode }}
                      />
                      <div className="font-medium">{variant.name}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">kr {variant.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-blue-700 transition-colors">
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
                href="/montana"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                View All Montana Products
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
              Complete Your Home Office
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more Montana furniture to create the perfect workspace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              href="/montana/dash-nightstand"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/Montana-DASH-Nightstand/Montana_Selection_DASH_NewWhite_Suspended_Perspective.jpg"
                  alt="Dash Nightstand"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Storage
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  Dash Nightstand
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 8,500
                </div>
              </div>
            </Link>

            <Link
              href="/montana/mb126-legs"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/Montana/MB126-LEGS/montana_mb126_position_legs_rosehip.webp"
                  alt="MB126 Legs"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Accessories
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  MB126 Legs
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 2,200
                </div>
              </div>
            </Link>

            <Link
              href="/montana/compile-module"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/Montana/COMPILE/Montana_Selection_COMPILE_NewWhite_Suspended_Perspective.png"
                  alt="Compile Module"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Storage
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  Compile Module
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 12,500
                </div>
              </div>
            </Link>

            <Link
              href="/montana/show-module"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/Montana/SHOW/Montana_Selection_SHOW_NewWhite_Suspended_Perspective.png"
                  alt="Show Module"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Display
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  Show Module
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 9,800
                </div>
              </div>
            </Link>
          </div>

          {/* View All Products Link */}
          <div className="text-center mt-12">
            <Link
              href="/montana"
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All Montana Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
