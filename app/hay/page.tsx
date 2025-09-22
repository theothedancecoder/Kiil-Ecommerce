"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/sanity.types";
import { getHayProducts, getHayCategories } from "@/sanity/lib/products/getHayProducts";
import { getBrandBanner, BrandBanner } from "@/sanity/lib/getBrandBanner";
import { imageUrl } from "@/lib/ImageUrl";
import ProductionImage from "@/components/ProductionImage";
import ProductGridItem from "@/components/ProductGridItem";
import Header from "@/components/Header";

// Enhanced pricing for specific HAY products
const hayEnhancedPricing: { [key: string]: number } = {
  "dont-leave-me-xl-dlm-side-table": 2499,
  "palissade-bench-l-120": 4999,
  "palissade-cone-table-o-60": 3999,
  "palissade-dining-chair": 1999,
  "palissade-armchair": 2499,
  "palissade-lounge-chair": 2999,
  "palissade-low-table": 3499,
  "neu-table-high": 5999,
  "neu-table-low": 4999,
  "palisade-bar-stool": 2299,
  "dont-leave-me-dlm-side-table": 1999,
  "kofi-coffee-table-60x60": 3299,
  "palisade-chair": 1799,
};

export default function HayPage() {
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
          getHayProducts(),
          getHayCategories(),
          getBrandBanner('hay')
        ]);
        
        setProducts(productsData);
        setBanner(bannerData);
        
        // Extract category titles and add "All" option
        const categoryTitles = categoriesData.map((cat: any) => cat.title);
        setCategories(["All", ...categoryTitles]);
      } catch (error) {
        console.error("Error fetching HAY data:", error);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading HAY products...</p>
        </div>
      </div>
    );
  }

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
            <svg
              className="w-4 h-4 mr-2"
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
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Our Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our curated selection of HAY products, combining timeless design with modern functionality.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border-b border-gray-200 mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-yellow-600 text-white"
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

          {/* Products Grid */}
          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <ProductGridItem
                key={product._id}
                product={product}
                brandPath="hay"
                enhancedPricing={hayEnhancedPricing}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center space-x-4">
              {/* Previous Button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-yellow-600 text-white"
                          : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
              >
                Next
                <svg
                  className="w-5 h-5 ml-2"
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
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">
                Danish Design Excellence
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                HAY is renowned for its commitment to functional and aesthetic design, blending Scandinavian minimalism with contemporary style. Explore our curated collection of iconic furniture and accessories.
              </p>
              <Link
                href="/tjenester"
                className="inline-flex items-center px-8 py-3 bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-colors duration-300"
              >
                Discover Our Heritage
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <ProductionImage
                  src="/HAY/Don't-leave me-DLM-side-table /lifestyle/10509796r_3.jpg"
                  alt="HAY Craftsmanship"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
