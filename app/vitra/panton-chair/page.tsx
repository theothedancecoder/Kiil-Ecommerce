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
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>({
    name: 'Classic Red',
    image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Classic red.webp',
    price: 4350,
    color: 'Classic Red'
  });

  const [showSpecifications, setShowSpecifications] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const variants: ProductVariant[] = [
    { name: 'Classic Red', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Classic red.webp', price: 4350, color: 'Classic Red' },
    { name: 'Deep Black', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Deep black.webp', price: 4350, color: 'Deep Black' },
    { name: 'White', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - White.webp', price: 4350, color: 'White' },
    { name: 'Soft Mint', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Soft mint.webp', price: 4350, color: 'Soft Mint' },
    { name: 'Bordeaux', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Bordeaux.webp', price: 4350, color: 'Bordeaux' },
    { name: 'Glacier Blue', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Glacier blue.webp', price: 4350, color: 'Glacier Blue' },
    { name: 'Pale Rose', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Pale Rose.webp', price: 4350, color: 'Pale Rose' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/vitra" className="hover:text-stone-800 transition-colors">
              Vitra
            </Link>
            <span>/</span>
            <span className="text-stone-800">Panton Chair</span>
          </nav>
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
                className="object-contain object-center p-8"
                priority
              />
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(variant)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedVariant.name === variant.name
                      ? 'border-stone-800 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={variant.image}
                    alt={`Panton Chair - ${variant.color}`}
                    fill
                    className="object-contain object-center p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
                Panton Chair
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed">
                The iconic Panton Chair from Vitra. Designed by Verner Panton in 1960 and has become a classic worldwide. 
                The chair can be used both indoors and outdoors, but it is not recommended to leave the chair outside for long periods of time.
              </p>
            </div>

            {/* Designer Info */}
            <div className="bg-stone-50 p-6 rounded-lg">
              <h3 className="font-medium text-stone-800 mb-2">Designer</h3>
              <p className="text-stone-600">
                <strong>Verner Panton</strong> - Designed in 1960, but not put into production until 1999. Produced by Vitra.
              </p>
            </div>

            {/* Variant Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                COLOR: {selectedVariant.color.toUpperCase()}
              </h3>
              <div className="flex space-x-3">
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
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedVariant.name === variant.name
                          ? 'border-stone-800 scale-110'
                          : 'border-stone-300 hover:border-stone-500'
                      }`}
                      style={{ backgroundColor: getColorStyle(variant.color) }}
                      title={variant.color}
                    />
                  );
                })}
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-light text-stone-800">
              kr {selectedVariant.price.toLocaleString()}
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 rounded-lg font-medium hover:bg-stone-700 transition-colors text-lg">
              ADD TO CART - KR {selectedVariant.price.toLocaleString()}
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

            {/* Product Details */}
            <div className="space-y-4">
              {/* Specifications */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setShowSpecifications(!showSpecifications)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-stone-800">Specifications</span>
                  <svg
                    className={`w-5 h-5 text-stone-600 transition-transform duration-200 ${
                      showSpecifications ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showSpecifications && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-stone-600">Width:</span>
                        <span className="ml-2 text-stone-800">50 cm</span>
                      </div>
                      <div>
                        <span className="text-stone-600">Depth:</span>
                        <span className="ml-2 text-stone-800">61 cm</span>
                      </div>
                      <div>
                        <span className="text-stone-600">Height:</span>
                        <span className="ml-2 text-stone-800">86 cm</span>
                      </div>
                      <div>
                        <span className="text-stone-600">Seat Height:</span>
                        <span className="ml-2 text-stone-800">44 cm</span>
                      </div>
                      <div>
                        <span className="text-stone-600">Weight:</span>
                        <span className="ml-2 text-stone-800">5.6 kg</span>
                      </div>
                      <div>
                        <span className="text-stone-600">Material:</span>
                        <span className="ml-2 text-stone-800">Polypropylene</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-stone-600">Package Dimensions:</span>
                        <span className="ml-2 text-stone-800">65 × 55 × 91 cm</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setShowFeatures(!showFeatures)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-stone-800">Features</span>
                  <svg
                    className={`w-5 h-5 text-stone-600 transition-transform duration-200 ${
                      showFeatures ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showFeatures && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">✓</span>
                        <span className="text-stone-600">World's first injection-moulded plastic chair made from a single piece</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">✓</span>
                        <span className="text-stone-600">Iconic design by Verner Panton from 1960</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">✓</span>
                        <span className="text-stone-600">Suitable for both indoor and outdoor use</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">✓</span>
                        <span className="text-stone-600">Lightweight yet durable polypropylene construction</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">✓</span>
                        <span className="text-stone-600">Available in 7 vibrant colors</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">✓</span>
                        <span className="text-stone-600">Stackable design for easy storage</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">✓</span>
                        <span className="text-stone-600">Made to order - 8 weeks delivery time</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">✓</span>
                        <span className="text-stone-600">Museum-quality craftsmanship by Vitra</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Images */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif text-stone-800 mb-8 text-center">
            Panton Chair in Context
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Vitra/Panton-Chair /lifestyle/10133061r_2.webp"
                alt="Panton Chair lifestyle image"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Vitra/Panton-Chair /lifestyle/Panton Chair fra Vitra kr 4 350  Farge - White.webp"
                alt="Panton Chair in white lifestyle setting"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Explore More Vitra */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-serif text-stone-800 mb-8">
            Explore More Vitra
          </h2>
          <Link
            href="/vitra"
            className="inline-block bg-stone-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors duration-300"
          >
            VIEW ALL VITRA PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
}
