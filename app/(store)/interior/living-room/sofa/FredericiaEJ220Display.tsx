"use client";

import { useState } from "react";
import Image from "next/image";

const fredericiaEJ220Sofas = [
  {
    id: 1,
    name: "EJ220 Sofa - Erik 3790 Linen",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Erik 3790 Linen.avif",
    price: "79,999 kr",
    material: "Erik 3790 Linen",
    color: "Linen",
    dimensions: "150 x 85 cm"
  },
  {
    id: 2,
    name: "EJ220 Sofa - Erik 9998 Broken Grey",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Erik 9998 Broken Grey.avif",
    price: "79,999 kr",
    material: "Erik 9998",
    color: "Broken Grey",
    dimensions: "150 x 85 cm"
  },
  {
    id: 3,
    name: "EJ220 Sofa - Leather Max 95 Cognac",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Leather Max 95 Cognac.avif",
    price: "94,999 kr",
    material: "Leather Max 95",
    color: "Cognac",
    dimensions: "150 x 85 cm"
  },
  {
    id: 4,
    name: "EJ220 Sofa - Leather Omni 301 Black",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Leather Omni 301 Black.avif",
    price: "94,999 kr",
    material: "Leather Omni 301",
    color: "Black",
    dimensions: "150 x 85 cm"
  },
  {
    id: 5,
    name: "EJ220 Sofa - Re-Wool 128",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Re-Wool 128.avif",
    price: "84,999 kr",
    material: "Re-Wool 128",
    color: "Grey",
    dimensions: "150 x 85 cm"
  },
  {
    id: 6,
    name: "EJ220 Sofa - Re-Wool 198",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Re-Wool 198.avif",
    price: "84,999 kr",
    material: "Re-Wool 198",
    color: "Blue",
    dimensions: "150 x 85 cm"
  }
];

export default function FredericiaEJ220Display() {
  const [selectedSofa, setSelectedSofa] = useState(fredericiaEJ220Sofas[0]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif mb-4">Fredericia EJ220 Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Classic Danish design sofa collection by Fredericia featuring timeless elegance and superior comfort.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div 
            className="relative w-full aspect-[4/3] cursor-pointer"
            onClick={() => openModal(selectedSofa.image)}
          >
            <Image
              src={selectedSofa.image}
              alt={selectedSofa.name}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Maker: Fredericia</p>
            <h2 className="text-2xl font-semibold mb-2">{selectedSofa.name}</h2>
            <p className="text-2xl font-light text-gray-900">{selectedSofa.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Sizes</h3>
            <div className="flex flex-wrap gap-3">
              {fredericiaEJ220Sofas.map((sofa) => (
                <button
                  key={sofa.id}
                  onClick={() => setSelectedSofa(sofa)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedSofa.id === sofa.id
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {sofa.name.split(' - ')[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Size: {selectedSofa.name.split(' - ')[1]}</li>
              <li>• Material: {selectedSofa.material}</li>
              <li>• Color: {selectedSofa.color}</li>
              <li>• Dimensions: {selectedSofa.dimensions}</li>
              <li>• Classic Danish design heritage</li>
              <li>• Made in Denmark</li>
              <li>• Professional assembly included</li>
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
              alt="Expanded sofa view"
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
