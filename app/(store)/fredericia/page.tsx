import { getFredericiaProducts } from '@/sanity/lib/products/getFredericiaProducts';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default async function FredericiaPage() {
  // Fetch products from Sanity
  const products = await getFredericiaProducts();

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

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">
              Fredericia Collection
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover exceptional Danish furniture design since 1911.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link 
                key={product._id} 
                href={`/fredericia/${product.slug?.current}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image?.asset?.url || '/placeholder-image.jpg'}
                      alt={product.name || 'Fredericia Product'}
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

    </div>
  );
}
