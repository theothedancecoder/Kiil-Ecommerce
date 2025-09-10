"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRoCollectionProducts, RoCollectionProduct } from "@/sanity/lib/products/getRoCollectionProducts";
import ProductionImage from "@/components/ProductionImage";

// Static fallback data
const staticProducts = [
  {
    _id: "salon-dining-chair",
    _type: "product" as const,
    _createdAt: "",
    _updatedAt: "",
    _rev: "",
    name: "Salon Dining Chair",
    slug: { _type: "slug" as const, current: "salon-dining-chair" },
    description: "An elegant dining chair with premium leather upholstery and solid wood base options.",
    price: 22005,
    image: {
      asset: {
        _id: "",
        url: "/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp"
      }
    },
    categories: [{ _id: "", title: "Dining Chairs", slug: { _type: "slug" as const, current: "dining-chairs" } }]
  },
  {
    _id: "salon-dining-table-round-120",
    _type: "product" as const,
    _createdAt: "",
    _updatedAt: "",
    _rev: "",
    name: "Salon Dining Table Ø-120",
    slug: { _type: "slug" as const, current: "salon-dining-table-round-120" },
    description: "A beautiful round dining table perfect for intimate dining experiences.",
    price: 29940,
    image: {
      asset: {
        _id: "",
        url: "/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp"
      }
    },
    categories: [{ _id: "", title: "Dining Tables", slug: { _type: "slug" as const, current: "dining-tables" } }]
  },
  {
    _id: "salon-dining-table-round-120-extension",
    _type: "product" as const,
    _createdAt: "",
    _updatedAt: "",
    _rev: "",
    name: "Salon Dining Table with Extension Option, Ø-120",
    slug: { _type: "slug" as const, current: "salon-dining-table-round-120-extension" },
    description: "A versatile round dining table with extension capability for larger gatherings.",
    price: 29940,
    image: {
      asset: {
        _id: "",
        url: "/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp"
      }
    },
    categories: [{ _id: "", title: "Dining Tables", slug: { _type: "slug" as const, current: "dining-tables" } }]
  },
  {
    _id: "salon-dining-table-rectangular-extension",
    _type: "product" as const,
    _createdAt: "",
    _updatedAt: "",
    _rev: "",
    name: "Salon Dining Table with Extension Option",
    slug: { _type: "slug" as const, current: "salon-dining-table-rectangular-extension" },
    description: "A spacious rectangular dining table with extension capability for large gatherings.",
    price: 35190,
    image: {
      asset: {
        _id: "",
        url: "/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp"
      }
    },
    categories: [{ _id: "", title: "Dining Tables", slug: { _type: "slug" as const, current: "dining-tables" } }]
  },
  {
    _id: "extension-leaf-round-120",
    _type: "product" as const,
    _createdAt: "",
    _updatedAt: "",
    _rev: "",
    name: "Extension Leaf for Salon Dining Table Ø-120",
    slug: { _type: "slug" as const, current: "extension-leaf-round-120" },
    description: "Extension leaf accessory for the round Salon dining table.",
    price: 5130,
    image: {
      asset: {
        _id: "",
        url: "/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  5,130  Color -  Black MDF.webp"
      }
    },
    categories: [{ _id: "", title: "Accessories", slug: { _type: "slug" as const, current: "accessories" } }]
  },
  {
    _id: "extension-plate-rectangular",
    _type: "product" as const,
    _createdAt: "",
    _updatedAt: "",
    _rev: "",
    name: "Extension Plate for Salon Dining Table",
    slug: { _type: "slug" as const, current: "extension-plate-rectangular" },
    description: "Extension plate accessory for the rectangular Salon dining table.",
    price: 5130,
    image: {
      asset: {
        _id: "",
        url: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x90 50x100 50x90 Color -  Black MDF.webp"
      }
    },
    categories: [{ _id: "", title: "Accessories", slug: { _type: "slug" as const, current: "accessories" } }]
  }
] as RoCollectionProduct[];

export default function ROCollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<RoCollectionProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productsPerPage = 15;

  const categories = ["All", "Dining Chairs", "Dining Tables", "Accessories"];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const roProducts = await getRoCollectionProducts();
        // Use Sanity data if available, otherwise fall back to static data
        setProducts(roProducts.length > 0 ? roProducts : staticProducts);
      } catch (err) {
        console.warn("Failed to load products from Sanity, using static data:", err);
        // Fall back to static data if Sanity fails
        setProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    selectedCategory === "All" || product.categories?.some(cat => cat.title === selectedCategory)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return (a.name ?? "").localeCompare(b.name ?? "");
    } else if (sortBy === "price") {
      return (a.price ?? 0) - (b.price ?? 0);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Homepage */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-stone-600 hover:text-stone-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="/Ro-Collection/lifestyle/Gal_2_724663c2-5a86-4611-8289-baf4b34e6c5e.webp"
          alt="RO Collection"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-800/40 to-stone-700/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-12 py-8 rounded-2xl shadow-lg">
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
                RO COLLECTION
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Contemporary Scandinavian furniture design with timeless elegance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
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
              {totalPages > 1 && (
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <Link
              key={product._id}
              href={`/ro-collection/${product.slug?.current}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-square bg-gray-50">
                  {(product.image?.asset?.url || (product as any).imagePath) ? (
                    <ProductionImage
                      src={product.image?.asset?.url || (product as any).imagePath}
                      alt={product.name ?? "RO Collection product"}
                      fill
                      className="object-contain object-center p-8 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="text-lg font-light text-gray-900">
                    kr {product.price?.toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    currentPage === page
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              <span>Next</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
