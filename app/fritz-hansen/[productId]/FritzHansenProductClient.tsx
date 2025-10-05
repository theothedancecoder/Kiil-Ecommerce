"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductionImage from '@/components/ProductionImage';

interface FritzHansenProductClientProps {
  product: any;
  products: any[];
}

export default function FritzHansenProductClient({ product, products }: FritzHansenProductClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <Link href="/fritz-hansen" className="hover:text-stone-800">Fritz Hansen</Link>
            <span>/</span>
            <span className="text-stone-800">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <ProductionImage
                src={selectedVariant.image}
                alt={`${product.name} in ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-8"
                priority
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.variants.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.variants.map((variant: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded border-2 transition-colors ${
                      selectedVariant.name === variant.name
                        ? "border-stone-800"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <ProductionImage
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
            {/* Category */}
            <div className="text-sm text-stone-500 uppercase tracking-wider">
              {product.category}
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">
                {product.name}
              </h1>
              <p className="text-stone-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-stone-900">
              kr {product.price.toLocaleString()}
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
                  Variants
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-lg border text-left ${
                        selectedVariant.name === variant.name
                          ? "border-stone-800 bg-stone-50"
                          : "border-stone-300 hover:border-stone-400"
                      }`}
                    >
                      <div className="font-medium text-sm">{variant.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-stone-700 transition-colors">
              Add to Cart
            </button>

            {/* Product Details */}
            {product.details && (
              <div className="space-y-4 pt-8 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
                    Product Details
                  </h3>
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="flex items-center justify-center w-6 h-6 rounded-full border border-stone-300 hover:border-stone-400 transition-colors"
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
                  <div className="space-y-3 text-sm">
                    {Object.entries(product.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-stone-100 last:border-b-0">
                        <span className="text-stone-600">{key}:</span>
                        <span className="text-stone-800 font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Lifestyle Images */}
        {product.lifestyleImages && product.lifestyleImages.length > 0 && (
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.lifestyleImages.map((image: any, index: number) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <ProductionImage
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
      </div>
    </div>
  );
}
