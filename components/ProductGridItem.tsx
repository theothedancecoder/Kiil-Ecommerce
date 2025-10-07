"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/sanity.types";
import { imageUrl } from "@/lib/ImageUrl";
import ProductionImage from "@/components/ProductionImage";

interface ProductGridItemProps {
  product: Product;
  brandPath: string; // e.g., "umage", "flos", "kartell"
  enhancedPricing?: { [key: string]: number };
}

export default function ProductGridItem({ 
  product, 
  brandPath, 
  enhancedPricing = {} 
}: ProductGridItemProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);

    const quantityInput = e.currentTarget.parentElement?.querySelector('input[type="number"]') as HTMLInputElement;
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    try {
      // Import and use the cart store
      const { UseBasketStore } = await import('@/app/(store)/store');
      const { addItemWithQuantity } = UseBasketStore.getState();
      
      // Create a product object compatible with the cart using the full product
      const enhancedPrice = product.slug?.current ? enhancedPricing[product.slug.current] : null;
      const cartProduct = {
        ...product,
        price: enhancedPrice || product.price || 0
      };
      
      addItemWithQuantity(cartProduct, quantity);
      
      // Show feedback
      const button = e.currentTarget as HTMLButtonElement;
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.classList.add('bg-green-600');
      button.classList.remove('bg-gray-900');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-600');
        button.classList.add('bg-gray-900');
        setIsAdding(false);
      }, 1500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
      
      // Show error feedback
      const button = e.currentTarget as HTMLButtonElement;
      const originalText = button.textContent;
      button.textContent = 'Error!';
      button.classList.add('bg-red-600');
      button.classList.remove('bg-gray-900');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-red-600');
        button.classList.add('bg-gray-900');
      }, 2000);
    }
  };

  const handleQuantityChange = (e: React.MouseEvent, increment: boolean) => {
    e.preventDefault();
    const button = e.currentTarget as HTMLButtonElement;
    const input = increment 
      ? button.previousElementSibling as HTMLInputElement
      : button.nextElementSibling as HTMLInputElement;
    
    if (input) {
      const currentValue = parseInt(input.value);
      if (increment && currentValue < 99) {
        input.value = (currentValue + 1).toString();
      } else if (!increment && currentValue > 1) {
        input.value = (currentValue - 1).toString();
      }
    }
  };

  // Calculate display price
  const enhancedPrice = product.slug?.current ? enhancedPricing[product.slug.current] : null;
  const displayPrice = enhancedPrice || product.price;

  return (
    <div className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        <Link href={`/${brandPath}/${product.slug?.current || product._id}`}>
          <div className="relative aspect-square bg-gray-50 cursor-pointer">
            {product.image?.asset ? (
              <ProductionImage
                src={imageUrl(product.image).width(400).height(400).url()}
                alt={product.name || "Product"}
                fill
                className="object-contain object-center p-8 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
        </Link>
        <div className="p-6">
          <Link href={`/${brandPath}/${product.slug?.current || product._id}`}>
            <h3 className="text-lg font-medium text-gray-900 mb-2 cursor-pointer hover:text-gray-700">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-4">
            {typeof product.description === 'string' 
              ? product.description.slice(0, 100) + (product.description.length > 100 ? '...' : '')
              : product.description 
                ? 'View product for details'
                : 'No description available'
            }
          </p>
          <div className="mb-4">
            {(product as any).salePrice && (product as any).salePrice < (product.price || 0) ? (
              <div className="space-y-1">
                <div className="text-sm text-gray-500 line-through">
                  Fra kr {(product.price || 0).toLocaleString()} Opprinnelig pris var: kr {(product.price || 0).toLocaleString()}.
                </div>
                <div className="text-lg font-medium text-red-600">
                  kr {(product as any).salePrice.toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="text-lg font-light text-gray-900">
                {displayPrice ? `kr ${displayPrice.toLocaleString()}` : 'Price on request'}
              </div>
            )}
          </div>
          
          {/* Add to Cart Section */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button 
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  onClick={(e) => handleQuantityChange(e, false)}
                >
                  −
                </button>
                <input 
                  type="number" 
                  min="1" 
                  max="99"
                  defaultValue="1"
                  className="w-12 text-center text-sm border border-gray-300 rounded px-2 py-1"
                  onClick={(e) => e.preventDefault()}
                />
                <button 
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  onClick={(e) => handleQuantityChange(e, true)}
                >
                  +
                </button>
              </div>
              
              <button 
                className="flex-1 ml-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
