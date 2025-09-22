import { defineQuery } from "next-sanity";
import { client } from "../client";

export const getHayProducts = async () => {

  const HAY_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && brand == "HAY"] {
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
    console.log("Fetching HAY products from Sanity...");
    const result = await client.fetch(HAY_PRODUCTS_QUERY);

    console.log(`Found ${result?.length || 0} HAY products in Sanity`);
    return result || [];
  } catch (error) {
    console.error("Error fetching HAY products from Sanity:", error);
    return [];
  }
};

// Get HAY products by category
export const getHayProductsByCategory = async (category?: string) => {

  const categoryFilter = category && category !== "All" 
    ? `&& count(categories[title match "${category}"]) > 0` 
    : "";

  const HAY_PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "product" && brand == "HAY" ${categoryFilter}] {
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
    const result = await client.fetch(HAY_PRODUCTS_BY_CATEGORY_QUERY);

    return result || [];
  } catch (error) {
    console.error(`Error fetching HAY products for category ${category}:`, error);
    return [];
  }
};

// Get single HAY product by slug
export const getHayProduct = async (slug: string) => {

  const HAY_PRODUCT_QUERY = defineQuery(`*[_type == "product" && brand == "HAY" && slug.current == $slug][0] {
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
    const result = await client.fetch(HAY_PRODUCT_QUERY, { slug });

    return result || null;
  } catch (error) {
    console.error(`Error fetching HAY product with slug ${slug}:`, error);
    return null;
  }
};

// Get HAY product categories
export const getHayCategories = async () => {

  const HAY_CATEGORIES_QUERY = defineQuery(`*[_type == "product" && brand == "HAY"] {
    categories[]->{
      title,
      slug
    }
  }`);

  try {
    const result = await client.fetch(HAY_CATEGORIES_QUERY);

    // Extract unique categories
    const allCategories = result?.flatMap((product: any) => product.categories || []) || [];
    const uniqueCategories = allCategories.filter((category: any, index: number, self: any[]) => 
      index === self.findIndex((c: any) => c.title === category.title)
    );

    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching HAY categories:", error);
    return [];
  }
};
