"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  name: string;
  image: string;
  price: number;
  color: string;
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
    id: "playground-sofa",
    name: "Playground Sofa",
    description: "A comfortable and stylish sofa that combines Danish craftsmanship with modern design. The Playground sofa offers exceptional comfort and timeless elegance.",
    price: 32990,
    category: "Sofas",
    variants: [
      {
        name: "Bakar 47",
        image: "/Eilersen/Playground sofa kr 32 990  Farge - Bakar 47.jpg",
        color: "Bakar 47",
        price: 32990,
      },
      {
        name: "Tangent 16",
        image: "/Eilersen/Playground sofa kr 36 490  Farge - Tangent 16.jpg",
        color: "Tangent 16",
        price: 36490,
      },
      {
        name: "Berlin 36",
        image: "/Eilersen/Playground sofa kr 37 990  Farge - Berlin 36.jpg",
        color: "Berlin 36",
        price: 37990,
      },
      {
        name: "Bardal 110",
        image: "/Eilersen/Eilersen Playground sofa kr 39 990  Farge - Bardal 110.jpg",
        color: "Bardal 110",
        price: 39990,
      },
    ],
    designer: "Eilersen Design Team",
    features: [
      "Premium Danish craftsmanship",
      "High-quality upholstery materials",
      "Comfortable seating experience",
      "Multiple fabric options",
      "Durable construction",
      "Timeless Scandinavian design",
      "Suitable for modern living spaces",
      "Easy maintenance",
    ],
    specifications: [
      { label: "Designer", value: "Eilersen Design Team" },
      { label: "Manufacturer", value: "Eilersen" },
      { label: "Material", value: "Premium upholstery with solid wood frame" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Type", value: "Sofa" },
      { label: "Care", value: "Professional cleaning recommended" },
      { label: "Warranty", value: "5 years manufacturer warranty" },
      { label: "Origin", value: "Danish design and manufacturing" },
    ],
  },
];

export default function EilersenPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const categories = ["All", "Sofas"];

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

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Eilersen/lifestyle/10696433r_2.jpg"
            alt="Eilersen Lifestyle"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/80 via-orange-100/60 to-rose-100/80" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200/40 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-rose-200/35 rounded-full blur-md animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
                EILERSEN
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Danish furniture craftsmanship since 1895. Experience the perfect blend of comfort, quality, and timeless Scandinavian design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#products" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-300"
                >
                  Explore Collection
                </Link>
                <Link 
                  href="/tjenester" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-amber-600 text-amber-700 font-medium hover:bg-amber-50 transition-colors duration-300"
                >
                  Design Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Our Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our range of premium Danish furniture, crafted with attention to detail and designed for modern living.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border-b border-gray-200 mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-amber-600 text-white"
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/eilersen/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square bg-gray-50">
                    <Image
                      src={product.variants[0].image}
                      alt={product.name}
                      fill
                      className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
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
                      From kr {product.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6">
                Danish Heritage Since 1895
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                For over a century, Eilersen has been synonymous with exceptional Danish furniture craftsmanship. 
                Our commitment to quality, comfort, and timeless design has made us a trusted name in Scandinavian furniture.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Each piece is carefully crafted using traditional techniques combined with modern innovation, 
                ensuring furniture that not only looks beautiful but stands the test of time.
              </p>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-300"
              >
                Learn More About Our Craft
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/Eilersen/lifestyle/10696433r_2.jpg"
                  alt="Eilersen Craftsmanship"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
