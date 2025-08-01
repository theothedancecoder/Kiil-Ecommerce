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
  
  // For production, we need to use an external CDN
  // Since Vercel can't handle 1GB of images
  
  // Option 1: Return a placeholder for now
  return `https://via.placeholder.com/400x400/f0f0f0/666666?text=${encodeURIComponent('Image+Loading')}`;
  
  // Option 2: Use CDN (uncomment when you set up CDN)
  // return IMAGE_CONFIG.fallbackCDN + imagePath.substring(1); // Remove leading /
}

export function isImageAvailable(imagePath: string): boolean {
  // In development, assume images are available
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // In production, we know images aren't deployed due to size limits
  return false;
}
