"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import InteriorBanner from "@/components/InteriorBanner";
import InteriorSidebar from "@/components/InteriorSidebar";

const flosCollections = [
  {
    id: 1,
    name: "2097/18 Chandelier",
    image: "/FLOS/2097:18 lysekrone /Brass.jpg",
    route: "/interior/living-room/lighting/flos/2097-18",
    description: "Iconic 18-light chandelier design by Gino Sarfatti",
    bulbs: "18 x E14",
    price: "45,999 kr"
  },
  {
    id: 2,
    name: "2097/30 Chandelier", 
    image: "/FLOS/2097-30/Brass.jpg",
    route: "/interior/living-room/lighting/flos/2097-30",
    description: "Elegant 30-light chandelier design by Gino Sarfatti",
    bulbs: "30 x E14",
    price: "65,999 kr"
  },
  {
    id: 3,
    name: "2097/50 Chandelier",
    image: "/FLOS/2097-50/Brass.jpg", 
    route: "/interior/living-room/lighting/flos/2097-50",
    description: "Grand 50-light chandelier design by Gino Sarfatti",
    bulbs: "50 x E14",
    price: "89,999 kr"
  }
];

export default function FlosPage() {
  const router = useRouter();

  const handleCollectionClick = (route: string) => {
    router.push(route);
  };

  return (
    <main className="min-h-screen bg-background">
      <InteriorBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="text-center mb-16">
              <h1 className="text-[24px] text-primary mb-4" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', letterSpacing: '0.05em' }}>
                FLOS Lighting Collection
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                FLOS has been crafting innovative lighting solutions since 1962, combining Italian craftsmanship with creative design and cutting-edge technology. The iconic 2097 series by Gino Sarfatti represents the perfect fusion of traditional and modern design.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {flosCollections.map((collection) => (
                <div
                  key={collection.id}
                  onClick={() => handleCollectionClick(collection.route)}
                  className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-gray-200/50 hover:border-yellow-400/50"
                  style={{ 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
                  }}
                >
                  <div className="relative w-full h-80 bg-gradient-to-b from-gray-50 to-white">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-contain p-6 transition-transform duration-500 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-['Verdana'] text-sm text-gray-500 font-medium tracking-widest uppercase">
                        FLOS
                      </p>
                      <div className="w-8 h-px bg-gradient-to-r from-gray-300 to-gray-500"></div>
                    </div>
                    <h3 className="font-['Montserrat'] text-[20px] font-bold mb-4 text-gray-900 leading-tight">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {collection.description}
                    </p>
                    <p className="text-gray-500 text-xs mb-2">
                      {collection.bulbs}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 mb-6">
                      {collection.price}
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 rounded-xl text-sm font-semibold tracking-wide hover:from-black hover:to-gray-800 transition-all duration-300 shadow-lg">
                        View Details
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
