"use client";

import { useState } from "react";
import Image from "next/image";

const juul903Sofas = [
  {
    id: 1,
    name: "Juul 903 - Leather Prestige 18",
    image: "/Juul 903/juul-903-240x86-cm-Leather Prestige-18.jpg",
    price: "149,999 kr",
    material: "Leather Prestige 18",
    color: "Brown",
    colorCode: "#8B4513",
    dimensions: "240 x 86 cm"
  },
  {
    id: 2,
    name: "Juul 903 - Prestige 10",
    image: "/Juul 903/juul-903-240x86-cm-prestige-10.jpg",
    price: "139,999 kr",
    material: "Prestige 10",
    color: "Light Brown",
    colorCode: "#D2B48C",
    dimensions: "240 x 86 cm"
  },
  {
    id: 3,
    name: "Juul 903 - Prestige 03",
    image: "/Juul 903/Prestige 03.webp",
    price: "139,999 kr",
    material: "Prestige 03",
    color: "Beige",
    colorCode: "#F5F5DC",
    dimensions: "240 x 86 cm"
  }
];

const juul301Sofas = [
  {
    id: 4,
    name: "Juul 301 - Mainz 09",
    image: "/Juul 903/JUUL 301/mainz 09.jpg",
    price: "89,999 kr",
    material: "Mainz 09",
    color: "Grey",
    colorCode: "#808080",
    dimensions: "200 x 80 cm"
  },
  {
    id: 5,
    name: "Juul 301 - Tobacco 16",
    image: "/Juul 903/JUUL 301/Tobacco 16.jpg",
    price: "89,999 kr",
    material: "Tobacco 16",
    color: "Brown",
    colorCode: "#8B4513",
    dimensions: "200 x 80 cm"
  },
  {
    id: 6,
    name: "Juul 301 - Tobacco 37",
    image: "/Juul 903/JUUL 301/Tobacco 37.jpg",
    price: "89,999 kr",
    material: "Tobacco 37",
    color: "Dark Brown",
    colorCode: "#654321",
    dimensions: "200 x 80 cm"
  }
];

export default function Juul903Page() {
  const [selectedCollection, setSelectedCollection] = useState<'903' | '301'>('903');
  const [selectedSofa, setSelectedSofa] = useState(juul903Sofas[0]);
  const [quantity, setQuantity] = useState(1);

  const currentSofas = selectedCollection === '903' ? juul903Sofas : juul301Sofas;

  const handleCollectionChange = (collection: '903' | '301') => {
    setSelectedCollection(collection);
    setSelectedSofa(collection === '903' ? juul903Sofas[0] : juul301Sofas[0]);
  };

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
              Juul
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                Juul {selectedCollection}
              </h1>
              <p className="text-lg text-gray-600">
                Premium sofa
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              {selectedSofa.price}
            </div>

            {/* Collection Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Collection
              </h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleCollectionChange('903')}
                  className={`px-4 py-2 border transition-all ${
                    selectedCollection === '903'
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                >
                  Juul 903
                </button>
                <button
                  onClick={() => handleCollectionChange('301')}
                  className={`px-4 py-2 border transition-all ${
                    selectedCollection === '301'
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                >
                  Juul 301
                </button>
              </div>
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Material & Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {currentSofas.map((sofa) => (
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
                  <span>{selectedCollection === '903' ? '3-seater' : '2-seater'}</span>
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
