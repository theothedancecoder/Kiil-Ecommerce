"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductionImage from "@/components/ProductionImage";
import AddToCartWithQuantity from "@/components/AddToCartWithQuantity";

interface ProductVariant {
  name: string;
  image: string;
  color?: string;
  material?: string;
  size?: string;
  price: number;
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
  lifestyleImages?: string[];
  relatedProducts?: { id: string; name: string; slug?: string; price?: number; variants?: ProductVariant[] }[];
}

interface VitraProductClientProps {
  product: Product;
  products: { id: string; name: string; slug?: string }[];
}

export default function VitraProductClient({ product, products }: VitraProductClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <ProductionImage
                src={selectedVariant.image}
                alt={`${product.name} - ${selectedVariant.name}`}
                width={600}
                height={600}
                className="w-full h-full object-contain p-8"
              />
            </div>

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {product.lifestyleImages.map((img, index) => (
                  <div key={index} className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <ProductionImage
                      src={img}
                      alt={`${product.name} lifestyle ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif text-stone-800 mb-2">{product.name}</h1>
              <p className="text-stone-600">{product.category}</p>
            </div>

            <div className="text-3xl font-medium text-stone-900">
              kr {selectedVariant.price.toLocaleString()}
            </div>

            <p className="text-stone-600 leading-relaxed">{product.description}</p>

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-stone-700">
                  Select Variant
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        selectedVariant.name === variant.name
                          ? "border-stone-800 bg-stone-50"
                          : "border-gray-200 hover:border-stone-400"
                      }`}
                    >
                      <div className="font-medium text-stone-800">{variant.name}</div>
                      {variant.price !== product.price && (
                        <div className="text-sm text-stone-600 mt-1">
                          kr {variant.price.toLocaleString()}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartWithQuantity
              product={{
                _id: product.id,
                name: `${product.name} - ${selectedVariant.name}`,
                price: selectedVariant.price,
                currency: "NOK",
                image: selectedVariant.image,
              }}
            />

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-stone-800 mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">✓</span>
                      <span className="text-stone-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-stone-800 mb-4">Specifications</h3>
                <dl className="grid grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index}>
                      <dt className="text-sm text-stone-500">{spec.label}</dt>
                      <dd className="text-sm font-medium text-stone-800 mt-1">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-serif text-stone-800 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/vitra/${related.slug || related.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-50 relative overflow-hidden">
                      {related.variants && related.variants.length > 0 && (
                        <ProductionImage
                          src={related.variants[0].image}
                          alt={related.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                        {related.name}
                      </h3>
                      {related.price && (
                        <p className="text-stone-600 mt-1">kr {related.price.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
