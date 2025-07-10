import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Product } from "@/sanity.types";
import Image from 'next/image';
import { imageUrl } from "@/lib/ImageUrl";
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = "force-static";
export const revalidate = 1800; // 30 minutes

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const allProducts = await getAllProducts();
  const product = allProducts.find((p: Product) => p.slug?.current === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/kartell" className="text-gray-500 hover:text-gray-700">
                  Kartell
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {product.image ? (
                <Image
                  src={imageUrl(product.image).url()}
                  alt={product.name || 'Product'}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-lg">No Image Available</span>
                </div>
              )}
            </div>
            
            {/* Additional product images could go here */}
            <div className="grid grid-cols-4 gap-4">
              {/* Placeholder for additional images */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Product Title and Category */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {product.categories?.[0]?.title === "CARTEL" ? "KARTELL" : product.categories?.[0]?.title}
              </div>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                {product.name}
              </h1>
              
              {/* Price */}
              {product.price && (
                <div className="text-3xl font-light text-stone-800 mb-6">
                  kr {product.price.toLocaleString()}
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-stone max-w-none">
                <h3 className="text-lg font-semibold text-stone-800 mb-3">Description</h3>
                <div className="text-stone-600 leading-relaxed">
                  {typeof product.description === 'string' 
                    ? product.description 
                    : 'Detailed product description available upon request.'
                  }
                </div>
              </div>
            )}

            {/* Product Variants/Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-800">Available Options</h3>
              <div className="flex flex-wrap gap-3">
                {/* Placeholder for variants - you can expand this based on your product schema */}
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  Default
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  Alternative
                </button>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-800">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    −
                  </button>
                  <span className="text-lg font-medium w-8 text-center">1</span>
                  <button className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-stone-800 text-white py-4 px-8 text-lg font-medium uppercase tracking-wider hover:bg-stone-700 transition-colors">
                Add to Cart
              </button>

              {/* Stock Status */}
              {product.stock !== undefined && (
                <div className="text-sm text-gray-600">
                  {product.stock > 0 ? (
                    <span className="text-green-600">✓ In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Product Details</h3>
              <div className="space-y-3 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Brand:</span>
                  <span>Kartell</span>
                </div>
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span>Polycarbonate</span>
                </div>
                <div className="flex justify-between">
                  <span>Origin:</span>
                  <span>Made in Italy</span>
                </div>
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span>{product._id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-stone-800 text-center mb-12">
            More from Kartell
          </h2>
          <div className="text-center">
            <Link 
              href="/kartell"
              className="inline-block bg-stone-800 text-white px-8 py-3 font-medium hover:bg-stone-700 transition-colors"
            >
              View All Kartell Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getAllProducts();
  
  return products
    .filter((product: Product) => product.slug?.current)
    .map((product: Product) => ({
      slug: product.slug!.current,
    }));
}
