import InteriorBanner from "@/components/InteriorBanner";
import InteriorSidebar from "@/components/InteriorSidebar";
import ProductGrid from "@/components/ProductGrid";
import InteriorFurnitureGrid from "@/components/InteriorFurnitureGrid";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";

export default async function CategoryPage({ params }: { params: Promise<{ category: string[] }> }) {
  const resolvedParams = await params;
  
  const categorySlug = resolvedParams.category[resolvedParams.category.length - 1];
  const products = await getProductByCategory(categorySlug);
  
  // Get category title from the last segment of the path
  const categoryTitle = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main className="min-h-screen bg-background">
      <InteriorBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                {categoryTitle}
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Browse our {categoryTitle.toLowerCase()} collection
              </p>
            </div>
            <div className="max-w-8xl mx-auto">
              {(categorySlug === 'all-interior-furniture' || categorySlug === 'all') ? (
                <InteriorFurnitureGrid />
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
