"use client";

import { useState } from "react";
import Image from "next/image";

const palissadeSofas = [
  {
    id: 1,
    name: "Palissade Lounge Sofa - Cream White",
    image: "/Palissade -Lounge Sofa/AA613-A800_Palissade-Lounge-Sofa-cream-white.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Cream White",
    dimensions: "139 x 88 cm"
  },
  {
    id: 2,
    name: "Palissade Lounge Sofa - Sky Grey",
    image: "/Palissade -Lounge Sofa/AA617-A221_Palissade-Lounge-Sofa-sky-grey.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Sky Grey",
    dimensions: "139 x 88 cm"
  },
  {
    id: 3,
    name: "Palissade Lounge Sofa - Hot Galvanised",
    image: "/Palissade -Lounge Sofa/AA617-A234_Palissade-Lounge-Sofa-hot-galvanised.jpg",
    price: "74,999 kr",
    material: "Hot Galvanised Steel",
    color: "Metallic",
    dimensions: "139 x 88 cm"
  },
  {
    id: 4,
    name: "Palissade Lounge Sofa - Iron Red",
    image: "/Palissade -Lounge Sofa/iron red.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Iron Red",
    dimensions: "139 x 88 cm"
  },
  {
    id: 5,
    name: "Palissade Lounge Sofa - Olive",
    image: "/Palissade -Lounge Sofa/olive.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Olive",
    dimensions: "139 x 88 cm"
  },
  {
    id: 6,
    name: "Palissade Lounge Sofa - Anthracite",
    image: "/Palissade -Lounge Sofa/Palissade-Lounge-Sofa-anthracite_Palissade-Lounge-Sofa-Seat-Cushion-anthracite.jpg",
    price: "69,999 kr",
    material: "Powder Coated Steel",
    color: "Anthracite",
    dimensions: "139 x 88 cm"
  }
];

export default function PalissadeLoungeSofaDisplay() {
  const [selectedSofa, setSelectedSofa] = useState(palissadeSofas[0]);
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
        <h1 className="text-4xl font-serif mb-4">Palissade Lounge Sofa Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Contemporary outdoor lounge sofa collection featuring durable steel construction and modern design.
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
            <p className="text-sm text-gray-600 mb-1">Maker: HAY</p>
            <h2 className="text-2xl font-semibold mb-2">{selectedSofa.name}</h2>
            <p className="text-2xl font-light text-gray-900">{selectedSofa.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Colors</h3>
            <div className="flex flex-wrap gap-3">
              {palissadeSofas.map((sofa) => (
                <button
                  key={sofa.id}
                  onClick={() => setSelectedSofa(sofa)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedSofa.id === sofa.id
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {sofa.color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Material: {selectedSofa.material}</li>
              <li>• Color: {selectedSofa.color}</li>
              <li>• Dimensions: {selectedSofa.dimensions}</li>
              <li>• Weather-resistant construction</li>
              <li>• Suitable for outdoor use</li>
              <li>• Optional cushions available</li>
              <li>• Made in Denmark</li>
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
