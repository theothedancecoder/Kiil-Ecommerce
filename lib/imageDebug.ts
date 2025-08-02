// Debug utility for image loading issues
export function debugImageUrl(imageSrc: string, productName: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Image Debug] Product: ${productName}`);
    console.log(`[Image Debug] Image Source: ${imageSrc}`);
    console.log(`[Image Debug] Is Local: ${!imageSrc.startsWith('http')}`);
    console.log(`[Image Debug] Is Sanity CDN: ${imageSrc.includes('cdn.sanity.io')}`);
  }
}

// Validate Sanity environment variables
export function validateSanityConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13';

  if (!projectId) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
    return false;
  }

  if (!dataset) {
    console.error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable');
    return false;
  }

  // Log configuration in both development and production for debugging
  console.log('[Sanity Config]', {
    projectId: projectId?.substring(0, 8) + '...',
    dataset,
    apiVersion,
    environment: process.env.NODE_ENV
  });

  return true;
}

// Check if image path is valid for Next.js Image component
export function isValidImagePath(src: string): boolean {
  if (!src) return false;
  
  // Allow Sanity CDN URLs
  if (src.includes('cdn.sanity.io')) return true;
  
  // Allow other HTTPS URLs
  if (src.startsWith('https://')) return true;
  
  // Allow local paths that start with /
  if (src.startsWith('/')) return true;
  
  return false;
}

// Production-specific image path fixer
export function fixImagePathForProduction(src: any): string {
  // Type checking and validation
  if (!src) return '';
  
  // Convert to string if it's not already
  const srcString = typeof src === 'string' ? src : String(src);
  
  // Additional validation
  if (!srcString || typeof srcString !== 'string') {
    console.warn('[Image Path Fix] Invalid src provided:', src);
    return '';
  }
  
  // If it's already a full URL, return as-is
  if (srcString.startsWith('http')) return srcString;
  
  // Ensure local paths start with /
  let fixedSrc = srcString;
  if (!fixedSrc.startsWith('/')) {
    fixedSrc = '/' + fixedSrc;
  }
  
  // Enhanced path fixing for production
  try {
    // Split path into segments to handle each part
    const pathParts = fixedSrc.split('/');
    const encodedParts = pathParts.map(part => {
      if (!part) return part; // Keep empty parts (like leading slash)
      
      // Handle special characters and spaces more aggressively
      return encodeURIComponent(part)
        .replace(/'/g, '%27')  // Handle apostrophes
        .replace(/"/g, '%22')  // Handle quotes
        .replace(/×/g, '%C3%97') // Handle multiplication symbol
        .replace(/%20/g, '%20'); // Keep spaces encoded
    });
    
    const encodedPath = encodedParts.join('/');
    
    // Log problematic paths in production for debugging
    if (process.env.NODE_ENV === 'production' && (fixedSrc.includes(' ') || fixedSrc.includes('×') || fixedSrc.includes("'"))) {
      console.log(`[Image Path Fix] Original: ${fixedSrc} -> Fixed: ${encodedPath}`);
    }
    
    return encodedPath;
  } catch (error) {
    console.warn('Failed to encode image path:', fixedSrc, error);
    // Fallback: basic encoding
    try {
      return encodeURI(fixedSrc);
    } catch (fallbackError) {
      console.error('Fallback encoding also failed:', fixedSrc, fallbackError);
      return fixedSrc;
    }
  }
}
