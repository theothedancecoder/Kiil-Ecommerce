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
  
  // Complete static product collection (all 15 original products)
  const staticProducts = [
    {
      id: 'bm71-library-table',
      name: 'BM71 Library Table',
      description: 'Elegant library table designed with clean lines and premium materials. Perfect for modern workspaces and home offices.',
      price: 75750,
      image: '/fredericia/bm71-library-table/main.jpg',
      href: '/fredericia/bm71-library-table',
      variants: [
        { name: 'Standard', image: '/fredericia/bm71-library-table/main.jpg', material: 'Premium oak' }
      ],
      lifestyleImages: ['/fredericia/bm71-library-table/lifestyle1.jpg']
    },
    {
      id: 'wegner-ox-chair',
      name: 'Wegner Ox Chair',
      description: 'Iconic Ox Chair designed by Hans J. Wegner. A masterpiece of Danish furniture design with exceptional comfort and style.',
      price: 139995,
      image: '/fredericia/wegner-ox-chair/main.jpg',
      href: '/fredericia/wegner-ox-chair',
      variants: [
        { name: 'Essene Cognac', image: '/fredericia/wegner-ox-chair/main.jpg', material: 'Premium leather' }
      ]
    },
    {
      id: 'delphi-elements-sofa',
      name: 'Delphi Elements Sofa',
      description: 'Modular sofa system offering endless configuration possibilities. Contemporary design meets exceptional comfort.',
      price: 125000,
      image: '/fredericia/delphi-elements-sofa/main.jpg',
      href: '/fredericia/delphi-elements-sofa',
      variants: [
        { name: 'Steelcut Trio 213', image: '/fredericia/delphi-elements-sofa/main.jpg', material: 'Steelcut Trio fabric' }
      ]
    },
    {
      id: 'ej220-sofa-2-seater',
      name: 'EJ220 Sofa 2 Seater',
      description: 'Elegant two-seater sofa with refined proportions and premium materials. Available in various upholstery options.',
      price: 98000,
      image: '/fredericia/ej220-sofa/main.jpg',
      href: '/fredericia/ej220-sofa-2-seater',
      variants: [
        { name: 'Leather Max 95 Cognac', image: '/fredericia/ej220-sofa/main.jpg', material: 'Leather Max 95' },
        { name: 'Erik 9998 Broken Grey', image: '/fredericia/ej220-sofa/variant1.jpg', material: 'Erik fabric' }
      ],
      lifestyleImages: ['/fredericia/ej220-sofa/lifestyle1.jpg']
    },
    {
      id: 'delphi-sofa-2-seater',
      name: 'Delphi Sofa 2 Seater',
      description: 'Contemporary two-seater sofa with clean lines and premium leather upholstery. Perfect centerpiece for modern living spaces.',
      price: 95000,
      image: '/fredericia/delphi-sofa/main.jpg',
      href: '/fredericia/delphi-sofa-2-seater',
      variants: [
        { name: 'Leather Max 98 Black', image: '/fredericia/delphi-sofa/main.jpg', material: 'Leather Max 98' }
      ]
    },
    {
      id: 'ej-5-corona-armchair',
      name: 'EJ 5 Corona Armchair',
      description: 'Elegant armchair designed by Erik Jørgensen, featuring refined proportions and exceptional comfort.',
      price: 69347,
      image: '/fredericia/corona-armchair/main.jpg',
      href: '/fredericia/ej-5-corona-armchair',
      variants: [
        { name: 'Omni 301 Black', image: '/fredericia/corona-armchair/main.jpg', material: 'Omni 301 leather' }
      ]
    },
    {
      id: 'insula-piccolo-side-table',
      name: 'Insula Piccolo Side Table',
      description: 'Compact side table with elegant proportions and premium materials. Perfect for modern living spaces.',
      price: 5295,
      image: '/fredericia/insula-piccolo-side-table/main.jpg',
      href: '/fredericia/insula-piccolo-side-table',
      variants: [
        { name: 'H 58cm', image: '/fredericia/insula-piccolo-side-table/main.jpg', material: 'Solid oak' }
      ],
      lifestyleImages: ['/fredericia/insula-piccolo-side-table/lifestyle1.jpg']
    },
    {
      id: 'mogensen-6284-dining-table',
      name: 'Mogensen 6284 Dining Table',
      description: 'Classic dining table designed by Børge Mogensen, featuring clean lines and exceptional craftsmanship.',
      price: 50395,
      image: '/fredericia/mogensen-dining-table/main.jpg',
      href: '/fredericia/mogensen-6284-dining-table',
      variants: [
        { name: 'Oak Natural', image: '/fredericia/mogensen-dining-table/main.jpg', material: 'Solid oak' }
      ]
    },
    {
      id: 'mogensen-j39-dining-chair',
      name: 'Mogensen J39 Dining Chair',
      description: 'Iconic dining chair designed by Børge Mogensen in 1947. Perfect balance between traditional craftsmanship and modern functionality.',
      price: 8930,
      image: '/fredericia/mogensen-j39-dining-chair/main.jpg',
      href: '/fredericia/mogensen-j39-dining-chair',
      variants: [
        { name: 'Oiled Oak', image: '/fredericia/mogensen-j39-dining-chair/main.jpg', material: 'Solid oak' },
        { name: 'Soaped Oak', image: '/fredericia/mogensen-j39-dining-chair/variant1.webp', material: 'Solid oak' },
        { name: 'Black Oak', image: '/fredericia/mogensen-j39-dining-chair/variant2.jpg', material: 'Solid oak' }
      ],
      lifestyleImages: [
        '/fredericia/mogensen-j39-dining-chair/lifestyle1.jpg',
        '/fredericia/mogensen-j39-dining-chair/lifestyle2.jpg'
      ]
    },
    {
      id: 'piloti-coffee-table',
      name: 'Piloti Coffee Table',
      description: 'Contemporary coffee table with architectural design elements. Clean lines and premium materials create a sophisticated centerpiece.',
      price: 9840,
      image: '/fredericia/piloti-coffee-table/main.jpg',
      href: '/fredericia/piloti-coffee-table',
      variants: [
        { name: 'Light Oiled Oak', image: '/fredericia/piloti-coffee-table/main.jpg', material: 'Solid oak' }
      ]
    },
    {
      id: 'post-dining-chair-with-wooden-seat',
      name: 'Post Dining Chair',
      description: 'Minimalist dining chair with wooden seat, designed for comfort and durability. Embodies Scandinavian simplicity.',
      price: 6500,
      image: '/fredericia/post-dining-chair/main.jpg',
      href: '/fredericia/post-dining-chair-with-wooden-seat',
      variants: [
        { name: 'Oak Natural', image: '/fredericia/post-dining-chair/main.jpg', material: 'Solid oak' }
      ]
    },
    {
      id: 'risom-magazine-table',
      name: 'Risom Magazine Table',
      description: 'Functional magazine table with elegant design. Perfect for organizing reading materials while maintaining sophisticated aesthetics.',
      price: 6945,
      image: '/fredericia/risom-magazine-table/main.jpg',
      href: '/fredericia/risom-magazine-table',
      variants: [
        { name: 'Lacquered Oak', image: '/fredericia/risom-magazine-table/main.jpg', material: 'Solid oak' }
      ]
    },
    {
      id: 'the-canvas-chair',
      name: 'The Canvas Chair',
      description: 'Contemporary chair with canvas upholstery, combining comfort with modern aesthetics. Perfect for casual and formal settings.',
      price: 15500,
      image: '/fredericia/canvas-chair/main.jpg',
      href: '/fredericia/the-canvas-chair',
      variants: [
        { name: 'Natural Canvas & Oak', image: '/fredericia/canvas-chair/main.jpg', material: 'Oak & Canvas' }
      ]
    },
    {
      id: 'trinidad-chair',
      name: 'Trinidad Chair',
      description: 'Iconic chair with distinctive perforated shell design. Available in multiple color combinations with chrome or powder-coated finishes.',
      price: 6245,
      image: '/fredericia/trinidad-chair/main.jpg',
      href: '/fredericia/trinidad-chair',
      variants: [
        { name: 'Beech & Chrome', image: '/fredericia/trinidad-chair/main.jpg', material: 'Beech & Chrome' },
        { name: 'Black & Chrome', image: '/fredericia/trinidad-chair/variant1.jpg', material: 'Black & Chrome' },
        { name: 'Grey & Flint', image: '/fredericia/trinidad-chair/variant2.jpg', material: 'Grey & Flint' }
      ]
    },
    {
      id: 'wegner-j16-rocking-chair',
      name: 'Wegner J16 Rocking Chair',
      description: 'Classic rocking chair designed by Hans J. Wegner. Combines traditional craftsmanship with timeless comfort and elegance.',
      price: 30900,
      image: '/fredericia/wegner-j16-rocking-chair/main.jpg',
      href: '/fredericia/wegner-j16-rocking-chair',
      variants: [
        { name: 'Oiled Oak Natural Seat', image: '/fredericia/wegner-j16-rocking-chair/main.jpg', material: 'Oiled oak' }
      ]
    }
  ];

  // For now, use static products only until Sanity products have proper variant data
  // This ensures all products display with correct variant information
  const fredericiaProducts = staticProducts;

  console.log(`Total Fredericia products: ${fredericiaProducts.length} (static only)`);

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
