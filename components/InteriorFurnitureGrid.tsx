"use client";

import Image from "next/image";
import { useState } from "react";

const furnitureItems = [
  // Montana Collection
  {
    id: 1,
    image: "/interior-collection/montana/Montana_Collection2017_Keep_3000x3000.jpg",
    alt: "Montana Keep Collection"
  },
  {
    id: 2,
    image: "/interior-collection/montana/Montana_Collection2017_Rest_3000x3000.jpg",
    alt: "Montana Rest Collection"
  },
  {
    id: 3,
    image: "/interior-collection/montana/Montana_Collection2017_Dream_3000x3000.jpg",
    alt: "Montana Dream Collection"
  },
  {
    id: 4,
    image: "/interior-collection/montana/Montana_Collection2017_Play_3000x3000.jpg",
    alt: "Montana Play Collection"
  },
  {
    id: 5,
    image: "/interior-collection/montana/Montana_Collection2017_Line_3000x3000.jpg",
    alt: "Montana Line Collection"
  },
  {
    id: 6,
    image: "/interior-collection/montana/Montana_Collection2017_Coat_3000x3000.jpg",
    alt: "Montana Coat Collection"
  },
  {
    id: 7,
    image: "/interior-collection/montana/Montana_Campaign_1118_Fjord_Open-768x1024-1.jpg",
    alt: "Montana Campaign Fjord"
  },
  {
    id: 8,
    image: "/interior-collection/montana/Montana_Campaign_1118_Milk_Open-2.jpg",
    alt: "Montana Campaign Milk"
  },
  // Kartell Collection
  {
    id: 9,
    image: "/interior-collection/kartell/Kartell_Cassinella19537.webp",
    alt: "Kartell Cassinella Chair"
  },
  {
    id: 10,
    image: "/interior-collection/kartell-products/KAR01550CF-314x400.webp",
    alt: "Kartell Chair CF"
  },
  {
    id: 11,
    image: "/interior-collection/kartell-products/KAR08300B4-314x400.webp",
    alt: "Kartell Table B4"
  },
  {
    id: 12,
    image: "/interior-collection/kartell-products/KAR09950AM-314x400.webp",
    alt: "Kartell Chair AM"
  },
  {
    id: 13,
    image: "/interior-collection/kartell-products/KAR09950VE-314x400.webp",
    alt: "Kartell Chair VE"
  },
  {
    id: 14,
    image: "/interior-collection/kartell-products/KAR08305GG-314x400.webp",
    alt: "Kartell Stool GG"
  },
  // Louis Poulsen Lighting
  {
    id: 15,
    image: "/interior-collection/louis-poulsen/63330_63330_Panthella-V3-160-Portable-Opaque-Moss-Green-400x400.webp",
    alt: "Panthella Portable Moss Green"
  },
  {
    id: 16,
    image: "/interior-collection/louis-poulsen/63332_63332_Panthella-V3-160-Portable-Opaque-Burgundy-400x400.webp",
    alt: "Panthella Portable Burgundy"
  },
  // Fjordfiesta Collection
  {
    id: 17,
    image: "/interior-collection/fjordfiesta-products/fjordfiesta_scandiaottoman_hansbrattrud-400x400.webp",
    alt: "Fjordfiesta Scandia Ottoman"
  },
  {
    id: 18,
    image: "/interior-collection/fjordfiesta-products/pur_norsk_fjordfiesta_scandia_treverk_3_1-400x400.jpg",
    alt: "Fjordfiesta Scandia Treverk"
  },
  // Miscellaneous Products
  {
    id: 19,
    image: "/interior-collection/miscellaneous/13290_0_5761-400x400.webp",
    alt: "Interior Accessory"
  },
  {
    id: 20,
    image: "/interior-collection/miscellaneous/144333-400x400.jpg",
    alt: "Interior Furniture"
  },
  {
    id: 21,
    image: "/interior-collection/miscellaneous/149004-400x400.jpg",
    alt: "Interior Design Piece"
  },
  {
    id: 22,
    image: "/interior-collection/miscellaneous/157071-400x400.webp",
    alt: "Interior Accessory"
  },
  {
    id: 23,
    image: "/interior-collection/miscellaneous/162770-400x400.webp",
    alt: "Interior Furniture"
  },
  {
    id: 24,
    image: "/interior-collection/miscellaneous/171450-400x400.webp",
    alt: "Interior Design"
  }
];

const InteriorFurnitureGrid = () => {
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
            className="relative bg-[#fff5f5] rounded-xl overflow-hidden mb-6 sm:mb-8 w-full max-w-[320px] mx-auto cursor-pointer"
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

export default InteriorFurnitureGrid;
