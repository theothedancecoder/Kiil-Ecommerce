"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function GeorgConsoleTablePage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const product = {
    id: 'georg-console-table',
    name: 'Georg Console Table',
    designer: 'Christina Liljenberg Halstrøm',
    year: '2012',
    price: 10499,
    description: 'Georg console table is designed by Christina Liljenberg Halstrøm for the brand Fritz Hansen. The console table is part of the Georg series, which makes it possible to furnish the hall and other parts of the home in a functional and at the same time stylish way. The series includes coat hangers, coat hangers, stool, bench, console table, desk, dining table, bar stools and two mirrors. All in solid oak and some with details in natural materials such as wool and leather. Since its launch in 2012, the furniture series has been awarded several international design awards. The series\' expression is a mixture of Scandinavian sensuality and Japanese minimalism.',
    category: 'Tables',
    collection: 'Georg',
    brand: 'Skagerak/Fritz Hansen',
    variants: [
      {
        name: 'Untreated Oak',
        image: '/Fritz Hansen/Georg-console-table-Skagerak/Georg console table Skagerak NOK  10,499  Variants -  Untreated oak.jpg',
        material: 'Solid oak',
        finish: 'Untreated oak',
        price: 10499
      },
      {
        name: 'Black',
        image: '/Fritz Hansen/Georg-console-table-Skagerak/Georg console table Skagerak NOK  10,499  Variants -  black.jpg',
        material: 'Solid oak',
        finish: 'Black lacquered oak',
        price: 10499
      }
    ],
    specifications: {
      'Width': '90 cm',
      'Depth': '32 cm',
      'Height': '73 cm',
      'Weight': '9 kg',
      'Dimensions (Packaged)': '95 × 38 × 15 cm',
      'Material': 'Solid oak construction',
      'Finish Options': 'Untreated oak, Black lacquered oak',
      'Designer': 'Christina Liljenberg Halstrøm',
      'Brand': 'Skagerak/Fritz Hansen',
      'Collection': 'Georg',
      'Launch Year': '2012',
      'Awards': 'Several international design awards',
      'Care Instructions': 'Clean with dry cloth. Apply wood oil periodically for natural oak finish.'
    },
    features: [
      'Part of the award-winning Georg series',
      'Designed by Christina Liljenberg Halstrøm',
      'Launched in 2012 with multiple design awards',
      'Mixture of Scandinavian sensuality and Japanese minimalism',
      'Solid oak construction with premium finishes',
      'Perfect for hallways and living spaces',
      'Functional and stylish design',
      'Available in two sophisticated finishes',
      'Part of comprehensive furniture series',
      'Sustainable solid wood construction',
      'Timeless design aesthetic',
      'Versatile console table for modern homes'
    ],
    lifestyleImages: [
      {
        src: '/Fritz Hansen/Georg-console-table-Skagerak/lifestyle/38107_image_2.jpg',
        alt: 'Georg Console Table in modern hallway setting'
      },
      {
        src: '/Fritz Hansen/Georg-console-table-Skagerak/lifestyle/38107_image_3.jpg',
        alt: 'Georg Console Table lifestyle detail shot'
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
            <Link href="/fritz-hansen" className="hover:text-gray-800">Fritz Hansen</Link>
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
              <div className="grid grid-cols-2 gap-3">
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
            Explore More Georg Collection
          </h2>
          <div className="text-center">
            <Link 
              href="/fritz-hansen"
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All Fritz Hansen Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
