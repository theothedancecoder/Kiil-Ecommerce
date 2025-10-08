import NewInteriorBanner from "@/components/NewInteriorBanner";
import InteriorFilterSidebar from "@/components/InteriorFilterSidebar";
import ProductGridWithPagination from "@/components/ProductGridWithPagination";
import Link from "next/link";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getImageUrl } from "@/lib/ImageUrl";
import InteriorPageClient from "./InteriorPageClient";

// Helper function to get product link based on brand
function getProductLink(product: any): string {
  const brand = product.brand?.toLowerCase().replace(/\s+/g, '-') || '';
  const slug = product.slug?.current || product._id;
  
  // Map brands to their routes
  const brandRoutes: { [key: string]: string } = {
    'fritz-hansen': '/fritz-hansen',
    'montana': '/montana',
    'kartell': '/kartell',
    'fredericia': '/fredericia',
    'vitra': '/vitra',
    'flos': '/flos',
    'louis-poulsen': '/louis-poulsen',
    'umage': '/umage',
    'hay': '/hay',
    'dux': '/dux',
    'ro-collection': '/ro-collection',
    'sibast': '/sibast',
    'soren-lund': '/soren-lund',
    'serax': '/serax',
    'tradition': '/tradition',
    'audo-copenhagen': '/audo-copenhagen',
    'juul': '/juul',
    'crafts': '/crafts'
  };
  
  const brandRoute = brandRoutes[brand];
  if (brandRoute) {
    return `${brandRoute}/${slug}`;
  }
  
  // Fallback to generic product page
  return `/products/${slug}`;
}

// Helper function to extract color from variants or product
function getProductColor(product: any): string {
  if (product.variants && product.variants.length > 0) {
    const firstVariant = product.variants[0];
    if (firstVariant.color) return firstVariant.color;
  }
  return 'Various';
}

// Helper function to extract material from variants or product
function getProductMaterial(product: any): string {
  if (product.variants && product.variants.length > 0) {
    const firstVariant = product.variants[0];
    if (firstVariant.material) return firstVariant.material;
  }
  return 'Various';
}

// Helper function to extract size from variants or product
function getProductSize(product: any): string {
  if (product.variants && product.variants.length > 0) {
    const firstVariant = product.variants[0];
    if (firstVariant.size) return firstVariant.size;
  }
  return 'Standard';
}

// Helper function to get category from product
function getProductCategory(product: any): string {
  if (product.categories && product.categories.length > 0) {
    const categorySlug = product.categories[0].slug?.current || '';
    return categorySlug;
  }
  if (product.roomCategory) {
    return product.roomCategory.toLowerCase();
  }
  return 'general';
}

export default async function InteriorPage() {
  // Fetch all products from Sanity
  const allProducts = await getAllProducts();
  
  // Filter for interior products (exclude outdoor products)
  // and only show products that are in stock
  const interiorProducts = allProducts
    .filter((product: any) => {
      // Check if product is in stock
      const isInStock = product.inStock !== false && product.stock !== 0;
      
      // Exclude outdoor products
      const isOutdoor = product.roomCategory?.toLowerCase().includes('outdoor') ||
                       product.categories?.some((cat: any) => 
                         cat.slug?.current?.toLowerCase().includes('outdoor')
                       );
      
      return isInStock && !isOutdoor;
    })
    .map((product: any) => ({
      _id: product._id,
      name: product.name || 'Unnamed Product',
      price: product.price || 0,
      image: getImageUrl(product.image, '/placeholder-product.jpg'),
      category: getProductCategory(product),
      color: getProductColor(product),
      material: getProductMaterial(product),
      brand: product.brand || 'Unknown',
      size: getProductSize(product),
      description: product.description || '',
      link: getProductLink(product),
      slug: product.slug,
      variants: product.variants || [],
      inStock: product.inStock !== false
    }));

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <span className="text-stone-800">Interior</span>
          </div>
        </div>
      </div>

      <NewInteriorBanner />
      
      <InteriorPageClient products={interiorProducts} />
    </main>
  );
}
