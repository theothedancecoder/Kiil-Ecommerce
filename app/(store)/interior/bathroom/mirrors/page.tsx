import InteriorSubBanner from "@/components/InteriorSubBanner";
import InteriorSidebar from "@/components/InteriorSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import { mirrorsData } from "@/lib/mirrorsData";
import { Product } from "@/sanity.types";

export default function MirrorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <InteriorSubBanner 
        title="Designer Mirrors Collection"
        subtitle="Transform your space with our sophisticated collection of Montana mirrors. From minimalist designs to functional pieces with integrated shelving, find the perfect mirror to enhance your interior."
        imagePath="/interior-collection/mirrors-banner.jpg"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                Mirrors
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Browse our mirrors collection
              </p>
            </div>
            <div className="max-w-8xl mx-auto">
              <ProductGridWithPagination products={mirrorsData as unknown as Product[]} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
