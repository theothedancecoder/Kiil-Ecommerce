import ProductsView from "@/components/ProductsView"
import { imageUrl } from "@/lib/ImageUrl"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory"
import { getProductBySlub } from "@/sanity/lib/products/getProductBySlug"
import { PortableText } from "next-sanity"
import Image from "next/image"
import { notFound } from "next/navigation"


 async function CategoryPage({params}:{
    params:Promise <{
        slug: string}>}
 ) {
    const {slug} = await params
    const product = await getProductByCategory(slug)
    const categories = await getAllCategories()

    return<div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center" >
            {slug
            .split("_")
            .map((word) =>word.charAt(0).toUpperCase() + word.slice(1))

            .join(" ")}{""}
            Collection
        </h1>
        <ProductsView products={product} categories={categories}/>
        </div>
     </div>



          
     
  
 
}
export default CategoryPage