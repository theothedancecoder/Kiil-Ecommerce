import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// Feature flag to control data source
const USE_SANITY_PRODUCTS = process.env.USE_SANITY_PRODUCTS === 'true';

export const getAllProducts = async () => {
  if (!USE_SANITY_PRODUCTS) {
    console.log("Sanity products are disabled. Set USE_SANITY_PRODUCTS=true to enable.");
    return [];
  }

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
    brand,
    categories[]->{
      _id,
      title,
      slug
    },
    href,
    variants[] {
      name,
      image {
        ...,
        asset->
      },
      color,
      material,
      size,
      price
    },
    lifestyleImages[] {
      ...,
      asset->
    },
    roomCategory,
    stock,
    inStock
  } | order(name asc)`);

  try {
    console.log("Fetching products from Sanity...");
    // Use sanityFetch to send the query to the Sanity server
    const result = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    console.log(`Found ${result.data?.length || 0} products in Sanity`);
    // Return the data array from the result, or an empty array if none are found
    return result.data || [];
  } catch (error) {
    console.error("Error fetching all products from Sanity:", error);
    return [];
  }
};

// Get products by brand
export const getProductsByBrand = async (brand: string) => {
  if (!USE_SANITY_PRODUCTS) {
    return [];
  }

  const PRODUCTS_BY_BRAND_QUERY = defineQuery(`*[_type == "product" && brand == $brand] {
    _id,
    name,
    slug,
    image {
      ...,
      asset->
    },
    description,
    price,
    brand,
    categories[]->{
      _id,
      title,
      slug
    },
    href,
    variants[] {
      name,
      image {
        ...,
        asset->
      },
      color,
      material,
      size,
      price
    },
    lifestyleImages[] {
      ...,
      asset->
    },
    roomCategory,
    stock,
    inStock
  } | order(name asc)`);

  try {
    const result = await sanityFetch({
      query: PRODUCTS_BY_BRAND_QUERY,
      params: { brand }
    });

    return result.data || [];
  } catch (error) {
    console.error(`Error fetching products for brand ${brand}:`, error);
    return [];
  }
};

// Get all brands
export const getAllBrands = async () => {
  if (!USE_SANITY_PRODUCTS) {
    return [];
  }

  const ALL_BRANDS_QUERY = defineQuery(`*[_type == "product"] {
    brand
  } | order(brand asc)`);

  try {
    const result = await sanityFetch({
      query: ALL_BRANDS_QUERY,
    });

    // Extract unique brands
    const brands = [...new Set(result.data?.map((product: any) => product.brand) || [])];
    return brands.filter(Boolean);
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};
