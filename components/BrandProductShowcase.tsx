"use client";

import ProductionImage from "@/components/ProductionImage";
import Link from "next/link";
import { imageUrl } from "@/lib/ImageUrl";

// Define the type for products with populated categories
interface ProductWithCategories {
  _id: string;
  name?: string;
  slug?: {
    current?: string;
  };
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    media?: unknown;
    hotspot?: any;
    crop?: any;
    _type: "image";
  };
  description?: string; // Simplified for display
  price?: number;
  categories?: Array<{
    _id: string;
    title?: string;
    slug?: {
      current?: string;
    };
  }>;
  stock?: number;
}

interface BrandProductShowcaseProps {
  products: ProductWithCategories[];
}

// Define the brands we want to showcase
const FEATURED_BRANDS = [
  { name: "Fritz Hansen", slug: "fritz-hansen" },
  { name: "Kartell", slug: "kartell" },
  { name: "Montana", slug: "montana" },
  { name: "Vitra", slug: "vitra" },
  { name: "Louis Poulsen", slug: "louis-poulsen" },
  { name: "DUX", slug: "dux" },
  { name: "Umage", slug: "umage" },
  { name: "Fredericia", slug: "fredericia" },
  { name: "Soren Lund", slug: "soren-lund" }
];

function BrandProductShowcase({ products }: BrandProductShowcaseProps) {
  // Function to get products for a specific brand
  const getProductsForBrand = (brandName: string): ProductWithCategories[] => {
    const brandProducts = products.filter(product => {
      // Check if product has categories and match brand names
      if (!product.categories) return false;
      
      return product.categories.some(category => {
        const categoryTitle = category.title?.toUpperCase() || '';
        const brandUpper = brandName.toUpperCase();
        
        // Handle special mappings
        if (brandUpper === "KARTELL" && categoryTitle === "CARTEL") return true;
        if (brandUpper === "MONTANA" && categoryTitle === "CABINET") return true;
        if (brandUpper === "DUX" && categoryTitle === "HAY") return true;
        if (brandUpper === "UMAGE" && categoryTitle === "SPEIL") return true;
        if (brandUpper === "FREDERICIA" && categoryTitle === "DESIGNERS GUILD") return true;
        
        return categoryTitle === brandUpper || categoryTitle.includes(brandUpper);
      });
    });
    
    // Return first 2 products for this brand
    return brandProducts.slice(0, 2);
  };

  // Helper function to extract text from description
  const getDescriptionText = (description: any): string => {
    if (!description || !Array.isArray(description)) return '';
    
    return description
      .filter(block => block._type === 'block')
      .map(block => 
        block.children
          ?.filter((child: any) => child._type === 'span')
          ?.map((child: any) => child.text)
          ?.join('') || ''
      )
      .join(' ')
      .slice(0, 100) + (description.length > 100 ? '...' : '');
  };

  return (
    <div className="space-y-16">
      {FEATURED_BRANDS.map((brand) => {
        const brandProducts = getProductsForBrand(brand.name);
        
        // Only show brands that have products
        if (brandProducts.length === 0) return null;
        
        return (
          <div key={brand.slug} className="space-y-8">
            {/* Brand Header */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-serif text-stone-800 mb-2">
                {brand.name}
              </h3>
              <div className="w-24 h-px bg-stone-300 mx-auto"></div>
            </div>
            
            {/* Products Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {brandProducts.map((product) => (
                <Link 
                  key={product._id} 
                  href={`/${brand.slug}/${product.slug?.current}`}
                  className="group"
                >
                  <div className="bg-white border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Product Image */}
                    <div className="relative h-80 bg-stone-50">
                      {product.image ? (
                        <ProductionImage
                          src={imageUrl(product.image).url()}
                          alt={product.name || 'Product'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-100">
                          <div className="text-center text-stone-400">
                            <div className="text-4xl mb-2">🖼️</div>
                            <p className="text-sm">No image available</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6">
                      <h4 className="text-lg font-medium text-stone-800 mb-2 group-hover:text-stone-600 transition-colors">
                        {product.name}
                      </h4>
                      {product.description && (
                        <p className="text-stone-600 text-sm line-clamp-2 mb-4">
                          {getDescriptionText(product.description)}
                        </p>
                      )}
                      {product.price && (
                        <p className="text-stone-800 font-medium">
                          {product.price.toLocaleString('no-NO')} kr
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BrandProductShowcase;
