"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/languageContext";

const ServiceBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row mx-auto px-6 md:px-8 lg:px-0 max-w-[95%] lg:max-w-[1072px]">
      {/* Partners image box */}
      <div 
        className="bg-[#e9ebe1] rounded-t-xl md:rounded-l-xl md:rounded-tr-none flex justify-center items-center p-4 md:p-6 w-full md:w-auto md:min-w-[280px] relative"
        style={{
          minHeight: "120px"
        }}
      >
        <Image
          src="/outdoor-collection/kiil partners.jpg"
          alt="Kiil Partners"
          fill
          className="object-contain rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
          priority
        />
      </div>
      
      {/* Main banner */}
      <div 
        className="relative bg-[#f0f8ff] overflow-hidden rounded-b-xl md:rounded-r-xl md:rounded-bl-none w-full"
        style={{
          minHeight: "120px",
          overflow: "hidden"
        }}
      >
        <Image
          src="/service.jpg"
          alt="service banner"
          fill
          className="object-cover rounded-r-xl"
          style={{ objectPosition: "center 65%" }}
          priority
        />
      </div>
    </div>
  );
};

export default ServiceBanner;
