import { notFound } from "next/navigation";
import { roCollectionChairsData } from "@/lib/roCollectionChairsData";
import RoCollectionChairProductClient from "./RoCollectionChairProductClient";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function RoCollectionChairProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.productId;

  // Find the product in our RO Collection chairs data
  const product = roCollectionChairsData.find(p => p.slug.current === productId);

  if (!product) {
    notFound();
  }

  return <RoCollectionChairProductClient product={product} />;
}

// Generate static params for all RO Collection chair products
export async function generateStaticParams() {
  return roCollectionChairsData.map((product) => ({
    productId: product.slug.current,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.productId;
  const product = roCollectionChairsData.find(p => p.slug.current === productId);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - ${product.brand} | Kiil`,
    description: product.description,
  };
}
