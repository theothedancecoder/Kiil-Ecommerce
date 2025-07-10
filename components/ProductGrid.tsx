"use client"

import { Product } from "@/sanity.types";
import {AnimatePresence, motion} from 'framer-motion';
import ProductThumb from "./ProductThumb";

function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="relative bg-white">
            {/* Clean, minimal container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 justify-items-center">
                    <AnimatePresence>
                        {products?.map((product) => (
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
                                className="w-full max-w-[194.55px]"
                            >
                                <ProductThumb product={product} showPrice={false} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default ProductGrid;
