import Image from 'next/image';
import Link from 'next/link';
import { getHomepage } from '@/sanity/lib/getHomepage';
import { getImageUrl } from '@/lib/ImageUrl';

export default async function SiteLogoEnhanced() {
  let logoUrl = "/kiil-black-square-bla.png"; // Default fallback
  let logoAlt = "KIIL";
  let debugInfo = {
    source: 'fallback',
    error: null as string | null,
    sanityData: null as any,
  };

  try {
    // Fetch homepage data with detailed error handling
    const homepageData = await getHomepage();
    debugInfo.sanityData = homepageData;

    if (!homepageData) {
      debugInfo.error = 'No homepage data returned from Sanity';
      console.warn('[SiteLogo] No homepage data found, using fallback');
    } else if (!homepageData.siteSettings?.logo) {
      debugInfo.error = 'No logo configured in siteSettings';
      console.warn('[SiteLogo] No logo configured in Sanity, using fallback');
    } else {
      try {
        // Attempt to get Sanity logo URL
        const sanityLogoUrl = getImageUrl(homepageData.siteSettings.logo, "/kiil-black-square-bla.png");
        
        if (sanityLogoUrl && sanityLogoUrl !== "/kiil-black-square-bla.png") {
          logoUrl = sanityLogoUrl;
          logoAlt = homepageData.siteSettings.logo.alt || "KIIL";
          debugInfo.source = 'sanity';
          console.log('[SiteLogo] Successfully loaded logo from Sanity:', logoUrl);
        } else {
          debugInfo.error = 'getImageUrl returned fallback or empty string';
          console.warn('[SiteLogo] getImageUrl returned fallback, using static image');
        }
      } catch (imageError) {
        debugInfo.error = `Image processing error: ${imageError instanceof Error ? imageError.message : 'Unknown error'}`;
        console.error('[SiteLogo] Error processing Sanity image:', imageError);
      }
    }
  } catch (sanityError) {
    debugInfo.error = `Sanity fetch error: ${sanityError instanceof Error ? sanityError.message : 'Unknown error'}`;
    console.error('[SiteLogo] Error fetching from Sanity:', sanityError);
  }

  // Log debug information in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[SiteLogo Debug]', {
      logoUrl,
      logoAlt,
      source: debugInfo.source,
      error: debugInfo.error,
      hasHomepageData: !!debugInfo.sanityData,
      hasSiteSettings: !!debugInfo.sanityData?.siteSettings,
      hasLogo: !!debugInfo.sanityData?.siteSettings?.logo,
    });
  }

  return (
    <Link
      href="/" 
      className="flex items-center hover:opacity-80 transition-opacity duration-300"
    >
      <Image
        src={logoUrl}
        alt={logoAlt}
        width={178}
        height={60}
        className="h-14 w-auto"
        priority
        onError={(e) => {
          console.error('[SiteLogo] Image failed to load:', logoUrl);
          // In a real implementation, you might want to set a different fallback here
        }}
      />
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && debugInfo.error && (
        <span className="ml-2 text-xs text-red-500 bg-red-100 px-1 rounded">
          {debugInfo.source === 'fallback' ? 'Fallback' : 'Error'}
        </span>
      )}
    </Link>
  );
}
