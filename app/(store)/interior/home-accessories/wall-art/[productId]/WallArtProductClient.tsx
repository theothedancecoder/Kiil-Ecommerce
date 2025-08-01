"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UseBasketStore from "@/app/(store)/store";
import { WallArtProduct } from "@/lib/wallArtData";

interface WallArtProductClientProps {
  product: WallArtProduct;
}

export default function WallArtProductClient({ product }: WallArtProductClientProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isHydrated, setIsHydrated] = useState(false);
  const { addItem, getItemCount } = UseBasketStore();
  const cartQuantity = getItemCount(product._id);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleQuantityDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (selectedQuantity < product.stock) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const handleAddToCart = () => {
    // Add the selected quantity to cart
    const productForCart = {
      _id: product._id,
      _type: 'product' as const,
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      _rev: 'rev-1',
      name: product.name,
      price: product.price,
      // Create a proper Sanity image structure for local images
      image: {
        _type: 'image' as const,
        asset: {
          _ref: `image-${product._id}`, // Use product ID as a unique reference
          _type: 'reference' as const
        }
      },
      slug: {
        _type: 'slug' as const,
        current: product.slug.current
      },
      stock: product.stock,
      // Add the local image path as a custom property for the cart to use
      localImagePath: product.image
    };

    // Add the selected quantity to cart
    for (let i = 0; i < selectedQuantity; i++) {
      addItem(productForCart);
    }
    
    // Reset selected quantity to 1 after adding to cart
    setSelectedQuantity(1);
  };

  // Extract year and details from product name (e.g., "Vogue January 1927 B615")
  const nameMatch = product.name.match(/Vogue\s+(\w+)\s+(\d{4})\s+(B\d+)/);
  const month = nameMatch ? nameMatch[1] : '';
  const year = nameMatch ? nameMatch[2] : '';
  const productCode = nameMatch ? nameMatch[3] : '';

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <Link href="/interior" className="hover:text-stone-800">Interior</Link>
            <span>/</span>
            <Link href="/interior/home-accessories" className="hover:text-stone-800">Home Accessories</Link>
            <span>/</span>
            <Link href="/interior/home-accessories/wall-art" className="hover:text-stone-800">Wall Art</Link>
            <span>/</span>
            <span className="text-stone-800">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Image */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center p-8"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Vintage Badge */}
            {year && (
              <div className="flex justify-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Vintage {year}
                </span>
              </div>
            )}
          </div>

          {/* Right side - Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="text-sm text-stone-500 uppercase tracking-wider">
              {product.brand}
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">
                {product.name}
              </h1>
              <p className="text-stone-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-stone-900">
              NOK {product.price.toLocaleString()}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                {product.inStock ? `In stock (${product.stock} available)` : 'Out of stock'}
              </span>
            </div>

            {/* Product Details */}
            <div className="bg-stone-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-stone-900 mb-3">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Artist:</span>
                  <span className="text-stone-800 font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Publication:</span>
                  <span className="text-stone-800 font-medium">Vogue Magazine</span>
                </div>
                {month && year && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Date:</span>
                    <span className="text-stone-800 font-medium">{month} {year}</span>
                  </div>
                )}
                {productCode && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Product Code:</span>
                    <span className="text-stone-800 font-medium">{productCode}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-600">Size:</span>
                  <span className="text-stone-800 font-medium">65×80 CM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Frame:</span>
                  <span className="text-stone-800 font-medium">White frame included</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">What's Included</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• High-quality reproduction print</li>
                <li>• White frame (65×80 CM)</li>
                <li>• Ready to hang</li>
                <li>• Certificate of authenticity</li>
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-900">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleQuantityDecrease}
                      disabled={selectedQuantity <= 1}
                      className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{selectedQuantity}</span>
                    <button
                      onClick={handleQuantityIncrease}
                      disabled={selectedQuantity >= product.stock}
                      className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
        
                {/* Cart Status */}
                {isHydrated && cartQuantity > 0 && (
                  <div className="text-sm text-gray-600">
                    Currently in cart: {cartQuantity}
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-stone-800 text-white py-3 px-6 rounded-lg hover:bg-stone-700 transition-colors font-medium"
                >
                  Add {selectedQuantity} to Cart
                </button>
              </div>
            )}

            {!product.inStock && (
              <button
                disabled
                className="w-full bg-stone-300 text-stone-500 py-3 px-6 rounded-lg cursor-not-allowed font-medium"
              >
                Out of Stock
              </button>
            )}

            {/* Care Instructions */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-amber-900 mb-2">Care Instructions</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Keep away from direct sunlight to prevent fading</li>
                <li>• Clean frame with soft, dry cloth</li>
                <li>• Avoid humid environments</li>
                <li>• Handle with care when moving</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Ablo Blommaert */}
        <div className="mt-20 bg-stone-50 p-8 rounded-lg">
          <h2 className="text-2xl font-serif text-stone-800 mb-4">About Ablo Blommaert</h2>
          <p className="text-stone-600 leading-relaxed">
            Ablo Blommaert specializes in curating and reproducing vintage magazine covers and fashion illustrations 
            from the golden age of print media. Each piece in our collection represents a moment in fashion and 
            cultural history, carefully selected for its artistic merit and historical significance. Our high-quality 
            reproductions bring these timeless designs into modern interiors, allowing you to own a piece of fashion 
            history that continues to inspire contemporary design.
          </p>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif text-stone-800 mb-8 text-center">More Wall Art</h2>
          <div className="text-center">
            <Link 
              href="/interior/home-accessories/wall-art"
              className="inline-flex items-center px-6 py-3 border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              View All Wall Art
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
