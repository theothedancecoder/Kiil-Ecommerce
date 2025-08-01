"use client";

import Image from "next/image";
import Link from "next/link";
import { outdoorProducts } from "@/lib/outdoorProducts";
import { formatCurrency } from "@/lib/formatCurrency";

const OutdoorFurnitureGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {outdoorProducts.map((product) => (
        <Link 
          key={product.id}
          href={`/utendors/product/${product.id}`}
          className="group block"
        >
          <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  {product.brand}
                </p>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                {product.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(product.price, "NOK")}
                </div>
                
                {product.variants && product.variants.length > 1 && (
                  <div className="flex space-x-1">
                    {product.variants.slice(0, 3).map((variant, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: variant.color.toLowerCase().includes('green') ? '#22c55e' :
                                         variant.color.toLowerCase().includes('ivory') || variant.color.toLowerCase().includes('ash') || variant.color.toLowerCase().includes('papyrus') ? '#f5f5f4' :
                                         variant.color.toLowerCase().includes('charcoal') ? '#374151' :
                                         variant.color.toLowerCase().includes('yellow') ? '#eab308' :
                                         variant.color.toLowerCase().includes('marine') ? '#1e40af' : '#9ca3af'
                        }}
                        title={variant.color}
                      />
                    ))}
                    {product.variants.length > 3 && (
                      <span className="text-xs text-gray-500 ml-1">+{product.variants.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Category Badge */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {product.subcategory.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OutdoorFurnitureGrid;
