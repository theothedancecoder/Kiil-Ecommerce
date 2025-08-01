import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getFlosProducts = async () => {
    const FLOS_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product" && brand == "FLOS"] {
            _id,
            name,
            slug,
            image,
            description,
            price,
            brand,
            categories[]->{
                _id,
                title,
                slug
            },
            variants,
            stock,
            inStock,
            href
        } | order(name asc)
    `);

    try {
        const response = await sanityFetch({
            query: FLOS_PRODUCTS_QUERY,
            params: {},
        });
        return response.data || [];
    } catch (error) {
        console.error("Error fetching FLOS products:", error);
        return [];
    }
}
