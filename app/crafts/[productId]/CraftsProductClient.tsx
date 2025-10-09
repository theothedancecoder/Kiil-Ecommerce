"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartWithQuantity from "@/components/AddToCartWithQuantity";
import { useLanguage } from "@/lib/languageContext";

interface Product {
  id: string;
  name: string;
  description: string;
  descriptionNo?: string;
  price: number;
  category: string;
  variants: Array<{
    name: string;
    image: string;
    color?: string;
    material?: string;
    size?: string;
    price: number;
  }>;
  designer: string;
  features: string[];
  specifications: Array<{
    label: string;
    value: string;
  }>;
  lifestyleImages: string[];
  relatedProducts: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    variants: Array<{
      name: string;
      image: string;
      color?: string;
      material?: string;
      size?: string;
      price: number;
    }>;
  }>;
}

interface CraftsProductClientProps {
  product: Product;
  products: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    variants: Array<{
      name: string;
      image: string;
      material?: string;
      price: number;
    }>;
  }>;
}

export default function CraftsProductClient({ product, products }: CraftsProductClientProps) {
  const { t, language } = useLanguage();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Get description based on language
  const displayDescription = product?.description || product.description;
  const [quantity, setQuantity] = useState(1);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];
  const currentPrice = selectedVariant?.price || product.price;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/crafts" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('product.back.crafts')}
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">{t('product.breadcrumb.home')}</Link>
              <span className="text-stone-400">/</span>
              <Link href="/crafts" className="text-stone-600 hover:text-stone-800">
                Crafts
              </Link>
              <span className="text-stone-400">/</span>
              <span className="text-stone-800 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={selectedVariant?.image || '/placeholder-image.jpg'}
                alt={`${product.name} - ${selectedVariant?.name}`}
                fill
                className="object-contain object-center p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {product.lifestyleImages.slice(0, 2).map((image, index) => (
                  <div key={index} className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} Lifestyle ${index + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-amber-600 uppercase tracking-wider mb-2">
                {t('product.collection.crafts')}
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {displayDescription}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Handcrafted by {product.designer}
              </div>
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {currentPrice.toLocaleString()}
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Select Material
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`p-3 text-sm border rounded transition-all ${
                        selectedVariantIndex === index
                          ? "border-amber-600 bg-amber-50"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-xs text-gray-500">kr {variant.price.toLocaleString()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartWithQuantity
              product={{
                _id: product.id,
                _type: 'product',
                _createdAt: '',
                _updatedAt: '',
                _rev: '',
                name: product.name,
                price: currentPrice,
                image: { asset: { _ref: '', _type: 'reference' } } as any,
                slug: { current: product.id, _type: 'slug' },
              } as any}
            />

            {/* Artisan Crafted Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Handcrafted Excellence</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Each piece is individually handcrafted by skilled artisans, making every item unique.
                  </p>
                </div>
              </div>
            </div>

            {/* Collapsible Features */}
            <div className="border-t border-gray-200 pt-8">
              <button
                onClick={() => setFeaturesExpanded(!featuresExpanded)}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Features
                </h3>
                <span className="text-gray-500">
                  {featuresExpanded ? "−" : "+"}
                </span>
              </button>
              {featuresExpanded && (
                <ul className="mt-4 space-y-2 text-gray-600">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Collapsible Specifications */}
            <div className="border-t border-gray-200 pt-8">
              <button
                onClick={() => setSpecificationsExpanded(!specificationsExpanded)}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Specifications
                </h3>
                <span className="text-gray-500">
                  {specificationsExpanded ? "−" : "+"}
                </span>
              </button>
              {specificationsExpanded && (
                <div className="mt-4 space-y-3 text-gray-600">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">{spec.label}</span>
                      <span className="text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-gray-200 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
                You May Also Like
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/crafts/${relatedProduct.slug}`}
                  className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={relatedProduct.variants[0]?.image || '/placeholder-image.jpg'}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                      {relatedProduct.name}
                    </h3>
                    <div className="text-sm font-light text-gray-900">
                      kr {relatedProduct.price.toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
