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

export default function LookMirrorPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      id: 'white',
      name: 'White',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_White_Perspective.png',
      color: 'White',
      colorCode: '#FFFFFF'
    },
    {
      id: 'new-white',
      name: 'New White',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_NewWhite_Perspective.png',
      color: 'New White',
      colorCode: '#FAFAFA'
    },
    {
      id: 'snow',
      name: 'Snow',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Snow_Perspective.png',
      color: 'Snow',
      colorCode: '#F8F8F8'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Nordic_Perspective.png',
      color: 'Nordic',
      colorCode: '#E8E8E8'
    },
    {
      id: 'mist',
      name: 'Mist',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Mist_Perspective.png',
      color: 'Mist',
      colorCode: '#E0E0E0'
    },
    {
      id: 'oyster',
      name: 'Oyster',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Oyster_Perspective.png',
      color: 'Oyster',
      colorCode: '#F5F5DC'
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Vanilla_Perspective.png',
      color: 'Vanilla',
      colorCode: '#F3E5AB'
    },
    {
      id: 'oat',
      name: 'Oat',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Oat_Perspective.png',
      color: 'Oat',
      colorCode: '#DDD6C1'
    },
    {
      id: 'flint',
      name: 'Flint',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Flint_Perspective.png',
      color: 'Flint',
      colorCode: '#A8A8A8'
    },
    {
      id: 'shadow',
      name: 'Shadow',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Shadow_Perspective.png',
      color: 'Shadow',
      colorCode: '#808080'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Anthracite_Perspective.png',
      color: 'Anthracite',
      colorCode: '#3A3A3A'
    },
    {
      id: 'coal',
      name: 'Coal',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Coal_Perspective-700x700.png',
      color: 'Coal',
      colorCode: '#2C2C2C'
    },
    {
      id: 'graphic',
      name: 'Graphic',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Graphic_Perspective.png',
      color: 'Graphic',
      colorCode: '#1A1A1A'
    },
    {
      id: 'fjord',
      name: 'Fjord',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Fjord_Perspective.png',
      color: 'Fjord',
      colorCode: '#8B9DC3'
    },
    {
      id: 'azure',
      name: 'Azure',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Azure_Perspective.png',
      color: 'Azure',
      colorCode: '#007FFF'
    },
    {
      id: 'iris',
      name: 'Iris',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Iris_Perspective.png',
      color: 'Iris',
      colorCode: '#5D4E75'
    },
    {
      id: 'black-jade',
      name: 'Black Jade',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_BlackJade_Perspective.png',
      color: 'Black Jade',
      colorCode: '#2F4F2F'
    },
    {
      id: 'pine',
      name: 'Pine',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Pine_Perspective.png',
      color: 'Pine',
      colorCode: '#4A5D23'
    },
    {
      id: 'juniper',
      name: 'Juniper',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Juniper_Perspective.png',
      color: 'Juniper',
      colorCode: '#5A6B3B'
    },
    {
      id: 'parsley',
      name: 'Parsley',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Parsley_Perspective.png',
      color: 'Parsley',
      colorCode: '#6B8E23'
    },
    {
      id: 'oregano',
      name: 'Oregano',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Oregano_Perspective.png',
      color: 'Oregano',
      colorCode: '#7A8B3A'
    },
    {
      id: 'fennel',
      name: 'Fennel',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Fennel_Perspective.png',
      color: 'Fennel',
      colorCode: '#A8B5A0'
    },
    {
      id: 'camomile',
      name: 'Camomile',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Camomile_Perspective.png',
      color: 'Camomile',
      colorCode: '#F7E98E'
    },
    {
      id: 'pomelo',
      name: 'Pomelo',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Pomelo_Perspective.png',
      color: 'Pomelo',
      colorCode: '#F4D03F'
    },
    {
      id: 'amber',
      name: 'Amber',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Amber_Perspective.png',
      color: 'Amber',
      colorCode: '#FFBF00'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Monarch_Perspective.png',
      color: 'Monarch',
      colorCode: '#D4AF37'
    },
    {
      id: 'cumin',
      name: 'Cumin',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Cumin_Perspective.png',
      color: 'Cumin',
      colorCode: '#C4A484'
    },
    {
      id: 'hazelnut',
      name: 'Hazelnut',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Hazelnut_Perspective.png',
      color: 'Hazelnut',
      colorCode: '#D2B48C'
    },
    {
      id: 'truffle',
      name: 'Truffle',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Truffle_Perspective.png',
      color: 'Truffle',
      colorCode: '#8B6F47'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Mushroom_Perspective.png',
      color: 'Mushroom',
      colorCode: '#8B7355'
    },
    {
      id: 'acacia',
      name: 'Acacia',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Acacia_Perspective.png',
      color: 'Acacia',
      colorCode: '#B8860B'
    },
    {
      id: 'coffee',
      name: 'Coffee',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Coffee_Perspective.png',
      color: 'Coffee',
      colorCode: '#6B4423'
    },
    {
      id: 'clay',
      name: 'Clay',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Clay_Perspective.png',
      color: 'Clay',
      colorCode: '#B87333'
    },
    {
      id: 'balsamic',
      name: 'Balsamic',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Balsamic_Perspective.png',
      color: 'Balsamic',
      colorCode: '#8B4513'
    },
    {
      id: 'masala',
      name: 'Masala',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Masala_Perspective.png',
      color: 'Masala',
      colorCode: '#CD853F'
    },
    {
      id: 'hokkaido',
      name: 'Hokkaido',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Hokkaido_Perspective.png',
      color: 'Hokkaido',
      colorCode: '#FF8C00'
    },
    {
      id: 'rhubarb',
      name: 'Rhubarb',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Rhubarb_Perspective.png',
      color: 'Rhubarb',
      colorCode: '#DA70D6'
    },
    {
      id: 'beetroot',
      name: 'Beetroot',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Beetroot_Perspective.png',
      color: 'Beetroot',
      colorCode: '#8B008B'
    },
    {
      id: 'ruby',
      name: 'Ruby',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Ruby_Perspective.png',
      color: 'Ruby',
      colorCode: '#E0115F'
    },
    {
      id: 'rosehip',
      name: 'Rosehip',
      image: '/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Rosehip_Perspective.png',
      color: 'Rosehip',
      colorCode: '#E74C3C'
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
            <span className="text-stone-800 font-medium">Look Mirror</span>
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
                alt={`Montana Look Mirror - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Lifestyle Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Montana/MONTANA LOOK MIRROR/lifestyle/Montana_Home18_19_Hide_Boulevard_Unlock_Nordic_Look_Montparnasse_H_Look.jpg"
                  alt="Look Mirror Lifestyle"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Montana/MONTANA LOOK MIRROR/lifestyle/Montana_Home20_21_Bathroom_Iris_LOOK_Mushroom_H-scaled.jpg"
                  alt="Look Mirror Lifestyle"
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
                Look Mirror
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                LOOK is a square mirror that fits perfectly in rooms such as the bathroom, hallway or living room in coordination with other Montana cabinets or shelves. It creates a beautiful contrast between the soft shapes of the mirror and the sharp edges of the Montana cabinets.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Petter J. Lassen
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr 3,219
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
              Add to Cart - kr 3,219
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
                        LOOK is a square mirror that fits perfectly in rooms such as the bathroom, hallway or living room in coordination with other Montana cabinets or shelves. It creates a beautiful contrast between the soft shapes of the mirror and the sharp edges of the Montana cabinets.
                      </p>
                      <p className="leading-relaxed">
                        LOOK comes with suspension rails for mounting either vertically or horizontally. The square format makes it versatile for any room layout and creates an elegant focal point.
                      </p>
                      <p className="leading-relaxed">
                        This product is available on QUICKSHIP in the colors New White, Nordic, Vanilla, Monarch, Anthracite & Mushroom. QUICKSHIP products are estimated to be delivered in approximately 3 weeks.
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
                        <span className="font-medium">35.4 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Depth:</span>
                        <span className="font-medium">1.6 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions:</span>
                        <span className="font-medium">35.4 × 35.4 × 1.6 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">2 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">4 mm mirror on 12 mm lacquered MDF</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wet room safe:</span>
                        <span className="font-medium">Yes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designer:</span>
                        <span className="font-medium">Petter J. Lassen</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>40+ Montana color options available</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Square mirror format (35.4 × 35.4 cm)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Perfect for coordination with Montana cabinets</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Can be used in wet rooms (bathroom safe)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>QUICKSHIP available in 6 colors</span>
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
