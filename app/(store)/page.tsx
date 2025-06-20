import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Product } from "@/sanity.types";

export const dynamic = "force-static";
export const revalidate = 1800; // 30 minutes

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Banner */}
      <div className="relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
        
        {/* Banner */}
        <BlackFridayBanner />
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-8xl mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-16 px-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
              Discover Exceptional Quality
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Explore our curated collection of premium products, crafted for those who appreciate the finest things in life.
            </p>
          </div>

          {/* Products Section */}
          <ProductsView 
            products={products as unknown as Product[]}
            categories={categories}
          />
        </div>
      </section>
    </main>
  );
}
