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

export default function PantonWireSingle35Page() {
  const [selectedVariant, setSelectedVariant] = useState('black');

  const variants: ColorVariant[] = [
    {
      id: 'black',
      name: 'Black',
      colorCode: '#000000',
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Black_perspective-scaled.jpg'
    },
    {
      id: 'chrome',
      name: 'Chrome',
      colorCode: '#C0C0C0',
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Chrome_perspective-scaled.jpg'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Monarch_perspective-scaled.jpg'
    },
    {
      id: 'pine',
      name: 'Pine',
      colorCode: '#4A5D4A',
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Black_perspective-scaled.jpg'
    },
    {
      id: 'snow',
      name: 'Snow',
      colorCode: '#FFFAFA',
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D34.8_Snow_perspective-scaled.jpg'
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];
  const price = 1580;

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
            <span className="text-stone-800">Panton Wire Single Ø34.8</span>
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
                alt={`Panton Wire Single Ø34.8 in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Panton Wire in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Panton-wire-system/lifestyle/Montana_Home21_22_PantonWire_Extended_Black_Snow_Detail_H.jpg"
                    alt="Panton Wire in modern interior setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Iconic Wire Design</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Panton-wire-system/lifestyle/Montana_Store_Bredgade24_02_H.jpg"
                    alt="Panton Wire display in Montana store"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Versatile Display</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-stone-500 uppercase tracking-wider mb-2">
                PANTON WIRE SYSTEM
              </p>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                Panton Wire Single Ø34.8
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                The larger version of Verner Panton's iconic wire shelf from 1971. This single wire shelf 
                with Ø34.8 cm diameter provides more display space while maintaining the signature minimalist 
                aesthetic. Perfect for larger books, plants, or decorative collections.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by Verner Panton, 1971
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr {price.toLocaleString()}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                FINISH: {currentVariant.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-4 gap-2">
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
                Available in {variants.length} finishes
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
                      <li><strong>Width:</strong> 34.8 cm</li>
                      <li><strong>Height:</strong> 34.8 cm</li>
                      <li><strong>Depth:</strong> 34.8 cm</li>
                      <li><strong>Material:</strong> Steel</li>
                      <li><strong>Material group:</strong> Metal</li>
                      <li><strong>Surface treatment:</strong> Chrome-plated</li>
                      <li><strong>Designer:</strong> Verner Panton</li>
                      <li><strong>Year:</strong> 1971</li>
                      <li><strong>Trademark:</strong> Montana</li>
                      <li><strong>Mounting:</strong> Wall-mounted or floor standing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Iconic Verner Panton design from 1971</li>
                      <li>• Larger diameter for more display space</li>
                      <li>• Minimalist wire construction</li>
                      <li>• Creates floating, airy display effect</li>
                      <li>• Perfect for larger books, plants, or collections</li>
                      <li>• Wall-mounted design saves floor space</li>
                      <li>• Durable powder-coated finish</li>
                      <li>• Easy installation with included mounting hardware</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Finishes</h4>
                    <p className="text-sm">
                      Black, Chrome, Monarch, and Snow finishes. Each finish is carefully selected 
                      to complement the wire design and coordinate with Montana furniture pieces.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean with a soft, damp cloth. For chrome finish, use appropriate metal cleaner. 
                      Avoid abrasive cleaners that may damage the powder-coated finish.
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
            Complete Your Panton Wire System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Monarch_perspective-scaled.jpg"
                alt="Panton Wire Single Ø18.8"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Panton Wire Single Ø18.8</h3>
                <p className="text-sm text-stone-600">Smaller single wire shelf</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Black_perspective-scaled.jpg"
                alt="Panton Wire Extended Ø34.8"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Panton Wire Extended Ø34.8</h3>
                <p className="text-sm text-stone-600">Extended wire shelf system</p>
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
