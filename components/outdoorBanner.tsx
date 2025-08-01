"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/languageContext";

const OutdoorBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="relative h-96 md:h-[500px] bg-gradient-to-r from-green-900 to-green-700 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/outdoor-collection/outdoor collections banner.jpg"
          alt="outdoor collection banner"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              {t("outdoor.banner.title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Transform your outdoor spaces with our premium collection of weather-resistant furniture from Skagerak by Fritz Hansen. Discover timeless Scandinavian design built to withstand the elements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/utendors/furniture"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t("outdoor.banner.shopNow")}
              </Link>
              <Link 
                href="/utendors/cushions-pillows"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Shop Accessories
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-white/10 to-transparent rounded-full transform translate-x-32 translate-y-32" />
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full transform -translate-y-16" />
    </div>
  );
};

export default OutdoorBanner;
