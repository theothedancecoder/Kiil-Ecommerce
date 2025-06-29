"use client";

import { useState } from "react";
import Image from "next/image";

interface MontanaSelfieMirror {
  id: number;
  color: string;
  image?: string;
  perspectiveImage?: string;
  price: string;
  colorCode: string;
}

const montanaSelfieMirrors = [
  {
    id: 1,
    color: "White",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_01-White.png",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_01-White_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#FFFFFF",
  },
  {
    id: 2,
    color: "Fjord",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_02-Fjord.png",
    price: "3,299 NOK",
    colorCode: "#4A90A4",
  },
  {
    id: 3,
    color: "Anthracite",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_04-Anthracite.png",
    price: "3,299 NOK",
    colorCode: "#36454F",
  },
  {
    id: 4,
    color: "Black",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_05-Black.png",
    price: "3,299 NOK",
    colorCode: "#000000",
  },
  {
    id: 5,
    color: "Nordic",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mrror_09-Nordic.png",
    price: "3,299 NOK",
    colorCode: "#E8E8E8",
  },
  {
    id: 6,
    color: "Coffee",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_35-Coffee_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#6F4E37",
  },
  {
    id: 7,
    color: "Coal",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_36-Coal_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#2F2F2F",
  },
  {
    id: 8,
    color: "Snow",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_38-Snow_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#FFFAFA",
  },
  {
    id: 9,
    color: "Graphic",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_100-Graphic.png",
    price: "3,299 NOK",
    colorCode: "#2F2F2F",
  },
  {
    id: 10,
    color: "New White",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_101-New-White.png",
    price: "3,299 NOK",
    colorCode: "#F8F8FF",
  },
  {
    id: 11,
    color: "Monarch",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_135-Monarch.png",
    price: "3,299 NOK",
    colorCode: "#8B4513",
  },
  {
    id: 12,
    color: "Pine",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_136-Pine_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#01796F",
  },
  {
    id: 13,
    color: "Mushroom",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_137-Mushroom.png",
    price: "3,299 NOK",
    colorCode: "#C7B299",
  },
  {
    id: 14,
    color: "Juniper",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_138-Juniper_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#4A5D23",
  },
  {
    id: 15,
    color: "Oregano",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_139-Oregano_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#9CAF88",
  },
  {
    id: 16,
    color: "Pomelo",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_140-Pomelo_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#F5DEB3",
  },
  {
    id: 17,
    color: "Truffle",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_141-Truffle_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#3C2415",
  },
  {
    id: 18,
    color: "Amber",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_142-Amber_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#FFBF00",
  },
  {
    id: 19,
    color: "Fennel",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_144-Fennel_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#87A96B",
  },
  {
    id: 20,
    color: "Rosehip",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_145-Rosehip_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#E8B4B8",
  },
  {
    id: 21,
    color: "Hazelnut",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_146-Hazelnut_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#D2B48C",
  },
  {
    id: 22,
    color: "Shadow",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_147-Shadow_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#8A8A8A",
  },
  {
    id: 23,
    color: "Flint",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_148-Flint_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#696969",
  },
  {
    id: 24,
    color: "Vanilla",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_150-Vanilla.png",
    price: "3,299 NOK",
    colorCode: "#F3E5AB",
  },
  {
    id: 25,
    color: "Rhubarb",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_151-Rhubarb_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#DA70D6",
  },
  {
    id: 26,
    color: "Parsley",
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_152-Parsley.png",
    price: "3,299 NOK",
    colorCode: "#355E3B",
  },
  {
    id: 27,
    color: "Azure",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_154-Azure_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#007FFF",
  },
  {
    id: 28,
    color: "Masala",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_155-Masala_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#8B4513",
  },
  {
    id: 29,
    color: "Oyster",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_156-Oyster_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#DAD4B0",
  },
  {
    id: 30,
    color: "Cumin",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_157-Cumin_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#924B00",
  },
  {
    id: 31,
    color: "Oat",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_158-Oat_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#DDD6C0",
  },
  {
    id: 32,
    color: "Camomile",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_159-Camomile_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#F7E98E",
  },
  {
    id: 33,
    color: "Balsamic",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_160-Balsamic_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#4A4A4A",
  },
  {
    id: 34,
    color: "Mist",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_161-Mist_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#C4C4C4",
  },
  {
    id: 35,
    color: "Hokkaido",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_162-Hokkaido_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#F5F5DC",
  },
  {
    id: 36,
    color: "Black Jade",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_163-Black-Jade_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#00A86B",
  },
  {
    id: 37,
    color: "Iris",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_164-Iris_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#5A4FCF",
  },
  {
    id: 38,
    color: "Beetroot",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_165-Beetroot_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#8B0000",
  },
  {
    id: 39,
    color: "Acacia",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Acacia_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#F4A460",
  },
  {
    id: 40,
    color: "Clay",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Clay_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#B66A50",
  },
  {
    id: 41,
    color: "Ruby",
    perspectiveImage: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Ruby_Perspective.png",
    price: "3,299 NOK",
    colorCode: "#E0115F",
  },
];

export default function MontanaSelfieMirrorDisplay() {
  const [selectedColor, setSelectedColor] = useState(montanaSelfieMirrors[0]);
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
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>Montana Selfie Mirrors</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Innovative selfie mirrors from Montana featuring integrated shelving and premium Danish design. 
          Perfect for modern bathrooms and dressing areas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          {(selectedColor.image || selectedColor.perspectiveImage) && (
            <div 
              className="relative w-full aspect-square cursor-pointer"
              onClick={() => openModal(selectedColor.image || selectedColor.perspectiveImage!)}
            >
              <Image
                src={selectedColor.image || selectedColor.perspectiveImage!}
                alt={selectedColor.color + " selfie mirror"}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-center flex-nowrap">
            <span 
              className="text-red-600 flex-shrink-0"
              style={{ 
                fontFamily: 'Montserrat, Verdana, Helvetica',
                fontSize: '14px'
              }}
            >
              Price: {selectedColor.price.replace('NOK', 'kr')}
            </span>
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0">
              View
            </button>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Colors</h3>
            <div className="flex flex-wrap gap-3">
              {montanaSelfieMirrors.map((mirror) => (
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
              <li>• Integrated shelf design</li>
              <li>• Premium mirror glass</li>
              <li>• Danish Montana quality</li>
              <li>• Dimensions: 60 x 90 cm</li>
              <li>• Wall mounting system included</li>
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
