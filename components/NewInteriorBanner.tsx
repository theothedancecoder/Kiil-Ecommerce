"use client";

import Image from "next/image";
import Link from "next/link";

const NewInteriorBanner = () => {
  return (
    <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Montana/Montana_Collection2017_Dream_3000x3000.jpg"
          alt="Interior Design Lifestyle"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-800/70 to-black/90" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-red-400/25 rounded-full blur-md animate-pulse delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-white/20">
            <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">
              Interior Collection
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Transform your living spaces with our curated selection of sophisticated furniture and accessories. From timeless classics to contemporary masterpieces, discover pieces that define your personal style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#products" 
                className="inline-flex items-center justify-center px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-300"
              >
                Explore Collection
              </Link>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-amber-600 text-amber-400 font-medium hover:bg-amber-600 hover:text-white transition-colors duration-300"
              >
                Interior Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewInteriorBanner;
