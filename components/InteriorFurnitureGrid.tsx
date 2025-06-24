"use client";

import Image from "next/image";

const furnitureItems = [
  {
    id: 1,
    image: "/Kartell_Cassinella19537.webp",
    alt: "Interior Furniture 1"
  },
  {
    id: 2,
    image: "/montana_pantonwire_d35_blackred_rosehiptop_h.webp",
    alt: "Interior Furniture 2"
  },
  {
    id: 3,
    image: "/Kartell_Cassinella19537.webp",
    alt: "Interior Furniture 3"
  },
  {
    id: 4,
    image: "/montana_pantonwire_d35_blackred_rosehiptop_h.webp",
    alt: "Interior Furniture 4"
  },
  {
    id: 5,
    image: "/Kartell_Cassinella19537.webp",
    alt: "Interior Furniture 5"
  },
  {
    id: 6,
    image: "/montana_pantonwire_d35_blackred_rosehiptop_h.webp",
    alt: "Interior Furniture 6"
  },
  {
    id: 7,
    image: "/Kartell_Cassinella19537.webp",
    alt: "Interior Furniture 7"
  }
];

const InteriorFurnitureGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-[1072px] mx-auto px-6 md:px-8 lg:px-0">
      {furnitureItems.map((item) => (
        <div 
          key={item.id}
          className="relative bg-[#fff5f5] rounded-xl overflow-hidden"
          style={{
            width: "242.66px",
            height: "242.66px"
          }}
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 242px) 100vw, 242px"
          />
        </div>
      ))}
    </div>
  );
};

export default InteriorFurnitureGrid;
