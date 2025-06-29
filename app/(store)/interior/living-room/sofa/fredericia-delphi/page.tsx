"use client";

import { useState } from "react";
import Image from "next/image";

const fredericiaDelphiSofas = [
  {
    id: 1,
    name: "Delphi Sofa - Leather Russet Brown",
    image: "/Fredericia /4511_delphi-sofa--240x85-cm_50841_leather-cera-905-russet-brown_v1.avif",
    price: "89,999 kr",
    material: "Leather Cera 905",
    color: "Russet Brown",
    colorCode: "#8B4513",
    dimensions: "240 x 85 cm"
  },
  {
    id: 2,
    name: "Delphi Sofa - Steelcut Trio",
    image: "/Fredericia /Delphi Sofa - Steelcut Trio, 213.avif",
    price: "79,999 kr",
    material: "Steelcut Trio",
    color: "213",
    colorCode: "#4A5568",
    dimensions: "240 x 85 cm"
  },
  {
    id: 3,
    name: "Delphi Sofa - Leather Black",
    image: "/Fredericia /Delphi Sofa -Leather Max 98, Black.avif",
    price: "89,999 kr",
    material: "Leather Max 98",
    color: "Black",
    colorCode: "#1A1A1A",
    dimensions: "240 x 85 cm"
  }
];

export default function FredericiaDelphiPage() {
  const [selectedSofa, setSelectedSofa] = useState(fredericiaDelphiSofas[0]);
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
                Delphi
              </h1>
              <p className="text-lg text-gray-600">
                Sofa
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
              <div className="flex space-x-3">
                {fredericiaDelphiSofas.map((sofa) => (
                  <button
                    key={sofa.id}
                    onClick={() => setSelectedSofa(sofa)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedSofa.id === sofa.id
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    style={{ backgroundColor: sofa.colorCode }}
                    title={sofa.color}
                  />
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
                  <span>3-seater</span>
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
