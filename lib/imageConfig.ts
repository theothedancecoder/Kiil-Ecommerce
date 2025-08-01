// Image configuration for production
export const IMAGE_CONFIG = {
  // Use CDN in production, local images in development
  useCloudinary: process.env.NODE_ENV === 'production',
  cloudinaryBaseUrl: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/',
  
  // Fallback to a simple CDN or external hosting
  fallbackCDN: 'https://your-domain.s3.amazonaws.com/', // Replace with your CDN
  
  // Local development
  localBasePath: '',
};

export function getImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // For development, use local images
  if (process.env.NODE_ENV === 'development') {
    return imagePath;
  }
  
  // For production, return a more descriptive placeholder
  const productName = encodeURIComponent('Product Image');
  return `https://via.placeholder.com/400x400/f8f9fa/6c757d?text=${productName}`;
}

export function isImageAvailable(imagePath: string): boolean {
  // In development, assume images are available
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // In production, we know images aren't deployed due to size limits
  // Return false to show placeholders
  return false;
}

// Global replacement function for all Image components
export function createImageSrc(originalSrc: string): string {
  if (process.env.NODE_ENV === 'production') {
    // In production, always return placeholder since images aren't deployed
    return getImageUrl(originalSrc);
  }
  return originalSrc;
}
