"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  name: string;
  image: string;
  size?: string;
  price: number;
  material?: string;
  base?: string;
  leather?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  variants: ProductVariant[];
  designer?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
}

const products: Product[] = [
  {
    id: "salon-dining-chair",
    name: "Salon Dining Chair",
    description: "An elegant dining chair with premium leather upholstery and solid wood base options.",
    price: 22005,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oiled Oak - Supreme Dark Chocolate",
        image: "/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp",
        base: "Oiled Oak",
        leather: "Supreme Dark Chocolate",
        price: 22005,
      },
      {
        name: "Soaped Oak - Supreme Dark Chocolate",
        image: "/Ro-Collection/Salon dining chair/ Salon dining chair NOK  22,005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp",
        base: "Soaped Oak",
        leather: "Supreme Dark Chocolate",
        price: 22005,
      },
      {
        name: "Oiled Oak - Supreme Cognac",
        image: "/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Oiled oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp",
        base: "Oiled Oak",
        leather: "Supreme Cognac",
        price: 22005,
      },
      {
        name: "Smoked Oak - Supreme Cognac",
        image: "/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp",
        base: "Smoked Oak",
        leather: "Supreme Cognac",
        price: 22005,
      },
      {
        name: "Smoked Oak - Supreme Dark Chocolate",
        image: "/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp",
        base: "Smoked Oak",
        leather: "Supreme Dark Chocolate",
        price: 22005,
      },
      {
        name: "Soaped Oak - Supreme Cognac",
        image: "/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp",
        base: "Soaped Oak",
        leather: "Supreme Cognac",
        price: 22005,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Premium leather upholstery",
      "Solid wood base construction",
      "Multiple wood finish options",
      "Supreme quality leather",
      "Contemporary Scandinavian design",
      "Comfortable ergonomic design",
      "Handcrafted details",
      "Durable construction",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material", value: "Solid wood with leather upholstery" },
      { label: "Base Options", value: "Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Leather Options", value: "Supreme Dark Chocolate, Supreme Cognac" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Regular leather care and wood maintenance" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
  },
  {
    id: "salon-dining-table-round-120",
    name: "Salon Dining Table Ø-120",
    description: "A beautiful round dining table perfect for intimate dining experiences.",
    price: 29940,
    category: "Dining Tables",
    variants: [
      {
        name: "Oiled Oak",
        image: "/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp",
        material: "Oiled Oak",
        price: 29940,
      },
      {
        name: "Soaped Oak",
        image: "/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Soaped oak.webp",
        material: "Soaped Oak",
        price: 29940,
      },
      {
        name: "Smoked Oak",
        image: "/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  33,450  Color -  Smoked oak.webp",
        material: "Smoked Oak",
        price: 33450,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Round dining table design",
      "Premium solid wood construction",
      "Multiple wood finish options",
      "Seats 4-6 people comfortably",
      "Contemporary Scandinavian design",
      "Durable construction",
      "Perfect for intimate dining",
      "Timeless aesthetic",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material", value: "Solid wood" },
      { label: "Wood Options", value: "Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Diameter", value: "Ø120cm" },
      { label: "Seating", value: "4-6 people" },
      { label: "Care", value: "Dust regularly, use wood care products" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
  },
  {
    id: "salon-dining-table-round-120-extension",
    name: "Salon Dining Table with Extension Option, Ø-120",
    description: "A versatile round dining table with extension capability for larger gatherings.",
    price: 29940,
    category: "Dining Tables",
    variants: [
      {
        name: "Oiled Oak",
        image: "/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp",
        material: "Oiled Oak",
        price: 29940,
      },
      {
        name: "Soaped Oak",
        image: "/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Soaped oak.webp",
        material: "Soaped Oak",
        price: 29940,
      },
      {
        name: "Smoked Oak",
        image: "/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  33,450  Color -  Smoked oak.webp",
        material: "Smoked Oak",
        price: 33450,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Round dining table with extension",
      "Premium solid wood construction",
      "Multiple wood finish options",
      "Expandable for larger gatherings",
      "Contemporary Scandinavian design",
      "Durable construction",
      "Versatile dining solution",
      "Easy extension mechanism",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material", value: "Solid wood" },
      { label: "Wood Options", value: "Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Diameter", value: "Ø120cm (extendable)" },
      { label: "Seating", value: "4-8 people (with extension)" },
      { label: "Care", value: "Dust regularly, use wood care products" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
  },
  {
    id: "salon-dining-table-rectangular-extension",
    name: "Salon Dining Table with Extension Option",
    description: "A spacious rectangular dining table with extension capability for large gatherings.",
    price: 35190,
    category: "Dining Tables",
    variants: [
      {
        name: "190x90 - Oiled Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp",
        size: "190x90",
        material: "Oiled Oak",
        price: 35190,
      },
      {
        name: "190x90 - Soaped Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Soaped oak.webp",
        size: "190x90",
        material: "Soaped Oak",
        price: 35190,
      },
      {
        name: "220x100 - Oiled Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37,815  Size -  220x100 190x90 220x100 Color -  Oiled oak.webp",
        size: "220x100",
        material: "Oiled Oak",
        price: 37815,
      },
      {
        name: "220x100 - Soaped Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37,815  Size -  220x100 190x90 220x100 Color -  Soaped oak.webp",
        size: "220x100",
        material: "Soaped Oak",
        price: 37815,
      },
      {
        name: "190x90 - Smoked Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  38,700  Size -  190x90 190x90 220x100 Color -  Smoked oak.webp",
        size: "190x90",
        material: "Smoked Oak",
        price: 38700,
      },
      {
        name: "220x100 - Smoked Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  41,385  Size -  220x100 190x90 220x100 Color -  Smoked oak.webp",
        size: "220x100",
        material: "Smoked Oak",
        price: 41385,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Rectangular dining table with extension",
      "Premium solid wood construction",
      "Multiple size and wood options",
      "Perfect for large gatherings",
      "Contemporary Scandinavian design",
      "Durable construction",
      "Spacious dining solution",
      "Easy extension mechanism",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material", value: "Solid wood" },
      { label: "Wood Options", value: "Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Size Options", value: "190x90cm, 220x100cm" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Seating", value: "6-10 people (with extension)" },
      { label: "Care", value: "Dust regularly, use wood care products" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
  },
  {
    id: "extension-leaf-round-120",
    name: "Extension Leaf for Salon Dining Table Ø-120",
    description: "Extension leaf accessory for the round Salon dining table.",
    price: 5130,
    category: "Accessories",
    variants: [
      {
        name: "Black MDF",
        image: "/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  5,130  Color -  Black MDF.webp",
        material: "Black MDF",
        price: 5130,
      },
      {
        name: "Oiled Oak",
        image: "/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  7,950  Color -  Oiled oak.webp",
        material: "Oiled Oak",
        price: 7950,
      },
      {
        name: "Soaped Oak",
        image: "/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  7,950  Color -  Soaped oak.webp",
        material: "Soaped Oak",
        price: 7950,
      },
      {
        name: "Smoked Oak",
        image: "/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  9,690  Color -  Smoked oak.webp",
        material: "Smoked Oak",
        price: 9690,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Extension leaf for round table",
      "Multiple material options",
      "Perfect fit for Salon table",
      "Easy to install and store",
      "Matching finishes available",
      "Durable construction",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material Options", value: "Black MDF, Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Compatibility", value: "Salon Dining Table Ø-120" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Clean with appropriate materials" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
  },
  {
    id: "extension-plate-rectangular",
    name: "Extension Plate for Salon Dining Table",
    description: "Extension plate accessory for the rectangular Salon dining table.",
    price: 5130,
    category: "Accessories",
    variants: [
      {
        name: "50x90 - Black MDF",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x90 50x100 50x90 Color -  Black MDF.webp",
        size: "50x90",
        material: "Black MDF",
        price: 5130,
      },
      {
        name: "50x100 - Black MDF",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x100 50x100 50x90 Color -  Black MDF.webp",
        size: "50x100",
        material: "Black MDF",
        price: 5130,
      },
      {
        name: "50x90 - Oiled Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x90 50x100 50x90 Color -  Oiled oak.webp",
        size: "50x90",
        material: "Oiled Oak",
        price: 7950,
      },
      {
        name: "50x100 - Oiled Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x100 50x100 50x90 Color -  Oiled oak.webp",
        size: "50x100",
        material: "Oiled Oak",
        price: 7950,
      },
      {
        name: "50x90 - Soaped Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x90 50x100 50x90 Color -  Soaped oak.webp",
        size: "50x90",
        material: "Soaped Oak",
        price: 7950,
      },
      {
        name: "50x100 - Soaped Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x100 50x100 50x90 Color -  Soaped oak.webp",
        size: "50x100",
        material: "Soaped Oak",
        price: 7950,
      },
      {
        name: "50x90 - Smoked Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  9,690  Size -  50x90 50x100 50x90 Color -  Smoked oak.webp",
        size: "50x90",
        material: "Smoked Oak",
        price: 9690,
      },
      {
        name: "50x100 - Smoked Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  9,690  Size -  50x100 50x100 50x90 Color -  Smoked oak.webp",
        size: "50x100",
        material: "Smoked Oak",
        price: 9690,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Extension plate for rectangular table",
      "Multiple size and material options",
      "Perfect fit for Salon table",
      "Easy to install and store",
      "Matching finishes available",
      "Durable construction",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material Options", value: "Black MDF, Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Size Options", value: "50x90cm, 50x100cm" },
      { label: "Compatibility", value: "Salon Dining Table (Rectangular)" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Clean with appropriate materials" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
  },
];

export default function ROCollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const categories = ["All", "Dining Chairs", "Dining Tables", "Accessories"];

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Homepage */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/"
            className="inline-flex items-center text-stone-600 hover:text-stone-800 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="/Ro-Collection/lifestyle/Gal_2_724663c2-5a86-4611-8289-baf4b34e6c5e.webp"
          alt="RO Collection"
          fill
          className="object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-800/40 to-stone-700/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-12 py-8 rounded-2xl shadow-lg">
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
                RO COLLECTION
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Contemporary Scandinavian furniture design with timeless elegance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {sortedProducts.length} products
              </span>
              {totalPages > 1 && (
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/ro-collection/${product.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={product.variants[0].image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-8 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="text-lg font-light text-gray-900">
                    kr {product.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    currentPage === page
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              <span>Next</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
