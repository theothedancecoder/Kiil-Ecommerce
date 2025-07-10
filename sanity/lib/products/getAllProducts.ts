import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
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

  try {
    // Use sanityFetch to send the query to the Sanity server
    const result = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    // Return the data array from the result, or an empty array if none are found
    return result.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};
