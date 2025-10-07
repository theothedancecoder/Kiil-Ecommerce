import LouisPoulsenProductClient from "./LouisPoulsenProductClient";

// Static generation with revalidation
export const revalidate = 60; // Revalidate every minute for fresh data

// Generate static params for all Louis Poulsen products
export async function generateStaticParams() {
  try {
    const { getLouisPoulsenProducts } = await import("@/sanity/lib/products/getLouisPoulsenProducts");
    const products = await getLouisPoulsenProducts();
    
    return products.map((product: any) => ({
      productId: product.slug?.current || product._id,
    }));
  } catch (error) {
    console.error('Error generating static params for Louis Poulsen:', error);
    return [];
  }
}

// Allow dynamic params for new products
export const dynamicParams = true;

export default async function LouisPoulsenProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  
  return <LouisPoulsenProductClient params={{ productId }} />;
}
