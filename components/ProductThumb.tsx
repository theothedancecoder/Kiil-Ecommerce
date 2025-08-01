"use client";

import { imageUrl } from "@/lib/ImageUrl";
import { Product } from "@/sanity.types";
import ProductionImage from "@/components/ProductionImage";
import { useState } from "react";
import { useLanguage } from "@/lib/languageContext";
import { calculateDiscountPercentage } from "@/lib/discountUtils";
import Link from "next/link";

interface ExtendedProduct extends Product {
    salePrice?: number;
    originalPrice?: number;
    staticProduct?: boolean;
    staticHref?: string;
    staticImage?: string;
    staticBrand?: string;
    brand?: string;
}

function ProductThumb({product, showPrice = true, isNew = false}: {product: ExtendedProduct, showPrice?: boolean, isNew?: boolean}) {
    // Safely handle language context
    let t: (key: string) => string;
    try {
        const { t: translateFn } = useLanguage();
        t = translateFn;
    } catch (error) {
        // Fallback if not within LanguageProvider
        t = (key: string) => {
            const fallbacks: { [key: string]: string } = {
                'product.outOfStock': 'Out of Stock'
            };
            return fallbacks[key] || key;
        };
    }
    
    const isOutOfStock = product.stock != null && product.stock <= 0;
    const [isHovered, setIsHovered] = useState(false);
    
    // Check if product is on sale
    const isOnSale = product.salePrice && product.salePrice < (product.originalPrice || product.price || 0);
    const discountPercentage = isOnSale && product.salePrice ? 
        calculateDiscountPercentage(product.originalPrice || product.price || 0, product.salePrice) : 0;
    
    // Determine the image source and link href
    const imageSrc = product.staticProduct && product.staticImage 
        ? product.staticImage 
        : product.image 
            ? imageUrl(product.image).url() 
            : null;
    
    // Route Ablo Blommaert products to their dedicated template
    const linkHref = product.staticProduct && product.staticHref 
        ? product.staticHref 
        : product.brand === "Ablo Blommaert"
            ? `/ablo-blommaert/${product.slug?.current}`
            : `/products/${product.slug?.current}`;
    
    const productContent = (
        <div 
            className={`group bg-white rounded-lg overflow-hidden transition-all duration-300 ease-out ${isOutOfStock ? "opacity-70" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container - Umage Style */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                {imageSrc ? (
                    <ProductionImage
                        className={`${
                            // Use object-contain for furniture products to prevent cropping
                            product.name?.toLowerCase().includes('sofa') || 
                            product.name?.toLowerCase().includes('chair') ||
                            product.name?.toLowerCase().includes('bench') ||
                            product.name?.toLowerCase().includes('table')
                                ? "object-contain object-center p-4" 
                                : "object-cover object-center"
                        } transition-transform duration-300 group-hover:scale-105`}
                        src={imageSrc}
                        alt={product.name || "Product image"}
                        fill
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                    </div>
                )}
                
                {/* NEW Badge - Umage Style */}
                {isNew && (
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 text-xs font-medium text-gray-900 rounded">
                        NEW
                    </div>
                )}
                
                {/* Sale Badge */}
                {isOnSale && discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
                            -{discountPercentage}%
                        </span>
                    </div>
                )}

                {/* Quick Add Button - Umage Style */}
                {!isOnSale && (
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                )}
                
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm">
                        <span className="text-gray-600 font-medium text-sm">{t('product.outOfStock')}</span>
                    </div>
                )}
            </div>
            
            {/* Product Info - Umage Style */}
            <div className="p-4">
                <h3 className="text-lg font-light text-gray-900 mb-1 hover:text-gray-600 transition-colors">
                    {product.name}
                </h3>
                
                {/* Brand Badge for Static Products */}
                {product.staticProduct && product.staticBrand && (
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        {product.staticBrand}
                    </div>
                )}
                
                {/* Product Description */}
                {product.description && Array.isArray(product.description) && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description
                            .filter(block => block._type === 'block' && 'children' in block)
                            .map(block => 
                                'children' in block && block.children
                                    ?.filter(child => child._type === 'span')
                                    ?.map(child => child.text)
                                    ?.join(' ')
                            )
                            .join(' ')
                            .slice(0, 100)}...
                    </p>
                )}

                {/* Price */}
                {showPrice && (
                    <div className="text-lg font-light text-gray-900 mb-3">
                        {isOnSale ? (
                            <div className="space-y-1">
                                <span className="text-red-600 font-medium">
                                    {product.salePrice?.toLocaleString('no-NO')} kr
                                </span>
                                <span className="text-gray-500 text-sm line-through ml-2">
                                    {(product.originalPrice || product.price)?.toLocaleString('no-NO')} kr
                                </span>
                            </div>
                        ) : (
                            <span>
                                {product.price ? `${product.price.toLocaleString('no-NO')} kr` : 'Pris på forespørsel'}
                            </span>
                        )}
                    </div>
                )}

                {/* Color Variants - Umage Style */}
                <div className="flex space-x-2">
                    {/* Mock variants for now - can be enhanced later with real variant data */}
                    <div className="w-4 h-4 rounded-full bg-amber-100 border border-gray-200"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-800 border border-gray-200"></div>
                    <div className="w-4 h-4 rounded-full bg-green-700 border border-gray-200"></div>
                    <button className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                        <svg className="w-2 h-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
    
    return (
        <Link href={linkHref} className="block">
            {productContent}
        </Link>
    );
}

export default ProductThumb;
