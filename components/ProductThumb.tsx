"use client";

import { imageUrl } from "@/lib/ImageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import { useState } from "react";

function ProductThumb({product}: {product: Product}) {
    const isOutOfStock = product.stock != null && product.stock <= 0;
    const [showDescription, setShowDescription] = useState(false);
    
    return (
        <div className={`w-full h-[380px] sm:h-[420px] lg:h-[460px] luxury-card group relative flex flex-col ${isOutOfStock ? "opacity-80" : ""}`}>
            {/* Image Container - Fixed aspect ratio */}
            <div 
                className="relative w-full aspect-square overflow-hidden rounded-t-lg cursor-pointer"
                onClick={() => setShowDescription(!showDescription)}
            >
                {product.image && (
                    <div className="absolute inset-0 bg-background/5">
                        <Image
                            className="object-cover object-center transition-transform duration-700 
                                     group-hover:scale-110"
                            src={imageUrl(product.image).url()}
                            alt={product.name || "Product image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                )}
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center 
                                  bg-background/80 backdrop-blur-sm">
                        <span className="text-foreground font-serif text-xl">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Content Container - Consistent height */}
            <div className="flex-1 flex flex-col justify-between p-3 sm:p-4">
                {/* Product Name - Fixed height with overflow handling */}
                <div className="h-[3rem] flex items-start justify-center w-full text-center">
                    <h2 className="line-clamp-2 leading-tight transition-colors duration-300 group-hover:text-accent w-full"
                        style={{
                            fontFamily: "'Montserrat', Verdana, Helvetica, sans-serif",
                            fontSize: "14px",
                            color: "#333333"
                        }}>
                        {product.name}
                    </h2>
                </div>
                
                {/* Description - Only shown when clicked, positioned above price */}
                {showDescription && (
                    <div className="flex-1 py-2 max-h-[4rem] overflow-y-auto text-center">
                        <p className="leading-tight"
                           style={{
                               fontFamily: "'Montserrat', Verdana, Helvetica, sans-serif",
                               fontSize: "14px",
                               color: "#333333"
                           }}>
                            {product.description?.map((block) => 
                                block._type === "block" 
                                    ? block.children?.map((child) => child.text).join("") 
                                    : ""
                            ).join("") || "No description available"}
                        </p>
                    </div>
                )}

                {/* Price - Always at bottom with consistent positioning */}
                <div className="pt-2 mt-auto text-center w-full">
                    <span className="block"
                          style={{
                              fontFamily: "'Montserrat', Verdana, Helvetica, sans-serif",
                              fontSize: "14px",
                              color: "#333333"
                          }}>
                        kr {product.price?.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductThumb;
