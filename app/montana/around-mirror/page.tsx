"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductVariant {
  id: string;
  name: string;
  image: string;
  color: string;
  colorCode?: string;
}

export default function AroundMirrorPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      id: 'white',
      name: 'White',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png',
      color: 'White',
      colorCode: '#FFFFFF'
    },
    {
      id: 'fjord',
      name: 'Fjord',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_02-Fjord_Perspective.png',
      color: 'Fjord',
      colorCode: '#8B9DC3'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_04-Anthracite_Perspective.png',
      color: 'Anthracite',
      colorCode: '#3A3A3A'
    },
    {
      id: 'black',
      name: 'Black',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_05-Black_Perspective.png',
      color: 'Black',
      colorCode: '#000000'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_09-Nordic_Perspective.png',
      color: 'Nordic',
      colorCode: '#E8E8E8'
    },
    {
      id: 'coffee',
      name: 'Coffee',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_35-Coffee_Perspective.png',
      color: 'Coffee',
      colorCode: '#6B4423'
    },
    {
      id: 'coal',
      name: 'Coal',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_36-Coal_Perspective.png',
      color: 'Coal',
      colorCode: '#2C2C2C'
    },
    {
      id: 'snow',
      name: 'Snow',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_38-Snow_Perspective.png',
      color: 'Snow',
      colorCode: '#F8F8F8'
    },
    {
      id: 'new-white',
      name: 'New White',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_101-New-White_Perspective.png',
      color: 'New White',
      colorCode: '#FAFAFA'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_135-Monarch_Perspective.png',
      color: 'Monarch',
      colorCode: '#D4AF37'
    },
    {
      id: 'pine',
      name: 'Pine',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_136-Pine_Perspective.png',
      color: 'Pine',
      colorCode: '#4A5D23'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_137-Mushroom_Perspective.png',
      color: 'Mushroom',
      colorCode: '#8B7355'
    },
    {
      id: 'juniper',
      name: 'Juniper',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_138-Juniper_Perspective.png',
      color: 'Juniper',
      colorCode: '#5A6B3B'
    },
    {
      id: 'oregano',
      name: 'Oregano',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_139-Oregano_Perspective.png',
      color: 'Oregano',
      colorCode: '#7A8B3A'
    },
    {
      id: 'pomelo',
      name: 'Pomelo',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_140-Pomelo_Perspective.png',
      color: 'Pomelo',
      colorCode: '#F4D03F'
    },
    {
      id: 'truffle',
      name: 'Truffle',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_141-Truffle_Perspective.png',
      color: 'Truffle',
      colorCode: '#8B6F47'
    },
    {
      id: 'amber',
      name: 'Amber',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_142-Amber_Perspective.png',
      color: 'Amber',
      colorCode: '#FFBF00'
    },
    {
      id: 'fennel',
      name: 'Fennel',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_144-Fennel_Perspective.png',
      color: 'Fennel',
      colorCode: '#A8B5A0'
    },
    {
      id: 'rosehip',
      name: 'Rosehip',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_145-Rosehip_Perspective.png',
      color: 'Rosehip',
      colorCode: '#E74C3C'
    },
    {
      id: 'hazelnut',
      name: 'Hazelnut',
      image: '/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_146-Hazelnut_Perspective.png',
      color: 'Hazelnut',
      colorCode: '#D2B48C'
    }
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
            <Link href="/montana" className="text-stone-600 hover:text-stone-800">
              Montana
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">Around Mirror</span>
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
                alt={`Montana Around Mirror - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Lifestyle Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Montana/MONTANA AROUND MIRROR/lifestyle/10731694r_2.webp"
                  alt="Around Mirror Lifestyle"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Montana/MONTANA AROUND MIRROR/lifestyle/10731694r_3.webp"
                  alt="Around Mirror Lifestyle"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
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
                Around Mirror
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                AROUND is a round mirror that fits perfectly in rooms such as the bathroom, hallway or living room 
                in coordination with other Montana cabinets or shelves. It creates a beautiful contrast between the 
                soft shapes of the mirror and the sharp edges of the Montana cabinets.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Petter J. Lassen
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr 3,541
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

            {/* Add to Cart Button - Right after variants like Fritz Hansen */}
            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr 3,541
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

            {/* Product Details - Expandable like Fritz Hansen */}
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
                  {/* Description */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Description</h4>
                    <div className="space-y-3">
                      <p className="leading-relaxed">
                        AROUND is a round mirror that fits perfectly in rooms such as the bathroom, hallway or living room 
                        in coordination with other Montana cabinets or shelves. It creates a beautiful contrast between the 
                        soft shapes of the mirror and the sharp edges of the Montana cabinets.
                      </p>
                      <p className="leading-relaxed">
                        This versatile round mirror embodies Montana's philosophy of functional design and endless 
                        customization. Available in Montana's full color palette, this mirror can be perfectly 
                        matched to your existing Montana furniture or used as a standalone statement piece.
                      </p>
                    </div>
                  </div>
                  
                  {/* Specifications */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Diameter:</span>
                        <span className="font-medium">Ø 69.6 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Depth:</span>
                        <span className="font-medium">1.6 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions:</span>
                        <span className="font-medium">72 × 72 × 3 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">2 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">Lacquered MDF, Mirror glass</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wet room safe:</span>
                        <span className="font-medium">Yes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designer:</span>
                        <span className="font-medium">Petter J. Lassen</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manufacturer:</span>
                        <span className="font-medium">Montana</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Time:</span>
                        <span className="font-medium">Approximately 8 weeks (made to order)</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>40+ Montana color options available</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Can be used in wet rooms (bathroom safe)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Designed by Petter J. Lassen</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Coordinates with Montana furniture system</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Creates contrast with sharp-edged Montana cabinets</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Available in Montana's full color palette</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Perfect for bathroom, hallway or living room</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Functional design and endless customization</span>
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
            Explore More Montana Mirrors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/montana/like-mirror" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Montana/MONTANA LIKE MIRROR/Montana_Selection_LIKE_White_Perspective.png"
                    alt="Like Mirror"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2">Like Mirror</h3>
                  <p className="text-gray-900 font-medium">kr 3,541</p>
                </div>
              </div>
            </Link>

            <Link href="/montana/look-mirror" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_White_Perspective.png"
                    alt="Look Mirror"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2">Look Mirror</h3>
                  <p className="text-gray-900 font-medium">kr 3,219</p>
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
