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
  image: string;
}

export default function OctaveVTVBenchPage() {
  const [selectedVariant, setSelectedVariant] = useState('new-white');
  const [selectedMounting, setSelectedMounting] = useState('suspended');

  const variants: ColorVariant[] = [
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_NewWhite_Suspended_Perspective.png'
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Nordic_Suspended_Perspective.png'
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Vanilla_Suspended_Perspective.png'
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Monarch_Suspended_Perspective.png'
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Anthracite_Suspended_Perspective.png'
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: '/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_Mushroom_Suspended_Perspective.png'
    }
  ];

  const mountingOptions: MountingOption[] = [
    {
      id: 'suspended',
      name: 'Wall Mounted',
      description: 'Clean floating appearance',
      image: 'Suspended_Perspective.png'
    },
    {
      id: 'legs-brass',
      name: 'Brass Legs',
      description: 'Elegant brass leg support',
      image: 'Legs_Brass_Perspective.png'
    },
    {
      id: 'legs-black',
      name: 'Black Legs',
      description: 'Modern black leg support',
      image: 'Legs_Black_Perspective.png'
    },
    {
      id: 'legs-snow',
      name: 'Snow Legs',
      description: 'Clean white leg support',
      image: 'Legs_Snow_Perspective.png'
    },
    {
      id: 'plinth-h3',
      name: 'Plinth H3',
      description: 'Low profile base',
      image: 'PlinthH3_Perspective.png'
    },
    {
      id: 'castors',
      name: 'Castors',
      description: 'Mobile with wheels',
      image: 'Castors_Perspective.png'
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];
  const currentMounting = mountingOptions.find(m => m.id === selectedMounting) || mountingOptions[0];
  
  // Generate current image path based on selections
  const getCurrentImage = () => {
    const colorName = currentVariant.name.replace(' ', '');
    const mountingPath = currentMounting.image;
    
    // Handle specific file extensions for different combinations
    const getFileExtension = (color: string, mounting: string) => {
      // Special cases with .jpg extensions
      if ((color === 'Anthracite' && mounting === 'Legs_Black_Perspective.png') ||
          (color === 'Anthracite' && mounting === 'Legs_Snow_Perspective.png') ||
          (color === 'Mushroom' && mounting === 'Legs_Black_Perspective.png') ||
          (color === 'Monarch' && mounting === 'PlinthH3_Perspective.png') ||
          (color === 'Nordic' && mounting === 'PlinthH7_Perspective.png')) {
        return mounting.replace('.png', '.jpg');
      }
      return mounting;
    };
    
    const finalMountingPath = getFileExtension(colorName, mountingPath);
    return `/Montana/Octave-v-tv-bench/Montana_Selection_OCTAVE_II_${colorName}_${finalMountingPath}`;
  };

  const price = 20448;

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
            <span className="text-stone-800">Octave V TV Bench</span>
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
                alt={`Octave V TV Bench in ${currentVariant.name} with ${currentMounting.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Octave V in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Octave-v-tv-bench/lifestyle/Montana_TVampSound_OCTAVE_V_Ruby_W.jpg"
                    alt="Octave V TV bench in modern living room setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Modern Entertainment Center</p>
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
                Octave V TV Bench
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Practical TV bench from Montana. Space for electronics hidden behind a perforated metal door and 1 drawer on each side. Cable holes in the back wall. Perfect for hiding TV boxes and wires as well as storing small items.
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

            {/* Mounting Options */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-4 uppercase tracking-wider">
                MOUNTING: {currentMounting.name.toUpperCase()}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {mountingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedMounting(option.id)}
                    className={`p-3 text-left border rounded-lg transition-all ${
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

            {/* Mounting Options Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Mounting Options</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Comes with wall mount or on legs. Shown here with wall mounting, contact us for a price quote with legs.
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
                      <li><strong>Dimensions:</strong> H 24 x L 138 x D 30 cm</li>
                      <li><strong>Weight:</strong> 12 kg</li>
                      <li><strong>Shipping Dimensions:</strong> 140 × 35 × 30 cm</li>
                      <li><strong>Material:</strong> Lacquered MDF</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Manufacturer:</strong> Montana</li>
                      <li><strong>Model:</strong> Octave V TV Bench</li>
                      <li><strong>Storage:</strong> Perforated metal door with 1 drawer on each side</li>
                      <li><strong>Cable Management:</strong> Cable holes in the back wall</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Practical TV bench from Montana</li>
                      <li>• Space for electronics hidden behind perforated metal door</li>
                      <li>• 1 drawer on each side for additional storage</li>
                      <li>• Cable holes in the back wall for wire management</li>
                      <li>• Perfect for hiding TV boxes and wires</li>
                      <li>• Ideal for storing small items</li>
                      <li>• Available in multiple Montana Selection colors</li>
                      <li>• Comes with wall mount or on legs</li>
                      <li>• Durable lacquered finish</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Mounting Options</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Wall Mounted:</strong> Clean floating appearance, saves floor space</li>
                      <li>• <strong>Brass Legs:</strong> Elegant brass leg support with premium finish</li>
                      <li>• <strong>Black Legs:</strong> Modern black leg support for contemporary look</li>
                      <li>• <strong>Snow Legs:</strong> Clean white leg support for minimalist aesthetic</li>
                      <li>• <strong>Plinth H3:</strong> Low profile base for stable floor placement</li>
                      <li>• <strong>Castors:</strong> Mobile solution with high-quality wheels</li>
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
                      Clean with a damp cloth and mild detergent. Avoid abrasive cleaners that may 
                      damage the lacquered finish. For cable management, ensure proper ventilation 
                      around electronic equipment.
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
            Complete Your Entertainment Setup
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/OCTAVE VIII TV bench/Montana_Selection_OCTAVE_VIII_Black_Plinth_H3_Perspective.png"
                alt="Octave VIII TV Bench"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Octave VIII TV Bench</h3>
                <p className="text-sm text-stone-600">Larger entertainment solution</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_Suspended_Perspective.png"
                alt="Show Module Storage"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Show Module 1112</h3>
                <p className="text-sm text-stone-600">Additional storage solution</p>
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
