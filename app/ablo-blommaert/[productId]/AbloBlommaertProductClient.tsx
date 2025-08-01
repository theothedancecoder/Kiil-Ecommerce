"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AbloBlommaertProduct {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: number;
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  brand: string;
  stock: number;
  inStock: boolean;
  lifestyleImages?: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
    caption?: string;
  }[];
}

interface AbloBlommaertProductClientProps {
  product: AbloBlommaertProduct;
}

export default function AbloBlommaertProductClient({ product }: AbloBlommaertProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Extract year and code from product name (e.g., "Vogue January 1927 B615")
  const nameMatch = product.name.match(/Vogue\s+(\w+)\s+(\d{4})\s+(B\d+)/);
  const month = nameMatch ? nameMatch[1] : '';
  const year = nameMatch ? nameMatch[2] : '';
  const productCode = nameMatch ? nameMatch[3] : '';

  const productDetails = {
    'Artist': 'Ablo Blommaert',
    'Publication': 'Vogue Magazine',
    'Date': `${month} ${year}`,
    'Product Code': productCode,
    'Size': '65×80 CM',
    'Frame': 'White frame included',
    'Material': 'High-quality print',
    'Style': 'Vintage Art Deco',
    'Category': 'Wall Art',
    'Condition': 'Reproduction print'
  };

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
              {product.image?.asset?.url ? (
                <Image
                  src={product.image.asset.url}
                  alt={product.name}
                  fill
                  className="object-contain object-center p-8"
                  loading="eager"
                  onError={(e) => {
                    console.error('Image failed to load:', product.image?.asset?.url);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-stone-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Vintage Badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Vintage {year}
              </span>
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="space-y-8">
            {/* Brand */}
            <div className="text-sm text-stone-500 uppercase tracking-wider">
              {product.brand} • Wall Art
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
              kr {product.price.toLocaleString()}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Frame Information */}
            <div className="bg-stone-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-stone-900 mb-2">What's Included</h3>
              <ul className="text-sm text-stone-600 space-y-1">
                <li>• High-quality reproduction print</li>
                <li>• White frame (65×80 CM)</li>
                <li>• Ready to hang</li>
                <li>• Certificate of authenticity</li>
              </ul>
            </div>

            {/* Quantity */}
            {product.inStock && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button 
              className={`w-full py-4 px-8 text-sm font-medium uppercase tracking-wider transition-colors ${
                product.inStock 
                  ? 'bg-stone-800 text-white hover:bg-stone-700' 
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Product Details */}
            <div className="space-y-4 pt-8 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
                  Product Details
                </h3>
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="flex items-center justify-center w-6 h-6 rounded-full border border-stone-300 hover:border-stone-400 transition-colors"
                >
                  <svg
                    className={`w-3 h-3 transition-transform ${isDescriptionExpanded ? 'rotate-45' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              {isDescriptionExpanded && (
                <div className="space-y-3 text-sm">
                  {Object.entries(productDetails).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-stone-100 last:border-b-0">
                      <span className="text-stone-600">{key}:</span>
                      <span className="text-stone-800 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Care Instructions</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Keep away from direct sunlight to prevent fading</li>
                <li>• Clean frame with soft, dry cloth</li>
                <li>• Avoid humid environments</li>
                <li>• Handle with care when moving</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lifestyle Images - Only show if there are actual image assets */}
        {product.lifestyleImages && product.lifestyleImages.length > 0 && product.lifestyleImages.some(img => img.asset?.url) && (
          <div className="mt-20">
            <h2 className="text-2xl font-serif text-stone-800 mb-8 text-center">Style Inspiration</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {product.lifestyleImages
                .filter(image => image.asset?.url) // Only show images with actual assets
                .map((image, index) => (
                <div key={index} className="space-y-4">
                  <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={image.asset.url!}
                      alt={image.alt || `Lifestyle image ${index + 1}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  {image.caption && (
                    <p className="text-sm text-stone-600 text-center italic">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
