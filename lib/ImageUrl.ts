import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

export function imageUrl(source: SanityImageSource) {
  if (!source) {
    console.warn('ImageUrl: No source provided');
    return builder.image('');
  }
  
  try {
    return builder.image(source);
  } catch (error) {
    console.error('ImageUrl: Error building image URL:', error);
    return builder.image('');
  }
}

// Helper function to safely get image URL with fallback
export function getImageUrl(source: SanityImageSource, fallback?: string): string {
  try {
    if (!source) {
      return fallback || '';
    }
    
    // If source is already a string URL, return it
    if (typeof source === 'string') {
      return source;
    }
    
    // If it's a Sanity image object with asset.url, use that directly
    if (typeof source === 'object' && source && 'asset' in source) {
      const asset = (source as any).asset;
      if (asset && asset.url) {
        return asset.url;
      }
    }
    
    // Otherwise use the imageUrl builder
    return imageUrl(source).url();
  } catch (error) {
    console.error('getImageUrl: Error processing image:', error);
    return fallback || '';
  }
}
