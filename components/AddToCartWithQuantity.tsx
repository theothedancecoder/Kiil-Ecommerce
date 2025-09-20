"use client";

import { useEffect, useState } from "react";
import useBasketStore from "@/app/(store)/store";
import { Product } from "@/sanity.types";

interface AddToCartWithQuantityProps {
  product: Product;
  disabled?: boolean;
  maxQuantity?: number;
  showCurrentCount?: boolean;
  variant?: "default" | "large" | "compact";
  className?: string;
}

function AddToCartWithQuantity({ 
  product, 
  disabled = false, 
  maxQuantity = 99,
  showCurrentCount = true,
  variant = "default",
  className = ""
}: AddToCartWithQuantityProps) {
  const { addItemWithQuantity, getItemCount } = useBasketStore();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const currentCartCount = getItemCount(product._id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (disabled || isAdding) return;
    
    setIsAdding(true);
    try {
      addItemWithQuantity(product, selectedQuantity);
      // Optional: Show success feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  if (!isClient) return null;

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "large":
        return {
          container: "space-y-6",
          quantityContainer: "flex items-center justify-center space-x-4",
          quantityButton: "w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-lg font-bold hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          quantityDisplay: "text-xl font-semibold w-16 text-center",
          addButton: "w-full bg-gray-900 text-white py-4 px-8 text-lg font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          currentCount: "text-base text-gray-600 text-center"
        };
      case "compact":
        return {
          container: "flex items-center space-x-2",
          quantityContainer: "flex items-center border border-gray-300 rounded",
          quantityButton: "w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-100 transition-colors disabled:opacity-50",
          quantityDisplay: "w-12 text-center text-sm border-0 focus:ring-0 focus:outline-none",
          addButton: "px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 rounded",
          currentCount: "text-xs text-gray-500"
        };
      default:
        return {
          container: "space-y-4",
          quantityContainer: "flex items-center justify-center space-x-3",
          quantityButton: "w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center font-bold hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          quantityDisplay: "text-lg font-semibold w-12 text-center",
          addButton: "w-full bg-gray-900 text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded",
          currentCount: "text-sm text-gray-600 text-center"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Quantity Selector */}
      <div className={styles.quantityContainer}>
        <button
          onClick={() => handleQuantityChange(selectedQuantity - 1)}
          disabled={selectedQuantity <= 1 || disabled}
          className={styles.quantityButton}
          aria-label="Decrease quantity"
        >
          −
        </button>
        
        {variant === "compact" ? (
          <input
            type="number"
            min="1"
            max={maxQuantity}
            value={selectedQuantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className={styles.quantityDisplay}
            disabled={disabled}
          />
        ) : (
          <span className={styles.quantityDisplay}>{selectedQuantity}</span>
        )}
        
        <button
          onClick={() => handleQuantityChange(selectedQuantity + 1)}
          disabled={selectedQuantity >= maxQuantity || disabled}
          className={styles.quantityButton}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={disabled || isAdding}
        className={styles.addButton}
        aria-label={`Add ${selectedQuantity} ${product.name} to cart`}
      >
        {isAdding ? "Adding..." : `Add to Cart${variant === "large" ? ` - kr ${((product.price ?? 0) * selectedQuantity).toLocaleString()}` : ""}`}
      </button>

      {/* Current Cart Count */}
      {showCurrentCount && currentCartCount > 0 && (
        <div className={styles.currentCount}>
          Currently in cart: {currentCartCount}
        </div>
      )}
    </div>
  );
}

export default AddToCartWithQuantity;
