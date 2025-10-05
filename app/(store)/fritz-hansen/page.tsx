import Link from 'next/link';
import { getFritzHansenProducts } from '@/sanity/lib/products/getFritzHansenProducts';
import ProductionImage from '@/components/ProductionImage';

export default async function FritzHansenPage() {
  const products = await getFritzHansenProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-stone-800 mb-4">
              Fritz Hansen
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover our curated selection of iconic Fritz Hansen furniture
            </p>
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
    </div>
  );
}
