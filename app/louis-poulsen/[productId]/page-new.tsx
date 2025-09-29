import LouisPoulsenProductClient from "./LouisPoulsenProductClient";

export default async function LouisPoulsenProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  
  return <LouisPoulsenProductClient params={{ productId }} />;
}
