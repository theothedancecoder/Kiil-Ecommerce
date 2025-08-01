"use client"

import { Product } from "@/sanity.types";
import {AnimatePresence, motion} from 'framer-motion';
import ProductThumb from "./ProductThumb";

function ProductGrid({ products, showPrice = false }: { products: Product[], showPrice?: boolean }) {
    return (
        <div className="relative bg-white">
            {/* Umage-style container with 3-column grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {products?.map((product, index) => (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="w-full group relative"
                            >
                                <ProductThumb 
                                    product={product} 
                                    showPrice={showPrice} 
                                    isNew={index < 8} // Mark first 8 products as "NEW"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default ProductGrid;
