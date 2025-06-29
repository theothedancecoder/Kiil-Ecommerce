"use client";

import { useState } from "react";
import Image from "next/image";

const fritzHansen3130UpholsteryColors = [
  {
    id: 1,
    name: "Natural Leather",
    image: "/Grand Prix™ 3130 stol fullpolstret med krom ben/Natural : Natural.png",
    description: "Premium natural leather upholstery with chrome legs",
    price: "12,999 kr",
    colorCode: "#D2B48C",
    fabric: "Natural Leather"
  },
  {
    id: 2,
    name: "Light Beige Christianshavn",
    image: "/Grand Prix™ 3130 stol fullpolstret med krom ben/Christianshavn : Light Beige (1120).png",
    description: "Christianshavn fabric in light beige with chrome legs",
    price: "9,999 kr",
    colorCode: "#F5F5DC",
    fabric: "Christianshavn"
  },
  {
    id: 3,
    name: "White/Black Hallingdal",
    image: "/Grand Prix™ 3130 stol fullpolstret med krom ben/Hallingdal 65 : White Black (166).png",
    description: "Hallingdal 65 fabric in white/black pattern with chrome legs",
    price: "9,499 kr",
    colorCode: "#F0F0F0",
    fabric: "Hallingdal 65"
  },
  {
    id: 4,
    name: "Dusty Blue Vanir",
    image: "/Grand Prix™ 3130 stol fullpolstret med krom ben/Vanir : Dusty Blue (773).png",
    description: "Vanir fabric in dusty blue with chrome legs",
    price: "10,999 kr",
    colorCode: "#6B8CAE",
    fabric: "Vanir"
  }
];

export default function FritzHansenGrandPrix3130UpholsteryPage() {
  const [selectedColor, setSelectedColor] = useState(fritzHansen3130UpholsteryColors[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left side - Image */}
          <div className="flex items-center justify-center bg-gray-50 p-8">
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src={selectedColor.image}
                alt={selectedColor.name}
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
              Fritz Hansen
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                Grand Prix™ 3130
              </h1>
              <p className="text-lg text-gray-600">
                Upholstered stool
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              {selectedColor.price}
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Upholstery
              </h3>
              <div className="flex space-x-3">
                {fritzHansen3130UpholsteryColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
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
                  <span>Arne Jacobsen</span>
                </div>
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span>44 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Seat diameter:</span>
                  <span>34 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span>4.2 kg</span>
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
