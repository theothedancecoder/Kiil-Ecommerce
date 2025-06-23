"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/languageContext";

const images = [
    "/Kartell_Cassinella19537.webp",
    "/Fjordfiesta_ScandiaSeniorVipp_HansBrattrud_.jpg"
];

function BlackFridayBanner() {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const TitleText = () => (
        <div className="flex flex-col items-center text-center w-full justify-center">
            <span className="block uppercase font-[montserrat,verdana,helvetica] not-italic text-[20.8px] font-normal text-[#212529] leading-none mb-0">{t('banner.madeFor')}</span>
            <span className="block lowercase font-[cormorant,times,times-newroman] italic text-[50.8px] text-[#212529] leading-none -mt-4">{t('banner.summer')}</span>
        </div>
    );


    return (
        <div className="relative mx-auto mt-8 mb-6 flex justify-center">
            {/* Hero Image Slider */}
            <div
              className="relative overflow-hidden mx-auto"
              style={{ width: "100%", maxWidth: "1543px", height: "514.13px", overflow: "hidden" }}
            >
                {images.map((src, index) => (
                    <Image
                        key={src}
                        src={src}
                        alt={`Fjordfiesta Luxury Furniture ${index + 1}`}
                        fill
                        className={`object-cover transition-all duration-500 absolute inset-0
                            ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                        style={{ 
                            objectPosition: index === 0 ? (windowWidth >= 768 && windowWidth <= 1024 ? 'calc(95% + 600%) center' : 'calc(95% + 1200%) center') : '0% 80%',
                            maxWidth: "100%",
                            maxHeight: "100%"
                        }}
                        priority={index === 0}
                    />
                ))}
                {/* Light Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />

                {/* Navigation Arrows */}
                <button
                    onClick={prevImage}
                    aria-label="Previous Image"
                    className="absolute top-3/4 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 rounded-full p-2 z-10"
                >
                    &#8592;
                </button>
                <button
                    onClick={nextImage}
                    aria-label="Next Image"
                    className="absolute top-3/4 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 rounded-full p-2 z-10"
                >
                    &#8594;
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Box on desktop */}
                <div className="relative h-full hidden sm:block">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 h-full flex items-end pb-16">
                        {currentIndex !== 0 && (
                            <div className="w-[200px] sm:w-[220px] md:w-[240px] h-[240px] sm:h-[260px] md:h-[280px] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 flex flex-col items-center justify-between ml-0 sm:ml-0 md:ml-0">
                                {/* Made For Summer Box */}
                                <div className="w-[160px] md:w-[180px] h-[28px] md:h-[34.55px] flex items-center justify-center mb-4 mx-auto">
                                    <TitleText />
                                </div>
                                {/* Product List */}
                                <div className="space-y-4 mb-3 text-center">
                                    <p className="text-lg font-montserrat text-[#212529] leading-relaxed">{t('banner.collection')}</p>
                                </div>
                                {/* Discount Badge */}
                                <div className="inline-flex items-center justify-center px-6 py-2 bg-[#eff9ff] text-primary rounded-lg mb-2">
                                    <span className="text-xl font-bold">15% {t('banner.off')}</span>
                                </div>
                                {/* Shop Now Button */}
                                <Link 
                                    href="/mobler" 
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                                >
                                    {t('product.shopNow')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

                {/* Box below image on mobile */}
                <div className="sm:hidden w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mt-4 flex flex-col items-center justify-between">
                    {currentIndex !== 0 && (
                        <>
                            {/* Made For Summer Box */}
                            <div className="w-full flex items-center justify-center mb-4">
                                <TitleText />
                            </div>
                            {/* Product List */}
                            <div className="space-y-4 mb-3 text-center w-full">
                                <p className="text-lg font-montserrat text-[#212529] leading-relaxed">{t('banner.collection')}</p>
                            </div>
                            {/* Discount Badge */}
                            <div className="inline-flex items-center justify-center px-6 py-2 bg-[#eff9ff] text-primary rounded-lg mb-2">
                                <span className="text-xl font-bold">15% {t('banner.off')}</span>
                            </div>
                            {/* Shop Now Button */}
                            <Link 
                                href="/mobler" 
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                            >
                                {t('product.shopNow')}
                            </Link>
                        </>
                    )}
                </div>
        </div>
    );
}

export default BlackFridayBanner;
