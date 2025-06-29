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
      {/* Promotional Banner */}
      <div
        className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row bg-[#eff9ff] font-bold text-[#333] text-center select-none"
        style={{
          minHeight: "69.69px",
          fontSize: "14px",
          fontFamily: "'Montserrat', Verdana, Helvetica, sans-serif",
        }}
      >
        <div className="flex-1 flex flex-col justify-center py-3 sm:py-0 px-2 sm:px-4" style={{ lineHeight: "14px" }}>
          <div className="text-xs sm:text-[12.25px] mb-1">50% rabatt på nett og i butikk.</div>
          <div className="text-xs sm:text-[12px]">Outdoor Helios fyrfat</div>
        </div>
        <div className="hidden sm:block w-px bg-[#ccc] mx-3 self-center" style={{ height: "calc(69.69px - 16px)" }} />
        <div className="flex-1 flex flex-col justify-center py-3 sm:py-0 px-2 sm:px-4 border-t border-b sm:border-0 border-[#ccc]" style={{ lineHeight: "14px" }}>
          <div className="text-xs sm:text-[12.25px] mb-1">24% rabatt på alle</div>
          <div className="text-xs sm:text-[12px]">juul sofar/903.</div>
        </div>
        <div className="hidden sm:block w-px bg-[#ccc] mx-3 self-center" style={{ height: "calc(69.69px - 16px)" }} />
        <div className="flex-1 flex flex-col justify-center py-3 sm:py-0 px-2 sm:px-4" style={{ lineHeight: "14px" }}>
          <div className="text-xs sm:text-[12.25px] mb-1">40% rabatt på alle</div>
          <div className="text-xs sm:text-[12px]">Kiil plank spisebord</div>
        </div>
      </div>

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
