"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
}

const products: Product[] = [
  {
    id: "a-conversation-piece-dining-chair",
    name: "A Conversation Piece Dining Chair",
    description: "An elegant dining chair that combines comfort with sophisticated design.",
    price: 7499,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/A-Conversation-Piece/umage_packshoA Conversation Piece dining chair 7,499 krt_5589c740-01_a-conversation-piece_dining-chair_oak_sugar-brown_-2_900x.webp",
        material: "Oak",
        price: 7499,
      },
    ],
    designer: "Umage Design Team",
    features: ["Premium solid wood construction", "Ergonomic design for comfort"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
  {
    id: "gather-cafe-table",
    name: "Gather Café Table",
    description: "A versatile café table that brings people together.",
    price: 8999,
    category: "Tables",
    variants: [
      {
        name: "Beige Travertine",
        image: "/umage/Gather-Café-table/ Gather Café table 8.999 kr.webp",
        material: "Travertine",
        price: 8999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Natural travertine stone top", "Elegant pedestal base"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Travertine" },
    ],
  },
  {
    id: "heiko-dining-chair",
    name: "Heiko Dining Chair",
    description: "The Heiko dining chair embodies Scandinavian simplicity and comfort.",
    price: 5999,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oak",
        image: "/umage/Heiko-dinning-chair/umage_packshot_5538_heiko_dining-chair_oak_-2_900x.webp",
        material: "Oak",
        price: 5999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Solid wood construction", "Minimalist Scandinavian design"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
];

export default function UmagePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const categories = ["All", "Dining Chairs", "Tables"];

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
              UMAGE
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Scandinavian furniture design that brings people together.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {sortedProducts.length} products
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/umage/${product.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={product.variants[0].image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-8 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="text-lg font-light text-gray-900">
                    kr {product.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
