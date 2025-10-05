import Image from 'next/image';
import Link from 'next/link';
import { getFritzHansenProducts } from '@/sanity/lib/products/getFritzHansenProducts';
import { urlFor } from '@/sanity/lib/image';
import ProductionImage from '@/components/ProductionImage';

export default async function FritzHansenPage() {
  const products = await getFritzHansenProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Homepage */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/"
            className="inline-flex items-center text-stone-600 hover:text-stone-800 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <Image
          src="/Fritz Hansen/Regatta-Chair/lifestyle/Regatta_Cam01_Main_v06.jpg"
          alt="Fritz Hansen Collection"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif mb-4">
              Fritz Hansen
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto px-4">
              Danish Design Heritage Since 1872
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">
              Fritz Hansen Collection
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover our curated selection of iconic Fritz Hansen furniture and accessories, 
              representing the finest in Danish design and craftsmanship.
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <select className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500">
                <option value="all">All Categories</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-stone-600">Sort by:</span>
              <select className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500">
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => {
              const imageUrl = product.image?.asset?.url;
              const variantCount = product.variants?.length || 0;
              
              return (
                <Link 
                  key={product._id} 
                  href={`/fritz-hansen/${product.slug?.current || product._id}`}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      {imageUrl ? (
                        <ProductionImage
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-contain object-center group-hover:scale-105 transition-transform duration-300 p-4"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span>No Image</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-stone-100 px-2 py-1 rounded-full text-xs text-stone-600">
                        {product.categories?.[0]?.title || 'Accessories'}
                      </div>
                    </div>
                    
                    {/* Color Swatches */}
                    {variantCount > 1 && (
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="flex space-x-1">
                          {Array.from({ length: Math.min(variantCount, 4) }).map((_, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-300"
                            />
                          ))}
                          {variantCount > 4 && (
                            <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                              <span className="text-xs text-gray-500">+</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Product Info */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-tight text-center">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-stone-900 font-medium">
                          kr {product.price?.toLocaleString()}
                        </span>
                        <span className="text-xs text-stone-500 uppercase tracking-wider">
                          {variantCount} variant{variantCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-600">No Fritz Hansen products found.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Fritz Hansen Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Fritz Hansen
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Fritz Hansen has been creating furniture of the highest quality and design for over 150 years. 
              Founded in 1872, the company has become synonymous with iconic Danish design and exceptional craftsmanship.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Working with legendary designers like Arne Jacobsen, Poul Kjærholm, and Jaime Hayon, 
              Fritz Hansen continues to push the boundaries of furniture design while honoring its rich heritage.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  150+ years of Danish design heritage
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Collaborations with world-renowned designers
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Sustainable production methods
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Timeless designs that last generations
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/Fritz Hansen/Happy-Hook/lifestyle/5704890504116happy-hook-blush-fritz-hansen2.webp"
              alt="Fritz Hansen Design Detail"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif mb-6">
            Experience Danish Design Excellence
          </h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Discover the perfect piece to elevate your space with Fritz Hansen's 
            timeless furniture and accessories.
          </p>
          <Link 
            href="/book-consultation"
            className="inline-block bg-white text-stone-800 px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors"
          >
            Book a Design Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
