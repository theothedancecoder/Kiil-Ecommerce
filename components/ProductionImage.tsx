"use client";

import Image from "next/image";
import { useState } from "react";

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
  
  // Properly encode the image source for production
  const encodedSrc = src ? encodeURI(src) : '';
  const [imageSrc, setImageSrc] = useState(encodedSrc);

  // Handle image loading errors
  const handleError = () => {
    console.error(`Failed to load image: ${imageSrc} (original: ${src})`);
    setImageError(true);
  };

  // If image failed to load, show fallback
  if (imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  // For production, handle static images differently
  const isProduction = process.env.NODE_ENV === 'production';
  const isStaticImage = imageSrc.startsWith('/') && !imageSrc.startsWith('http');
  
  // In production, for static images, use unoptimized approach with proper encoding
  if (isProduction && isStaticImage) {
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

  // For Sanity images and development, use Next.js Image component
  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleError}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  );
}
