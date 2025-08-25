"use client"

import { Product } from "@/sanity.types";
import {AnimatePresence, motion} from 'framer-motion';
import ProductThumbWithStock from "./ProductThumbWithStock";
import { useState, useMemo } from "react";

type SortOption = "newest" | "price-low" | "price-high";

function ProductGridWithPagination({ 
  products, 
  showPrice = false, 
  itemsPerPage = 12 
}: { 
  products: Product[], 
  showPrice?: boolean, 
  itemsPerPage?: number 
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortOption>("newest");

    // Function to determine if a product is new (created within last 30 days)
    const isNewProduct = (product: Product): boolean => {
      if (product._createdAt) {
        const createdDate = new Date(product._createdAt);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return createdDate > thirtyDaysAgo;
      }
      return false;
    };

    // Sort products based on selected option
    const sortedProducts = useMemo(() => {
      let sorted = [...products];

      switch (sortBy) {
        case "newest":
          sorted.sort((a, b) => {
            // First, sort by new products
            const aIsNew = isNewProduct(a);
            const bIsNew = isNewProduct(b);
            
            if (aIsNew && !bIsNew) return -1;
            if (!aIsNew && bIsNew) return 1;
            
            // Then by creation date
            const aDate = new Date(a._createdAt || 0);
            const bDate = new Date(b._createdAt || 0);
            return bDate.getTime() - aDate.getTime();
          });
          break;
          
        case "price-low":
          sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
          
        case "price-high":
          sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
      }

      return sorted;
    }, [products, sortBy]);

    // Calculate pagination
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, endIndex);

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (value: SortOption) => {
        setSortBy(value);
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    return (
        <div className="relative bg-white">
            {/* Sorting Controls */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-600">
                        Showing {Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} products
                    </div>
                    
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value as SortOption)}
                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Umage-style container with 3-column grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {currentProducts?.map((product, index) => (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="w-full group relative"
                            >
                                <ProductThumbWithStock 
                                    product={product} 
                                    showPrice={showPrice} 
                                    isNew={isNewProduct(product)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 space-x-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 text-sm font-medium border transition-colors ${
                                currentPage === 1
                                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                            }`}
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        {getPageNumbers().map((page, index) => (
                            <div key={index}>
                                {page === '...' ? (
                                    <span className="px-4 py-2 text-gray-500">...</span>
                                ) : (
                                    <button
                                        onClick={() => handlePageChange(page as number)}
                                        className={`px-4 py-2 text-sm font-medium border transition-colors ${
                                            currentPage === page
                                                ? 'bg-stone-800 text-white border-stone-800'
                                                : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 text-sm font-medium border transition-colors ${
                                currentPage === totalPages
                                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductGridWithPagination;
