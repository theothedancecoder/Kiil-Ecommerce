"use client";

import { useState } from "react";
import Image from "next/image";

const duxVariants = [
  {
    id: 1,
    name: "Jetson Classic Soft 25 - Flax 21",
    image: "/Dux/Jetson Classic soft 25: flax 21.webp",
    description: "Premium upholstered chair in Flax 21 fabric",
    price: "29,999 kr",
    fabric: "Flax 21",
    colorCode: "#F5F5DC"
  }
];

export default function DuxPage() {
  const [selectedVariant, setSelectedVariant] = useState(duxVariants[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left side - Image */}
          <div className="flex items-center justify-center bg-gray-50 p-8">
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src={selectedVariant.image}
                alt={selectedVariant.name}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="flex flex-col justify-center p-8 lg:p-16 space-y-8">
            {/* Brand */}
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              Dux
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                Jetson Classic
              </h1>
              <p className="text-lg text-gray-600">
                Lounge chair
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              {selectedVariant.price}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Upholstery
              </h3>
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-full border-2 border-gray-900"
                  style={{ backgroundColor: selectedVariant.colorCode }}
                />
                <span className="text-sm text-gray-600">{selectedVariant.fabric}</span>
              </div>
              <p className="text-sm text-gray-600">
                The Jetson Classic Soft 25 features premium upholstery in the sophisticated Flax 21 fabric. This chair embodies Dux's heritage of creating furniture that prioritizes both comfort and longevity.
              </p>
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
            <button className="w-full bg-black text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>

            {/* Product Details */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Product Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Designer:</span>
                  <span>Bruno Mathsson</span>
                </div>
                <div className="flex justify-between">
                  <span>Width:</span>
                  <span>65 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span>97 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Depth:</span>
                  <span>83 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Seat height:</span>
                  <span>40 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span>Linen, Leather, Polyether, Metal</span>
                </div>
                <div className="flex justify-between">
                  <span>Made in:</span>
                  <span>Sweden</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
