"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ColorVariant {
  id: string;
  name: string;
  colorCode: string;
  image: string;
  price: number;
}

export default function BallClockPage() {
  const [selectedVariant, setSelectedVariant] = useState('multicolor');

    const variants: ColorVariant[] = [
      {
        id: 'multicolor',
        name: 'Multicolor',
        colorCode: '#FF6B6B',
        image: '/Vitra/Ball-Clock/Ball Clock from Vitra NOK  3,950  Color -  Multicolor.jpg',
        price: 3950
      },
      {
        id: 'natural-beech',
        name: 'Natural Beech',
        colorCode: '#D2B48C',
        image: '/Vitra/Ball-Clock/Ball Clock fra Vitra kr 3 950  Farge - Natural beech.jpg',
        price: 3950
      },
      {
        id: 'orange',
        name: 'Orange',
        colorCode: '#FF8C00',
        image: '/Vitra/Ball-Clock/Ball Clock fra Vitra kr 3 950  Farge - Orange.webp',
        price: 3950
      },
      {
        id: 'cherry',
        name: 'Cherry',
        colorCode: '#8B0000',
        image: '/Vitra/Ball-Clock/Ball Clock from Vitra NOK  4,950  Color -  Cherry.webp',
        price: 4950
      },
      {
        id: 'black',
        name: 'Black',
        colorCode: '#000000',
        image: '/Vitra Ball Clock /black.webp',
        price: 3950
      }
    ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/vitra" className="hover:text-stone-800">Vitra</Link>
            <span className="mx-2">/</span>
            <span className="text-stone-800">Ball Clock</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={currentVariant.image}
                alt={`Ball Clock in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Lifestyle Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Vitra/Ball-Clock/lifestyle/10004057r_3.jpg"
                  alt="Ball Clock Lifestyle"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Vitra/Ball-Clock/lifestyle/10004057r_4.webp"
                  alt="Ball Clock in Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-stone-500 uppercase tracking-wider mb-2">
                VITRA
              </p>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                Ball Clock
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                The Ball Clock is one of George Nelson's most iconic designs, created in 1947. 
                This sculptural timepiece features colorful wooden balls arranged around a central 
                clock mechanism, creating a playful yet sophisticated statement piece. The design 
                represents the optimistic spirit of mid-century modern design and remains as 
                relevant today as it was over 70 years ago.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by George Nelson, 1947
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr {currentVariant.price.toLocaleString()}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                COLOR: {currentVariant.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-4 gap-3 mb-4">
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
              <p className="text-xs text-stone-500">
                Available in {variants.length} distinctive finishes
              </p>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 rounded-lg font-medium hover:bg-stone-700 transition-colors text-lg">
              ADD TO CART - KR {currentVariant.price.toLocaleString()}
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
                    This item is made to order. Expected delivery time is approximately 6-8 weeks.
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
                      <li><strong>Dimensions:</strong> Ø 33 cm</li>
                      <li><strong>Depth:</strong> 10 cm</li>
                      <li><strong>Weight:</strong> 1.2 kg</li>
                      <li><strong>Material:</strong> Lacquered solid wood, metal</li>
                      <li><strong>Movement:</strong> Quartz clock movement</li>
                      <li><strong>Designer:</strong> George Nelson</li>
                      <li><strong>Year:</strong> 1947</li>
                      <li><strong>Manufacturer:</strong> Vitra</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Iconic mid-century modern design</li>
                      <li>• Sculptural wall clock with colorful wooden balls</li>
                      <li>• Silent quartz movement</li>
                      <li>• Easy wall mounting</li>
                      <li>• Timeless design that complements any interior</li>
                      <li>• Available in multiple color combinations</li>
                      <li>• Perfect statement piece for living rooms, offices</li>
                      <li>• Part of Vitra's permanent collection</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Design Story</h4>
                    <p className="text-sm">
                      Created by George Nelson in 1947, the Ball Clock emerged from Nelson's 
                      philosophy that clocks should be more than just functional objects. 
                      The design represents the optimistic, playful spirit of post-war America 
                      and has become one of the most recognizable icons of mid-century modern design.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean with a soft, dry cloth. Avoid using water or cleaning agents. 
                      The clock mechanism requires one AA battery (not included). 
                      Handle with care when mounting or moving.
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
            More Vitra Classics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/vitra/sunburst-clock" className="group">
              <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Walnut.webp"
                  alt="Sunburst Clock"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                  <h3 className="font-medium text-stone-800">Sunburst Clock</h3>
                  <p className="text-sm text-stone-600">Another George Nelson masterpiece</p>
                </div>
              </div>
            </Link>
            <Link href="/vitra/hang-it-all" className="group">
              <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Multicolor.webp"
                  alt="Hang It All"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                  <h3 className="font-medium text-stone-800">Hang It All</h3>
                  <p className="text-sm text-stone-600">Playful Eames coat rack</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/vitra"
              className="inline-block bg-stone-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
            >
              VIEW ALL VITRA PRODUCTS
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
