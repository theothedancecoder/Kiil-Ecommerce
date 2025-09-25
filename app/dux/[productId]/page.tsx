import { notFound } from "next/navigation";
import DuxProductClient from "./DuxProductClient";

export default async function DuxProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  // Basic validation - let DuxProductClient handle the actual product fetching and validation
  if (!productId) {
    notFound();
  }

  return <DuxProductClient params={{ productId }} />;
}
