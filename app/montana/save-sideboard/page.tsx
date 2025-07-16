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

export default function SaveSideboardPage() {
  const [selectedMounting, setSelectedMounting] = useState('suspended');
  const [selectedVariant, setSelectedVariant] = useState('new-white');

  const mountingOptions: MountingOption[] = [
    {
      id: 'suspended',
      name: 'Wall-mounted',
      description: 'Wall-mounted floating design',
      price: 22370,
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_Suspended_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Nordic_Suspended_Perspective.jpg'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Vanilla_Suspended_Perspective.png'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_Suspended_Perspective.png'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Anthracite_Suspended_Perspective.png'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Mushroom_Suspended_Perspective.jpg'
        }
      ]
    },
    {
      id: 'legs-brass',
      name: 'Legs Brass',
      description: 'Brass legs for elevated design',
      price: 24326,
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_Legs_Brass_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Nordic_Legs_Brass_Perspective.png'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Vanilla_Legs_Brass_Perspective.png'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_Legs_Brass_Perspective.png'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Anthracite_Legs_Brass_Perspective.png'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Mushroom_Legs_Brass_Perspective.png'
        }
      ]
    },
    {
      id: 'legs-black',
      name: 'Legs Black',
      description: 'Black legs for modern contrast',
      price: 24326,
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_Legs_Black_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Nordic_Legs_Black_Perspective.jpg'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Vanilla_Legs_Black_Perspective.png'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_Legs_Black_Perspective.png'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Anthracite_Legs_Black_Perspective.jpg'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Mushroom_Legs_Black_Perspective.png'
        }
      ]
    },
    {
      id: 'legs-matt-chrome',
      name: 'Legs Matt Chrome',
      description: 'Matt chrome legs for sophisticated look',
      price: 24326,
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_Legs_MattChrome_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Nordic_Legs_MattChrome_Perspective.png'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Vanilla_Legs_MattChrome_Perspective.png'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_Legs_MattChrome_Perspective.png'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Anthracite_Legs_MattChrome_Perspective.jpg'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Mushroom_Legs_MattChrome_Perspective.png'
        }
      ]
    },
    {
      id: 'legs-snow',
      name: 'Legs Snow',
      description: 'Snow white legs for clean aesthetic',
      price: 24326,
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_Legs_Snow_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Nordic_Legs_Snow_Perspective.png'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Vanilla_Legs_Snow_Perspective.png'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_Legs_Snow_Perspective.png'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Anthracite_Legs_Snow_Perspective.jpg'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Mushroom_Legs_Snow_Perspective.png'
        }
      ]
    },
    {
      id: 'plinth-h3',
      name: 'Base 3cm',
      description: 'Low base (3cm height)',
      price: 24326,
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_PlinthH3_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Nordic_PlinthH3_Perspective.jpg'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Vanilla_PlinthH3_Perspective.png'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_PlinthH3_Perspective.png'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Anthracite_PlinthH3_Perspective.jpg'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Mushroom_PlinthH3_Perspective.png'
        }
      ]
    },
    {
      id: 'plinth-h7',
      name: 'Base 7cm',
      description: 'Tall base (7cm height)',
      price: 24326,
      variants: [
        {
          id: 'new-white',
          name: 'New White',
          colorCode: '#FAFAFA',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_PlinthH7_Perspective.png'
        },
        {
          id: 'nordic',
          name: 'Nordic',
          colorCode: '#E8E8E8',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Nordic_PlinthH7_Perspective.jpg'
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          colorCode: '#F5F5DC',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Vanilla_PlinthH7_Perspective.jpg'
        },
        {
          id: 'monarch',
          name: 'Monarch',
          colorCode: '#4A5D8A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_PlinthH7_Perspective.jpg'
        },
        {
          id: 'anthracite',
          name: 'Anthracite',
          colorCode: '#3A3A3A',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Anthracite_PlinthH7_Perspective.png'
        },
        {
          id: 'mushroom',
          name: 'Mushroom',
          colorCode: '#B8A082',
          image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Mushroom_PlinthH7_Perspective.jpg'
        }
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
            <span className="text-stone-800">Save Sideboard</span>
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
                alt={`Save Sideboard ${currentMounting.name} in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Save in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Save-sideboard/lifestyle/Montana_Home20_21_SAVE_Hokkaido_W-scaled.jpg.avif"
                    alt="Save sideboard in modern interior setting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Modern Living Room</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Save-sideboard/lifestyle/Montana_Selection_SAVE_Sideboard_Camomile_Mushroom_H-scaled.jpg.avif"
                    alt="Save sideboard with decorative styling"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Styled Display</p>
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
                Save Sideboard
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Montana's classic display cabinet! SAVE is a sideboard with a top – perfect for storage 
                in the living room or dining room. Express your personality in the sideboard by choosing 
                a fresh color. SAVE consists of cabinets with doors that contain internal shelves, as well 
                as two open shelves that make it possible to either store or display your treasures. The 
                low sideboard has legs attached, but plinth or suspension rails are also available and 
                will redefine the function of the sideboard.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by Petter J. Lassen
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr {currentMounting.price.toLocaleString()}
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
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-stone-800">{mounting.name}</div>
                        <div className="text-sm text-stone-600">{mounting.description}</div>
                      </div>
                      <div className="text-sm font-medium text-stone-800">
                        kr {mounting.price.toLocaleString()}
                      </div>
                    </div>
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
                    This is a made to order item. Expected delivery time is approx. 8 weeks.
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
                      <li><strong>Width:</strong> 139.2 cm</li>
                      <li><strong>Height:</strong> 46.8 cm</li>
                      <li><strong>Depth:</strong> 38 cm</li>
                      <li><strong>Weight:</strong> 10 kg</li>
                      <li><strong>Dimensions:</strong> 140 × 40 × 50 cm</li>
                      <li><strong>Material:</strong> Lacquered MDF</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Producer:</strong> Montana</li>
                      <li><strong>Installation:</strong> Professional installation recommended</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Mounting Options</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Wall-mounted:</strong> Floating wall-mounted design</li>
                      <li>• <strong>Legs White:</strong> White legs for clean aesthetic</li>
                      <li>• <strong>Legs Matt Chrome:</strong> Matt chrome legs for sophisticated look</li>
                      <li>• <strong>Legs Brass:</strong> Brass legs for elevated design</li>
                      <li>• <strong>Legs Black:</strong> Black legs for modern contrast</li>
                      <li>• <strong>Base 3cm:</strong> Low base, 3cm height</li>
                      <li>• <strong>Base 7cm:</strong> Tall base, 7cm height</li>
                      <li>• Multiple configurations possible</li>
                      <li>• Modular system compatibility</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Montana's classic display cabinet</li>
                      <li>• Sideboard with a top for storage and display</li>
                      <li>• Cabinets with doors containing internal shelves</li>
                      <li>• Two open shelves for storage or display</li>
                      <li>• Perfect for living room or dining room</li>
                      <li>• Express personality with fresh color choices</li>
                      <li>• Available in 40+ Montana colors</li>
                      <li>• Multiple mounting configurations</li>
                      <li>• Low sideboard design with legs attached</li>
                      <li>• Plinth or suspension rails available</li>
                      <li>• High-quality lacquered finish</li>
                      <li>• Ideal for displaying treasured items</li>
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
            Complete Your Storage Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Pair-sideboard/Montana_Selection_PAIR_Mushroom_Suspended_Perspective.png"
                alt="Pair Sideboard"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Pair Sideboard</h3>
                <p className="text-sm text-stone-600">Elegant storage solution</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Line-Bench/Montana_Selection_LINE_Mushroom_Suspended_Perspective.png"
                alt="Line Storage"
                fill
                className="object-contain object-center p-4"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Line Storage</h3>
                <p className="text-sm text-stone-600">Classic storage and display</p>
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
