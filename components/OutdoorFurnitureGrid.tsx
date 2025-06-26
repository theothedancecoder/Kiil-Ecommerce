"use client";

import Image from "next/image";
import { useState } from "react";

const furnitureItems = [
  {
    id: 1,
    image: "/outdoor-collection/10419378r_1-700x700.jpg.avif",
    alt: "Outdoor Dining Set"
  },
  {
    id: 2,
    image: "/outdoor-collection/10419533_1.jpg",
    alt: "Outdoor Lounge Chair"
  },
  {
    id: 3,
    image: "/outdoor-collection/BALCHA-TEAK-r0-700x700.png (1).avif",
    alt: "Balcha Teak Furniture"
  },
  {
    id: 4,
    image: "/outdoor-collection/KAR09710MA.webp",
    alt: "Kartell Outdoor Chair"
  },
  {
    id: 5,
    image: "/outdoor-collection/KAR0586515-700x891.webp",
    alt: "Kartell Outdoor Table"
  },
  {
    id: 6,
    image: "/outdoor-collection/16552_0_55-700x700.webp",
    alt: "Outdoor Seating"
  },
  {
    id: 7,
    image: "/outdoor-collection/FEDC0959DC1B4186A13739B9F80BE8A2-e1714744526959.png",
    alt: "Outdoor Furniture Set"
  },
  {
    id: 8,
    image: "/outdoor-collection/miscellaneous/helios-firebowl-400x400.webp",
    alt: "Helios Firebowl"
  },
  {
    id: 9,
    image: "/outdoor-collection/Capture-2025-06-23-133937.png",
    alt: "Outdoor Collection Display"
  }
];

const OutdoorFurnitureGrid = () => {
  const [selectedImage, setSelectedImage] = useState<{ image: string; alt: string } | null>(null);

  const openModal = (image: string, alt: string) => {
    setSelectedImage({ image, alt });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-14 max-w-[1072px] mx-auto px-4 sm:px-6 md:px-8 lg:px-0 py-8">
        {furnitureItems.map((item) => (
          <div 
            key={item.id}
            className="relative bg-[#eff9ff] rounded-xl overflow-hidden mb-6 sm:mb-8 w-full max-w-[320px] mx-auto cursor-pointer"
            style={{
              aspectRatio: "1/1"
            }}
            onClick={() => openModal(item.image, item.alt)}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
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
              src={selectedImage.image}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OutdoorFurnitureGrid;
