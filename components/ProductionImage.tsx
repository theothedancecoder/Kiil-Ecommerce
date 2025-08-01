"use client";

import { useState } from "react";
import { getProductionImageSrc } from "@/lib/globalImageFix";

interface ProductionImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export default function ProductionImage({
  src,
  alt,
  fill = false,
  className = "",
  sizes,
  priority = false,
  width,
  height,
}: ProductionImageProps) {
  const [imageError, setImageError] = useState(false);
  
  // Get the production-safe image URL
  const imageSrc = getProductionImageSrc(src, alt);
  
  // In production, always show placeholder since images aren't deployed
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Handle image loading errors
  const handleError = () => {
    console.error(`Failed to load image: ${imageSrc} (original: ${src})`);
    setImageError(true);
  };

  // In production or if error, show styled placeholder
  if (isProduction || imageError) {
    return (
      <div 
        className={`bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center ${className} border border-gray-200`}
        style={fill ? { 
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        } : { width, height }}
      >
        <div className="text-gray-400 text-center p-4">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm font-medium">Product Image</div>
          <div className="text-xs opacity-75 mt-1">Setting up CDN...</div>
        </div>
      </div>
    );
  }

  // For development, use regular img tag
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      style={fill ? { 
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: 'contain',
        color: 'transparent'
      } : { width, height }}
    />
  );
}
