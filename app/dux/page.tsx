"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getDuxProducts, DuxProduct } from "@/sanity/lib/products/getDuxProducts";
import ProductionImage from "@/components/ProductionImage";
import Header from "@/components/Header";

export default function DuxPage() {
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<DuxProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productsPerPage = 20;

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const fetchedProducts = await getDuxProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching Dux products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-light text-gray-600 mb-4">Loading DUX Collection...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-red-600">
          <div className="text-xl font-medium mb-2">Error Loading Products</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (product) => filterBy === "all" || product.subcategory === filterBy
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") return (a.price ?? 0) - (b.price ?? 0);
    if (sortBy === "name") return (a.name ?? "").localeCompare(b.name ?? "");
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleFilterChange = (newFilter: string) => {
    setFilterBy(newFilter);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation and Cart */}
      <Header />
      
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

      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">DUX Collection</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover our elegant and functional furniture pieces from DUX.
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <select
                value={filterBy}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <option value="all">All Categories</option>
                <option value="tables">Tables</option>
                <option value="chairs">Chairs</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-stone-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <Link
                key={product._id}
                href={`/dux/${product.slug?.current}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {product.image?.asset?.url ? (
                      <ProductionImage
                        src={product.image.asset.url}
                        alt={product.name || "DUX product"}
                        fill
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-300 p-4"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-stone-100 px-2 py-1 rounded-full text-xs text-stone-600">
                      {product.subcategory || "DUX"}
                    </div>
                  </div>

                  {product.variants && product.variants.length > 1 && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex space-x-1">
                        {product.variants.slice(0, 4).map((variant, index) => {
                          const getVariantColor = (color: string) => {
                            const colorMap: { [key: string]: string } = {
                              White: "#FFFFFF",
                              Black: "#000000",
                              Brown: "#8B4513",
                              Camel: "#C8A882",
                              Perle: "#F5F5DC",
                              Truffle: "#8B4513",
                              Cognac: "#A0522D",
                              Ash: "#D2B48C",
                              Oak: "#DEB887",
                              Walnut: "#8B4513",
                              Grey: "#8B8680",
                              "Off-white": "#F5F5F0",
                              Cork: "#D2B48C",
                              Drake: "#4A4A4A",
                              Mohawi: "#8B7355",
                            };
                            return colorMap[color] || "#D1D5DB";
                          };

                          const backgroundColor = getVariantColor(variant.color || "");

                          return (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor }}
                              title={variant.name}
                            />
                          );
                        })}
                        {product.variants.length > 4 && (
                          <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">+</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-tight text-center">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-900 font-medium">
                        kr {product.price?.toLocaleString() || "N/A"}
                      </span>
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        {product.variants?.length || 0} variant
                        {(product.variants?.length || 0) !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-stone-800 text-white hover:bg-stone-700"
                }`}
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? "bg-stone-800 text-white"
                          : "bg-gray-100 text-stone-600 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-stone-800 text-white hover:bg-stone-700"
                }`}
              >
                Next
                <svg
                  className="w-5 h-5 ml-2"
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
      </section>

      {/* About DUX Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <div>
          <h2 className="text-3xl font-serif text-stone-800 mb-6">About DUX</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            DUX is a renowned Swedish furniture brand known for its elegant and functional designs. 
            Since 1926, DUX has been creating furniture that combines exceptional craftsmanship with modern aesthetics to create timeless pieces.
          </p>
          <p className="text-stone-600 leading-relaxed mb-8">
            Our collection features iconic designs from legendary designers like Bruno Mathsson, alongside contemporary pieces from the DUX Design Team. Each piece is made to order with meticulous attention to detail.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span className="text-stone-600">Made to order - Premium quality furniture</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span className="text-stone-600">Iconic designs by Bruno Mathsson and DUX Design Team</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span className="text-stone-600">Swedish craftsmanship since 1926</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span className="text-stone-600">Premium materials: leather, linen, nanolaminate, solid wood</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span className="text-stone-600">Delivery: 8-12 weeks (varies by product)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif mb-6">Discover Timeless Furniture</h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Find your perfect piece from the DUX collection and elevate your home with style and comfort.
          </p>
          <Link
            href="/book-consultation"
            className="inline-block bg-white text-stone-800 px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors"
          >
            Book a Design Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
