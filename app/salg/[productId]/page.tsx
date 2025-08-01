import { salesProducts, SaleProduct, calculateSavings } from "@/lib/salesData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import AddToSaleBasketButton from "@/components/AddToSaleBasketButton";

interface SaleProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

// Generate static params for all sale products
export async function generateStaticParams() {
  return salesProducts.map((product) => ({
    productId: product.id,
  }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: SaleProductPageProps) {
  const { productId } = await params;
  const product = salesProducts.find(p => p.id === productId);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Sale | Kiil`,
    description: product.description || `${product.name} on sale at Kiil`,
  };
}

export default async function SaleProductPage({ params }: SaleProductPageProps) {
  const { productId } = await params;
  const product = salesProducts.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  const savings = calculateSavings(product.originalPrice, product.salePrice);
  const hasPricing = product.originalPrice > 0 && product.salePrice > 0;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/salg" className="hover:text-gray-700">
            Sale
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Sale Badge */}
              {hasPricing && savings > 0 && (
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-4 py-2 text-lg font-semibold rounded-full shadow-lg">
                    -{savings}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Brand */}
            <div className="text-lg font-medium text-gray-800 uppercase tracking-wider">
              {product.brand}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Designer */}
            {product.designer && (
              <p className="text-lg text-gray-600 font-light">
                Design by {product.designer}
              </p>
            )}

            {/* Description */}
            {product.description && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Pricing */}
            <div className="border-t border-gray-200 pt-8">
              {hasPricing ? (
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between py-2">
                    <span className="text-lg text-gray-600 font-light">Original price</span>
                    <span className="text-xl text-gray-500 line-through font-light">
                      kr {product.originalPrice.toLocaleString('no-NO')}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between py-2 border-t border-gray-100">
                    <span className="text-lg text-gray-600 font-light">Sale price</span>
                    <span className="text-2xl font-medium text-red-500">
                      kr {product.salePrice.toLocaleString('no-NO')}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between py-2 bg-green-50 px-4 rounded">
                    <span className="text-lg text-green-700 font-medium">You save</span>
                    <span className="text-xl font-semibold text-green-700">
                      kr {(product.originalPrice - product.salePrice).toLocaleString('no-NO')} ({savings}%)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-xl text-red-500 font-medium mb-2">Special Price</p>
                  <p className="text-gray-600">Contact us for pricing information</p>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="border-t border-gray-200 pt-8">
              <AddToSaleBasketButton product={product} />
            </div>

            {/* Exhibition Model Badge */}
            {product.name.toLowerCase().includes('exhibition') && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-800">Exhibition Model</p>
                    <p className="text-sm text-blue-600">This is a display model from our showroom</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Interested in this product?</h3>
              <p className="text-gray-600">
                Contact us for more information about availability, delivery, and to arrange viewing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="tel:+4762948080" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-md font-medium"
                >
                  Call: 62 94 80 80
                </a>
                <a 
                  href="mailto:post@kiil.no" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 rounded-md font-medium"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">Other Sale Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {salesProducts
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/salg/${relatedProduct.id}`} className="group">
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 uppercase tracking-wider">
                        {relatedProduct.brand}
                      </p>
                      <h3 className="text-base font-medium text-gray-900 mt-1 group-hover:text-gray-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      {relatedProduct.originalPrice > 0 && relatedProduct.salePrice > 0 && (
                        <p className="text-sm text-red-500 font-medium mt-2">
                          kr {relatedProduct.salePrice.toLocaleString('no-NO')}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
