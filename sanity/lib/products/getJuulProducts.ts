import { defineQuery } from "next-sanity";
import { client } from "../client";

export const getJuulProducts = async () => {

  const JUUL_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && brand == "Juul"] {
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
    console.log("Fetching Juul products from Sanity...");
    const result = await client.fetch(JUUL_PRODUCTS_QUERY);

    console.log(`Found ${result?.length || 0} Juul products in Sanity`);
    return result || [];
  } catch (error) {
    console.error("Error fetching Juul products from Sanity:", error);
    return [];
  }
};

// Get Juul products by category
export const getJuulProductsByCategory = async (category?: string) => {

  const categoryFilter = category && category !== "All" 
    ? `&& count(categories[title match "${category}"]) > 0` 
    : "";

  const JUUL_PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "product" && brand == "Juul" ${categoryFilter}] {
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
    const result = await client.fetch(JUUL_PRODUCTS_BY_CATEGORY_QUERY);

    return result || [];
  } catch (error) {
    console.error(`Error fetching Juul products for category ${category}:`, error);
    return [];
  }
};

// Get single Juul product by slug
export const getJuulProduct = async (slug: string) => {

  const JUUL_PRODUCT_QUERY = defineQuery(`*[_type == "product" && brand == "Juul" && slug.current == $slug][0] {
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
    const result = await client.fetch(JUUL_PRODUCT_QUERY, { slug });

    return result || null;
  } catch (error) {
    console.error(`Error fetching Juul product with slug ${slug}:`, error);
    return null;
  }
};

// Get Juul product categories
export const getJuulCategories = async () => {

  const JUUL_CATEGORIES_QUERY = defineQuery(`*[_type == "product" && brand == "Juul"] {
    categories[]->{
      title,
      slug
    }
  }`);

  try {
    const result = await client.fetch(JUUL_CATEGORIES_QUERY);

    // Extract unique categories
    const allCategories = result?.flatMap((product: any) => product.categories || []) || [];
    const uniqueCategories = allCategories.filter((category: any, index: number, self: any[]) => 
      index === self.findIndex((c: any) => c.title === category.title)
    );

    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching Juul categories:", error);
    return [];
  }
};
