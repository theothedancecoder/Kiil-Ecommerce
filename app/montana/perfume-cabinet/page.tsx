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

export default function PerfumeCabinetPage() {
  const [selectedVariant, setSelectedVariant] = useState('new-white');

  const variants: ColorVariant[] = [
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_New_White_Perspective.jpg'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Nordic_Perspective.jpg'
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Vanilla_Perspective.png'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Monarch_Perspective.jpg'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Anthracite_Perspective.png'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Mushroom_Perspective.jpg'
    },
    {
      id: 'amber',
      name: 'Amber',
      colorCode: '#FFBF00',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_142_Amber_Perspective.png'
    },
    {
      id: 'parsley',
      name: 'Parsley',
      colorCode: '#7C8471',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_152_Parsley_Perspective.png'
    },
    {
      id: 'masala',
      name: 'Masala',
      colorCode: '#8B4513',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_155_Masala_Perspective.png'
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];
  const price = 5739;

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
            <span className="text-stone-800">Parfum Cabinet</span>
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
                alt={`Parfum Cabinet in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Parfum Cabinet in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Perfume-cabinet/lifestyle/Montana_Home20_21_PERFUME_Turmeric_LIKE_Hazelnut_Detail_W.jpg"
                    alt="Parfum cabinet in modern interior setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Elegant Display Solution</p>
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
                Parfum Cabinet
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                PARFUM is a small wall-mounted cabinet with a glass door, glass shelf and mirrored back panel inside the cabinet. PARFUM is meant to display your beautiful perfume bottles and other bath and beauty accessories. Enjoy the panorama of your personal collection and choose the scent of the day.
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
              <div className="grid grid-cols-6 gap-2">
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
                      <li><strong>Shipping Dimensions:</strong> 40 × 25 × 40 cm</li>
                      <li><strong>Material:</strong> Lacquered MDF with glass door</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Producer:</strong> Montana</li>
                      <li><strong>Model:</strong> Parfum Cabinet</li>
                      <li><strong>Mounting:</strong> Wall-mounted with included hardware</li>
                      <li><strong>Features:</strong> Glass door, glass shelf, mirrored back panel</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Small wall-mounted cabinet with glass door</li>
                      <li>• Glass shelf for displaying perfume bottles</li>
                      <li>• Mirrored back panel inside the cabinet</li>
                      <li>• Perfect for displaying beautiful perfume bottles</li>
                      <li>• Ideal for bath and beauty accessories</li>
                      <li>• Enjoy the panorama of your personal collection</li>
                      <li>• Choose the scent of the day with ease</li>
                      <li>• Wall-mounted design saves counter space</li>
                      <li>• Available in multiple Montana Selection colors</li>
                      <li>• Easy to install with included mounting hardware</li>
                      <li>• Durable lacquered finish</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Colors</h4>
                    <p className="text-sm">
                      Selection colors: New White, Nordic, Vanilla, Monarch, Anthracite, Mushroom, 
                      Amber, Parsley, Masala. Each color is carefully selected to complement modern 
                      interiors and coordinate with other Montana furniture pieces.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean with a damp cloth and mild detergent. Avoid abrasive cleaners that may 
                      damage the lacquered finish. Ensure proper ventilation in bathroom installations.
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
            Complete Your Storage Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Makeup-dressing-Table/5714322673006_Montana_Selection_MAKEUP_Monarch_Suspended_Perspective.png"
                alt="Makeup Dressing Table"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Makeup Dressing Table</h3>
                <p className="text-sm text-stone-600">Complete beauty station</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_135-Monarch.png"
                alt="Shelfie Mirror"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Shelfie Mirror</h3>
                <p className="text-sm text-stone-600">Mirror with integrated shelf</p>
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
