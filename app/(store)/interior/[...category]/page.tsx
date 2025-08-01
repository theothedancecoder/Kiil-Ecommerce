import InteriorBanner from "@/components/InteriorBanner";
import InteriorSubBanner from "@/components/InteriorSubBanner";
import InteriorSidebar from "@/components/InteriorSidebar";
import ProductGrid from "@/components/ProductGrid";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import InteriorFurnitureGrid from "@/components/InteriorFurnitureGrid";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";
import { cushionsData } from "@/lib/cushionsData";
import { wallArtData } from "@/lib/wallArtData";
import { throwsData } from "@/lib/throwsData";
import { decorData } from "@/lib/decorData";
import { mirrorsData } from "@/lib/mirrorsData";
import { getRoCollectionTables, getRoCollectionChairs } from "@/sanity/lib/products/getRoCollectionProducts";
import { getLivingRoomFurniture } from "@/sanity/lib/products/getLivingRoomFurniture";
import { flosProducts } from "@/lib/flosProducts";
import { louisPoulsenProducts } from "@/lib/louisPoulsenProducts";

export default async function CategoryPage({ params }: { params: Promise<{ category: string[] }> }) {
  const resolvedParams = await params;
  
  const categorySlug = resolvedParams.category[resolvedParams.category.length - 1];
  
  // Debug logging
  console.log('Category array:', resolvedParams.category);
  console.log('Category slug:', categorySlug);
  
  // For cushions, throws, wall-art, decor, mirrors, and RO Collection dining items, use local data instead of Sanity
  let products;
  if (categorySlug === 'cushions') {
    console.log('Using cushions data');
    products = cushionsData;
  } else if (categorySlug === 'throws') {
    console.log('Using throws data');
    products = throwsData;
  } else if (categorySlug === 'wall-art') {
    console.log('Using wall-art data');
    products = wallArtData;
  } else if (categorySlug === 'decor') {
    console.log('Using decor data');
    products = decorData;
  } else if (categorySlug === 'mirrors') {
    console.log('Using mirrors data');
    products = mirrorsData;
  } else if (categorySlug === 'tables' && resolvedParams.category.includes('dining-kitchen')) {
    console.log('Using RO Collection tables data from Sanity');
    products = await getRoCollectionTables();
  } else if (categorySlug === 'chairs' && resolvedParams.category.includes('dining-kitchen')) {
    console.log('Using RO Collection chairs data from Sanity');
    products = await getRoCollectionChairs();
  } else if (categorySlug === 'furniture' && resolvedParams.category.includes('living-room')) {
    console.log('Using living room furniture data from combined sources');
    products = await getLivingRoomFurniture();
  } else if (categorySlug === 'lighting') {
    console.log('Using static FLOS and Louis Poulsen lighting products');
    products = [...flosProducts, ...louisPoulsenProducts];
  } else {
    console.log('Using Sanity data for category:', categorySlug);
    // For other categories, use designers-guild category since that's where cushion products are stored
    const actualCategorySlug = categorySlug === 'cushions' ? 'designers-guild' : categorySlug;
    products = await getProductByCategory(actualCategorySlug);
  }
  
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
  const isStaticLighting = categorySlug === 'lighting';

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
          title="RO Collection Dining Tables"
          subtitle="Discover our exquisite collection of dining tables from RO Collection. Crafted with premium materials and timeless Scandinavian design, perfect for creating memorable dining experiences."
          imagePath="/Ro-Collection/Salon dining table Ø-120/lifestyle/Gal_6.webp"
        />
      ) : isDiningChairs ? (
        <InteriorSubBanner 
          title="RO Collection Dining Chairs"
          subtitle="Elevate your dining space with our sophisticated collection of dining chairs from RO Collection. Premium leather upholstery meets solid wood craftsmanship for exceptional comfort and style."
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
              ) : (
                <ProductGridWithPagination 
                  products={products as any} 
                  showPrice={isLivingRoomFurniture || isDiningTables || isDiningChairs || isCushions || isThrows || isDecor || isMirrors || isStaticLighting}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
