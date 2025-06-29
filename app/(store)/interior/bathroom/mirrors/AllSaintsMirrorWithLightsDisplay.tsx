"use client";

import { useState } from "react";
import Image from "next/image";

interface AllSaintsMirrorWithLights {
  id: number;
  color: string;
  image: string;
  price: string;
  colorCode: string;
}

const allSaintsMirrorsWithLights: AllSaintsMirrorWithLights[] = [
  {
    id: 1,
    color: "Amber",
    image: "/ALL SAINTS MIRROR WITH LIGHT/ALL SAINTS MIRROR WITH LIGHTS - Amber.webp",
    price: "2,899 NOK",
    colorCode: "#FFBF00",
  },
  {
    id: 2,
    color: "Aquamarine Green",
    image: "/ALL SAINTS MIRROR WITH LIGHT/ALL SAINTS MIRROR WITH LIGHS-Aquamarine green.webp",
    price: "2,899 NOK",
    colorCode: "#7FFFD4",
  },
  {
    id: 3,
    color: "Crystal",
    image: "/ALL SAINTS MIRROR WITH LIGHT/ALL SAINTS MIRROR WITH LYS CRYSTAL.webp",
    price: "2,899 NOK",
    colorCode: "#E6E6FA",
  },
  {
    id: 4,
    color: "Dusty Pink",
    image: "/ALL SAINTS MIRROR WITH LIGHT/ALL SAINT MIRROR WITH LYS - DUSTY PINK.webp",
    price: "2,899 NOK",
    colorCode: "#D4A5A5",
  },
  {
    id: 5,
    color: "Tangerine Orange",
    image: "/ALL SAINTS MIRROR WITH LIGHT/ALL SAINTS MIRROR WITH LYS-- Tangerine orange.webp",
    price: "2,899 NOK",
    colorCode: "#FF8C00",
  },
];

export default function AllSaintsMirrorWithLightsDisplay() {
  const [selectedColor, setSelectedColor] = useState(allSaintsMirrorsWithLights[0]);
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
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>All Saints Mirrors with Lights</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Elegant and illuminated mirrors crafted by All Saints featuring integrated lighting systems. 
          Perfect for creating ambient lighting while providing exceptional functionality and style.
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
              alt={selectedColor.color + " mirror with lights"}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedColor.color} Mirror with Lights</h2>
            <p className="text-2xl font-light text-gray-900">{selectedColor.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Colors</h3>
            <div className="flex flex-wrap gap-3">
              {allSaintsMirrorsWithLights.map((mirror) => (
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
              <li>• Integrated LED lighting system</li>
              <li>• Premium mirror glass</li>
              <li>• Energy-efficient illumination</li>
              <li>• Dimensions: 70 x 90 cm</li>
              <li>• Touch-sensitive light controls</li>
              <li>• Professional installation included</li>
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
