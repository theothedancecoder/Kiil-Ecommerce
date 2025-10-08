import { getHomepage } from "@/sanity/lib/getHomepage";
import { getImageUrl } from "@/lib/ImageUrl";
import HomePageClient from "./HomePageClient";

export const dynamic = "force-static";
export const revalidate = 1800; // 30 minutes

// Preload critical images
const diningImage = "/dining-collection.webp";
const outdoorImage = "/outdoor-collection.jpg";

export default async function Home() {
  // Fetch homepage data from Sanity
  const homepageData = await getHomepage();
  
  // Fallback data if Sanity data is not available
  const heroData = homepageData?.heroSection || {
    mainHeading: "Timeless Design",
    subHeading: "for Modern Living",
    description: "Discover our curated collection of sophisticated furniture and home accessories, thoughtfully designed to create spaces that inspire and endure.",
    heroImage: undefined
  };
  
  // Get hero image URL from Sanity or fallback to static image
  const heroImageUrl = heroData.heroImage 
    ? getImageUrl(heroData.heroImage, "/living-room-collection.jpg")
    : "/living-room-collection.jpg";
  
  return (
    <HomePageClient 
      heroData={heroData}
      homepageData={homepageData}
      heroImageUrl={heroImageUrl}
      diningImage={diningImage}
      outdoorImage={outdoorImage}
    />
  );
}
