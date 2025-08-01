"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByBrand } from "@/lib/allProducts";

export default function AudoCopenhagenPage() {
  const audoProducts = getProductsByBrand("Audo Copenhagen");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(audoProducts.map(product => product.category)))];

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? audoProducts 
    : audoProducts.filter(product => product.category === selectedCategory);

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
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/lifestyle/10696988r_2.webp"
            alt="Audo Copenhagen Lifestyle"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-gray-800/70 to-stone-900/90" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-slate-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gray-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-stone-400/25 rounded-full blur-md animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-white/20">
              <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">
                Audo Copenhagen
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed mb-8">
                Danish design company founded in 2021, merging the heritage of Menu and by Lassen. We create functional design objects that embody the essence of Scandinavian aesthetics - where form follows function and beauty emerges from purpose.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#products" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-slate-600 text-white font-medium hover:bg-slate-700 transition-colors duration-300"
                >
                  Explore Collection
                </Link>
                <Link 
                  href="/tjenester" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-slate-600 text-slate-400 font-medium hover:bg-slate-600 hover:text-white transition-colors duration-300"
                >
                  Design Consultation
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
              Our Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our range of functional design objects that embody the essence of Scandinavian aesthetics, where form follows function and beauty emerges from purpose.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "All Products" : category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              // Function to get the best variant for thumbnail
              const getBestThumbnail = (product: any) => {
                if (!product.variants || product.variants.length === 0) {
                  return product.image;
                }
                
                // Priority order for finishes (most appealing first)
                const finishPriority = [
                  'Brass', 'Black', 'Chrome', 'White'
                ];
                
                // Find the best finish variant
                for (const finish of finishPriority) {
                  const variant = product.variants.find((v: any) => 
                    v.color === finish || v.name.includes(finish)
                  );
                  if (variant) {
                    return variant.image;
                  }
                }
                
                // If no priority finish found, return the first variant or default image
                return product.variants[0]?.image || product.image;
              };

              const thumbnailImage = getBestThumbnail(product);

              return (
                <Link
                  key={product.id}
                  href={product.href}
                  className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={thumbnailImage}
                      alt={product.name}
                      fill
                      className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-light text-gray-900">
                        kr {product.price.toLocaleString()}
                        {product.variants && product.variants.length > 1 && (
                          <span className="text-sm text-gray-500 ml-1">+</span>
                        )}
                      </span>
                      {product.variants && product.variants.length > 1 && (
                        <span className="text-xs text-gray-500">
                          {product.variants.length} variants
                        </span>
                      )}
                    </div>
                    
                    {/* Color Swatches */}
                    {product.variants && product.variants.length > 1 && (
                      <div className="flex items-center space-x-1">
                        {product.variants.slice(0, 4).map((variant: any, index: number) => {
                          // Color mapping for visual swatches
                          const getSwatchColor = (colorName: string) => {
                            const colorMap: { [key: string]: string } = {
                              'Brass': 'bg-yellow-600',
                              'Black': 'bg-gray-900',
                              'Chrome': 'bg-gray-400',
                              'White': 'bg-white border-2 border-gray-300',
                            };
                            return colorMap[colorName] || 'bg-gray-300';
                          };

                          return (
                            <div
                              key={index}
                              className={`w-3 h-3 rounded-full ${getSwatchColor(variant.color || variant.name)} shadow-sm`}
                              title={variant.color || variant.name}
                            />
                          );
                        })}
                        {product.variants.length > 4 && (
                          <span className="text-xs text-gray-400 ml-1">
                            +{product.variants.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">
                Functional Design Since 2021
              </h2>
              <p className="text-lg text-slate-100 leading-relaxed mb-6">
                Audo Copenhagen was born from the merger of Menu and by Lassen, combining decades of Danish design expertise. We create functional design objects that embody the essence of Scandinavian aesthetics.
              </p>
              <p className="text-lg text-slate-100 leading-relaxed mb-8">
                Our philosophy centers on the belief that form follows function, and beauty emerges from purpose. Each piece in our collection is thoughtfully designed to enhance daily life while maintaining the timeless elegance that defines Danish design.
              </p>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center px-8 py-3 bg-slate-600 text-white font-medium hover:bg-slate-700 transition-colors duration-300"
              >
                Discover Our Philosophy
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass.webp"
                  alt="Audo Copenhagen Craftsmanship"
                  fill
                  className="object-contain object-center p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Why Choose Audo Copenhagen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to functional design, quality craftsmanship, and Scandinavian aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Functional Design</h3>
              <p className="text-gray-600">Every piece serves a purpose while maintaining aesthetic beauty.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Scandinavian Heritage</h3>
              <p className="text-gray-600">Rooted in Danish design traditions and Nordic aesthetics.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sustainable</h3>
              <p className="text-gray-600">Committed to responsible production and lasting quality.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Timeless Appeal</h3>
              <p className="text-gray-600">Designs that transcend trends and remain relevant for years.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
