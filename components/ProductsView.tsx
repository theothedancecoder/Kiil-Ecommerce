import { Product, ALL_CATEGORIES_QUERYResult } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductsViewProps {
  products: Product[];
  categories: ALL_CATEGORIES_QUERYResult;
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="font-serif text-xl text-primary mb-4">Categories</h3>
            <div className="luxury-card p-4">
              <CategorySelectorComponent categories={categories} />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
