import ProductionImage from "@/components/ProductionImage";
import HeroVideo from "@/components/HeroVideo";
import Image from "next/image";
import Link from "next/link";
import { getHomepage } from "@/sanity/lib/getHomepage";
import { getImageUrl } from "@/lib/ImageUrl";

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
    heroImage: null
  };
  
  // Get hero image URL from Sanity or fallback to static image
  const heroImageUrl = heroData.heroImage 
    ? getImageUrl(heroData.heroImage, "/living-room-collection.jpg")
    : "/living-room-collection.jpg";
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Ballard Designs Style */}
      <section className="relative bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-800 leading-tight">
                  {heroData.mainHeading}
                  <span className="block text-stone-600 italic">{heroData.subHeading}</span>
                </h1>
                <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
                  {heroData.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/interior" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-stone-800 text-white font-medium tracking-wide hover:bg-stone-700 transition-colors duration-300"
                >
                  Shop Interior
                </Link>
                <Link 
                  href="/utendors" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-stone-300 text-stone-800 font-medium tracking-wide hover:border-stone-400 hover:bg-stone-50 transition-all duration-300"
                >
                  Outdoor Collection
                </Link>
              </div>
            </div>

            {/* Right Content - Hero Video with Fallback */}
            <div className="relative">
              <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
                <HeroVideo
                  videoSrc="/video/UMAGE_Video_FSC_WEB_16x9.mp4"
                  fallbackImageSrc={heroImageUrl}
                  fallbackImageAlt={heroData.heroImage?.alt || "Elegant living room with sophisticated furniture"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
              {homepageData?.categorySection?.title || "Shop by Category"}
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              {homepageData?.categorySection?.description || "From statement furniture to refined accessories, find everything you need to create your perfect space."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homepageData?.categorySection?.categories?.length ? (
              homepageData.categorySection.categories.map((category, index) => {
                const categoryImageUrl = category.image 
                  ? getImageUrl(category.image, "/living-room.jpg")
                  : "/living-room.jpg";
                
                return (
                  <Link key={index} href={category.link} className="group">
                    <div className="relative h-80 overflow-hidden bg-stone-100 rounded-sm">
                      <ProductionImage
                        src={categoryImageUrl}
                        alt={category.image?.alt || category.title}
                        fill
                        className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-serif mb-2">{category.title}</h3>
                        <p className="text-sm opacity-90">{category.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              // Fallback categories if no Sanity data
              <>
                <Link href="/interior/living-room" className="group">
                  <div className="relative h-80 overflow-hidden bg-stone-100">
                    <ProductionImage
                      src="/living-room.jpg"
                      alt="Living Room Collection"
                      fill
                      className="group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-serif mb-2">Living Room</h3>
                      <p className="text-sm opacity-90">Sophisticated seating & tables</p>
                    </div>
                  </div>
                </Link>

                <Link href="/interior" className="group">
                  <div className="relative h-80 overflow-hidden bg-stone-100">
                    <ProductionImage
                      src={diningImage}
                      alt="Dining Collection"
                      fill
                      className="group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-serif mb-2">Dining</h3>
                      <p className="text-sm opacity-90">Tables & chairs for gathering</p>
                    </div>
                  </div>
                </Link>

                <Link href="/utendors" className="group">
                  <div className="relative h-80 overflow-hidden bg-stone-100">
                    <ProductionImage
                      src={outdoorImage}
                      alt="Outdoor Collection"
                      fill
                      className="group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-serif mb-2">Outdoor</h3>
                      <p className="text-sm opacity-90">Garden & patio essentials</p>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Our Collection - Brand Navigation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
              Our Collection
            </h2>
            <p className="text-lg text-stone-600">
              Discover our carefully selected collection from renowned designers and manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            <Link href="/fritz-hansen" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/fritz-hansen.png"
                    alt="Fritz Hansen"
                    width={180}
                    height={70}
                    className="h-16 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/kartell" className="group text-center">
              <div className="bg-stone-50 p-12 hover:shadow-lg hover:bg-white transition-all duration-300 min-h-[120px]">
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-xl font-serif text-stone-800 group-hover:text-stone-600 transition-colors">
                    Kartell
                  </h3>
                  <p className="text-sm text-stone-500 mt-2">Italian Innovation</p>
                </div>
              </div>
            </Link>

            <Link href="/montana" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/montana.webp"
                    alt="Montana"
                    width={180}
                    height={70}
                    className="h-16 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/vitra" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/Vitra.svg"
                    alt="Vitra"
                    width={160}
                    height={60}
                    className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/dux" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/dux.webp"
                    alt="DUX"
                    width={160}
                    height={60}
                    className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/umage" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/umage.webp"
                    alt="Umage"
                    width={160}
                    height={60}
                    className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/ro-collection" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/ro-collection.png"
                    alt="RO Collection"
                    width={180}
                    height={70}
                    className="h-16 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/fredericia" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/FREDERICIA.png"
                    alt="Fredericia"
                    width={180}
                    height={70}
                    className="h-16 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/audo-copenhagen" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/audo-copenhagen.webp"
                    alt="Audo Copenhagen"
                    width={180}
                    height={70}
                    className="h-16 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/soren-lund" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/soren-lund.png"
                    alt="Soren Lund"
                    width={160}
                    height={60}
                    className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/sibast" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/Sibast.webp"
                    alt="Sibast Furniture"
                    width={180}
                    height={70}
                    className="h-16 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/eilersen" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/eilersen.webp"
                    alt="Eilersen"
                    width={160}
                    height={60}
                    className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/flos" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/Flos.webp"
                    alt="FLOS"
                    width={140}
                    height={60}
                    className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/serax" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/serax.webp"
                    alt="Serax"
                    width={160}
                    height={60}
                    className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/louis-poulsen" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/Louis Poulsen.jpg"
                    alt="Louis Poulsen"
                    width={180}
                    height={70}
                    className="h-16 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/crafts" className="group text-center">
              <div className="bg-amber-50 p-12 hover:shadow-lg hover:bg-white transition-all duration-300 min-h-[120px]">
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-xl font-serif text-stone-800 group-hover:text-stone-600 transition-colors">
                    Crafts
                  </h3>
                  <p className="text-sm text-stone-500 mt-2">Artisanal Lighting</p>
                </div>
              </div>
            </Link>

            <Link href="/jonas-ihreborn" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/jonas-lhreborn.png"
                    alt="Jonas Ihreborn"
                    width={160}
                    height={60}
                    className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/hay" className="group text-center">
              <div className="bg-white p-12 hover:shadow-lg border border-stone-200 hover:border-stone-300 transition-all duration-300 min-h-[120px]">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/LOGO/hay.webp"
                    alt="HAY"
                    width={140}
                    height={60}
                    className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </Link>

            <Link href="/juul" className="group text-center">
              <div className="bg-stone-50 p-12 hover:shadow-lg hover:bg-white transition-all duration-300 min-h-[120px]">
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-xl font-serif text-stone-800 group-hover:text-stone-600 transition-colors">
                    Juul
                  </h3>
                  <p className="text-sm text-stone-500 mt-2">Danish Comfort</p>
                </div>
              </div>
            </Link>

            <Link href="/products" className="group text-center">
              <div className="bg-stone-800 p-12 hover:bg-stone-700 transition-all duration-300 min-h-[120px]">
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-xl font-serif text-white group-hover:text-stone-200 transition-colors">
                    View All
                  </h3>
                  <p className="text-sm text-stone-300 mt-2">Complete Collection</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Stay Inspired
          </h2>
          <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
            Subscribe to receive design inspiration, exclusive offers, and the latest from our curated collections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-300"
            />
            <button className="px-8 py-3 bg-white text-stone-800 font-medium hover:bg-stone-100 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
