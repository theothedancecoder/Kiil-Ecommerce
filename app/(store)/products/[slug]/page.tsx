"use client";

import { getAllProducts } from "@/sanity/lib/products/getAllProductsSimple";
import { Product, ALL_PRODUCTS_QUERYResult } from "@/sanity.types";
import Image from 'next/image';
import { imageUrl } from "@/lib/ImageUrl";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30 minutes

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function ProductPageClient({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number>(product.price || 0);

  // Initialize with first variant or main product image
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
      if (product.variants[0].image) {
        setCurrentImage(imageUrl(product.variants[0].image).url());
      } else if (product.image) {
        setCurrentImage(imageUrl(product.image).url());
      }
      setCurrentPrice(product.variants[0].price || product.price || 0);
    } else if (product.image) {
      setCurrentImage(imageUrl(product.image).url());
    }
  }, [product]);

  const handleVariantSelect = (variant: any) => {
    setSelectedVariant(variant);
    
    // Update image if variant has one
    if (variant.image) {
      setCurrentImage(imageUrl(variant.image).url());
    } else if (product.image) {
      setCurrentImage(imageUrl(product.image).url());
    }
    
    // Update price if variant has different price
    setCurrentPrice(variant.price || product.price || 0);
  };

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
                <Link href="/products" className="text-gray-500 hover:text-gray-700">
                  Products
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
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={selectedVariant?.name || product.name || 'Product'}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                />
              ) : product.image ? (
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
            
            {/* Variant thumbnails */}
            {product.variants && product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.variants.slice(0, 4).map((variant: any, index: number) => (
                  <button
                    key={variant._key || index}
                    onClick={() => handleVariantSelect(variant)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedVariant?._key === variant._key 
                        ? 'border-stone-800' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {variant.image ? (
                      <Image
                        src={imageUrl(variant.image).url()}
                        alt={variant.name || `Variant ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        {variant.name?.substring(0, 3) || `V${index + 1}`}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Product Title and Category */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {product.brand || product.categories?.[0]?.title || 'PRODUCT'}
              </div>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                {product.name}
              </h1>
              
              {/* Dynamic Price */}
              <div className="text-3xl font-light text-stone-800 mb-6">
                kr {currentPrice.toLocaleString()}
                {selectedVariant && selectedVariant.price !== product.price && (
                  <span className="text-lg text-gray-500 ml-2">
                    (was kr {product.price?.toLocaleString()})
                  </span>
                )}
              </div>
            </div>

            {/* Selected Variant Info */}
            {selectedVariant && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-stone-800 mb-2">Selected Option:</h4>
                <p className="text-stone-600">{selectedVariant.name}</p>
                {selectedVariant.color && (
                  <p className="text-sm text-gray-500">Color: {selectedVariant.color}</p>
                )}
                {selectedVariant.material && (
                  <p className="text-sm text-gray-500">Material: {selectedVariant.material}</p>
                )}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="prose prose-stone max-w-none">
                <h3 className="text-lg font-semibold text-stone-800 mb-3">Description</h3>
                <div className="text-stone-600 leading-relaxed">
                  {typeof product.description === 'string' 
                    ? product.description 
                    : Array.isArray(product.description)
                      ? product.description
                          .filter((block: any) => block._type === 'block' && 'children' in block)
                          .map((block: any) => 
                            'children' in block && block.children
                              ?.filter((child: any) => child._type === 'span')
                              ?.map((child: any) => child.text)
                              ?.join(' ')
                          )
                          .join(' ')
                      : 'Detailed product description available upon request.'
                  }
                </div>
              </div>
            )}

            {/* Product Variants/Colors */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-800">Available Options</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant: any, index: number) => (
                    <button 
                      key={variant._key || index}
                      onClick={() => handleVariantSelect(variant)}
                      className={`px-4 py-2 border rounded-lg transition-all ${
                        selectedVariant?._key === variant._key
                          ? 'border-stone-800 bg-stone-800 text-white'
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {variant.name || variant.color || variant.material || `Option ${index + 1}`}
                      {variant.price && variant.price !== product.price && (
                        <span className={`ml-2 text-sm ${
                          selectedVariant?._key === variant._key ? 'text-gray-200' : 'text-gray-600'
                        }`}>
                          (+kr {(variant.price - (product.price || 0)).toLocaleString()})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                Add to Cart {selectedVariant && `- ${selectedVariant.name}`}
              </button>

              {/* Stock Status */}
              {product.stock !== undefined && product.stock !== null && (
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
                {product.brand && (
                  <div className="flex justify-between">
                    <span>Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                )}
                {product.categories && product.categories.length > 0 && (
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{product.categories.map((cat: any) => cat.title).join(', ')}</span>
                  </div>
                )}
                {product.roomCategory && (
                  <div className="flex justify-between">
                    <span>Room:</span>
                    <span>{product.roomCategory}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span>{product._id}</span>
                </div>
                {selectedVariant && (
                  <div className="flex justify-between">
                    <span>Selected:</span>
                    <span>{selectedVariant.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-stone-800 text-center mb-12">
            {product.brand ? `More from ${product.brand}` : 'Related Products'}
          </h2>
          <div className="text-center">
            <Link 
              href="/products"
              className="inline-block bg-stone-800 text-white px-8 py-3 font-medium hover:bg-stone-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const allProducts = await getAllProducts();
  const product = allProducts.find((p: any) => p.slug?.current === slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    
    return products
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        slug: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
