"use client"

import { Product } from "@/sanity.types";
import {AnimatePresence, motion} from 'framer-motion';
import ProductThumb from "./ProductThumb";

function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="relative">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
                <AnimatePresence>
                    {products?.map((product) => (
                        <motion.div
                            key={product._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            className="flex justify-center transform hover:-translate-y-1 transition-transform duration-300"
                        >
                            <ProductThumb product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ProductGrid;
