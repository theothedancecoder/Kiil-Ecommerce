import InteriorBanner from "@/components/InteriorBanner";
import InteriorSubBanner from "@/components/InteriorSubBanner";
import InteriorSidebar from "@/components/InteriorSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import InteriorFurnitureGrid from "@/components/InteriorFurnitureGrid";
import { getProductsByCategoryEnhanced } from "@/sanity/lib/products/getProductsByCategoryEnhanced";

export default async function CategoryPage({ params }: { params: Promise<{ category: string[] }> }) {
  const resolvedParams = await params;
  
  const categorySlug = resolvedParams.category[resolvedParams.category.length - 1];
  
  // Debug logging
  console.log('Category array:', resolvedParams.category);
  console.log('Category slug:', categorySlug);
  
  // Fetch products from Sanity using enhanced function
  const products = await getProductsByCategoryEnhanced(categorySlug, resolvedParams.category);
  
  console.log(`Found ${products.length} products for category: ${categorySlug}`);
  
  // Get category title from the last segment of the path
  const categoryTitle = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Check category types for different banners
  const isWallArt = categorySlug === 'wall-art';
  const isHomeAccessories = resolvedParams.category.includes('home-accessories');
  const isLighting = categorySlug === 'lighting';
  const isCushions = categorySlug === 'cushions';
  const isThrows = categorySlug === 'throws';
  const isDecor = categorySlug === 'decor';
  const isMirrors = categorySlug === 'mirrors';
  const isDiningTables = categorySlug === 'tables' && resolvedParams.category.includes('dining-kitchen');
  const isDiningChairs = categorySlug === 'chairs' && resolvedParams.category.includes('dining-kitchen');
  const isLivingRoomFurniture = categorySlug === 'furniture' && resolvedParams.category.includes('living-room');

  return (
    <main className="min-h-screen bg-background">
      {isLighting ? (
        <InteriorSubBanner 
          title="Designer Lighting Collection"
          subtitle="Discover our complete collection of designer lighting - from iconic chandeliers to contemporary table lamps, each piece represents excellence in lighting design."
          imagePath="/interior-collection/lighting-banner.jpg"
        />
      ) : isCushions ? (
        <InteriorSubBanner 
          title="Designer Cushions Collection"
          subtitle="Transform your living space with our exquisite collection of designer cushions and pillows. From luxurious velvet to contemporary patterns, find the perfect accent pieces to elevate your home decor."
          imagePath="/Montana/Montana_Collection2017_Dream_3000x3000.jpg"
        />
      ) : isThrows ? (
        <InteriorSubBanner 
          title="Designer Throws Collection"
          subtitle="Cozy up with our luxurious collection of designer throws from Designers Guild. Perfect for adding warmth and style to any room."
          imagePath="/Designers-Guild/Throw/Clarendon-Natural-Throw/lifestyle/172817.jpg"
        />
      ) : isDecor ? (
        <InteriorSubBanner 
          title="Designer Decor Collection"
          subtitle="Elevate your interior with our curated collection of designer decorative pieces from Enzo de Gasperi. From elegant vases to ambient lighting, discover unique pieces that add character to your home."
          imagePath="/interior-collection/decor-banner.jpg"
        />
      ) : isMirrors ? (
        <InteriorSubBanner 
          title="Designer Mirrors Collection"
          subtitle="Transform your space with our sophisticated collection of Montana mirrors. From minimalist designs to functional pieces with integrated shelving, find the perfect mirror to enhance your interior."
          imagePath="/interior-collection/mirrors-banner.jpg"
        />
      ) : isDiningTables ? (
        <InteriorSubBanner 
          title="Dining Tables Collection"
          subtitle="Discover our exquisite collection of dining tables. Crafted with premium materials and timeless Scandinavian design, perfect for creating memorable dining experiences."
          imagePath="/Ro-Collection/Salon dining table Ø-120/lifestyle/Gal_6.webp"
        />
      ) : isDiningChairs ? (
        <InteriorSubBanner 
          title="Dining Chairs Collection"
          subtitle="Elevate your dining space with our sophisticated collection of dining chairs. Premium upholstery meets solid wood craftsmanship for exceptional comfort and style."
          imagePath="/Ro-Collection/Salon dining chair/lifestyle/Gal_2_724663c2-5a86-4611-8289-baf4b34e6c5e.webp"
        />
      ) : isLivingRoomFurniture ? (
        <InteriorSubBanner 
          title="Living Room Furniture Collection"
          subtitle="Transform your living space with our curated collection of premium furniture. From iconic chairs and elegant sofas to functional storage solutions, discover pieces that combine Scandinavian design with exceptional craftsmanship."
          imagePath="/living-room-collection.jpg"
        />
      ) : isWallArt || isHomeAccessories ? (
        <InteriorSubBanner 
          title="Wall Art Collection"
          subtitle="Transform your walls with our curated selection of stunning artwork, prints, and decorative pieces that bring personality and style to any space."
          imagePath="/interior-collection/wall-art-banner.jpg"
        />
      ) : (
        <InteriorBanner />
      )}
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
              ) : products.length > 0 ? (
                <ProductGridWithPagination 
                  products={products as any} 
                  showPrice={true}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-stone-600 mb-4">
                    No products found in this category
                  </p>
                  <p className="text-sm text-stone-500">
                    Products may be out of stock or the category is being updated.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
