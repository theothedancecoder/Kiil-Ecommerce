"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import InteriorBanner from "@/components/InteriorBanner";
import InteriorSidebar from "@/components/InteriorSidebar";

const chairCollections = [
  {
    id: 1,
    name: "ClassiCon Stools",
    image: "/ClassiCon/Farge - Lakkert Eik.jpg",
    route: "/interior/living-room/chairs/classicon",
    maker: "CLASSICON",
    description: "Elegant oak stools in three finishes",
    variants: "Available in Brown, Natural, and Black lacquered oak"
  },
  {
    id: 2,
    name: "Fionia Stools",
    image: "/Fionia/Color -  Untreated oak.webp",
    route: "/interior/living-room/chairs/fionia",
    maker: "FIONIA",
    description: "Scandinavian design in untreated wood",
    variants: "Available in untreated oak and teak"
  },
  {
    id: 3,
    name: "Fritz Hansen Grand Prix 4130",
    image: "/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png",
    route: "/interior/living-room/chairs/fritz-hansen/grand-prix-4130",
    maker: "FRITZ HANSEN",
    description: "Classic Grand Prix design in veneer finishes",
    variants: "Available in Oak, Walnut, Black Ash, and White Ash"
  },
  {
    id: 4,
    name: "Fritz Hansen Grand Prix 4130 Upholstery",
    image: "/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Oak.png",
    route: "/interior/living-room/chairs/fritz-hansen/grand-prix-4130-upholstery",
    maker: "FRITZ HANSEN",
    description: "Upholstered version of the Grand Prix design",
    variants: "Multiple upholstery options available"
  },
  {
    id: 5,
    name: "Fritz Hansen 3130",
    image: "/Fritz Hanson  3130/Clear Lacquered Veneer : Oak.png",
    route: "/interior/living-room/chairs/fritz-hansen/3130",
    maker: "FRITZ HANSEN",
    description: "Contemporary stool in veneer finishes",
    variants: "Available in Oak, Walnut, Deep Clay, and Midnight Blue"
  },
  {
    id: 6,
    name: "Grand Prix 3130 Upholstery",
    image: "/Grand Prix™ 3130 stol fullpolstret med krom ben/Natural : Natural.png",
    route: "/interior/living-room/chairs/fritz-hansen/grand-prix-3130-upholstery",
    maker: "FRITZ HANSEN",
    description: "Upholstered Grand Prix with chrome legs",
    variants: "Multiple upholstery options available"
  },
  {
    id: 7,
    name: "&Tradition Little Petra VB1",
    image: "/&Tradition/Little-Petra-VB1_Oiled-Oak-w.-ectriture-0640_angled-front-1200x1600.jpg",
    route: "/interior/living-room/chairs/tradition",
    maker: "&TRADITION",
    description: "Iconic lounge chair with premium upholstery",
    variants: "Available in multiple wood finishes and fabrics"
  },
  {
    id: 8,
    name: "Artwood Cadiz Lounge Chair",
    image: "/Artwood/Cadiz loungestol - Quiet Cream.webp",
    route: "/interior/living-room/chairs/artwood",
    maker: "ARTWOOD",
    description: "Contemporary lounge chair in premium materials",
    variants: "Available in Bouclé Cream, Quiet Wood, Loud Wenge, and Quiet Cream"
  },
  {
    id: 9,
    name: "Moooi Kiss Lounge Chair",
    image: "/Moooi/Kiss Lounge Chair.webp",
    route: "/interior/living-room/chairs/moooi",
    maker: "MOOOI",
    description: "Distinctive design lounge chair",
    variants: "Premium upholstery options available"
  },
  {
    id: 10,
    name: "Dux Jetson Classic",
    image: "/Dux/Jetson Classic soft 25: flax 21.webp",
    route: "/interior/living-room/chairs/dux",
    maker: "DUX",
    description: "Premium Swedish comfort and craftsmanship",
    variants: "Flax 21 upholstery with premium construction"
  },
  {
    id: 11,
    name: "&traditions RFH Armchair",
    image: "/&traditions./RFH-Armchair-RD7_Black-w.-Walnut-and-Beech-and-Hallingdal-103_Angled-front-1200x1600.jpg",
    route: "/interior/living-room/chairs/traditions",
    maker: "&TRADITIONS",
    description: "Danish design with premium materials",
    variants: "Available in Hallingdal 103 and 227 fabrics"
  }
];

export default function ChairsPage() {
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
              <h1 className="text-[24px] text-primary mb-8" style={{ fontFamily: 'Montserrat, Verdana, Helvetica', letterSpacing: '0.05em' }}>
                Designer Chairs & Stools Collection
              </h1>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {chairCollections.map((collection) => (
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
                        {collection.maker}
                      </p>
                      <div className="w-8 h-px bg-gradient-to-r from-gray-300 to-gray-500"></div>
                    </div>
                    <h3 className="font-['Montserrat'] text-[20px] font-bold mb-4 text-gray-900 leading-tight">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {collection.description}
                    </p>
                    <p className="text-gray-500 text-xs mb-6">
                      {collection.variants}
                    </p>
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
