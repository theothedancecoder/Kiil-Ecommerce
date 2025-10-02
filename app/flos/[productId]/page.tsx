import { notFound } from "next/navigation";
import FlosProductClient from "./FlosProductClient";

// Generate static params for all Flos products
export async function generateStaticParams() {
  try {
    const { getFlosProducts } = await import("@/sanity/lib/products/getFlosProducts");
    const products = await getFlosProducts();
    
    return products.map((product: any) => ({
      productId: product.slug?.current || product._id,
    }));
  } catch (error) {
    console.error('Error generating static params for Flos:', error);
    return [];
  }
}

// Allow dynamic params for new products
export const dynamicParams = true;

export default async function FlosProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  // Basic validation - let FlosProductClient handle the actual product fetching and validation
  if (!productId) {
    notFound();
  }

  return <FlosProductClient params={{ productId }} />;
}
