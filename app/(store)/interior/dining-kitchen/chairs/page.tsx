import InteriorSubBanner from "@/components/InteriorSubBanner";
import InteriorSidebar from "@/components/InteriorSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import { roCollectionChairsData } from "@/lib/roCollectionChairsData";

export default async function DiningChairsPage() {
  const products = roCollectionChairsData;

  return (
    <main className="min-h-screen bg-background">
      <InteriorSubBanner 
        title="RO Collection Dining Chairs"
        subtitle="Elevate your dining space with our sophisticated collection of dining chairs from RO Collection. Premium leather upholstery meets solid wood craftsmanship for exceptional comfort and style."
        imagePath="/Ro-Collection/Salon dining chair/lifestyle/Gal_2_724663c2-5a86-4611-8289-baf4b34e6c5e.webp"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                Dining Chairs
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Browse our dining chairs collection
              </p>
            </div>
            <div className="max-w-8xl mx-auto">
              <ProductGridWithPagination products={products as any} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
