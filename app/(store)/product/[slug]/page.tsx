import AddToBasketButton from "@/components/AddToBasketButton"
import { Button } from "@/components/ui/button"
import { imageUrl } from "@/lib/ImageUrl"
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug"
import { PortableText } from "next-sanity"
import Image from "next/image"
import { notFound } from "next/navigation"


//caching next js 15 doesnt auto cache
export const dynamic = "force-static"
export const revalidate = 1800 //30 minutes


 async function ProductPage({params}:{
    params:Promise <{
        slug: string}>}
 ) {
    const {slug} = await params
    const product = await getProductBySlug(slug)

    if(!product){
        return notFound()
    }
    const isOutOfStock = product.stock != null && product.stock <= 0

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`relative aspect-square overflow-hidden rounded-lg 
                shadow-lg ${isOutOfStock ? "opacity-50":""}`}>
                    {product.image && (
                        <Image
                        src={imageUrl(product.image).url()}
                        alt={product.name ?? "Product image"}
                        fill
                        className="object-contain transition-transform duration-300
                        hover:scale-105"/>
                    )}
                    {isOutOfStock && (
                        <div className="absoloute inset-0 flex items-center justify-center
                        bg-black bg-opacity-50">
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                            </div>
                    )}

                </div>
                <div className="flex flex-col justify-between">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="text-xl font-semibold mb-4">
                        kr {product.price?.toFixed(2)}
                    </div>
                    <div className="prose max-w-none mb-6">
                        {Array.isArray(product.description)&&(
                            <PortableText value={product.description} />
                        )}
                    </div>


                </div>
                <div className="mt-6">
                    <AddToBasketButton product={product} disabled ={isOutOfStock}/>
                    <Button>
                    Add to Basket
                    </Button></div>
            </div>
        </div>
     
    </div>
  )
}
export default ProductPage