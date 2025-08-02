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
      console.warn('getImageUrl: No source provided');
      return fallback || '';
    }
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('getImageUrl: Processing source:', typeof source, source);
    }
    
    // Handle the case where source is a string representation of [object Object]
    if (typeof source === 'string') {
      if (source.includes('[object Object]') || source === '[object Object]') {
        console.error('getImageUrl: Received serialized object string instead of actual object:', source);
        return fallback || '';
      }
      // If it's a valid URL string, return it
      return source;
    }
    
    // Handle Sanity image objects with various structures
    if (typeof source === 'object' && source) {
      // Check for asset.url (expanded asset from our improved query)
      if ('asset' in source) {
        const asset = (source as any).asset;
        if (asset && typeof asset === 'object') {
          // First priority: direct URL from expanded asset
          if (asset.url && typeof asset.url === 'string') {
            return asset.url;
          }
          // Second priority: asset reference that we can build URL from
          if (asset._ref && asset._type) {
            try {
              return imageUrl(source).url();
            } catch (builderError) {
              console.error('getImageUrl: Image builder failed for asset reference:', builderError);
              return fallback || '';
            }
          }
        }
        // Handle case where asset is just a reference string
        if (typeof asset === 'string') {
          try {
            return imageUrl({ _type: 'image', asset: { _ref: asset, _type: 'reference' } }).url();
          } catch (builderError) {
            console.error('getImageUrl: Image builder failed for string asset:', builderError);
            return fallback || '';
          }
        }
      }
      
      // Check if it's a direct asset reference (legacy format)
      if ('_ref' in source && '_type' in source) {
        try {
          return imageUrl(source).url();
        } catch (builderError) {
          console.error('getImageUrl: Image builder failed for direct asset reference:', builderError);
          return fallback || '';
        }
      }
      
      // Check for direct url property
      if ('url' in source && typeof (source as any).url === 'string') {
        return (source as any).url;
      }
    }
    
    // Last resort: try the image builder with the raw source
    try {
      const result = imageUrl(source).url();
      if (result && result !== '' && !result.includes('undefined')) {
        return result;
      }
    } catch (builderError) {
      console.error('getImageUrl: Final image builder attempt failed:', builderError);
    }
    
    console.warn('getImageUrl: Could not process image source, using fallback:', JSON.stringify(source, null, 2));
    return fallback || '';
    
  } catch (error) {
    console.error('getImageUrl: Error processing image:', error, 'Source:', source);
    return fallback || '';
  }
}
