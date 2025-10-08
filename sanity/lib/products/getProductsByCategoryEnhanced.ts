import { getAllProducts } from "./getAllProducts";
import { getImageUrl } from "@/lib/ImageUrl";

// Helper function to get product link based on brand
function getProductLink(product: any): string {
  const brand = product.brand?.toLowerCase().replace(/\s+/g, '-') || '';
  const slug = product.slug?.current || product._id;
  
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
    'søren-lund': '/soren-lund',
    'serax': '/serax',
    'tradition': '/tradition',
    '&tradition': '/tradition',
    'audo-copenhagen': '/audo-copenhagen',
    'juul': '/juul',
    'crafts': '/crafts',
    'designers-guild': '/products',
    'enzo-de-gasperi': '/products',
    'missoni-home': '/products',
    'vipp': '/products'
  };
  
  const brandRoute = brandRoutes[brand];
  if (brandRoute) {
    return `${brandRoute}/${slug}`;
  }
  
  return `/products/${slug}`;
}

/**
 * Enhanced function to get products by category with proper filtering and mapping
 */
export async function getProductsByCategoryEnhanced(
  categorySlug: string,
  categoryPath: string[] = []
) {
  try {
    // Get all products from Sanity
    const allProducts = await getAllProducts();
    
    // Filter products based on category
    let filteredProducts = allProducts.filter((product: any) => {
      // Only show in-stock products
      if (product.inStock === false || product.stock === 0) {
        return false;
      }
      
      // Check if product matches the category
      const productCategories = product.categories || [];
      const categoryMatches = productCategories.some((cat: any) => 
        cat.slug?.current === categorySlug
      );
      
      if (categoryMatches) return true;
      
      // Special handling for specific categories
      
      // Lighting: FLOS and Louis Poulsen
      if (categorySlug === 'lighting') {
        return product.brand === 'FLOS' || product.brand === 'Louis Poulsen';
      }
      
      // Cushions and Throws: Designers Guild
      if (categorySlug === 'cushions' || categorySlug === 'throws') {
        return product.brand === 'Designers Guild' && 
               productCategories.some((cat: any) => 
                 cat.slug?.current?.includes(categorySlug)
               );
      }
      
      // Mirrors: Montana mirrors
      if (categorySlug === 'mirrors') {
        return product.brand === 'Montana' && 
               product.name?.toLowerCase().includes('mirror');
      }
      
      // Decor: Various decorative items
      if (categorySlug === 'decor' || categorySlug === 'wall-art') {
        return productCategories.some((cat: any) => 
          cat.slug?.current?.includes('decor') ||
          cat.slug?.current?.includes('wall-art') ||
          cat.slug?.current?.includes('accessories')
        );
      }
      
      // Dining tables and chairs
      if (categorySlug === 'tables' && categoryPath.includes('dining-kitchen')) {
        return productCategories.some((cat: any) => 
          cat.slug?.current === 'dining-tables' ||
          cat.title?.toLowerCase().includes('dining table')
        );
      }
      
      if (categorySlug === 'chairs' && categoryPath.includes('dining-kitchen')) {
        return productCategories.some((cat: any) => 
          cat.slug?.current === 'dining-chairs' ||
          cat.title?.toLowerCase().includes('dining chair')
        );
      }
      
      // Living room furniture
      if (categorySlug === 'furniture' && categoryPath.includes('living-room')) {
        return productCategories.some((cat: any) => 
          cat.slug?.current?.includes('chair') ||
          cat.slug?.current?.includes('sofa') ||
          cat.slug?.current?.includes('table') ||
          cat.title?.toLowerCase().includes('living room')
        );
      }
      
      // Chairs (general living room)
      if (categorySlug === 'chairs' && categoryPath.includes('living-room')) {
        return productCategories.some((cat: any) => 
          cat.slug?.current?.includes('chair') &&
          !cat.slug?.current?.includes('dining')
        );
      }
      
      return false;
    });
    
    // Map products to include proper image URLs and links
    const mappedProducts = filteredProducts.map((product: any) => ({
      ...product,
      image: getImageUrl(product.image, '/placeholder-product.jpg'),
      link: getProductLink(product),
      color: product.variants?.[0]?.color || 'Various',
      material: product.variants?.[0]?.material || 'Various',
      size: product.variants?.[0]?.size || 'Standard'
    }));
    
    return mappedProducts;
  } catch (error) {
    console.error('Error in getProductsByCategoryEnhanced:', error);
    return [];
  }
}
