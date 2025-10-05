"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function NoguchiCoffeeTablePage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const product = {
    id: 'noguchi-coffee-table',
    name: 'Noguchi Coffee Table',
    designer: 'Isamu Noguchi',
    year: '1944',
    price: 31200,
    description: 'The Noguchi coffee table was designed by Isamu Noguchi in 1944. The table has a sculptural appearance and is reminiscent of Noguchi\'s bronze and marble works from the same period. The rounded glass top rests on a base consisting of two identical wooden elements placed at an angle. Produced by Vitra.',
    category: 'Furniture',
    collection: 'Noguchi',
    brand: 'Vitra',
    variants: [
      {
        name: 'Black Lacquered Ash',
        image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Black lacquered ash.webp',
        material: 'Solid ash wood',
        finish: 'Black lacquered ash',
        price: 31200
      },
      {
        name: 'Maple',
        image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Salary.webp',
        material: 'Solid maple wood',
        finish: 'Natural maple',
        price: 31200
      },
      {
        name: 'Walnut',
        image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  43,200  Color -  Walnut.webp',
        material: 'Solid walnut wood',
        finish: 'Natural walnut',
        price: 43200
      }
    ],
    specifications: {
      'Width': '128 cm',
      'Depth': '93 cm',
      'Height': '40 cm',
      'Weight': '53 kg',
      'Dimensions (Packaged)': '145 × 100 × 40 cm',
      'Material': 'Glass top with solid wood base',
      'Base Options': 'Black Lacquered Ash, Maple, Walnut',
      'Designer': 'Isamu Noguchi',
      'Brand': 'Vitra',
      'Collection': 'Noguchi',
      'Delivery Time': 'Approximately 8 weeks (made to order)',
      'Care Instructions': 'Clean glass with appropriate glass cleaner. Wood base should be dusted regularly.'
    },
    features: [
      'Iconic design by Isamu Noguchi from 1944',
      'Sculptural appearance reminiscent of bronze and marble works',
      'Rounded glass top with curved wooden base',
      'Two identical wooden elements placed at an angle',
      'Perfect balance of art and function',
      'Available in three premium wood finishes',
      'Made to order - 8 weeks delivery time',
      'Timeless mid-century modern design',
      'Museum-quality craftsmanship',
      'Sustainable wood sourcing'
    ],
    lifestyleImages: [
      {
        src: '/Vitra/Noguchi-coffee-table /lifestyle/JtOTrg_1663340409_9008_3050_0_pck.jpg',
        alt: 'Noguchi Coffee Table in modern living room setting'
      },
      {
        src: '/Vitra/Noguchi-coffee-table /lifestyle/wF4qUv_1663340415_9008_3052_0_pck.jpg',
        alt: 'Noguchi Coffee Table lifestyle detail shot'
      }
    ]
  };

  const currentVariant = product.variants[selectedVariant];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-800">Home</Link>
            <span>/</span>
            <Link href="/vitra" className="hover:text-gray-800">Vitra</Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Images */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={currentVariant.image}
                alt={`${product.name} - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                priority
              />
            </div>

            {/* Variant Thumbnails */}
            {product.variants.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`relative aspect-square bg-gray-50 rounded-lg border-2 transition-colors ${
                      selectedVariant === index
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={variant.name}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Product Info */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {product.brand} • {product.collection}
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Designed by {product.designer} • {product.year}
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr {currentVariant.price.toLocaleString()}
            </div>

            {/* Material/Finish Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Wood Type & Finish
              </h3>
              <div className="space-y-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedVariant === index
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-sm text-gray-600">{variant.material}</div>
                        <div className="text-sm text-gray-500">{variant.finish}</div>
                      </div>
                      <div className="text-sm font-medium">
                        kr {variant.price.toLocaleString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>

            {/* Delivery Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Made to Order</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    This item is made to order. Expected delivery time is approximately 8 weeks.
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
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <svg
                    className={`w-3 h-3 transition-transform ${isDescriptionExpanded ? 'rotate-45' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              {isDescriptionExpanded && (
                <div className="space-y-6 text-sm text-gray-600">
                  {/* Specifications */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span>{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lifestyle Images */}
        {product.lifestyleImages && product.lifestyleImages.length > 0 && (
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.lifestyleImages.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
            Explore More Vitra
          </h2>
          <div className="text-center">
            <Link 
              href="/vitra"
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All Vitra Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
