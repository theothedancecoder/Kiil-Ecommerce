"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ColorVariant {
  id: string;
  name: string;
  colorCode: string;
}

interface MountingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  variants: {
    id: string;
    name: string;
    colorCode: string;
    image: string;
  }[];
}

export default function PairSideboardPage() {
  const [selectedMounting, setSelectedMounting] = useState('wall-mounted');
  const [selectedVariant, setSelectedVariant] = useState('new-white');

  const colors: ColorVariant[] = [
    { id: 'new-white', name: 'New White', colorCode: '#FAFAFA' },
    { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8' },
    { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC' },
    { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A' },
    { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A' },
    { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082' }
  ];

  const mountingOptions: MountingOption[] = [
    {
      id: 'wall-mounted',
      name: 'Wall Mounted',
      description: 'Clean wall-mounted solution',
      price: 19489,
      variants: [
        { id: 'new-white', name: 'New White', colorCode: '#FAFAFA', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_Suspended_Perspective.jpg' },
        { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_Suspended_Perspective.jpg' },
        { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Vanilla_Suspended_Perspective.png' },
        { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_Suspended_Perspective.png' },
        { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_Suspended_Perspective.jpg' },
        { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Suspended_Perspective.png' }
      ]
    },
    {
      id: 'legs-black',
      name: 'Black Legs',
      description: 'Elegant black metal legs',
      price: 23981,
      variants: [
        { id: 'new-white', name: 'New White', colorCode: '#FAFAFA', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_Legs_Black_Perspective.jpg' },
        { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_Legs_Black_Perspective.png' },
        { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Vanilla_Legs_Black_Perspective.png' },
        { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_Legs_Black_Perspective.png' },
        { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_Legs_Black_Perspective.png' },
        { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Legs_Black_Perspective.png' }
      ]
    },
    {
      id: 'legs-brass',
      name: 'Brass Legs',
      description: 'Premium brass metal legs',
      price: 23981,
      variants: [
        { id: 'new-white', name: 'New White', colorCode: '#FAFAFA', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_Legs_Brass_Perspective.png' },
        { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_Legs_Brass_Perspective.png' },
        { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Vanilla_Legs_Brass_Perspective.png' },
        { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_Legs_Brass_Perspective.png' },
        { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_Legs_Brass_Perspective.png' },
        { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Legs_Brass_Perspective.png' }
      ]
    },
    {
      id: 'legs-chrome',
      name: 'Chrome Legs',
      description: 'Sleek chrome metal legs',
      price: 23981,
      variants: [
        { id: 'new-white', name: 'New White', colorCode: '#FAFAFA', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_Legs_MattChrome_Perspective.png' },
        { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_Legs_MattChrome_Perspective.png' },
        { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Vanilla_Legs_MattChrome_Perspective.png' },
        { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_Legs_MattChrome_Perspective.png' },
        { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_Legs_MattChrome_Perspective.png' },
        { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Legs_MattChrome_Perspective.png' }
      ]
    },
    {
      id: 'legs-snow',
      name: 'Snow Legs',
      description: 'Clean white metal legs',
      price: 23981,
      variants: [
        { id: 'new-white', name: 'New White', colorCode: '#FAFAFA', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_Legs_Snow_Perspective.jpg' },
        { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_Legs_Snow_Perspective.png' },
        { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Vanilla_Legs_Snow_Perspective.png' },
        { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_Legs_Snow_Perspective.png' },
        { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_Legs_Snow_Perspective.jpg' },
        { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Legs_Snow_Perspective.png' }
      ]
    },
    {
      id: 'castors',
      name: 'Castors',
      description: 'Mobile with wheels',
      price: 21446,
      variants: [
        { id: 'new-white', name: 'New White', colorCode: '#FAFAFA', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_Castors_Perspective.jpg' },
        { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_Castors_Perspective.png' },
        { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Vanilla_Castors_Perspective.png' },
        { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_Castors_Perspective.png' },
        { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_Castors_Perspective.jpg' },
        { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Castors_Perspective.png' }
      ]
    },
    {
      id: 'plinth-h3',
      name: 'Base 3cm',
      description: 'Low profile base (3cm)',
      price: 21446,
      variants: [
        { id: 'new-white', name: 'New White', colorCode: '#FAFAFA', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_PlinthH3_Perspective.png' },
        { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_PlinthH3_Perspective.jpg' },
        { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Vanilla_PlinthH3_Perspective.png' },
        { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_PlinthH3_Perspective.png' },
        { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_PlinthH3_Perspective.jpg' },
        { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_PlinthH3_Perspective.png' }
      ]
    },
    {
      id: 'plinth-h7',
      name: 'Base 7cm',
      description: 'Higher profile base (7cm)',
      price: 21446,
      variants: [
        { id: 'new-white', name: 'New White', colorCode: '#FAFAFA', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_PlinthH7_Perspective.png' },
        { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_PlinthH7_Perspective.jpg' },
        { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Vanilla_PlinthH7_Perspective.png' },
        { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_PlinthH7_Perspective.png' },
        { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_PlinthH7_Perspective.png' },
        { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_PlinthH7_Perspective.png' }
      ]
    }
  ];

  const currentMounting = mountingOptions.find(m => m.id === selectedMounting) || mountingOptions[0];
  const currentVariant = currentMounting.variants.find(v => v.id === selectedVariant) || currentMounting.variants[0];

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
            <span className="text-stone-800">Pair Sideboard</span>
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
                alt={`Pair Sideboard in ${currentVariant.name} with ${currentMounting.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Pair Sideboard in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Pair-sideboard/lifestyle/Montana_Pair_Lounge_Boulevard_Ambient01_s102_2016_H.jpg"
                    alt="Pair sideboard in modern lounge setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Lounge Integration</p>
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
                Pair Sideboard
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Montana's classic storage favorite! PAIR is the ideal storage solution for the living room, entrance or kitchen, 
                whether for display or hiding. PAIR is a sideboard consisting of a cabinet and an open shelf solution. Finally, 
                each module can be used separately if the need for a new storage solution arises.
              </p>
              <p className="text-stone-600 mb-4">
                Designer: Petter J. Lassen
              </p>
              <p className="text-stone-600 mb-4">
                Producer: Montana
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr {currentMounting.price.toLocaleString()}
            </div>

            {/* Mounting Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                MOUNTING: {currentMounting.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {mountingOptions.map((mounting) => (
                  <button
                    key={mounting.id}
                    onClick={() => setSelectedMounting(mounting.id)}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      selectedMounting === mounting.id
                        ? 'border-stone-800 bg-stone-50'
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <div className="text-sm font-medium text-stone-800">{mounting.name}</div>
                    <div className="text-xs text-stone-600">{mounting.description}</div>
                    <div className="text-xs text-stone-600 mt-1">kr {mounting.price.toLocaleString()}</div>
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
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedVariant(color.id)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariant === color.id
                        ? 'border-stone-800 scale-110'
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                    style={{ backgroundColor: color.colorCode }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Available in {colors.length} Montana Selection colors
              </p>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 rounded-lg font-medium hover:bg-stone-700 transition-colors text-lg">
              ADD TO CART - KR {currentMounting.price.toLocaleString()}
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
                      <li><strong>Dimensions:</strong> W 139.2 x H 69.6 x D 38 cm</li>
                      <li><strong>Weight:</strong> 20 kg</li>
                      <li><strong>Material:</strong> Lacquered MDF</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Producer:</strong> Montana</li>
                      <li><strong>Model:</strong> Pair Sideboard</li>
                      <li><strong>Configuration:</strong> Cabinet and open shelf solution</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Montana's classic storage favorite</li>
                      <li>• Ideal for living room, entrance or kitchen</li>
                      <li>• Perfect for display or hiding items</li>
                      <li>• Consists of a cabinet and an open shelf solution</li>
                      <li>• Each module can be used separately if needed</li>
                      <li>• Multiple mounting options available</li>
                      <li>• Available in Montana Selection colors</li>
                      <li>• Durable lacquered finish</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Colors</h4>
                    <p className="text-sm">
                      Selection colors: New White, Nordic, Vanilla, Monarch, Anthracite, Mushroom.
                      Each color is carefully selected to complement modern interiors and coordinate 
                      with other Montana furniture pieces.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean with a damp cloth and mild detergent. Avoid abrasive cleaners that may damage 
                      the lacquered finish. Use coasters and protective pads to prevent scratches.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Line-Bench/Montana_Selection_LINE_Mushroom_Suspended_Perspective.png"
                alt="Line Storage"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Line Storage</h3>
                <p className="text-sm text-stone-600">Classic storage solution</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Brass_Perspective.png"
                alt="Carry Chest of Drawers"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Carry Chest of Drawers</h3>
                <p className="text-sm text-stone-600">Three-drawer storage solution</p>
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
                <p className="text-sm text-stone-600">Open bookcase storage</p>
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
