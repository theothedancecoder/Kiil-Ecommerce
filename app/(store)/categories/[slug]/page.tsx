import ProductsView from "@/components/ProductsView"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory"
import { Product, Category } from "@/sanity.types"

async function CategoryPage({params}:{
    params: Promise<{
        slug: string
    }>
}) {
    let products: any[] = [];
    let categories: any[] = [];

    try {
        const { slug } = await params
        console.log("Category page - received slug:", slug)
        
        console.log("Category page - fetching data...")
        const [fetchedProducts, fetchedCategories] = await Promise.all([
            getProductByCategory(slug),
            getAllCategories()
        ])

        products = fetchedProducts;
        categories = fetchedCategories;

        console.log("Category page - fetched products:", products)
        console.log("Category page - fetched categories:", categories)

        if (!products || products.length === 0) {
            console.log("No products found for category:", slug)
        }
    } catch (error) {
        console.error("Error in category page:", error)
        throw error
    }

    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <ProductsView products={products as Product[]} categories={categories as Category[]}/>
            </div>
        </div>
    )
}

export default CategoryPage
