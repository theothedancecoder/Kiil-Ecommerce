"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import InteriorSubBanner from "@/components/InteriorSubBanner";
import InteriorSidebar from "@/components/InteriorSidebar";

const sofaCollections = [
  {
    id: 1,
    name: "Fredericia Delphi",
    image: "/Fredericia /4511_delphi-sofa--240x85-cm_50841_leather-cera-905-russet-brown_v1.avif",
    route: "/interior/living-room/sofa/fredericia-delphi",
    maker: "Fredericia"
  },
  {
    id: 2,
    name: "Fredericia Elements",
    image: "/Fredericia /Delphi Elements Sofa/Elegance Walnut 20195.jpg",
    route: "/interior/living-room/sofa/fredericia-elements",
    maker: "Fredericia"
  },
  {
    id: 3,
    name: "Fredericia EJ220",
    image: "/Fredericia /EJ220 SOFA  2 SEATER/Erik 3790 Linen.avif",
    route: "/interior/living-room/sofa/fredericia-ej220",
    maker: "Fredericia"
  },
  {
    id: 4,
    name: "Juul Collection",
    image: "/Juul 903/juul-903-240x86-cm-Leather Prestige-18.jpg",
    route: "/interior/living-room/sofa/juul-903",
    maker: "Juul"
  },
  {
    id: 5,
    name: "Palissade Lounge",
    image: "/Palissade -Lounge Sofa/Palissade-Lounge-Sofa-anthracite_Palissade-Lounge-Sofa-Seat-Cushion-anthracite.jpg",
    route: "/interior/living-room/sofa/palissade-lounge",
    maker: "HAY"
  }
];

export default function SofaPage() {
  const router = useRouter();

  const handleCollectionClick = (route: string) => {
    router.push(route);
  };

  return (
    <main className="min-h-screen bg-background">
      <InteriorSubBanner 
        title="Living Room Sofas"
        subtitle="Transform your living space with our curated collection of luxury sofas, from contemporary designs to timeless classics."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                Living Room Sofas
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Browse our living room sofas collection
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
              {sofaCollections.map((collection) => (
                <div
                  key={collection.id}
                  onClick={() => handleCollectionClick(collection.route)}
                  className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-gray-200/50 hover:border-yellow-400/50"
                  style={{ 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
                  }}
                >
                  <div className={`relative w-full ${collection.maker === "Juul" || collection.maker === "HAY" ? "h-80" : "h-64"} bg-gradient-to-b from-gray-50 to-white`}>
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
                        {collection.maker}
                      </p>
                      <div className="w-8 h-px bg-gradient-to-r from-gray-300 to-gray-500"></div>
                    </div>
                    <h3 className="font-['Montserrat'] text-[20px] font-bold mb-4 text-gray-900 leading-tight">
                      {collection.name}
                    </h3>
                    <div className="mt-6">
                      <span className="inline-flex items-center bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 rounded-xl text-sm font-semibold tracking-wide hover:from-black hover:to-gray-800 transition-all duration-300 shadow-lg">
                        Explore Collection
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
