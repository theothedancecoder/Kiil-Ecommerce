"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  name: string;
  image: string;
  price: number;
  color?: string;
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
    id: "broquaine-vase-h38",
    name: "Broquaine Vase H38 cm",
    description: "Elegant ceramic vase with distinctive textured surface and sophisticated form. The Broquaine collection represents contemporary Belgian design at its finest.",
    price: 1395,
    category: "Accessories",
    variants: [
      {
        name: "Natural",
        image: "/Serax/Broquaine-vase-H38-cm/Serax Broquaine vase H38 cm NOK  1,395  Broquaine vase H38 cm quantity 1 .webp",
        color: "Natural",
        price: 1395,
      },
    ],
    designer: "Serax Design Studio",
    features: [
      "Contemporary Belgian design",
      "Distinctive textured ceramic surface",
      "Perfect for fresh or dried flowers",
      "Sophisticated neutral color palette",
      "Handcrafted ceramic construction",
      "Versatile size for various arrangements",
      "Modern sculptural form",
      "Premium quality materials",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "High-quality ceramic" },
      { label: "Height", value: "38 cm" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Finish", value: "Textured ceramic" },
      { label: "Care", value: "Clean with damp cloth" },
      { label: "Use", value: "Decorative vase for flowers" },
      { label: "Origin", value: "Belgian design" },
    ],
  },
  {
    id: "broquaine-vase-s-h28",
    name: "Broquaine Vase S H28 cm",
    description: "Smaller version of the elegant Broquaine vase, perfect for intimate spaces and smaller floral arrangements. Features the same distinctive textured surface.",
    price: 995,
    category: "Accessories",
    variants: [
      {
        name: "Natural",
        image: "/Serax/Broquaine-vase-S-H28-cm/Broquaine vase S H28 cm kr  995.webp",
        color: "Natural",
        price: 995,
      },
    ],
    designer: "Serax Design Studio",
    features: [
      "Compact size perfect for smaller spaces",
      "Same distinctive textured surface as larger version",
      "Ideal for intimate floral arrangements",
      "Contemporary Belgian design aesthetic",
      "Handcrafted ceramic construction",
      "Neutral color complements any decor",
      "Modern sculptural form",
      "Premium quality ceramic materials",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "High-quality ceramic" },
      { label: "Height", value: "28 cm" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Finish", value: "Textured ceramic" },
      { label: "Care", value: "Clean with damp cloth" },
      { label: "Use", value: "Decorative vase for flowers" },
      { label: "Origin", value: "Belgian design" },
    ],
  },
  {
    id: "catherine-table-lamp-47",
    name: "Catherine Table Lamp 47 cm",
    description: "Sophisticated table lamp with clean lines and contemporary design. The Catherine lamp combines functionality with elegant aesthetics, perfect for modern interiors.",
    price: 4295,
    category: "Lighting",
    variants: [
      {
        name: "Black",
        image: "/Serax/Catherine-table-lamp-47-cm/Catherine table lamp 47 cm NOK  4,295  Color -  Black.webp",
        color: "Black",
        price: 4295,
      },
      {
        name: "White",
        image: "/Serax/Catherine-table-lamp-47-cm/Catherine table lamp 47 cm NOK  4,295  Color -  White.webp",
        color: "White",
        price: 4295,
      },
    ],
    designer: "Serax Design Studio",
    features: [
      "Contemporary Belgian lighting design",
      "Clean lines and minimalist aesthetic",
      "Available in classic black and white",
      "Perfect height for table and desk use",
      "High-quality construction materials",
      "Elegant proportions for modern interiors",
      "Versatile design suits various decor styles",
      "Professional lighting quality",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "Metal and fabric shade" },
      { label: "Height", value: "47 cm" },
      { label: "Color Options", value: "Black, White" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Light Source", value: "E27 bulb (not included)" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Origin", value: "Belgian design" },
    ],
  },
  {
    id: "glass-vase-wind-fire",
    name: "Glass Vase Wind & Fire",
    description: "Stunning colored glass vase with organic form inspired by natural elements. The Wind & Fire collection captures the essence of movement and energy in glass.",
    price: 1195,
    category: "Accessories",
    variants: [
      {
        name: "Blue",
        image: "/Serax/Glass-Vase-Wind-&-Fire/Glass Vase Wind & Fire Blue NOK  1,195.avif",
        color: "Blue",
        price: 1195,
      },
      {
        name: "Yellow",
        image: "/Serax/Glass-Vase-Wind-&-Fire/Glass Vase Wind & Fire Yellow NOK  1,395.avif",
        color: "Yellow",
        price: 1395,
      },
    ],
    designer: "Serax Design Studio",
    features: [
      "Stunning colored glass construction",
      "Organic form inspired by natural elements",
      "Available in vibrant blue and yellow",
      "Perfect for contemporary floral arrangements",
      "Handcrafted glass artistry",
      "Unique sculptural presence",
      "Premium quality colored glass",
      "Modern Belgian design aesthetic",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "Colored glass" },
      { label: "Color Options", value: "Blue, Yellow" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Finish", value: "Smooth colored glass" },
      { label: "Care", value: "Hand wash with care" },
      { label: "Use", value: "Decorative vase" },
      { label: "Origin", value: "Belgian design" },
    ],
  },
  {
    id: "helena-vase",
    name: "Helena Vase",
    description: "Minimalist vase with clean geometric lines and contemporary appeal. The Helena vase embodies Scandinavian-inspired design with Belgian craftsmanship.",
    price: 555,
    category: "Accessories",
    variants: [
      {
        name: "Black",
        image: "/Serax/Helena-vase/Helena vase Fromkr  555  Color -  Black.webp",
        color: "Black",
        price: 555,
      },
      {
        name: "White",
        image: "/Serax/Helena-vase/Helena vase Fromkr  555  Color -  White.webp",
        color: "White",
        price: 555,
      },
    ],
    designer: "Serax Design Studio",
    features: [
      "Minimalist geometric design",
      "Available in classic black and white",
      "Scandinavian-inspired aesthetic",
      "Perfect for modern interiors",
      "Versatile size for various arrangements",
      "Clean lines and contemporary appeal",
      "High-quality ceramic construction",
      "Affordable luxury design piece",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "Ceramic" },
      { label: "Color Options", value: "Black, White" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Finish", value: "Matte ceramic" },
      { label: "Care", value: "Clean with damp cloth" },
      { label: "Use", value: "Decorative vase" },
      { label: "Origin", value: "Belgian design" },
    ],
  },
  {
    id: "sophisticato-no-15-floor-lamp",
    name: "Sophisticato No. 15 Floor Lamp",
    description: "Striking floor lamp with contemporary design and sophisticated presence. The Sophisticato collection represents the pinnacle of Belgian lighting design.",
    price: 8100,
    category: "Lighting",
    variants: [
      {
        name: "Bluesteel",
        image: "/Serax/Sophisticato-No.-15-Floor-lamp/Sophisticato No. 15 Floor lamp, Bluesteel NOK  8,100.jpeg",
        color: "Bluesteel",
        price: 8100,
      },
    ],
    designer: "Serax Design Studio",
    features: [
      "Sophisticated contemporary floor lamp design",
      "Distinctive bluesteel finish",
      "Perfect for modern living spaces",
      "High-quality construction materials",
      "Elegant proportions and refined details",
      "Professional lighting quality",
      "Belgian design excellence",
      "Statement piece for contemporary interiors",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "Metal with bluesteel finish" },
      { label: "Color", value: "Bluesteel" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Type", value: "Floor lamp" },
      { label: "Light Source", value: "E27 bulb (not included)" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Origin", value: "Belgian design" },
    ],
  },
  {
    id: "vase-l-pure-2-pack",
    name: "Vase L Pure 2 Pack",
    description: "Set of two minimalist vases with pure, clean design. Perfect for creating coordinated displays and contemporary floral arrangements.",
    price: 695,
    category: "Accessories",
    variants: [
      {
        name: "Natural Set",
        image: "/Serax/Vase-L-Pure/Vase L Pure 2 pack kr  695.jpeg",
        color: "Natural",
        price: 695,
      },
    ],
    designer: "Serax Design Studio",
    features: [
      "Set of two coordinating vases",
      "Pure, minimalist design aesthetic",
      "Perfect for creating displays",
      "Contemporary Belgian design",
      "Versatile size for various arrangements",
      "Clean lines and modern appeal",
      "High-quality ceramic construction",
      "Excellent value as a set",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "Ceramic" },
      { label: "Quantity", value: "2 pieces" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Finish", value: "Natural ceramic" },
      { label: "Care", value: "Clean with damp cloth" },
      { label: "Use", value: "Decorative vases" },
      { label: "Origin", value: "Belgian design" },
    ],
  },
  {
    id: "vase-stoneware",
    name: "Vase Stoneware",
    description: "Colorful stoneware vase with contemporary design and vibrant color options. Perfect for adding a pop of color to modern interiors.",
    price: 490,
    category: "Accessories",
    variants: [
      {
        name: "Blue",
        image: "/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Blue.webp",
        color: "Blue",
        price: 490,
      },
      {
        name: "Green",
        image: "/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Green.jpeg",
        color: "Green",
        price: 490,
      },
      {
        name: "Light Pink",
        image: "/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Light pink.webp",
        color: "Light Pink",
        price: 490,
      },
      {
        name: "Pink",
        image: "/Serax/Vase-Stoneware/Vase Stoneware kr  490  Color -  Pink.jpeg",
        color: "Pink",
        price: 490,
      },
    ],
    designer: "Serax Design Studio",
    features: [
      "Vibrant colored stoneware construction",
      "Available in multiple color options",
      "Perfect for adding color to interiors",
      "Contemporary Belgian design",
      "Durable stoneware material",
      "Versatile size for various uses",
      "Modern aesthetic with playful colors",
      "Affordable design piece",
    ],
    specifications: [
      { label: "Designer", value: "Serax Design Studio" },
      { label: "Manufacturer", value: "Serax" },
      { label: "Material", value: "Stoneware" },
      { label: "Color Options", value: "Blue, Green, Light Pink, Pink" },
      { label: "Style", value: "Contemporary Belgian" },
      { label: "Finish", value: "Colored stoneware" },
      { label: "Care", value: "Clean with damp cloth" },
      { label: "Use", value: "Decorative vase" },
      { label: "Origin", value: "Belgian design" },
    ],
  },
];

export default function SeraxPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const categories = ["All", "Accessories", "Lighting"];

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

  // Navigation handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
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
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Serax/Glass-Vase-Wind-&-Fire/lifestyle/Ecom_B0820110_02-jpg.webp"
            alt="Serax Lifestyle"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-indigo-900/90" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-cyan-400/25 rounded-full blur-md animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-white/20">
              <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">
                SERAX
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed mb-8">
                Belgian design excellence since 1986. Discover contemporary home accessories and lighting that blend functionality with artistic expression, crafted by renowned designers and artisans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#products" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  Explore Collection
                </Link>
                <Link 
                  href="/tjenester" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-400 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-300"
                >
                  Design Consultation
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
              Discover our range of contemporary Belgian home accessories and lighting, designed to bring artistic expression and functionality to modern living spaces.
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
                        ? "bg-blue-600 text-white"
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
                {totalPages > 1 && (
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/serax/${product.id}`}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center space-x-4">
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">
                Belgian Design Excellence Since 1986
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Serax has been at the forefront of contemporary Belgian design for over three decades. 
                We collaborate with talented designers and artisans to create home accessories and lighting that blend functionality with artistic expression.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                From ceramic vases to sophisticated lighting fixtures, each Serax product represents 
                the perfect balance of contemporary design, quality craftsmanship, and Belgian creativity.
              </p>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Discover Our Heritage
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/Serax/Broquaine-vase-H38-cm/lifestyle/SeraxB7222021_2.webp"
                  alt="Serax Craftsmanship"
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
