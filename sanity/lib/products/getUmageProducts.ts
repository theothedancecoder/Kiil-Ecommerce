import { defineQuery } from "next-sanity";
import { client } from "../client";

export const getUmageProducts = async () => {

  const UMAGE_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && brand == "UMAGE"] {
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
    console.log("Fetching UMAGE products from Sanity...");
    const result = await client.fetch(UMAGE_PRODUCTS_QUERY);

    console.log(`Found ${result?.length || 0} UMAGE products in Sanity`);
    return result || [];
  } catch (error) {
    console.error("Error fetching UMAGE products from Sanity:", error);
    return [];
  }
};

// Get UMAGE products by category
export const getUmageProductsByCategory = async (category?: string) => {

  const categoryFilter = category && category !== "All" 
    ? `&& count(categories[title match "${category}"]) > 0` 
    : "";

  const UMAGE_PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "product" && brand == "UMAGE" ${categoryFilter}] {
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
    const result = await client.fetch(UMAGE_PRODUCTS_BY_CATEGORY_QUERY);

    return result || [];
  } catch (error) {
    console.error(`Error fetching UMAGE products for category ${category}:`, error);
    return [];
  }
};

// Get single UMAGE product by slug
export const getUmageProduct = async (slug: string) => {

  const UMAGE_PRODUCT_QUERY = defineQuery(`*[_type == "product" && brand == "UMAGE" && slug.current == $slug][0] {
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
  }`);

  try {
    const result = await client.fetch(UMAGE_PRODUCT_QUERY, { slug });

    return result || null;
  } catch (error) {
    console.error(`Error fetching UMAGE product with slug ${slug}:`, error);
    return null;
  }
};

// Get UMAGE product categories
export const getUmageCategories = async () => {

  const UMAGE_CATEGORIES_QUERY = defineQuery(`*[_type == "product" && brand == "UMAGE"] {
    categories[]->{
      title,
      slug
    }
  }`);

  try {
    const result = await client.fetch(UMAGE_CATEGORIES_QUERY);

    // Extract unique categories
    const allCategories = result?.flatMap((product: any) => product.categories || []) || [];
    const uniqueCategories = allCategories.filter((category: any, index: number, self: any[]) => 
      index === self.findIndex((c: any) => c.title === category.title)
    );

    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching UMAGE categories:", error);
    return [];
  }
};
