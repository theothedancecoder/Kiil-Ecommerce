"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { louisPoulsenProducts } from "@/lib/louisPoulsenProducts";
import ProductionImage from "@/components/ProductionImage";

export default async function LouisPoulsenProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  console.log("Received productId param:", productId);
  
  // Find the product from our centralized data
  const product = louisPoulsenProducts.find((p) => p._id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link 
            href="/louis-poulsen"
            className="inline-block bg-gray-900 text-white px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Back to Louis Poulsen
          </Link>
        </div>
      </div>
    );
  }

  return <LouisPoulsenProductClient product={product} />;
}

function LouisPoulsenProductClient({ product }: { product: typeof louisPoulsenProducts[0] }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = product.variants?.[selectedVariantIndex] || {
    name: "Default",
    image: product.image,
    color: "Default",
    price: product.price,
  };

  // Get related products (other Louis Poulsen products)
  const relatedProducts = louisPoulsenProducts
    .filter(p => p._id !== product._id)
    .slice(0, 3);

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
                src={selectedVariant.image}
                alt={`${product.name} - ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            {product.variants && product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVariantIndex === index
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <ProductionImage
                      src={variant.image}
                      alt={`${variant.name} variant`}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.name}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Louis Poulsen
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
              {product.designer && (
                <div className="mt-4 text-sm text-gray-500">
                  Designed by {product.designer}
                </div>
              )}
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {selectedVariant.price.toLocaleString()}
            </div>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Finish: {selectedVariant.name}
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedVariantIndex === index
                          ? "border-gray-900 scale-110"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: variant.color || "#D1D5DB" }}
                      title={variant.name}
                    >
                      {selectedVariantIndex === index && (
                        <div className="absolute inset-0 rounded-full border-2 border-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {selectedVariant.price.toLocaleString()}
            </button>

            {/* Features */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Features
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Iconic Danish design by {product.designer}</li>
                <li>High-quality materials and craftsmanship</li>
                <li>Timeless aesthetic that complements any interior</li>
                <li>Professional lighting performance</li>
                {product.variants && product.variants.length > 1 && (
                  <li>Available in multiple finishes</li>
                )}
              </ul>
            </div>

            {/* Specifications */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Specifications
              </h3>
              <div className="grid grid-cols-1 gap-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Brand</span>
                  <span className="font-medium">Louis Poulsen</span>
                </div>
                <div className="flex justify-between">
                  <span>Designer</span>
                  <span className="font-medium">{product.designer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-medium">kr {selectedVariant.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-20 pt-16 border-t border-gray-200">
                <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {relatedProducts.map((related) => (
                    <Link
                      key={related._id}
                      href={`/louis-poulsen/${related._id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                        <div className="relative aspect-square bg-gray-50">
                          <ProductionImage
                            src={related.image}
                            alt={related.name}
                            fill
                            className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-light text-gray-900 mb-2">
                            {related.name}
                          </h3>
                          <p className="text-gray-900 font-medium">
                            kr {related.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
