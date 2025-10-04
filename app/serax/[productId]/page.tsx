import { notFound } from "next/navigation";
import SeraxProductClient from "./SeraxProductClient";

// Static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

interface SeraxProductPageProps {
  params: Promise<{ productId: string }>;
}

// Generate static params for all Serax products
export async function generateStaticParams() {
  try {
    const { getSeraxProducts } = await import("@/sanity/lib/products/getSeraxProducts");
    const products = await getSeraxProducts();
    
    return products.map((product: any) => ({
      productId: product.slug?.current || product._id,
    }));
  } catch (error) {
    console.error('Error generating static params for Serax:', error);
    return [];
  }
}

// Allow dynamic params for new products
export const dynamicParams = true;

export default async function SeraxProductPage({ params }: SeraxProductPageProps) {
  const { productId } = await params;

  // Pass the productId to the client component which will handle Sanity data fetching
  return <SeraxProductClient params={{ productId }} />;
}
