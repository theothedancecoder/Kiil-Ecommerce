"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getLouisPoulsenProducts, LouisPoulsenProduct } from "@/sanity/lib/products/getLouisPoulsenProducts";
import { louisPoulsenProducts } from "@/lib/louisPoulsenProducts";
import ProductionImage from "@/components/ProductionImage";
import Header from "@/components/Header";

export default function LouisPoulsenPage() {
  const [products, setProducts] = useState<LouisPoulsenProduct[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 12; // 4 rows × 3 columns = 12 products per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const productsData = await getLouisPoulsenProducts();
        
        // If no Sanity products, fall back to static products
        if (productsData.length === 0) {
          console.log("No Sanity products found, using static Louis Poulsen products");
          // Convert static products to match Sanity interface
          const staticProducts = louisPoulsenProducts.map(product => ({
            ...product,
            _type: "product",
            _createdAt: new Date().toISOString(),
            _updatedAt: new Date().toISOString(),
            _rev: "1",
            slug: {
              _type: "slug" as const,
              current: product.href.replace("/louis-poulsen/", "")
            },
            image: product.image ? {
              asset: {
                _id: product._id + "-image",
                url: product.image
              }
            } : undefined,
            categories: [{
              _id: "lighting-category",
              title: product.category,
              slug: {
                _type: "slug" as const,
                current: product.category.toLowerCase()
              }
            }],
            variants: product.variants?.map(variant => ({
              _type: "variant",
              name: variant.name,
              price: variant.price,
              material: variant.material,
              color: variant.color,
              image: variant.image ? {
                asset: {
                  _id: variant.name + "-image",
                  url: variant.image
                }
              } : undefined
            }))
          }));
          setProducts(staticProducts as LouisPoulsenProduct[]);
        } else {
          setProducts(productsData);
        }
        
        // Use hardcoded categories like Serax does to avoid duplicates
        setCategories(["All", "Lighting"]);
      } catch (error) {
        console.error("Error fetching Louis Poulsen data:", error);
        // Fallback to static products if Sanity fails
        console.log("Sanity error, using static Louis Poulsen products");
        const staticProducts = louisPoulsenProducts.map(product => ({
          ...product,
          _type: "product",
          _createdAt: new Date().toISOString(),
          _updatedAt: new Date().toISOString(),
          _rev: "1",
          slug: {
            _type: "slug" as const,
            current: product.href.replace("/louis-poulsen/", "")
          },
          image: product.image ? {
            asset: {
              _id: product._id + "-image",
              url: product.image
            }
          } : undefined,
          categories: [{
            _id: "lighting-category",
            title: product.category,
            slug: {
              _type: "slug" as const,
              current: product.category.toLowerCase()
            }
          }],
          variants: product.variants?.map(variant => ({
            _type: "variant",
            name: variant.name,
            price: variant.price,
            material: variant.material,
            color: variant.color,
            image: variant.image ? {
              asset: {
                _id: variant.name + "-image",
                url: variant.image
              }
            } : undefined
          }))
        }));
        setProducts(staticProducts as LouisPoulsenProduct[]);
        setCategories(["All", "Lighting"]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory === "All") return true;
    return product.categories?.some((cat: any) => cat.title === selectedCategory);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return (a.name || "").localeCompare(b.name || "");
    } else if (sortBy === "price") {
      return (a.price || 0) - (b.price || 0);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Louis Poulsen products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation and Cart */}
      <Header />
      
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

      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Our Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our range of iconic Danish lighting designs, combining functionality with aesthetic appeal and timeless Scandinavian design principles.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border-b border-gray-200 mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-1 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-stone-600 text-white"
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
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No Louis Poulsen products found.</p>
              <p className="text-gray-400 text-sm mt-2">
                Make sure Louis Poulsen products are added to Sanity CMS and USE_SANITY_PRODUCTS=true is set.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/louis-poulsen/${product.slug?.current}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-square bg-gray-50">
                      {product.image?.asset?.url ? (
                        <ProductionImage
                          src={product.image.asset.url}
                          alt={product.name || "Louis Poulsen product"}
                          fill
                          className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="text-lg font-light text-gray-900">
                        From kr {(product.price || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

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
                    : "text-gray-700 hover:text-stone-600"
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
                        ? "bg-stone-600 text-white"
                        : "text-gray-700 hover:text-stone-600 hover:bg-stone-50"
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
                    : "text-gray-700 hover:text-stone-600"
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
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">
                Danish Design Excellence Since 1874
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Louis Poulsen has been at the forefront of Danish lighting design for over 150 years. 
                We create lighting that shapes light and enhances spaces, combining functionality with timeless aesthetic appeal.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                From iconic pendant lights to sophisticated floor lamps, each Louis Poulsen product represents 
                the perfect balance of form, function, and Danish design heritage.
              </p>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center px-8 py-3 bg-stone-600 text-white font-medium hover:bg-stone-700 transition-colors duration-300"
              >
                Discover Our Heritage
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/Louis Poulsen/PH-5-pendant/lifestyle/PH5_pendant_copper_lifestyle.webp"
                  alt="Louis Poulsen Craftsmanship"
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
