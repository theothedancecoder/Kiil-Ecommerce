import { notFound } from "next/navigation";
import SeraxProductClient from "./SeraxProductClient";

interface SeraxProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function SeraxProductPage({ params }: SeraxProductPageProps) {
  const { productId } = await params;

  // Pass the productId to the client component which will handle Sanity data fetching
  return <SeraxProductClient params={{ productId }} />;
}
