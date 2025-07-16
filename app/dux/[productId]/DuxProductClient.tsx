"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductVariant {
  id: string;
  name: string;
  image: string;
  color?: string;
  colorCode?: string;
}

interface DuxProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  variants: ProductVariant[];
  category: string;
  designer?: string;
  manufacturer?: string;
  dimensions?: string;
  weight?: string;
  designOptions?: string;
  lifestyleImages?: string[];
}

interface DuxProductClientProps {
  product: DuxProduct;
}

export default function DuxProductClient({ product }: DuxProductClientProps) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);

  const currentVariant = product.variants[selectedVariant];

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
            <Link href="/dux" className="text-stone-600 hover:text-stone-800">
              DUX
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
              <Image
                src={currentVariant.image}
                alt={`${product.name} - ${currentVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {product.lifestyleImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} lifestyle image ${index + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                DUX Collection
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              kr {product.price.toLocaleString()}
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Variant: {currentVariant.name}
              </h3>
              <div className="grid grid-cols-6 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariant === index
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    style={{ backgroundColor: variant.colorCode || "#D1D5DB" }}
                    title={variant.name}
                  >
                    {selectedVariant === index && (
                      <div className="absolute inset-0 rounded-full border-2 border-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {product.price.toLocaleString()}
            </button>

            {/* Product Details - Expandable */}
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
                    className={`w-3 h-3 transition-transform ${
                      isProductDetailsExpanded ? "rotate-45" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
              {isProductDetailsExpanded && (
                <div className="space-y-6 text-sm text-gray-600">
                  <div className="space-y-4">
                    {product.designer && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Designer</h4>
                        <p>{product.designer}</p>
                      </div>
                    )}
                    
                    {product.manufacturer && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Manufacturer</h4>
                        <p>{product.manufacturer}</p>
                      </div>
                    )}
                    
                    {product.dimensions && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Dimensions</h4>
                        <p>{product.dimensions}</p>
                      </div>
                    )}
                    
                    {product.weight && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Weight</h4>
                        <p>{product.weight}</p>
                      </div>
                    )}
                    
                    {product.designOptions && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Design Options</h4>
                        <p>{product.designOptions}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
