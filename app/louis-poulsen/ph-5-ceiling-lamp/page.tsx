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

export default function PH5CeilingLampPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      name: "White Classic",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Classic.webp",
      color: "White Classic",
      price: 11175
    },
    {
      name: "White Modern",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Modern.webp",
      color: "White Modern",
      price: 11175
    },
    {
      name: "Monochrome White",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome White.webp",
      color: "Monochrome White",
      price: 11175
    },
    {
      name: "Monochrome Black",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome Black.webp",
      color: "Monochrome Black",
      price: 11175
    },
    {
      name: "Monochrome Blue",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome Blue.webp",
      color: "Monochrome Blue",
      price: 11175
    },
    {
      name: "Monochrome Burgundy",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome Burgundy.webp",
      color: "Monochrome Burgundy",
      price: 11175
    },
    {
      name: "Hues of Blue",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Blue.webp",
      color: "Hues of Blue",
      price: 11175
    },
    {
      name: "Hues of Green",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Green.webp",
      color: "Hues of Green",
      price: 11175
    },
    {
      name: "Hues of Orange",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Orange.webp",
      color: "Hues of Orange",
      price: 11175
    },
    {
      name: "Hues of Red",
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Red.webp",
      color: "Hues of Red",
      price: 11175
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
            <span className="text-stone-800 font-medium">PH 5 Ceiling Lamp</span>
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
                alt={`Louis Poulsen PH 5 Ceiling Lamp - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {variants.slice(0, 5).map((variant, index) => (
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
                    sizes="(max-width: 768px) 20vw, 10vw"
                  />
                  <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                    {variant.name.replace('Monochrome ', '').replace('Hues of ', '')}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Second row of variants */}
            <div className="grid grid-cols-5 gap-3">
              {variants.slice(5).map((variant, index) => (
                <button
                  key={variant.name}
                  onClick={() => setSelectedVariant(index + 5)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedVariant === index + 5
                      ? 'border-gray-900'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={variant.image}
                    alt={`${variant.name} variant`}
                    fill
                    className="object-contain object-center p-2"
                    sizes="(max-width: 768px) 20vw, 10vw"
                  />
                  <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                    {variant.name.replace('Monochrome ', '').replace('Hues of ', '')}
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
                PH 5 Ceiling Lamp
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                The PH 5 is perhaps the most iconic pendant lamp ever created. Designed by Poul Henningsen in 1958, its revolutionary three-shade system provides glare-free light while creating beautiful patterns of light and shadow.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Poul Henningsen
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr {currentPrice.toLocaleString()}
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Finish: {currentVariant.name}
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {variants.map((variant, index) => {
                  const getVariantColor = (colorName: string) => {
                    const colorMap: { [key: string]: string } = {
                      'White Classic': '#FFFFFF',
                      'White Modern': '#F8F8F8',
                      'Monochrome White': '#FFFFFF',
                      'Monochrome Black': '#000000',
                      'Monochrome Blue': '#4169E1',
                      'Monochrome Burgundy': '#800020',
                      'Hues of Blue': '#87CEEB',
                      'Hues of Green': '#90EE90',
                      'Hues of Orange': '#FFA500',
                      'Hues of Red': '#FF6B6B'
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
                    This item is made to order. Expected delivery time is approximately 4-6 weeks.
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
                        The PH 5 was created in 1958 by Poul Henningsen as the ultimate glare-free pendant lamp. Its three-shade system ensures that the light source is completely hidden from view at any angle, while the carefully calculated curves distribute light evenly.
                      </p>
                      <p className="leading-relaxed">
                        The lamp's revolutionary design creates beautiful patterns of light and shadow, making it both a functional lighting solution and a sculptural art piece. Each shade is precisely positioned to reflect and redirect light for optimal illumination.
                      </p>
                      <p className="leading-relaxed">
                        Available in multiple finishes, from classic white to bold monochrome colors and subtle hues, the PH 5 adapts to any interior style while maintaining its iconic silhouette.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Diameter:</span>
                        <span className="font-medium">50 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">26.7 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">2.3 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">Spun aluminum</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Light source:</span>
                        <span className="font-medium">E27 LED max 23W</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cord length:</span>
                        <span className="font-medium">3 meters</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ceiling rose:</span>
                        <span className="font-medium">White plastic included</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designer:</span>
                        <span className="font-medium">Poul Henningsen</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span className="font-medium">1958</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>100% glare-free lighting from any angle</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Three-shade system for optimal light distribution</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Creates beautiful patterns of light and shadow</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Iconic Poul Henningsen design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Multiple finish options available</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Perfect for dining areas and living spaces</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Timeless design that never goes out of style</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Museum-quality lighting design</span>
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
