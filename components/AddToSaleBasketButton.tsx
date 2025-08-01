"use client";

import { useEffect, useState } from "react";
import useBasketStore from "@/app/(store)/store";
import { SaleProduct } from "@/lib/salesData";

interface AddToSaleBasketButtonProps {
  product: SaleProduct;
  disabled?: boolean;
}

function AddToSaleBasketButton({ product, disabled }: AddToSaleBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product.id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Convert SaleProduct to Product format for the basket store
  const basketProduct = {
    _id: product.id,
    name: product.name,
    price: product.salePrice, // Use sale price for basket
    image: {
      asset: {
        _ref: "",
        _type: "reference" as const,
      },
      _type: "image" as const,
    },
    _type: "product" as const,
    _createdAt: "",
    _updatedAt: "",
    _rev: "",
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Add to Cart Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => addItem(basketProduct)}
          className="flex-1 bg-gray-900 text-white px-8 py-4 font-medium hover:bg-gray-800 transition-colors duration-200 rounded-md text-lg"
          disabled={disabled}
        >
          Add to Cart - kr {product.salePrice.toLocaleString('no-NO')}
        </button>
      </div>

      {/* Quantity Controls (if item is in cart) */}
      {itemCount > 0 && (
        <div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-lg p-4">
          <span className="text-sm text-gray-600">In cart:</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => removeItem(product.id)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors duration-200"
              disabled={disabled}
            >
              <span className="text-lg font-bold">–</span>
            </button>
            
            <span className="w-8 text-center font-semibold text-lg">{itemCount}</span>
            
            <button
              onClick={() => addItem(basketProduct)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors duration-200"
              disabled={disabled}
            >
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToSaleBasketButton;
