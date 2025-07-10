"use client";

import { useState } from "react";
import Image from "next/image";
import InteriorSidebar from "@/components/InteriorSidebar";

interface HomeAccessoryVariant {
  name: string;
  image: string;
  price: string;
}

interface HomeAccessoryDisplayProps {
  product: {
    name: string;
    category: string;
    description: string;
    variants: HomeAccessoryVariant[];
    details?: {
      [key: string]: string;
    };
    lifestyleImages?: {
      src: string;
      alt: string;
    }[];
  };
}

export default function HomeAccessoryDisplay({ product }: HomeAccessoryDisplayProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left side - Image */}
          <div className="flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="space-y-4 w-full max-w-lg">
              <div className="relative w-full aspect-square overflow-hidden">
                <img
                  src={selectedVariant.image.replace(/×/g, '%C3%97')}
                  alt={`${product.name} in ${selectedVariant.name}`}
                  className="object-contain object-center w-full h-full"
                  loading="eager"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.variants.length > 1 && (
                <div className="flex space-x-2 justify-center">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative w-16 h-16 bg-white rounded border-2 transition-colors ${
                        selectedVariant.name === variant.name
                          ? "border-gray-900"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={variant.image.replace(/×/g, '%C3%97')}
                        alt={variant.name}
                        className="object-contain w-full h-full p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-8 xl:p-16 space-y-6 sm:space-y-8">
            {/* Category */}
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              {product.category}
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px', color: '#212529' }}>
                {product.name}
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="text-xl sm:text-2xl font-light text-gray-900">
              {selectedVariant.price}
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Variants
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

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="text-base sm:text-lg font-medium w-6 sm:w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-black text-white py-3 sm:py-4 px-6 sm:px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>

            {/* Description */}
            {product.details && (
              <div className="space-y-4 pt-6 sm:pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Description
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
                  <div className="space-y-4 text-sm text-gray-600">
                    {Object.entries(product.details).map(([key, value]) => (
                      <div key={key}>
                        {key === "Description" ? (
                          <p className="text-gray-600 leading-relaxed">{value}</p>
                        ) : (
                          <div className="flex justify-between">
                            <span>{key}:</span>
                            <span>{value}</span>
                          </div>
                        )}
                      </div>
                    ))} 
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Lifestyle Images - Full Width */}
        {product.lifestyleImages && product.lifestyleImages.length > 0 && (
          <div className="mt-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
              {product.lifestyleImages.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 50vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
