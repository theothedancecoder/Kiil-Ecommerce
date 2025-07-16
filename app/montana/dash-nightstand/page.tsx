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

export default function DashNightstandPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_NewWhite_Suspended_Perspective.jpg'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Nordic_Suspended_Perspective.jpg'
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Vanilla_Suspended_Perspective.jpg'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Monarch_Suspended_Perspective.jpg'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Anthracite.jpg'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Mushroom_Suspended_Perspective.jpg'
    }
  ];

  const currentVariant = variants[selectedVariant];
  const price = 5515;

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
            <span className="text-stone-800 font-medium">Dash Nightstand</span>
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
                alt={`Montana Dash Nightstand - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Color Variant Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
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
                    alt={`${variant.name} nightstand`}
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
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Montana Selection
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                Dash Nightstand
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Functional and beautiful bedside table! DASH is a small wall-mounted bedside shelf for displaying and storing your nighttime essentials. DASH easily mounts to the wall next to your bed – or directly onto a matching Montana Bedroom Headboard.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Petter J. Lassen
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
              <div className="grid grid-cols-6 gap-3">
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

            {/* Made to Order Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Made to Order</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    This item is made to order. Expected delivery time is approximately 8 weeks.
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
                        DASH is a small wall-mounted bedside shelf for displaying and storing your nighttime essentials. 
                        DASH easily mounts to the wall next to your bed – or directly onto a matching Montana Bedroom Headboard.
                      </p>
                      <p className="leading-relaxed">
                        It is a bedside table with one shelf and one drawer that comes with a hanging rail. 
                        It is an ideal storage solution for the bedroom or under a mirror in the hallway.
                      </p>
                      <p className="leading-relaxed">
                        The minimalist design and wall-mounted installation make it perfect for small spaces while 
                        providing essential storage without taking up floor space.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Width:</span>
                        <span className="font-medium">35.4 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">24 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Depth:</span>
                        <span className="font-medium">30 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">5 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mounting:</span>
                        <span className="font-medium">Wall-mounted</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">Lacquered MDF</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designer:</span>
                        <span className="font-medium">Petter J. Lassen</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manufacturer:</span>
                        <span className="font-medium">Montana</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Wall-mounted design saves floor space</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>One shelf and one drawer for storage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Includes hanging rail</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Can mount to wall or Montana Bedroom Headboard</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Available in 6 standard colors</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Perfect for bedroom or hallway use</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Minimalist Scandinavian design</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Color Options</h4>
                    <p className="leading-relaxed mb-3">
                      Choose between New White, Nordic, Vanilla, Monarch, Anthracite or Mushroom. 
                      If you want one of the other paint colors or a combination of several colors, contact us for a quote!
                    </p>
                    <p className="text-xs text-gray-500">
                      Additional colors available: White, Fjord, Graphic, Pine, Juniper, Oregano, Pomelo, Truffle, 
                      Amber, Fennel, Rosehip, Hazelnut, Shadow, Flint, Rhubarb, Azure, Masala, Oyster, Cumin, 
                      Oat, Camomile, Balsamic, Mist, Hokkaido, Black Jade, Iris, Beetroot, Acacia, Ruby, Clay, 
                      Coffee, Coal, Snow, Black, and Parsley.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
            Perfect for the Bedroom
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/montana/bureau-desk" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Montana- BUREAU skrivebord /Montana_Selection_BUREAU_01_White_Perspective.png"
                    alt="Bureau Desk"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2">Bureau Desk</h3>
                  <p className="text-gray-900 font-medium">kr 8,999</p>
                </div>
              </div>
            </Link>

            <Link href="/montana/around-mirror" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png"
                    alt="Around Mirror"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2">Around Mirror</h3>
                  <p className="text-gray-900 font-medium">kr 3,541</p>
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
