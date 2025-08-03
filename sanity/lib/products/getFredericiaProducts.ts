import { defineQuery } from "next-sanity";
import { client } from "../client";

export const getFredericiaProducts = async () => {
  const FREDERICIA_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && brand == "Fredericia"] {
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
    console.log("Fetching Fredericia products from Sanity...");
    const result = await client.fetch(FREDERICIA_PRODUCTS_QUERY);
    console.log(`Found ${result?.length || 0} Fredericia products in Sanity`);
    return result || [];
  } catch (error) {
    console.error("Error fetching Fredericia products from Sanity:", error);
    return [];
  }
};

export const getFredericiaProductsByCategory = async (category: string) => {
  const categoryFilter = category && category !== "All"
    ? `&& count(categories[title match "${category}"]) > 0`
    : "";

  const FREDERICIA_PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "product" && brand == "Fredericia" ${categoryFilter}] {
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
    const result = await client.fetch(FREDERICIA_PRODUCTS_BY_CATEGORY_QUERY);
    return result || [];
  } catch (error) {
    console.error(`Error fetching Fredericia products for category ${category}:`, error);
    return [];
  }
};

export const getFredericiaProduct = async (slug: string) => {
  const FREDERICIA_PRODUCT_QUERY = defineQuery(`*[_type == "product" && brand == "Fredericia" && slug.current == $slug][0] {
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
    const result = await client.fetch(FREDERICIA_PRODUCT_QUERY, { slug });
    return result || null;
  } catch (error) {
    console.error(`Error fetching Fredericia product with slug ${slug}:`, error);
    return null;
  }
};

export const getFredericiaCategories = async () => {
  const FREDERICIA_CATEGORIES_QUERY = defineQuery(`*[_type == "product" && brand == "Fredericia"] {
    categories[]->{
      title,
      slug
    }
  }`);

  try {
    const result = await client.fetch(FREDERICIA_CATEGORIES_QUERY);
    const allCategories = result?.flatMap((product: any) => product.categories || []) || [];
    const uniqueCategories = allCategories.filter((category: any, index: number, self: any[]) =>
      index === self.findIndex((c: any) => c.title === category.title)
    );
    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching Fredericia categories:", error);
    return [];
  }
};
