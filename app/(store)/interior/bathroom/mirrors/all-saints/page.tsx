"use client";

import { useState } from "react";
import Image from "next/image";

const allSaintsMirrors = [
  {
    id: 1,
    color: "Amber",
    image: "/ALL SAINTS/AMBER.webp",
    sideImage: "/ALL SAINTS/AMBER- SIDE VIEW.webp",
    price: "2,499 NOK",
    colorCode: "#FFBF00",
  },
  {
    id: 2,
    color: "Aquamarine Green",
    image: "/ALL SAINTS/AQUAMARINE GREEN.webp",
    sideImage: "/ALL SAINTS/all saints green side.webp",
    price: "2,499 NOK",
    colorCode: "#7FFFD4",
  },
  {
    id: 3,
    color: "Black",
    image: "/ALL SAINTS/BLACK.webp",
    sideImage: "/ALL SAINTS/BLACK SIDE.webp",
    price: "2,499 NOK",
    colorCode: "#000000",
  },
  {
    id: 4,
    color: "Crystal",
    image: "/ALL SAINTS/CRYSTAL.webp",
    sideImage: "/ALL SAINTS/CRYSTAL SIDE.webp",
    price: "2,499 NOK",
    colorCode: "#E8E8E8",
  },
  {
    id: 5,
    color: "Dusty Pink",
    image: "/ALL SAINTS/DUSTY PINK.webp",
    sideImage: "/ALL SAINTS/DUSTY PINK SIDE.webp",
    price: "2,499 NOK",
    colorCode: "#D4A5A5",
  },
  {
    id: 6,
    color: "Tangerine Orange",
    image: "/ALL SAINTS/TANGERIN ORANGE.webp",
    sideImage: "/ALL SAINTS/TANGERIN ORANGE-SIDE.webp",
    price: "2,499 NOK",
    colorCode: "#FF8C00",
  },
  {
    id: 7,
    color: "White",
    image: "/ALL SAINTS/WHITE.webp",
    sideImage: "/ALL SAINTS/WHITE SIDE.webp",
    price: "2,499 NOK",
    colorCode: "#FFFFFF",
  },
];

export default function AllSaintsMirrorsPage() {
  const [selectedColor, setSelectedColor] = useState(allSaintsMirrors[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left side - Image */}
          <div className="flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="relative w-full max-w-lg aspect-[3/4]">
              <Image
                src={selectedColor.image}
                alt={`${selectedColor.color} mirror`}
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
              All Saints
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                Mirror
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                {selectedColor.color}
              </p>
            </div>

            {/* Price */}
            <div className="text-xl sm:text-2xl font-light text-gray-900">
              {selectedColor.price}
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Color
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {allSaintsMirrors.map((mirror) => (
                  <button
                    key={mirror.id}
                    onClick={() => setSelectedColor(mirror)}
                    className={`relative p-2 sm:p-3 border-2 transition-all text-center ${
                      selectedColor.id === mirror.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full mx-auto mb-1 sm:mb-2 border border-gray-200"
                      style={{ backgroundColor: mirror.colorCode }}
                    />
                    <div className="text-xs text-gray-600 truncate px-1">
                      {mirror.color}
                    </div>
                  </button>
                ))}
              </div>
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
                  <span>Dimensions:</span>
                  <span>80 x 120 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span>Premium mirror glass</span>
                </div>
                <div className="flex justify-between">
                  <span>Frame:</span>
                  <span>Elegant design</span>
                </div>
                <div className="flex justify-between">
                  <span>Mounting:</span>
                  <span>Wall mounting system</span>
                </div>
                <div className="flex justify-between">
                  <span>Made in:</span>
                  <span>Norway</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
