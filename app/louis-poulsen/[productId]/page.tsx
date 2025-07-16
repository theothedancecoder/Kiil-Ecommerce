"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  name: string;
  image: string;
  color?: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  variants: ProductVariant[];
  designer?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  relatedProducts?: { id: string; name: string }[];
}

// Hardcoded product data for Louis Poulsen products
const products: Product[] = [
  {
    id: "aj-floor-lamp",
    name: "AJ Floor Lamp",
    description:
      "The AJ Floor Lamp is a classic design by Arne Jacobsen, featuring a distinctive asymmetrical shade that provides both direct and ambient lighting. This iconic piece combines functionality with timeless Danish design aesthetics.",
    price: 13025,
    designer: "Arne Jacobsen",
    variants: [
      {
        name: "Black",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Black.webp",
        color: "Black",
        price: 13025,
      },
      {
        name: "White",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp",
        color: "White",
        price: 13025,
      },
      {
        name: "Dusty Blue",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Dusty Blue.webp",
        color: "Dusty Blue",
        price: 13025,
      },
      {
        name: "Electric Orange",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Electric Orange.webp",
        color: "Electric Orange",
        price: 13025,
      },
      {
        name: "Soft Lemon",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Soft lemon.webp",
        color: "Soft Lemon",
        price: 13025,
      },
      {
        name: "Warm Grey",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Warm Grey.webp",
        color: "Warm Grey",
        price: 13025,
      },
      {
        name: "Warm Sand",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Warm Sand.webp",
        color: "Warm Sand",
        price: 13025,
      },
      {
        name: "Stainless Steel Polished",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 15 375  Farge - Stainless Steel Polished.webp",
        color: "Stainless Steel",
        price: 15375,
      },
    ],
    features: [
      "Adjustable shade for directional lighting",
      "Weighted base for stability",
      "Iconic Arne Jacobsen design",
      "Multiple color options available",
      "Perfect for reading and ambient lighting",
      "Timeless Danish design",
    ],
    specifications: [
      { label: "Height", value: "130 cm" },
      { label: "Shade diameter", value: "21.5 cm" },
      { label: "Base diameter", value: "29.5 cm" },
      { label: "Weight", value: "4.5 kg" },
      { label: "Material", value: "Painted steel" },
      { label: "Light source", value: "E27 LED max 15W" },
      { label: "Designer", value: "Arne Jacobsen" },
      { label: "Year", value: "1957" },
    ],
    relatedProducts: [
      { id: "aj-wall-lamp-with-cord", name: "AJ Wall Lamp with Cord" },
      { id: "aj-wall-lamp-without-cord", name: "AJ Wall Lamp without Cord" },
    ],
  },
  // Add other products similarly...
];

export default function LouisPoulsenProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;
  console.log("Received productId param:", productId);
  const product = products.find((p) => p.id === productId);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  const selectedVariant = product.variants[selectedVariantIndex];

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
                src={selectedVariant.image}
                alt={`${product.name} - ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
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
                    src={variant.image}
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
              kr {selectedVariant.price.toLocaleString()}
            </div>

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

            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {selectedVariant.price.toLocaleString()}
            </button>

            {product.features && (
              <div className="space-y-4 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Features
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.specifications && (
              <div className="space-y-4 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.relatedProducts && (
              <div className="mt-20 pt-16 border-t border-gray-200">
                <h2 className="text-2xl font-light text-gray-900 mb-4 text-center">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {product.relatedProducts.map((related) => (
                    <Link
                      key={related.id}
                      href={`/louis-poulsen/${related.id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                        <div className="relative aspect-square bg-gray-50">
                          <Image
                            src={`/Louis-Poulsen/${related.id
                              .replace(/-/g, " ")
                              .replace(/\//g, " ")}/${
                              related.name
                            }.webp`}
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
                            kr {/* Price not available here */}
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
