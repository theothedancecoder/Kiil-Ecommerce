"use client";

import { useState } from "react";
import Image from "next/image";

const flos209730Chandelier = {
  name: "2097/30",
  model: "2097/30 (frosted bulbs)",
  price: "65,999 kr",
  bulbs: "30 x E14",
  dimensions: "94 cm diameter",
  variants: [
    {
      id: 1,
      color: "Brass",
      colorCode: "colour_brass",
      mainImage: "/FLOS/2097-30/Brass.jpg",
      thumbnailImage: "/FLOS/2097-30/Brass.jpg",
      material: "Brass finish"
    },
    {
      id: 2,
      color: "Chrome",
      colorCode: "colour_chrome",
      mainImage: "/FLOS/2097-30/Chrome.jpg",
      thumbnailImage: "/FLOS/2097-30/Chrome.jpg",
      material: "Chrome finish"
    },
    {
      id: 3,
      color: "Matt Black",
      colorCode: "colour_matt-black",
      mainImage: "/FLOS/2097-30/Matt Black.jpg",
      thumbnailImage: "/FLOS/2097-30/Matt Black.jpg",
      material: "Matt black finish"
    },
    {
      id: 4,
      color: "Matt White",
      colorCode: "colour_matt-white",
      mainImage: "/FLOS/2097-30/matte_white.jpg",
      thumbnailImage: "/FLOS/2097-30/matte_white.jpg",
      material: "Matt white finish"
    }
  ]
};

export default function Flos209730Display() {
  const [selectedVariant, setSelectedVariant] = useState(flos209730Chandelier.variants[0]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Column - Image Gallery */}
        <div className="space-y-6">
          <div 
            className="relative w-full aspect-square cursor-pointer group bg-white"
            onClick={() => openModal(selectedVariant.mainImage)}
          >
            <Image
              src={selectedVariant.mainImage}
              alt={`${flos209730Chandelier.name} in ${selectedVariant.color}`}
              fill
              className="object-contain p-4"
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-opacity flex items-center justify-center">
              <div className="bg-white shadow-lg text-gray-800 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                Click to enlarge
              </div>
            </div>
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex gap-3">
            {flos209730Chandelier.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`relative w-16 h-16 border-2 transition-all ${
                  selectedVariant.id === variant.id
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image
                  src={variant.thumbnailImage}
                  alt={variant.color}
                  fill
                  className="object-contain p-2"
                  sizes="64px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-8">
          {/* Product Header */}
          <div>
            <p className="text-sm text-gray-600 mb-2">FLOS</p>
            <h1 className="text-3xl font-light mb-2">{flos209730Chandelier.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{flos209730Chandelier.model}</p>
            <p className="text-2xl font-light">{flos209730Chandelier.price}</p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-medium mb-4">Colour</h3>
            <div className="space-y-3">
              {flos209730Chandelier.variants.map((variant) => (
                <label
                  key={variant.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="color"
                    value={variant.colorCode}
                    checked={selectedVariant.id === variant.id}
                    onChange={() => setSelectedVariant(variant)}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-gray-800">{variant.color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Model Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Model Info</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">{flos209730Chandelier.model}</p>
            </div>
          </div>

          {/* Product Specifications */}
          <div>
            <h3 className="text-lg font-medium mb-4">Specifications</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Material:</span>
                <span>{selectedVariant.material}</span>
              </div>
              <div className="flex justify-between">
                <span>Bulbs:</span>
                <span>{flos209730Chandelier.bulbs}</span>
              </div>
              <div className="flex justify-between">
                <span>Dimensions:</span>
                <span>{flos209730Chandelier.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span>Designer:</span>
                <span>Gino Sarfatti</span>
              </div>
              <div className="flex justify-between">
                <span>Made in:</span>
                <span>Italy</span>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
              <select 
                id="quantity" 
                className="border border-gray-300 rounded px-3 py-2 text-sm"
                defaultValue="1"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            
            <button className="w-full bg-black text-white py-4 px-6 rounded hover:bg-gray-800 transition-colors font-medium">
              Add to Cart
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Professional installation included</p>
            <p>• 2-year manufacturer warranty</p>
            <p>• Free shipping within Norway</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
              ×
            </button>
            <Image
              src={modalImage}
              alt="Expanded chandelier view"
              fill
              className="object-contain"
              sizes="90vw"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
