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

export default function UnlockKeyCabinetPage() {
  const [selectedVariant, setSelectedVariant] = useState('new-white');

  const variants: ColorVariant[] = [
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_NewWhite_Suspended_Perspective.png'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Nordic_Suspended_Perspective.jpg'
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Vanilla_Suspended_Perspective.jpg'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Monarch_Suspended_Perspective.png'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Anthracite_Suspended_Perspective.png'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Mushroom_Suspended_Perspective.png'
    },
    {
      id: 'acacia',
      name: 'Acacia',
      colorCode: '#D2B48C',
      image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Acacia_Perspective.png'
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];
  const price = 6484;

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
            <span className="text-stone-800">Unlock Key Cabinet</span>
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
                alt={`Unlock Key Cabinet in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Unlock in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Unlock-key-cabinet/lifestyle/Montana_Home18_19_Hide_Boulevard_Unlock_Nordic_Look_Montparnasse_H_Look-1.jpg"
                    alt="Unlock key cabinet in modern interior setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Modern Integration</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Unlock-key-cabinet/lifestyle/Montana_Home18_19_Unlock_Nordic_Detail_H-1-scaled.jpg.avif"
                    alt="Unlock key cabinet detail view"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Functional Detail</p>
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
                Unlock Key Cabinet
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Montana's classic bookshelf solution! UNLOCK is a small wall-mounted cabinet for keys and small items 
                that fits perfectly in a small hallway. The key cabinet is the perfect solution for keeping your 
                family's keys organized and in one place.
              </p>
              <p className="text-stone-600 mb-4">
                Designer: Petter J. Lassen
              </p>
              <p className="text-stone-600 mb-4">
                Producer: Montana
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr {price.toLocaleString()}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                COLOR: {currentVariant.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-7 gap-2">
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
              <p className="text-xs text-stone-500 mt-2">
                Available in {variants.length} Montana Selection colors
              </p>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 rounded-lg font-medium hover:bg-stone-700 transition-colors text-lg">
              ADD TO CART - KR {price.toLocaleString()}
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
                      <li><strong>Dimensions:</strong> W 35.4 x H 35.4 x D 20 cm</li>
                      <li><strong>Weight:</strong> 3 kg</li>
                      <li><strong>Material:</strong> Lacquered MDF</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Producer:</strong> Montana</li>
                      <li><strong>Model:</strong> Unlock Key Cabinet</li>
                      <li><strong>Mounting:</strong> Wall-mounted with included hardware</li>
                      <li><strong>Function:</strong> Key and small items storage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Montana's classic bookshelf solution</li>
                      <li>• Small wall-mounted cabinet for keys and small items</li>
                      <li>• Fits perfectly in a small hallway</li>
                      <li>• Perfect solution for keeping family keys organized</li>
                      <li>• Keeps everything in one place</li>
                      <li>• Wall-mounted design saves space</li>
                      <li>• Available in Montana Selection colors</li>
                      <li>• Easy to install with included mounting hardware</li>
                      <li>• Durable lacquered finish</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Colors</h4>
                    <p className="text-sm">
                      Selection colors: New White, Nordic, Vanilla, Monarch, Anthracite, Mushroom.
                      Each color is carefully selected to complement modern interiors and coordinate 
                      with other Montana furniture pieces.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean with a damp cloth and mild detergent. Avoid abrasive cleaners that may damage 
                      the lacquered finish. Handle keys gently to maintain the cabinet's functionality.
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
            Complete Your Organization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_101-New-White.png"
                alt="Shelfie Mirror"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Shelfie Mirror</h3>
                <p className="text-sm text-stone-600">Mirror with integrated shelf</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_Suspended_Perspective.png"
                alt="Show Module"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Show Module 1112</h3>
                <p className="text-sm text-stone-600">Open bookcase storage</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Suspended_Perspective.png"
                alt="Pair Sideboard"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Pair Sideboard</h3>
                <p className="text-sm text-stone-600">Classic storage solution</p>
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
