"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const furnitureItems = [
  // Furniture - New
  {
    id: 76,
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Flint_Suspended_Perspective.png",
    alt: "Montana BUREAU Desk - Flint",
    category: "desk",
    link: "/interior/home-office/desk-cabinets"
  },
  {
    id: 82,
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_NewWhite_Suspended_Perspective.png",
    alt: "Montana BUREAU Desk - New White",
    category: "desk",
    link: "/interior/home-office/desk-cabinets"
  },
  {
    id: 83,
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Black_Suspended_Perspective.png",
    alt: "Montana BUREAU Desk - Black",
    category: "desk",
    link: "/interior/home-office/desk-cabinets"
  },
  {
    id: 84,
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Nordic_Suspended_Perspective.png",
    alt: "Montana BUREAU Desk - Nordic",
    category: "desk",
    link: "/interior/home-office/desk-cabinets"
  },
  {
    id: 85,
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Amber_Suspended_Perspective.png",
    alt: "Montana BUREAU Desk - Amber",
    category: "desk",
    link: "/interior/home-office/desk-cabinets"
  },
  // Montana BUREAU items also showing under cabinets category
  {
    id: 86,
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Acacia_Perspective.png",
    alt: "Montana BUREAU Cabinet - Acacia",
    category: "cabinets",
    link: "/interior/home-office/desk-cabinets"
  },
  {
    id: 87,
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Clay_Perspective.png",
    alt: "Montana BUREAU Cabinet - Clay",
    category: "cabinets",
    link: "/interior/home-office/desk-cabinets"
  },
  {
    id: 88,
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Ruby_Perspective.png",
    alt: "Montana BUREAU Cabinet - Ruby",
    category: "cabinets",
    link: "/interior/home-office/desk-cabinets"
  },
  // Dining Tables - New
  {
    id: 89,
    image: "/Fredericia - BM71 Library Spisebord/main.jpg",
    alt: "Fredericia BM71 Library Dining Table",
    category: "dining-tables",
    link: "/interior/dining-kitchen/tables"
  },
  {
    id: 90,
    image: "/Salon_extension_table_round_1920x1920_re_800x800_crop_center@2x-400x400.webp",
    alt: "Salon Extension Table - Round",
    category: "dining-tables",
    link: "/interior/dining-kitchen/tables"
  },
  {
    id: 77,
    image: "/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png",
    alt: "Fritz Hansen Grand Prix 4130 Chair - Oak",
    category: "chairs",
    link: "/interior/living-room/chairs"
  },
  {
    id: 78,
    image: "/Kartell -Componibili classic 2/white.webp",
    alt: "Kartell Componibili Classic 2 - White",
    category: "storage",
    link: "/interior/storage"
  },
  {
    id: 79,
    image: "/Montana/Montana_Collection2017_Dream_3000x3000.jpg",
    alt: "Montana DREAM Collection",
    category: "bedroom",
    link: "/interior/bedroom"
  },
  {
    id: 80,
    image: "/Kartell -Componibili classic 2/black.webp",
    alt: "Kartell Componibili Classic 2 - Black",
    category: "storage",
    link: "/interior/storage"
  },
  {
    id: 81,
    image: "/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - Black (195).png",
    alt: "Fritz Hansen Grand Prix 4130 Chair - Black Ash",
    category: "chairs",
    link: "/interior/living-room/chairs"
  },
  // Bathroom Accessories - New
  {
    id: 65,
    image: "/VIPP/VIPP906 baderomsarmatur kr 8 995.00  VIPP906 baderomsarmatur.jpeg",
    alt: "VIPP906 Bathroom Faucet",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 66,
    image: "/Missoni Home - Amone Badematte/amone-bath-mat-col160.avif",
    alt: "Missoni Home Amone Bath Mat - Col.160",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 67,
    image: "/missoni-curt-bath-mat/col160.jpg",
    alt: "Missoni Home Curt Bath Mat - Col.160",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 68,
    image: "/missoni-bernard-towels/100x150.jpg",
    alt: "Missoni Home Bernard Towels - 100x150",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 69,
    image: "/missoni-bernard-towels/40x70.jpg",
    alt: "Missoni Home Bernard Towels - 40x70",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 70,
    image: "/missoni-bernard-towels/70x115.jpg",
    alt: "Missoni Home Bernard Towels - 70x115",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 71,
    image: "/missoni-bernard-towels/6pack.jpg",
    alt: "Missoni Home Bernard Towels - 6 Pack",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 72,
    image: "/missoni-curt-beauty-bag/col160.png",
    alt: "Missoni Home Curt Beauty Bag - Col.160",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 73,
    image: "/missoni-curt-home-bag/col160.jpg",
    alt: "Missoni Home Curt Home Bag - Col.160",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 74,
    image: "/missoni-giacomo-towel/col160.webp",
    alt: "Missoni Home Giacomo Towel - Col.160",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  {
    id: 75,
    image: "/nordan-magnetic-towel-holder/main.jpg",
    alt: "Nordan Home Magnetic Towel Holder",
    category: "bathroom",
    link: "/interior/bathroom"
  },
  // Bathroom Mirrors - Implemented
  {
    id: 31,
    image: "/francois-ghost/black.webp",
    alt: "Francois Ghost Mat Mirror - Black",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 32,
    image: "/francois-ghost/white.webp",
    alt: "Francois Ghost Mat Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 33,
    image: "/montana-mirrors/selfie-white.png",
    alt: "Montana Selfie Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 34,
    image: "/montana-mirrors/selfie-fjord.png",
    alt: "Montana Selfie Mirror - Fjord",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 35,
    image: "/montana-mirrors/look-white.png",
    alt: "Montana Look Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 36,
    image: "/montana-mirrors/look-fjord.png",
    alt: "Montana Look Mirror - Fjord",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 37,
    image: "/montana-mirrors/like-white.png",
    alt: "Montana Like Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 38,
    image: "/montana-mirrors/like-black.png",
    alt: "Montana Like Mirror - Black",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 39,
    image: "/montana-mirrors/around-white.png",
    alt: "Montana Around Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 40,
    image: "/montana-mirrors/around-fjord.png",
    alt: "Montana Around Mirror - Fjord",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 19,
    image: "/all-saints/amber.webp",
    alt: "All Saints Mirror - Amber",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 20,
    image: "/all-saints/aquamarine-green.webp",
    alt: "All Saints Mirror - Aquamarine Green",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 21,
    image: "/all-saints/black.webp",
    alt: "All Saints Mirror - Black",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 22,
    image: "/all-saints/crystal.webp",
    alt: "All Saints Mirror - Crystal",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 23,
    image: "/all-saints/dusty-pink.webp",
    alt: "All Saints Mirror - Dusty Pink",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 24,
    image: "/all-saints/white.webp",
    alt: "All Saints Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  // Bathroom Cabinets - Implemented
  {
    id: 52,
    image: "/Naver/Naver Hvitoljet eik kr 12 990.00.webp",
    alt: "Naver Cabinet - Hvitoljet Eik",
    category: "cabinets",
    link: "/interior/bathroom/cabinets/naver"
  },
  {
    id: 53,
    image: "/Naver/Naver Oljet eik kr 12 990.00.webp",
    alt: "Naver Cabinet - Oljet Eik",
    category: "cabinets",
    link: "/interior/bathroom/cabinets/naver"
  },
  {
    id: 54,
    image: "/Naver/Naver Oljet valnøtt kr 12 990.00.webp",
    alt: "Naver Cabinet - Oljet Valnøtt",
    category: "cabinets",
    link: "/interior/bathroom/cabinets/naver"
  },
  {
    id: 55,
    image: "/Naver/Naver Såpet eik kr 12 990.00.webp",
    alt: "Naver Cabinet - Såpet Eik",
    category: "cabinets",
    link: "/interior/bathroom/cabinets/naver"
  },
  // Living Room Chairs - Implemented
  {
    id: 56,
    image: "/furniture-brands/dux-jetson.webp",
    alt: "Dux Jetson Chair - Match Flax",
    category: "chairs",
    link: "/interior/living-room/chairs/dux"
  },
  {
    id: 57,
    image: "/furniture-brands/moooi-heracleum.webp",
    alt: "Moooi Heracleum III Light",
    category: "chairs",
    link: "/interior/living-room/chairs/moooi"
  },
  {
    id: 58,
    image: "/furniture-brands/tradition-lille-petra.webp",
    alt: "&Tradition Lille Petra Chair",
    category: "chairs",
    link: "/interior/living-room/chairs/traditions"
  },
  // Home Accessories - Implemented
  {
    id: 59,
    image: "/eldvarm-emma-lantern/natural.jpg",
    alt: "Eldvarm Emma Lantern",
    category: "home-accessories",
    link: "/interior/home-accessories"
  },
  {
    id: 60,
    image: "/cartel-products/battery-crystal.webp",
    alt: "Cartel Battery Rechargeable Lamp",
    category: "home-accessories",
    link: "/interior/home-accessories"
  },
  {
    id: 61,
    image: "/cartel-products/abbracciaio-chrome.webp",
    alt: "Cartel Abbracciaio Candlestick",
    category: "home-accessories",
    link: "/interior/home-accessories"
  },
  {
    id: 62,
    image: "/vitra-products/ball-clock-multicolor.jpg",
    alt: "Vitra Ball Clock",
    category: "home-accessories",
    link: "/interior/home-accessories/wall-art"
  },
  {
    id: 63,
    image: "/serax-products/broquaine-vase.webp",
    alt: "Serax Broquaine Vase",
    category: "home-accessories",
    link: "/interior/home-accessories"
  },
  {
    id: 64,
    image: "/fritz-hansen-candlestick/main.png",
    alt: "Fritz Hansen Single Candlestick",
    category: "home-accessories",
    link: "/interior/home-accessories"
  }
];

const InteriorFurnitureGrid = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<{ image: string; alt: string } | null>(null);

  const handleItemClick = (item: typeof furnitureItems[0]) => {
    if (item.category === 'mirrors' && item.link) {
      router.push(item.link);
    } else if (item.category === 'sofas') {
      router.push('/interior/living-room/sofa');
    } else {
      setSelectedImage({ image: item.image, alt: item.alt });
    }
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
            className="w-full max-w-[320px] mx-auto cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <div 
              className="relative bg-[#fff5f5] rounded-xl overflow-hidden mb-3"
              style={{
                aspectRatio: "1/1"
              }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
              />
            </div>
            <div className="text-center px-2">
              {item.category === 'sofas' && (
                <p className="text-sm text-gray-600 mb-1">
                  Maker: Fredericia
                </p>
              )}
              <p 
                style={{ 
                  fontFamily: 'Montserrat, Verdana, Helvetica', 
                  fontSize: '14px' 
                }}
              >
                {item.alt}
              </p>
            </div>
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
