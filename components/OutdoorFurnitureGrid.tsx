"use client";

import Image from "next/image";

const furnitureItems = [
  {
    id: 1,
    image: "/outdoor-collection/10419378r_1-700x700.jpg.avif",
    alt: "Outdoor Furniture 1"
  },
  {
    id: 2,
    image: "/outdoor-collection/10419533_1.jpg",
    alt: "Outdoor Furniture 2"
  },
  {
    id: 3,
    image: "/outdoor-collection/BALCHA-TEAK-r0-700x700.png (1).avif",
    alt: "Outdoor Furniture 3"
  },
  {
    id: 4,
    image: "/outdoor-collection/Capture-2025-06-23-133937.png",
    alt: "Outdoor Furniture 4"
  },
  {
    id: 5,
    image: "/outdoor-collection/FEDC0959DC1B4186A13739B9F80BE8A2-e1714744526959.png",
    alt: "Outdoor Furniture 5"
  },
  {
    id: 6,
    image: "/outdoor-collection/KAR09710MA.webp",
    alt: "Outdoor Furniture 6"
  },
  {
    id: 7,
    image: "/outdoor-collection/KAR0586515-700x891.webp",
    alt: "Outdoor Furniture 7"
  }
];

const OutdoorFurnitureGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1072px] mx-auto px-6 md:px-8 lg:px-0">
      {furnitureItems.map((item) => (
        <div 
          key={item.id}
          className="relative bg-[#eff9ff] rounded-xl overflow-hidden"
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

export default OutdoorFurnitureGrid;
