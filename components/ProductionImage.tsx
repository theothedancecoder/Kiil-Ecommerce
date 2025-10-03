"use client";

import { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/ImageUrl";

interface ProductionImageProps {
  src: string | any; // Can be string URL or Sanity image object
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
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
  objectFit = 'contain',
}: ProductionImageProps) {
  const [imageError, setImageError] = useState(false);
  
  // Get the proper image URL (handles both Sanity images and regular URLs)
  const imageUrl = getImageUrl(src);
  
  // Handle image loading errors
  const handleError = () => {
    console.error(`Failed to load image: ${imageUrl} (original: ${src})`);
    setImageError(true);
  };

  // Show placeholder only if there's an error or no valid image URL
  if (imageError || !imageUrl) {
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
          <div className="text-xs opacity-75 mt-1">Image unavailable</div>
        </div>
      </div>
    );
  }

  // Check if this is a Sanity CDN URL - if so, use unoptimized to avoid 400 errors
  const isSanityCDN = imageUrl.includes('cdn.sanity.io');
  
  // Use Next.js Image component for optimization
  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        style={{ objectFit }}
        unoptimized={isSanityCDN}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 400}
      height={height || 400}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleError}
      style={{ objectFit }}
      unoptimized={isSanityCDN}
    />
  );
}
