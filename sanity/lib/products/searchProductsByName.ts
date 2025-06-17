import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchParams: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[_type == "product" && name match $searchParam]
    | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `*${searchParams}*`, // ✅ Correct wildcard pattern
      },
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return [];
  }
};
