"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allProducts } from '@/lib/allProducts';

export default function SeventyArmchairPage() {
  const product = allProducts.find(p => p.id === 'jonas-ihreborn-seventy-armchair');
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  if (!product) {
    return <div>Product not found</div>;
  }

  // Update selected image when variant changes
  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
    setSelectedImage(variant.image);
  };

  const currentPrice = selectedVariant?.price || product.price;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/jonas-ihreborn" className="hover:text-gray-900 transition-colors">
              Jonas Ihreborn
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain object-center p-8"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {product.variants && product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantChange(variant)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedVariant?.name === variant.name
                        ? 'border-amber-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={variant.name}
                      fill
                      className="object-contain object-center p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {product.brand}
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-gray-200 pt-8">
              <div className="text-3xl font-light text-gray-900 mb-2">
                kr {currentPrice.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Including VAT, excluding shipping
              </div>
            </div>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 1 && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Color & Material
                </h3>
                <div className="space-y-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => handleVariantChange(variant)}
                      className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${
                        selectedVariant?.name === variant.name
                          ? 'border-amber-600 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 bg-gray-50 rounded-lg overflow-hidden">
                          <Image
                            src={variant.image}
                            alt={variant.name}
                            fill
                            className="object-contain object-center p-1"
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">
                            {variant.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {variant.material}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-medium text-gray-900">
                        kr {variant.price?.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="border-t border-gray-200 pt-8">
              <button className="w-full bg-gray-900 text-white py-4 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 mb-4">
                Add to Cart
              </button>
              <button className="w-full border border-gray-300 text-gray-900 py-4 px-8 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300">
                Add to Wishlist
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Product Details
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Brand:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span className="font-medium">{selectedVariant?.material || 'Premium Leather'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <span className="font-medium text-green-600">In Stock</span>
                </div>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Shipping & Returns
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free shipping on orders over kr 10,000</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Professional delivery and setup available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Crafted for Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Seventy armchair represents the pinnacle of Swedish furniture design, combining comfort, style, and durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Leather</h3>
              <p className="text-gray-600">Upholstered in the finest Challenger leather for exceptional comfort and durability.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ergonomic Design</h3>
              <p className="text-gray-600">Carefully designed proportions provide optimal support and comfort for extended sitting.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Timeless Quality</h3>
              <p className="text-gray-600">Built to last with traditional craftsmanship techniques and premium materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              You May Also Like
            </h2>
            <p className="text-xl text-gray-600">
              Explore more premium seating solutions from Jonas Ihreborn
            </p>
          </div>

          <div className="text-center">
            <Link 
              href="/jonas-ihreborn"
              className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              View All Jonas Ihreborn Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
