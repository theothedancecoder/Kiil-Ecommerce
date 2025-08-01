import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]
`);

export const getProductBySlug = async (slug: string): Promise<any | null> => {
  // TEMPORARILY HIDDEN: All Sanity products are hidden from the webapp
  // To re-enable, uncomment the code below and remove the return statement
  
  /*
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
  */
  
  // Return null to hide all Sanity products
  console.log(`Sanity product with slug "${slug}" is temporarily hidden from the webapp`);
  return null;
};

export default getProductBySlug;
