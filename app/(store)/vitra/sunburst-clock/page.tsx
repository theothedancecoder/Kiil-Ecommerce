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

export default function SunburstClockPage() {
  const [selectedVariant, setSelectedVariant] = useState('walnut');

  const variants: ColorVariant[] = [
    {
      id: 'walnut',
      name: 'Walnut',
      colorCode: '#8B4513',
      image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Walnut.webp',
      price: 5090
    },
    {
      id: 'black',
      name: 'Black',
      colorCode: '#000000',
      image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 390.00  Farge - Black.webp',
      price: 5390
    },
    {
      id: 'red',
      name: 'Red',
      colorCode: '#DC2626',
      image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Red.webp',
      price: 5090
    },
    {
      id: 'multicolor',
      name: 'Multicolor',
      colorCode: '#FF6B6B',
      image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Multicolor.webp',
      price: 5090
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
            <span className="text-stone-800">Sunburst Clock</span>
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
                alt={`Sunburst Clock in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedVariant === variant.id
                      ? 'border-stone-800'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={variant.image}
                    alt={`${variant.name} variant`}
                    fill
                    className="object-contain object-center p-2"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-stone-500 uppercase tracking-wider mb-2">
                VITRA
              </p>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                Sunburst Clock
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                The Sunburst Clock is an iconic design by George Nelson from 1948-1960. This striking 
                timepiece features radiating spokes that create a dramatic sunburst pattern, making it 
                both a functional clock and a sculptural wall art piece. A true mid-century modern classic 
                that brings warmth and character to any space.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by George Nelson, 1948-1960
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
              <div className="flex flex-wrap gap-3">
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
                    This item is made to order. Expected delivery time is approximately 8-12 weeks.
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
                      <li><strong>Diameter:</strong> 47 cm</li>
                      <li><strong>Depth:</strong> 5 cm</li>
                      <li><strong>Weight:</strong> 1.2 kg</li>
                      <li><strong>Material:</strong> Wood/Metal</li>
                      <li><strong>Movement:</strong> Quartz</li>
                      <li><strong>Power:</strong> 1x AA Battery</li>
                      <li><strong>Designer:</strong> George Nelson</li>
                      <li><strong>Year:</strong> 1948-1960</li>
                      <li><strong>Manufacturer:</strong> Vitra</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Iconic George Nelson design from 1948-1960</li>
                      <li>• Sculptural sunburst pattern with radiating spokes</li>
                      <li>• High-quality quartz movement for accurate timekeeping</li>
                      <li>• Available in 4 distinctive finishes</li>
                      <li>• Wall-mounted design with easy installation</li>
                      <li>• Mid-century modern aesthetic</li>
                      <li>• Museum-quality craftsmanship by Vitra</li>
                      <li>• Perfect statement piece for modern interiors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Design Story</h4>
                    <p className="text-sm">
                      Created by George Nelson between 1948-1960, the Sunburst Clock represents 
                      Nelson's innovative approach to timekeeping, transforming the traditional clock into 
                      a piece of sculptural art that defines mid-century modern design. The radiating 
                      spokes create a dramatic sunburst pattern that serves as both functional timepiece 
                      and striking wall art.
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
            <Link href="/vitra/ball-clock" className="group">
              <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src="/Vitra/Ball-Clock/Ball Clock from Vitra NOK  3,950  Color -  Multicolor.jpg"
                  alt="Ball Clock"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                  <h3 className="font-medium text-stone-800">Ball Clock</h3>
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
