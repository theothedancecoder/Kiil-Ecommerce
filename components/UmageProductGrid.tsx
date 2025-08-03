"use client";

import { Product } from "@/sanity.types";
import ProductionImage from "@/components/ProductionImage";
import Link from "next/link";
import { useState } from "react";
import { imageUrl } from "@/lib/ImageUrl";

interface UmageProductGridProps {
  products: Product[];
}

export default function UmageProductGrid({ products }: UmageProductGridProps) {
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(12); // Show 12 products initially
  const [isLoading, setIsLoading] = useState(false);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price") {
      return (a.price || 0) - (b.price || 0);
    }
    if (sortBy === "name") {
      return (a.name || "").localeCompare(b.name || "");
    }
    return 0;
  });

  // Get products to display (limited by displayCount)
  const displayedProducts = sortedProducts.slice(0, displayCount);
  const hasMoreProducts = displayCount < sortedProducts.length;

  // Load more products function
  const loadMoreProducts = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 12, sortedProducts.length));
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filter and Sort Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          {/* Filter button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Filtrer
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="name">Sorter etter navn</option>
            <option value="price">Sorter etter pris</option>
          </select>
        </div>
      </div>

      {/* Products Grid - 4 columns like Umage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product, index) => (
          <div key={product._id} className="group relative">
            {/* Product Card */}
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                {product.image?.asset ? (
                  <ProductionImage
                    src={imageUrl(product.image).width(400).height(400).url()}
                    alt={product.name || "Product"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                
                {/* NEW Badge - show on some products */}
                {index < 4 && (
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 text-xs font-medium text-gray-900 rounded">
                    NEW
                  </div>
                )}

                {/* Quick Add Button */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link href={product.href || `/products/${product.slug?.current || product._id}`}>
                  <h3 className="text-lg font-light text-gray-900 mb-1 hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Brand Badge */}
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  {product.brand}
                </div>
                
                {/* Product Description */}
                {product.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {typeof product.description === 'string' 
                      ? product.description.slice(0, 100) + (product.description.length > 100 ? '...' : '')
                      : Array.isArray(product.description) 
                        ? (product.description as any[])
                            .filter((block: any) => block._type === 'block' && 'children' in block)
                            .map((block: any) => 
                              'children' in block && block.children
                                ?.filter((child: any) => child._type === 'span')
                                ?.map((child: any) => child.text)
                                ?.join(' ')
                            )
                            .join(' ')
                            .slice(0, 100) + '...'
                        : ''
                    }
                  </p>
                )}

                {/* Price */}
                <div className="text-lg font-light text-gray-900 mb-3">
                  {product.price ? `${product.price.toLocaleString()} kr` : 'Pris på forespørsel'}
                </div>

                {/* Color Variants */}
                <div className="flex space-x-2">
                  {product.variants && product.variants.length > 0 ? (
                    // Show actual variants from Sanity
                    product.variants.slice(0, 3).map((variant: any, idx: number) => (
                      <div
                        key={idx}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ 
                          backgroundColor: variant.color 
                            ? (variant.color.toLowerCase().includes('white') ? '#F3F4F6' 
                               : variant.color.toLowerCase().includes('black') ? '#1F2937'
                               : variant.color.toLowerCase().includes('brown') ? '#92400E'
                               : variant.color.toLowerCase().includes('oak') ? '#D2B48C'
                               : '#D1D5DB') 
                            : '#D1D5DB' 
                        }}
                        title={variant.name}
                      />
                    ))
                  ) : (
                    // Default variant indicators if no variants
                    <>
                      <div className="w-4 h-4 rounded-full bg-amber-100 border border-gray-200"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-800 border border-gray-200"></div>
                      <div className="w-4 h-4 rounded-full bg-green-700 border border-gray-200"></div>
                    </>
                  )}
                  {product.variants && product.variants.length > 3 && (
                    <button className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                      <svg className="w-2 h-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="text-center mt-12">
          <button 
            onClick={loadMoreProducts}
            disabled={isLoading}
            className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Laster...
              </span>
            ) : (
              'Last inn flere produkter'
            )}
          </button>
        </div>
      )}

      {/* Show total count */}
      <div className="text-center mt-6 text-sm text-gray-500">
        Viser {displayedProducts.length} av {sortedProducts.length} produkter
      </div>
    </div>
  );
}
