import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProductsSimple";
import { Product } from "@/sanity.types";
import ProductsView from "@/components/ProductsView";

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30 minutes

export default async function AllProductsPage() {
  try {
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
  } catch (error) {
    console.error('Error loading products page:', error);
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Products</h1>
          <p className="text-gray-600 mb-4">Unable to load products at the moment.</p>
          <p className="text-sm text-gray-500">Please try again later.</p>
        </div>
      </main>
    );
  }
}
