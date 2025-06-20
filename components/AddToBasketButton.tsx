"use client";

import { useEffect, useState } from "react";
import useBasketStore from "@/app/(store)/store";
import { Product } from "@/sanity.types";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Remove Button */}
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          itemCount === 0
            ? "text-gray-300 cursor-not-allowed"
            : "text-orange-600 hover:text-accent"
        }`}
        disabled={itemCount === 0 || disabled}
      >
        <span className="text-xl font-bold">–</span>
      </button>

      {/* Count */}
      <span className="w-8 text-center font-semibold">{itemCount}</span>

      {/* Add Button */}
      <button
        onClick={() => addItem(product)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-green-600 hover:text-accent transition-colors duration-200"
        disabled={disabled}
      >
        <span className="text-xl font-bold">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;
