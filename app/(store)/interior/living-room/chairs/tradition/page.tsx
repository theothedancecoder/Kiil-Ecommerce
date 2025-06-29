"use client";

import { useState } from "react";
import Image from "next/image";

const traditionVariants = [
  {
    id: 1,
    name: "Oiled Oak with Ectriture 0640",
    image: "/&Tradition/Little-Petra-VB1_Oiled-Oak-w.-ectriture-0640_angled-front-1200x1600.jpg",
    description: "Oiled oak frame with premium Ectriture 0640 upholstery",
    price: "24,999 kr",
    colorCode: "#D2B48C",
    fabric: "Ectriture 0640"
  },
  {
    id: 2,
    name: "Oiled Oak with Vid 0554",
    image: "/&Tradition/Little-Petra-VB1_Oiled-Oak-w.-vid0554_Angled-front-1200x1600.jpg",
    description: "Oiled oak frame with Vid 0554 fabric upholstery",
    price: "22,999 kr",
    colorCode: "#D2B48C",
    fabric: "Vid 0554"
  },
  {
    id: 3,
    name: "Walnut with Ectriture 0640",
    image: "/&Tradition/Little-Petra-VB1_Walnut-w.-ectriture-0640_angled-front-1200x1600.jpg",
    description: "Walnut frame with premium Ectriture 0640 upholstery",
    price: "26,999 kr",
    colorCode: "#8B4513",
    fabric: "Ectriture 0640"
  },
  {
    id: 4,
    name: "Walnut with Vid 0554",
    image: "/&Tradition/Little-Petra-VB1_Walnut-w.-vid0554_Angled-front-1200x1600.jpg",
    description: "Walnut frame with Vid 0554 fabric upholstery",
    price: "24,999 kr",
    colorCode: "#8B4513",
    fabric: "Vid 0554"
  },
  {
    id: 5,
    name: "Oiled Oak with Sheepskin Moonlight",
    image: "/&Tradition/Little-Petra-VB1-in-Oiled-Oak-w.-Sheepskin-Moonlight-1200x1600.jpg",
    description: "Oiled oak frame with luxurious Sheepskin Moonlight",
    price: "28,999 kr",
    colorCode: "#D2B48C",
    fabric: "Sheepskin Moonlight"
  },
  {
    id: 6,
    name: "Oiled Oak with Sheepskin Sahara",
    image: "/&Tradition/Little-Petra-VB1-in-Oiled-Oak-w.-Sheepskin-Sahara-1200x1600.jpg",
    description: "Oiled oak frame with luxurious Sheepskin Sahara",
    price: "28,999 kr",
    colorCode: "#D2B48C",
    fabric: "Sheepskin Sahara"
  }
];

export default function TraditionPage() {
  const [selectedVariant, setSelectedVariant] = useState(traditionVariants[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left side - Image */}
          <div className="flex items-center justify-center bg-gray-50 p-8">
            <div className="relative w-full max-w-lg aspect-[3/4]">
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
              &Tradition
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                Little Petra VB1
              </h1>
              <p className="text-lg text-gray-600">
                Lounge chair
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              {selectedVariant.price}
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Frame & Upholstery
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {traditionVariants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative p-3 border-2 transition-all text-center ${
                      selectedVariant.id === variant.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: variant.colorCode }}
                    />
                    <div className="text-xs text-gray-600">
                      {variant.fabric}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {selectedVariant.description}
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
                  <span>Viggo Boesen (1938)</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimensions:</span>
                  <span>85 x 85 x 90 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Seat height:</span>
                  <span>42 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span>28 kg</span>
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
