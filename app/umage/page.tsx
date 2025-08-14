"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/sanity.types";
import { getUmageProducts, getUmageCategories } from "@/sanity/lib/products/getUmageProducts";
import { imageUrl } from "@/lib/ImageUrl";
import ProductionImage from "@/components/ProductionImage";

export default function UmagePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 15; // 5 rows × 3 columns

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getUmageProducts(),
          getUmageCategories()
        ]);
        
        setProducts(productsData);
        
        // Extract category titles and add "All" option
        const categoryTitles = categoriesData.map((cat: any) => cat.title);
        setCategories(["All", ...categoryTitles]);
      } catch (error) {
        console.error("Error fetching UMAGE data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory === "All") return true;
    return product.categories?.some((cat: any) => cat.title === selectedCategory);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return (a.name || "").localeCompare(b.name || "");
    } else if (sortBy === "price") {
      return (a.price || 0) - (b.price || 0);
    }
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading UMAGE products...</p>
        </div>
      </div>
    );
  }

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
      <section 
        className="relative h-[500px] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/living-room-collection.jpg')`
        }}
      >
        {/* Warm Scandinavian Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-orange-50/20 to-rose-100/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-12 py-8 rounded-2xl shadow-lg">
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
                UMAGE
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Scandinavian furniture design that brings people together
              </p>
            </div>
          </div>
        </div>
        
        {/* Floating Design Elements - Warm Scandinavian Colors */}
        <div className="absolute top-16 left-12 w-6 h-6 bg-amber-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-28 right-20 w-4 h-4 bg-orange-200 rounded-full opacity-70 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-16 w-5 h-5 bg-rose-200 rounded-full opacity-65 animate-pulse delay-700"></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-amber-200 rounded-full opacity-80 animate-pulse delay-500"></div>
        <div className="absolute top-36 left-1/4 w-4 h-4 bg-orange-300 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-28 right-1/4 w-6 h-6 bg-rose-300 rounded-full opacity-70 animate-pulse delay-200"></div>
        <div className="absolute top-20 right-1/3 w-3 h-3 bg-amber-400 rounded-full opacity-75 animate-pulse delay-800"></div>
        <div className="absolute bottom-40 left-1/3 w-5 h-5 bg-orange-100 rounded-full opacity-65 animate-pulse delay-400"></div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-1 flex-wrap">
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
        {currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No UMAGE products found.</p>
            <p className="text-gray-400 text-sm mt-2">
              Make sure UMAGE products are added to Sanity CMS and USE_SANITY_PRODUCTS=true is set.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug?.current || product._id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square bg-gray-50">
                    {product.image?.asset ? (
                      <ProductionImage
                        src={imageUrl(product.image).width(400).height(400).url()}
                        alt={product.name || "Product"}
                        fill
                        className="object-contain object-center p-8 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {typeof product.description === 'string' 
                        ? product.description.slice(0, 100) + (product.description.length > 100 ? '...' : '')
                        : product.description 
                          ? 'View product for details'
                          : 'No description available'
                      }
                    </p>
                    <div className="text-lg font-light text-gray-900">
                      {product.price ? `kr ${product.price.toLocaleString()}` : 'Price on request'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

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
