"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByBrand } from "@/lib/allProducts";

export default function CraftsPage() {
  const craftsProducts = getProductsByBrand("Crafts");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(craftsProducts.map(product => product.category)))];

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? craftsProducts 
    : craftsProducts.filter(product => product.category === selectedCategory);

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
      <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Crafts/Fenomen-Wide-Ceiling-Lamp%20/%20Crafts%20Fenomen%20Wide%20Ceiling%20Lamp%20from%20Konsthantverk%20NOK%20%209,701.jpg"
            alt="Crafts Lighting Collection"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/60 via-yellow-800/40 to-orange-900/60" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-orange-400/25 rounded-full blur-md animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-white/20">
              <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">
                Crafts
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed mb-8">
                Discover exceptional lighting craftsmanship from Konsthantverk and other artisanal creators. 
                Our Crafts collection celebrates the intersection of traditional techniques and contemporary design, 
                featuring handcrafted pieces that bring warmth and character to any space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#products" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-300"
                >
                  Explore Collection
                </Link>
                <Link 
                  href="/tjenester" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-amber-600 text-amber-400 font-medium hover:bg-amber-600 hover:text-white transition-colors duration-300"
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
              Each piece in our Crafts collection represents the finest in artisanal design and manufacturing. 
              From the elegant Fenomen Wide Ceiling Lamp by Konsthantverk to other carefully curated lighting solutions, 
              every item tells a story of skilled craftsmanship and timeless beauty.
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
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
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              // Function to get the best variant for thumbnail
              const getBestThumbnail = (product: any) => {
                if (!product.variants || product.variants.length === 0) {
                  return product.image;
                }
                
                // For Crafts products, prefer natural materials
                const materialPriority = [
                  'Natural Brass', 'Brass', 'Natural', 'Copper', 'Bronze'
                ];
                
                // Find the best material variant
                for (const material of materialPriority) {
                  const variant = product.variants.find((v: any) => 
                    v.material === material || v.name.includes(material)
                  );
                  if (variant) {
                    return variant.image;
                  }
                }
                
                // If no priority material found, return the first variant or default image
                return product.variants[0]?.image || product.image;
              };

              const thumbnailImage = getBestThumbnail(product);

              return (
                <Link
                  key={product.id}
                  href={product.href}
                  className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-lg"
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
                    
                    {/* Material Swatches */}
                    {product.variants && product.variants.length > 1 && (
                      <div className="flex items-center space-x-1">
                        {product.variants.slice(0, 4).map((variant: any, index: number) => {
                          // Material mapping for visual swatches
                          const getSwatchColor = (materialName: string) => {
                            const materialMap: { [key: string]: string } = {
                              'Natural Brass': 'bg-yellow-600',
                              'Brass': 'bg-yellow-500',
                              'Copper': 'bg-orange-600',
                              'Bronze': 'bg-amber-800',
                              'Natural': 'bg-amber-200',
                            };
                            
                            // Check if the material name contains any of our mapped materials
                            for (const [key, value] of Object.entries(materialMap)) {
                              if (materialName.includes(key)) {
                                return value;
                              }
                            }
                            return 'bg-gray-300';
                          };

                          return (
                            <div
                              key={index}
                              className={`w-3 h-3 rounded-full ${getSwatchColor(variant.material || variant.name)} shadow-sm border border-gray-200`}
                              title={variant.material || variant.name}
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
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">
                Artisanal Excellence Since Tradition
              </h2>
              <p className="text-lg text-amber-100 leading-relaxed mb-6">
                Our Crafts collection celebrates the timeless art of handcrafted lighting design. 
                Featuring exceptional pieces from renowned makers like Konsthantverk, each fixture 
                represents a perfect marriage of traditional craftsmanship and contemporary aesthetics.
              </p>
              <p className="text-lg text-amber-100 leading-relaxed mb-8">
                The Fenomen Wide Ceiling Lamp exemplifies this philosophy, combining elegant proportions 
                with meticulous attention to detail. Every piece in our collection is chosen for its 
                ability to transform spaces through the interplay of light, shadow, and form.
              </p>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-300"
              >
                Discover Our Heritage
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/Crafts/Fenomen-Wide-Ceiling-Lamp%20/%20Crafts%20Fenomen%20Wide%20Ceiling%20Lamp%20from%20Konsthantverk%20NOK%20%209,701.jpg"
                  alt="Crafts Lighting Craftsmanship"
                  fill
                  className="object-cover object-center"
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
              Why Choose Crafts Lighting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to artisanal quality, sustainable practices, and timeless design makes every piece a worthy investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Handcrafted Quality</h3>
              <p className="text-gray-600">Each piece is meticulously crafted by skilled artisans using traditional techniques.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Timeless Design</h3>
              <p className="text-gray-600">Contemporary aesthetics rooted in traditional craftsmanship principles.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sustainable</h3>
              <p className="text-gray-600">Responsibly sourced materials and environmentally conscious production methods.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Exceptional Light</h3>
              <p className="text-gray-600">Carefully designed to create beautiful, functional illumination for any space.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
