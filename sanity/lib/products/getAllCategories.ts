import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const ALL_CATEGORIES_QUERY = defineQuery(`
    *[_type == "category"] {
      _id,
      title,
      slug,
      description
    } | order(title asc)
  `);

  try {
    console.log("Fetching all categories...");
    // Use sanityFetch to send the query to the Sanity server
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    });

    console.log("Categories found:", categories.data?.length || 0);
    // Return the data array from the result, or an empty array if none are found
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
    return [];
  }
};
