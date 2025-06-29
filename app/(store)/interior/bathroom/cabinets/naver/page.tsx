"use client";

import { useState } from "react";
import Image from "next/image";

const naverFinishes = [
  {
    id: 1,
    name: "Hvitoljet Eik",
    englishName: "White Oiled Oak",
    image: "/Naver/Farge - Hvitoljet eik.png",
    description: "Light and airy white oiled oak finish that brings brightness and warmth to any space",
    price: "12,999 kr",
    colorCode: "#F5F5DC", // Beige/cream color for white oiled oak
  },
  {
    id: 2,
    name: "Oljet Eik",
    englishName: "Oiled Oak",
    image: "/Naver/Farge - Oljet eik.png",
    description: "Natural oiled oak with warm tones that showcase the beautiful grain patterns",
    price: "12,999 kr",
    colorCode: "#D2B48C", // Tan color for natural oak
  },
  {
    id: 3,
    name: "Oljet Valnøtt",
    englishName: "Oiled Walnut",
    image: "/Naver/Farge - Oljet valnøtt.png",
    description: "Rich oiled walnut with deep grain and warm tones",
    price: "15,999 kr",
    colorCode: "#8B4513", // Saddle brown for walnut
  },
  {
    id: 4,
    name: "Såpet Eik",
    englishName: "Soaped Oak",
    image: "/Naver/Farge - Såpet eik.png",
    description: "Traditional soaped oak finish with a soft, matte surface",
    price: "12,999 kr",
    colorCode: "#DEB887", // Burlywood for soaped oak
  }
];

export default function NaverPage() {
  const [selectedFinish, setSelectedFinish] = useState(naverFinishes[0]);
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
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>Naver Cabinet Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Naver creates timeless Scandinavian furniture with exceptional craftsmanship. Each piece is made from premium wood with traditional finishing techniques.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div 
            className="relative w-full aspect-square cursor-pointer"
            onClick={() => openModal(selectedFinish.image)}
          >
            <Image
              src={selectedFinish.image}
              alt={selectedFinish.name + " cabinet"}
              fill
              className="object-contain rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-sm text-gray-600 mb-2">NAVER</p>
            <h2 className="text-2xl font-semibold mb-2">Cabinet Collection</h2>
            <p className="text-lg text-gray-600 mb-4">{selectedFinish.name} ({selectedFinish.englishName})</p>
            <p className="text-2xl font-light text-gray-900">{selectedFinish.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Finishes</h3>
            <div className="flex flex-wrap gap-3">
              {naverFinishes.map((finish) => (
                <button
                  key={finish.id}
                  onClick={() => setSelectedFinish(finish)}
                  className="relative group"
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedFinish.id === finish.id
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: finish.colorCode }}
                  />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {finish.englishName}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Finish Description</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">{selectedFinish.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Material: {selectedFinish.id === 3 ? 'Solid Walnut Wood' : 'Solid Oak Wood'}</li>
              <li>• Finish: {selectedFinish.englishName}</li>
              <li>• Style: Scandinavian</li>
              <li>• Brand: Naver</li>
              <li>• Made in: Denmark</li>
              <li>• Professional assembly available</li>
              <li>• 5-year manufacturer warranty</li>
            </ul>
          </div>

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
            
            <button className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
          </div>
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
              alt="Expanded cabinet view"
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
