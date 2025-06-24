"use client";

import ServiceBanner from "@/components/ServiceBanner";
import Image from "next/image";
import { useLanguage } from "@/lib/languageContext";

export default function ServicesPage() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen bg-background">
      <ServiceBanner />
      <div className="mx-auto px-6 md:px-8 lg:px-0 max-w-[95%] lg:max-w-[1072px] mt-4 flex flex-col items-center">
        <div 
          className="bg-[#f0f8ff] rounded-xl flex items-center justify-center w-full max-w-[792px]"
          style={{
            minHeight: "64px"
          }}
        >
          <p className="text-[20px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] px-4 text-center">
            {t("service.design.tagline")}
          </p>
        </div>
        <div 
          className="bg-[#f0f8ff] rounded-xl flex items-center justify-center mt-4 w-full max-w-[777px]"
          style={{
            minHeight: "96px"
          }}
        >
          <p className="text-[16px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] px-4 md:px-8 text-center py-4">
            {t("service.intro.text")}
            <br /><br />
            {t("service.connect.text")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-8 items-start w-full">
          <div 
            className="bg-[#f0f8ff] rounded-xl flex flex-col items-center justify-between p-4 w-full md:w-1/3 md:max-w-[356px] border-2 border-[#add8e6]"
            style={{
              minHeight: "465px"
            }}
          >
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="flex flex-col items-center" style={{ height: "160px" }}>
                <div className="relative" style={{ width: "100px", height: "100px" }}>
                  <Image
                    src="/store.svg"
                    alt="Store Visit"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[20px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-bold text-[#212529] mt-4 mb-3">
                  {t("service.store.title")}
                </h3>
              </div>
              <p className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-3 text-center">
                {t("service.store.description")}
              </p>
            </div>
            <div className="text-center">
              <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-medium transition-colors text-sm">
                Select
              </button>
            </div>
          </div>
          <div 
            className="bg-[#f0f8ff] rounded-xl flex flex-col items-center justify-between p-4 w-full md:w-1/3 md:max-w-[356px] border-2 border-[#add8e6]"
            style={{
              minHeight: "465px"
            }}
          >
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="flex flex-col items-center" style={{ height: "160px" }}>
                <div className="relative" style={{ width: "100px", height: "100px" }}>
                  <Image
                    src="/home.svg"
                    alt="Home Visit"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[20px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-bold text-[#212529] mt-4 mb-3">
                  {t("service.home.title")}
                </h3>
              </div>
              <p className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-3 text-center">
                {t("service.home.description")}
              </p>
            </div>
            <div className="text-center">
              <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-medium transition-colors text-sm">
                Select
              </button>
            </div>
          </div>
          <div 
            className="bg-[#f0f8ff] rounded-xl flex flex-col items-center justify-between p-4 w-full md:w-1/3 md:max-w-[356px] border-2 border-[#add8e6]"
            style={{
              minHeight: "465px"
            }}
          >
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="flex flex-col items-center" style={{ height: "160px" }}>
                <div className="relative" style={{ width: "100px", height: "100px" }}>
                  <Image
                    src="/phone.svg"
                    alt="Phone Consultation"
                    width={80}
                    height={80}
                    className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <h3 className="text-[20px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-bold text-[#212529] mt-4 mb-3">
                  {t("service.phone.title")}
                </h3>
              </div>
              <p className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-3 text-center">
                {t("service.phone.description")}
              </p>
            </div>
            <div className="text-center">
              <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-medium transition-colors text-sm">
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
