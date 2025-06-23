"use client";

import { Product, ALL_CATEGORIES_QUERYResult } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";
import { Menu } from "lucide-react";
import { useState } from "react";

interface ProductsViewProps {
  products: Product[];
  categories: ALL_CATEGORIES_QUERYResult;
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mobile Category Button - Only visible on mobile phones */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setShowMobileCategories(!showMobileCategories)}
          className="flex items-center space-x-2 luxury-button w-full justify-center"
        >
          <Menu className="w-5 h-5" />
          <span>Categories</span>
        </button>
      </div>

      {/* Mobile Categories Sidebar - Only shown when toggled on mobile */}
      {showMobileCategories && (
        <div className="sm:hidden mb-4">
          <div className="luxury-card p-4">
            <h3 className="font-serif text-xl text-primary mb-4">Categories</h3>
            <CategorySelectorComponent categories={categories} />
          </div>
        </div>
      )}

      {/* Products Grid - Full width on iPad and Desktop */}
      <div className="w-full">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductsView;
