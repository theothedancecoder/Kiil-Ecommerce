"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductVariant {
  id: string;
  name: string;
  colorCode?: string;
  mountingOptions: {
    legs: string;
    plinthH3: string;
    plinthH7: string;
    wall: string;
  };
}

interface MountingOption {
  id: string;
  name: string;
  description: string;
}

export default function OctaveVIIITVBenchPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedMounting, setSelectedMounting] = useState('legs');
  const [selectedLegColor, setSelectedLegColor] = useState('Black');
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const mountingOptions: MountingOption[] = [
    {
      id: 'legs',
      name: 'Legs',
      description: 'Standing TV bench with legs'
    },
    {
      id: 'plinthH3',
      name: 'Plinth H3',
      description: 'Low plinth base (3cm height)'
    },
    {
      id: 'plinthH7',
      name: 'Plinth H7',
      description: 'Standard plinth base (7cm height)'
    },
    {
      id: 'wall',
      name: 'Wall Mounted',
      description: 'Wall suspension system'
    }
  ];

  const variants: ProductVariant[] = [
    {
      id: 'white',
      name: 'White',
      colorCode: '#FFFFFF',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_White_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_White_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_White_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_White_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_New_White_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_New_White_Plinth_H3_Perspective-1.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_New_White_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_New_White_Wall_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'snow',
      name: 'Snow',
      colorCode: '#F8F8F8',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Snow_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Snow_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Snow_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Snow_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Anthracite_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Anthracite_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Anthracite_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Anthracite_Wall_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'black',
      name: 'Black',
      colorCode: '#000000',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Wall_Wall_Suspension_Perspective-1.png'
      }
    },
    {
      id: 'flint',
      name: 'Flint',
      colorCode: '#A8A8A8',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Flint_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Flint_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Flint_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Flint_Wall_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'acacia',
      name: 'Acacia',
      colorCode: '#B8860B',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Acacia_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Acacia_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Acacia_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Acacia_Wall_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'amber',
      name: 'Amber',
      colorCode: '#FFBF00',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Amber_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Amber_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Amber_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Amber_Wall_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'azure',
      name: 'Azure',
      colorCode: '#007FFF',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Azure_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Azure_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Azure_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Azure_Wall_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'fjord',
      name: 'Fjord',
      colorCode: '#8B9DC3',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Fjord_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Fjord_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Fjord_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Fjord_Wall_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'black-jade',
      name: 'Black Jade',
      colorCode: '#2F4F2F',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Jade_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Jade_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Jade_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Jade_Wall_Wall_Suspension_Perspective.png'
      }
    },
    {
      id: 'hazelnut',
      name: 'Hazelnut',
      colorCode: '#D2B48C',
      mountingOptions: {
        legs: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Hazelnut_Legs_Black_Perspective.png',
        plinthH3: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Hazelnut_Plinth_H3_Perspective.png',
        plinthH7: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Hazelnut_Plinth_H7_Perspective.png',
        wall: '/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Hazelnut_Wall_Wall_Suspension_Perspective.png'
      }
    }
  ];

  const currentVariant = variants[selectedVariant];
  const currentImage = currentVariant.mountingOptions[selectedMounting as keyof typeof currentVariant.mountingOptions];
  
  // Dynamic pricing based on mounting option
  const getPrice = (mountingType: string) => {
    if (mountingType === 'legs') return 33319;
    if (mountingType === 'plinthH3') return 32048;
    if (mountingType === 'plinthH7') return 32048;
    if (mountingType === 'wall') return 29993;
    return 8499; // fallback
  };
  
  const currentPrice = getPrice(selectedMounting);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-stone-600 hover:text-stone-800">
              Home
            </Link>
            <span className="text-stone-400">/</span>
            <Link href="/montana" className="text-stone-600 hover:text-stone-800">
              Montana
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">Octave VIII TV Bench</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={currentImage}
                alt={`Montana Octave VIII TV Bench - ${currentVariant.name} - ${mountingOptions.find(m => m.id === selectedMounting)?.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Mounting Option Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {mountingOptions.map((mounting) => (
                <button
                  key={mounting.id}
                  onClick={() => setSelectedMounting(mounting.id)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedMounting === mounting.id
                      ? 'border-gray-900'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={currentVariant.mountingOptions[mounting.id as keyof typeof currentVariant.mountingOptions]}
                    alt={`${mounting.name} option`}
                    fill
                    className="object-contain object-center p-2"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                  <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                    {mounting.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Montana Selection
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                Octave VIII TV Bench
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                OCTAVE VIII is a versatile TV bench that combines functionality with elegant design. Available in multiple mounting options including legs, plinth bases, or wall suspension, it adapts to any living space while providing ample storage for media equipment.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Peter J. Lassen
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr {currentPrice.toLocaleString()}
            </div>

            {/* Mounting Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Mounting: {mountingOptions.find(m => m.id === selectedMounting)?.name}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {mountingOptions.map((mounting) => (
                  <button
                    key={mounting.id}
                    onClick={() => setSelectedMounting(mounting.id)}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      selectedMounting === mounting.id
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="font-medium text-sm">{mounting.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{mounting.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Color: {currentVariant.name}
              </h3>
              <div className="grid grid-cols-6 gap-3">
                {variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariant === index
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.name}
                  >
                    {selectedVariant === index && (
                      <div className="absolute inset-0 rounded-full border-2 border-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {currentPrice.toLocaleString()}
            </button>

            {/* Made to Order Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Made to Order</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    This item is made to order. Expected delivery time is approximately 8-10 weeks.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Product Details
                </h3>
                <button
                  onClick={() => setIsProductDetailsExpanded(!isProductDetailsExpanded)}
                  className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <svg
                    className={`w-3 h-3 transition-transform ${isProductDetailsExpanded ? 'rotate-45' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              {isProductDetailsExpanded && (
                <div className="space-y-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Description</h4>
                    <div className="space-y-3">
                      <p className="leading-relaxed">
                        OCTAVE VIII is a versatile TV bench that combines functionality with elegant design. The clean lines and minimalist aesthetic make it perfect for modern living spaces, while the multiple mounting options ensure it fits seamlessly into any room layout.
                      </p>
                      <p className="leading-relaxed">
                        Choose from legs for a traditional standing unit, plinth bases for a floating appearance, or wall mounting for maximum floor space. The spacious interior provides ample storage for media equipment, gaming consoles, and accessories.
                      </p>
                      <p className="leading-relaxed">
                        Available in Montana's full color range, allowing perfect coordination with other Montana furniture pieces in your home.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Width:</span>
                        <span className="font-medium">160 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">42 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Depth:</span>
                        <span className="font-medium">38 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">35 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">Lacquered MDF</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cable Management:</span>
                        <span className="font-medium">Integrated cable outlets</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Load Capacity:</span>
                        <span className="font-medium">50 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designer:</span>
                        <span className="font-medium">Peter J. Lassen</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Multiple mounting options (legs, plinth, wall)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Spacious storage compartment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Integrated cable management</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>40+ Montana color options</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Suitable for TVs up to 75 inches</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Minimalist Scandinavian design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Coordinates with Montana furniture system</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compatible Accessories */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-4 text-center">
            Compatible Accessories
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Enhance your Octave VIII TV bench with these compatible Montana accessories
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Link href="/montana/mb126-legs" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Montana/MB126-LEGS/montana_mb126_position_legs_black.webp"
                    alt="MB126 Legs"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Replacement Accessory
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">MB126 Legs</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Set of 4 classic Montana legs to replace leg mounts
                  </p>
                  <p className="text-gray-900 font-medium">kr 2,345</p>
                </div>
              </div>
            </Link>

            <Link href="/montana/around-mirror" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png"
                    alt="Around Mirror"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Mirrors
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">Around Mirror</h3>
                  <p className="text-gray-900 font-medium">kr 3,541</p>
                </div>
              </div>
            </Link>

            <Link href="/montana/like-mirror" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Montana/MONTANA LIKE MIRROR/Montana_Selection_LIKE_White_Perspective.png"
                    alt="Like Mirror"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Mirrors
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">Like Mirror</h3>
                  <p className="text-gray-900 font-medium">kr 3,541</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link 
              href="/montana"
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All Montana Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
