"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductVariant {
  name: string;
  image: string;
  color: string;
  price: number;
}

export default function Panthella160RechargeablePage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      name: "Opal White",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal white.webp",
      color: "Opal White",
      price: 2295
    },
    {
      name: "Opal Beige",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal beige.webp",
      color: "Opal Beige",
      price: 2295
    },
    {
      name: "Opal Pale Blue",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal pale blue.webp",
      color: "Opal Pale Blue",
      price: 2295
    },
    {
      name: "Opal Pale Rose",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal pale rose.webp",
      color: "Opal Pale Rose",
      price: 2295
    },
    {
      name: "Opaque Black",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque black.webp",
      color: "Opaque Black",
      price: 2295
    },
    {
      name: "Opaque Burgundy",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque burgundy.webp",
      color: "Opaque Burgundy",
      price: 2295
    },
    {
      name: "Opaque Coral",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque coral.webp",
      color: "Opaque Coral",
      price: 2295
    },
    {
      name: "Opaque Indigo Blue",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque indigo blue.webp",
      color: "Opaque Indigo Blue",
      price: 2295
    },
    {
      name: "Opaque Moss Green",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque moss green.webp",
      color: "Opaque Moss Green",
      price: 2295
    },
    {
      name: "Opaque Orange",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque orange.webp",
      color: "Opaque Orange",
      price: 2295
    },
    {
      name: "Opaque Yellow",
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque yellow.webp",
      color: "Opaque Yellow",
      price: 2295
    }
  ];

  const currentVariant = variants[selectedVariant];
  const currentPrice = currentVariant.price;

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
            <Link href="/louis-poulsen" className="text-stone-600 hover:text-stone-800">
              Louis Poulsen
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">Panthella 160 Rechargeable LED Table Lamp</span>
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
                src={currentVariant.image}
                alt={`Louis Poulsen Panthella 160 Rechargeable - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {variants.slice(0, 8).map((variant, index) => (
                <button
                  key={variant.name}
                  onClick={() => setSelectedVariant(index)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedVariant === index
                      ? 'border-gray-900'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={variant.image}
                    alt={`${variant.name} variant`}
                    fill
                    className="object-contain object-center p-2"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                  <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                    {variant.name.replace('Opaque ', '').replace('Opal ', '')}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Additional variants row */}
            {variants.length > 8 && (
              <div className="grid grid-cols-3 gap-3">
                {variants.slice(8).map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariant(index + 8)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVariant === index + 8
                        ? 'border-gray-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={`${variant.name} variant`}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 768px) 33vw, 16.5vw"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.name.replace('Opaque ', '').replace('Opal ', '')}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Louis Poulsen
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                Panthella 160 Rechargeable LED Table Lamp
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                The Panthella 160 Rechargeable is a portable version of Verner Panton's iconic mushroom-shaped lamp. With its built-in LED and rechargeable battery, it brings the classic Panthella design anywhere you need beautiful, wireless lighting.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by Verner Panton
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr {currentPrice.toLocaleString()}
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Color: {currentVariant.name}
              </h3>
              <div className="grid grid-cols-6 gap-3">
                {variants.map((variant, index) => {
                  const getVariantColor = (colorName: string) => {
                    const colorMap: { [key: string]: string } = {
                      'Opal White': '#FFFFFF',
                      'Opal Beige': '#F5F5DC',
                      'Opal Pale Blue': '#B0E0E6',
                      'Opal Pale Rose': '#FFB6C1',
                      'Opaque Black': '#000000',
                      'Opaque Burgundy': '#800020',
                      'Opaque Coral': '#FF7F50',
                      'Opaque Indigo Blue': '#4B0082',
                      'Opaque Moss Green': '#8A9A5B',
                      'Opaque Orange': '#FF8C00',
                      'Opaque Yellow': '#FFD700'
                    };
                    return colorMap[colorName] || '#D1D5DB';
                  };

                  return (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(index)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedVariant === index
                          ? 'border-gray-900 scale-110'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: getVariantColor(variant.color) }}
                      title={variant.name}
                    >
                      {selectedVariant === index && (
                        <div className="absolute inset-0 rounded-full border-2 border-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {currentPrice.toLocaleString()}
            </button>

            {/* Product Features */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Rechargeable & Portable</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Built-in LED with up to 10 hours of battery life. Perfect for outdoor dining or anywhere without power outlets.
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
                        The Panthella 160 Rechargeable brings Verner Panton's iconic 1971 design into the modern era with wireless LED technology. The distinctive mushroom shape provides both direct and ambient lighting through its opal acrylic shade.
                      </p>
                      <p className="leading-relaxed">
                        Perfect for outdoor dining, bedside use, or anywhere you need beautiful lighting without being tethered to a power outlet. The touch-sensitive dimmer allows you to adjust brightness to create the perfect atmosphere.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">16 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Diameter:</span>
                        <span className="font-medium">16 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">0.5 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">Opal acrylic shade</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Light source:</span>
                        <span className="font-medium">Integrated LED 2.5W</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Battery life:</span>
                        <span className="font-medium">Up to 10 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Charging time:</span>
                        <span className="font-medium">4 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IP rating:</span>
                        <span className="font-medium">IP44 (outdoor safe)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designer:</span>
                        <span className="font-medium">Verner Panton</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span className="font-medium">1971 (rechargeable version 2018)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Rechargeable LED with 10-hour battery life</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Touch-sensitive dimmer control</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>IP44 rated for outdoor use</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Iconic Verner Panton design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Multiple color options available</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>USB-C charging cable included</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Perfect for portable lighting needs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-4 text-center">
            Related Products
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Explore other iconic Louis Poulsen lighting designs
          </p>
          <div className="text-center">
            <Link 
              href="/louis-poulsen"
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All Louis Poulsen Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
