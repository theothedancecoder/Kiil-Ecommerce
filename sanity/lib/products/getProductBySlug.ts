import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]
`);

export const getProductBySlug = async (slug: string): Promise<any | null> => {
  if (!slug) {
    throw new Error("Slug parameter is required");
  }

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });

    return product.data || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

export default getProductBySlug;
