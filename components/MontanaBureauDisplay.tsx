"use client";

import { useState } from "react";
import Image from "next/image";

const montanaBureauItems = [
  {
    id: 1,
    color: "Flint",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Flint_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#696969",
    type: "desk"
  },
  {
    id: 2,
    color: "New White",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_NewWhite_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#F8F8FF",
    type: "desk"
  },
  {
    id: 3,
    color: "Black",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Black_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#000000",
    type: "desk"
  },
  {
    id: 4,
    color: "Nordic",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Nordic_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#E8E8E8",
    type: "desk"
  },
  {
    id: 5,
    color: "Amber",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Amber_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#FFBF00",
    type: "desk"
  },
  {
    id: 6,
    color: "Anthracite",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Anthracite_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#36454F",
    type: "desk"
  },
  {
    id: 7,
    color: "Azure",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Azure_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#007FFF",
    type: "desk"
  },
  {
    id: 8,
    color: "Balsamic",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Balsamic_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#4A4A4A",
    type: "desk"
  },
  {
    id: 9,
    color: "Beetroot",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Beetroot_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#8B0000",
    type: "desk"
  },
  {
    id: 10,
    color: "Camomile",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Camomile_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#F7E98E",
    type: "desk"
  },
  {
    id: 11,
    color: "Coal",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Coal_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#2F2F2F",
    type: "desk"
  },
  {
    id: 12,
    color: "Coffee",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Coffee_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#6F4E37",
    type: "desk"
  },
  {
    id: 13,
    color: "Cumin",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Cumin_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#924B00",
    type: "desk"
  },
  {
    id: 14,
    color: "Fennel",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Fennel_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#87A96B",
    type: "desk"
  },
  {
    id: 15,
    color: "Fjord",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Fjord_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#4A90A4",
    type: "desk"
  },
  {
    id: 16,
    color: "Graphic",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Graphic_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#2F2F2F",
    type: "desk"
  },
  {
    id: 17,
    color: "Hazelnut",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Hazelnut_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#D2B48C",
    type: "desk"
  },
  {
    id: 18,
    color: "Hokkaido",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Hokkaido_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#F5F5DC",
    type: "desk"
  },
  {
    id: 19,
    color: "Iris",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Iris_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#5A4FCF",
    type: "desk"
  },
  {
    id: 20,
    color: "Juniper",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Juniper_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#4A5D23",
    type: "desk"
  },
  {
    id: 21,
    color: "Masala",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Masala_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#8B4513",
    type: "desk"
  },
  {
    id: 22,
    color: "Mist",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Mist_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#C4C4C4",
    type: "desk"
  },
  {
    id: 23,
    color: "Monarch",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Monarch_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#8B4513",
    type: "desk"
  },
  {
    id: 24,
    color: "Mushroom",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Mushroom_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#C7B299",
    type: "desk"
  },
  {
    id: 25,
    color: "Oat",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Oat_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#DDD6C0",
    type: "desk"
  },
  {
    id: 26,
    color: "Oregano",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Oregano_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#9CAF88",
    type: "desk"
  },
  {
    id: 27,
    color: "Oyster",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Oyster_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#DAD4B0",
    type: "desk"
  },
  {
    id: 28,
    color: "Parsley",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Parsley_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#355E3B",
    type: "desk"
  },
  {
    id: 29,
    color: "Pine",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Pine_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#01796F",
    type: "desk"
  },
  {
    id: 30,
    color: "Pomelo",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Pomelo_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#F5DEB3",
    type: "desk"
  },
  {
    id: 31,
    color: "Rhubarb",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Rhubarb_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#DA70D6",
    type: "desk"
  },
  {
    id: 32,
    color: "Rosehip",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Rosehip_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#E8B4B8",
    type: "desk"
  },
  {
    id: 33,
    color: "Shadow",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Shadow_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#8A8A8A",
    type: "desk"
  },
  {
    id: 34,
    color: "Snow",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Snow_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#FFFAFA",
    type: "desk"
  },
  {
    id: 35,
    color: "Truffle",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Truffle_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#3C2415",
    type: "desk"
  },
  {
    id: 36,
    color: "Vanilla",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Vanilla_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#F3E5AB",
    type: "desk"
  },
  {
    id: 37,
    color: "White",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_White_Suspended_Perspective.png",
    price: "15,990 kr",
    colorCode: "#FFFFFF",
    type: "desk"
  },
  // Cabinet variants
  {
    id: 38,
    color: "Acacia",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Acacia_Perspective.png",
    price: "12,990 kr",
    colorCode: "#F4A460",
    type: "cabinet"
  },
  {
    id: 39,
    color: "Clay",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Clay_Perspective.png",
    price: "12,990 kr",
    colorCode: "#B66A50",
    type: "cabinet"
  },
  {
    id: 40,
    color: "Ruby",
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Ruby_Perspective.png",
    price: "12,990 kr",
    colorCode: "#E0115F",
    type: "cabinet"
  }
];

export default function MontanaBureauDisplay() {
  const [selectedItem, setSelectedItem] = useState(montanaBureauItems[0]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"desk" | "cabinet">("desk");

  const filteredItems = montanaBureauItems.filter(item => item.type === selectedType);

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const handleTypeChange = (type: "desk" | "cabinet") => {
    setSelectedType(type);
    const firstItemOfType = montanaBureauItems.find(item => item.type === type);
    if (firstItemOfType) {
      setSelectedItem(firstItemOfType);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>Montana BUREAU Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Elegant workspace solutions from Montana featuring suspended desks and modular storage cabinets. 
          Perfect for modern home offices and professional environments.
        </p>
      </div>

      {/* Type Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleTypeChange("desk")}
            className={`px-6 py-2 rounded-md transition-colors ${
              selectedType === "desk"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Desks
          </button>
          <button
            onClick={() => handleTypeChange("cabinet")}
            className={`px-6 py-2 rounded-md transition-colors ${
              selectedType === "cabinet"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Cabinets
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          {selectedItem.image && (
            <div 
              className="relative w-full aspect-square cursor-pointer"
              onClick={() => openModal(selectedItem.image)}
            >
              <Image
                src={selectedItem.image}
                alt={`${selectedItem.color} ${selectedItem.type}`}
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
              Price: {selectedItem.price}
            </span>
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0">
              View
            </button>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Available Colors</h3>
            <div className="flex flex-wrap gap-3">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="relative group"
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedItem.id === item.id
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: item.colorCode }}
                  />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.color}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              {selectedType === "desk" ? (
                <>
                  <li>• Suspended design for floating appearance</li>
                  <li>• Premium Montana quality</li>
                  <li>• Modular workspace solution</li>
                  <li>• Wall-mounted system included</li>
                  <li>• Compatible with BUREAU storage</li>
                  <li>• Made in Denmark</li>
                </>
              ) : (
                <>
                  <li>• Modular storage design</li>
                  <li>• Premium wood finishes</li>
                  <li>• Pairs with BUREAU desks</li>
                  <li>• Versatile mounting options</li>
                  <li>• Scandinavian design aesthetic</li>
                  <li>• Made in Denmark</li>
                </>
              )}
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
              alt="Expanded view"
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
