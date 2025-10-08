import { getAllProducts } from "@/sanity/lib/products/getAllProductsSimple";
import MoblerPageClient from "./MoblerPageClient";

// Helper function to check if product is furniture
const isFurnitureProduct = (product: any): boolean => {
  const furnitureCategories = [
    'Seating', 'Chair', 'Sofa', 'Tables', 'Furniture', 
    'Storage', 'Desks', 'Footstools', 'Benches'
  ];
  
  const productName = (product.name || '').toLowerCase();
  const hasFurnitureCategory = product.categories?.some((cat: any) => 
    cat && cat.title && furnitureCategories.includes(cat.title)
  );
  
  const hasFurnitureKeyword = 
    productName.includes('sofa') ||
    productName.includes('chair') ||
    productName.includes('table') ||
    productName.includes('bench') ||
    productName.includes('stool') ||
    productName.includes('footstool') ||
    productName.includes('desk') ||
    productName.includes('storage') ||
    productName.includes('cabinet') ||
    productName.includes('shelf');
  
  return hasFurnitureCategory || hasFurnitureKeyword;
};

export default async function MoblerPage() {
  const allProducts = await getAllProducts();
  const furnitureProducts = allProducts.filter((product: any) => isFurnitureProduct(product));
  
  return <MoblerPageClient initialProducts={furnitureProducts} />;
}
