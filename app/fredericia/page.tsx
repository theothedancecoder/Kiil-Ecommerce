import Image from 'next/image';
import Link from 'next/link';
import { getFredericiaProducts } from '@/sanity/lib/products/getFredericiaProducts';
import { urlFor } from '@/sanity/lib/image';

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30 minutes

// Utility function to get image URL from Sanity or fallback to static
function getImageUrl(product: any): string {
  // Try Sanity image first
  if (product.image?.asset) {
    try {
      return urlFor(product.image).width(800).height(800).url();
    } catch (error) {
      console.error('Error generating Sanity image URL:', error);
    }
  }
  
  // Fallback to static image path
  if (product.image && typeof product.image === 'string') {
    return product.image;
  }
  
  // Try to generate static image path based on product name
  if (product.name) {
    const productSlug = product.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    // Map common product names to their static image paths
    const imageMap: { [key: string]: string } = {
      'bm71-library-table': '/fredericia/bm71-library-table/main.jpg',
      'wegner-ox-chair': '/fredericia/wegner-ox-chair/main.jpg',
      'delphi-elements-sofa': '/fredericia/delphi-elements-sofa/main.jpg',
      'ej220-sofa-2-seater': '/fredericia/ej220-sofa/main.jpg',
      'delphi-sofa-2-seater': '/fredericia/delphi-sofa/main.jpg',
      'ej-5-corona-armchair': '/fredericia/corona-armchair/main.jpg',
      'insula-piccolo-side-table': '/fredericia/insula-piccolo-side-table/main.jpg',
      'mogensen-6284-dining-table': '/fredericia/mogensen-dining-table/main.jpg',
      'mogensen-j39-dining-chair': '/fredericia/mogensen-j39-dining-chair/main.jpg',
      'piloti-coffee-table': '/fredericia/piloti-coffee-table/main.jpg',
      'post-dining-chair': '/fredericia/post-dining-chair/main.jpg',
      'risom-magazine-table': '/fredericia/risom-magazine-table/main.jpg',
      'the-canvas-chair': '/fredericia/canvas-chair/main.jpg',
      'trinidad-chair': '/fredericia/trinidad-chair/main.jpg',
      'wegner-j16-rocking-chair': '/fredericia/wegner-j16-rocking-chair/main.jpg'
    };
    
    if (imageMap[productSlug]) {
      return imageMap[productSlug];
    }
    
    // Try generic path
    return `/fredericia/${productSlug}/main.jpg`;
  }
  
  // Final fallback - use a real image that exists
  return '/fredericia/bm71-library-table/main.jpg';
}

// Utility function to get product URL
function getProductUrl(product: any): string {
  if (product.slug?.current) {
    return `/fredericia/${product.slug.current}`;
  }
  // Fallback for static products
  return product.href || `/fredericia/${product._id || product.id}`;
}

export default async function FredericiaPage() {
  let sanityProducts: any[] = [];
  let fredericiaProducts: any[] = [];

  try {
    // Try to get products from Sanity first
    sanityProducts = await getFredericiaProducts();
    console.log(`Found ${sanityProducts.length} Fredericia products in Sanity`);
    
    if (sanityProducts.length > 0) {
      fredericiaProducts = sanityProducts;
    }
  } catch (error) {
    console.error('Error fetching Fredericia products from Sanity:', error);
  }

  // If no Sanity products or error, show message
  if (fredericiaProducts.length === 0) {
    console.log('No Fredericia products found in Sanity');
  }

  console.log(`Total Fredericia products: ${fredericiaProducts.length} (from Sanity)`);

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
          src="/fredericia/bm71-library-table/main.jpg"
          alt="Fredericia Furniture Collection"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold mb-4">
              Fredericia Collection
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Danish Furniture Design Excellence Since 1911
            </p>
          </div>
        </div>
      </section>

      {/* Products Section - Ballard Designs Style */}
      <section id="products-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-800 mb-4">
              Fredericia Collection
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Discover our complete selection of Fredericia furniture and accessories. {fredericiaProducts.length} products available.
            </p>
          </div>
          
          {/* Clean Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fredericiaProducts.map((product: any) => (
              <Link 
                key={product._id || product.id} 
                href={getProductUrl(product)}
                className="group block"
              >
                <div className="bg-white hover:shadow-lg transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-stone-50 overflow-hidden mb-4">
                    <Image
                      src={getImageUrl(product)}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-tight text-center">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-light text-stone-800">
                        kr {product.price?.toLocaleString() || 'Price on request'}
                      </p>
                      <p className="text-sm text-stone-500">
                        {(product.variants?.length || 0)} variant{(product.variants?.length || 0) !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    {/* Material Swatches Preview */}
                    <div className="flex space-x-1 pt-2">
                      {(product.variants || []).slice(0, 4).map((variant: any, index: number) => (
                        <div 
                          key={index}
                          className="w-3 h-3 rounded-full border border-stone-200 bg-gradient-to-br from-stone-100 to-stone-300"
                          title={variant.name}
                        />
                      ))}
                      {(product.variants?.length || 0) > 4 && (
                        <span className="text-xs text-stone-400 ml-1">+{(product.variants?.length || 0) - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Filter/Sort Options - Ballard Style */}
          <div className="mt-16 pt-8 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-stone-600">
                Showing all {fredericiaProducts.length} products
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-stone-600">Sort by:</span>
                <select className="border border-stone-300 rounded px-3 py-1 text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Fredericia Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Fredericia
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Fredericia has been creating exceptional furniture since 1911, establishing itself as one of Denmark's 
              most respected furniture manufacturers. With over a century of experience, the company combines 
              traditional craftsmanship with contemporary design.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Working with renowned designers and maintaining the highest standards of quality, 
              Fredericia continues to create furniture that embodies the essence of Danish design philosophy.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Over 110 years of Danish furniture heritage
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Collaborations with legendary designers
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Sustainable and responsible production
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Timeless designs with exceptional quality
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/fredericia/bm71-library-table/lifestyle1.jpg"
              alt="Fredericia Design Detail"
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
            Discover the perfect piece to elevate your space with Fredericia's 
            timeless furniture and exceptional craftsmanship.
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
