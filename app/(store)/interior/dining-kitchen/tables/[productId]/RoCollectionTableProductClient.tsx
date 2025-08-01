"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UseBasketStore from "@/app/(store)/store";
import { RoCollectionProduct } from "@/sanity/lib/products/getRoCollectionProducts";

interface RoCollectionTableProductClientProps {
  product: RoCollectionProduct;
}

export default function RoCollectionTableProductClient({ product }: RoCollectionTableProductClientProps) {
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
    if (selectedQuantity < (product.stock || 0)) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const handleAddToCart = () => {
    const currentPrice = selectedVariant?.price || product.price || 0;
    
    // Add the selected quantity to cart
    const productForCart = {
      _id: product._id,
      _type: 'product' as const,
      _createdAt: product._createdAt || new Date().toISOString(),
      _updatedAt: product._updatedAt || new Date().toISOString(),
      _rev: product._rev || 'rev-1',
      name: product.name || '',
      price: currentPrice,
      image: product.image || {
        _type: 'image' as const,
        asset: {
          _ref: `image-${product._id}`,
          _type: 'reference' as const
        }
      },
      slug: product.slug || {
        _type: 'slug' as const,
        current: ''
      },
      stock: product.stock || 0,
    };

    // Add the selected quantity to cart
    for (let i = 0; i < selectedQuantity; i++) {
      addItem(productForCart);
    }
    
    // Reset selected quantity to 1 after adding to cart
    setSelectedQuantity(1);
  };

  const currentPrice = selectedVariant?.price || product.price || 0;
  const currentImage = selectedVariant?.image?.asset?.url || product.image?.asset?.url || '/placeholder-product.jpg';
  const isInStock = product.inStock !== false && (product.stock || 0) > 0;

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
            <Link href="/interior/dining-kitchen/tables" className="hover:text-stone-800">Tables</Link>
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
                alt={product.name || 'Product image'}
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
                      src={image.asset?.url || '/placeholder-product.jpg'}
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
              {product.brand || 'RO Collection'}
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">
                {product.name}
              </h1>
              <p className="text-stone-600 text-lg leading-relaxed">
                {product.description || 'Premium dining table from RO Collection'}
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
                            <div className="text-sm text-stone-600">Material: {variant.material}</div>
                          )}
                          {variant.size && (
                            <div className="text-sm text-stone-600">Size: {variant.size}</div>
                          )}
                        </div>
                        <div className="text-stone-900 font-medium">
                          NOK {(variant.price || product.price || 0).toLocaleString()}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${isInStock ? 'text-green-700' : 'text-red-700'}`}>
                {isInStock ? `In stock (${product.stock} available)` : 'Out of stock'}
              </span>
            </div>

            {/* Product Details */}
            <div className="bg-stone-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-stone-900 mb-3">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Brand:</span>
                  <span className="text-stone-800 font-medium">{product.brand || 'RO Collection'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Category:</span>
                  <span className="text-stone-800 font-medium">Dining Table</span>
                </div>
                {selectedVariant?.material && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Material:</span>
                    <span className="text-stone-800 font-medium">{selectedVariant.material}</span>
                  </div>
                )}
                {selectedVariant?.size && (
                  <div className="flex justify-between">
                    <span className="text-stone-600">Size:</span>
                    <span className="text-stone-800 font-medium">{selectedVariant.size}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-600">Origin:</span>
                  <span className="text-stone-800 font-medium">Denmark</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            {isInStock && (
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
                      disabled={selectedQuantity >= (product.stock || 0)}
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

            {!isInStock && (
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
                <li>• Clean with a soft, damp cloth</li>
                <li>• Use coasters and placemats to protect surface</li>
                <li>• Avoid direct sunlight to prevent fading</li>
                <li>• Oil wood surfaces regularly to maintain finish</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About RO Collection */}
        <div className="mt-20 bg-stone-50 p-8 rounded-lg">
          <h2 className="text-2xl font-serif text-stone-800 mb-4">About RO Collection</h2>
          <p className="text-stone-600 leading-relaxed">
            RO Collection represents the pinnacle of Scandinavian furniture design, combining traditional craftsmanship 
            with contemporary aesthetics. Each piece is meticulously crafted using premium materials and time-honored 
            techniques, resulting in furniture that not only looks beautiful but is built to last generations. Our dining 
            tables are designed to be the centerpiece of your home, where memories are made and stories are shared.
          </p>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif text-stone-800 mb-8 text-center">More Dining Tables</h2>
          <div className="text-center">
            <Link 
              href="/interior/dining-kitchen/tables"
              className="inline-flex items-center px-6 py-3 border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              View All Tables
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
