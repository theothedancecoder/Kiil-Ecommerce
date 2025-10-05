"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCraftsProducts, CraftsProduct } from "@/sanity/lib/products/getCraftsProducts";
import ProductionImage from "@/components/ProductionImage";

export default function CraftsPage() {
  const [products, setProducts] = useState<CraftsProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await getCraftsProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching Crafts products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(products.map(product => product.categories?.[0]?.title || "Lighting")))];

  // Filter products by category
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.categories?.[0]?.title === selectedCategory);

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

      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
              Crafts
            </h1>
            <p className="text-lg text-gray-600">
              Handcrafted lighting from Konsthantverk and artisanal creators
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
              const getBestThumbnail = (product: CraftsProduct) => {
                if (!product.variants || product.variants.length === 0) {
                  return product.image?.asset?.url || '';
                }

                // For Crafts products, prefer natural materials
                const materialPriority = [
                  'Natural Brass', 'Brass', 'Natural', 'Copper', 'Bronze'
                ];

                // Find the best material variant
                for (const material of materialPriority) {
                  const variant = product.variants.find((v) =>
                    v.material === material || v.name?.includes(material)
                  );
                  if (variant) {
                    return variant.image?.asset?.url || '';
                  }
                }

                // If no priority material found, return the first variant or default image
                return product.variants[0]?.image?.asset?.url || product.image?.asset?.url || '';
              };

              const thumbnailImage = getBestThumbnail(product);
              const productUrl = `/crafts/${product.slug?.current || product._id}`;

              return (
                <Link
                  key={product._id}
                  href={productUrl}
                  className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {thumbnailImage ? (
                      <ProductionImage
                        src={thumbnailImage}
                        alt={product.name || 'Product'}
                        fill
                        className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      {product.categories?.[0]?.title || 'Lighting'}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-light text-gray-900">
                        kr {product.price?.toLocaleString() || '0'}
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
                        {product.variants.slice(0, 4).map((variant, index) => {
                          // Material mapping for visual swatches
                          const getSwatchColor = (materialName?: string) => {
                            const materialMap: { [key: string]: string } = {
                              'Natural Brass': 'bg-yellow-600',
                              'Brass': 'bg-yellow-500',
                              'Copper': 'bg-orange-600',
                              'Bronze': 'bg-amber-800',
                              'Natural': 'bg-amber-200',
                            };

                            if (!materialName) return 'bg-gray-300';

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


    </div>
  );
}
