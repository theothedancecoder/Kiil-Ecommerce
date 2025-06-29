"use client";

import { useState } from "react";
import Image from "next/image";

const palissadeSofas = [
  {
    id: 1,
    name: "Palissade Lounge Sofa - Cream White",
    image: "/Palissade -Lounge Sofa/AA613-A800_Palissade-Lounge-Sofa-cream-white.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Cream White",
    colorCode: "#F5F5DC",
    dimensions: "139 x 88 cm"
  },
  {
    id: 2,
    name: "Palissade Lounge Sofa - Sky Grey",
    image: "/Palissade -Lounge Sofa/AA617-A221_Palissade-Lounge-Sofa-sky-grey.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Sky Grey",
    colorCode: "#87CEEB",
    dimensions: "139 x 88 cm"
  },
  {
    id: 3,
    name: "Palissade Lounge Sofa - Hot Galvanised",
    image: "/Palissade -Lounge Sofa/AA617-A234_Palissade-Lounge-Sofa-hot-galvanised.jpg",
    price: "74,999 kr",
    material: "Hot Galvanised Steel",
    color: "Metallic",
    colorCode: "#C0C0C0",
    dimensions: "139 x 88 cm"
  },
  {
    id: 4,
    name: "Palissade Lounge Sofa - Iron Red",
    image: "/Palissade -Lounge Sofa/iron red.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Iron Red",
    colorCode: "#B22222",
    dimensions: "139 x 88 cm"
  },
  {
    id: 5,
    name: "Palissade Lounge Sofa - Olive",
    image: "/Palissade -Lounge Sofa/olive.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Olive",
    colorCode: "#808000",
    dimensions: "139 x 88 cm"
  },
  {
    id: 6,
    name: "Palissade Lounge Sofa - Anthracite",
    image: "/Palissade -Lounge Sofa/Palissade-Lounge-Sofa-anthracite_Palissade-Lounge-Sofa-Seat-Cushion-anthracite.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Anthracite",
    colorCode: "#36454F",
    dimensions: "139 x 88 cm"
  }
];

export default function PalissadeLoungePage() {
  const [selectedSofa, setSelectedSofa] = useState(palissadeSofas[0]);
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
              HAY
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                Palissade Lounge
              </h1>
              <p className="text-lg text-gray-600">
                Outdoor sofa
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              {selectedSofa.price}
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {palissadeSofas.map((sofa) => (
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
                  <span>Use:</span>
                  <span>Indoor/Outdoor</span>
                </div>
                <div className="flex justify-between">
                  <span>Made in:</span>
                  <span>Denmark</span>
                </div>
                <div className="flex justify-between">
                  <span>Weather resistant:</span>
                  <span>Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
