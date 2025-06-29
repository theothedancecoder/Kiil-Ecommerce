"use client";

import { useState } from "react";
import Image from "next/image";

interface MontanaAroundMirror {
  id: number;
  color: string;
  perspectiveImage: string;
  price: string;
  colorCode: string;
}

const montanaAroundMirrors: MontanaAroundMirror[] = [
  {
    id: 1,
    color: "White",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#FFFFFF",
  },
  {
    id: 2,
    color: "New White",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_101-New-White_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#F8F8FF",
  },
  {
    id: 3,
    color: "Nordic",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_09-Nordic_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#E8E8E8",
  },
  {
    id: 4,
    color: "Snow",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_38-Snow_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#FFFAFA",
  },
  {
    id: 5,
    color: "Black",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_05-Black_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#000000",
  },
  {
    id: 6,
    color: "Anthracite",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_04-Anthracite_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#36454F",
  },
  {
    id: 7,
    color: "Coal",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_36-Coal_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#2F2F2F",
  },
  {
    id: 8,
    color: "Graphic",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_100-Graphic_Perspective-700x700.png",
    price: "3,999 NOK",
    colorCode: "#2F2F2F",
  },
  {
    id: 9,
    color: "Fjord",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_02-Fjord_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#4A90A4",
  },
  {
    id: 10,
    color: "Coffee",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_35-Coffee_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#6F4E37",
  },
  {
    id: 11,
    color: "Monarch",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_135-Monarch_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#8B4513",
  },
  {
    id: 12,
    color: "Pine",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_136-Pine_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#01796F",
  },
  {
    id: 13,
    color: "Mushroom",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_137-Mushroom_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#C7B299",
  },
  {
    id: 14,
    color: "Juniper",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_138-Juniper_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#4A5D23",
  },
  {
    id: 15,
    color: "Oregano",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_139-Oregano_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#9CAF88",
  },
  {
    id: 16,
    color: "Pomelo",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_140-Pomelo_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#F5DEB3",
  },
  {
    id: 17,
    color: "Truffle",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_141-Truffle_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#3C2415",
  },
  {
    id: 18,
    color: "Amber",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_142-Amber_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#FFBF00",
  },
  {
    id: 19,
    color: "Fennel",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_144-Fennel_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#87A96B",
  },
  {
    id: 20,
    color: "Rosehip",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_145-Rosehip_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#E8B4B8",
  },
  {
    id: 21,
    color: "Hazelnut",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_146-Hazelnut_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#D2B48C",
  },
  {
    id: 22,
    color: "Shadow",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_147-Shadow_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#8A8A8A",
  },
  {
    id: 23,
    color: "Flint",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_148-Flint_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#696969",
  },
  {
    id: 24,
    color: "Vanilla",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_150-Vanilla_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#F3E5AB",
  },
  {
    id: 25,
    color: "Rhubarb",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_151-Rhubarb_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#DA70D6",
  },
  {
    id: 26,
    color: "Parsley",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_152-Parsley_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#355E3B",
  },
  {
    id: 27,
    color: "Azure",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_154-Azure_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#007FFF",
  },
  {
    id: 28,
    color: "Masala",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_155-Masala_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#8B4513",
  },
  {
    id: 29,
    color: "Oyster",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_156-Oyster_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#DAD4B0",
  },
  {
    id: 30,
    color: "Cumin",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_157-Cumin_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#924B00",
  },
  {
    id: 31,
    color: "Oat",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_158-Oat_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#DDD6C0",
  },
  {
    id: 32,
    color: "Camomile",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_159-Camomile_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#F7E98E",
  },
  {
    id: 33,
    color: "Balsamic",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_160-Balsamic_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#4A4A4A",
  },
  {
    id: 34,
    color: "Mist",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_161-Mist_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#C4C4C4",
  },
  {
    id: 35,
    color: "Hokkaido",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_162-Hokkaido_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#F5F5DC",
  },
  {
    id: 36,
    color: "Black Jade",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_163-Black-Jade_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#00A86B",
  },
  {
    id: 37,
    color: "Iris",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_164-Iris_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#5A4FCF",
  },
  {
    id: 38,
    color: "Beetroot",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_165-Beetroot_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#8B0000",
  },
  {
    id: 39,
    color: "Acacia",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Acacia_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#F4A460",
  },
  {
    id: 40,
    color: "Clay",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Clay_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#B66A50",
  },
  {
    id: 41,
    color: "Ruby",
    perspectiveImage: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Ruby_Perspective.png",
    price: "3,999 NOK",
    colorCode: "#E0115F",
  },
];

export default function MontanaAroundMirrorDisplay() {
  const [selectedColor, setSelectedColor] = useState(montanaAroundMirrors[0]);
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
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>Montana Around Mirrors</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Distinctive around mirrors from Montana featuring innovative Danish design and exceptional quality. 
          Perfect for creating focal points in contemporary and modern interiors.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div 
            className="relative w-full aspect-square cursor-pointer"
            onClick={() => openModal(selectedColor.perspectiveImage)}
          >
            <Image
              src={selectedColor.perspectiveImage}
              alt={selectedColor.color + " around mirror"}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedColor.color} Around Mirror</h2>
            <p className="text-2xl font-light text-gray-900">{selectedColor.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Colors</h3>
            <div className="flex flex-wrap gap-3">
              {montanaAroundMirrors.map((mirror) => (
                <button
                  key={mirror.id}
                  onClick={() => setSelectedColor(mirror)}
                  className="relative group"
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor.id === mirror.id
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: mirror.colorCode }}
                  />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {mirror.color}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Innovative around design</li>
              <li>• Premium mirror glass</li>
              <li>• Danish Montana excellence</li>
              <li>• Dimensions: 80 x 110 cm</li>
              <li>• Professional mounting system</li>
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
              alt="Expanded mirror view"
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
