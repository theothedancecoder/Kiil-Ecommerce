"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductVariant {
  id: string;
  name: string;
  colorCode?: string;
  image: string;
}

export default function MB126LegsPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      id: 'snow',
      name: 'Snow',
      colorCode: '#F8F8F8',
      image: '/Montana/MB126-LEGS/montana_mb126_position_legs_snow.webp'
    },
    {
      id: 'black',
      name: 'Black',
      colorCode: '#000000',
      image: '/Montana/MB126-LEGS/montana_mb126_position_legs_black.webp'
    },
    {
      id: 'parsley',
      name: 'Parsley',
      colorCode: '#4A5D23',
      image: '/Montana/MB126-LEGS/montana_mb126_position_legs_parsley.webp'
    },
    {
      id: 'rosehip',
      name: 'Rosehip',
      colorCode: '#C4626B',
      image: '/Montana/MB126-LEGS/montana_mb126_position_legs_rosehip.webp'
    },
    {
      id: 'flint',
      name: 'Flint',
      colorCode: '#A8A8A8',
      image: '/Montana/MB126-LEGS/montana_mb126_position_legs_flint.webp'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana/MB126-LEGS/montana_mb126_position_legs_mushroom.webp'
    },
    {
      id: 'brass',
      name: 'Brass',
      colorCode: '#B5651D',
      image: '/Montana/MB126-LEGS/montana_mb126_position_legs_brass.webp'
    }
  ];

  const currentVariant = variants[selectedVariant];
  const price = 2345;

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
            <Link href="/montana" className="text-stone-600 hover:text-stone-800">
              Montana
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">MB126 Legs</span>
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
                alt={`Montana MB126 Legs - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Color Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {variants.slice(0, 4).map((variant, index) => (
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
                    alt={`${variant.name} legs`}
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
            
            {/* Additional Color Thumbnails */}
            {variants.length > 4 && (
              <div className="grid grid-cols-3 gap-3">
                {variants.slice(4).map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index + 4)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVariant === index + 4
                        ? 'border-gray-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={`${variant.name} legs`}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 768px) 33vw, 16.5vw"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.name}
                    </div>
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
                Montana Accessories
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                MB126 Legs
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                This is a set of 4 classic Montana legs. The legs fit all the Montana shelving modules in 12 mm MDF and are available in matt chromed zinc, brass, or lacquered in the colours Snow, Black Parsley, Rosehip, Flint and Mushroom.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Compatible with all Montana shelving solutions
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr {price.toLocaleString()}
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Color: {currentVariant.name}
              </h3>
              <div className="grid grid-cols-7 gap-3">
                {variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariant === index
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.name}
                  >
                    {selectedVariant === index && (
                      <div className="absolute inset-0 rounded-full border-2 border-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {price.toLocaleString()}
            </button>

            {/* Compatibility Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Compatibility Information</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Legs cannot be mounted under modules with a depth of 20 cm and do not fit modules with MDF thinner than 12 mm (e.g. Montana Mini modules).
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
                        The MB126 legs are designed to replace leg mounts for Montana shelving solutions like the Octavia VIII. 
                        These classic legs provide a stable foundation for your Montana furniture while maintaining the clean, 
                        minimalist aesthetic that Montana is known for.
                      </p>
                      <p className="leading-relaxed">
                        The legs have a height of 12.6 cm and come with height-adjustable feet up to 20 mm, allowing you to 
                        level your furniture on uneven surfaces. They can be fitted under units from width 24 cm to 69.6 cm.
                      </p>
                      <p className="leading-relaxed">
                        Units in width 69.6 cm must always be fitted with a support rail SS60 under the bottom panel for 
                        optimal stability and load distribution.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">12.6 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Height Adjustment:</span>
                        <span className="font-medium">Up to 20 mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compatible Width:</span>
                        <span className="font-medium">24 cm - 69.6 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Load Capacity:</span>
                        <span className="font-medium">50 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">Matt chromed zinc / Brass / Lacquered MDF</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="font-medium">Set of 4 legs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mounting Hardware:</span>
                        <span className="font-medium">Euro screws included</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MDF Compatibility:</span>
                        <span className="font-medium">12 mm MDF minimum</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Set of 4 classic Montana legs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Height-adjustable feet (up to 20 mm)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Compatible with units 24-69.6 cm wide</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>50 kg load capacity</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Euro screws for mounting included</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Available in 7 colors and finishes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Fits all Montana 12 mm MDF modules</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Important Notes</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2 mt-0.5">⚠</span>
                        <span>Cannot be mounted under modules with 20 cm depth</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2 mt-0.5">⚠</span>
                        <span>Not compatible with Montana Mini modules (thinner than 12 mm MDF)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2 mt-0.5">⚠</span>
                        <span>Units 69.6 cm wide require support rail SS60 under bottom panel</span>
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
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
            Perfect for Montana Shelving
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/montana/octave-viii-tv-bench" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_White_Plinth_H3_Perspective.png"
                    alt="Octave VIII TV Bench"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2">Octave VIII TV Bench</h3>
                  <p className="text-gray-900 font-medium">from kr 29,993</p>
                </div>
              </div>
            </Link>

            <Link href="/montana/monterey-desk" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Montana/Monterey-Desk/Montana_Monterey_H72_Black_Perspective.png"
                    alt="Monterey Desk"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2">Monterey Desk</h3>
                  <p className="text-gray-900 font-medium">kr 14,250</p>
                </div>
              </div>
            </Link>

            <div className="text-center">
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
    </div>
  );
}
