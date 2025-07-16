"use client";

import { Product } from "@/sanity.types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductGrid from "./ProductGrid";

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

function ProductsView({ products, categories }: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();

    const handleCategoryClick = (category: Category) => {
    // If the category is "CARTEL" (misspelled Kartell), redirect to our Kartell page
    if (category.title.toUpperCase() === "CARTEL") {
      router.push("/kartell");
      return;
    }
    
    // If the category is "FRITZ HANSEN", redirect to our Fritz Hansen page
    if (category.title.toUpperCase() === "FRITZ HANSEN") {
      router.push("/fritz-hansen");
      return;
    }
    
    // If the category is "CABINET", redirect to our Montana page
    if (category.title.toUpperCase() === "CABINET") {
      router.push("/montana");
      return;
    }
    
    // If the category is "VITRA", redirect to our Vitra page
    if (category.title.toUpperCase() === "VITRA") {
      router.push("/vitra");
      return;
    }
    
    // If the category is "LOUIS POULSEN", redirect to our Louis Poulsen page
    if (category.title.toUpperCase() === "LOUIS POULSEN") {
      router.push("/louis-poulsen");
      return;
    }

    // If the category is "HAY", redirect to our DUX page
    if (category.title.toUpperCase() === "HAY") {
      router.push("/dux");
      return;
    }
    
    // If the category is "SPEIL" (mirrors), redirect to our Umage page
    if (category.title.toUpperCase() === "SPEIL") {
      router.push("/umage");
      return;
    }
    
    // Otherwise, filter products normally
    setSelectedCategory(category._id);
  };

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => 
        product.categories?.some(cat => cat._ref === selectedCategory)
      );

  return (
    <div className="bg-white">
      {/* Category Filter */}
      {categories && categories.length > 0 && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === "all"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
                style={{
                  borderRadius: '2px',
                  letterSpacing: '0.025em'
                }}
              >
                ALL PRODUCTS
              </button>
              {categories
                .sort((a, b) => {
                  // Move CABINET to the end
                  if (a.title.toUpperCase() === "CABINET") return 1;
                  if (b.title.toUpperCase() === "CABINET") return -1;
                  return 0;
                })
                .map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category._id
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                  style={{
                    borderRadius: '2px',
                    letterSpacing: '0.025em'
                  }}
                >
                  {/* Display custom names for better UX */}
                  {category.title.toUpperCase() === "CARTEL" ? "KARTELL" : 
                   category.title.toUpperCase() === "SPEIL" ? "UMAGE" : 
                   category.title.toUpperCase() === "CABINET" ? "MONTANA" :
                   category.title.toUpperCase() === "HAY" ? "DUX" :
                   category.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white">ti
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default ProductsView;
