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

export default function MontereyDeskPage() {
  const [selectedVariant, setSelectedVariant] = useState('new-white');

  const variants: ColorVariant[] = [
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana/Monterey-Desk/Montana_Monterey_H72_NewWhite_Perspective.png'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Anthracite_Perspective.png'
    },
    {
      id: 'black',
      name: 'Black',
      colorCode: '#000000',
      image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Black_Perspective.png'
    },
    {
      id: 'parsley',
      name: 'Parsley',
      colorCode: '#7A8471',
      image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Parsley_Perspective.png'
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];
  const price = 14250;

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
            <span className="text-stone-800">Monterey Desk</span>
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
                alt={`Monterey Desk in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Monterey Desk in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Monterey-Desk/lifestyle/Montana_Home20_21_Monterey_Parsley_PantonOne_MontanaFree_Black_02_H-2-scaled.jpg.avif"
                    alt="Monterey desk in modern home office setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Home Office Integration</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Monterey-Desk/lifestyle/Montana_Home21_22_Monterey_COLLECT_CLASSIFY_Masala_RUNNER_Rosehip_Noticeboard_Cumin_H-2.jpg"
                    alt="Monterey desk with storage accessories"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Organized Workspace</p>
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
                Monterey Desk
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                The Monterey Desk is Montana's sophisticated workspace solution that combines elegant design with practical functionality. 
                Perfect for home offices, studies, or creative spaces, this desk provides ample workspace while maintaining a clean, 
                modern aesthetic. Available in many more sizes - contact us for a quote!
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
                      <li><strong>Dimensions:</strong> W 160 x H 72 x D 80 cm</li>
                      <li><strong>Weight:</strong> 10 kg</li>
                      <li><strong>Material:</strong> Lacquered MDF</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Manufacturer:</strong> Montana</li>
                      <li><strong>Model:</strong> Monterey Desk</li>
                      <li><strong>Height:</strong> 72 cm (standard desk height)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Sophisticated workspace solution</li>
                      <li>• Ample workspace for productivity</li>
                      <li>• Clean, modern aesthetic</li>
                      <li>• Perfect for home offices and studies</li>
                      <li>• Available in Montana Selection colors</li>
                      <li>• Elegant design with practical functionality</li>
                      <li>• Durable lacquered finish</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Colors</h4>
                    <p className="text-sm">
                      Available colors: New White, Anthracite, Black, Parsley.
                      Choose between New White, Nordic, Vanilla, Monarch, Anthracite or Mushroom for standard options. 
                      If you want one of the other 34 paint colors or a combination of several colors, contact us for a quote!
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean with a damp cloth and mild detergent. Avoid abrasive cleaners that may damage 
                      the lacquered finish. Use coasters and desk pads to protect the surface from scratches and stains.
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
            Complete Your Workspace
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Vanilla_Suspended_Perspective.png"
                alt="Bureau Desk"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Bureau Desk</h3>
                <p className="text-sm text-stone-600">Compact desk with integrated storage</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Compile-module/Montana_Selection_COMPILE_Monarch_Wall_Perspective.png"
                alt="Compile Module"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Compile Module</h3>
                <p className="text-sm text-stone-600">Versatile storage for office organization</p>
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
                <p className="text-sm text-stone-600">Open bookcase for display and storage</p>
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
