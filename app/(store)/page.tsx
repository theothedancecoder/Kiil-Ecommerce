import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 1800; // 30 minutes

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

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
                  Timeless Design
                  <span className="block text-stone-600 italic">for Modern Living</span>
                </h1>
                <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
                  Discover our curated collection of sophisticated furniture and home accessories, 
                  thoughtfully designed to create spaces that inspire and endure.
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

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
                <Image
                  src="/living-room-collection.jpg"
                  alt="Elegant living room with sophisticated furniture"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
              Shop by Category
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              From statement furniture to refined accessories, find everything you need to create your perfect space.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Living Room */}
            <Link href="/interior/living-room" className="group">
              <div className="relative h-80 overflow-hidden bg-stone-100">
                <Image
                  src="/living-room.jpg"
                  alt="Living Room Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-serif mb-2">Living Room</h3>
                  <p className="text-sm opacity-90">Sophisticated seating & tables</p>
                </div>
              </div>
            </Link>

            {/* Dining */}
            <Link href="/interior" className="group">
              <div className="relative h-80 overflow-hidden bg-stone-100">
                <Image
                  src="/dining-collection.webp"
                  alt="Dining Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-serif mb-2">Dining</h3>
                  <p className="text-sm opacity-90">Tables & chairs for gathering</p>
                </div>
              </div>
            </Link>

            {/* Outdoor */}
            <Link href="/utendors" className="group">
              <div className="relative h-80 overflow-hidden bg-stone-100">
                <Image
                  src="/outdoor-collection.jpg"
                  alt="Outdoor Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-serif mb-2">Outdoor</h3>
                  <p className="text-sm opacity-90">Garden & patio essentials</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
              Our Collection
            </h2>
            <p className="text-lg text-stone-600">
              Browse our complete selection of furniture and home accessories.
            </p>
          </div>

          <ProductsView 
            products={products as unknown as Product[]}
            categories={categories.map(cat => ({
              _id: cat._id,
              title: cat.title || '',
              slug: {
                current: cat.slug?.current || ''
              }
            }))}
          />
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
              Featured Brands
            </h2>
            <p className="text-lg text-stone-600">
              Discover our carefully selected collection from renowned designers and manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Link href="/fritz-hansen" className="group text-center">
              <div className="bg-white p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-serif text-stone-800 group-hover:text-stone-600 transition-colors">
                  Fritz Hansen
                </h3>
                <p className="text-sm text-stone-500 mt-2">Danish Design</p>
              </div>
            </Link>

            <Link href="/kartell" className="group text-center">
              <div className="bg-white p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-serif text-stone-800 group-hover:text-stone-600 transition-colors">
                  Kartell
                </h3>
                <p className="text-sm text-stone-500 mt-2">Italian Innovation</p>
              </div>
            </Link>

            <Link href="/montana" className="group text-center">
              <div className="bg-white p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-serif text-stone-800 group-hover:text-stone-600 transition-colors">
                  Montana
                </h3>
                <p className="text-sm text-stone-500 mt-2">Modular Systems</p>
              </div>
            </Link>

            <Link href="/interior" className="group text-center">
              <div className="bg-white p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-serif text-stone-800 group-hover:text-stone-600 transition-colors">
                  & More
                </h3>
                <p className="text-sm text-stone-500 mt-2">Explore All</p>
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
