"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductVariant {
  name: string;
  image: string;
  color: string;
  price: number;
}

export default function AJWallLampWithCordPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      name: "Black",
      image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Black.webp",
      color: "Black",
      price: 8995
    },
    {
      name: "White",
      image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  White.webp",
      color: "White",
      price: 8995
    },
    {
      name: "Dusty Blue",
      image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ vegglampe med ledning kr 8 995  Farge - Dusty Blue.webp",
      color: "Dusty Blue",
      price: 8995
    },
    {
      name: "Electric Orange",
      image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Electric Orange.webp",
      color: "Electric Orange",
      price: 8995
    },
    {
      name: "Soft Lemon",
      image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Soft lemon.webp",
      color: "Soft Lemon",
      price: 8995
    },
    {
      name: "Warm Grey",
      image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Warm Grey.webp",
      color: "Warm Grey",
      price: 8995
    },
    {
      name: "Warm Sand",
      image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Warm Sand.webp",
      color: "Warm Sand",
      price: 8995
    },
    {
      name: "Pale Petroleum",
      image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Pale petroleum.webp",
      color: "Pale Petroleum",
      price: 8995
    }
  ];

  const currentVariant = variants[selectedVariant];
  const currentPrice = currentVariant.price;

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
            <span className="text-stone-800 font-medium">AJ Wall Lamp with Cord</span>
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
                alt={`Louis Poulsen AJ Wall Lamp with Cord - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {variants.slice(0, 8).map((variant, index) => (
                <button
                  key={variant.name}
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
                  <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                    {variant.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Louis Poulsen
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                AJ Wall Lamp with Cord
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                The AJ Wall Lamp with Cord brings Arne Jacobsen's iconic design to the wall. Perfect for bedside reading or accent lighting, it features the same distinctive asymmetrical shade with convenient cord control.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Arne Jacobsen
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr {currentPrice.toLocaleString()}
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Color: {currentVariant.name}
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {variants.map((variant, index) => {
                  const getVariantColor = (colorName: string) => {
                    const colorMap: { [key: string]: string } = {
                      'Black': '#000000',
                      'White': '#FFFFFF',
                      'Dusty Blue': '#6B8CAE',
                      'Electric Orange': '#FF6600',
                      'Soft Lemon': '#FFFACD',
                      'Warm Grey': '#8B8680',
                      'Warm Sand': '#C2B280',
                      'Pale Petroleum': '#5F8A8B'
                    };
                    return colorMap[colorName] || '#D1D5DB';
                  };

                  return (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(index)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedVariant === index
                          ? 'border-gray-900 scale-110'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: getVariantColor(variant.color) }}
                      title={variant.name}
                    >
                      {selectedVariant === index && (
                        <div className="absolute inset-0 rounded-full border-2 border-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {currentPrice.toLocaleString()}
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
                        The AJ Wall Lamp with Cord brings the iconic AJ design to wall mounting applications. Perfect for bedside reading or creating focused task lighting in any room.
                      </p>
                      <p className="leading-relaxed">
                        The distinctive asymmetrical shade provides excellent light control while the convenient cord allows for easy on/off operation without reaching for wall switches.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Width:</span>
                        <span className="font-medium">21.5 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">13.5 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Depth:</span>
                        <span className="font-medium">16.5 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">1.2 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">Painted steel</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Light source:</span>
                        <span className="font-medium">E14 LED max 8W</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cord length:</span>
                        <span className="font-medium">2.5 meters</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designer:</span>
                        <span className="font-medium">Arne Jacobsen</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Wall-mounted with convenient cord control</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Adjustable shade for directional lighting</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Perfect for bedside reading</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Iconic Arne Jacobsen design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Multiple color options available</span>
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
