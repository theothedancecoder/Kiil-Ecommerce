// Global image fix for production deployment
// This ensures all images show placeholders in production due to Vercel size limits

export function getProductionImageSrc(originalSrc: string, productName?: string): string {
  // In development, return original src
  if (process.env.NODE_ENV === 'development') {
    return originalSrc;
  }
  
  // In production, return placeholder since 996MB of images can't be deployed
  const fallbackText = productName ? encodeURIComponent(productName) : 'Product+Image';
  return `https://via.placeholder.com/400x400/f8f9fa/6c757d?text=${fallbackText}`;
}

// Override Next.js Image component globally
export function createGlobalImageProps(originalProps: any) {
  return {
    ...originalProps,
    src: getProductionImageSrc(originalProps.src, originalProps.alt),
    unoptimized: true, // Disable Next.js optimization
  };
}
