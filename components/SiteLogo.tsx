import Image from 'next/image';
import Link from 'next/link';
import { getHomepage } from '@/sanity/lib/getHomepage';
import { getImageUrl } from '@/lib/ImageUrl';

export default async function SiteLogo() {
  const homepageData = await getHomepage();
  
  const logoUrl = homepageData?.siteSettings?.logo 
    ? getImageUrl(homepageData.siteSettings.logo, "/kiil-black-square-bla.png")
    : "/kiil-black-square-bla.png";
  
  const logoAlt = homepageData?.siteSettings?.logo?.alt || "KIIL";

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
      />
    </Link>
  );
}
