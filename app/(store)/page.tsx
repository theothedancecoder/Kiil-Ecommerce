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
        style={{
          maxWidth: "1024px",
          height: "69.69px",
          backgroundColor: "#eff9ff",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          fontWeight: "bold",
          fontSize: "14px",
          fontFamily: "'Montserrat', Verdana, Helvetica, sans-serif",
          color: "#333",
          textAlign: "center",
          lineHeight: "69.69px",
          userSelect: "none",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", lineHeight: "14px" }}>
          <div style={{ margin: 0, padding: 0, marginBottom: "4px", fontSize: "12.25px" }}>50% rabatt på nett og i butikk.</div>
          <div style={{ margin: 0, padding: 0, fontSize: "12px" }}>Outdoor Helios fyrfat</div>
        </div>
        <div
          style={{
            width: "1px",
            backgroundColor: "#ccc",
            margin: "8px 12px",
            alignSelf: "center",
            height: "calc(69.69px - 16px)",
          }}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", lineHeight: "14px" }}>
          <div style={{ margin: 0, padding: 0, marginBottom: "4px", fontSize: "12.25px" }}>24% rabatt på alle</div>
          <div style={{ margin: 0, padding: 0, fontSize: "12px" }}>juul sofar/903.</div>
        </div>
        <div
          style={{
            width: "1px",
            backgroundColor: "#ccc",
            margin: "8px 12px",
            alignSelf: "center",
            height: "calc(69.69px - 16px)",
          }}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", lineHeight: "14px" }}>
          <div style={{ margin: 0, padding: 0, marginBottom: "4px", fontSize: "12.25px" }}>40% rabatt på alle</div>
          <div style={{ margin: 0, padding: 0, fontSize: "12px" }}>Kiil plank spisebord</div>
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
