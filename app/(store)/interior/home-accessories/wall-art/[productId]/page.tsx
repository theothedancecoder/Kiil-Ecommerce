import { notFound } from "next/navigation";
import { wallArtData } from "@/lib/wallArtData";
import WallArtProductClient from "./WallArtProductClient";

interface WallArtProductPageProps {
  params: {
    productId: string;
  };
}

export default function WallArtProductPage({ params }: WallArtProductPageProps) {
  const product = wallArtData.find(p => p.slug.current === params.productId);

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
  const product = wallArtData.find(p => p.slug.current === params.productId);

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
