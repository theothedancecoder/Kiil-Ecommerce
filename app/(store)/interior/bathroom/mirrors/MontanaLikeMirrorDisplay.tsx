"use client";

import { useState } from "react";
import Image from "next/image";

interface MontanaLikeMirror {
  id: number;
  color: string;
  perspectiveImage: string;
  price: string;
  colorCode: string;
}

const montanaLikeMirrors: MontanaLikeMirror[] = [
  {
    id: 1,
    color: "White",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_White_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#FFFFFF",
  },
  {
    id: 2,
    color: "New White",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_NewWhite_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#F8F8FF",
  },
  {
    id: 3,
    color: "Nordic",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Nordic_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#E8E8E8",
  },
  {
    id: 4,
    color: "Snow",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Snow_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#FFFAFA",
  },
  {
    id: 5,
    color: "Black",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Black_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#000000",
  },
  {
    id: 6,
    color: "Anthracite",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Anthracite_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#36454F",
  },
  {
    id: 7,
    color: "Coal",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Coal_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#2F2F2F",
  },
  {
    id: 8,
    color: "Graphic",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Graphic_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#2F2F2F",
  },
  {
    id: 9,
    color: "Fjord",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Fjord_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#4A90A4",
  },
  {
    id: 10,
    color: "Coffee",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Coffee_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#6F4E37",
  },
  {
    id: 11,
    color: "Monarch",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Monarch_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#8B4513",
  },
  {
    id: 12,
    color: "Pine",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Pine_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#01796F",
  },
  {
    id: 13,
    color: "Mushroom",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Mushroom_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#C7B299",
  },
  {
    id: 14,
    color: "Juniper",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Juniper_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#4A5D23",
  },
  {
    id: 15,
    color: "Oregano",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Oregano_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#9CAF88",
  },
  {
    id: 16,
    color: "Pomelo",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Pomelo_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#F5DEB3",
  },
  {
    id: 17,
    color: "Truffle",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Truffle_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#3C2415",
  },
  {
    id: 18,
    color: "Amber",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Amber_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#FFBF00",
  },
  {
    id: 19,
    color: "Fennel",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Fennel_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#87A96B",
  },
  {
    id: 20,
    color: "Rosehip",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Rosehip_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#E8B4B8",
  },
  {
    id: 21,
    color: "Hazelnut",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Hazelnut_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#D2B48C",
  },
  {
    id: 22,
    color: "Shadow",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Shadow_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#8A8A8A",
  },
  {
    id: 23,
    color: "Flint",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Flint_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#696969",
  },
  {
    id: 24,
    color: "Vanilla",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Vanilla_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#F3E5AB",
  },
  {
    id: 25,
    color: "Rhubarb",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Rhubarb_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#DA70D6",
  },
  {
    id: 26,
    color: "Parsley",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Parsley_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#355E3B",
  },
  {
    id: 27,
    color: "Azure",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Azure_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#007FFF",
  },
  {
    id: 28,
    color: "Masala",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Masala_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#8B4513",
  },
  {
    id: 29,
    color: "Oyster",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Oyster_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#DAD4B0",
  },
  {
    id: 30,
    color: "Cumin",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Cumin_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#924B00",
  },
  {
    id: 31,
    color: "Oat",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Oat_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#DDD6C0",
  },
  {
    id: 32,
    color: "Camomile",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Camomile_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#F7E98E",
  },
  {
    id: 33,
    color: "Balsamic",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Balsamic_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#4A4A4A",
  },
  {
    id: 34,
    color: "Mist",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Mist_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#C4C4C4",
  },
  {
    id: 35,
    color: "Hokkaido",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Hokkaido_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#F5F5DC",
  },
  {
    id: 36,
    color: "Black Jade",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_BlackJade_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#00A86B",
  },
  {
    id: 37,
    color: "Iris",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Iris_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#5A4FCF",
  },
  {
    id: 38,
    color: "Beetroot",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Beetroot_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#8B0000",
  },
  {
    id: 39,
    color: "Acacia",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Acacia_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#F4A460",
  },
  {
    id: 40,
    color: "Clay",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Clay_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#B66A50",
  },
  {
    id: 41,
    color: "Ruby",
    perspectiveImage: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Ruby_Perspective.png",
    price: "3,799 NOK",
    colorCode: "#E0115F",
  },
];

export default function MontanaLikeMirrorDisplay() {
  const [selectedColor, setSelectedColor] = useState(montanaLikeMirrors[0]);
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
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>Montana Like Mirrors</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Premium like mirrors from Montana featuring exceptional Danish design and superior craftsmanship. 
          Designed for discerning customers who appreciate quality and style.
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
              alt={selectedColor.color + " like mirror"}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedColor.color} Like Mirror</h2>
            <p className="text-2xl font-light text-gray-900">{selectedColor.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Colors</h3>
            <div className="flex flex-wrap gap-3">
              {montanaLikeMirrors.map((mirror) => (
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
              <li>• Premium design aesthetic</li>
              <li>• Superior mirror glass quality</li>
              <li>• Danish Montana craftsmanship</li>
              <li>• Dimensions: 75 x 105 cm</li>
              <li>• Advanced mounting system</li>
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
