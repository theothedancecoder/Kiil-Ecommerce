"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRoCollectionProductBySlug, RoCollectionProduct } from "@/sanity/lib/products/getRoCollectionProducts";
import { useRouter } from "next/navigation";
import ProductionImage from "@/components/ProductionImage";
import Header from "@/components/Header";
import { useLanguage } from "@/lib/languageContext";
import AddToCartWithQuantity from "@/components/AddToCartWithQuantity";

interface ROCollectionProductClientProps {
  params: {
    productId: string;
  };
}

export default function ROCollectionProductClient({ params }: ROCollectionProductClientProps) {
  const { t, language } = useLanguage();

  const slug = params.productId;
  const [product, setProduct] = useState<RoCollectionProduct | null>(null);

  // Get description based on language
  const displayDescription = language === 'no' && product.descriptionNo 
    ? product.descriptionNo 
    : product.description;
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
        const fetchedProduct = await getRoCollectionProductBySlug(slug);
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
    return <div className="min-h-screen flex items-center justify-center">Loading product...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
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
            href="/ro-collection"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('product.back.roCollection')}
          </Link>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-stone-600 hover:text-stone-800">{t('product.breadcrumb.home')}</Link>
            <span className="text-stone-400">/</span>
            <Link href="/ro-collection" className="text-stone-600 hover:text-stone-800">
              RO Collection
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
              {(selectedVariant?.image?.asset?.url || (selectedVariant as any)?.imagePath) ? (
                <ProductionImage
                  src={selectedVariant?.image?.asset?.url || (selectedVariant as any)?.imagePath}
                  alt={`${product.name} - ${selectedVariant?.name}`}
                  fill
                  className="object-contain object-center p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (product.image?.asset?.url || (product as any).imagePath) ? (
                <ProductionImage
                  src={product.image?.asset?.url || (product as any).imagePath}
                  alt={product.name ?? "RO Collection product"}
                  fill
                  className="object-contain object-center p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Variant Thumbnails */}
            {product.variants && product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVariantIndex === index
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {(variant.image?.asset?.url || (variant as any).imagePath) ? (
                      <ProductionImage
                        src={variant.image?.asset?.url || (variant as any).imagePath}
                        alt={`${variant.name} variant`}
                        fill
                        className="object-contain object-center p-2"
                        sizes="(max-width: 768px) 25vw, 12.5vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.material || variant.base || variant.name}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {product.lifestyleImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                    {(image.asset?.url || (image as any).imagePath) ? (
                      <ProductionImage
                        src={image.asset?.url || (image as any).imagePath}
                        alt={`${product.name} lifestyle image ${index + 1}`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                RO Collection
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {displayDescription}
              </p>
              {product.designer && (
                <div className="mt-4 text-sm text-gray-500">
                  Designed by {product.designer}
                </div>
              )}
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {selectedVariant?.price?.toLocaleString() ?? product.price?.toLocaleString()}
            </div>

            {product.variants && product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  {selectedVariant?.base ? `Base: ${selectedVariant.base}` : 
                   selectedVariant?.material ? `Material: ${selectedVariant.material}` : 
                   selectedVariant?.size ? `Size: ${selectedVariant.size}` : 
                   'Options'}
                  {selectedVariant?.leather && ` | Leather: ${selectedVariant.leather}`}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`p-3 text-sm border rounded transition-all text-left ${
                        selectedVariantIndex === index
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-xs text-gray-500">kr {variant.price?.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AddToCartWithQuantity 
              product={{
                _id: product._id || product.name || 'ro-product',
                name: product.name || 'RO Collection Product',
                price: selectedVariant?.price ?? product.price ?? 0,
                image: {
                  _type: "image",
                  asset: {
                    _ref: "temp-ref",
                    _type: "reference"
                  }
                },
                slug: {
                  _type: "slug",
                  current: product.slug?.current || product.name?.toLowerCase().replace(/\s+/g, '-') || 'ro-product'
                },
                _type: 'product',
                _createdAt: new Date().toISOString(),
                _updatedAt: new Date().toISOString(),
                _rev: 'temp'
              } as any}
              variant="large"
            />

            {/* Collapsible Features */}
            {product.features && (
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
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Collapsible Specifications */}
            {product.specifications && (
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
                      <div key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium">{spec.label}</span>
                        <span className="text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Related Products */}
            {product.relatedProducts && (
              <div className="border-t border-gray-200 pt-16">
                <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {product.relatedProducts.map((related) => {
                  return (
                    <Link
                      key={related._id}
                      href={`/ro-collection/${related._id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                        <div className="relative aspect-square bg-gray-50">
                          {(related.image?.asset?.url || (related as any).imagePath) ? (
                            <ProductionImage
                              src={related.image?.asset?.url || (related as any).imagePath}
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
                          <h3 className="text-lg font-light text-gray-900 mb-2">
                            {related.name}
                          </h3>
                          {related.price && (
                            <p className="text-gray-900 font-medium">
                              kr {related.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/ro-collection"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    {t('product.viewAll.roCollection')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
