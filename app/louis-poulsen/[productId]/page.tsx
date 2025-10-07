import { getLouisPoulsenProducts, getLouisPoulsenProductBySlug } from "@/sanity/lib/products/getLouisPoulsenProducts";
import { notFound } from "next/navigation";
import LouisPoulsenProductClient from "./LouisPoulsenProductClient";

// Use force-static with ISR to avoid freezing - pages are pre-generated at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface LouisPoulsenProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function LouisPoulsenProductPage({ params }: LouisPoulsenProductPageProps) {
  const { productId } = await params;
  
  // Get the specific product directly
  const product = await getLouisPoulsenProductBySlug(productId);

  if (!product) {
    notFound();
  }

  // Pass the product data to the client component
  return <LouisPoulsenProductClient params={{ productId }} initialProduct={product} />;
}

// Generate static params for all Louis Poulsen products at build time
export async function generateStaticParams() {
  try {
    const louisPoulsenProducts = await getLouisPoulsenProducts();
    
    return louisPoulsenProducts
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for Louis Poulsen:', error);
    return [];
  }
}

// Allow dynamic params for new products not yet in the static build
export const dynamicParams = true;
