import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getSaleProducts = async () => {
  // First try to get products with actual sale prices
  const PRODUCTS_WITH_SALES_QUERY = defineQuery(`*[_type == "product" && defined(salePrice) && salePrice < price] {
    _id,
    name,
    slug,
    image {
      ...,
      asset->
    },
    description,
    price,
    salePrice,
    categories[]->{
      _id,
      title,
      slug
    },
    stock
  } | order(name asc)`);

  try {
    const saleResult = await sanityFetch({
      query: PRODUCTS_WITH_SALES_QUERY,
    });

    const saleProducts = saleResult.data || [];
    
    // If we have products with actual sale prices, return them
    if (saleProducts.length > 0) {
      return saleProducts;
    }

    // Fallback: Get all products and apply demo sale logic
    const ALL_PRODUCTS_QUERY = defineQuery(`*[_type == "product"] {
      _id,
      name,
      slug,
      image {
        ...,
        asset->
      },
      description,
      price,
      categories[]->{
        _id,
        title,
        slug
      },
      stock
    } | order(name asc)`);

    const allResult = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    const allProducts = allResult.data || [];
    
    // Apply demo sale logic: every 3rd product gets a 20-30% discount
    return allProducts
      .filter((_: any, index: number) => index % 3 === 0)
      .map((product: any, index: number) => ({
        ...product,
        salePrice: Math.round(product.price * (0.7 + (index % 3) * 0.05)), // 20-30% off
        originalPrice: product.price
      }));

  } catch (error) {
    console.error("Error fetching sale products:", error);
    return [];
  }
};

// Get products that are part of active sales campaigns
export const getProductsWithActiveSales = async () => {
  const PRODUCTS_WITH_ACTIVE_SALES_QUERY = defineQuery(`*[_type == "product" && defined(salePrice) && salePrice < price] {
    _id,
    name,
    slug,
    image {
      ...,
      asset->
    },
    description,
    price,
    salePrice,
    categories[]->{
      _id,
      title,
      slug
    },
    stock,
    "activeSales": *[_type == "sales" && isActive == true && dateTime(validFrom) <= now() && dateTime(validUntil) >= now()]
  } | order(name asc)`);

  try {
    const result = await sanityFetch({
      query: PRODUCTS_WITH_ACTIVE_SALES_QUERY,
    });

    return result.data || [];
  } catch (error) {
    console.error("Error fetching products with active sales:", error);
    return [];
  }
};

// Calculate discount percentage
export const calculateDiscountPercentage = (originalPrice: number, salePrice: number): number => {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};
