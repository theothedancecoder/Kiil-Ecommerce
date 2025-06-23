"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/languageContext";

const OutdoorBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="flex mx-auto px-6 md:px-8 lg:px-0 max-w-[95%] lg:max-w-[1072px]">
      {/* Placeholder box */}
      <div 
        className="bg-[#eff9ff] rounded-l-xl flex flex-col justify-center items-center p-4 md:p-6"
        style={{
          width: "280px",
          height: "177.97px"
        }}
      >
        <h2 className="text-lg md:text-xl font-serif text-primary mb-3 md:mb-4 text-center">
          {t("outdoor.banner.title")}
        </h2>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-sm md:text-base">
          {t("outdoor.banner.shopNow")}
        </button>
      </div>
      
      {/* Main banner */}
      <div 
        className="relative bg-[#eff9ff] overflow-hidden rounded-r-xl"
        style={{
          width: "100%",
          maxWidth: "792px",
          height: "177.97px",
          overflow: "hidden"
        }}
      >
        <Image
          src="/outdoor-collection/outdoor collections banner.jpg"
          alt="outdoor collection banner"
          fill
          className="object-cover rounded-r-xl"
          style={{ objectPosition: "center 75%" }}
          priority
        />
      </div>
    </div>
  );
};

export default OutdoorBanner;
