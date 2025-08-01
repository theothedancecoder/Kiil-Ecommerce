"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
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

interface FilteredInteriorGridProps {
  filters: {
    priceRange: [number, number];
    colors: string[];
    materials: string[];
    brands: string[];
    sizes: string[];
  };
}

const mockProducts: Product[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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
    id: "10",
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

const FilteredInteriorGrid = ({ filters }: FilteredInteriorGridProps) => {
  const router = useRouter();
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

  const handleProductClick = (product: Product) => {
    router.push(product.link);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK'
    }).format(price);
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-stone-600">
          Showing {filteredProducts.length} products
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-stone-600 mb-4">No products match your filters</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-stone-800 hover:text-stone-600 underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      {product.brand}
                    </p>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: product.color.toLowerCase().includes('brown') ? '#8b4513' :
                                         product.color.toLowerCase().includes('gray') || product.color.toLowerCase().includes('grey') ? '#6b7280' :
                                         product.color.toLowerCase().includes('white') ? '#f9fafb' :
                                         product.color.toLowerCase().includes('black') ? '#1f2937' :
                                         product.color.toLowerCase().includes('multicolor') ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)' : '#9ca3af'
                        }}
                        title={product.color}
                      />
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {product.category.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FilteredInteriorGrid;
