import { notFound } from "next/navigation";
import { wallArtData } from "@/lib/wallArtData";
import WallArtProductClient from "./WallArtProductClient";

interface WallArtProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function WallArtProductPage({ params }: WallArtProductPageProps) {
  const { productId } = await params;
  const product = wallArtData.find(p => p.slug.current === productId);

  if (!product) {
    notFound();
  }

  return <WallArtProductClient product={product} />;
}

export async function generateStaticParams() {
  return wallArtData.map((product) => ({
    productId: product.slug.current,
  }));
}

export async function generateMetadata({ params }: WallArtProductPageProps) {
  const { productId } = await params;
  const product = wallArtData.find(p => p.slug.current === productId);

  if (!product) {
    return {
      title: 'Wall Art Not Found',
    };
  }

  return {
    title: `${product.name} - ${product.brand} | Wall Art`,
    description: product.description,
  };
}
