"use client";

import { useState } from "react";
import Image from "next/image";

const traditionsVariants = [
  {
    id: 1,
    name: "RFH Armchair - Black with Walnut and Beech, Hallingdal 103",
    image: "/&traditions./RFH-Armchair-RD7_Black-w.-Walnut-and-Beech-and-Hallingdal-103_Angled-front-1200x1600.jpg",
    description: "Black frame with walnut and beech details, upholstered in Hallingdal 103",
    price: "26,999 kr",
    fabric: "Hallingdal 103",
    colorCode: "#2F4F4F"
  },
  {
    id: 2,
    name: "RFH Armchair - Black with Walnut and Beech, Hallingdal 227",
    image: "/&traditions./RFH-Armchair-RD7_Black-w.-Walnut-and-Beech-and-Hallingdal-227_Angled-front-1200x1600.jpg",
    description: "Black frame with walnut and beech details, upholstered in Hallingdal 227",
    price: "26,999 kr",
    fabric: "Hallingdal 227",
    colorCode: "#8B4513"
  }
];

export default function TraditionsPage() {
  const [selectedVariant, setSelectedVariant] = useState(traditionsVariants[0]);
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
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>&traditions RFH Armchair</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The RFH Armchair represents &traditions' commitment to combining traditional craftsmanship with contemporary design. This sophisticated piece features premium materials and expert upholstery.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div 
            className="relative w-full aspect-[3/4] cursor-pointer"
            onClick={() => openModal(selectedVariant.image)}
          >
            <Image
              src={selectedVariant.image}
              alt={selectedVariant.name}
              fill
              className="object-contain rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-sm text-gray-600 mb-2">&TRADITIONS</p>
            <h2 className="text-2xl font-semibold mb-2">RFH Armchair</h2>
            <p className="text-lg text-gray-600 mb-4">{selectedVariant.fabric}</p>
            <p className="text-2xl font-light text-gray-900">{selectedVariant.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Upholstery</h3>
            <div className="grid grid-cols-2 gap-3">
              {traditionsVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className="relative group"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedVariant.id === variant.id
                          ? "border-red-600"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: variant.colorCode }}
                    />
                    <div className="text-xs mt-1 text-center">
                      {variant.fabric}
                    </div>
                  </div>
                  <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {variant.fabric}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Upholstery Description</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">{selectedVariant.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Frame: Black with walnut and beech details</li>
              <li>• Upholstery: {selectedVariant.fabric}</li>
              <li>• Model: RFH Armchair RD7</li>
              <li>• Dimensions: 75 x 85 x 90 cm</li>
              <li>• Seat height: 44 cm</li>
              <li>• Weight: 24 kg</li>
              <li>• Made in: Denmark</li>
              <li>• Assembly: Fully assembled</li>
              <li>• Care: Professional cleaning recommended</li>
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
              </select>
            </div>
            
            <button className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">About &traditions</h4>
            <p className="text-sm text-gray-600">
              &traditions is a Danish design company that creates furniture and lighting with a focus on craftsmanship, simplicity, and functionality. Each piece reflects a deep respect for traditional techniques combined with contemporary innovation.
            </p>
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
              alt="Expanded chair view"
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
