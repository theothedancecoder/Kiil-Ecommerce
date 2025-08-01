import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getProductByCategory = async (categorySlug: string) => {
    const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
        *[_type == "product" && $categorySlug in categories[]->slug.current] {
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
            query: PRODUCT_BY_CATEGORY_QUERY,
            params: { categorySlug },
        });
        return response.data || [];
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
}
