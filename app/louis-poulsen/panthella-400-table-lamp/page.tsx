"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductVariant {
  id: string;
  name: string;
  image: string;
  color: string;
  price: number;
}

export default function Panthella400TableLampPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      id: 'white',
      name: 'White',
      image: '/Louis-Poulsen/Panthella-400-Table-Lamp/Panthella 400 Table Lamp.webp',
      color: 'White',
      price: 8995,
    },
  ];

  const currentVariant = variants[selectedVariant];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-stone-600 hover:text-stone-800">
              Home
            </Link>
            <span className="text-stone-400">/</span>
            <Link href="/louis-poulsen" className="text-stone-600 hover:text-stone-800">
              Louis Poulsen
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">Panthella 400 Table Lamp</span>
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
                src={currentVariant.image}
                alt={`Louis Poulsen Panthella 400 Table Lamp - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            {variants.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVariant === index
                        ? 'border-gray-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={`${variant.name} variant`}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Louis Poulsen
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                Panthella 400 Table Lamp
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                The Panthella 400 is a larger version of the iconic Panthella table lamp, featuring the classic mushroom-shaped shade that provides both direct and ambient lighting. Its timeless design makes it perfect for any interior setting.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Verner Panton
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr {currentVariant.price.toLocaleString()}
            </div>

            {/* Color Selection */}
            {variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Color: {currentVariant.name}
                </h3>
                <div className="flex space-x-3">
                  {variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedVariant === index
                          ? 'border-gray-900 scale-110'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: variant.color === 'White' ? '#FFFFFF' : variant.color }}
                      title={variant.name}
                    >
                      {selectedVariant === index && (
                        <div className="absolute inset-0 rounded-full border-2 border-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {currentVariant.price.toLocaleString()}
            </button>

            {/* Made to Order Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Made to Order</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    This item is made to order. Expected delivery time is approximately 6-8 weeks.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Product Details
                </h3>
                <button
                  onClick={() => setIsProductDetailsExpanded(!isProductDetailsExpanded)}
                  className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <svg
                    className={`w-3 h-3 transition-transform ${isProductDetailsExpanded ? 'rotate-45' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              {isProductDetailsExpanded && (
                <div className="space-y-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Description</h4>
                    <div className="space-y-3">
                      <p className="leading-relaxed">
                        The Panthella 400 Table Lamp is a larger version of Verner Panton's iconic design from 1971. The lamp features the characteristic mushroom-shaped shade that provides both direct downward light and soft ambient light.
                      </p>
                      <p className="leading-relaxed">
                        The opal acrylic shade ensures a pleasant, glare-free light distribution, making it perfect for reading or creating ambient lighting in living spaces.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">58 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shade Diameter:</span>
                        <span className="font-medium">40 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Diameter:</span>
                        <span className="font-medium">25 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">Opal acrylic, metal base</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Light Source:</span>
                        <span className="font-medium">E27 max 60W</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designer:</span>
                        <span className="font-medium">Verner Panton</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Iconic mushroom-shaped design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Glare-free light distribution</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Both direct and ambient lighting</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Timeless Scandinavian design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Perfect for reading and ambient lighting</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-4 text-center">
            Related Products
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Explore other iconic Louis Poulsen lighting designs
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Link href="/louis-poulsen/panthella-250-table-lamp" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Coral.webp"
                    alt="Panthella 250 Table Lamp"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Table Lamp
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">Panthella 250 Table Lamp</h3>
                  <p className="text-gray-900 font-medium">kr 5,660</p>
                </div>
              </div>
            </Link>

            <Link href="/louis-poulsen/panthella-160-rechargeable-led-table-lamp" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque moss green.webp"
                    alt="Panthella 160 Rechargeable LED Table Lamp"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Rechargeable Lamp
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">Panthella 160 Rechargeable</h3>
                  <p className="text-gray-900 font-medium">kr 2,295</p>
                </div>
              </div>
            </Link>

            <Link href="/louis-poulsen/ph-5-ceiling-lamp" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Green.webp"
                    alt="PH 5 Ceiling Lamp"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Pendant Lamp
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">PH 5 Ceiling Lamp</h3>
                  <p className="text-gray-900 font-medium">kr 11,175</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link 
              href="/louis-poulsen"
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All Louis Poulsen Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
