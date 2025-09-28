"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getLouisPoulsenProducts, getLouisPoulsenProductBySlug, LouisPoulsenProduct } from "@/sanity/lib/products/getLouisPoulsenProducts";
import { louisPoulsenProducts } from "@/lib/louisPoulsenProducts";
import ProductionImage from "@/components/ProductionImage";

export default function LouisPoulsenProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const [product, setProduct] = useState<LouisPoulsenProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.productId);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log("Received productId param:", productId);
        console.log("🚨 TEMPORARILY USING ONLY STATIC DATA TO FIX IMAGE ISSUE");
        
        // TEMPORARILY SKIP SANITY - USE ONLY STATIC DATA
        // This is to fix the wrong images issue
        
        // Try multiple matching strategies for static data
        const staticProduct = louisPoulsenProducts.find((p) => {
          // Match by exact ID
          if (p._id === productId) return true;
          
          // Match by href path (remove /louis-poulsen/ prefix)
          const hrefSlug = p.href.replace("/louis-poulsen/", "");
          if (hrefSlug === productId) return true;
          
          // Match by name-based slug (convert name to slug format)
          const nameSlug = p.name.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
          if (nameSlug === productId) return true;
          
          return false;
        });
        
        let foundProduct = null;
        
        if (staticProduct) {
          console.log("✅ Using static product data:", staticProduct.name);
          console.log("📸 Main image:", staticProduct.image);
          console.log("🎨 Variants:", staticProduct.variants.length);
          
          // Convert static product to Sanity format
          foundProduct = {
            _id: staticProduct._id,
            _type: "product",
            _createdAt: new Date().toISOString(),
            _updatedAt: new Date().toISOString(),
            _rev: "1",
            name: staticProduct.name,
            description: staticProduct.description,
            price: staticProduct.price,
            brand: staticProduct.brand,
            slug: {
              _type: "slug" as const,
              current: productId
            },
            image: staticProduct.image ? {
              asset: {
                _id: staticProduct._id + "-image",
                url: staticProduct.image
              }
            } : undefined,
            categories: [{
              _id: "lighting-category",
              title: staticProduct.category,
              slug: {
                _type: "slug" as const,
                current: staticProduct.category.toLowerCase()
              }
            }],
            variants: staticProduct.variants?.map((variant: any) => ({
              _type: "variant",
              name: variant.name,
              price: variant.price,
              material: variant.material,
              color: variant.color,
              image: variant.image ? {
                asset: {
                  _id: variant.name + "-image",
                  url: variant.image
                }
              } : undefined
            })),
            designer: staticProduct.designer,
            features: staticProduct.features,
            specifications: staticProduct.specifications,
            href: staticProduct.href
          } as LouisPoulsenProduct;
        }
        
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error fetching product:", error);
        
        // Final fallback to static data on error
        const staticProduct = louisPoulsenProducts.find((p) => {
          return p._id === productId || 
                 p.href.replace("/louis-poulsen/", "") === productId ||
                 p.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === productId;
        });
        
        if (staticProduct) {
          setProduct({
            _id: staticProduct._id,
            _type: "product",
            _createdAt: new Date().toISOString(),
            _updatedAt: new Date().toISOString(),
            _rev: "1",
            name: staticProduct.name,
            description: staticProduct.description,
            price: staticProduct.price,
            brand: staticProduct.brand,
            slug: {
              _type: "slug" as const,
              current: productId
            },
            image: staticProduct.image ? {
              asset: {
                _id: staticProduct._id + "-image",
                url: staticProduct.image
              }
            } : undefined,
            categories: [{
              _id: "lighting-category",
              title: staticProduct.category,
              slug: {
                _type: "slug" as const,
                current: staticProduct.category.toLowerCase()
              }
            }],
            variants: staticProduct.variants?.map((variant: any) => ({
              _type: "variant",
              name: variant.name,
              price: variant.price,
              material: variant.material,
              color: variant.color,
              image: variant.image ? {
                asset: {
                  _id: variant.name + "-image",
                  url: variant.image
                }
              } : undefined
            })),
            designer: staticProduct.designer,
            features: staticProduct.features,
            specifications: staticProduct.specifications,
            href: staticProduct.href
          } as LouisPoulsenProduct);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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

  return <LouisPoulsenProductClient product={product} />;
}

function LouisPoulsenProductClient({ product }: { product: LouisPoulsenProduct }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = product.variants?.[selectedVariantIndex] || {
    name: "Default",
    image: product.image,
    color: "Default",
    price: product.price || 0,
  };

  // Helper function to extract image URL from either string or Sanity object
  const getImageSrc = (imageSource: any): string => {
    if (typeof imageSource === 'string') {
      return imageSource;
    }
    if (imageSource && typeof imageSource === 'object' && imageSource.asset?.url) {
      return imageSource.asset.url;
    }
    return '';
  };

  // Get related products (other Louis Poulsen products)
  const relatedProducts = louisPoulsenProducts
    .filter(p => p._id !== product._id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
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
              <Image
                src={getImageSrc(selectedVariant.image) || getImageSrc(product.image) || ''}
                alt={`${product.name} - ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
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
                    <Image
                      src={getImageSrc(variant.image)}
                      alt={`${variant.name} variant`}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.name}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Louis Poulsen
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
              {product.designer && (
                <div className="mt-4 text-sm text-gray-500">
                  Designed by {product.designer}
                </div>
              )}
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {(selectedVariant.price || 0).toLocaleString()}
            </div>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Finish: {selectedVariant.name}
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedVariantIndex === index
                          ? "border-gray-900 scale-110"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: variant.color || "#D1D5DB" }}
                      title={variant.name}
                    >
                      {selectedVariantIndex === index && (
                        <div className="absolute inset-0 rounded-full border-2 border-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {(selectedVariant.price || 0).toLocaleString()}
            </button>

            {/* Features */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Features
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Iconic Danish design by {product.designer}</li>
                <li>High-quality materials and craftsmanship</li>
                <li>Timeless aesthetic that complements any interior</li>
                <li>Professional lighting performance</li>
                {product.variants && product.variants.length > 1 && (
                  <li>Available in multiple finishes</li>
                )}
              </ul>
            </div>

            {/* Specifications */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Specifications
              </h3>
              <div className="grid grid-cols-1 gap-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Brand</span>
                  <span className="font-medium">Louis Poulsen</span>
                </div>
                <div className="flex justify-between">
                  <span>Designer</span>
                  <span className="font-medium">{product.designer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="font-medium">{product.categories?.[0]?.title || "Lighting"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-medium">kr {(selectedVariant.price || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-20 pt-16 border-t border-gray-200">
                <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {relatedProducts.map((related) => (
                    <Link
                      key={related._id}
                      href={`/louis-poulsen/${related.href.replace("/louis-poulsen/", "")}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                        <div className="relative aspect-square bg-gray-50">
                          <Image
                            src={related.image}
                            alt={related.name}
                            fill
                            className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-light text-gray-900 mb-2">
                            {related.name}
                          </h3>
                          <p className="text-gray-900 font-medium">
                            kr {related.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="text-center">
                  <Link
                    href="/louis-poulsen"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    View All Louis Poulsen Products
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
