import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (
  categorySlug: string
): Promise<any[]> => {
  const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
    *[_type == "product" && $categorySlug in categories[]->slug.current]
    | order(name asc)
  `);

  try {
    console.log("Fetching products for category slug:", categorySlug);
    
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: { categorySlug },
    });

    console.log("Products found:", products.data?.length || 0);
    console.log("Products data:", JSON.stringify(products.data, null, 2));

    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};
