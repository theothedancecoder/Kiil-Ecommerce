"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/sanity.types";
import ProductionImage from "@/components/ProductionImage";
import ProductGridItem from "@/components/ProductGridItem";
import Header from "@/components/Header";

export default function SorenLundPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Define all Soren Lund products - use any to avoid TypeScript strict type checking
  const sorenLundProducts: any[] = [
    {
      _id: 'sl330-sk-footstool',
      _type: 'product',
      name: 'SL330:SK Footstool',
      slug: { current: 'sl330-sk-footstool', _type: 'slug' },
      price: 17055,
      brand: 'Soren Lund',
      image: {
        asset: {
          _id: 'sl330-sk-footstool-img',
          url: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Black.webp'
        }
      },
      categories: [{ _id: 'furniture', title: 'Furniture', slug: { current: 'furniture', _type: 'slug' } }]
    },
    {
      _id: 'sl409-swivel-chair',
      _type: 'product',
      name: 'SL409 Swivel Chair',
      slug: { current: 'sl409-swivel-chair', _type: 'slug' },
      price: 29935,
      brand: 'Soren Lund',
      image: {
        asset: {
          _id: 'sl409-swivel-chair-img',
          url: '/Soren-Lund/SL409-swivel-chair/Soren Lund SL409 swivel chair NOK  29,935  SL409 swivel chair quantity 1 .webp'
        }
      },
      categories: [{ _id: 'furniture', title: 'Furniture', slug: { current: 'furniture', _type: 'slug' } }]
    },
    {
      _id: 'sl330-1-adjustable-armchair',
      _type: 'product',
      name: 'SL330:1 Adjustable Armchair',
      slug: { current: 'sl330-1-adjustable-armchair', _type: 'slug' },
      price: 55160,
      brand: 'Soren Lund',
      image: {
        asset: {
          _id: 'sl330-1-adjustable-armchair-img',
          url: '/Soren-Lund/SLK-330/Soren Lund SL330:1 adjustable armchair NOK  55,160.webp'
        }
      },
      categories: [{ _id: 'furniture', title: 'Furniture', slug: { current: 'furniture', _type: 'slug' } }]
    }
  ];

  const categories = ["All", "Furniture"];
  
  const filteredProducts = sorenLundProducts.filter(product => {
    if (selectedCategory === "All") return true;
    return product.categories?.some((cat: any) => cat.title === selectedCategory);
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation and Cart */}
      <Header />
      
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Soren Lund Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our range of exceptional Scandinavian furniture pieces, designed with timeless aesthetics and crafted with exceptional attention to detail.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border-b border-gray-200 mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-1 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} products
                </span>
                {totalPages > 1 && (
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <ProductGridItem
                key={product._id}
                product={product}
                brandPath="soren-lund"
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center space-x-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-amber-600 text-white"
                        : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
