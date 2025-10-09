"use client";

import { useState } from "react";
import Link from "next/link";
import ProductionImage from "@/components/ProductionImage";
import AddToCartWithQuantity from "@/components/AddToCartWithQuantity";
import Header from "@/components/Header";
import { useLanguage } from "@/lib/languageContext";

interface ProductVariant {
  name: string;
  image: string;
  size?: string;
  price: number;
  material?: string;
  color?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  descriptionNo?: string;
  price: number;
  category: string;
  variants: ProductVariant[];
  designer?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  relatedProducts?: { id: string; name: string; slug?: string }[];
  lifestyleImages?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }> | string[];
  slug?: string;
}

interface HayProductClientProps {
  product: Product;
  products: Product[];
}

export default function HayProductClient({ product, products }: HayProductClientProps) {
  const { t, language } = useLanguage();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  // Safely get selected variant with fallback
  const selectedVariant = product?.variants && Array.isArray(product.variants) && product.variants.length > 0 
    ? product.variants[selectedVariantIndex] || product.variants[0]
    : null;

  // Get description based on language
  const displayDescription = language === 'no' && product.descriptionNo 
    ? product.descriptionNo 
    : product.description;

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation and Cart */}
      <Header />
      
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/hay" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('product.back.hay')}
          </Link>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-stone-600 hover:text-stone-800">
              {t('product.breadcrumb.home')}
            </Link>
            <span className="text-stone-400">/</span>
            <Link href="/hay" className="text-stone-600 hover:text-stone-800">
              HAY
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <ProductionImage
                src={selectedVariant?.image || (product?.variants && Array.isArray(product.variants) && product.variants.length > 0 ? product.variants[0]?.image : '/placeholder-image.jpg')}
                alt={`${product?.name || 'HAY Product'} - ${selectedVariant?.name || 'Main view'}`}
                fill
                className="object-contain object-center p-4"
              />
            </div>

            {/* Variant Thumbnails */}
            {product?.variants && Array.isArray(product.variants) && product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedVariantIndex === index 
                        ? 'border-yellow-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ProductionImage
                      src={variant.image}
                      alt={`${variant.name} variant`}
                      fill
                      className="object-contain object-center p-2"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.color || variant.name}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Lifestyle Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.lifestyleImages.slice(0, 4).map((image, index) => {
                    const imageUrl = typeof image === 'string' ? image : image.url;
                    const imageAlt = typeof image === 'string' ? `${product.name} lifestyle ${index + 1}` : image.alt;
                    
                    return (
                      <div key={index} className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                        <ProductionImage
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-yellow-600 uppercase tracking-wider mb-2">
                {t('product.collection.hay')}
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {displayDescription}
              </p>
            </div>

            {/* Selected Variant Info */}
            {selectedVariant && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Option</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Variant:</span>
                    <span className="font-medium">{selectedVariant.name}</span>
                  </div>
                  {selectedVariant.color && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium">{selectedVariant.color}</span>
                    </div>
                  )}
                  {selectedVariant.material && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium">{selectedVariant.material}</span>
                    </div>
                  )}
                  {selectedVariant.size && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{selectedVariant.size}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Price:</span>
                    <span>kr {(selectedVariant.price || product.price).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartWithQuantity
              product={{
                _id: product.id,
                name: product.name,
                price: selectedVariant?.price || product.price,
                image: selectedVariant?.image ? {
                  _type: 'image',
                  asset: {
                    _ref: 'temp-ref',
                    _type: 'reference'
                  }
                } : undefined,
                slug: {
                  _type: 'slug',
                  current: product.slug || product.id
                },
                _type: 'product',
                _createdAt: new Date().toISOString(),
                _updatedAt: new Date().toISOString(),
                _rev: 'temp'
              } as any}
              variant="large"
            />

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setFeaturesExpanded(!featuresExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">{t('product.features')}</h3>
                  <svg
                    className={`w-5 h-5 transition-transform ${featuresExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {featuresExpanded && (
                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setSpecificationsExpanded(!specificationsExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">{t('product.specifications')}</h3>
                  <svg
                    className={`w-5 h-5 transition-transform ${specificationsExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {specificationsExpanded && (
                  <dl className="mt-4 space-y-3">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between">
                        <dt className="text-gray-600">{spec.label}:</dt>
                        <dd className="font-medium text-gray-900">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}

            {/* Related Products */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
              <div className="border-t border-gray-200 pt-16">
                <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
                  {t('product.relatedProducts')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.relatedProducts.map((related) => {
                    // Find related product by id first, then by slug as fallback
                    const relatedProduct = products?.find(p => p?.id === related?.id) || 
                                         products?.find(p => p?.slug === related?.slug);
                    return (
                      <Link
                        key={related?.id || related?.slug || 'unknown'}
                        href={`/hay/${related?.slug || related?.id || 'unknown'}`}
                        className="group"
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                          <div className="relative aspect-square bg-gray-50">
                            <ProductionImage
                              src={relatedProduct?.variants?.[0]?.image || '/placeholder-image.jpg'}
                              alt={related?.name || 'Related Product'}
                              fill
                              className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 50vw, 25vw"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-light text-gray-900 mb-2">
                              {related?.name || 'HAY Product'}
                            </h3>
                            <p className="text-gray-900 font-medium">
                              kr {(relatedProduct?.price || 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/hay"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    {t('product.viewAll.hay')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
