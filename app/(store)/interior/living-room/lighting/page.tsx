import InteriorSubBanner from "@/components/InteriorSubBanner";
import InteriorSidebar from "@/components/InteriorSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import { getLightingProducts } from "@/sanity/lib/products/getLightingProducts";

export default async function LightingPage() {
  // Fetch both FLOS and Louis Poulsen products for the lighting category
  const products = await getLightingProducts();

  return (
    <main className="min-h-screen bg-background">
      <InteriorSubBanner 
        title="Designer Lighting Collection"
        subtitle="Discover our exclusive collection of iconic lighting designs from FLOS and Louis Poulsen - from Gino Sarfatti's legendary 2097 chandeliers to Poul Henningsen's timeless PH series, each piece represents the pinnacle of lighting excellence."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                Designer Lighting
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Experience lighting excellence with our curated collection of iconic designs from FLOS and Louis Poulsen. From Italian architectural masterpieces to Danish design classics, each piece embodies timeless craftsmanship and innovation.
              </p>
            </div>
            <div className="max-w-8xl mx-auto">
              <ProductGridWithPagination products={products} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
