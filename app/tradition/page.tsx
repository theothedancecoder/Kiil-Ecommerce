"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTraditionProducts } from "@/sanity/lib/products/getTraditionProducts";

interface ProductVariant {
  name?: string;
  image?: {
    asset?: {
      url: string;
    };
  };
  color?: string;
  material?: string;
  price?: number;
}

interface TraditionProduct {
  _id: string;
  name?: string;
  slug?: {
    current?: string;
  };
  description?: string;
  price?: number;
  image?: {
    asset?: {
      url: string;
    };
  };
  variants?: ProductVariant[];
  categories?: Array<{
    title?: string;
  }>;
}

export default function TraditionPage() {
  const [products, setProducts] = useState<TraditionProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getTraditionProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(products.map(product => product.categories?.[0]?.title).filter(Boolean)))];

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.categories?.[0]?.title === selectedCategory);

  // Function to get the most colorful variant for thumbnail
  const getColorfulThumbnail = (product: TraditionProduct) => {
    if (!product.variants || product.variants.length === 0) {
      return product.image?.asset?.url || '';
    }
    
    // Priority order for colorful variants (most vibrant first)
    const colorPriority = [
      'Vermilion Red', 'Signal Green', 'Cobalt Blue', 'Mustard', 
      'Tangy Pink', 'Electric Orange', 'Dark Plum', 'Stone Blue', 
      'Swim Blue', 'Grey Beige', 'Brass-Plated', 'Chrome-Plated',
      'Matt Black', 'Matt White'
    ];
    
    // Find the most colorful variant based on priority
    for (const color of colorPriority) {
      const variant = product.variants.find((v: ProductVariant) => 
        v.color === color || v.name === color
      );
      if (variant?.image?.asset?.url) {
        return variant.image.asset.url;
      }
    }
    
    // If no priority color found, return the first variant or default image
    return product.variants[0]?.image?.asset?.url || product.image?.asset?.url || '';
  };

  // Color mapping for visual swatches
  const getSwatchColor = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'Vermilion Red': 'bg-red-500',
      'Signal Green': 'bg-green-500',
      'Cobalt Blue': 'bg-blue-600',
      'Mustard': 'bg-yellow-500',
      'Tangy Pink': 'bg-pink-400',
      'Dark Plum': 'bg-purple-800',
      'Stone Blue': 'bg-slate-400',
      'Swim Blue': 'bg-cyan-400',
      'Grey Beige': 'bg-stone-300',
      'Matt Black': 'bg-gray-900',
      'Matt White': 'bg-white border-2 border-gray-300',
      'Brass-Plated': 'bg-yellow-600',
      'Chrome-Plated': 'bg-gray-400',
    };
    return colorMap[colorName] || 'bg-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading &Tradition products...</p>
        </div>
      </div>
    );
  }

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
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/&Tradition/Flowerpot-VP1/lifestyle/576155-01_21_ProductImageExtra-667192772c-scaled.webp"
            alt="&Tradition Lifestyle"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-black/90" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-yellow-400/25 rounded-full blur-md animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-white/20">
              <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">
                &Tradition
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed mb-8">
                Danish design company established in 2010, creating and curating original designs that draw on Scandinavian craft heritage while embracing innovation, new techniques, and contemporary materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#products" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors duration-300"
                >
                  Explore Collection
                </Link>
                <Link 
                  href="/tjenester" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-orange-600 text-orange-400 font-medium hover:bg-orange-600 hover:text-white transition-colors duration-300"
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
              Discover our range of iconic Scandinavian designs, from Verner Panton's legendary Flowerpot lamps to contemporary furniture pieces that honor tradition while embracing the future.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category || 'all')}
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
              const thumbnailImage = getColorfulThumbnail(product);

              return (
                <Link
                  key={product._id}
                  href={`/tradition/${product.slug?.current}`}
                  className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={thumbnailImage}
                      alt={product.name || ''}
                      fill
                      className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      {product.categories?.[0]?.title || 'Product'}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-light text-gray-900">
                        kr {product.price?.toLocaleString()}
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
                        {product.variants.slice(0, 6).map((variant: ProductVariant, index: number) => (
                          <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${getSwatchColor(variant.color || variant.name || '')} shadow-sm`}
                            title={variant.color || variant.name}
                          />
                        ))}
                        {product.variants.length > 6 && (
                          <span className="text-xs text-gray-400 ml-1">
                            +{product.variants.length - 6}
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
                Scandinavian Design Heritage Since 2010
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                &Tradition bridges the gap between timeless Scandinavian design heritage and contemporary innovation. 
                We collaborate with both legendary designers and emerging talents to create pieces that honor tradition while embracing the future.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                From Verner Panton's iconic Flowerpot lamps to modern furniture masterpieces, 
                each &Tradition product represents the perfect marriage of Danish craftsmanship and forward-thinking design philosophy.
              </p>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center px-8 py-3 bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors duration-300"
              >
                Discover Our Heritage
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/&Tradition/Flowerpot-VP1/Flowerpot VP1 kr 2 565  Farge - Vermilion Red.jpg"
                  alt="&Tradition Craftsmanship"
                  fill
                  className="object-contain object-center p-8"
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
