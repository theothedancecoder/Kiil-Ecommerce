import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Product } from "@/sanity.types";
import ProductsView from "@/components/ProductsView";

export const dynamic = "force-static";
export const revalidate = 1800; // 30 minutes

export default async function AllProductsPage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-white">
      {/* Products Section */}
      <section className="bg-white">
        <ProductsView 
          products={products as unknown as Product[]}
          categories={categories.map(cat => ({
            _id: cat._id,
            title: cat.title || '',
            slug: {
              current: cat.slug?.current || ''
            }
          }))}
        />
      </section>
    </main>
  );
}
