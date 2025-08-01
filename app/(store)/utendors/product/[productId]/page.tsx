'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOutdoorProductById, getRelatedOutdoorProducts } from "@/lib/outdoorProducts";
import { formatCurrency } from "@/lib/formatCurrency";
import AddToBasketButton from "@/components/AddToBasketButton";

export default function OutdoorProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const resolvedParams = await params;
      const productData = getOutdoorProductById(resolvedParams.productId);
      
      if (!productData) {
        notFound();
        return;
      }
      
      setProduct(productData);
      setRelatedProducts(getRelatedOutdoorProducts(resolvedParams.productId, 3));
      setLoading(false);
    };
    
    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
    return null;
  }

  // Get current image (selected variant or main image)
  const selectedVariant = product.variants && product.variants.length > 0 
    ? product.variants[selectedVariantIndex] 
    : null;
  
  const currentImage = selectedVariant ? selectedVariant.image : product.image;
  const currentPrice = product.price; // All products have a base price

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <Link href="/utendors" className="hover:text-stone-800">Outdoor</Link>
            <span>/</span>
            <span className="text-stone-800">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {product.lifestyleImages.map((image: string, index: number) => (
                  <div key={index} className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} lifestyle ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Brand */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {product.brand}
              </p>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-2xl font-semibold text-gray-900">
              {formatCurrency(product.price, "NOK")}
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-green-700">In Stock</span>
            </div>

            {/* Variant Selection - Enhanced */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Color: {selectedVariant?.color || product.variants[0].color}
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.variants.map((variant: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedVariantIndex === index
                          ? "border-gray-900"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={variant.image}
                        alt={`${product.name} - ${variant.color}`}
                        fill
                        className="object-contain object-center p-2"
                        sizes="(max-width: 768px) 25vw, 12.5vw"
                      />
                      <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                        {variant.color}
                      </div>
                    </button>
                  ))}
                </div>
                {selectedVariant && (
                  <div className="text-sm text-gray-600">
                    Selected: {selectedVariant.name}
                    {selectedVariant.color && ` (${selectedVariant.color})`}
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center space-x-2">
                  {/* Decrease Button */}
                  <button
                    onClick={handleQuantityDecrease}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      quantity === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    }`}
                    disabled={quantity === 1}
                  >
                    <span className="text-xl font-bold">–</span>
                  </button>

                  {/* Quantity Display */}
                  <span className="w-8 text-center font-semibold text-lg">{quantity}</span>

                  {/* Increase Button */}
                  <button
                    onClick={handleQuantityIncrease}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors duration-200"
                  >
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="pt-4">
              <AddToBasketButton 
                product={{
                  ...product,
                  // Add the static image path as a custom property for the cart to use
                  staticImage: selectedVariant ? selectedVariant.image : product.image,
                  localImagePath: selectedVariant ? selectedVariant.image : product.image
                }} 
              />
            </div>

            {/* Collapsible Features */}
            {product.features && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setFeaturesExpanded(!featuresExpanded)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Features
                  </h3>
                  <span className="text-gray-500">
                    {featuresExpanded ? "−" : "+"}
                  </span>
                </button>
                {featuresExpanded && (
                  <ul className="mt-4 space-y-2 text-gray-600">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Collapsible Specifications */}
            {product.specifications && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setSpecificationsExpanded(!specificationsExpanded)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Specifications
                  </h3>
                  <span className="text-gray-500">
                    {specificationsExpanded ? "−" : "+"}
                  </span>
                </button>
                {specificationsExpanded && (
                  <div className="mt-4 space-y-3 text-gray-600">
                    {product.specifications.map((spec: any, idx: number) => (
                      <div key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium">{spec.label}</span>
                        <span className="text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Category Badge */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Category:</span>
                <Link 
                  href={`/utendors/${product.subcategory}`}
                  className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {product.subcategory.split('-').map((word: string) => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products - Enhanced */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16 mt-16">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/utendors/product/${related.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="relative aspect-square bg-gray-50">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {/* Variant indicators */}
                      {related.variants && related.variants.length > 1 && (
                        <div className="absolute bottom-2 left-2 flex space-x-1">
                          {related.variants.slice(0, 3).map((variant: any, index: number) => (
                            <div
                              key={index}
                              className="w-3 h-3 rounded-full border border-white shadow-sm"
                              style={{
                                backgroundColor: variant.color.toLowerCase().includes('green') ? '#22c55e' :
                                               variant.color.toLowerCase().includes('ivory') || variant.color.toLowerCase().includes('ash') || variant.color.toLowerCase().includes('papyrus') ? '#f5f5f4' :
                                               variant.color.toLowerCase().includes('charcoal') ? '#374151' :
                                               variant.color.toLowerCase().includes('yellow') ? '#eab308' :
                                               variant.color.toLowerCase().includes('marine') ? '#1e40af' : '#9ca3af'
                              }}
                              title={variant.color}
                            />
                          ))}
                          {related.variants.length > 3 && (
                            <span className="text-xs text-gray-500 ml-1">+{related.variants.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {related.brand}
                      </p>
                      <h3 className="text-lg font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-gray-900 font-medium">
                        {formatCurrency(related.price, "NOK")}
                      </p>
                      {related.variants && related.variants.length > 1 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {related.variants.length} color{related.variants.length !== 1 ? 's' : ''} available
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/utendors"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-lg"
              >
                View All Outdoor Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
