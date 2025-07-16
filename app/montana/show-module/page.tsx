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
  price: number;
  variants: ColorVariant[];
}

export default function ShowModulePage() {
  const [selectedColor, setSelectedColor] = useState('new-white');
  const [selectedMounting, setSelectedMounting] = useState('suspended');

  const colors = [
    { id: 'new-white', name: 'New White', colorCode: '#FAFAFA' },
    { id: 'nordic', name: 'Nordic', colorCode: '#E8E8E8' },
    { id: 'vanilla', name: 'Vanilla', colorCode: '#F5F5DC' },
    { id: 'monarch', name: 'Monarch', colorCode: '#4A5D8A' },
    { id: 'anthracite', name: 'Anthracite', colorCode: '#3A3A3A' },
    { id: 'mushroom', name: 'Mushroom', colorCode: '#B8A082' }
  ];

  const mountingOptions: MountingOption[] = [
    {
      id: 'suspended',
      name: 'Wall Mounted',
      description: 'Clean floating appearance',
      price: 6804,
      variants: [
        {
          id: 'new-white-suspended',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_NewWhite_Legs_Snow_Perspective-1.png'
        },
        {
          id: 'nordic-suspended',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Nordic_Suspended_Perspective.png'
        },
        {
          id: 'vanilla-suspended',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Vanilla_Suspended_Perspective.png'
        },
        {
          id: 'monarch-suspended',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Monarch_Suspended_Perspective.png'
        },
        {
          id: 'anthracite-suspended',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Anthracite_Suspended_Perspective.png'
        },
        {
          id: 'mushroom-suspended',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_Suspended_Perspective.png'
        }
      ]
    },
    {
      id: 'legs-black',
      name: 'Black Legs',
      description: 'Modern black metal legs',
      price: 8229,
      variants: [
        {
          id: 'new-white-legs-black',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_NewWhite_Legs_Black_Perspective.png'
        },
        {
          id: 'vanilla-legs-black',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Vanilla_Legs_Black_Perspective.png'
        },
        {
          id: 'monarch-legs-black',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Monarch_Legs_Black_Perspective.png'
        },
        {
          id: 'anthracite-legs-black',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Anthracite_Legs_Black_Perspective.png'
        },
        {
          id: 'mushroom-legs-black',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_Legs_Black_Perspective.png'
        }
      ]
    },
    {
      id: 'legs-brass',
      name: 'Brass Legs',
      description: 'Elegant brass metal legs',
      price: 8229,
      variants: [
        {
          id: 'new-white-legs-brass',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_NewWhite_Legs_Brass_Perspective.png'
        },
        {
          id: 'vanilla-legs-brass',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Vanilla_Legs_Brass_Perspective.png'
        },
        {
          id: 'monarch-legs-brass',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Monarch_Legs_Brass_Perspective.png'
        },
        {
          id: 'anthracite-legs-brass',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Anthracite_Legs_Brass_Perspective.png'
        }
      ]
    },
    {
      id: 'legs-snow',
      name: 'Snow Legs',
      description: 'Clean white metal legs',
      price: 8229,
      variants: [
        {
          id: 'new-white-legs-snow',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_NewWhite_Legs_Snow_Perspective.png'
        },
        {
          id: 'vanilla-legs-snow',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Vanilla_Legs_Snow_Perspective.png'
        },
        {
          id: 'monarch-legs-snow',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Monarch_Legs_Snow_Perspective.png'
        },
        {
          id: 'anthracite-legs-snow',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Anthracite_Legs_Snow_Perspective.png'
        },
        {
          id: 'mushroom-legs-snow',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_Legs_Snow_Perspective.png'
        },
        {
          id: 'nordic-legs-snow',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Nordic_Legs_Snow_Perspective.png'
        }
      ]
    },
    {
      id: 'legs-matt-chrome',
      name: 'Matt Chrome Legs',
      description: 'Sophisticated matt chrome metal legs',
      price: 8229,
      variants: [
        {
          id: 'new-white-legs-matt-chrome',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_NewWhite_Legs_MattChrome_Perspective.png'
        },
        {
          id: 'vanilla-legs-matt-chrome',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Vanilla_Legs_MattChrome_Perspective.png'
        },
        {
          id: 'monarch-legs-matt-chrome',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Monarch_Legs_MattChrome_Perspective.png'
        }
      ]
    },
    {
      id: 'plinth-h3',
      name: 'Plinth H3',
      description: 'Low profile base',
      price: 7621,
      variants: [
        {
          id: 'new-white-plinth-h3',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_NewWhite_PlinthH3_Perspective.png'
        },
        {
          id: 'nordic-plinth-h3',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Nordic_PlinthH3_Perspective.png'
        },
        {
          id: 'monarch-plinth-h3',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Monarch_PlinthH3_Perspective.png'
        },
        {
          id: 'anthracite-plinth-h3',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Anthracite_PlinthH3_Perspective.png'
        },
        {
          id: 'mushroom-plinth-h3',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_PlinthH3_Perspective.png'
        }
      ]
    },
    {
      id: 'plinth-h7',
      name: 'Plinth H7',
      description: 'Higher profile base',
      price: 7621,
      variants: [
        {
          id: 'nordic-plinth-h7',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Nordic_PlinthH7_Perspective.png'
        },
        {
          id: 'monarch-plinth-h7',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Monarch_PlinthH7_Perspective.png'
        },
        {
          id: 'anthracite-plinth-h7',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/SHOW-Module(1112)/Montana_Selection_SHOW_Anthracite_PlinthH7_Perspective.png'
        },
        {
          id: 'mushroom-plinth-h7',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_PlinthH7_Perspective.png'
        }
      ]
    }
  ];

  const currentMountingOption = mountingOptions.find(option => option.id === selectedMounting) || mountingOptions[0];
  const currentVariant = currentMountingOption.variants.find(variant => 
    variant.name.toLowerCase().replace(' ', '-') === selectedColor
  ) || currentMountingOption.variants[0];

  const price = currentMountingOption.price;

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
            <span className="text-stone-800">Show Module</span>
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
                alt={`Show Module in ${currentVariant.name} with ${currentMountingOption.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Show Module in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/SHOW-Module(1112)/Montana_Home_22_23_S03_COAT_BUREAU_Rosehip_SHOW_Camomile_RUNNER_Azure_Maree_W-scaled.jpg"
                    alt="Show module in modern interior setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Modern Integration</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/SHOW-Module(1112)/Montana_Home_23_24_SHOW_Ruby_Cumin_COVER_Masala_Iris_01_H.jpg"
                    alt="Show module with colorful styling"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Colorful Display</p>
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
                Show Module 1112
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                1112 (SHOW) is an open bookcase that is perfect as a bookshelf for the living room, a storage box for the hallway or children's room or as kitchen shelves to display kitchen utensils and cookbooks. The open bookcase is a Montana classic and an iconic storage solution that shows your personality in your home with its four open compartments.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Montana's classic storage favorite!
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

            {/* Mounting Options */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                MOUNTING: {currentMountingOption.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {mountingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedMounting(option.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedMounting === option.id
                        ? 'border-stone-800 bg-stone-50'
                        : 'border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <div className="font-medium text-stone-800 text-sm">{option.name}</div>
                    <div className="text-xs text-stone-600 mt-1">{option.description}</div>
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
                {colors.map((color) => {
                  const isAvailable = currentMountingOption.variants.some(variant => 
                    variant.name.toLowerCase().replace(' ', '-') === color.id
                  );
                  
                  return (
                    <button
                      key={color.id}
                      onClick={() => isAvailable && setSelectedColor(color.id)}
                      disabled={!isAvailable}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.id && isAvailable
                          ? 'border-stone-800 scale-110'
                          : isAvailable
                          ? 'border-stone-300 hover:border-stone-500'
                          : 'border-stone-200 opacity-50 cursor-not-allowed'
                      }`}
                      style={{ backgroundColor: isAvailable ? color.colorCode : '#F3F4F6' }}
                      title={isAvailable ? color.name : `${color.name} (Not available for ${currentMountingOption.name})`}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Available colors vary by mounting option
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
                      <li><strong>Dimensions:</strong> W 69.6 x H 69.6 x D 30 cm</li>
                      <li><strong>Material:</strong> Lacquered MDF</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Producer:</strong> Montana</li>
                      <li><strong>Model:</strong> 1112 (SHOW)</li>
                      <li><strong>Compartments:</strong> 4 open compartments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Open bookcase with 4 compartments</li>
                      <li>• Perfect for living room, hallway, or children's room</li>
                      <li>• Ideal for books, kitchen utensils, and cookbooks</li>
                      <li>• Montana classic and iconic storage solution</li>
                      <li>• Shows your personality in your home</li>
                      <li>• Multiple mounting options available</li>
                      <li>• Available in Montana Selection colors</li>
                      <li>• Durable lacquered finish</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Mounting Options</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Wall Mounted:</strong> Clean floating appearance</li>
                      <li><strong>Black Legs:</strong> Modern black metal legs</li>
                      <li><strong>Brass Legs:</strong> Elegant brass metal legs</li>
                      <li><strong>Snow Legs:</strong> Clean white metal legs</li>
                      <li><strong>Matt Chrome Legs:</strong> Sophisticated matt chrome metal legs</li>
                      <li><strong>Plinth H3:</strong> Low profile base (3cm height)</li>
                      <li><strong>Plinth H7:</strong> Higher profile base (7cm height)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                    <p className="text-sm">
                      Clean with a damp cloth and mild detergent. Avoid abrasive cleaners that may damage 
                      the lacquered finish. For metal legs, use appropriate metal cleaner when needed.
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
            Complete Your Montana Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Monarch_Suspended_Perspective.png"
                alt="Bureau Desk"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Bureau Desk</h3>
                <p className="text-sm text-stone-600">Wall-mounted workspace</p>
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
                <h3 className="font-medium text-stone-800">Carry Chest</h3>
                <p className="text-sm text-stone-600">Three-drawer storage</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana-DASH-Nightstand/Montana_Selection_DASH_Monarch_Suspended_Perspective.jpg"
                alt="Dash Nightstand"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Dash Nightstand</h3>
                <p className="text-sm text-stone-600">Bedside storage solution</p>
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
