"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ColorVariant {
  id: string;
  name: string;
  color: string;
  colorCode: string;
  image: string;
  price: number;
}

interface BaseOption {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function EamesREPlasticChairDSRPage() {
  const [selectedVariant, setSelectedVariant] = useState('white');
  const [selectedBase, setSelectedBase] = useState('chrome');

  const colorVariants: ColorVariant[] = [
    {
      id: 'white',
      name: 'White',
      color: 'White',
      colorCode: '#FFFFFF',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 04 White.webp',
      price: 4010
    },
    {
      id: 'deep-black',
      name: 'Deep Black',
      color: 'Deep Black',
      colorCode: '#000000',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 12 Deep black.webp',
      price: 4010
    },
    {
      id: 'poppy-red',
      name: 'Poppy Red',
      color: 'Poppy Red',
      colorCode: '#DC2626',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 03 Poppy red.webp',
      price: 4010
    },
    {
      id: 'ice-grey',
      name: 'Ice Grey',
      color: 'Ice Grey',
      colorCode: '#E5E7EB',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 23 Ice grey.webp',
      price: 4010
    },
    {
      id: 'light-grey',
      name: 'Light Grey',
      color: 'Light Grey',
      colorCode: '#D1D5DB',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 24 Light grey.webp',
      price: 4010
    },
    {
      id: 'mustard',
      name: 'Mustard',
      color: 'Mustard',
      colorCode: '#F59E0B',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 34 Mustard.webp',
      price: 4010
    },
    {
      id: 'forest',
      name: 'Forest',
      color: 'Forest',
      colorCode: '#059669',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 48 Forest.webp',
      price: 4010
    },
    {
      id: 'sea-blue',
      name: 'Sea Blue',
      color: 'Sea Blue',
      colorCode: '#0EA5E9',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 83 Sea Blue.webp',
      price: 4010
    }
  ];

  const baseOptions: BaseOption[] = [
    {
      id: 'chrome',
      name: 'Chrome',
      description: 'Polished chrome steel base',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome.webp'
    },
    {
      id: 'black-chrome',
      name: 'Black Chrome',
      description: 'Black chrome steel base',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Black Chrome Black White Farge - 04 White.webp'
    },
    {
      id: 'white-chrome',
      name: 'White Chrome',
      description: 'White chrome steel base',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - White Chrome Black White Farge - 04 White.webp'
    }
  ];

  const currentVariant = colorVariants.find(v => v.id === selectedVariant) || colorVariants[0];
  const currentBase = baseOptions.find(b => b.id === selectedBase) || baseOptions[0];

  // Generate current image based on selected variant and base
  const getCurrentImage = () => {
    const basePrefix = selectedBase === 'chrome' ? 'Chrome Chrome' : 
                      selectedBase === 'black-chrome' ? 'Black Chrome' : 'White Chrome';
    const colorCode = currentVariant.color === 'White' ? '04 White' :
                     currentVariant.color === 'Deep Black' ? '12 Deep black' :
                     currentVariant.color === 'Poppy Red' ? '03 Poppy red' :
                     currentVariant.color === 'Ice Grey' ? '23 Ice grey' :
                     currentVariant.color === 'Light Grey' ? '24 Light grey' :
                     currentVariant.color === 'Mustard' ? '34 Mustard' :
                     currentVariant.color === 'Forest' ? '48 Forest' :
                     currentVariant.color === 'Sea Blue' ? '83 Sea Blue' : '04 White';
    
    return `/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - ${basePrefix} Black White Farge - ${colorCode}.webp`;
  };

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
            <span className="text-stone-800">Eames RE Plastic Chair DSR</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={getCurrentImage()}
                alt={`Eames RE Plastic Chair DSR in ${currentVariant.color} with ${currentBase.name} base`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {colorVariants.slice(0, 8).map((variant) => (
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
                    alt={`${variant.color} variant`}
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
                Eames RE Plastic Chair DSR
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-4">
                The Eames RE plastic Chair DSR is an iconic dining chair designed by Charles & Ray Eames in 1950. 
                The shell is attached to a chrome base known as the Eiffel Tower base. The shell comes in many different 
                colors and the base is either chrome, white or black.
              </p>
              
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                We show a selection in the online store. Contact us at{' '}
                <a href="mailto:gjovik@kiil.no" className="text-stone-800 hover:underline">
                  gjovik@kiil.no
                </a>{' '}
                for another variation. Designed by Charles & Ray Eames in 1950. Produced by Vitra.
              </p>
            </div>

            {/* Designer */}
            <div>
              <h2 className="text-2xl font-serif text-stone-800 mb-2">Designer</h2>
              <p className="text-stone-600">
                <strong>Charles and Ray Eames</strong> - Designed in 1950, this chair represents 
                the Eames' innovative approach to furniture design, combining new materials and 
                manufacturing techniques with timeless aesthetics.
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                COLOR: {currentVariant.color.toUpperCase()}
              </h3>
              <div className="flex flex-wrap gap-3">
                {colorVariants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariant === variant.id
                        ? 'border-stone-800 scale-110'
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.color}
                  />
                ))}
              </div>
            </div>

            {/* Base Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                BASE: {currentBase.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {baseOptions.map((base) => (
                  <button
                    key={base.id}
                    onClick={() => setSelectedBase(base.id)}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      selectedBase === base.id
                        ? 'border-stone-800 bg-stone-50'
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <div className="text-sm font-medium text-stone-800">{base.name}</div>
                    <div className="text-xs text-stone-600">{base.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-light text-stone-800">
              kr {currentVariant.price.toLocaleString()}
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
                    This item is made to order. Expected delivery time is approximately 8 weeks.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              {/* Specifications */}
              <div className="border border-gray-200 rounded-lg">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50">
                    <span className="font-medium text-stone-800">Specifications</span>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-4 pb-4 space-y-3 text-stone-600">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-stone-800">Width:</span> 46.5 cm
                      </div>
                      <div>
                        <span className="font-medium text-stone-800">Depth:</span> 55 cm
                      </div>
                      <div>
                        <span className="font-medium text-stone-800">Height:</span> 83 cm
                      </div>
                      <div>
                        <span className="font-medium text-stone-800">Seat Height:</span> 43 cm
                      </div>
                      <div>
                        <span className="font-medium text-stone-800">Weight:</span> 5 kg
                      </div>
                      <div>
                        <span className="font-medium text-stone-800">Material:</span> Stainless steel/100% recycled plastic
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-stone-800">Package Dimensions:</span> 50 × 60 × 90 cm
                    </div>
                  </div>
                </details>
              </div>

              {/* Features */}
              <div className="border border-gray-200 rounded-lg">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50">
                    <span className="font-medium text-stone-800">Features</span>
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-4 pb-4 space-y-2 text-stone-600">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm">Made from 100% recycled post-consumer plastic</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm">Iconic mid-century modern design by Charles and Ray Eames</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm">Suitable for indoor and outdoor use</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm">Stackable design for easy storage</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm">Available in 8 vibrant colors</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm">Three base options: Chrome, Black Chrome, White Chrome</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm">Ergonomic shell design for comfort</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm">Museum-quality craftsmanship by Vitra</span>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Images */}
        <section className="mt-20">
          <h2 className="text-3xl font-serif text-stone-800 mb-8 text-center">
            Eames Chair in Context
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Vitra/Eames-RE-Plastic-Chair – DSR /lifestyle/0a82c45a-6f87-4541-bc69-48ae478dffa8.webp"
                alt="Eames RE Plastic Chair DSR in modern dining setting"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Vitra/Eames-RE-Plastic-Chair – DSR /lifestyle/82d5c591-86e6-4874-8b8b-2acedf175f7b.webp"
                alt="Eames RE Plastic Chair DSR in contemporary workspace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Explore More Vitra */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-serif text-stone-800 mb-8">
            Explore More Vitra
          </h2>
          <Link 
            href="/vitra"
            className="inline-block bg-stone-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
          >
            VIEW ALL VITRA PRODUCTS
          </Link>
        </section>
      </div>
    </div>
  );
}
