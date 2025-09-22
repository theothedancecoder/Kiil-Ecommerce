"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import AddToCartWithQuantity from "@/components/AddToCartWithQuantity";

interface ProductVariant {
  name: string;
  image: string;
  size?: string;
  price: number;
  material?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  variants: ProductVariant[];
  designer?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  relatedProducts?: { id: string; name: string }[];
  lifestyleImages?: string[];
}

interface FredericiaProductClientProps {
  product: Product;
  products: Product[];
}

export default function FredericiaProductClient({ product, products }: FredericiaProductClientProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];

  // Fallback function for missing images
  const getImageUrl = (imageUrl: string, fallbackName?: string): string => {
    if (imageUrl && imageUrl.trim() !== '') {
      return imageUrl;
    }
    
    // If no image URL, try to construct a fallback path
    if (fallbackName && product.name) {
      const productSlug = product.name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      // Map product names to their folder names
      const folderMap: { [key: string]: string } = {
        'ej-5-corona-armchair': 'corona-armchair',
        'bm71-library-table': 'bm71-library-table',
        'wegner-ox-chair': 'wegner-ox-chair',
        'delphi-elements-sofa': 'delphi-elements-sofa',
        'ej220-sofa-2-seater': 'ej220-sofa',
        'delphi-sofa-2-seater': 'delphi-sofa',
        'insula-piccolo-side-table': 'insula-piccolo-side-table',
        'mogensen-6284-dining-table': 'mogensen-dining-table',
        'mogensen-j39-dining-chair': 'mogensen-j39-dining-chair',
        'piloti-coffee-table': 'piloti-coffee-table',
        'post-dining-chair': 'post-dining-chair',
        'risom-magazine-table': 'risom-magazine-table',
        'the-canvas-chair': 'canvas-chair',
        'trinidad-chair': 'trinidad-chair',
        'wegner-j16-rocking-chair': 'wegner-j16-rocking-chair'
      };
      
      const folderName = folderMap[productSlug] || productSlug;
      
      // Determine image filename based on variant
      let imageName = 'main.jpg';
      if (fallbackName) {
        const variantLower = fallbackName.toLowerCase();
        if (variantLower.includes('soaped') || variantLower.includes('variant1')) {
          imageName = 'variant1.webp';
        } else if (variantLower.includes('black') || variantLower.includes('variant2')) {
          imageName = 'variant2.jpg';
        } else if (variantLower.includes('grey') || variantLower.includes('flint')) {
          imageName = 'variant2.jpg';
        }
      }
      
      return `/fredericia/${folderName}/${imageName}`;
    }
    
    return '/placeholder-image.jpg';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation and Cart */}
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(selectedVariant.image, selectedVariant.name)}
              alt={`${product.name} - ${selectedVariant.name}`}
              fill
              className="object-contain object-center p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Variant Thumbnails */}
          {product.variants.length > 1 && (
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
                    src={getImageUrl(variant.image, variant.name)}
                    alt={`${variant.name} variant`}
                    fill
                    className="object-contain object-center p-2"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                  <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                    {variant.material || variant.name}
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
                  <Image
                    src={getImageUrl(image)}
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
            <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
              Fredericia Collection
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
            kr {selectedVariant.price.toLocaleString()}
          </div>

          {product.variants.length > 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Material: {selectedVariant.material || selectedVariant.name}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`p-3 text-sm border rounded transition-all ${
                      selectedVariantIndex === index
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <div className="font-medium">{variant.material || variant.name}</div>
                    <div className="text-xs text-gray-500">kr {variant.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <AddToCartWithQuantity 
            product={{
              _id: product.id,
              name: product.name,
              price: selectedVariant.price,
              image: {
                _type: "image",
                asset: {
                  _ref: "temp-ref",
                  _type: "reference"
                }
              },
              slug: {
                _type: "slug",
                current: product.id
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
                  const relatedProduct = products.find(p => p.id === related.id);
                  return (
                    <Link
                      key={related.id}
                      href={`/fredericia/${related.id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                        <div className="relative aspect-square bg-gray-50">
                          {relatedProduct && (
                            <Image
                              src={relatedProduct.variants[0].image}
                              alt={related.name}
                              fill
                              className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 50vw, 25vw"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-light text-gray-900 mb-2">
                            {related.name}
                          </h3>
                          {relatedProduct && (
                            <p className="text-gray-900 font-medium">
                              kr {relatedProduct.price.toLocaleString()}
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
                  href="/fredericia"
                  className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  View All Fredericia Products
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
