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

interface BaseOption {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function CarryChestPage() {
  const [selectedVariant, setSelectedVariant] = useState('monarch');
  const [selectedBase, setSelectedBase] = useState('legs-brass');

  const variants: ColorVariant[] = [
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_NewWhite_Legs_Brass_Perspective.png'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Nordic_Legs_Brass_Perspective.png'
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Vanilla_Legs_Brass_Perspective.png'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Brass_Perspective.png'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Anthracite_Legs_Brass_Perspective.png'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Mushroom_Legs_Brass_Perspective.png'
    }
  ];

  const baseOptions: BaseOption[] = [
    {
      id: 'wall-mounted',
      name: 'Wall Mounted',
      price: 18130,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Wall_Perspective.png'
    },
    {
      id: 'plinth-3cm',
      name: 'Base 3cm',
      price: 19108,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Plinth_H3_Perspective.png'
    },
    {
      id: 'plinth-7cm',
      name: 'Base 7cm',
      price: 19108,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Plinth_H7_Perspective.png'
    },
    {
      id: 'legs-white',
      name: 'Legs White',
      price: 20376,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Snow_Perspective.png'
    },
    {
      id: 'legs-matt-chrome',
      name: 'Legs Matt Chrome',
      price: 20376,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_MattChrome_Perspective.png'
    },
    {
      id: 'legs-brass',
      name: 'Legs Brass',
      price: 20376,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Brass_Perspective.png'
    },
    {
      id: 'legs-black',
      name: 'Legs Black',
      price: 20376,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Black_Perspective.png'
    },
    {
      id: 'legs-flint',
      name: 'Legs Flint',
      price: 20376,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Flint_Perspective.png'
    },
    {
      id: 'legs-mushroom',
      name: 'Legs Mushroom',
      price: 20376,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Mushroom_Perspective.png'
    },
    {
      id: 'legs-parsley',
      name: 'Legs Parsley',
      price: 20376,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Parsley_Perspective.png'
    },
    {
      id: 'legs-rosehip',
      name: 'Legs Rosehip',
      price: 20376,
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Rosehip_Perspective.png'
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[3];
  const currentBase = baseOptions.find(b => b.id === selectedBase) || baseOptions[5];

  // Generate current image based on selected variant and base
  const getCurrentImage = () => {
    const colorName = currentVariant.name.replace(' ', '');
    let baseName = '';
    
    if (currentBase.id.includes('wall')) {
      baseName = 'Wall';
    } else if (currentBase.id.includes('plinth-3')) {
      baseName = 'Plinth_H3';
    } else if (currentBase.id.includes('plinth-7')) {
      baseName = 'Plinth_H7';
    } else if (currentBase.id === 'legs-white') {
      baseName = 'Legs_Snow';
    } else if (currentBase.id === 'legs-matt-chrome') {
      baseName = 'Legs_MattChrome';
    } else if (currentBase.id === 'legs-brass') {
      baseName = 'Legs_Brass';
    } else if (currentBase.id === 'legs-black') {
      baseName = 'Legs_Black';
    } else if (currentBase.id === 'legs-flint') {
      baseName = 'Legs_Flint';
    } else if (currentBase.id === 'legs-mushroom') {
      baseName = 'Legs_Mushroom';
    } else if (currentBase.id === 'legs-parsley') {
      baseName = 'Legs_Parsley';
    } else if (currentBase.id === 'legs-rosehip') {
      baseName = 'Legs_Rosehip';
    } else {
      baseName = 'Legs_Brass'; // fallback
    }
    
    return `/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_${colorName}_${baseName}_Perspective.png`;
  };

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
            <span className="text-stone-800">Carry Chest of Drawers</span>
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
                src={getCurrentImage()}
                alt={`Carry Chest of Drawers in ${currentVariant.name} with ${currentBase.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Carry in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Selection/Montana_Home19_20_NGStudio_Hall_CARRY_Oregano_Nordic_H-scaled-scaled.jpg"
                    alt="Carry chest of drawers in modern hall setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Hall Integration</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Selection/Montana_Home20_21_CARRY_Oat_Rosehip_FIGURE_LOOK_Azure_H-scaled.jpg"
                    alt="Carry chest of drawers with decorative accessories"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Storage Solution</p>
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
                Carry Chest of Drawers
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Montana's classic storage favorite! CARRY is a modern and timeless three-drawer chest of drawers 
                that provides the ideal storage solution for the living room, home office or bedroom. CARRY is a 
                module consisting of three drawers in a row.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by Petter J. Lassen
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr {currentBase.price.toLocaleString()}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                COLOR: {currentVariant.name.toUpperCase()}
              </h3>
              <div className="flex space-x-3">
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
            </div>

            {/* Base Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                BASE: {currentBase.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-2 gap-3">
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
                    <div className="text-xs text-stone-600">kr {base.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 rounded-lg font-medium hover:bg-stone-700 transition-colors text-lg">
              ADD TO CART - KR {currentBase.price.toLocaleString()}
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
                    Selection products are estimated to be delivered in about 5 weeks.
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
                      <li><strong>Dimensions:</strong> W 69.6 x H 82 x D 38 cm</li>
                      <li><strong>Weight:</strong> 20 kg</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Manufacturer:</strong> Montana</li>
                      <li><strong>Configuration:</strong> Three drawers in a row</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Modern and timeless design</li>
                      <li>• Three spacious drawers for optimal storage</li>
                      <li>• Multiple base options: wall-mounted, legs, and pedestal</li>
                      <li>• Available in Selection colors (5-week delivery)</li>
                      <li>• Custom colors available upon request</li>
                      <li>• Perfect for living room, home office, or bedroom</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Colors</h4>
                    <p className="text-sm">
                      Selection colors: New White, Nordic, Vanilla, Monarch, Anthracite, Mushroom.
                      <br />
                      For other Montana colors or color combinations, please contact us for a quote.
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
            Complete Your Storage Solution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Monterey-Desk/Montana_Monterey_H72_Parsley_Perspective.png"
                alt="Monterey Desk"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Monterey Desk</h3>
                <p className="text-sm text-stone-600">Sophisticated workspace solution</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/MB126-LEGS/montana_mb126_position_legs_rosehip.webp"
                alt="MB126 Legs"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">MB126 Legs</h3>
                <p className="text-sm text-stone-600">Classic Montana legs for shelving</p>
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
