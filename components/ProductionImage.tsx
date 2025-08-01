"use client";

import Image from "next/image";
import { useState } from "react";
import { getImageUrl, isImageAvailable } from "@/lib/imageConfig";

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
  
  // Get the appropriate image URL based on environment
  const imageSrc = getImageUrl(src);
  const imageAvailable = isImageAvailable(src);

  // Handle image loading errors
  const handleError = () => {
    console.error(`Failed to load image: ${imageSrc} (original: ${src})`);
    setImageError(true);
  };

  // If image failed to load or not available, show fallback
  if (imageError || !imageAvailable) {
    return (
      <div className={`bg-gray-100 flex flex-col items-center justify-center ${className} border-2 border-dashed border-gray-300`}>
        <div className="text-gray-400 text-xs text-center p-2">
          <div className="mb-1">📷</div>
          <div>Image Loading</div>
          <div className="text-xs opacity-75">Setting up CDN...</div>
        </div>
      </div>
    );
  }

  // Check if it's a static image (starts with /) vs external URL
  const isStaticImage = imageSrc.startsWith('/') && !imageSrc.startsWith('http');
  
  // For static images, use regular img tag
  if (isStaticImage) {
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

  // For external URLs (like CDN or placeholders), use regular img tag
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
