"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/sanity.types";
import { getUmageProducts, getUmageCategories } from "@/sanity/lib/products/getUmageProducts";
import { getBrandBanner, BrandBanner } from "@/sanity/lib/getBrandBanner";
import { imageUrl } from "@/lib/ImageUrl";
import ProductionImage from "@/components/ProductionImage";
import ProductGridItem from "@/components/ProductGridItem";
import Header from "@/components/Header";

// Enhanced pricing for specific Umage products
const umageEnhancedPricing: { [key: string]: number } = {
  "asteria-spotlight": 2099,
  "a-conversation-piece-dining-chair": 7499,
  "heiko-dining-chair": 6999,
  "comfort-circle-dining-table": 17999,
  "heart-n-soul-200-dining-table": 19999,
  "audacious-desk": 14999,
  "chordis": 5699,
  "duende-desk": 12999,
};

export default function UmagePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<BrandBanner | null>(null);
  const productsPerPage = 15; // 5 rows × 3 columns

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData, bannerData] = await Promise.all([
          getUmageProducts(),
          getUmageCategories(),
          getBrandBanner('umage')
        ]);
        
        setProducts(productsData);
        setBanner(bannerData);
        
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
      {/* Header with Navigation and Cart */}
      <Header />
      
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
        className="relative h-[600px] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${banner?.bannerImage 
            ? imageUrl(banner.bannerImage).width(1400).height(600).url() 
            : '/umage/A-Conversation-Piece/lifestyle/umage_lifestyle_a-conversation-piece_dining-chair_walnut_morning-meadows_1600x.webp'
          }')`
        }}
      >
        
        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">
                  Scandinavian Design
                </span>
                <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
                  {banner?.title || "UMAGE"}
                </h1>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  {banner?.subtitle || "Furniture design that brings people together through timeless Scandinavian craftsmanship and contemporary aesthetics"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      const productsSection = document.querySelector('.products-grid');
                      productsSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Explore Collection
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle Design Elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 right-24 w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-40 w-1 h-1 bg-white/45 rounded-full animate-pulse delay-500"></div>
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
      <div className="products-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              <ProductGridItem
                key={product._id}
                product={product}
                brandPath="umage"
                enhancedPricing={umageEnhancedPricing}
              />
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
