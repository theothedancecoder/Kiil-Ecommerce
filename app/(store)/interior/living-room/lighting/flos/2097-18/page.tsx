"use client";

import { useState } from "react";
import Image from "next/image";

const flos2097Chandelier = {
  name: "2097/18",
  model: "2097/18 (frosted bulbs)",
  price: "45,999 kr",
  bulbs: "18 x E14",
  dimensions: "88 cm diameter",
  variants: [
    {
      id: 1,
      color: "Brass",
      colorCode: "#B87333",
      mainImage: "/FLOS/2097:18 lysekrone /Brass.jpg",
      thumbnailImage: "/FLOS/2097:18 lysekrone /Brass.jpg",
      material: "Brass finish"
    },
    {
      id: 2,
      color: "Chrome",
      colorCode: "#C0C0C0",
      mainImage: "/FLOS/2097:18 lysekrone /Chrome.jpg",
      thumbnailImage: "/FLOS/2097:18 lysekrone /Chrome.jpg",
      material: "Chrome finish"
    },
    {
      id: 3,
      color: "Matt Black",
      colorCode: "#1A1A1A",
      mainImage: "/FLOS/2097:18 lysekrone /Matt Black.jpg",
      thumbnailImage: "/FLOS/2097:18 lysekrone /Matt Black.jpg",
      material: "Matt black finish"
    },
    {
      id: 4,
      color: "Matt White",
      colorCode: "#F5F5F5",
      mainImage: "/FLOS/2097:18 lysekrone /matte_white.jpg",
      thumbnailImage: "/FLOS/2097:18 lysekrone /matte_white.jpg",
      material: "Matt white finish"
    }
  ]
};

export default function Flos209718Page() {
  const [selectedVariant, setSelectedVariant] = useState(flos2097Chandelier.variants[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left side - Image */}
          <div className="flex items-center justify-center bg-gray-50 p-8">
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src={selectedVariant.mainImage}
                alt={`${flos2097Chandelier.name} in ${selectedVariant.color}`}
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
              FLOS
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                2097/18
              </h1>
              <p className="text-lg text-gray-600">
                Chandelier
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              {flos2097Chandelier.price}
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Finish
              </h3>
              <div className="flex space-x-3">
                {flos2097Chandelier.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariant.id === variant.id
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.color}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {selectedVariant.material} - {selectedVariant.color}
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
                  <span>Dimensions:</span>
                  <span>{flos2097Chandelier.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bulbs:</span>
                  <span>{flos2097Chandelier.bulbs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Designer:</span>
                  <span>Gino Sarfatti</span>
                </div>
                <div className="flex justify-between">
                  <span>Made in:</span>
                  <span>Italy</span>
                </div>
                <div className="flex justify-between">
                  <span>Installation:</span>
                  <span>Professional included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
