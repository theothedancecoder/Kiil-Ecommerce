"use client";

import { useState } from "react";
import Image from "next/image";

const juul903Sofas = [
  {
    id: 1,
    name: "Juul 903 - Leather Prestige 18",
    image: "/Juul 903/juul-903-240x86-cm-Leather Prestige-18.jpg",
    price: "149,999 kr",
    material: "Leather Prestige 18",
    color: "Brown",
    dimensions: "240 x 86 cm"
  },
  {
    id: 2,
    name: "Juul 903 - Prestige 10",
    image: "/Juul 903/juul-903-240x86-cm-prestige-10.jpg",
    price: "139,999 kr",
    material: "Prestige 10",
    color: "Light Brown",
    dimensions: "240 x 86 cm"
  },
  {
    id: 3,
    name: "Juul 903 - Prestige 03",
    image: "/Juul 903/Prestige 03.webp",
    price: "139,999 kr",
    material: "Prestige 03",
    color: "Beige",
    dimensions: "240 x 86 cm"
  }
];

const juul301Sofas = [
  {
    id: 4,
    name: "Juul 301 - Mainz 09",
    image: "/Juul 903/JUUL 301/mainz 09.jpg",
    price: "89,999 kr",
    material: "Mainz 09",
    color: "Grey",
    dimensions: "200 x 80 cm"
  },
  {
    id: 5,
    name: "Juul 301 - Tobacco 16",
    image: "/Juul 903/JUUL 301/Tobacco 16.jpg",
    price: "89,999 kr",
    material: "Tobacco 16",
    color: "Brown",
    dimensions: "200 x 80 cm"
  },
  {
    id: 6,
    name: "Juul 301 - Tobacco 37",
    image: "/Juul 903/JUUL 301/Tobacco 37.jpg",
    price: "89,999 kr",
    material: "Tobacco 37",
    color: "Dark Brown",
    dimensions: "200 x 80 cm"
  }
];

export default function Juul903Display() {
  const [selectedCollection, setSelectedCollection] = useState<'903' | '301'>('903');
  const [selectedSofa, setSelectedSofa] = useState(juul903Sofas[0]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const currentSofas = selectedCollection === '903' ? juul903Sofas : juul301Sofas;

  const handleCollectionChange = (collection: '903' | '301') => {
    setSelectedCollection(collection);
    setSelectedSofa(collection === '903' ? juul903Sofas[0] : juul301Sofas[0]);
  };

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif mb-4">Juul Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Premium Danish sofa collection featuring exceptional craftsmanship and timeless design.
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
            <p className="text-sm text-gray-600 mb-1">Maker: Juul</p>
            <h2 className="text-2xl font-semibold mb-2">{selectedSofa.name}</h2>
            <p className="text-2xl font-light text-gray-900">{selectedSofa.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Collection</h3>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => handleCollectionChange('903')}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  selectedCollection === '903'
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                Juul 903
              </button>
              <button
                onClick={() => handleCollectionChange('301')}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  selectedCollection === '301'
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                Juul 301
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Variants</h3>
            <div className="flex flex-wrap gap-3">
              {currentSofas.map((sofa) => (
                <button
                  key={sofa.id}
                  onClick={() => setSelectedSofa(sofa)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedSofa.id === sofa.id
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {sofa.material}
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
              <li>• Premium Danish craftsmanship</li>
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
