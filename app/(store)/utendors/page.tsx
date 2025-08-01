import OutdoorBanner from "@/components/outdoorBanner";
import OutdoorSidebar from "@/components/OutdoorSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import { outdoorProducts } from "@/lib/outdoorProducts";
import Link from "next/link";

export default async function UtendorsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <span className="text-stone-800">Outdoor Collection</span>
          </div>
        </div>
      </div>

      <OutdoorBanner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <OutdoorSidebar />
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6">
                Outdoor Collection
              </h1>
              <p className="text-stone-600 text-lg max-w-3xl mx-auto">
                Transform your outdoor spaces with our premium selection of weather-resistant furniture and accessories, designed to create the perfect garden oasis.
              </p>
            </div>
            <div className="max-w-8xl mx-auto">
              <ProductGridWithPagination 
                products={outdoorProducts as any} 
                showPrice={true}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
