"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  // Fredericia Collection
  {
    id: 43,
    image: "/Fredericia /4511_delphi-sofa--240x85-cm_50841_leather-cera-905-russet-brown_v1.avif",
    alt: "Fredericia Delphi Sofa - Leather Russet Brown",
    category: "sofas"
  },
  {
    id: 44,
    image: "/Fredericia /Delphi Sofa - Steelcut Trio, 213.avif",
    alt: "Fredericia Delphi Sofa - Steelcut Trio",
    category: "sofas"
  },
  {
    id: 45,
    image: "/Fredericia /Delphi Sofa -Leather Max 98, Black.avif",
    alt: "Fredericia Delphi Sofa - Leather Black",
    category: "sofas"
  },
  // Fredericia Delphi Elements Collection
  {
    id: 46,
    image: "/Fredericia /Delphi Elements Corner Module.avif",
    alt: "Fredericia Delphi Elements - Corner Module",
    category: "sofas"
  },
  {
    id: 47,
    image: "/Fredericia /Delphi Elements Center Module.avif",
    alt: "Fredericia Delphi Elements - Center Module",
    category: "sofas"
  },
  {
    id: 48,
    image: "/Fredericia /Delphi Elements End Module.avif",
    alt: "Fredericia Delphi Elements - End Module",
    category: "sofas"
  },
  // Fredericia EJ220 Collection
  {
    id: 49,
    image: "/Fredericia /EJ220 2 Seater.avif",
    alt: "Fredericia EJ220 - 2 Seater",
    category: "sofas"
  },
  {
    id: 50,
    image: "/Fredericia /EJ220 3 Seater.avif",
    alt: "Fredericia EJ220 - 3 Seater",
    category: "sofas"
  },
  {
    id: 51,
    image: "/Fredericia /EJ220 Corner.avif",
    alt: "Fredericia EJ220 - Corner",
    category: "sofas"
  },
  // Francois Ghost Mat Mirrors Collection
  {
    id: 31,
    image: "/FRANCOIS GHOST MAT/FRANCOIS GHOST MAT BLACK.webp",
    alt: "Francois Ghost Mat Mirror - Black",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/francois-ghost-mat"
  },
  {
    id: 32,
    image: "/FRANCOIS GHOST MAT/FRANCOIS GHOST MAT -WHITE.webp",
    alt: "Francois Ghost Mat Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/francois-ghost-mat"
  },
  // Montana Selfie Mirrors Collection
  {
    id: 33,
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_01-White.png",
    alt: "Montana Selfie Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/montana-selfie"
  },
  {
    id: 34,
    image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_01-Fjord.png",
    alt: "Montana Selfie Mirror - Fjord",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/montana-selfie"
  },
  // Montana Look Mirrors Collection
  {
    id: 35,
    image: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_White_Perspective.png",
    alt: "Montana Look Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/montana-look"
  },
  {
    id: 36,
    image: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Fjord_Perspective.png",
    alt: "Montana Look Mirror - Fjord",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/montana-look"
  },
  // Montana Like Mirrors Collection
  {
    id: 37,
    image: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_White_Perspective.png",
    alt: "Montana Like Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/montana-like"
  },
  {
    id: 38,
    image: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Black_Perspective.png",
    alt: "Montana Like Mirror - Black",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/montana-like"
  },
  // Montana Around Mirrors Collection
  {
    id: 39,
    image: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png",
    alt: "Montana Around Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/montana-around"
  },
  {
    id: 40,
    image: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_02-Fjord_Perspective.png",
    alt: "Montana Around Mirror - Fjord",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/montana-around"
  },
  // All Saints Mirrors with Lights Collection
  {
    id: 41,
    image: "/ALL SAINTS MIRROR WITH LIGHT/ALL SAINTS MIRROR WITH LIGHTS - Amber.webp",
    alt: "All Saints Mirror with Lights - Amber",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/all-saints-with-lights"
  },
  {
    id: 42,
    image: "/ALL SAINTS MIRROR WITH LIGHT/ALL SAINTS MIRROR WITH LYS CRYSTAL.webp",
    alt: "All Saints Mirror with Lights - Crystal",
    category: "mirrors",
    link: "/interior/bathroom/mirrors/all-saints-with-lights"
  },
  // All Saints Mirrors Collection
  {
    id: 19,
    image: "/ALL SAINTS/AMBER.webp",
    alt: "All Saints Mirror - Amber",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 20,
    image: "/ALL SAINTS/AQUAMARINE GREEN.webp",
    alt: "All Saints Mirror - Aquamarine Green",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 21,
    image: "/ALL SAINTS/BLACK.webp",
    alt: "All Saints Mirror - Black",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 22,
    image: "/ALL SAINTS/CRYSTAL.webp",
    alt: "All Saints Mirror - Crystal",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 23,
    image: "/ALL SAINTS/DUSTY PINK.webp",
    alt: "All Saints Mirror - Dusty Pink",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  {
    id: 24,
    image: "/ALL SAINTS/WHITE.webp",
    alt: "All Saints Mirror - White",
    category: "mirrors",
    link: "/interior/bathroom/mirrors"
  },
  // Miscellaneous Products
  {
    id: 25,
    image: "/interior-collection/miscellaneous/13290_0_5761-400x400.webp",
    alt: "Interior Accessory"
  },
  {
    id: 26,
    image: "/interior-collection/miscellaneous/144333-400x400.jpg",
    alt: "Interior Furniture"
  },
  {
    id: 27,
    image: "/interior-collection/miscellaneous/149004-400x400.jpg",
    alt: "Interior Design Piece"
  },
  {
    id: 28,
    image: "/interior-collection/miscellaneous/157071-400x400.webp",
    alt: "Interior Accessory"
  },
  {
    id: 29,
    image: "/interior-collection/miscellaneous/162770-400x400.webp",
    alt: "Interior Furniture"
  },
  {
    id: 30,
    image: "/interior-collection/miscellaneous/171450-400x400.webp",
    alt: "Interior Design"
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
