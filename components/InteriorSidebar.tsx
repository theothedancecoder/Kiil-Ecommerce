"use client";

import { useLanguage } from "@/lib/languageContext";
import Link from "next/link";
import { useState } from "react";

const InteriorSidebar = () => {
  const { } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'categories' | 'filters'>('categories');

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
      title: "All Living Room Furniture",
      href: "/interior/living-room/furniture"
    },
    {
      title: "Chairs & Armchairs",
      href: "/interior/living-room/chairs"
    },
    {
      title: "Sofas & Seating",
      href: "/interior/living-room/sofa"
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

  const priceRanges = [
    { label: "Under 1,000 kr", value: [0, 1000] },
    { label: "1,000 - 5,000 kr", value: [1000, 5000] },
    { label: "5,000 - 10,000 kr", value: [5000, 10000] },
    { label: "10,000 - 25,000 kr", value: [10000, 25000] },
    { label: "25,000+ kr", value: [25000, 100000] },
  ];

  const colors = ["White", "Black", "Gray", "Brown", "Beige", "Blue", "Green", "Red", "Yellow"];
  const materials = ["Wood", "Metal", "Fabric", "Leather", "Glass", "Ceramic", "Plastic"];
  const brands = ["Fritz Hansen", "Montana", "Kartell", "Fredericia", "Vitra", "&Tradition", "Flos", "Louis Poulsen"];
  const sizes = ["Small", "Medium", "Large", "Extra Large"];

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
        w-80 pr-8 p-6 lg:p-0 shadow-lg lg:shadow-none overflow-y-auto
      `}>
        <div className="mt-16 lg:mt-0">
          {/* Tab Navigation */}
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex-1 py-2 text-sm font-medium ${
                activeTab === 'categories' 
                  ? 'border-b-2 border-stone-800 text-stone-800' 
                  : 'text-stone-600 hover:text-stone-800'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('filters')}
              className={`flex-1 py-2 text-sm font-medium ${
                activeTab === 'filters' 
                  ? 'border-b-2 border-stone-800 text-stone-800' 
                  : 'text-stone-600 hover:text-stone-800'
              }`}
            >
              Filters
            </button>
          </div>

          {activeTab === 'categories' && (
            <nav className="space-y-2">
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
          )}

          {activeTab === 'filters' && (
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        className="mr-2"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Colors</h3>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Materials</h3>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <label key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                      />
                      <span className="text-sm">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Sizes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                className="w-full py-2 text-sm text-stone-600 hover:text-stone-800 border border-stone-300 rounded-md hover:border-stone-400 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
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
