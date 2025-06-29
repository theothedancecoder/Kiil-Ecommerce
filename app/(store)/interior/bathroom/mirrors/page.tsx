"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MirrorsPage() {
  const router = useRouter();

  const mirrorCollections = [
    {
      id: 1,
      name: "All Saints Mirrors",
      description: "Elegant and versatile mirrors crafted by All Saints. Available in 7 stunning colors including Amber, Aquamarine Green, Black, Crystal, Dusty Pink, Tangerine Orange, and White.",
      image: "/ALL SAINTS/CRYSTAL.webp",
      price: "2,499 NOK",
      link: "/interior/bathroom/mirrors/all-saints"
    },
    {
      id: 2,
      name: "Francois Ghost Mat Mirrors",
      description: "Modern and sleek Francois Ghost Mat mirrors designed to elevate your bathroom aesthetics with minimalist elegance. Available in Black and White.",
      image: "/FRANCOIS GHOST MAT/FRANCOIS GHOST MAT BLACK.webp",
      price: "2,799 NOK",
      link: "/interior/bathroom/mirrors/francois-ghost-mat"
    },
    {
      id: 3,
      name: "Montana Selfie Mirrors",
      description: "Innovative selfie mirrors from Montana featuring integrated shelving and premium Danish design. Available in 41 sophisticated colors including White, Fjord, Anthracite, Black Jade, Ruby, and more.",
      image: "/SELFIE MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_01-White.png",
      price: "3,299 NOK",
      link: "/interior/bathroom/mirrors/montana-selfie"
    },
    {
      id: 4,
      name: "Colour Frame Mirror - LOOK",
      description: "Sophisticated look mirrors from Montana featuring premium Danish design and contemporary aesthetics. Available in 40 sophisticated colors including White, Nordic, Fjord, Black Jade, Ruby, and more.",
      image: "/MONTANA LOOK MIRROR/Montana_Selection_LOOK_White_Perspective.png",
      price: "3,599 NOK",
      link: "/interior/bathroom/mirrors/montana-look"
    },
    {
      id: 5,
      name: "Montana Like Mirrors",
      description: "Premium like mirrors from Montana featuring exceptional Danish design and superior craftsmanship. Available in 41 sophisticated colors including White, Black, Nordic, Fjord, Black Jade, Ruby, and more.",
      image: "/MONTANA LIKE MIRROR/Montana_Selection_LIKE_White_Perspective.png",
      price: "3,799 NOK",
      link: "/interior/bathroom/mirrors/montana-like"
    },
    {
      id: 6,
      name: "Montana Around Mirrors",
      description: "Distinctive around mirrors from Montana featuring innovative Danish design and exceptional quality. Available in 41 sophisticated colors including White, Black, Nordic, Fjord, Black Jade, Ruby, and more.",
      image: "/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png",
      price: "3,999 NOK",
      link: "/interior/bathroom/mirrors/montana-around"
    },
    {
      id: 7,
      name: "All Saints Mirrors with Lights",
      description: "Elegant and illuminated mirrors crafted by All Saints featuring integrated lighting systems. Available in 5 stunning colors including Amber, Aquamarine Green, Crystal, Dusty Pink, and Tangerine Orange.",
      image: "/ALL SAINTS MIRROR WITH LIGHT/ALL SAINTS MIRROR WITH LIGHTS - Amber.webp",
      price: "2,899 NOK",
      link: "/interior/bathroom/mirrors/all-saints-with-lights"
    }
  ];

  const handleCollectionClick = (link: string) => {
    router.push(link);
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', fontSize: '16px' }}>Mirror Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium mirrors, each collection offering unique designs and exceptional craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mirrorCollections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => handleCollectionClick(collection.link)}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-80">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <p className="text-sm text-gray-600 mb-1">
                    Maker: {collection.name.includes("Montana") ? "Montana" : collection.name.includes("All Saints") ? "All Saints" : "Francois Ghost"}
                  </p>
                  <h2 style={{ 
                    fontFamily: 'Montserrat, Verdana, Helvetica',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    textAlign: 'center'
                  }}>
                    {collection.name}
                  </h2>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {collection.description}
                </p>
                <div className="flex justify-between items-center flex-nowrap">
                  <span 
                    className="text-red-600 flex-shrink-0"
                    style={{ 
                      fontFamily: 'Montserrat, Verdana, Helvetica',
                      fontSize: '14px'
                    }}
                  >
                    Price: {collection.price.replace('NOK', 'kr')}
                  </span>
                  <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
