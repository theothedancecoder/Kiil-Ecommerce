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
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

  if (!projectId) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
    return false;
  }

  if (!dataset) {
    console.error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable');
    return false;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Sanity Config]', {
      projectId: projectId?.substring(0, 8) + '...',
      dataset,
      apiVersion: apiVersion || 'default',
    });
  }

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
