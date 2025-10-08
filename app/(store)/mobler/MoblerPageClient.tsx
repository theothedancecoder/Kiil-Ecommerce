"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import { Product } from "@/sanity.types";
import { imageUrl } from "@/lib/ImageUrl";
import { useLanguage } from "@/lib/languageContext";

type FilterCategory = "all" | "sofa" | "chairs" | "tables" | "benches" | "footstools" | "storage";

// Helper function to safely get description text
const getDescriptionText = (description: any): string => {
  if (!description) return '';
  if (typeof description === 'string') return description;
  if (Array.isArray(description)) {
    return description
      .filter((block: any) => block._type === 'block' && block.children)
      .map((block: any) => 
        block.children
          .filter((child: any) => child._type === 'span' && child.text)
          .map((child: any) => child.text)
          .join('')
      )
      .join(' ');
  }
  return '';
};

// Helper function to determine brand path from brand name
const getBrandPath = (brand: string): string => {
  const brandMap: { [key: string]: string } = {
    'HAY': 'hay',
    'Fritz Hansen': 'fritz-hansen',
    'Kartell': 'kartell',
    'Montana': 'montana',
    'Vitra': 'vitra',
    'DUX': 'dux',
    'Eilersen': 'eilersen',
    'EILERSEN': 'eilersen',
    'Soren Lund': 'soren-lund',
    'Søren Lund': 'soren-lund',
    '&Tradition': 'tradition',
    'Audo Copenhagen': 'audo-copenhagen',
    'AUDO COPENHAGEN': 'audo-copenhagen',
    'Audo': 'audo-copenhagen',
    'RO Collection': 'ro-collection',
    'Jonas Ihreborn': 'jonas-ihreborn',
    'Fredericia': 'fredericia',
    'Sibast': 'sibast',
    'Sibast Furniture': 'sibast',
    'Serax': 'serax',
    'Flos': 'flos',
    'Louis Poulsen': 'louis-poulsen',
    'UMAGE': 'umage',
    'Crafts': 'crafts',
    'Juul': 'juul',
  };
  
  return brandMap[brand] || 'products';
};

interface MoblerPageClientProps {
  initialProducts: Product[];
}

export default function MoblerPageClient({ initialProducts }: MoblerPageClientProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 4 rows × 3 columns = 12 products per page

  // Filter products based on category only
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return initialProducts;
    }

    switch (selectedCategory) {
      case 'sofa':
        return initialProducts.filter((product: any) => {
          const name = (product.name || '').toLowerCase();
          const hasCategory = product.categories?.some((cat: any) => 
            cat && cat.title && (cat.title === 'Sofa' || cat.title === 'Seating')
          );
          return hasCategory || name.includes('sofa') || 
            (name.includes('lounge') && !name.includes('table') && !name.includes('chair')) ||
            name.includes('chaise') || (name.includes('seater') && !name.includes('chair'));
        });
      case 'chairs':
        return initialProducts.filter((product: any) => {
          const name = (product.name || '').toLowerCase();
          const hasCategory = product.categories?.some((cat: any) => 
            cat && cat.title && (cat.title === 'Seating' || cat.title === 'Chair')
          );
          return hasCategory || name.includes('chair') || name.includes('stool');
        });
      case 'tables':
        return initialProducts.filter((product: any) => {
          const name = (product.name || '').toLowerCase();
          const hasCategory = product.categories?.some((cat: any) => 
            cat && cat.title && (cat.title === 'Tables' || cat.title === 'Desks')
          );
          return hasCategory || name.includes('table') || name.includes('desk');
        });
      case 'benches':
        return initialProducts.filter((product: any) => {
          const name = (product.name || '').toLowerCase();
          const hasCategory = product.categories?.some((cat: any) => cat && cat.title && cat.title === 'Benches');
          return hasCategory || (name.includes('bench') || name.includes('ottoman'));
        });
      case 'footstools':
        return initialProducts.filter((product: any) => {
          const name = (product.name || '').toLowerCase();
          const hasCategory = product.categories?.some((cat: any) => cat && cat.title && cat.title === 'Footstools');
          return hasCategory || name.includes('footstool');
        });
      case 'storage':
        return initialProducts.filter((product: any) => {
          const name = (product.name || '').toLowerCase();
          const hasCategory = product.categories?.some((cat: any) => cat && cat.title && cat.title === 'Storage');
          return hasCategory || name.includes('storage') || name.includes('cabinet') || name.includes('shelf');
        });
      default:
        return initialProducts;
    }
  }, [selectedCategory, initialProducts]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Category counts
  const categories = useMemo(() => {
    return [
      { 
        id: 'all' as FilterCategory, 
        name: t('mobler.allFurniture'), 
        count: initialProducts.length 
      },
      { 
        id: 'sofa' as FilterCategory, 
        name: t('mobler.sofa'), 
        count: initialProducts.filter((p: any) => {
          const name = (p.name || '').toLowerCase();
          const hasCategory = p.categories?.some((cat: any) => 
            cat && cat.title && (cat.title === 'Sofa' || cat.title === 'Seating')
          );
          return hasCategory || name.includes('sofa') || 
            (name.includes('lounge') && !name.includes('table') && !name.includes('chair')) ||
            name.includes('chaise') || (name.includes('seater') && !name.includes('chair'));
        }).length 
      },
      { 
        id: 'chairs' as FilterCategory, 
        name: t('mobler.chairs'), 
        count: initialProducts.filter((p: any) => {
          const name = (p.name || '').toLowerCase();
          const hasCategory = p.categories?.some((cat: any) => 
            cat && cat.title && (cat.title === 'Seating' || cat.title === 'Chair')
          );
          return hasCategory || name.includes('chair') || name.includes('stool');
        }).length 
      },
      { 
        id: 'tables' as FilterCategory, 
        name: t('mobler.tables'), 
        count: initialProducts.filter((p: any) => {
          const name = (p.name || '').toLowerCase();
          const hasCategory = p.categories?.some((cat: any) => 
            cat && cat.title && (cat.title === 'Tables' || cat.title === 'Desks')
          );
          return hasCategory || name.includes('table') || name.includes('desk');
        }).length 
      },
      { 
        id: 'benches' as FilterCategory, 
        name: t('mobler.benches'), 
        count: initialProducts.filter((p: any) => {
          const name = (p.name || '').toLowerCase();
          const hasCategory = p.categories?.some((cat: any) => cat && cat.title && cat.title === 'Benches');
          return hasCategory || (name.includes('bench') || name.includes('ottoman'));
        }).length 
      },
      { 
        id: 'footstools' as FilterCategory, 
        name: t('mobler.footstools'), 
        count: initialProducts.filter((p: any) => {
          const name = (p.name || '').toLowerCase();
          const hasCategory = p.categories?.some((cat: any) => cat && cat.title && cat.title === 'Footstools');
          return hasCategory || name.includes('footstool');
        }).length 
      },
      { 
        id: 'storage' as FilterCategory, 
        name: t('mobler.storage'), 
        count: initialProducts.filter((p: any) => {
          const name = (p.name || '').toLowerCase();
          const hasCategory = p.categories?.some((cat: any) => cat && cat.title && cat.title === 'Storage');
          return hasCategory || name.includes('storage') || name.includes('cabinet') || name.includes('shelf');
        }).length
      }
    ];
  }, [initialProducts, t]);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: FilterCategory) => {
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

  return (
    <div className="min-h-screen bg-white">
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
            {t('mobler.backToHome')}
          </Link>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              {t('mobler.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('mobler.subtitle')}
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border-b border-gray-200 mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} {t('common.products')}
                </span>
                {totalPages > 1 && (
                  <span className="text-sm text-gray-500">
                    {t('common.page')} {currentPage} {t('common.of')} {totalPages}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product: any) => {
              const brandPath = getBrandPath(product.brand || '');
              const productSlug = product.slug?.current || product._id;
              const productHref = `/${brandPath}/${productSlug}`;
              const productImage = product.image?.asset ? imageUrl(product.image).width(600).height(600).url() : '';
              const variantCount = product.variants?.length || 0;
              
              return (
                <Link
                  key={product._id}
                  href={productHref}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-square bg-gray-50">
                      {productImage && (
                        <Image
                          src={productImage}
                          alt={product.name || 'Product'}
                          fill
                          className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-1">{product.brand || ''}</p>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {product.name || ''}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {getDescriptionText(product.description)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-light text-gray-900">
                          {formatCurrency(product.price || 0)}
                        </div>
                        {variantCount > 1 && (
                          <span className="text-xs text-gray-500">
                            {variantCount} {t('common.variants')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* No products message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {t('mobler.noProducts')}
              </p>
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
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('common.previous')}
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-amber-600 text-white"
                        : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
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
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                {t('common.next')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
