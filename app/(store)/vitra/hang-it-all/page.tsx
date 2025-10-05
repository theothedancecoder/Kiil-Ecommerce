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

export default function HangItAllPage() {
  const [selectedVariant, setSelectedVariant] = useState('multicolor');

  const variants: ColorVariant[] = [
    {
      id: 'multicolor',
      name: 'Multicolor',
      colorCode: '#FF6B6B',
      image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Multicolor.webp',
      price: 3490
    },
    {
      id: 'red',
      name: 'Red',
      colorCode: '#DC2626',
      image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Red.jpg',
      price: 3490
    },
    {
      id: 'green',
      name: 'Green',
      colorCode: '#16A34A',
      image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Green.jpg',
      price: 3490
    },
    {
      id: 'white',
      name: 'White',
      colorCode: '#FFFFFF',
      image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - White.jpg',
      price: 3490
    },
    {
      id: 'walnut',
      name: 'Walnut',
      colorCode: '#8B4513',
      image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Walnut.jpg',
      price: 3490
    },
    {
      id: 'black-ash',
      name: 'Black Ash',
      colorCode: '#2D2D2D',
      image: '/Vitra/Hang-it-all/Hang it all Vitra NOK  3,490  Color -  Black ash.jpg',
      price: 3490
    },
    {
      id: 'marble',
      name: 'Marble',
      colorCode: '#F5F5F5',
      image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 750  Farge - Marble.jpg',
      price: 3750
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
            <span className="text-stone-800">Hang It All</span>
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
                alt={`Hang It All in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {variants.slice(0, 4).map((variant) => (
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
            
            {variants.length > 4 && (
              <div className="grid grid-cols-3 gap-3">
                {variants.slice(4).map((variant) => (
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
                      sizes="(max-width: 768px) 33vw, 16vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-stone-500 uppercase tracking-wider mb-2">
                VITRA
              </p>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                Hang It All
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Designed by Charles and Ray Eames in 1953, the Hang It All is a playful and functional 
                coat rack that brings joy to any space. Featuring colorful wooden balls mounted on metal 
                hooks, this iconic piece combines the Eames' signature approach to design with practical 
                everyday functionality. Perfect for entryways, children's rooms, or any space that needs 
                both storage and a touch of mid-century modern charm.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by Charles and Ray Eames, 1953
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
                      <li><strong>Dimensions:</strong> 48 x 16.5 cm</li>
                      <li><strong>Depth:</strong> 16.5 cm</li>
                      <li><strong>Weight:</strong> 1.8 kg</li>
                      <li><strong>Material:</strong> Lacquered solid wood, steel wire</li>
                      <li><strong>Hooks:</strong> 14 hooks</li>
                      <li><strong>Mounting:</strong> Wall-mounted</li>
                      <li><strong>Designer:</strong> Charles and Ray Eames</li>
                      <li><strong>Year:</strong> 1953</li>
                      <li><strong>Manufacturer:</strong> Vitra</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Iconic Charles and Ray Eames design from 1953</li>
                      <li>• 14 individual hooks for maximum functionality</li>
                      <li>• Colorful wooden balls add playful character</li>
                      <li>• Perfect for coats, bags, scarves, and accessories</li>
                      <li>• Wall-mounted design saves floor space</li>
                      <li>• Available in 7 distinctive color combinations</li>
                      <li>• Ideal for entryways, children's rooms, or offices</li>
                      <li>• Museum-quality craftsmanship by Vitra</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Design Story</h4>
                    <p className="text-sm">
                      Created by Charles and Ray Eames in 1953, the Hang It All represents the duo's 
                      philosophy of making design both functional and joyful. Originally designed for 
                      children, this coat rack has become a beloved piece for all ages. The colorful 
                      wooden balls not only serve as decorative elements but also prevent items from 
                      sliding off the hooks, showcasing the Eames' attention to both form and function.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean with a soft, damp cloth. Avoid using harsh chemicals or abrasive cleaners. 
                      The lacquered wood finish is durable but should be protected from excessive moisture. 
                      Ensure proper wall mounting using appropriate hardware for your wall type.
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
                  <p className="text-sm text-stone-600">Iconic sunburst design</p>
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
