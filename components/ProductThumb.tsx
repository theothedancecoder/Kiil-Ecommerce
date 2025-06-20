import { imageUrl } from "@/lib/ImageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

function ProductThumb ({product}:{product:Product}) {
    const isOutOfStock = product.stock != null && product.stock <= 0;
    
    return (
        <Link 
            href={`/product/${product.slug?.current}`}
            className={`luxury-card group relative ${isOutOfStock ? "opacity-80" : ""}`}
        >
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
                {product.image && (
                    <div className="absolute inset-0 bg-background/5">
                        <Image
                            className="object-cover object-center transition-transform duration-700 
                                     group-hover:scale-110"
                            src={imageUrl(product.image).url()}
                            alt={product.name || "Product image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                )}
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center 
                                  bg-background/80 backdrop-blur-sm">
                        <span className="text-foreground font-serif text-xl">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="min-h-[6rem] flex flex-col justify-between">
                    <h2 className="font-serif text-xl text-foreground group-hover:text-accent 
                                 transition-colors duration-300">
                        {product.name}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
                        {product.description?.map((block) => 
                            block._type === "block" 
                                ? block.children?.map((child) => child.text).join("") 
                                : ""
                        ).join("") || "No description available"}
                    </p>
                </div>

                {/* Price Tag */}
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <span className="text-xl font-serif text-accent">
                            kr {product.price?.toFixed(2)}
                        </span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="luxury-button text-sm py-2">
                            View Details
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductThumb;
