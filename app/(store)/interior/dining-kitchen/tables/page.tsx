import InteriorSubBanner from "@/components/InteriorSubBanner";
import InteriorSidebar from "@/components/InteriorSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import { roCollectionTablesData } from "@/lib/roCollectionTablesData";

export default async function TablesPage() {
  const products = roCollectionTablesData;

  return (
    <main className="min-h-screen bg-background">
      <InteriorSubBanner 
        title="RO Collection Dining Tables"
        subtitle="Discover our exquisite collection of dining tables from RO Collection. Crafted with premium materials and timeless Scandinavian design, perfect for creating memorable dining experiences."
        imagePath="/Ro-Collection/Salon dining table Ø-120/lifestyle/Gal_6.webp"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                Dining Tables
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Browse our dining tables collection
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
