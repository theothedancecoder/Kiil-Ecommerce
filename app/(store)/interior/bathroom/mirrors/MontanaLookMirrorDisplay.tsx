"use client";

import { useState } from "react";
import Image from "next/image";

interface MontanaLookMirror {
  id: number;
  color: string;
  perspectiveImage: string;
  price: string;
  colorCode: string;
}

const montanaLookMirrors: MontanaLookMirror[] = [
  {
    id: 1,
    color: "White",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_White_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#FFFFFF",
  },
  {
    id: 2,
    color: "New White",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_NewWhite_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#F8F8FF",
  },
  {
    id: 3,
    color: "Nordic",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Nordic_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#E8E8E8",
  },
  {
    id: 4,
    color: "Snow",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Snow_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#FFFAFA",
  },
  {
    id: 5,
    color: "Anthracite",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Anthracite_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#36454F",
  },
  {
    id: 6,
    color: "Coal",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Coal_Perspective-700x700.png",
    price: "3,599 NOK",
    colorCode: "#2F2F2F",
  },
  {
    id: 7,
    color: "Graphic",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Graphic_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#2F2F2F",
  },
  {
    id: 8,
    color: "Fjord",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Fjord_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#4A90A4",
  },
  {
    id: 9,
    color: "Coffee",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Coffee_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#6F4E37",
  },
  {
    id: 10,
    color: "Monarch",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Monarch_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#8B4513",
  },
  {
    id: 11,
    color: "Pine",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Pine_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#01796F",
  },
  {
    id: 12,
    color: "Mushroom",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Mushroom_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#C7B299",
  },
  {
    id: 13,
    color: "Juniper",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Juniper_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#4A5D23",
  },
  {
    id: 14,
    color: "Oregano",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Oregano_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#9CAF88",
  },
  {
    id: 15,
    color: "Pomelo",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Pomelo_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#F5DEB3",
  },
  {
    id: 16,
    color: "Truffle",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Truffle_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#3C2415",
  },
  {
    id: 17,
    color: "Amber",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Amber_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#FFBF00",
  },
  {
    id: 18,
    color: "Fennel",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Fennel_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#87A96B",
  },
  {
    id: 19,
    color: "Rosehip",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Rosehip_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#E8B4B8",
  },
  {
    id: 20,
    color: "Hazelnut",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Hazelnut_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#D2B48C",
  },
  {
    id: 21,
    color: "Shadow",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Shadow_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#8A8A8A",
  },
  {
    id: 22,
    color: "Flint",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Flint_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#696969",
  },
  {
    id: 23,
    color: "Vanilla",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Vanilla_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#F3E5AB",
  },
  {
    id: 24,
    color: "Rhubarb",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Rhubarb_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#DA70D6",
  },
  {
    id: 25,
    color: "Parsley",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Parsley_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#355E3B",
  },
  {
    id: 26,
    color: "Azure",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Azure_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#007FFF",
  },
  {
    id: 27,
    color: "Masala",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Masala_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#8B4513",
  },
  {
    id: 28,
    color: "Oyster",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Oyster_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#DAD4B0",
  },
  {
    id: 29,
    color: "Cumin",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Cumin_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#924B00",
  },
  {
    id: 30,
    color: "Oat",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Oat_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#DDD6C0",
  },
  {
    id: 31,
    color: "Camomile",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Camomile_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#F7E98E",
  },
  {
    id: 32,
    color: "Balsamic",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Balsamic_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#4A4A4A",
  },
  {
    id: 33,
    color: "Mist",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Mist_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#C4C4C4",
  },
  {
    id: 34,
    color: "Hokkaido",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Hokkaido_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#F5F5DC",
  },
  {
    id: 35,
    color: "Black Jade",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_BlackJade_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#00A86B",
  },
  {
    id: 36,
    color: "Iris",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Iris_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#5A4FCF",
  },
  {
    id: 37,
    color: "Beetroot",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Beetroot_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#8B0000",
  },
  {
    id: 38,
    color: "Acacia",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Acacia_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#F4A460",
  },
  {
    id: 39,
    color: "Clay",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Clay_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#B66A50",
  },
  {
    id: 40,
    color: "Ruby",
    perspectiveImage: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Ruby_Perspective.png",
    price: "3,599 NOK",
    colorCode: "#E0115F",
  },
];

export default function MontanaLookMirrorDisplay() {
  const [selectedColor, setSelectedColor] = useState(montanaLookMirrors[0]);
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
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>Montana Look Mirrors</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sophisticated look mirrors from Montana featuring premium Danish design and contemporary aesthetics. 
          Perfect for modern interiors and professional spaces.
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
              alt={selectedColor.color + " look mirror"}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedColor.color} Look Mirror</h2>
            <p className="text-2xl font-light text-gray-900">{selectedColor.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Colors</h3>
            <div className="flex flex-wrap gap-3">
              {montanaLookMirrors.map((mirror) => (
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
              <li>• Contemporary design aesthetic</li>
              <li>• Premium mirror glass</li>
              <li>• Danish Montana quality</li>
              <li>• Dimensions: 70 x 100 cm</li>
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
