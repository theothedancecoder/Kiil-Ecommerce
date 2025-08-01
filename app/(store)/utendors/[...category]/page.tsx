import OutdoorBanner from "@/components/outdoorBanner";
import OutdoorSidebar from "@/components/OutdoorSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import OutdoorFurnitureGrid from "@/components/OutdoorFurnitureGrid";
import { outdoorCategoryMappings } from "@/lib/outdoorProducts";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";

// Sub-banner component for outdoor categories
function OutdoorSubBanner({ title, subtitle, imagePath }: { title: string; subtitle: string; imagePath: string }) {
  return (
    <div className="relative h-64 md:h-80 bg-gray-900 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imagePath})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string[] }> }) {
  const resolvedParams = await params;
  
  const categorySlug = resolvedParams.category[resolvedParams.category.length - 1];
  
  // Debug logging
  console.log('Outdoor Category array:', resolvedParams.category);
  console.log('Outdoor Category slug:', categorySlug);
  
  // Get products from outdoor data or fallback to Sanity
  let products;
  if (outdoorCategoryMappings[categorySlug as keyof typeof outdoorCategoryMappings]) {
    console.log('Using outdoor products data for category:', categorySlug);
    products = outdoorCategoryMappings[categorySlug as keyof typeof outdoorCategoryMappings];
  } else {
    console.log('Using Sanity data for outdoor category:', categorySlug);
    products = await getProductByCategory(categorySlug);
  }
  
  // Get category title from the last segment of the path
  const categoryTitle = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Check category types for different banners
  const isFurniture = categorySlug === 'furniture' || categorySlug === 'all';
  const isDiningFurniture = categorySlug === 'dining-sets' || categorySlug === 'dining-tables';
  const isSeating = categorySlug === 'seating-sets' || categorySlug === 'sofas-seating' || categorySlug === 'chaise-lounges';
  const isCushions = categorySlug === 'cushions' || resolvedParams.category.includes('cushions-pillows');
  const isAccessories = categorySlug === 'covers' || categorySlug === 'umbrellas-stands';

  return (
    <main className="min-h-screen bg-background">
      {isDiningFurniture ? (
        <OutdoorSubBanner 
          title="Outdoor Dining Collection"
          subtitle="Create the perfect outdoor dining experience with our premium collection of weather-resistant dining tables and chairs, designed for memorable gatherings under the open sky."
          imagePath="/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-dining-table/lifestyle/1430053-pelagus_table_chair_and_armchair_01_m-jpg.webp"
        />
      ) : isSeating ? (
        <OutdoorSubBanner 
          title="Outdoor Seating Collection"
          subtitle="Relax in style with our comfortable outdoor seating solutions. From lounge chairs to elegant armchairs, find the perfect pieces for your outdoor sanctuary."
          imagePath="/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-lounge-chair/lifestyle/pelagus-16.webp"
        />
      ) : isCushions ? (
        <OutdoorSubBanner 
          title="Outdoor Cushions & Pillows"
          subtitle="Add comfort and style to your outdoor furniture with our premium collection of weather-resistant cushions and pillows in beautiful colors and patterns."
          imagePath="/outdoor/Skagerak-by-Fritz-Hansen/Pelagus-seat-cushion/lifestyle/DFB8C7EB22B041CAB000CCBE112D3FE6_09ab-scaled.webp"
        />
      ) : isAccessories ? (
        <OutdoorSubBanner 
          title="Outdoor Accessories"
          subtitle="Complete your outdoor space with our carefully selected accessories, from protective covers to elegant umbrellas and stands."
          imagePath="/outdoor-collection/outdoor collections banner.jpg"
        />
      ) : (
        <OutdoorBanner />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <OutdoorSidebar />
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
              <ProductGridWithPagination 
                products={products as any} 
                showPrice={true}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
