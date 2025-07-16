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

export default function MakeupDressingTablePage() {
  const [selectedVariant, setSelectedVariant] = useState('new-white');

  // Create image mapping based on available files
  const getImagePath = (colorId: string): string => {
    const imageMap: { [key: string]: string } = {
      'new-white': '/Montana/Makeup-dressing-Table/5714322672993_Montana_Selection_MAKEUP_New_White_Suspended_Perspective.png',
      'white': '/Montana/Makeup-dressing-Table/5714322672931_Montana_Selection_MAKEUP_White_Suspended_Perspective.png',
      'nordic': '/Montana/Makeup-dressing-Table/5714322672979_Montana_Selection_MAKEUP_Nordic_Suspended_Perspective.png',
      'vanilla': '/Montana/Makeup-dressing-Table/5714322673150_Montana_Selection_MAKEUP_Vanilla_Suspended_Perspective.png',
      'monarch': '/Montana/Makeup-dressing-Table/5714322673006_Montana_Selection_MAKEUP_Monarch_Suspended_Perspective.png',
      'anthracite': '/Montana/Makeup-dressing-Table/5714322672955_Montana_Selection_MAKEUP_Anthracite_Suspended_Perspective.png',
      'mushroom': '/Montana/Makeup-dressing-Table/5714322673020_Montana_Selection_MAKEUP_Mushroom_Suspended_Perspective.png',
      'black': '/Montana/Makeup-dressing-Table/5714322672962_Montana_Selection_MAKEUP_Black_Suspended_Perspective.png',
      'fjord': '/Montana/Makeup-dressing-Table/5714322672948_Montana_Selection_MAKEUP_Fjord_Suspended_Perspective.png',
      'graphic': '/Montana/Makeup-dressing-Table/5714322672986_Montana_Selection_MAKEUP_Graphic_Suspended_Perspective.png',
      'pine': '/Montana/Makeup-dressing-Table/5714322673013_Montana_Selection_MAKEUP_Pine_Suspended_Perspective.png',
      'juniper': '/Montana/Makeup-dressing-Table/5714322673037_Montana_Selection_MAKEUP_Juniper_Suspended_Perspective.png',
      'oregano': '/Montana/Makeup-dressing-Table/5714322673044_Montana_Selection_MAKEUP_Oregano_Suspended_Perspective.png',
      'pomelo': '/Montana/Makeup-dressing-Table/5714322673051_Montana_Selection_MAKEUP_Pomelo_Suspended_Perspective.png',
      'truffle': '/Montana/Makeup-dressing-Table/5714322673068_Montana_Selection_MAKEUP_Truffle_Suspended_Perspective.png',
      'amber': '/Montana/Makeup-dressing-Table/5714322673075_Montana_Selection_MAKEUP_Amber_Suspended_Perspective.png',
      'fennel': '/Montana/Makeup-dressing-Table/5714322673099_Montana_Selection_MAKEUP_Fennel_Suspended_Perspective.png',
      'rosehip': '/Montana/Makeup-dressing-Table/5714322673105_Montana_Selection_MAKEUP_Rosehip_Suspended_Perspective.png',
      'hazelnut': '/Montana/Makeup-dressing-Table/5714322673112_Montana_Selection_MAKEUP_Hazelnut_Suspended_Perspective.png',
      'shadow': '/Montana/Makeup-dressing-Table/5714322673129_Montana_Selection_MAKEUP_Shadow_Suspended_Perspective.png',
      'flint': '/Montana/Makeup-dressing-Table/5714322673136_Montana_Selection_MAKEUP_Flint_Suspended_Perspective.png',
      'rhubarb': '/Montana/Makeup-dressing-Table/5714322673167_Montana_Selection_MAKEUP_Rhubarb_Suspended_Perspective.png',
      'parsley': '/Montana/Makeup-dressing-Table/5714322673174_Montana_Selection_MAKEUP_Parsley_Suspended_Perspective.png',
      'azure': '/Montana/Makeup-dressing-Table/5714322673181_Montana_Selection_MAKEUP_Azure_Suspended_Perspective.png',
      'masala': '/Montana/Makeup-dressing-Table/5714322673198_Montana_Selection_MAKEUP_Masala_Suspended_Perspective.png',
      'oyster': '/Montana/Makeup-dressing-Table/5714322673204_Montana_Selection_MAKEUP_Oyster_Suspended_Perspective.png',
      'cumin': '/Montana/Makeup-dressing-Table/5714322673211_Montana_Selection_MAKEUP_Cumin_Suspended_Perspective.png',
      'oat': '/Montana/Makeup-dressing-Table/5714322673228_Montana_Selection_MAKEUP_Oat_Suspended_Perspective.png',
      'camomile': '/Montana/Makeup-dressing-Table/5714322673235_Montana_Selection_MAKEUP_Camomile_Suspended_Perspective.png',
      'balsamic': '/Montana/Makeup-dressing-Table/5714322673242_Montana_Selection_MAKEUP_Balsamic_Suspended_Perspective.png',
      'mist': '/Montana/Makeup-dressing-Table/5714322673259_Montana_Selection_MAKEUP_Mist_Suspended_Perspective.png',
      'hokkaido': '/Montana/Makeup-dressing-Table/5714322673266_Montana_Selection_MAKEUP_Hokkaido_Suspended_Perspective.png',
      'black-jade': '/Montana/Makeup-dressing-Table/5714322673273_Montana_Selection_MAKEUP_Black_Jade_Suspended_Perspective.png',
      'iris': '/Montana/Makeup-dressing-Table/5714322673280_Montana_Selection_MAKEUP_Iris_Suspended_Perspective.png',
      'beetroot': '/Montana/Makeup-dressing-Table/5714322673297_Montana_Selection_MAKEUP_Beetroot_Suspended_Perspective.png',
      'acacia': '/Montana/Makeup-dressing-Table/Montana_Selection_MAKEUP_Acacia_Perspective.png',
      'ruby': '/Montana/Makeup-dressing-Table/Montana_Selection_MAKEUP_Ruby_Perspective.png',
      'clay': '/Montana/Makeup-dressing-Table/Montana_Selection_MAKEUP_Clay_Perspective.png',
      'coffee': '/Montana/Makeup-dressing-Table/5714322673303_Montana_Selection_MAKEUP_Coffee_Suspended_Perspective.png',
      'coal': '/Montana/Makeup-dressing-Table/5714322673310_Montana_Selection_MAKEUP_Coal_Suspended_Perspective.png',
      'snow': '/Montana/Makeup-dressing-Table/5714322673327_Montana_Selection_MAKEUP_Snow_Suspended_Perspective.png'
    };

    return imageMap[colorId] || imageMap['new-white'];
  };

  const variants: ColorVariant[] = [
    // Selection Colors (most popular)
    {
      id: 'new-white',
      name: 'New White',
      colorCode: '#FAFAFA',
      image: getImagePath('new-white')
    },
    {
      id: 'nordic',
      name: 'Nordic',
      colorCode: '#E8E8E8',
      image: getImagePath('nordic')
    },
    {
      id: 'vanilla',
      name: 'Vanilla',
      colorCode: '#F5F5DC',
      image: getImagePath('vanilla')
    },
    {
      id: 'monarch',
      name: 'Monarch',
      colorCode: '#4A5D8A',
      image: getImagePath('monarch')
    },
    {
      id: 'anthracite',
      name: 'Anthracite',
      colorCode: '#3A3A3A',
      image: getImagePath('anthracite')
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      colorCode: '#B8A082',
      image: getImagePath('mushroom')
    },
    // Additional Colors
    {
      id: 'white',
      name: 'White',
      colorCode: '#FFFFFF',
      image: getImagePath('white')
    },
    {
      id: 'black',
      name: 'Black',
      colorCode: '#000000',
      image: getImagePath('black')
    },
    {
      id: 'fjord',
      name: 'Fjord',
      colorCode: '#4A6B8A',
      image: getImagePath('fjord')
    },
    {
      id: 'graphic',
      name: 'Graphic',
      colorCode: '#2C2C2C',
      image: getImagePath('graphic')
    },
    {
      id: 'pine',
      name: 'Pine',
      colorCode: '#4A5D23',
      image: getImagePath('pine')
    },
    {
      id: 'juniper',
      name: 'Juniper',
      colorCode: '#3A4A2A',
      image: getImagePath('juniper')
    },
    {
      id: 'oregano',
      name: 'Oregano',
      colorCode: '#5D6B3A',
      image: getImagePath('oregano')
    },
    {
      id: 'pomelo',
      name: 'Pomelo',
      colorCode: '#F5E6A3',
      image: getImagePath('pomelo')
    },
    {
      id: 'truffle',
      name: 'Truffle',
      colorCode: '#8B7355',
      image: getImagePath('truffle')
    },
    {
      id: 'amber',
      name: 'Amber',
      colorCode: '#D4A574',
      image: getImagePath('amber')
    },
    {
      id: 'fennel',
      name: 'Fennel',
      colorCode: '#A8B48C',
      image: getImagePath('fennel')
    },
    {
      id: 'rosehip',
      name: 'Rosehip',
      colorCode: '#C4626B',
      image: getImagePath('rosehip')
    },
    {
      id: 'hazelnut',
      name: 'Hazelnut',
      colorCode: '#A67C52',
      image: getImagePath('hazelnut')
    },
    {
      id: 'shadow',
      name: 'Shadow',
      colorCode: '#6B6B6B',
      image: getImagePath('shadow')
    },
    {
      id: 'flint',
      name: 'Flint',
      colorCode: '#A8A8A8',
      image: getImagePath('flint')
    },
    {
      id: 'rhubarb',
      name: 'Rhubarb',
      colorCode: '#B85450',
      image: getImagePath('rhubarb')
    },
    {
      id: 'parsley',
      name: 'Parsley',
      colorCode: '#4A5D23',
      image: getImagePath('parsley')
    },
    {
      id: 'azure',
      name: 'Azure',
      colorCode: '#5B8DB8',
      image: getImagePath('azure')
    },
    {
      id: 'masala',
      name: 'Masala',
      colorCode: '#8B4513',
      image: getImagePath('masala')
    },
    {
      id: 'oyster',
      name: 'Oyster',
      colorCode: '#E8E0D6',
      image: getImagePath('oyster')
    },
    {
      id: 'cumin',
      name: 'Cumin',
      colorCode: '#B8860B',
      image: getImagePath('cumin')
    },
    {
      id: 'oat',
      name: 'Oat',
      colorCode: '#DEB887',
      image: getImagePath('oat')
    },
    {
      id: 'camomile',
      name: 'Camomile',
      colorCode: '#F0E68C',
      image: getImagePath('camomile')
    },
    {
      id: 'balsamic',
      name: 'Balsamic',
      colorCode: '#654321',
      image: getImagePath('balsamic')
    },
    {
      id: 'mist',
      name: 'Mist',
      colorCode: '#D3D3D3',
      image: getImagePath('mist')
    },
    {
      id: 'hokkaido',
      name: 'Hokkaido',
      colorCode: '#FF8C00',
      image: getImagePath('hokkaido')
    },
    {
      id: 'black-jade',
      name: 'Black Jade',
      colorCode: '#2F4F2F',
      image: getImagePath('black-jade')
    },
    {
      id: 'iris',
      name: 'Iris',
      colorCode: '#9370DB',
      image: getImagePath('iris')
    },
    {
      id: 'beetroot',
      name: 'Beetroot',
      colorCode: '#8B0000',
      image: getImagePath('beetroot')
    },
    {
      id: 'acacia',
      name: 'Acacia',
      colorCode: '#DAA520',
      image: getImagePath('acacia')
    },
    {
      id: 'ruby',
      name: 'Ruby',
      colorCode: '#CC0000',
      image: getImagePath('ruby')
    },
    {
      id: 'clay',
      name: 'Clay',
      colorCode: '#B8860B',
      image: getImagePath('clay')
    },
    {
      id: 'coffee',
      name: 'Coffee',
      colorCode: '#6F4E37',
      image: getImagePath('coffee')
    },
    {
      id: 'coal',
      name: 'Coal',
      colorCode: '#2C2C2C',
      image: getImagePath('coal')
    },
    {
      id: 'snow',
      name: 'Snow',
      colorCode: '#FFFAFA',
      image: getImagePath('snow')
    }
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];

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
            <span className="text-stone-800">Makeup Dressing Table</span>
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
                alt={`Makeup Dressing Table in ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Lifestyle Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800">Makeup in Living Spaces</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src="/Montana/Makeup-dressing-Table/lifestyle/Montana_Home_22_23_S04_MAKEUP_Monarch_Detail_H-scaled.jpg.avif"
                    alt="Makeup dressing table in modern bedroom setting"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white bg-opacity-90 rounded p-2">
                    <p className="text-sm text-stone-600">Bedroom Integration</p>
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
                Makeup Dressing Table
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                MAKEUP is a small wall-mounted dressing table with a depth of 30. The table comes with one small drawer and two small drawers. 
                Perfect for creating a dedicated beauty space in your bedroom or dressing area, this compact yet functional piece provides 
                essential storage for your makeup and beauty essentials while maintaining Montana's signature clean aesthetic.
              </p>
              <p className="text-stone-600 mb-4">
                Designed by Petter J. Lassen
              </p>
            </div>

            <div className="text-3xl font-light text-stone-800">
              kr 7,822
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
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
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
                Scroll to see all {variants.length} available colors
              </p>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 rounded-lg font-medium hover:bg-stone-700 transition-colors text-lg">
              ADD TO CART - KR 7,822
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
                      <li><strong>Dimensions:</strong> W 69.6 x H 12.6 x D 30 cm</li>
                      <li><strong>Weight:</strong> 20 kg</li>
                      <li><strong>Designer:</strong> Petter J. Lassen</li>
                      <li><strong>Manufacturer:</strong> Montana</li>
                      <li><strong>Configuration:</strong> One small drawer and two small drawers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Wall-mounted design saves floor space</li>
                      <li>• Compact depth of 30cm ideal for small spaces</li>
                      <li>• Three drawers for organized storage</li>
                      <li>• Perfect for makeup and beauty essentials</li>
                      <li>• Available in 40+ Montana colors</li>
                      <li>• Versatile use in bedroom or dressing area</li>
                      <li>• Clean, minimalist aesthetic</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-2">Available Colors</h4>
                    <p className="text-sm">
                      Selection colors: New White, Nordic, Vanilla, Monarch, Anthracite, Mushroom.
                      <br />
                      Additional colors: White, Black, Fjord, Graphic, Pine, Juniper, Oregano, Pomelo, Truffle, 
                      Amber, Fennel, Rosehip, Hazelnut, Shadow, Flint, Rhubarb, Parsley, Azure, Masala, Oyster, 
                      Cumin, Oat, Camomile, Balsamic, Mist, Hokkaido, Black Jade, Iris, Beetroot, Acacia, Ruby, 
                      Clay, Coffee, Coal, and Snow.
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
            Complete Your Bedroom
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Suspended_Perspective.png"
                alt="Dream Bedside Table"
                fill
                className="object-contain object-center p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Dream Bedside Table</h3>
                <p className="text-sm text-stone-600">Elegant bedside storage</p>
              </div>
            </div>
            <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/Montana/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png"
                alt="Around Mirror"
                fill
                className="object-contain object-center p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded p-3">
                <h3 className="font-medium text-stone-800">Around Mirror</h3>
                <p className="text-sm text-stone-600">Functional mirror with storage</p>
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
