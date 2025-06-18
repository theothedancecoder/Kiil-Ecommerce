import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Product, Category } from "@/sanity.types";


//caching next js 15 doesnt auto cache
export const dynamic = "force-static"
export const revalidate = 1800 //30 minutes



export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <BlackFridayBanner/>
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">

        <ProductsView 
          products={products as unknown as Product[]}
          categories={categories as unknown as Category[]}
        />
      </div>
    </div>
  );
}
