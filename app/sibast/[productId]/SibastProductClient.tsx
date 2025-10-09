"use client";

import { useState } from "react";
import Link from "next/link";
import ProductionImage from "@/components/ProductionImage";
import AddToCartWithQuantity from "@/components/AddToCartWithQuantity";

interface ProductVariant {
  name: string;
  image: string;
  price?: number;
  material?: string;
  size?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  descriptionNo?: string;
  price: number;
  category: string;
  variants: ProductVariant[];
  designer?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  lifestyleImages?: string[];
}

interface SibastProductClientProps {
  product: Product;
  products: Product[];
}

export default function SibastProductClient({ product, products }: SibastProductClientProps) {
  const { t, language } = useLanguage();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Get description based on language
  const displayDescription = language === 'no' && product.descriptionNo 
    ? product.descriptionNo 
    : product.description;
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];

  // Function to get the best variant for thumbnail
  const getBestThumbnail = (product: Product) => {
    if (!product.variants || product.variants.length === 0) {
      return '';
    }
    
    // Priority order for materials (most appealing first)
    const materialPriority = [
      'Walnut', 'Smoked Oak', 'Oiled Oak', 'White Oiled Oak', 'Black Beech'
    ];
    
    // Find the best material variant
    for (const material of materialPriority) {
      const variant = product.variants.find((v: ProductVariant) => 
        v.material === material || v.name.includes(material)
      );
      if (variant) {
        return variant.image;
      }
    }
    
    // If no priority material found, return the first variant
    return product.variants[0]?.image || '';
  };

  // Material mapping for visual swatches
  const getSwatchColor = (materialName: string) => {
    const materialMap: { [key: string]: string } = {
      'Oiled Oak': 'bg-amber-200',
      'White Oiled Oak': 'bg-stone-100 border-2 border-gray-300',
      'Smoked Oak': 'bg-amber-800',
      'Walnut': 'bg-amber-900',
      'Black Beech': 'bg-gray-900',
    };
    
    // Check if the material name contains any of our mapped materials
    for (const [key, value] of Object.entries(materialMap)) {
      if (materialName && materialName.includes(key)) {
        return value;
      }
    }
    return 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/sibast" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('product.back.sibast')}
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">{t('product.breadcrumb.home')}</Link>
              <span className="text-stone-400">/</span>
              <Link href="/sibast" className="text-stone-600 hover:text-stone-800">
                Sibast Furniture
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
              <ProductionImage
                src={selectedVariant.image}
                alt={`${product.name} - ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            {product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.slice(0, 8).map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVariantIndex === index
                        ? "border-amber-600"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <ProductionImage
                      src={variant.image}
                      alt={`${variant.name} variant`}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.material}
                    </div>
                  </button>
                ))}
                {product.variants.length > 8 && (
                  <div className="flex items-center justify-center bg-gray-100 rounded-lg text-sm text-gray-500">
                    +{product.variants.length - 8}
                  </div>
                )}
              </div>
            )}

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {product.lifestyleImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                    <ProductionImage
                      src={image}
                      alt={`${product.name} lifestyle image ${index + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-amber-600 uppercase tracking-wider mb-2">
                Sibast Furniture Collection
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
              kr {(selectedVariant.price || product.price).toLocaleString()}
            </div>

            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Configuration: {selectedVariant.size ? `${selectedVariant.material} - ${selectedVariant.size}` : selectedVariant.material}
                </h3>
                <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`p-3 text-sm border rounded transition-all text-left ${
                        selectedVariantIndex === index
                          ? "border-amber-600 bg-amber-50"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <div className="font-medium">{variant.size ? `${variant.material} - ${variant.size}` : variant.material}</div>
                      <div className="text-xs text-gray-500">kr {(variant.price || product.price).toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector and Add to Cart */}
            <AddToCartWithQuantity
              product={{
                _id: product.id,
                name: product.name,
                price: selectedVariant.price || product.price,
                image: {
                  asset: {
                    _id: product.id,
                    url: selectedVariant.image
                  }
                }
              } as any}
              variant="large"
              showCurrentCount={true}
              className="space-y-4"
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

            {/* Back to Collection */}
            <div className="border-t border-gray-200 pt-8">
              <Link
                href="/sibast"
                className="inline-block bg-gray-100 text-gray-900 px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                {t('product.viewAll.sibast')}
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
              Related Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more exceptional pieces from the Sibast Furniture collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter((p) => p.id !== product.id) // Exclude current product
              .map((relatedProduct) => {
                const thumbnailImage = getBestThumbnail(relatedProduct);

                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/sibast/${relatedProduct.id}`}
                    className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <ProductionImage
                        src={thumbnailImage}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        {relatedProduct.category}
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-light text-gray-900">
                          kr {relatedProduct.price.toLocaleString()}
                          {relatedProduct.variants && relatedProduct.variants.length > 1 && (
                            <span className="text-xs text-gray-500 ml-1">+</span>
                          )}
                        </span>
                        {relatedProduct.variants && relatedProduct.variants.length > 1 && (
                          <span className="text-xs text-gray-500">
                            {relatedProduct.variants.length} variants
                          </span>
                        )}
                      </div>
                      
                      {/* Material Swatches for Related Products */}
                      {relatedProduct.variants && relatedProduct.variants.length > 1 && (
                        <div className="flex items-center space-x-1">
                          {relatedProduct.variants.slice(0, 4).map((variant: ProductVariant, index: number) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${getSwatchColor(variant.material || variant.name || '')} shadow-sm`}
                              title={variant.material || variant.name}
                            />
                          ))}
                          {relatedProduct.variants.length > 4 && (
                            <span className="text-xs text-gray-400 ml-1">
                              +{relatedProduct.variants.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>

          {/* View All Products Link */}
          <div className="text-center mt-12">
            <Link
              href="/sibast"
              className="inline-block bg-amber-600 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-amber-700 transition-colors"
            >
              {t('product.viewAll.sibast')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
