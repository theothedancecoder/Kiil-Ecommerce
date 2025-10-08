"use client";

import InteriorFilterSidebar from "@/components/InteriorFilterSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import { useState, useEffect } from "react";

interface FilterState {
  priceRange: [number, number];
  colors: string[];
  materials: string[];
  brands: string[];
  sizes: string[];
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  color: string;
  material: string;
  brand: string;
  size: string;
  description: string;
  link: string;
  slug?: any;
  variants?: any[];
  inStock: boolean;
}

interface InteriorPageClientProps {
  products: Product[];
}

export default function InteriorPageClient({ products }: InteriorPageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    colors: [],
    materials: [],
    brands: [],
    sizes: []
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let filtered = products;

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Filter by colors
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        filters.colors.includes(product.color)
      );
    }

    // Filter by materials
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product => 
        filters.materials.includes(product.material)
      );
    }

    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // Filter by sizes
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        filters.sizes.includes(product.size)
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex gap-8">
        <InteriorFilterSidebar 
          filters={filters} 
          onFiltersChange={handleFiltersChange} 
        />
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-stone-600">
              Showing {filteredProducts.length} products
            </p>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-stone-600 mb-4">No products match your filters</p>
              <button
                onClick={() => setFilters({
                  priceRange: [0, 100000],
                  colors: [],
                  materials: [],
                  brands: [],
                  sizes: []
                })}
                className="text-sm text-stone-800 hover:text-stone-600 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div id="products" className="max-w-8xl mx-auto">
              <ProductGridWithPagination 
                products={filteredProducts as any} 
                showPrice={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
