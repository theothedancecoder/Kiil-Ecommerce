"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { allProducts, StaticProduct } from "@/lib/allProducts";
import { formatCurrency } from "@/lib/formatCurrency";

type FilterCategory = "all" | "sofa" | "chairs" | "tables" | "benches" | "footstools" | "storage";

export default function MoblerPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 4 rows × 3 columns = 12 products per page
  
  const allProductsData = allProducts;

  // Filter products based on category only
  const filteredProducts = useMemo(() => {
    const furnitureProducts = allProductsData.filter((product: StaticProduct) => {
      // Include EILERSEN brand products explicitly
      if (product.brand === 'EILERSEN') {
        return true;
      }

      // Include RO Collection products explicitly
      if (product.brand === 'RO Collection') {
        return true;
      }

      // Exclude Sibast Furniture products to avoid duplication
      if (product.brand === 'Sibast Furniture') {
        return false;
      }

      return (
        product.category === 'Seating' || 
        product.category === 'Chair' ||
        product.category === 'Sofa' ||
        product.category === 'Tables' ||
        product.category === 'Furniture' ||
        product.category === 'Storage' ||
        product.category === 'Desks' ||
        product.category === 'Footstools' ||
        product.category === 'Benches' ||
        product.name.toLowerCase().includes('sofa') ||
        product.name.toLowerCase().includes('chair') ||
        product.name.toLowerCase().includes('table') ||
        product.name.toLowerCase().includes('bench') ||
        product.name.toLowerCase().includes('stool') ||
        product.name.toLowerCase().includes('footstool') ||
        product.name.toLowerCase().includes('puff')
      );
    });


    if (selectedCategory === 'all') {
      return furnitureProducts;
    }

    switch (selectedCategory) {
      case 'sofa':
        return furnitureProducts.filter((product: StaticProduct) => 
          product.category === 'Sofa' ||
          product.name.toLowerCase().includes('sofa') ||
          (product.name.toLowerCase().includes('lounge') && 
           !product.name.toLowerCase().includes('table') && 
           !product.name.toLowerCase().includes('chair') &&
           !product.name.toLowerCase().includes('stool') &&
           !product.name.toLowerCase().includes('bench')) ||
          product.name.toLowerCase().includes('chaise') ||
          (product.name.toLowerCase().includes('seater') && !product.name.toLowerCase().includes('chair'))
        );
      case 'chairs':
        return furnitureProducts.filter((product: StaticProduct) => 
          (product.category === 'Seating' || product.category === 'Chair') && 
          (product.name.toLowerCase().includes('chair') ||
           product.name.toLowerCase().includes('stool') ||
           product.name.toLowerCase().includes('bench') ||
           product.id === 'umage-lounge-around-shuffle-puff' ||
           product.id === 'dux-jetson-classic-soft-88' ||
           product.id === 'dux-superspider-sheepskin' ||
           product.id === 'soren-lund-sl409-swivel-chair' ||
           product.id === 'soren-lund-sl330-1-adjustable-armchair')
        );
      case 'tables':
        return furnitureProducts.filter((product: StaticProduct) => 
          product.category === 'Tables' ||
          product.category === 'Desks' ||
          product.name.toLowerCase().includes('table') ||
          product.name.toLowerCase().includes('desk')
        );
      case 'benches':
        return furnitureProducts.filter((product: StaticProduct) => 
          product.category === 'Benches' ||
          (product.name.toLowerCase().includes('bench') ||
           product.name.toLowerCase().includes('ottoman') ||
           product.name.toLowerCase().includes('puff')) &&
          product.id !== 'umage-lounge-around-shuffle-puff'
        );
      case 'footstools':
        return furnitureProducts.filter((product: StaticProduct) => 
          product.category === 'Footstools' ||
          product.name.toLowerCase().includes('footstool') ||
          (product.name.toLowerCase().includes('puff') && 
           product.id !== 'umage-lounge-around-shuffle-puff')
        );
      case 'storage':
        return furnitureProducts.filter((product: StaticProduct) => 
          product.category === 'Storage' ||
          product.name.toLowerCase().includes('storage') ||
          product.name.toLowerCase().includes('componibili') ||
          product.name.toLowerCase().includes('shelf') ||
          product.name.toLowerCase().includes('cabinet')
        );
      default:
        return furnitureProducts;
    }
  }, [selectedCategory, allProductsData]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Category counts
    const categories = [
      { 
        id: 'all' as FilterCategory, 
        name: 'Alle møbler', 
        count: allProductsData.filter((p: StaticProduct) => {
          // Include EILERSEN brand products explicitly
          if (p.brand === 'EILERSEN') {
            return true;
          }
          // Include RO Collection products explicitly
          if (p.brand === 'RO Collection') {
            return true;
          }
          return (
            p.category === 'Seating' || 
            p.category === 'Chair' ||
            p.category === 'Sofa' ||
            p.category === 'Tables' ||
            p.category === 'Furniture' ||
            p.category === 'Storage' ||
            p.category === 'Desks' ||
            p.category === 'Footstools' ||
            p.category === 'Benches' ||
            p.name.toLowerCase().includes('sofa') ||
            p.name.toLowerCase().includes('chair') ||
            p.name.toLowerCase().includes('table') ||
            p.name.toLowerCase().includes('bench') ||
            p.name.toLowerCase().includes('stool') ||
            p.name.toLowerCase().includes('footstool') ||
            p.name.toLowerCase().includes('puff')
          );
        }).length 
      },
      { 
        id: 'sofa' as FilterCategory, 
        name: 'Sofa', 
        count: allProductsData.filter((p: StaticProduct) => {
          // Include EILERSEN brand products explicitly
          if (p.brand === 'EILERSEN') {
            return true;
          }
          // Include RO Collection products explicitly
          if (p.brand === 'RO Collection') {
            return true;
          }
          return (
            p.category === 'Sofa' ||
            p.name.toLowerCase().includes('sofa') || 
            (p.name.toLowerCase().includes('lounge') && 
             !p.name.toLowerCase().includes('table') && 
             !p.name.toLowerCase().includes('chair') &&
             !p.name.toLowerCase().includes('stool') &&
             !p.name.toLowerCase().includes('bench')) ||
            p.name.toLowerCase().includes('chaise') ||
            (p.name.toLowerCase().includes('seater') && !p.name.toLowerCase().includes('chair'))
          );
        }).length 
      },
      { 
        id: 'chairs' as FilterCategory, 
        name: 'Stoler', 
        count: allProductsData.filter((p: StaticProduct) => {
          // Include EILERSEN brand products explicitly
          if (p.brand === 'EILERSEN') {
            return true;
          }
          // Include RO Collection products explicitly
          if (p.brand === 'RO Collection') {
            return true;
          }
          return (
            (p.category === 'Seating' || p.category === 'Chair' || p.category === 'Sofa') && 
            (p.name.toLowerCase().includes('chair') || 
             p.name.toLowerCase().includes('stool') ||
             p.id === 'umage-lounge-around-shuffle-puff' ||
             p.id === 'dux-jetson-classic-soft-88' ||
             p.id === 'dux-superspider-sheepskin' ||
             p.id === 'soren-lund-sl409-swivel-chair' ||
             p.id === 'soren-lund-sl330-1-adjustable-armchair')
          );
        }).length 
      },
      { 
        id: 'tables' as FilterCategory, 
        name: 'Bord', 
        count: allProductsData.filter((p: StaticProduct) => {
          // Include EILERSEN brand products explicitly
          if (p.brand === 'EILERSEN') {
            return true;
          }
          // Include RO Collection products explicitly
          if (p.brand === 'RO Collection') {
            return true;
          }
          return (
            p.category === 'Tables' ||
            p.category === 'Desks' ||
            p.name.toLowerCase().includes('table') ||
            p.name.toLowerCase().includes('desk')
          );
        }).length 
      },
      { 
        id: 'benches' as FilterCategory, 
        name: 'Benker', 
        count: allProductsData.filter((p: StaticProduct) => {
          // Include EILERSEN brand products explicitly
          if (p.brand === 'EILERSEN') {
            return true;
          }
          // Include RO Collection products explicitly
          if (p.brand === 'RO Collection') {
            return true;
          }
          return (
            p.category === 'Benches' ||
            (p.name.toLowerCase().includes('bench') ||
             p.name.toLowerCase().includes('ottoman') ||
             p.name.toLowerCase().includes('puff')) &&
            p.id !== 'umage-lounge-around-shuffle-puff'
          );
        }).length 
      },
      { 
        id: 'footstools' as FilterCategory, 
        name: 'Fotskamler', 
        count: allProductsData.filter((p: StaticProduct) => {
          // Include EILERSEN brand products explicitly
          if (p.brand === 'EILERSEN') {
            return true;
          }
          // Include RO Collection products explicitly
          if (p.brand === 'RO Collection') {
            return true;
          }
          return (
            p.category === 'Footstools' ||
            p.name.toLowerCase().includes('footstool') ||
            (p.name.toLowerCase().includes('puff') && 
             p.id !== 'umage-lounge-around-shuffle-puff')
          );
        }).length 
      },
      { 
        id: 'storage' as FilterCategory, 
        name: 'Oppbevaring', 
        count: allProductsData.filter((p: StaticProduct) => {
          // Include EILERSEN brand products explicitly
          if (p.brand === 'EILERSEN') {
            return true;
          }
          // Include RO Collection products explicitly
          if (p.brand === 'RO Collection') {
            return true;
          }
          return (
            p.category === 'Storage' ||
            p.name.toLowerCase().includes('storage') ||
            p.name.toLowerCase().includes('componibili') ||
            p.name.toLowerCase().includes('shelf') ||
            p.name.toLowerCase().includes('cabinet')
          );
        }).length
      }
    ];

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
            Tilbake til forsiden
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/HAY/Kofi-coffee-table-60×60/Kofi coffee table 60×60, H-36 NOK  6,099  Variants -  Clear glass Clear glass Grooved glass Color -  Black lacquered oak.jpg"
            alt="Møbler Lifestyle"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-red-50/90" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-red-400/25 rounded-full blur-md animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-white/20">
              <h1 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
                Møbler
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Utforsk vår komplette møbelkolleksjon. Fra klassiske design til moderne innovasjoner - møbler som skaper atmosfære og komfort i ditt hjem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#products" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-300"
                >
                  Utforsk kolleksjonen
                </Link>
                <Link 
                  href="/tjenester" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-amber-600 text-amber-700 font-medium hover:bg-amber-600 hover:text-white transition-colors duration-300"
                >
                  Møbelrådgivning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Vår kolleksjon
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Opdag vårt utvalg av møbler fra verdens ledende designmerker. Hver piece er nøye utvalgt for kvalitet, design og håndverk.
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
                  {filteredProducts.length} produkter
                </span>
                {totalPages > 1 && (
                  <span className="text-sm text-gray-500">
                    Side {currentPage} av {totalPages}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product: StaticProduct) => (
              <Link
                key={product.id}
                href={product.href}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-light text-gray-900">
                        {formatCurrency(product.price)}
                      </div>
                      {product.variants && product.variants.length > 1 && (
                        <span className="text-xs text-gray-500">
                          {product.variants.length} varianter
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No products message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Ingen produkter funnet i denne kategorien.
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
                Forrige
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
                Neste
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">
                Kvalitetsmøbler fra verdens beste designere
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Vi samarbeider med de mest anerkjente møbelprodusentene og designerne i verden. 
                Fra skandinavisk minimalisme til italiensk eleganse - hver piece i vår kolleksjon 
                representerer det beste innen design og håndverk.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Våre møbler kommer fra merker som HAY, Fritz Hansen, Vitra, UMAGE og mange flere. 
                Hver produsent er valgt for sin dedikasjon til kvalitet, bærekraft og tidløst design.
              </p>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-300"
              >
                Møt våre eksperter
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/Fritz Hansen/Series-7™-3107-chair/Series 7™ 3107 chair front upholstered with chrome legs NOK  10,999  Color -  Oak veneer:Hallingdal 65 Light Grey 103.png"
                  alt="Møbler Håndverk"
                  fill
                  className="object-contain object-center"
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
