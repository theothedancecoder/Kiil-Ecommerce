import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getLightingProducts = async () => {
    const LIGHTING_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product" && (brand == "FLOS" || brand == "Louis Poulsen") && "lighting" in categories[]->slug.current] {
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
            stock,
            inStock,
            href
        } | order(brand asc, name asc)
    `);

    try {
        const response = await sanityFetch({
            query: LIGHTING_PRODUCTS_QUERY,
            params: {},
        });
        return response.data || [];
    } catch (error) {
        console.error("Error fetching lighting products:", error);
        return [];
    }
}

export const getFlosProducts = async () => {
    const FLOS_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product" && brand == "FLOS" && "lighting" in categories[]->slug.current] {
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

export const getLouisPoulsenProducts = async () => {
    const LOUIS_POULSEN_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product" && brand == "Louis Poulsen" && "lighting" in categories[]->slug.current] {
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
            stock,
            inStock,
            href
        } | order(name asc)
    `);

    try {
        const response = await sanityFetch({
            query: LOUIS_POULSEN_PRODUCTS_QUERY,
            params: {},
        });
        return response.data || [];
    } catch (error) {
        console.error("Error fetching Louis Poulsen products:", error);
        return [];
    }
}
