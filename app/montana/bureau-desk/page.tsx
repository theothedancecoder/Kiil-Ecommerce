"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ColorVariant {
  id: string;
  name: string;
  colorCode: string;
  image: string;
}

export default function BureauDeskPage() {
  const [selectedVariant, setSelectedVariant] = useState('monarch');

  const variants: ColorVariant[] = [
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_NewWhite_Suspended_Perspective.png'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Nordic_Suspended_Perspective.png'
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Vanilla_Suspended_Perspective.png'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Monarch_Suspended_Perspective.png'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Anthracite_Suspended_Perspective.png'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Mushroom_Suspended_Perspective.png'
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[3];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/montana" className="hover:text-stone-800">Montana</Link>
            <span className="mx-2">/</span>
            <span className="text-stone-800">Bureau Desk</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image and Lifestyle Images */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={currentVariant.image}
                alt={`Bureau Desk in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Bureau in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Selection/Montana_Home21_22_BUREAU_Flint_01_H-scaled.jpg"
                    alt="Bureau desk in modern living room setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Living Room Integration</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Selection/Montana_Home21_22_BUREAU_Flint_Detail_H-scaled.jpg"
                    alt="Bureau desk detail showing storage compartments"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Smart Storage Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-stone-500 uppercase tracking-wider mb-2">
                MONTANA SELECTION
              </p>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                Bureau Desk
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                BUREAU is a small desk that integrates elegantly into the home office, living room and bedroom. 
                BUREAU has two large shelves that can be completely removed from the module, giving a good overview 
                of the contents. In addition to the shelves, BUREAU has a shelf and a cabinet under the countertop. 
                BUREAU is only available as a wall-mounted module. The module comes with a desk mat.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by Petter J. Lassen
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr 15,817
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                COLOR: {currentVariant.name.toUpperCase()}
              </h3>
              <div className="flex space-x-3">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariant === variant.id
                        ? 'border-stone-800 scale-110'
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.name}
                  />
                ))}
              </div>
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {variants.slice(0, 6).map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedVariant === variant.id
                      ? 'border-stone-800'
                      : 'border-transparent hover:border-stone-300'
                  }`}
                >
                  <Image
                    src={variant.image}
                    alt={variant.name}
                    fill
                    className="object-contain object-center p-2"
                  />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs text-stone-600 text-center bg-white bg-opacity-90 rounded px-1 py-0.5">
                      {variant.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 rounded-lg font-medium hover:bg-stone-700 transition-colors text-lg">
              ADD TO CART - KR 15,817
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

            {/* Product Details Expandable */}
            <div className="border-t border-gray-200 pt-8">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer text-stone-800 font-medium py-2">
                  PRODUCT DETAILS
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 space-y-4 text-stone-600">
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Specifications</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Dimensions:</strong> W 93.7 x H 36.6 x D 38 cm</li>
                      <li><strong>Weight:</strong> 25 kg</li>
                      <li><strong>Base:</strong> Wall-mounted</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Producer:</strong> Montana</li>
                      <li><strong>Includes:</strong> Desk mat</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Two large removable shelves for easy organization</li>
                      <li>• Additional shelf and cabinet under countertop</li>
                      <li>• Wall-mounted design saves floor space</li>
                      <li>• Integrates elegantly into any room</li>
                      <li>• Available in Selection colors (4-week delivery)</li>
                      <li>• Custom colors available upon request</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Colors</h4>
                    <p className="text-sm">
                      Selection colors: New White, Nordic, Vanilla, Monarch, Anthracite, Mushroom.
                      <br />
                      For other Montana colors or color combinations, please contact us for a quote.
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-serif text-stone-800 mb-8 text-center">
            Complete Your Home Office
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana-DASH-Nightstand/Montana_Selection_DASH_NewWhite_Suspended_Perspective.jpg"
                alt="Dash Nightstand"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Dash Nightstand</h3>
                <p className="text-sm text-stone-600">Wall-mounted storage solution</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/MB126-LEGS/montana_mb126_position_legs_rosehip.webp"
                alt="MB126 Legs"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">MB126 Legs</h3>
                <p className="text-sm text-stone-600">Classic Montana legs for shelving</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/montana"
              className="inline-block bg-stone-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
            >
              VIEW ALL MONTANA PRODUCTS
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
