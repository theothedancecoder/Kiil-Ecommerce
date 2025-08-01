import { getAllProducts } from "../../../lib/allProducts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function HayProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const allProducts = getAllProducts();
  const hayProducts = allProducts.filter(product => product.brand === "HAY");
  const product = hayProducts.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/hay" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to HAY Collection
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">
                Home
              </Link>
              <span className="text-stone-400">/</span>
              <Link href="/hay" className="text-stone-600 hover:text-stone-800">
                HAY
              </Link>
              <span className="text-stone-400">/</span>
              <span className="text-stone-800 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.variants?.[0]?.image || product.image}
                alt={product.name}
                fill
                className="object-contain object-center p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            {product.variants && product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant, index) => (
                  <div
                    key={variant.name}
                    className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200"
                  >
                    <Image
                      src={variant.image}
                      alt={`${variant.name} variant`}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.color || variant.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-yellow-600 uppercase tracking-wider mb-2">
                HAY Collection
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="text-2xl font-light text-gray-900">
              From kr {product.price.toLocaleString()}
            </div>

            {/* Variants Display */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Available Options
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.variants.map((variant, index) => (
                    <div
                      key={variant.name}
                      className="p-3 text-sm border rounded flex justify-between items-center"
                    >
                      <div className="font-medium">{variant.color || variant.name}</div>
                      <div className="text-gray-600">kr {(variant.price || product.price).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-yellow-600 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-yellow-700 transition-colors">
              Contact for Pricing & Availability
            </button>

            {/* Back to Collection */}
            <div className="border-t border-gray-200 pt-8">
              <Link
                href="/hay"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                View All HAY Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
