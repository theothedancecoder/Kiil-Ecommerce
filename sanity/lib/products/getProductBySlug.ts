import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getProductBySlub =async (slug: string) =>{
    const PRODUCT_BY_ID_QUERY = defineQuery (`
        *[_type =="product"
        && slug.current == $slug]
        |order(name asc)[0]`)

        try{
            //use sanityFetch to send the query and pass the search parameter with a wildcard
            const product = await sanityFetch({
                query: PRODUCT_BY_ID_QUERY,
                params: {slug},
            })
            //Return the  product, or null if not found
            return product.data || null
        } catch (error) {
            console.error("Error fetching products by ID:", error)
            return null
    }
}