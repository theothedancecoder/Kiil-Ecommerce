"use client";

import { imageUrl } from "@/lib/ImageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/lib/languageContext";

function ProductThumb({product, showPrice = true}: {product: Product, showPrice?: boolean}) {
    const { t } = useLanguage();
    const isOutOfStock = product.stock != null && product.stock <= 0;
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
            className={`group bg-white transition-all duration-300 ease-out ${isOutOfStock ? "opacity-70" : ""}`}
            style={{ width: '194.55px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div 
                className="relative overflow-hidden cursor-pointer bg-gray-50"
                style={{
                    width: '194.55px',
                    height: '194.55px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px'
                }}
            >
                {/* Subtle hover shadow */}
                <div 
                    className={`absolute inset-0 rounded transition-all duration-300 ${isHovered ? 'shadow-lg' : ''}`}
                    style={{
                        boxShadow: isHovered ? '0 8px 25px rgba(0,0,0,0.1)' : 'none'
                    }}
                />
                
                {product.image && (
                    <div className="absolute inset-0">
                        <Image
                            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                            src={imageUrl(product.image).url()}
                            alt={product.name || "Product image"}
                            fill
                            sizes="194px"
                        />
                        
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                )}
                
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm">
                        <span className="text-gray-600 font-medium text-sm">{t('product.outOfStock')}</span>
                    </div>
                )}
            </div>
            
            {/* Product Info Below Image - Ballard Designs Style */}
            <div className="pt-3 text-center">
                <h3 className="text-gray-900 font-medium text-sm leading-tight mb-1"
                    style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        letterSpacing: "0.01em",
                        lineHeight: "1.3"
                    }}>
                    {product.name}
                </h3>
                {showPrice && (
                    <p className="text-gray-700 text-sm font-medium">
                        {product.price?.toLocaleString('no-NO')} kr
                    </p>
                )}
            </div>
        </div>
    );
}

export default ProductThumb;
