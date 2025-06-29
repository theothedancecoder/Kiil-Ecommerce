"use client";

import { useState } from "react";
import Image from "next/image";

const fredericiaEJ220Sofas = [
  {
    id: 1,
    name: "EJ220 Sofa - Erik 3790 Linen",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Erik 3790 Linen.avif",
    price: "79,999 kr",
    material: "Erik 3790 Linen",
    color: "Linen",
    colorCode: "#F5F5DC",
    dimensions: "150 x 85 cm"
  },
  {
    id: 2,
    name: "EJ220 Sofa - Erik 9998 Broken Grey",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Erik 9998 Broken Grey.avif",
    price: "79,999 kr",
    material: "Erik 9998",
    color: "Broken Grey",
    colorCode: "#8B8B8B",
    dimensions: "150 x 85 cm"
  },
  {
    id: 3,
    name: "EJ220 Sofa - Leather Max 95 Cognac",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Leather Max 95 Cognac.avif",
    price: "94,999 kr",
    material: "Leather Max 95",
    color: "Cognac",
    colorCode: "#A0522D",
    dimensions: "150 x 85 cm"
  },
  {
    id: 4,
    name: "EJ220 Sofa - Leather Omni 301 Black",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Leather Omni 301 Black.avif",
    price: "94,999 kr",
    material: "Leather Omni 301",
    color: "Black",
    colorCode: "#1A1A1A",
    dimensions: "150 x 85 cm"
  },
  {
    id: 5,
    name: "EJ220 Sofa - Re-Wool 128",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Re-Wool 128.avif",
    price: "84,999 kr",
    material: "Re-Wool 128",
    color: "Grey",
    colorCode: "#696969",
    dimensions: "150 x 85 cm"
  },
  {
    id: 6,
    name: "EJ220 Sofa - Re-Wool 198",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Re-Wool 198.avif",
    price: "84,999 kr",
    material: "Re-Wool 198",
    color: "Blue",
    colorCode: "#4682B4",
    dimensions: "150 x 85 cm"
  }
];

export default function FredericiaEJ220Page() {
  const [selectedSofa, setSelectedSofa] = useState(fredericiaEJ220Sofas[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left side - Image */}
          <div className="flex items-center justify-center bg-gray-50 p-8">
            <div className="relative w-full max-w-lg aspect-[4/3]">
              <Image
                src={selectedSofa.image}
                alt={selectedSofa.name}
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
              Fredericia
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                EJ220
              </h1>
              <p className="text-lg text-gray-600">
                2-seater sofa
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              {selectedSofa.price}
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Material & Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {fredericiaEJ220Sofas.map((sofa) => (
                  <button
                    key={sofa.id}
                    onClick={() => setSelectedSofa(sofa)}
                    className={`relative p-3 border-2 transition-all text-center ${
                      selectedSofa.id === sofa.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: sofa.colorCode }}
                    />
                    <div className="text-xs text-gray-600">
                      {sofa.color}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {selectedSofa.material} - {selectedSofa.color}
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
                  <span>{selectedSofa.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span>{selectedSofa.material}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seating:</span>
                  <span>2-seater</span>
                </div>
                <div className="flex justify-between">
                  <span>Made in:</span>
                  <span>Denmark</span>
                </div>
                <div className="flex justify-between">
                  <span>Assembly:</span>
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
