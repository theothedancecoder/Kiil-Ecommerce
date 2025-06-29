"use client";

import { useState } from "react";
import Image from "next/image";

const fritzHansenColors = [
  {
    id: 1,
    name: "Oak",
    image: "/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png",
    description: "Clear lacquered oak veneer with natural grain",
    price: "6,999 kr",
    colorCode: "#D2B48C",
  },
  {
    id: 2,
    name: "Walnut",
    image: "/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Walnut.png",
    description: "Clear lacquered walnut veneer with rich tones",
    price: "7,999 kr",
    colorCode: "#8B4513",
  },
  {
    id: 3,
    name: "Black Ash",
    image: "/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - Black (195).png",
    description: "Coloured ash veneer in elegant black finish",
    price: "6,999 kr",
    colorCode: "#2C2C2C",
  },
  {
    id: 4,
    name: "White Ash",
    image: "/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - White (105).png",
    description: "Coloured ash veneer in clean white finish",
    price: "6,999 kr",
    colorCode: "#F5F5F5",
  }
];

export default function FritzHansenGrandPrix4130Page() {
  const [selectedColor, setSelectedColor] = useState(fritzHansenColors[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left side - Image */}
          <div className="flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src={selectedColor.image}
                alt={selectedColor.name + " Fritz Hansen Grand Prix 4130"}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-8 xl:p-16 space-y-6 sm:space-y-8">
            {/* Brand */}
            <div className="text-sm text-gray-500 uppercase tracking-wider">
              Fritz Hansen
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                Grand Prix™ 4130
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Stool
              </p>
            </div>

            {/* Price */}
            <div className="text-xl sm:text-2xl font-light text-gray-900">
              {selectedColor.price}
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Finish
              </h3>
              <div className="flex flex-wrap gap-3">
                {fritzHansenColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all ${
                      selectedColor.id === color.id
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    style={{ backgroundColor: color.colorCode }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {selectedColor.description}
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

            {/* Product Details */}
            <div className="space-y-4 pt-6 sm:pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Product Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Designer:</span>
                  <span>Arne Jacobsen</span>
                </div>
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span>46 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Seat diameter:</span>
                  <span>35 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span>3.2 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Made in:</span>
                  <span>Denmark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
