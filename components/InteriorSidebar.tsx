"use client";

import { useLanguage } from "@/lib/languageContext";
import Link from "next/link";
import { useState } from "react";

const InteriorSidebar = () => {
  const { } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      title: "SHOP ALL INTERIOR",
      href: "/interior",
      main: true
    },
    {
      title: "LIVING ROOM",
      href: "/interior/living-room",
      main: true
    },
    {
      title: "Furniture",
      href: "/interior/living-room/furniture"
    },
    {
      title: "Chairs",
      href: "/interior/living-room/chairs"
    },
    {
      title: "Sofa",
      href: "/interior/living-room/sofa"
    },
    {
      title: "Lamp & Illumination",
      href: "/interior/living-room/lighting"
    },
    {
      title: "DINING & KITCHEN",
      href: "/interior/dining-kitchen",
      main: true,
      addLineAbove: true
    },
    {
      title: "Dining Tables",
      href: "/interior/dining-kitchen/tables"
    },
    {
      title: "Dining Chairs",
      href: "/interior/dining-kitchen/chairs"
    },
    {
      title: "BATHROOM",
      href: "/interior/bathroom",
      main: true,
      addLineAbove: true
    },
    {
      title: "Mirrors",
      href: "/interior/bathroom/mirrors"
    },
    {
      title: "Towels",
      href: "/interior/bathroom/towels"
    },
    {
      title: "Bathrobe & Accessories",
      href: "/interior/bathroom/accessories"
    },
    {
      title: "Cabinets",
      href: "/interior/bathroom/cabinets"
    },
    {
      title: "Toilet Essentials",
      href: "/interior/bathroom/essentials"
    },
    {
      title: "BEDROOM",
      href: "/interior/bedroom",
      main: true,
      addLineAbove: true
    },
    {
      title: "Beds",
      href: "/interior/bedroom/beds"
    },
    {
      title: "Dressers",
      href: "/interior/bedroom/dressers"
    },
    {
      title: "Nightstand",
      href: "/interior/bedroom/nightstand"
    },
    {
      title: "Cabinets",
      href: "/interior/bedroom/cabinets"
    },
    {
      title: "HOME OFFICE",
      href: "/interior/home-office",
      main: true,
      addLineAbove: true
    },
    {
      title: "Desk & Cabinets",
      href: "/interior/home-office/desk-cabinets"
    },
    {
      title: "Chairs",
      href: "/interior/home-office/chairs"
    },
    {
      title: "HOME ORGANISATION",
      href: "/interior/organisation",
      main: true,
      addLineAbove: true
    },
    {
      title: "Storage",
      href: "/interior/organisation/storage"
    },
    {
      title: "HOME ACCESSORIES",
      href: "/interior/home-accessories",
      main: true,
      addLineAbove: true
    },
    {
      title: "Decor",
      href: "/interior/home-accessories/decor"
    },
    {
      title: "Vases",
      href: "/interior/home-accessories/vases"
    },
    {
      title: "Wall Art",
      href: "/interior/home-accessories/wall-art"
    },
    {
      title: "Cushions",
      href: "/interior/home-accessories/cushions"
    },
    {
      title: "Throws",
      href: "/interior/home-accessories/throws"
    },
    {
      title: "Lighting",
      href: "/interior/home-accessories/lighting"
    }
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative top-0 left-0 h-full bg-white z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 pr-8 p-6 lg:p-0 shadow-lg lg:shadow-none overflow-y-auto
      `}>
        <nav className="space-y-2 mt-16 lg:mt-0">
        {categories.map((category, index) => (
          <div key={index}>
            {category.addLineAbove && (
              <hr className="my-3 border-gray-300" />
            )}
            <Link
              href={category.href}
              className={`block py-2 hover:text-accent transition-colors ${
                category.main 
                  ? "text-[14px] font-semibold font-['Montserrat',Verdana,Helvetica,sans-serif]" 
                  : "text-sm text-muted-foreground pl-4"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {category.title}
            </Link>
            {(index === 0 || index === 1) && (
              <hr className="my-3 border-gray-300" />
            )}
          </div>
        ))}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default InteriorSidebar;
