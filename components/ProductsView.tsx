"use client";

import { Product } from "@/sanity.types";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import ProductGridWithPagination from "./ProductGridWithPagination";
import { allProducts, getAllBrands, StaticProduct } from "@/lib/allProducts";

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

// Extended Product type to include static product fields
type ExtendedProduct = Product & {
  staticProduct?: boolean;
  staticHref?: string;
  staticImage?: string;
  staticBrand?: string;
  staticCategory?: string;
  staticVariants?: any[];
};

// Convert static products to match Sanity product format for display
const convertStaticProductToSanityFormat = (staticProduct: StaticProduct): ExtendedProduct => {
  return {
    _id: staticProduct.id,
    _type: 'product',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _rev: '',
    name: staticProduct.name,
    description: [
      {
        _type: 'block',
        _key: 'description',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span',
            text: staticProduct.description,
            marks: []
          }
        ]
      }
    ],
    price: staticProduct.price,
    image: {
      _type: 'image',
      asset: {
        _ref: staticProduct.image,
        _type: 'reference'
      }
    },
    slug: {
      _type: 'slug',
      current: staticProduct.href.replace('/', '')
    },
    categories: [{
      _ref: staticProduct.brand.toLowerCase().replace(/\s+/g, '-'),
      _type: 'reference',
      _key: staticProduct.brand.toLowerCase().replace(/\s+/g, '-')
    }],
    // Add custom fields for static products
    staticProduct: true,
    staticHref: staticProduct.href,
    staticImage: staticProduct.image,
    staticBrand: staticProduct.brand,
    staticCategory: staticProduct.category,
    staticVariants: staticProduct.variants
  };
};

function ProductsView({ products, categories }: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const router = useRouter();

  // Combine Sanity products with static products
  const combinedProducts = useMemo(() => {
    try {
      const staticProductsConverted = allProducts.map(convertStaticProductToSanityFormat);
      return [...products, ...staticProductsConverted] as ExtendedProduct[];
    } catch (error) {
      console.error('Error combining products:', error);
      return products as ExtendedProduct[];
    }
  }, [products]);

  // Create combined categories including static product brands
  const combinedCategories = useMemo(() => {
    try {
      const staticBrands = getAllBrands();
      const staticCategories = staticBrands.map(brand => ({
        _id: brand.toLowerCase().replace(/\s+/g, '-'),
        title: brand.toUpperCase(),
        slug: {
          current: brand.toLowerCase().replace(/\s+/g, '-')
        }
      }));
      
      // Merge with existing categories, avoiding duplicates
      const existingTitles = categories.map(cat => cat.title?.toUpperCase() || '');
      const newCategories = staticCategories.filter(cat => 
        !existingTitles.includes(cat.title)
      );
      
      return [...categories, ...newCategories];
    } catch (error) {
      console.error('Error combining categories:', error);
      return categories;
    }
  }, [categories]);

  const handleCategoryClick = useCallback((category: Category) => {
    // Handle brand redirections
    const brandRedirects: { [key: string]: string } = {
      "CARTEL": "/kartell",
      "KARTELL": "/kartell",
      "FRITZ HANSEN": "/fritz-hansen",
      "CABINET": "/montana",
      "MONTANA": "/montana",
      "VITRA": "/vitra",
      "LOUIS POULSEN": "/louis-poulsen",
      "HAY": "/hay",
      "DUX": "/dux",
      "SPEIL": "/umage",
      "UMAGE": "/umage",
      "DESIGNERS GUILD": "/fredericia",
      "FREDERICIA": "/fredericia",
      "SOREN LUND": "/soren-lund",
      "EILERSEN": "/eilersen",
      "FLOS": "/flos",
      "JUUL": "/juul",
      "&TRADITION": "/tradition",
      "MOOOI": "/moooi",
      "CLASSICON": "/classicon",
      "SKAGERAK": "/skagerak",
      "ARTWOOD": "/artwood"
    };

    const redirect = brandRedirects[category.title?.toUpperCase() || ''];
    if (redirect) {
      router.push(redirect);
      return;
    }
    
    // Otherwise, filter products normally
    setSelectedCategory(category._id);
  }, [router]);

  const filteredProducts = useMemo(() => {
    try {
      let filtered = selectedCategory === "all" 
        ? combinedProducts 
        : combinedProducts.filter(product => {
            // Handle both Sanity and static products
            if ((product as any).staticProduct) {
              const staticProd = product as any;
              return staticProd.staticBrand?.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
            }
            return product.categories?.some(cat => cat._ref === selectedCategory);
          });

      // Apply sorting
      return [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "brand":
            const brandA = (a as any).staticProduct ? (a as any).staticBrand || '' : 
              a.categories?.[0]?._ref || "";
            const brandB = (b as any).staticProduct ? (b as any).staticBrand || '' : 
              b.categories?.[0]?._ref || "";
            return brandA.localeCompare(brandB);
          
          case "category":
            const categoryA = (a as any).staticProduct ? (a as any).staticCategory || '' : 
              a.categories?.[0]?._ref || "";
            const categoryB = (b as any).staticProduct ? (b as any).staticCategory || '' : 
              b.categories?.[0]?._ref || "";
            return categoryA.localeCompare(categoryB);
          
          case "price-low":
            return (a.price || 0) - (b.price || 0);
          
          case "price-high":
            return (b.price || 0) - (a.price || 0);
          
          case "best-selling":
            // Mock best selling logic - in real app this would be based on sales data
            // For now, we'll use a stable combination of price and product ID
            const scoreA = (a.price || 0) * 0.1 + (a._id?.length % 10 || 0);
            const scoreB = (b.price || 0) * 0.1 + (b._id?.length % 10 || 0);
            return scoreB - scoreA;
          
          case "name":
          default:
            return (a.name || "").localeCompare(b.name || "");
        }
      });
    } catch (error) {
      console.error('Error filtering products:', error);
      return combinedProducts;
    }
  }, [combinedProducts, selectedCategory, sortBy]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  }, []);

  return (
    <div className="bg-white">
      {/* Filter Controls - Simplified */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Filtrer
              </button>
            </div>
            
            {/* Sort Controls */}
            <div className="flex items-center space-x-4">
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none focus:outline-none cursor-pointer"
              >
                <option value="name">Sorter etter navn</option>
                <option value="brand">Sorter etter merke</option>
                <option value="category">Sorter etter kategori</option>
                <option value="price-low">Pris: Lav til høy</option>
                <option value="price-high">Pris: Høy til lav</option>
                <option value="best-selling">Bestselgere</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGridWithPagination products={filteredProducts} showPrice={true} />

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
          <p className="text-gray-400 text-sm mt-2">Try selecting "ALL PRODUCTS" to see our complete collection.</p>
        </div>
      )}
    </div>
  );
}

export default ProductsView;
