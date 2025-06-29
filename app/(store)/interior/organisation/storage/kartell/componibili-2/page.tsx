"use client";

import { useState } from "react";
import Image from "next/image";

const kartellColors = [
  {
    id: 1,
    name: "White",
    image: "/Kartell -Componibili classic 2/white.webp",
    description: "Classic white finish for a clean, modern look",
    price: "2,999 kr",
    colorCode: "#FFFFFF",
  },
  {
    id: 2,
    name: "Black",
    image: "/Kartell -Componibili classic 2/black.webp",
    description: "Elegant black finish for sophisticated interiors",
    price: "2,999 kr",
    colorCode: "#000000",
  },
  {
    id: 3,
    name: "Red",
    image: "/Kartell -Componibili classic 2/Red.webp",
    description: "Bold red finish to make a statement",
    price: "2,999 kr",
    colorCode: "#FF0000",
  },
  {
    id: 4,
    name: "Blue",
    image: "/Kartell -Componibili classic 2/blue.webp",
    description: "Vibrant blue for a pop of color",
    price: "2,999 kr",
    colorCode: "#0066CC",
  },
  {
    id: 5,
    name: "Green",
    image: "/Kartell -Componibili classic 2/green.webp",
    description: "Fresh green finish for natural vibes",
    price: "2,999 kr",
    colorCode: "#00AA00",
  },
  {
    id: 6,
    name: "Orange",
    image: "/Kartell -Componibili classic 2/Orange.webp",
    description: "Energetic orange for dynamic spaces",
    price: "2,999 kr",
    colorCode: "#FF8800",
  },
  {
    id: 7,
    name: "Silver",
    image: "/Kartell -Componibili classic 2/Silver.webp",
    description: "Metallic silver for a contemporary look",
    price: "3,299 kr",
    colorCode: "#C0C0C0",
  },
  {
    id: 8,
    name: "Sky Blue",
    image: "/Kartell -Componibili classic 2/Sky Blue.webp",
    description: "Light sky blue for airy spaces",
    price: "2,999 kr",
    colorCode: "#87CEEB",
  },
  {
    id: 9,
    name: "Burgundy",
    image: "/Kartell -Componibili classic 2/burgundy.webp",
    description: "Rich burgundy for luxurious interiors",
    price: "2,999 kr",
    colorCode: "#800020",
  },
  {
    id: 10,
    name: "Mauve",
    image: "/Kartell -Componibili classic 2/Mauve.webp",
    description: "Soft mauve for elegant spaces",
    price: "2,999 kr",
    colorCode: "#E0B0FF",
  },
  {
    id: 11,
    name: "Violet",
    image: "/Kartell -Componibili classic 2/Violet.webp",
    description: "Deep violet for creative environments",
    price: "2,999 kr",
    colorCode: "#8A2BE2",
  },
  {
    id: 12,
    name: "Taupe",
    image: "/Kartell -Componibili classic 2/Taupe.webp",
    description: "Neutral taupe for versatile styling",
    price: "2,999 kr",
    colorCode: "#483C32",
  }
];

export default function KartellComponibili2Page() {
  const [selectedColor, setSelectedColor] = useState(kartellColors[0]);
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
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>Kartell Componibili Classic 2</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The compact version of the iconic Componibili storage unit by Kartell. A 2-compartment modular design classic that combines functionality with Italian style. Perfect for smaller spaces.
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
              alt={selectedColor.name + " Componibili Classic 2"}
              fill
              className="object-contain rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-sm text-gray-600 mb-2">KARTELL</p>
            <h2 className="text-2xl font-semibold mb-2">Componibili Classic 2</h2>
            <p className="text-lg text-gray-600 mb-4">{selectedColor.name}</p>
            <p className="text-2xl font-light text-gray-900">{selectedColor.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Colors</h3>
            <div className="grid grid-cols-6 gap-3">
              {kartellColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className="relative group"
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor.id === color.id
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.colorCode }}
                  />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Color Description</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">{selectedColor.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Material: ABS Plastic</li>
              <li>• Dimensions: Ø 32 cm, H 40 cm</li>
              <li>• 2 stackable compartments</li>
              <li>• Designer: Anna Castelli Ferrieri</li>
              <li>• Brand: Kartell</li>
              <li>• Made in: Italy</li>
              <li>• Easy assembly required</li>
              <li>• Modular design - stackable</li>
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
              alt="Expanded storage view"
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
