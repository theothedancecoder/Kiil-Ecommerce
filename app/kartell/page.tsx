// Last updated: 2025-08-26T05:29:30.282Z - Force redeploy after Git LFS fix
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = "force-static";
export const revalidate = 1800; // 30 minutes

interface KartellProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: {
    name: string;
    image: string;
    color: string;
  }[];
  lifestyleImages?: string[];
}

export default async function KartellPage() {
  // Define all Kartell products based on the public folder structure
  const kartellProducts: KartellProduct[] = [
    {
      id: 'componibili-classic-2',
      name: 'Componibili Classic 2',
      description: 'Modular storage system with 2 compartments. Iconic cylindrical design perfect for any space.',
      price: 2890,
      image: '/Kartell -Componibili classic 2/Red.webp',
      variants: [
        { name: 'White', image: '/Kartell -Componibili classic 2/white.webp', color: 'White' },
        { name: 'Black', image: '/Kartell -Componibili classic 2/black.webp', color: 'Black' },
        { name: 'Red', image: '/Kartell -Componibili classic 2/Red.webp', color: 'Red' },
        { name: 'Blue', image: '/Kartell -Componibili classic 2/blue.webp', color: 'Blue' },
        { name: 'Green', image: '/Kartell -Componibili classic 2/green.webp', color: 'Green' },
        { name: 'Orange', image: '/Kartell -Componibili classic 2/Orange.webp', color: 'Orange' },
        { name: 'Silver', image: '/Kartell -Componibili classic 2/Silver.webp', color: 'Silver' },
        { name: 'Burgundy', image: '/Kartell -Componibili classic 2/burgundy.webp', color: 'Burgundy' },
        { name: 'Mauve', image: '/Kartell -Componibili classic 2/Mauve.webp', color: 'Mauve' },
        { name: 'Sky Blue', image: '/Kartell -Componibili classic 2/Sky Blue.webp', color: 'Sky Blue' },
        { name: 'Taupe', image: '/Kartell -Componibili classic 2/Taupe.webp', color: 'Taupe' },
        { name: 'Violet', image: '/Kartell -Componibili classic 2/Violet.webp', color: 'Violet' }
      ]
    },
    {
      id: 'componibili-classic-3',
      name: 'Componibili Classic 3',
      description: 'Modular storage system with 3 compartments. Larger version of the iconic cylindrical design.',
      price: 3490,
      image: '/kartell-Componibili classic 3/blue.webp',
      variants: [
        { name: 'White', image: '/kartell-Componibili classic 3/white.webp', color: 'White' },
        { name: 'Black', image: '/kartell-Componibili classic 3/black.avif', color: 'Black' },
        { name: 'Red', image: '/kartell-Componibili classic 3/red.webp', color: 'Red' },
        { name: 'Blue', image: '/kartell-Componibili classic 3/blue.webp', color: 'Blue' },
        { name: 'Green', image: '/kartell-Componibili classic 3/green.webp', color: 'Green' },
        { name: 'Orange', image: '/kartell-Componibili classic 3/orange.webp', color: 'Orange' },
        { name: 'Silver', image: '/kartell-Componibili classic 3/silver.webp', color: 'Silver' },
        { name: 'Burgundy', image: '/kartell-Componibili classic 3/Burgundy.webp', color: 'Burgundy' },
        { name: 'Mauve', image: '/kartell-Componibili classic 3/mauve.webp', color: 'Mauve' },
        { name: 'Sky Blue', image: '/kartell-Componibili classic 3/sky blue.webp', color: 'Sky Blue' },
        { name: 'Taupe', image: '/kartell-Componibili classic 3/Taupe.webp', color: 'Taupe' },
        { name: 'Violet', image: '/kartell-Componibili classic 3/Violet.webp', color: 'Violet' }
      ]
    },
    {
      id: 'kabuki-hanging',
      name: 'Kabuki Hanging Lamp',
      description: 'Elegant pendant light with distinctive pleated shade design inspired by Japanese Kabuki theater.',
      price: 7100,
      image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Green.webp',
      variants: [
        { name: 'White', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - White.webp', color: 'White' },
        { name: 'Black', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Black.webp', color: 'Black' },
        { name: 'Crystal', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Crystal.webp', color: 'Crystal' },
        { name: 'Green', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Green.webp', color: 'Green' },
        { name: 'Light Blue', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Light blue.webp', color: 'Light Blue' }
      ]
    },
    {
      id: 'big-battery',
      name: 'Big Battery Lamp',
      description: 'Portable LED table lamp with rechargeable battery. Perfect for indoor and outdoor use.',
      price: 2890,
      image: '/ Kartell Kartell -Big Battery /light blue.webp',
      variants: [
        { name: 'White', image: '/ Kartell Kartell -Big Battery /white.webp', color: 'White' },
        { name: 'Light Blue', image: '/ Kartell Kartell -Big Battery /light blue.webp', color: 'Light Blue' },
        { name: 'Plum', image: '/ Kartell Kartell -Big Battery /plum.webp', color: 'Plum' },
        { name: 'Coke', image: '/ Kartell Kartell -Big Battery /coke.webp', color: 'Coke' }
      ]
    },
    {
      id: 'pumo-lamp',
      name: 'Pumo Lamp',
      description: 'Table lamp inspired by traditional Apulian ceramic decorations with modern LED technology.',
      price: 3490,
      image: '/Kartell Pumo lamp/AMBER.webp',
      variants: [
        { name: 'White', image: '/Kartell Pumo lamp/WHITE.webp', color: 'White' },
        { name: 'Black', image: '/Kartell Pumo lamp/BLACK.webp', color: 'Black' },
        { name: 'Blue', image: '/Kartell Pumo lamp/BLUE.webp', color: 'Blue' },
        { name: 'Amber', image: '/Kartell Pumo lamp/AMBER.webp', color: 'Amber' }
      ],
      lifestyleImages: [
        '/Kartell Pumo lamp/lifestyle/20250205Pumo-lamp.jpg',
        '/Kartell Pumo lamp/lifestyle/PUMO-LAMPADA_760.jpg'
      ]
    },
    {
      id: 'kabuki-floor-lamp',
      name: 'Kabuki Floor Lamp',
      description: 'Floor version of the iconic Kabuki lamp with pleated shade and adjustable height.',
      price: 8900,
      image: '/kartell-kabui floor indoor lamp/crystal.webp',
      variants: [
        { name: 'White', image: '/kartell-kabui floor indoor lamp/white.webp', color: 'White' },
        { name: 'Black', image: '/kartell-kabui floor indoor lamp/black.webp', color: 'Black' },
        { name: 'Crystal', image: '/kartell-kabui floor indoor lamp/crystal.webp', color: 'Crystal' },
        { name: 'Blue', image: '/kartell-kabui floor indoor lamp/blue.webp', color: 'Blue' },
        { name: 'Green', image: '/kartell-kabui floor indoor lamp/green.webp', color: 'Green' }
      ],
      lifestyleImages: [
        '/kartell-kabui floor indoor lamp/lifestyle/219117-3.jpg',
        '/kartell-kabui floor indoor lamp/lifestyle/Kartell_2315857.jpg'
      ]
    },
    {
      id: 'hhh-stool',
      name: 'H.H.H Stool',
      description: 'Stackable stool with ergonomic design. Perfect for modern interiors and versatile seating.',
      price: 1890,
      image: '/Kartell H.H.H /Orange.webp',
      variants: [
        { name: 'White', image: '/Kartell H.H.H /White.webp', color: 'White' },
        { name: 'Black', image: '/Kartell H.H.H /Black.webp', color: 'Black' },
        { name: 'Blue', image: '/Kartell H.H.H /Blue.webp', color: 'Blue' },
        { name: 'Green', image: '/Kartell H.H.H /Green.webp', color: 'Green' },
        { name: 'Orange', image: '/Kartell H.H.H /Orange.webp', color: 'Orange' },
        { name: 'Bordeaux', image: '/Kartell H.H.H /Bordeaux.webp', color: 'Bordeaux' },
        { name: 'Mustard', image: '/Kartell H.H.H /Mustard.webp', color: 'Mustard' }
      ]
    },
    {
      id: 'liberty-2-seater',
      name: 'Liberty 2 Seater Outdoor',
      description: 'Outdoor sofa with weather-resistant materials. Modern design for contemporary outdoor spaces.',
      price: 12900,
      image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/sage.webp',
      variants: [
        { name: 'Beige', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/beige.webp', color: 'Beige' },
        { name: 'Russet', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/russet.webp', color: 'Russet' },
        { name: 'Sage', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/sage.webp', color: 'Sage' },
        { name: 'Yellow', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/yellow.webp', color: 'Yellow' }
      ]
    },
    {
      id: 'liberty-3-seater',
      name: 'Liberty 3 Seater Outdoor',
      description: 'Larger outdoor sofa for spacious terraces and gardens. Weather-resistant and stylish.',
      price: 16900,
      image: '/kartell-furniture/Plastics outdoor liberty 3 seater/russet.webp',
      variants: [
        { name: 'Beige', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/beige.webp', color: 'Beige' },
        { name: 'Russet', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/russet.webp', color: 'Russet' },
        { name: 'Sage', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/Sage.webp', color: 'Sage' },
        { name: 'Yellow', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/yellow.webp', color: 'Yellow' }
      ]
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
        <Image
          src="/kartell-furniture/PLASTIC LIFESTYLE/Kartell_Cassinella19592.jpg"
          alt="Kartell Furniture Collection"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold mb-4">
              Kartell Collection
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Italian Innovation in Plastic Design
            </p>
          </div>
        </div>
      </section>

      {/* Products Section - Ballard Designs Style */}
      <section id="products-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-800 mb-4">
              Kartell Collection
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Discover our complete selection of Kartell furniture and lighting. {kartellProducts.length} products available.
            </p>
          </div>
          
          {/* Clean Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kartellProducts.map((product: KartellProduct) => (
              <Link 
                key={product.id} 
                href={`/kartell/${product.id}`}
                className="group block"
              >
                <div className="bg-white hover:shadow-lg transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-stone-50 overflow-hidden mb-4">
                    <Image
                      src={product.image}
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
                        kr {product.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-stone-500">
                        {product.variants.length} colors
                      </p>
                    </div>
                    
                    {/* Color Swatches Preview */}
                    <div className="flex space-x-1 pt-2">
                      {product.variants.slice(0, 4).map((variant, index) => (
                        <div 
                          key={index}
                          className="w-3 h-3 rounded-full border border-stone-200"
                          style={{
                            backgroundColor: variant.color.toLowerCase() === 'white' ? '#ffffff' :
                                           variant.color.toLowerCase() === 'black' ? '#000000' :
                                           variant.color.toLowerCase() === 'red' ? '#dc2626' :
                                           variant.color.toLowerCase() === 'blue' ? '#2563eb' :
                                           variant.color.toLowerCase() === 'green' ? '#16a34a' :
                                           variant.color.toLowerCase() === 'orange' ? '#ea580c' :
                                           variant.color.toLowerCase() === 'crystal' ? '#f3f4f6' :
                                           '#9ca3af'
                          }}
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
                Showing all {kartellProducts.length} products
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

      {/* About Kartell Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Kartell
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Kartell is known for its industrial production of the finest quality design objects, with remarkable technological content, Made in Italy. From the choice of innovative and certified materials, to the use of advanced technologies, Kartell is able to guarantee users of its products a collection in which technology, quality, resistance and durability are part of its DNA.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              The high level of stability and repeatability of the processes allows the minimisation of inefficiencies and waste, favouring productions with low polluting residues that are always fully recyclable.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Innovative plastic manufacturing techniques
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Collaborations with top international designers
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Sustainable and recyclable materials
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Iconic designs recognized worldwide
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/kartell-furniture/PLASTIC LIFESTYLE/OUTDOOR-LIBERTY_181.jpg"
              alt="Kartell Furniture Detail"
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
            Discover Kartell Innovation
          </h2>
          <p className="text-lg mb-8">
            Experience the perfect blend of Italian design and cutting-edge technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/interior"
              className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Browse All Products
            </Link>
            <Link 
              href="/tjenester"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
