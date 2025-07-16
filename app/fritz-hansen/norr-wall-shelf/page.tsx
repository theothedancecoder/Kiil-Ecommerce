"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function NorrWallShelfPage() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const product = {
    id: 'norr-wall-shelf',
    name: 'Norr Wall Shelf',
    designer: 'Ditte Buus Nielsen',
    year: 'Contemporary',
    price: 4099,
    description: 'Practical and decorative shelf designed by Ditte Buus Nielsen for Skagerak/Fritz Hansen. Solid untreated oak with leather strap and hanger. This is a made to order item with approximately 4 weeks delivery time.',
    category: 'Accessories',
    collection: 'Norr',
    brand: 'Skagerak by Fritz Hansen',
    variants: [
      {
        name: 'Untreated Oak with Leather',
        image: '/Fritz Hansen/Norr-wall-shelf/Norr wall shelf NOK  4,099.jpg',
        material: 'Untreated solid oak with leather strap and hanger',
        finish: 'Untreated oak with leather details'
      }
    ],
    specifications: {
      'Width': '36 cm',
      'Height': '76 cm',
      'Depth': '10 cm',
      'Weight': '2.4 kg',
      'Dimensions (Packaged)': '40 × 15 × 80 cm',
      'Material': 'Untreated solid oak with leather strap and hanger',
      'Designer': 'Ditte Buus Nielsen',
      'Brand': 'Skagerak by Fritz Hansen',
      'Collection': 'Norr',
      'Delivery Time': 'Approximately 4 weeks (made to order)',
      'Care Instructions': 'Clean with dry cloth. Apply wood oil periodically for oak. Clean leather with appropriate leather cleaner.'
    },
    features: [
      'Designed by Ditte Buus Nielsen',
      'Manufactured by Skagerak/Fritz Hansen',
      'Practical and decorative design',
      'Solid untreated oak construction',
      'Leather strap and hanger details',
      'Wall-mounted installation',
      'Made to order craftsmanship',
      'Sustainable oak sourcing',
      'Scandinavian design aesthetic',
      'Perfect for books and decorative objects',
      'Compact depth (10cm) for small spaces',
      'Natural materials combination',
      'Timeless and functional design',
      '4 weeks delivery time'
    ],
    lifestyleImages: [
      {
        src: '/Fritz Hansen/Norr-wall-shelf/lifestyle/NjAxw7_1718627715_8090_10111_0_pck.jpg',
        alt: 'Norr Wall Shelf in modern interior setting'
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
              <div className="flex space-x-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`relative w-20 h-20 bg-gray-50 rounded-lg border-2 transition-colors ${
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

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="space-y-4">
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
                Designed by {product.designer}
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              NOK {product.price.toLocaleString()}
            </div>

            {/* Material Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Material & Finish
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
                    <div className="font-medium">{variant.name}</div>
                    <div className="text-sm text-gray-600">{variant.material}</div>
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
                    This item is made to order. Expected delivery time is approximately 4 weeks.
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

        {/* Related Products */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
            Explore More Norr Collection
          </h2>
          <div className="text-center space-y-4">
            <Link 
              href="/fritz-hansen/norr-magazine-holder"
              className="inline-block bg-gray-100 text-gray-900 px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors mr-4"
            >
              View Norr Magazine Holder
            </Link>
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
