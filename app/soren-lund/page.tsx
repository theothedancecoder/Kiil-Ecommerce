import Image from 'next/image';
import Link from 'next/link';

export const dynamic = "force-static";
export const revalidate = 1800; // 30 minutes

interface SorenLundProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: {
    name: string;
    image: string;
    color?: string;
    material?: string;
  }[];
  lifestyleImages?: string[];
}

export default async function SorenLundPage() {
  // Define all Soren Lund products - using actual products from updated folder
  const sorenLundProducts: SorenLundProduct[] = [
    {
      id: 'sl330-sk-footstool',
      name: 'SL330:SK Footstool',
      description: 'Elegant footstool with premium leather upholstery and solid wood construction. The SL330:SK combines comfort with sophisticated Scandinavian design, perfect for complementing lounge chairs and creating relaxing seating arrangements.',
      price: 17055,
      image: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Black.webp',
      variants: [
        { name: 'Cognac', image: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Cognac.jpg', color: 'Cognac', material: 'Premium leather' },
        { name: 'Black', image: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Black.webp', color: 'Black', material: 'Premium leather' }
      ],
      lifestyleImages: ['/Soren-Lund/SL330:SK-footstool/lifestyle/SL-330-genova-teak-768x512.jpg']
    },
    {
      id: 'sl409-swivel-chair',
      name: 'SL409 Swivel Chair',
      description: 'Contemporary swivel chair with ergonomic design and premium materials. The SL409 offers exceptional comfort and mobility, making it perfect for modern offices and home workspaces with its sophisticated Scandinavian aesthetic.',
      price: 29935,
      image: '/Soren-Lund/SL409-swivel-chair/Soren Lund SL409 swivel chair NOK  29,935  SL409 swivel chair quantity 1 .webp',
      variants: [
        { name: 'Standard', image: '/Soren-Lund/SL409-swivel-chair/Soren Lund SL409 swivel chair NOK  29,935  SL409 swivel chair quantity 1 .webp', material: 'Premium upholstery' }
      ]
    },
    {
      id: 'sl330-1-adjustable-armchair',
      name: 'SL330:1 Adjustable Armchair',
      description: 'Luxurious adjustable armchair with premium craftsmanship and sophisticated design. The SL330:1 represents the pinnacle of Scandinavian furniture design, offering exceptional comfort and adjustability for the ultimate relaxation experience.',
      price: 55160,
      image: '/Soren-Lund/SLK-330/Soren Lund SL330:1 adjustable armchair NOK  55,160.webp',
      variants: [
        { name: 'Standard', image: '/Soren-Lund/SLK-330/Soren Lund SL330:1 adjustable armchair NOK  55,160.webp', material: 'Premium upholstery' },
        { name: 'Alternative', image: '/Soren-Lund/SLK-330/SL330:1 adjustable armchair NOK  55,160.jpg', material: 'Premium upholstery' }
      ],
      lifestyleImages: ['/Soren-Lund/SLK-330/lifestyle/a1d63a72-3402-4c94-85f0-6065fd782cd3.webp']
    }
  ];

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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-600" />
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold mb-4">
              Soren Lund Collection
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Scandinavian Design Excellence & Craftsmanship
            </p>
          </div>
        </div>
      </section>

      {/* Products Section - Ballard Designs Style */}
      <section id="products-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-800 mb-4">
              Soren Lund Collection
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Discover our complete selection of Scandinavian furniture and accessories. {sorenLundProducts.length} products available.
            </p>
          </div>
          
          {/* Clean Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sorenLundProducts.map((product: SorenLundProduct) => (
              <Link 
                key={product.id} 
                href={`/soren-lund/${product.id}`}
                className="group block"
              >
                <div className="bg-white hover:shadow-lg transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-stone-50 overflow-hidden mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-tight text-center">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-light text-stone-800">
                        kr {product.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-stone-500">
                        {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    {/* Material Swatches Preview */}
                    <div className="flex space-x-1 pt-2">
                      {product.variants.slice(0, 4).map((variant, index) => (
                        <div 
                          key={index}
                          className="w-3 h-3 rounded-full border border-stone-200 bg-gradient-to-br from-stone-100 to-stone-300"
                          title={variant.name}
                        />
                      ))}
                      {product.variants.length > 4 && (
                        <span className="text-xs text-stone-400 ml-1">+{product.variants.length - 4}</span>
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
                Showing all {sorenLundProducts.length} products
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

      {/* About Soren Lund Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Soren Lund
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Soren Lund represents the pinnacle of Scandinavian design philosophy, where minimalism meets 
              functionality in perfect harmony. Founded on the principles of sustainable craftsmanship and 
              timeless aesthetics, each piece tells a story of Nordic heritage.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Our commitment to excellence extends beyond design to encompass responsible sourcing, 
              traditional joinery techniques, and a deep respect for the natural materials that define our work.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Authentic Scandinavian design heritage
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Sustainable and responsibly sourced materials
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Traditional craftsmanship techniques
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Timeless designs for modern living
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-slate-400">
                <div className="w-24 h-24 mx-auto mb-4 bg-slate-300 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-lg">Brand Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif mb-6">
            Experience Scandinavian Design Excellence
          </h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Discover the perfect piece to elevate your space with Soren Lund's 
            authentic Scandinavian furniture and exceptional craftsmanship.
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
