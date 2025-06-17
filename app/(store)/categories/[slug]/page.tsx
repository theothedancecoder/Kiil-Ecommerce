import ProductsView from "@/components/ProductsView"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory"
import { notFound } from "next/navigation"

async function CategoryPage({params}:{
    params: {
        slug: string
    }
}) {
    const { slug } = params
    console.log("Category page - received slug:", slug)
    
    const [products, categories] = await Promise.all([
        getProductByCategory(slug),
        getAllCategories()
    ])

    console.log("Category page - fetched products:", products?.length)

    if (!products || products.length === 0) {
        console.log("No products found for category:", slug)
    }

    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {slug
                        .split("_")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}{" "}
                    Collection
                </h1>
                <ProductsView products={products} categories={categories}/>
            </div>
        </div>
    )
}

export default CategoryPage
