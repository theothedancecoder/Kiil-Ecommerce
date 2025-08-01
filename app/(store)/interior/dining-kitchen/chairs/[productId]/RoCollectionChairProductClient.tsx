"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UseBasketStore from "@/app/(store)/store";
import { RoCollectionChairsProduct } from "@/lib/roCollectionChairsData";

interface RoCollectionChairProductClientProps {
  product: RoCollectionChairsProduct;
}

export default function RoCollectionChairProductClient({ product }: RoCollectionChairProductClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
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
    const currentPrice = selectedVariant?.price || product.price;
    
    // Add the selected quantity to cart
    const productForCart = {
      _id: product._id,
      _type: 'product' as const,
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      _rev: 'rev-1',
      name: product.name,
      price: currentPrice,
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
      localImagePath: selectedVariant?.image || product.image
    };

    // Add the selected quantity to cart
    for (let i = 0; i < selectedQuantity; i++) {
      addItem(productForCart);
    }
    
    // Reset selected quantity to 1 after adding to cart
    setSelectedQuantity(1);
  };

  const currentPrice = selectedVariant?.price || product.price;
  const currentImage = selectedVariant?.image || product.image;

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
            <Link href="/interior/dining-kitchen" className="hover:text-stone-800">Dining & Kitchen</Link>
            <span>/</span>
            <Link href="/interior/dining-kitchen/chairs" className="hover:text-stone-800">Chairs</Link>
            <span>/</span>
            <span className="text-stone-800">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {product.lifestyleImages.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} lifestyle ${index + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
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
              NOK {currentPrice.toLocaleString()}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-stone-900">Options:</h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        selectedVariant === variant
                          ? 'border-stone-800 bg-stone-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-stone-900">{variant.name}</div>
                          {variant.material && (
                            <div className="text-sm text-stone-600">Base: {variant.material}</div>
                          )}
                          {variant.color && (
                            <div className="text-sm text-stone-600">Leather: {variant.color}</div>
                          )}
                        </div>
                        <div className="text-stone-900 font-medium">
                          NOK {(variant.price || product.price).toLocaleString()}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                  <span className="text-stone-600">Brand:</span>
                  <span className="text-stone-800 font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Category:</span>
                  <span className="text-stone-800 font-medium">Dining Chair</span>
                </div>
                {selectedVariant?.material && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Base Material:</span>
                    <span className="text-stone-800 font-medium">{selectedVariant.material}</span>
                  </div>
                )}
                {selectedVariant?.color && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Upholstery:</span>
                    <span className="text-stone-800 font-medium">{selectedVariant.color}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-600">Origin:</span>
                  <span className="text-stone-800 font-medium">Denmark</span>
                </div>
              </div>
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
                <li>• Clean leather with appropriate leather cleaner</li>
                <li>• Dust wooden parts with soft, dry cloth</li>
                <li>• Avoid direct sunlight to prevent fading</li>
                <li>• Condition leather regularly to maintain suppleness</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About RO Collection */}
        <div className="mt-20 bg-stone-50 p-8 rounded-lg">
          <h2 className="text-2xl font-serif text-stone-800 mb-4">About RO Collection</h2>
          <p className="text-stone-600 leading-relaxed">
            RO Collection represents the pinnacle of Scandinavian furniture design, combining traditional craftsmanship 
            with contemporary aesthetics. Each dining chair is meticulously crafted using premium materials including 
            solid wood bases and the finest leather upholstery. Our commitment to quality ensures that every piece 
            not only provides exceptional comfort but also serves as a lasting investment in your home's style and functionality.
          </p>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif text-stone-800 mb-8 text-center">More Dining Chairs</h2>
          <div className="text-center">
            <Link 
              href="/interior/dining-kitchen/chairs"
              className="inline-flex items-center px-6 py-3 border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              View All Chairs
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
