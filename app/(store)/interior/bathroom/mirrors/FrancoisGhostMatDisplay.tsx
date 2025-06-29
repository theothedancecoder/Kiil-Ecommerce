"use client";

import { useState } from "react";
import Image from "next/image";

const francoisGhostMatMirrors = [
  {
    id: 1,
    color: "Black",
    image: "/FRANCOIS GHOST MAT/FRANCOIS GHOST MAT BLACK.webp",
    sideImage: "/FRANCOIS GHOST MAT/FRANCOIS GHOST MAT BLACK SIDE VIEW.webp",
    price: "2,799 NOK",
    colorCode: "#000000",
  },
  {
    id: 2,
    color: "White",
    image: "/FRANCOIS GHOST MAT/FRANCOIS GHOST MAT -WHITE.webp",
    sideImage: "/FRANCOIS GHOST MAT/FRANCOIS GHOST MAT WHITE -SIDEVIEW.webp",
    price: "2,799 NOK",
    colorCode: "#FFFFFF",
  },
];

export default function FrancoisGhostMatDisplay() {
  const [selectedColor, setSelectedColor] = useState(francoisGhostMatMirrors[0]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>Francois Ghost Mat Mirrors</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Modern and sleek Francois Ghost Mat mirrors designed to elevate your bathroom aesthetics with minimalist elegance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div 
            className="relative w-full aspect-square cursor-pointer"
            onClick={() => openModal(selectedColor.image)}
          >
            <Image
              src={selectedColor.image}
              alt={selectedColor.color + " mirror"}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
          <div 
            className="relative w-full aspect-[3/2] cursor-pointer"
            onClick={() => openModal(selectedColor.sideImage)}
          >
            <Image
              src={selectedColor.sideImage}
              alt={selectedColor.color + " mirror side view"}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-center flex-nowrap">
            <span 
              className="text-red-600 flex-shrink-0"
              style={{ 
                fontFamily: 'Montserrat, Verdana, Helvetica',
                fontSize: '14px'
              }}
            >
              Price: {selectedColor.price.replace('NOK', 'kr')}
            </span>
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0">
              View
            </button>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Colors</h3>
            <div className="flex flex-wrap gap-3">
              {francoisGhostMatMirrors.map((mirror) => (
                <button
                  key={mirror.id}
                  onClick={() => setSelectedColor(mirror)}
                  className="relative group"
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor.id === mirror.id
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: mirror.colorCode }}
                  />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {mirror.color}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Premium matte finish glass</li>
              <li>• Sleek minimalist frame</li>
              <li>• Dimensions: 75 x 115 cm</li>
              <li>• Easy wall mounting system</li>
              <li>• Made in Norway</li>
            </ul>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>

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
              alt="Expanded mirror view"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
