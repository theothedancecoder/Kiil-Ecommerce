

import { Product, ALL_CATEGORIES_QUERYResult } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductsViewProps {
  products: Product[];
  categories: ALL_CATEGORIES_QUERYResult
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {

    return (
      <div className="flex flex-col">
        {/*categories*/}  
        <div className="w-full sm:w-[200px]">
          <CategorySelectorComponent categories ={categories}/>
        </div>

        {/*products*/}
        <div className="flex-1">
          <div>
            <ProductGrid products={products}/> 
            <hr className="w-1/2 sm:s-3/4"/>
          </div>
        </div>


      </div>
    )
  }    

export default ProductsView;
