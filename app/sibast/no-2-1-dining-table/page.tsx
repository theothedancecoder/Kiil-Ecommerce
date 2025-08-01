"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  name: string;
  image: string;
  price: number;
  material: string;
  size?: string;
}

export default function No21DiningTablePage() {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  const product = {
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
    ] as ProductVariant[],
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
