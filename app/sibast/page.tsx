"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByBrand } from "@/lib/allProducts";

export default function SibastPage() {
  const allSibastProducts = getProductsByBrand("Sibast Furniture");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter to only include the 3 products corresponding to the folders
  const validProductIds = [
    "no-2-1-dining-table",
    "no-7-dining-chair",
    "no-7-dining-chair-full-upholstery"
  ];
  const sibastProducts = allSibastProducts.filter(product =>
    validProductIds.includes(product.id)
  );

  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(sibastProducts.map(product => product.category)))];

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? sibastProducts 
    : sibastProducts.filter(product => product.category === selectedCategory);

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
      <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Sibast-Furniture/No.2.1-dining-table/lifestyle/Sibast-No-2-1-dining-table-2-extensions-walnut-in-setting-Sibast-No-8-No-7-dining-chairs-white-oil-oak-grey-aniline-leather-2.webp"
            alt="Sibast Furniture Lifestyle"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-orange-800/60 to-red-900/80" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-red-400/25 rounded-full blur-md animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-white/20">
              <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">
                Sibast Furniture
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed mb-8">
                Danish furniture company founded in 1953, renowned for creating timeless pieces that combine traditional craftsmanship with contemporary design. Each piece reflects the essence of Scandinavian design philosophy - functional, beautiful, and built to last.
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
                  Currently, there are no Sibast Furniture products displayed.
                </p>
              </div>
            </div>
          </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">
                Danish Craftsmanship Since 1953
              </h2>
              <p className="text-lg text-amber-100 leading-relaxed mb-6">
                Sibast Furniture represents the pinnacle of Danish design heritage. Founded in 1953, we have been creating furniture that embodies the essence of Scandinavian aesthetics - clean lines, functional beauty, and exceptional craftsmanship.
              </p>
              <p className="text-lg text-amber-100 leading-relaxed mb-8">
                Our iconic pieces, including the timeless No.2.1 dining table and the elegant No.7 dining chairs, are crafted from the finest materials and built to last generations. Each piece tells a story of Danish design philosophy where form follows function, and beauty emerges from simplicity.
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
                  src="/Sibast-Furniture/No.7-dining-chair/lifestyle/Sibast-No-7-Dining-Chair-Leather-Cognac-Aniline.webp"
                  alt="Sibast Furniture Craftsmanship"
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
              Why Choose Sibast Furniture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to quality, sustainability, and timeless design makes every piece a worthy investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Crafted from the finest solid wood with meticulous attention to detail.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Timeless Design</h3>
              <p className="text-gray-600">Classic Danish aesthetics that never go out of style.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sustainable</h3>
              <p className="text-gray-600">Responsibly sourced materials and eco-friendly production methods.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Built to Last</h3>
              <p className="text-gray-600">Heirloom quality furniture designed to last for generations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
