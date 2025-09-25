import { notFound } from "next/navigation";
import FlosProductClient from "./FlosProductClient";

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