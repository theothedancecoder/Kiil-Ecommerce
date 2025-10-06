import fs from 'fs';

const content = `import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { getKartellProducts } from '@/sanity/lib/products/getKartellProducts';
import ProductionImage from '@/components/ProductionImage';

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30 minutes

export default async function KartellPage() {
  // Fetch Kartell products from Sanity
  const kartellProducts = await getKartellProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation and Cart */}
      <Header />
      
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
              Kartell
            </h1>
            <p className="text-lg text-gray-600">
              Italian innovation in plastic design
            </p>
          </div>
          
          {/* Clean Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kartellProducts.map((product) => {
              const imageUrl = product.image?.asset?.url || '/placeholder-image.jpg';
              const variantCount = product.variants?.length || 0;
              
              return (
                <Link 
                  key={product._id} 
                  href={\`/kartell/\${product.slug?.current}\`}
                  className="group block"
                >
                  <div className="bg-white hover:shadow-lg transition-shadow duration-300">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-stone-50 overflow-hidden mb-4">
                      <ProductionImage
                        src={imageUrl}
                        alt={product.name || 'Kartell Product'}
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
                          kr {product.price?.toLocaleString()}
                        </p>
                        {variantCount > 0 && (
                          <p className="text-sm text-stone-500">
                            {variantCount} {variantCount === 1 ? 'color' : 'colors'}
                          </p>
                        )}
                      </div>
                      
                      {/* Color Swatches Preview */}
                      {product.variants && product.variants.length > 0 && (
                        <div className="flex space-x-1 pt-2">
                          {product.variants.slice(0, 4).map((variant, index) => {
                            const color = variant.color?.toLowerCase() || '';
                            const bgColor = 
                              color === 'white' ? '#ffffff' :
                              color === 'black' ? '#000000' :
                              color === 'red' ? '#dc2626' :
                              color === 'blue' || color === 'sky blue' || color === 'light blue' ? '#2563eb' :
                              color === 'green' ? '#16a34a' :
                              color === 'orange' ? '#ea580c' :
                              color === 'crystal' ? '#f3f4f6' :
                              color === 'silver' ? '#d1d5db' :
                              color === 'burgundy' ? '#7f1d1d' :
                              color === 'mauve' ? '#c084fc' :
                              color === 'taupe' ? '#a8a29e' :
                              color === 'violet' ? '#8b5cf6' :
                              color === 'amber' ? '#f59e0b' :
                              color === 'plum' ? '#86198f' :
                              color === 'coke' ? '#292524' :
                              color === 'beige' ? '#d6d3d1' :
                              color === 'russet' ? '#92400e' :
                              color === 'sage' ? '#84cc16' :
                              color === 'yellow' ? '#eab308' :
                              color === 'bordeaux' ? '#7f1d1d' :
                              color === 'mustard' ? '#ca8a04' :
                              '#9ca3af';
                            
                            return (
                              <div 
                                key={variant._key || index}
                                className="w-3 h-3 rounded-full border border-stone-200"
                                style={{ backgroundColor: bgColor }}
                                title={variant.name}
                              />
                            );
                          })}
                          {variantCount > 4 && (
                            <span className="text-xs text-stone-400 ml-1">+{variantCount - 4}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* Filter/Sort Options */}
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
    </div>
  );
}
`;

fs.writeFileSync('app/kartell/page.tsx', content);
console.log('✅ Updated Kartell listing page to use force-dynamic');
