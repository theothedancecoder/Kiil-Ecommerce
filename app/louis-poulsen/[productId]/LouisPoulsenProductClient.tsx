"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLouisPoulsenProductBySlug, LouisPoulsenProduct } from "@/sanity/lib/products/getLouisPoulsenProducts";
import { useRouter } from "next/navigation";
import ProductionImage from "@/components/ProductionImage";
import Header from "@/components/Header";
import AddToCartWithQuantity from "@/components/AddToCartWithQuantity";

interface LouisPoulsenProductClientProps {
  params: {
    productId: string;
  };
}

export default function LouisPoulsenProductClient({ params }: LouisPoulsenProductClientProps) {
  const slug = params.productId;
  const [product, setProduct] = useState<LouisPoulsenProduct | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await getLouisPoulsenProductBySlug(slug);
        if (!fetchedProduct) {
          setError("Product not found");
          setProduct(null);
        } else {
          setProduct(fetchedProduct);
        }
      } catch (err) {
        setError("Failed to load product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link 
            href="/louis-poulsen"
            className="inline-block bg-gray-900 text-white px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Back to Louis Poulsen
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link 
            href="/louis-poulsen"
            className="inline-block bg-gray-900 text-white px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Back to Louis Poulsen
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants?.[selectedVariantIndex];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation and Cart */}
      <Header />
      
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/louis-poulsen"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Louis Poulsen Collection
          </Link>
          
          <nav className="flex items-center space-x-2 text-sm mt-2">
            <Link href="/" className="text-stone-600 hover:text-stone-800">
              Home
            </Link>
            <span className="text-stone-400">/</span>
            <Link href="/louis-poulsen" className="text-stone-600 hover:text-stone-800">
              Louis Poulsen
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              {(selectedVariant?.image?.asset?.url || product.image?.asset?.url) ? (
                <ProductionImage
                  src={selectedVariant?.image?.asset?.url || product.image?.asset?.url}
                  alt={`${product.name}${selectedVariant ? ` - ${selectedVariant.name}` : ''}`}
                  fill
                  className="object-contain object-center p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Variant Thumbnails */}
            {product.variants && product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={`variant-${index}-${variant.name || variant.color}`}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVariantIndex === index
                        ? "border-blue-600"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {variant.image?.asset?.url ? (
                      <ProductionImage
                        src={variant.image.asset.url}
                        alt={`${variant.name} variant`}
                        fill
                        className="object-contain object-center p-2"
                        sizes="(max-width: 768px) 25vw, 12.5vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.color || variant.name}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {product.lifestyleImages.map((image, index) => (
                  <div key={`lifestyle-${index}`} className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                    {image.asset?.url && (
                      <ProductionImage
                        src={image.asset.url}
                        alt={`${product.name} lifestyle image ${index + 1}`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-blue-600 uppercase tracking-wider mb-2">
                LOUIS POULSEN COLLECTION
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {typeof product.description === 'string' 
                  ? product.description 
                  : Array.isArray(product.description) 
                    ? (product.description as any[]).map((block: any) => 
                        block.children?.map((child: any) => child.text).join(' ')
                      ).join(' ')
                    : 'Product description not available'
                }
              </p>
              {product.designer && (
                <div className="mt-4 text-sm text-gray-500">
                  Designed by {product.designer}
                </div>
              )}
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {(selectedVariant?.price || product.price)?.toLocaleString()}
            </div>

            {product.variants && product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Finish: {selectedVariant?.color || selectedVariant?.name}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={`variant-selector-${index}-${variant.name || variant.color}`}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`p-3 text-sm border rounded transition-all ${
                        selectedVariantIndex === index
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <div className="font-medium">{variant.color || variant.name}</div>
                      <div className="text-xs text-gray-500">kr {variant.price?.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AddToCartWithQuantity 
              product={{
                ...product,
                _id: product._id,
                price: selectedVariant?.price || product.price,
                image: selectedVariant?.image || product.image
              } as any}
              variant="large"
            />

            {/* Collapsible Features */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setFeaturesExpanded(!featuresExpanded)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Features
                  </h3>
                  <span className="text-gray-500">
                    {featuresExpanded ? "−" : "+"}
                  </span>
                </button>
                {featuresExpanded && (
                  <ul className="mt-4 space-y-2 text-gray-600">
                    {product.features.map((feature, idx) => (
                      <li key={`feature-${idx}`} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Collapsible Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setSpecificationsExpanded(!specificationsExpanded)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Specifications
                  </h3>
                  <span className="text-gray-500">
                    {specificationsExpanded ? "−" : "+"}
                  </span>
                </button>
                {specificationsExpanded && (
                  <div className="mt-4 space-y-3 text-gray-600">
                    {product.specifications.map((spec, idx) => (
                      <div key={`spec-${idx}-${spec.label}`} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium">{spec.label}</span>
                        <span className="text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Related Products */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
                  Related Products
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.relatedProducts.slice(0, 4).map((related) => (
                    <Link
                      key={related._id}
                      href={`/louis-poulsen/${related.slug?.current}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                        <div className="relative aspect-square bg-gray-50">
                          {related.image?.asset?.url ? (
                            <ProductionImage
                              src={related.image.asset.url}
                              alt={related.name || "Related product"}
                              fill
                              className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-light text-gray-900 mb-2">
                            {related.name}
                          </h3>
                          {related.price && (
                            <p className="text-gray-900 font-medium text-sm">
                              kr {related.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Collection */}
            <div className="border-t border-gray-200 pt-8">
              <Link
                href="/louis-poulsen"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                View All Louis Poulsen Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
