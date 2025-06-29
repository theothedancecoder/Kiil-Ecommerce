"use client";

import { useState } from "react";
import Image from "next/image";

const fritzHansenUpholsteryColors = [
  {
    id: 1,
    name: "Oak with Black/Grey Upholstery",
    image: "/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Oak.png",
    description: "Clear lacquered oak veneer with Hallingdal 65 Black/Grey upholstery",
    price: "8,999 kr",
    colorCode: "#D2B48C",
    fabricCode: "368"
  },
  {
    id: 2,
    name: "Walnut with Black/Grey Upholstery",
    image: "/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Walnut.png",
    description: "Clear lacquered walnut veneer with Hallingdal 65 Black/Grey upholstery",
    price: "9,999 kr",
    colorCode: "#8B4513",
    fabricCode: "368"
  },
  {
    id: 3,
    name: "Black Ash with Black/Grey Upholstery",
    image: "/Fritz Hansen Grand Prix 4130 Upholstery/Coloured Veneer : Ash - Black (195).png",
    description: "Black ash veneer with Hallingdal 65 Black/Grey upholstery",
    price: "8,999 kr",
    colorCode: "#2C2C2C",
    fabricCode: "368"
  },
  {
    id: 4,
    name: "Oak with White/Black Upholstery",
    image: "/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : White Black (166)png.png",
    description: "Clear lacquered oak veneer with Hallingdal 65 White/Black upholstery",
    price: "8,999 kr",
    colorCode: "#D2B48C",
    fabricCode: "166"
  }
];

export default function FritzHansenGrandPrix4130UpholsteryPage() {
  const [selectedColor, setSelectedColor] = useState(fritzHansenUpholsteryColors[0]);
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
                Grand Prix™ 4130
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
                Finish & Upholstery
              </h3>
              <div className="flex space-x-3">
                {fritzHansenUpholsteryColors.map((color) => (
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
                  >
                    {/* Fabric indicator */}
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white"
                      style={{ backgroundColor: color.fabricCode === "368" ? "#444" : "#EEE" }}
                    />
                  </button>
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
                  <span>46 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Seat diameter:</span>
                  <span>35 cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span>3.5 kg</span>
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
