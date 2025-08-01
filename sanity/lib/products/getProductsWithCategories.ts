import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getProductsWithCategories = async () => {
    // TEMPORARILY HIDDEN: All Sanity products are hidden from the webapp
    // To re-enable, uncomment the code below and remove the return statement
    
    /*
    const PRODUCTS_WITH_CATEGORIES_QUERY = defineQuery(`
        *[_type == "product"] {
            _id,
            name,
            slug,
            image,
            description,
            price,
            categories[]->{
                _id,
                title,
                slug
            },
            stock
        } | order(name asc)
    `);

    try {
        const response = await sanityFetch({
            query: PRODUCTS_WITH_CATEGORIES_QUERY,
        });
        return response.data || [];
    } catch (error) {
        console.error("Error fetching products with categories:", error);
        return [];
    }
    */
    
    // Return empty array to hide all Sanity products
    console.log("Sanity products with categories are temporarily hidden from the webapp");
    return [];
}
