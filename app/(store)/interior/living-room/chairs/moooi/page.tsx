"use client";

import { useState } from "react";
import Image from "next/image";

const mooiVariants = [
  {
    id: 1,
    name: "Kiss Lounge Chair",
    image: "/Moooi/Kiss Lounge Chair.webp",
    description: "Iconic Kiss lounge chair with distinctive design",
    price: "32,999 kr",
    material: "Premium upholstery with metal frame"
  }
];

export default function MooiPage() {
  const [selectedVariant, setSelectedVariant] = useState(mooiVariants[0]);
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
              Moooi
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                Kiss
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
                Design
              </h3>
              <p className="text-sm text-gray-600">
                The Kiss Lounge Chair features a sculptural form that seems to float in space. Its unique design combines visual lightness with exceptional comfort, making it both a functional seating solution and an artistic statement piece.
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
                  <span>Marcel Wanders</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimensions:</span>
                  <span>90 x 85 x 95 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Seat height:</span>
                  <span>43 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span>25 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Made in:</span>
                  <span>Netherlands</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
