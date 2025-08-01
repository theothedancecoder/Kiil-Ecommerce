"use client"

import { Product } from "@/sanity.types";
import {AnimatePresence, motion} from 'framer-motion';
import ProductThumbWithStock from "./ProductThumbWithStock";
import { useState, useMemo } from "react";

function ProductGridWithPagination({ products, showPrice = false }: { products: Product[], showPrice?: boolean }) {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12; // 4 rows × 3 columns = 12 products per page

    // Calculate pagination
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

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
        // Scroll to top of products grid
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative bg-white">
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
                                    isNew={startIndex + index < 8} // Mark first 8 products as "NEW"
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

                {/* Results Info */}
                {products.length > 0 && (
                    <div className="text-center mt-6 text-sm text-gray-500">
                        Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductGridWithPagination;
