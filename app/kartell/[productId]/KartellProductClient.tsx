"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AddToCartWithQuantity from "@/components/AddToCartWithQuantity";
import Header from "@/components/Header";
import { useLanguage } from "@/lib/languageContext";

interface KartellProduct {
  id: string;
  name: string;
  description: string;
  descriptionNo?: string;
  price: number;
  image: string;
  variants: {
    name: string;
    image: string;
    color: string;
  }[];
  lifestyleImages?: string[];
  details?: {
    [key: string]: string;
  };
}

interface KartellProductClientProps {
  product: KartellProduct;
}

export default function KartellProductClient({ product }: KartellProductClientProps) {
  const { t, language } = useLanguage();

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  // Get description based on language
  const displayDescription = language === 'no' && product.descriptionNo 
    ? product.descriptionNo 
    : product.description;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation and Cart */}
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">{t('product.breadcrumb.home')}</Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/kartell" className="text-gray-500 hover:text-gray-700">
                  Kartell
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={selectedVariant.image}
                alt={`${product.name} in ${selectedVariant.name}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Variant Thumbnails */}
            {product.variants.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative aspect-square bg-gray-100 rounded border-2 transition-colors ${
                      selectedVariant.name === variant.name
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={variant.name}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-8">
                {product.lifestyleImages.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} lifestyle ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Product Title and Category */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                KARTELL
              </div>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                {product.name}
              </h1>
              
              {/* Price */}
              <div className="text-3xl font-light text-stone-800 mb-6">
                kr {product.price.toLocaleString()}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-600 leading-relaxed">
                {displayDescription}
              </p>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-800">
                  Color: {selectedVariant.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedVariant.name === variant.name
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart with Quantity */}
            <AddToCartWithQuantity 
              product={{
                ...product,
                _id: product.id,
                price: product.price,
                image: {
                  _type: "image",
                  asset: {
                    _ref: selectedVariant.image,
                    _type: "reference"
                  }
                }
              } as any}
              variant="large"
            />

            {/* Product Details */}
            {product.details && (
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-stone-800">
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
                  <div className="space-y-3 text-sm text-stone-600">
                    {product.details && Object.entries(product.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-stone-800 text-center mb-12">
            More from Kartell
          </h2>
          <div className="text-center">
            <Link 
              href="/kartell"
              className="inline-block bg-stone-800 text-white px-8 py-3 font-medium hover:bg-stone-700 transition-colors"
            >
              {t('product.viewAll.kartell')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
