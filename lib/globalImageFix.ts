// Global image utilities for Sanity CMS integration
// Now that images are migrated to Sanity, we can load them properly in production

import { getImageUrl } from './ImageUrl';

export function getProductionImageSrc(originalSrc: string | any, productName?: string): string {
  // Use the proper Sanity image URL helper
  const imageUrl = getImageUrl(originalSrc);
  
  // If we have a valid image URL, return it
  if (imageUrl) {
    return imageUrl;
  }
  
  // Fallback to placeholder only if no valid image URL
  const fallbackText = productName ? encodeURIComponent(productName) : 'Product+Image';
  return `https://via.placeholder.com/400x400/f8f9fa/6c757d?text=${fallbackText}`;
}

// Create optimized image props for Next.js Image component
export function createGlobalImageProps(originalProps: any) {
  const imageUrl = getImageUrl(originalProps.src);
  
  return {
    ...originalProps,
    src: imageUrl || getProductionImageSrc(originalProps.src, originalProps.alt),
    // Enable Next.js optimization for Sanity CDN images
    unoptimized: false,
  };
}

// Check if an image source is from Sanity CDN
export function isSanityImage(src: string | any): boolean {
  if (typeof src === 'string') {
    return src.includes('cdn.sanity.io');
  }
  
  // Check if it's a Sanity image object
  return src && typeof src === 'object' && (src.asset || src._type === 'image');
}
