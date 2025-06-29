"use client";

import { useState } from "react";
import Image from "next/image";

const fredericiaDelphiSofas = [
  {
    id: 1,
    name: "Delphi Sofa - Leather Russet Brown",
    image: "/Fredericia /4511_delphi-sofa--240x85-cm_50841_leather-cera-905-russet-brown_v1.avif",
    price: "89,999 kr",
    material: "Leather Cera 905",
    color: "Russet Brown",
    dimensions: "240 x 85 cm"
  },
  {
    id: 2,
    name: "Delphi Sofa - Steelcut Trio",
    image: "/Fredericia /Delphi Sofa - Steelcut Trio 213.avif",
    price: "79,999 kr",
    material: "Steelcut Trio",
    color: "213",
    dimensions: "240 x 85 cm"
  },
  {
    id: 3,
    name: "Delphi Sofa - Leather Black",
    image: "/Fredericia /Delphi Sofa -Leather Max 98 Black.avif",
    price: "89,999 kr",
    material: "Leather Max 98",
    color: "Black",
    dimensions: "240 x 85 cm"
  }
];

export default function FredericiaDelphiDisplay() {
  const [selectedSofa, setSelectedSofa] = useState(fredericiaDelphiSofas[0]);
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
        <h1 className="text-4xl font-serif mb-4">Fredericia Delphi Sofa Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Elegant and luxurious Delphi sofas by Fredericia, combining timeless design with exceptional comfort and craftsmanship.
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
            <h3 className="text-lg font-medium mb-3">Available Variants</h3>
            <div className="flex flex-wrap gap-3">
              {fredericiaDelphiSofas.map((sofa) => (
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
              <li>• Premium upholstery</li>
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
