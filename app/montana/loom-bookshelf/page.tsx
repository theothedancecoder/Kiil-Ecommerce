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

interface MountingOption {
  id: string;
  name: string;
  description: string;
  variants: ColorVariant[];
}

export default function LoomBookshelfPage() {
  const [selectedMounting, setSelectedMounting] = useState('suspended');
  const [selectedVariant, setSelectedVariant] = useState('new-white');

  const mountingOptions: MountingOption[] = [
    {
      id: 'suspended',
      name: 'Wall-mounted',
      description: 'Wall-mounted floating design',
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_NewWhite_Suspended_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Nordic_Suspended_Perspective.jpg'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Vanilla_Suspended_Perspective.png'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Monarch_Suspended_Perspective.png'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Anthracite_Suspended_Perspective.jpg'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Mushroom_Suspended_Perspective.png'
        }
      ]
    },
    {
      id: 'plinth-h3',
      name: 'Base 3cm',
      description: 'Low base (3cm height)',
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_NewWhite_PlinthH3_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Nordic_PlinthH3_Perspective.jpg'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Vanilla_PlinthH3_Perspective.jpg'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Monarch_PlinthH3_Perspective.png'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Anthracite_PlinthH3_Perspective.jpg'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Mushroom_PlinthH3_Perspective.jpg'
        }
      ]
    },
    {
      id: 'plinth-h7',
      name: 'Base 7cm',
      description: 'Tall base (7cm height)',
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_NewWhite_PlinthH7_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Nordic_PlinthH7_Perspective.jpg'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Vanilla_PlinthH7_Perspective.png'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Monarch_PlinthH7_Perspective.png'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Anthracite_PlinthH7_Perspective.jpg'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Mushroom_PlinthH7_Perspective.png'
        }
      ]
    }
  ];

  const currentMounting = mountingOptions.find(m => m.id === selectedMounting) || mountingOptions[0];
  const currentVariant = currentMounting.variants.find(v => v.id === selectedVariant) || currentMounting.variants[0];
  
  // Dynamic pricing based on mounting option
  const getPrice = (mountingId: string) => {
    switch (mountingId) {
      case 'suspended':
        return 18017; // Wall mounted
      case 'plinth-h3':
        return 18640; // 3cm plinth
      case 'plinth-h7':
        return 18640; // 7cm plinth
      default:
        return 18017;
    }
  };
  
  const price = getPrice(selectedMounting);

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
            <span className="text-stone-800">Loom Bookshelf</span>
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
                alt={`Loom Bookshelf ${currentMounting.name} in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Loom in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Loom-bookshelf/lifestyle/Montana_Home19_20_NGStudio_Kitchen_LOOM_Amber_JWTable_H-1-scaled.jpg.avif"
                    alt="Loom bookshelf in kitchen setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Kitchen Integration</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Loom-bookshelf/lifestyle/Montana_Home21_22_LOOM_Camomile_H-scaled.jpg.avif"
                    alt="Loom bookshelf in modern interior"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Modern Living</p>
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
                Loom Bookshelf
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Playful and modern bookshelf! LOOM is a slim bookcase that gives you a variety of options 
                for storing books and other items in your living room or home office. LOOM has many different 
                storage compartments in different sizes, providing a perfect solution for displaying items 
                in a sophisticated way. LOOM's slim design makes it possible to fit both smaller and larger spaces.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by Petter J. Lassen
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr {price.toLocaleString()}
            </div>

            {/* Mounting Options */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                MOUNTING: {currentMounting.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-1 gap-2 mb-4">
                {mountingOptions.map((mounting) => (
                  <button
                    key={mounting.id}
                    onClick={() => {
                      setSelectedMounting(mounting.id);
                      setSelectedVariant(mounting.variants[0].id);
                    }}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      selectedMounting === mounting.id
                        ? 'border-stone-800 bg-stone-50'
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <div className="font-medium text-stone-800">{mounting.name}</div>
                    <div className="text-sm text-stone-600">{mounting.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                COLOR: {currentVariant.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {currentMounting.variants.map((variant) => (
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
                Available in {currentMounting.variants.length} Montana Selection colors
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
                      <li><strong>Width:</strong> 46.8 cm</li>
                      <li><strong>Height:</strong> 208.8 cm</li>
                      <li><strong>Depth:</strong> 30 cm</li>
                      <li><strong>Weight:</strong> 15 kg</li>
                      <li><strong>Material:</strong> Lacquered MDF</li>
                      <li><strong>Finish:</strong> Montana Selection colors</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Manufacturer:</strong> Montana</li>
                      <li><strong>Installation:</strong> Professional installation recommended</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Mounting Options</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Wall-mounted:</strong> Floating wall-mounted design</li>
                      <li>• <strong>Base 3cm:</strong> Low base, 3cm height</li>
                      <li>• <strong>Base 7cm:</strong> Tall base, 7cm height</li>
                      <li>• Multiple configurations possible</li>
                      <li>• Modular system allows customization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Distinctive geometric pattern design</li>
                      <li>• Ample storage for books and objects</li>
                      <li>• Available in Montana Selection colors</li>
                      <li>• Multiple mounting configurations</li>
                      <li>• Modular system compatibility</li>
                      <li>• High-quality lacquered finish</li>
                      <li>• Suitable for residential and commercial use</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean with a soft, damp cloth and mild detergent. Avoid abrasive cleaners 
                      that may damage the lacquered finish. Regular dusting will maintain appearance.
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
            Complete Your Montana Storage System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_Suspended_Perspective.png"
                alt="Show Module"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Show Module 1112</h3>
                <p className="text-sm text-stone-600">Classic open bookcase</p>
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
                <p className="text-sm text-stone-600">Mixed open and closed storage</p>
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
