"use client";

import { useState, useEffect } from "react";
import useBasketStore from "@/app/(store)/store";
import { MirrorProduct, MirrorVariant } from "@/lib/mirrorsData";
import Image from "next/image";

interface MirrorProductClientProps {
  product: MirrorProduct;
}

export default function MirrorProductClient({ product }: MirrorProductClientProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<MirrorVariant | null>(
    product.variants ? product.variants[0] : null
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const { addItem, getItemCount } = useBasketStore();
  const cartQuantity = getItemCount(product._id);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Get current image based on selected variant
  const currentImage = selectedVariant?.image || product.image;
  const currentPrice = selectedVariant?.price || product.price;

  const handleQuantityDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    setSelectedQuantity(selectedQuantity + 1);
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

  return (
    <>
      {/* Product Image */}
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={currentImage}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif text-primary mb-2">
            {product.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {product.brand}
          </p>
          <div className="text-2xl font-semibold text-primary mb-6">
            NOK {currentPrice.toLocaleString()}
          </div>
        </div>

        <div className="prose prose-stone max-w-none">
          <p>{product.description}</p>
        </div>

        {/* Variant Selection */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Color Options</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {product.variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                    selectedVariant === variant
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-sm font-medium">{variant.name}</div>
                  {variant.color && (
                    <div className="text-xs text-gray-500 mt-1">{variant.color}</div>
                  )}
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

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-sm ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
            {product.inStock ? `In stock (${product.stock} available)` : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Section */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <div className="flex items-center justify-center space-x-2">
              {/* Decrease Button */}
              <button
                onClick={handleQuantityDecrease}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  selectedQuantity === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-orange-600 hover:text-accent"
                }`}
                disabled={selectedQuantity === 1 || !product.inStock}
              >
                <span className="text-xl font-bold">–</span>
              </button>

              {/* Quantity Display */}
              <span className="w-8 text-center font-semibold">{selectedQuantity}</span>

              {/* Increase Button */}
              <button
                onClick={handleQuantityIncrease}
                className="w-8 h-8 rounded-full flex items-center justify-center text-green-600 hover:text-accent transition-colors duration-200"
                disabled={!product.inStock}
              >
                <span className="text-xl font-bold">+</span>
              </button>
            </div>
          </div>
          
          {/* Cart Status */}
          {isHydrated && cartQuantity > 0 && (
            <div className="text-sm text-gray-600">
              Currently in cart: {cartQuantity}
            </div>
          )}
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors duration-200 ${
              product.inStock 
                ? 'bg-primary hover:bg-primary/90 active:bg-primary/80' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {product.inStock ? `Add ${selectedQuantity} to Cart` : 'Out of Stock'}
          </button>
        </div>

        {/* Product Details */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="font-semibold text-lg">Product Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Brand:</span>
              <span>{product.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span>Mirrors</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Material:</span>
              <span>Premium Materials</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
