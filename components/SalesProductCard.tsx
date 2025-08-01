"use client";

import ProductionImage from "@/components/ProductionImage";
import Link from "next/link";
import { useState } from "react";
import { SaleProduct, calculateSavings } from "@/lib/salesData";

interface SalesProductCardProps {
  product: SaleProduct;
}

export default function SalesProductCard({ product }: SalesProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const savings = calculateSavings(product.originalPrice, product.salePrice);
  const hasPricing = product.originalPrice > 0 && product.salePrice > 0;
  
  return (
    <Link href={`/salg/${product.id}`} className="block">
      <div className="group bg-white transition-all duration-300 ease-out hover:shadow-lg cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3] mb-6">
        {!imageError ? (
          <ProductionImage
            className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-sm">Bilde ikke tilgjengelig</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="space-y-3">
        {/* Brand */}
        <div className="text-sm font-medium text-gray-800 uppercase tracking-wider">
          {product.brand}
        </div>
        
        {/* Product Name */}
        <h3 className="text-lg font-medium text-gray-900 leading-relaxed underline">
          {product.name}
        </h3>
        
        {/* Designer */}
        {product.designer && (
          <p className="text-sm text-gray-600 font-light">
            {product.designer}
          </p>
        )}
        
        {/* Pricing */}
        {hasPricing ? (
          <div className="space-y-1 pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500 font-light">price</span>
              <div className="flex items-baseline space-x-4">
                <span className="text-sm text-gray-500 line-through font-light">
                  kr {product.originalPrice.toLocaleString('no-NO')}
                </span>
                <span className="text-base font-medium text-red-500">
                  -{savings}%
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500 font-light">discounted price</span>
              <span className="text-base font-medium text-red-500">
                kr {product.salePrice.toLocaleString('no-NO')}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-1 pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500 font-light">price</span>
              <span className="text-base font-medium text-red-500">
                Kontakt oss
              </span>
            </div>
          </div>
        )}
      </div>
      </div>
    </Link>
  );
}
