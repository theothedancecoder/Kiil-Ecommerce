"use client";

import Image from 'next/image';
import { imageUrl } from "@/lib/ImageUrl";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import AddToCartWithQuantity from "@/components/AddToCartWithQuantity";

interface ProductPageClientProps {
  product: any;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number>(product.price || 0);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [specificationsOpen, setSpecificationsOpen] = useState(false);

  // Initialize with first variant or main product image
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
      if (product.variants[0].image?.asset) {
        try {
          setCurrentImage(imageUrl(product.variants[0].image).url());
        } catch (e) {
          console.error('Error loading variant image:', e);
        }
      } else if (product.image?.asset) {
        try {
          setCurrentImage(imageUrl(product.image).url());
        } catch (e) {
          console.error('Error loading product image:', e);
        }
      }
      setCurrentPrice(product.variants[0].price || product.price || 0);
    } else if (product.image?.asset) {
      try {
        setCurrentImage(imageUrl(product.image).url());
      } catch (e) {
        console.error('Error loading product image:', e);
      }
    }
  }, [product]);

  const handleVariantSelect = (variant: any) => {
    setSelectedVariant(variant);
    
    // Update image if variant has one
    if (variant.image?.asset) {
      try {
        setCurrentImage(imageUrl(variant.image).url());
      } catch (e) {
        console.error('Error loading variant image:', e);
      }
    } else if (product.image?.asset) {
      try {
        setCurrentImage(imageUrl(product.image).url());
      } catch (e) {
        console.error('Error loading product image:', e);
      }
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

      {/* Product Details - DUX Style Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Product Images */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-white">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={selectedVariant?.name || product.name || 'Product'}
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : product.image?.asset ? (
                <Image
                  src={imageUrl(product.image).url()}
                  alt={product.name || 'Product'}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-lg">No Image Available</span>
                </div>
              )}
            </div>
            
            {/* Variant Thumbnails - DUX Style */}
            {product.variants && product.variants.length > 1 && (
              <div className="flex space-x-4">
                {product.variants.slice(0, 4).map((variant: any, index: number) => (
                  <button
                    key={variant._key || index}
                    onClick={() => handleVariantSelect(variant)}
                    className={`relative w-20 h-20 bg-white border-2 transition-all duration-300 ${
                      selectedVariant?._key === variant._key 
                        ? 'border-stone-900' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {variant.image?.asset ? (
                      <Image
                        src={imageUrl(variant.image).url()}
                        alt={variant.name || `Variant ${index + 1}`}
                        fill
                        className="object-contain p-2"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-400 text-center">
                          {variant.name?.split(' - ')[0] || `${index + 1}`}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-6 left-0 right-0 text-center">
                      <span className="text-xs text-gray-600">
                        {variant.name?.split(' - ')[0] || `Option ${index + 1}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            {/* Brand Label */}
            <div className="text-xs font-medium text-stone-500 uppercase tracking-[0.3em]">
              {product.brand?.toUpperCase() || 'PRODUCT'} COLLECTION
            </div>

            {/* Product Title */}
            <h1 className="text-5xl md:text-6xl font-extralight text-stone-900 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Description */}
            <div className="text-stone-600 leading-relaxed text-lg font-light max-w-lg">
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
                  : 'A masterpiece of contemporary design, crafted with meticulous attention to detail and uncompromising quality.'
              }
            </div>

            {/* Designer Credit */}
            {product.brand && (
              <div className="text-stone-500 font-light">
                Designed by {product.brand}
              </div>
            )}

            {/* Price */}
            <div className="text-4xl font-extralight text-stone-900 tracking-wide">
              kr {currentPrice ? currentPrice.toLocaleString() : '0'}
            </div>

            {/* Variant Selection */}
            {selectedVariant && (
              <div className="space-y-4">
                <div className="text-sm font-medium text-stone-900 uppercase tracking-[0.2em]">
                  VARIANT: {selectedVariant.name?.toUpperCase() || 'SELECTED OPTION'}
                </div>
                
                {/* Color/Material Circles - DUX Style */}
                <div className="flex space-x-4">
                  {product.variants.map((variant: any, index: number) => (
                    <button
                      key={variant._key || index}
                      onClick={() => handleVariantSelect(variant)}
                      className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                        selectedVariant?._key === variant._key
                          ? 'border-stone-900 scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{
                        backgroundColor: variant.color?.toLowerCase().includes('black') ? '#000' :
                                       variant.color?.toLowerCase().includes('brown') ? '#8B4513' :
                                       variant.color?.toLowerCase().includes('white') ? '#FFF' :
                                       variant.color?.toLowerCase().includes('oak') ? '#DEB887' :
                                       variant.color?.toLowerCase().includes('walnut') ? '#8B4513' :
                                       '#D1D5DB'
                      }}
                      title={variant.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart with Quantity */}
            <AddToCartWithQuantity 
              product={{
                ...product,
                _id: product._id,
                price: currentPrice,
                image: product.image
              } as any}
              variant="large"
            />

            {/* Stock Status */}
            {product.stock !== undefined && product.stock !== null && (
              <div className="text-sm font-light text-stone-600">
                {product.stock > 0 ? (
                  <span className="text-emerald-600">✓ In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features and Specifications - DUX Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Lifestyle Image */}
          <div className="relative aspect-square bg-gray-100">
            {product.lifestyleImages && product.lifestyleImages.length > 0 && product.lifestyleImages[0]?.asset ? (
              <Image
                src={imageUrl(product.lifestyleImages[0]).url()}
                alt={`${product.name} lifestyle`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">Lifestyle Image</span>
              </div>
            )}
          </div>

          {/* Right Column - Features & Specifications */}
          <div className="space-y-4">
            {/* Features */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="text-lg font-medium text-stone-900 uppercase tracking-[0.1em]">Features</span>
                <span className="text-2xl text-stone-600">
                  {featuresOpen ? '−' : '+'}
                </span>
              </button>
              {featuresOpen && (
                <div className="pb-4 text-stone-600 leading-relaxed">
                  <ul className="space-y-2">
                    <li>• Premium {selectedVariant?.material || 'wood'} construction</li>
                    <li>• Scandinavian design aesthetic</li>
                    <li>• Sustainable materials and production</li>
                    <li>• Timeless and versatile styling</li>
                    <li>• Expert craftsmanship and attention to detail</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => setSpecificationsOpen(!specificationsOpen)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="text-lg font-medium text-stone-900 uppercase tracking-[0.1em]">Specifications</span>
                <span className="text-2xl text-stone-600">
                  {specificationsOpen ? '−' : '+'}
                </span>
              </button>
              {specificationsOpen && (
                <div className="pb-4 text-stone-600 leading-relaxed">
                  <div className="space-y-3">
                    {product.brand && (
                      <div className="flex justify-between">
                        <span>Brand:</span>
                        <span className="font-medium">{product.brand}</span>
                      </div>
                    )}
                    {selectedVariant?.material && (
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium">{selectedVariant.material}</span>
                      </div>
                    )}
                    {selectedVariant?.color && (
                      <div className="flex justify-between">
                        <span>Color:</span>
                        <span className="font-medium">{selectedVariant.color}</span>
                      </div>
                    )}
                    {product.categories && product.categories.length > 0 && (
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-medium">{product.categories.map((cat: any) => cat.title).join(', ')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>SKU:</span>
                      <span className="font-mono text-xs">{product._id.slice(-8).toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Story Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-medium text-stone-500 uppercase tracking-[0.2em] mb-4">
                {product.brand?.toUpperCase() || 'PRODUCT'} {product.categories?.[0]?.title?.toUpperCase() || ''}
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8 leading-tight">
                Calm presence and bold expression
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                {product.name} blends timeless craftsmanship with modern functionality. Available in multiple finishes, 
                its stackable design and sculptural form make it a versatile choice for both private and professional spaces.
              </p>
              
              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider mb-4">About the design</h3>
                  <p className="text-stone-600 leading-relaxed">
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
                        : `${product.name} represents the perfect balance between form and function, designed for modern living spaces.`
                    }
                  </p>
                </div>
                
                {selectedVariant && (
                  <div>
                    <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider mb-4">Specifications</h3>
                    <div className="space-y-2 text-sm text-stone-600">
                      <div className="flex justify-between">
                        <span>Variant:</span>
                        <span className="font-medium">{selectedVariant.name}</span>
                      </div>
                      {selectedVariant.material && (
                        <div className="flex justify-between">
                          <span>Material:</span>
                          <span className="font-medium">{selectedVariant.material}</span>
                        </div>
                      )}
                      {selectedVariant.color && (
                        <div className="flex justify-between">
                          <span>Color:</span>
                          <span className="font-medium">{selectedVariant.color}</span>
                        </div>
                      )}
                      {selectedVariant.size && (
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span className="font-medium">{selectedVariant.size}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:pl-8">
              {product.variants && product.variants.length > 0 && (
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider mb-6">Available Options</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.variants.slice(0, 4).map((variant: any, index: number) => (
                      <button
                        key={variant._key || index}
                        onClick={() => handleVariantSelect(variant)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          selectedVariant?._key === variant._key 
                            ? 'border-stone-900 shadow-lg' 
                            : 'border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {variant.image?.asset ? (
                          <Image
                            src={imageUrl(variant.image).url()}
                            alt={variant.name || `Variant ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                            <span className="text-xs text-stone-500 text-center px-2">
                              {variant.name || `Option ${index + 1}`}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <span className="text-white text-xs font-medium">
                            {variant.name?.split(' - ')[0] || `Option ${index + 1}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {product.variants.length > 4 && (
                    <p className="text-xs text-stone-500 mt-4 text-center">
                      +{product.variants.length - 4} more options available
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Images */}
      {product.lifestyleImages && product.lifestyleImages.length > 0 && (
        <section className="py-0 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {product.lifestyleImages.slice(0, 3).map((image: any, index: number) => (
                <div key={index} className="relative aspect-square bg-stone-100 overflow-hidden">
                  {image?.asset ? (
                    <Image
                      src={imageUrl(image).url()}
                      alt={image.alt || `${product.name} lifestyle ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {product.lifestyleImages.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-0">
                {product.lifestyleImages.slice(3, 5).map((image: any, index: number) => (
                  <div key={index + 3} className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    {image?.asset ? (
                      <Image
                        src={imageUrl(image).url()}
                        alt={image.alt || `${product.name} lifestyle ${index + 4}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Products */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-medium text-stone-500 uppercase tracking-[0.2em] mb-4">
              {product.brand?.toUpperCase() || 'PRODUCT'} COLLECTION
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              {product.relatedProducts && product.relatedProducts.length > 0 
                ? 'More to discover' 
                : product.brand 
                  ? `More from ${product.brand}` 
                  : 'Discover more'
              }
            </h2>
          </div>
          
          {product.relatedProducts && product.relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {product.relatedProducts.slice(0, 2).map((relatedProduct: any) => (
                <Link
                  key={relatedProduct._id}
                  href={`/products/${relatedProduct.slug?.current || relatedProduct._id}`}
                  className="group"
                >
                  <div className="bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
                    <div className="relative aspect-square bg-stone-100">
                      {relatedProduct.image?.asset ? (
                        <Image
                          src={imageUrl(relatedProduct.image).width(600).height(600).url()}
                          alt={relatedProduct.name || "Related Product"}
                          fill
                          className="object-contain object-center p-12 group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-stone-400">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-8 text-center">
                      <div className="text-xs font-medium text-stone-500 uppercase tracking-[0.2em] mb-3">
                        {relatedProduct.brand?.toUpperCase() || 'PRODUCT'}
                      </div>
                      <h3 className="text-2xl font-light text-stone-900 mb-4 leading-tight">
                        {relatedProduct.name}
                      </h3>
                      <div className="text-lg font-light text-stone-700 tracking-wide">
                        {relatedProduct.price ? `${relatedProduct.price.toLocaleString()} kr` : 'Price on request'}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <Link 
                href="/products"
                className="inline-block bg-stone-900 text-white px-12 py-4 text-sm font-medium uppercase tracking-wider hover:bg-stone-800 transition-colors duration-300"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
