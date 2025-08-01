"use client";

import NewInteriorBanner from "@/components/NewInteriorBanner";
import InteriorFilterSidebar from "@/components/InteriorFilterSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import Link from "next/link";
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
}

const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Fritz Hansen Grand Prix Chair",
    price: 8995,
    image: "/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png",
    category: "chairs",
    color: "Brown",
    material: "Wood",
    brand: "Fritz Hansen",
    size: "Medium",
    description: "Classic design chair with oak finish",
    link: "/interior/living-room/chairs"
  },
  {
    _id: "2",
    name: "Montana BUREAU Desk",
    price: 12995,
    image: "/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Flint_Suspended_Perspective.png",
    category: "desk",
    color: "Gray",
    material: "Wood",
    brand: "Montana",
    size: "Large",
    description: "Modern desk with suspended design",
    link: "/interior/home-office/desk-cabinets"
  },
  {
    _id: "3",
    name: "Kartell Componibili Storage",
    price: 2495,
    image: "/Kartell -Componibili classic 2/white.webp",
    category: "storage",
    color: "White",
    material: "Plastic",
    brand: "Kartell",
    size: "Small",
    description: "Modular storage solution",
    link: "/interior/organisation/storage"
  },
  {
    _id: "4",
    name: "Fredericia BM71 Dining Table",
    price: 25995,
    image: "/Fredericia - BM71 Library Spisebord/main.jpg",
    category: "dining-tables",
    color: "Brown",
    material: "Wood",
    brand: "Fredericia",
    size: "Large",
    description: "Elegant dining table with library design",
    link: "/interior/dining-kitchen/tables"
  },
  {
    _id: "5",
    name: "Vitra Ball Clock",
    price: 1895,
    image: "/vitra-products/ball-clock-multicolor.jpg",
    category: "home-accessories",
    color: "Multicolor",
    material: "Wood",
    brand: "Vitra",
    size: "Small",
    description: "Iconic wall clock design",
    link: "/interior/home-accessories/wall-art"
  },
  {
    _id: "6",
    name: "All Saints Mirror",
    price: 3495,
    image: "/all-saints/white.webp",
    category: "mirrors",
    color: "White",
    material: "Glass",
    brand: "All Saints",
    size: "Medium",
    description: "Contemporary wall mirror",
    link: "/interior/bathroom/mirrors"
  },
  {
    _id: "7",
    name: "Missoni Home Bath Mat",
    price: 895,
    image: "/Missoni Home - Amone Badematte/amone-bath-mat-col160.avif",
    category: "bathroom",
    color: "Multicolor",
    material: "Fabric",
    brand: "Missoni Home",
    size: "Medium",
    description: "Luxury bath mat with signature pattern",
    link: "/interior/bathroom"
  },
  {
    _id: "8",
    name: "Flos IC Lights",
    price: 4595,
    image: "/Flos IC Lights/ic-lights-t1.jpg",
    category: "lighting",
    color: "Black",
    material: "Metal",
    brand: "Flos",
    size: "Medium",
    description: "Modern pendant light design",
    link: "/interior/home-accessories/lighting"
  },
  {
    _id: "9",
    name: "Louis Poulsen Panthella",
    price: 3895,
    image: "/Louis Poulsen- Panthella 160 oppladbar/panthella-portable.jpg",
    category: "lighting",
    color: "White",
    material: "Plastic",
    brand: "Louis Poulsen",
    size: "Medium",
    description: "Portable table lamp with iconic design",
    link: "/interior/home-accessories/lighting"
  },
  {
    _id: "10",
    name: "Montana DREAM Bed",
    price: 18995,
    image: "/Montana/Montana_Collection2017_Dream_3000x3000.jpg",
    category: "bedroom",
    color: "Gray",
    material: "Wood",
    brand: "Montana",
    size: "Large",
    description: "Modern bed with integrated storage",
    link: "/interior/bedroom/beds"
  }
];

export default function InteriorPage() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000],
    colors: [],
    materials: [],
    brands: [],
    sizes: []
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  useEffect(() => {
    let filtered = mockProducts;

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
  }, [filters]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <span className="text-stone-800">Interior</span>
          </div>
        </div>
      </div>

      <NewInteriorBanner />
      
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
    </main>
  )
}
