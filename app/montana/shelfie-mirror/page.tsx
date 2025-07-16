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

export default function ShelfieMirrorPage() {
  const [selectedVariant, setSelectedVariant] = useState('white');

  const variants: ColorVariant[] = [
    {
      id: 'white',
      name: 'White',
      colorCode: '#FFFFFF',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_01-White.png'
    },
    {
      id: 'fjord',
      name: 'Fjord',
      colorCode: '#4A90A4',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_02-Fjord.png'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_04-Anthracite.png'
    },
    {
      id: 'black',
      name: 'Black',
      colorCode: '#000000',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_05-Black.png'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mrror_09-Nordic.png'
    },
    {
      id: 'coffee',
      name: 'Coffee',
      colorCode: '#6F4E37',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_35-Coffee_Perspective.png'
    },
    {
      id: 'coal',
      name: 'Coal',
      colorCode: '#36454F',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_36-Coal_Perspective.png'
    },
    {
      id: 'snow',
      name: 'Snow',
      colorCode: '#FFFAFA',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_38-Snow_Perspective.png'
    },
    {
      id: 'graphic',
      name: 'Graphic',
      colorCode: '#2F2F2F',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_100-Graphic.png'
    },
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_101-New-White.png'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_135-Monarch.png'
    },
    {
      id: 'pine',
      name: 'Pine',
      colorCode: '#01796F',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_136-Pine_Perspective.png'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_137-Mushroom.png'
    },
    {
      id: 'juniper',
      name: 'Juniper',
      colorCode: '#68829E',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_138-Juniper_Perspective.png'
    },
    {
      id: 'oregano',
      name: 'Oregano',
      colorCode: '#9CAF88',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_139-Oregano_Perspective.png'
    },
    {
      id: 'pomelo',
      name: 'Pomelo',
      colorCode: '#F4D03F',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_140-Pomelo_Perspective.png'
    },
    {
      id: 'truffle',
      name: 'Truffle',
      colorCode: '#8B7355',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_141-Truffle_Perspective.png'
    },
    {
      id: 'amber',
      name: 'Amber',
      colorCode: '#FFBF00',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_142-Amber_Perspective.png'
    },
    {
      id: 'fennel',
      name: 'Fennel',
      colorCode: '#87A96B',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_144-Fennel_Perspective.png'
    },
    {
      id: 'rosehip',
      name: 'Rosehip',
      colorCode: '#E8B4B8',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_145-Rosehip_Perspective.png'
    },
    {
      id: 'hazelnut',
      name: 'Hazelnut',
      colorCode: '#D2B48C',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_146-Hazelnut_Perspective.png'
    },
    {
      id: 'shadow',
      name: 'Shadow',
      colorCode: '#8A8A8A',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_147-Shadow_Perspective.png'
    },
    {
      id: 'flint',
      name: 'Flint',
      colorCode: '#6C6C6C',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_148-Flint_Perspective.png'
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_150-Vanilla.png'
    },
    {
      id: 'rhubarb',
      name: 'Rhubarb',
      colorCode: '#DA70D6',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_151-Rhubarb_Perspective.png'
    },
    {
      id: 'parsley',
      name: 'Parsley',
      colorCode: '#123524',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_152-Parsley.png'
    },
    {
      id: 'azure',
      name: 'Azure',
      colorCode: '#007FFF',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_154-Azure_Perspective.png'
    },
    {
      id: 'masala',
      name: 'Masala',
      colorCode: '#C04000',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_155-Masala_Perspective.png'
    },
    {
      id: 'oyster',
      name: 'Oyster',
      colorCode: '#DAD4B0',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_156-Oyster_Perspective.png'
    },
    {
      id: 'cumin',
      name: 'Cumin',
      colorCode: '#924B00',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_157-Cumin_Perspective.png'
    },
    {
      id: 'oat',
      name: 'Oat',
      colorCode: '#DDD6C1',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_158-Oat_Perspective.png'
    },
    {
      id: 'camomile',
      name: 'Camomile',
      colorCode: '#F7E98E',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_159-Camomile_Perspective.png'
    },
    {
      id: 'balsamic',
      name: 'Balsamic',
      colorCode: '#704214',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_160-Balsamic_Perspective.png'
    },
    {
      id: 'mist',
      name: 'Mist',
      colorCode: '#C4C4C4',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_161-Mist_Perspective.png'
    },
    {
      id: 'hokkaido',
      name: 'Hokkaido',
      colorCode: '#F5F5F5',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_162-Hokkaido_Perspective.png'
    },
    {
      id: 'black-jade',
      name: 'Black Jade',
      colorCode: '#00A86B',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_163-Black-Jade_Perspective.png'
    },
    {
      id: 'iris',
      name: 'Iris',
      colorCode: '#5A4FCF',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_164-Iris_Perspective.png'
    },
    {
      id: 'beetroot',
      name: 'Beetroot',
      colorCode: '#8B0000',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_165-Beetroot_Perspective.png'
    },
    {
      id: 'acacia',
      name: 'Acacia',
      colorCode: '#F4A460',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Acacia_Perspective.png'
    },
    {
      id: 'clay',
      name: 'Clay',
      colorCode: '#B66A50',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Clay_Perspective.png'
    },
    {
      id: 'ruby',
      name: 'Ruby',
      colorCode: '#E0115F',
      image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Ruby_Perspective.png'
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];
  const price = 4669;

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
            <span className="text-stone-800">Shelfie Mirror</span>
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
                alt={`Shelfie Mirror in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Shelfie in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/lifestyle/w899h1200.webp"
                    alt="Shelfie mirror in modern interior setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Modern Integration</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/lifestyle/w899h1200-1.webp"
                    alt="Shelfie mirror with decorative accessories"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Functional Display</p>
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
                Shelfie Mirror
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                SHELFIE from Montana is a practical and decorative mirror with space for a few small items on the built-in shelf. Perfect for a small bathroom or hallway.
              </p>
              <p className="text-stone-600 mb-4">
                Designer: Petter J. Lassen
              </p>
              <p className="text-stone-600 mb-4">
                Manufacturer: Montana
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
              <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
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
                      <li><strong>Dimensions:</strong> W 46.8 x H 69.6 x D 9.9 cm</li>
                      <li><strong>Package dimensions:</strong> 72 × 49 × 12 cm</li>
                      <li><strong>Weight:</strong> 3 kg</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Manufacturer:</strong> Montana</li>
                      <li><strong>Mounting:</strong> Wall-mounted with included hardware</li>
                      <li><strong>Wet room compatible:</strong> Yes, can be used in wet rooms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Practical and decorative mirror with built-in shelf</li>
                      <li>• Perfect for small bathrooms or hallways</li>
                      <li>• Can be used in wet rooms</li>
                      <li>• Space for a few small items on the shelf</li>
                      <li>• Wall-mounted design saves floor space</li>
                      <li>• Available in Montana Selection colors</li>
                      <li>• Easy to install with included mounting hardware</li>
                      <li>• Durable lacquered finish</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Colors</h4>
                    <p className="text-sm">
                      Available in Montana Selection colors: 04 Anthracite, 05 Black, 09 Nordic, 101 New White, 135 Monarch, 137 Mushroom, 150 Vanilla, 152 Parsley, 01 White, 02 Fjord, 100 Graphic, 136 Pine, 138 Juniper, 139 Oregano, 140 Pomelo, 141 Truffle, 142 Amber, 144 Fennel, 145 Rosehip, 146 Hazelnut, 147 Shadow, 148 Flint, 151 Rhubarb, 154 Azure, 155 Masala, 156 Oyster, 157 Cumin, 158 Oat, 159 Camomile, 160 Balsamic, 161 Mist, 162 Hokkaido, 163 Black Jade, 164 Iris, 165 Beetroot, 166 Acacia, 167 Ruby, 168 Clay, 35 Coffee, 36 Coal, 38 Snow.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean the mirror with standard glass cleaner. Wipe the shelf with a damp cloth 
                      and mild detergent. Avoid abrasive cleaners that may damage the lacquered finish.
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
            Complete Your Space
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png"
                alt="Around Mirror"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Around Mirror</h3>
                <p className="text-sm text-stone-600">Elegant round mirror</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Anthracite_Perspective.png"
                alt="Look Mirror"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Look Mirror</h3>
                <p className="text-sm text-stone-600">Square mirror with clean lines</p>
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
