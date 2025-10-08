"use client"

import { Product } from "@/sanity.types";
import { StaticProduct } from "@/lib/allProducts";
import { StockManager } from "@/lib/stockManager";
import { getImageUrl } from "@/lib/ImageUrl";
import { debugImageUrl, isValidImagePath, fixImagePathForProduction, validateSanityConfig } from "@/lib/imageDebug";
import ProductionImage from "@/components/ProductionImage";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ProductThumbWithStockProps {
  product: Product | StaticProduct;
  showPrice?: boolean;
  isNew?: boolean;
}

function ProductThumbWithStock({ product, showPrice = false, isNew = false }: ProductThumbWithStockProps) {
  const [stockStatus, setStockStatus] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const stockManager = StockManager.getInstance();

  useEffect(() => {
    const productId = '_id' in product ? product._id : (product as StaticProduct).id;
    const status = stockManager.getStockStatus(productId);
    setStockStatus(status);
  }, [product]);

  // Handle both Sanity and static products
  const isStaticProduct = 'staticProduct' in product || ('href' in product && (product as any).href) || ('link' in product && (product as any).link);
  const productId = '_id' in product ? product._id : (product as StaticProduct).id;
  const productName = product.name || '';
  const productPrice = product.price || 0;
  const productBrand = isStaticProduct ? (product as any).staticBrand : (product as any).brand || 'Brand';
  const productHref = isStaticProduct 
    ? (product as any).staticHref || (product as StaticProduct).href || (product as any).link || '#'
    : (product as any).brand === 'RO Collection' 
      ? `/interior/dining-kitchen/${(product as any).categories?.[0]?.slug?.current === 'dining-chairs' ? 'chairs' : 'tables'}/${(product as any).slug?.current}`
      : `/products/${(product as any).slug?.current || 'unknown'}`;
  
  
  // Get image URL - handle both static products and Sanity products
  let imageSrc = '';
  
  if (isStaticProduct) {
    // For static products, use the image path directly
    const staticImageSrc = (product as any).staticImage || (product as StaticProduct).image || (product as any).image || '';
    imageSrc = fixImagePathForProduction(staticImageSrc);
  } else if (product.image) {
    // For Sanity products, use the improved getImageUrl helper first
    imageSrc = getImageUrl(product.image, '');
    
    // Only apply path fixing if it's not already a Sanity CDN URL
    if (imageSrc && !imageSrc.includes('cdn.sanity.io')) {
      imageSrc = fixImagePathForProduction(imageSrc);
    }
  }

  const isOutOfStock = stockStatus && !stockStatus.inStock;

  return (
    <div className="group relative block w-full">
      <Link href={productHref} className="block">
        <div 
          className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Badges container */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {isNew && (
              <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                NEW
              </span>
            )}
          </div>

          {/* Product Image */}
          {(product.image || imageSrc) ? (
            <ProductionImage
              src={product.image || imageSrc}
              alt={productName || 'Product image'}
              fill
              className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">
                {imageSrc ? 'Invalid image' : 'No image'}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={productHref}>
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors cursor-pointer">
            {productName}
          </h3>
        </Link>
        
        {/* Brand */}
        <p className="text-xs text-gray-500 mb-2">
          {productBrand}
        </p>

        {/* Price and Quantity */}
        {showPrice && (
          <div className="space-y-3">
            <span className="text-lg font-semibold text-gray-900">
              kr {productPrice.toLocaleString()}
            </span>
            
            {/* Quantity Selector and Add to Cart */}
            <div className="flex items-center gap-2">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  className="px-2 py-1 text-sm hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    const input = e.currentTarget.nextElementSibling as HTMLInputElement;
                    if (input && parseInt(input.value) > 1) {
                      input.value = (parseInt(input.value) - 1).toString();
                    }
                  }}
                >
                  −
                </button>
                <input 
                  type="number" 
                  min="1" 
                  max={stockStatus?.quantity || 99}
                  defaultValue="1"
                  className="w-12 text-center text-sm border-0 focus:ring-0 focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
                <button 
                  className="px-2 py-1 text-sm hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    const maxQty = stockStatus?.quantity || 99;
                    if (input && parseInt(input.value) < maxQty) {
                      input.value = (parseInt(input.value) + 1).toString();
                    }
                  }}
                >
                  +
                </button>
              </div>
              
              {/* Add to Cart Button */}
              <button 
                className={`flex-1 px-3 py-1 text-xs font-medium rounded transition-colors ${
                  isOutOfStock 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
                disabled={isOutOfStock}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isOutOfStock) {
                    const quantityInput = e.currentTarget.parentElement?.querySelector('input[type="number"]') as HTMLInputElement;
                    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                    
                    // Create a product object compatible with the cart system
                    const cartProduct = {
                      _id: productId.toString(),
                      name: productName,
                      price: productPrice,
                      image: imageSrc,
                      slug: { current: productId.toString() }
                    };
                    
                    // Import and use the cart store
                    import('@/app/(store)/store').then(({ UseBasketStore }) => {
                      const { addItemWithQuantity } = UseBasketStore.getState();
                      addItemWithQuantity(cartProduct as any, quantity);
                    });
                  }
                }}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductThumbWithStock;
