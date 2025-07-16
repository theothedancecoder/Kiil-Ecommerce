"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductVariant {
  id: string;
  name: string;
  image: string;
  color: string;
  price: number;
}

export default function YuhFloorLampPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      id: 'black',
      name: 'Black',
      image: '/Louis-Poulsen/Yuh-floor-lamp/Yuh Floor Lamp.webp',
      color: '#000000',
      price: 12995,
    },
  ];

  const currentVariant = variants[selectedVariant];

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
            <span className="text-stone-800 font-medium">Yuh Floor Lamp</span>
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
                alt={`Louis Poulsen Yuh Floor Lamp - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Louis Poulsen
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                Yuh Floor Lamp
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                The Yuh Floor Lamp combines modern aesthetics with functional design. Its adjustable shade allows for precise light direction, making it perfect for reading corners and task lighting while maintaining an elegant presence in any room.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by GamFratesi
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr {currentVariant.price.toLocaleString()}
            </div>

            {/* Modern Design Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Modern Adjustable Design</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Features an adjustable shade for precise light direction and optimal task lighting.
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {currentVariant.price.toLocaleString()}
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
                    This item is made to order. Expected delivery time is approximately 6-8 weeks.
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
                        The Yuh Floor Lamp represents a modern interpretation of functional lighting design. Created by GamFratesi, it features a sleek silhouette with an adjustable shade that can be positioned for optimal light direction.
                      </p>
                      <p className="leading-relaxed">
                        The lamp's minimalist aesthetic makes it suitable for contemporary interiors, while its practical functionality ensures it serves as both a design statement and a useful lighting solution.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">150 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shade Diameter:</span>
                        <span className="font-medium">25 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Diameter:</span>
                        <span className="font-medium">28 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">Aluminum, steel</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Light Source:</span>
                        <span className="font-medium">LED integrated</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimming:</span>
                        <span className="font-medium">Touch dimmer</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Designer:</span>
                        <span className="font-medium">GamFratesi</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Adjustable shade for precise light direction</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Integrated LED with touch dimmer</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Modern minimalist design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Perfect for reading and task lighting</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Contemporary Scandinavian aesthetic</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        <span>Energy-efficient LED technology</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Modern Products */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-4 text-center">
            Other Modern Louis Poulsen Designs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Link href="/louis-poulsen/aj-floor-lamp" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Electric Orange.webp"
                    alt="AJ Floor Lamp"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2">AJ Floor Lamp</h3>
                  <p className="text-gray-900 font-medium">kr 13,025</p>
                </div>
              </div>
            </Link>

            <Link href="/louis-poulsen/njp-floor-lamp" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Louis-Poulsen/NJP-Floor-Lamp/NJP Floor Lamp NOK  8,855  Color -  Light aluminum gray.webp"
                    alt="NJP Floor Lamp"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2">NJP Floor Lamp</h3>
                  <p className="text-gray-900 font-medium">kr 8,855</p>
                </div>
              </div>
            </Link>

            <Link href="/louis-poulsen/panthella-floor-lamp" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src="/Louis-Poulsen/Panthella-Floor-Lamp/Panthella Floor Lamp.webp"
                    alt="Panthella Floor Lamp"
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light text-gray-900 mb-2">Panthella Floor Lamp</h3>
                  <p className="text-gray-900 font-medium">kr 12,995</p>
                </div>
              </div>
            </Link>
          </div>

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
