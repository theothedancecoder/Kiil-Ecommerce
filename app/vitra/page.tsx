import { getVitraProducts } from "@/sanity/lib/products/getVitraProducts";
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default async function VitraPage() {
  // Fetch products from Sanity
  const products = await getVitraProducts();

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
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image - using first product's lifestyle image if available */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-700" />
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block bg-white/95 backdrop-blur-sm px-12 py-6 rounded-lg shadow-lg">
              <h1 className="text-4xl md:text-6xl font-serif text-stone-800 mb-2">
                Vitra
              </h1>
              <p className="text-stone-600 text-lg">
                Iconic Design Since 1950
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">
              Vitra Collection
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover iconic design pieces from Vitra, where innovation meets timeless aesthetics.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link 
                key={product._id} 
                href={`/vitra/${product.slug?.current}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image?.asset?.url || '/placeholder-image.jpg'}
                      alt={product.name || 'Vitra Product'}
                      fill
                      className="object-contain object-center group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                  </div>
                  
                  {product.variants && product.variants.length > 1 && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex space-x-1">
                        {product.variants.slice(0, 4).map((variant, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200 bg-gray-300"
                            title={variant.name || 'Variant'}
                          />
                        ))}
                        {product.variants.length > 4 && (
                          <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">+</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-tight text-center">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-stone-900 font-medium">
                        kr {product.price?.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        {product.variants?.length || 0} variant{product.variants?.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Vitra Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Vitra
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Vitra is a Swiss company dedicated to improving the quality of homes, offices and public spaces 
              through the power of design. For over 70 years, Vitra has been creating furniture and accessories 
              that combine innovative design with exceptional quality.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Working with renowned designers like Charles and Ray Eames, George Nelson, and Verner Panton, 
              Vitra has created some of the most iconic pieces in modern design history.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Iconic design heritage</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Swiss quality craftsmanship</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Sustainable production</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Timeless design philosophy</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-stone-400">Vitra Design</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif mb-6">
            Discover Iconic Design
          </h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Explore Vitra's collection of timeless furniture and accessories that have shaped 
            modern design for generations.
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
