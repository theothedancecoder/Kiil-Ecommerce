import { notFound } from "next/navigation";
import { getRoCollectionProductBySlug, getRoCollectionTables } from "@/sanity/lib/products/getRoCollectionProducts";
import RoCollectionTableProductClient from "./RoCollectionTableProductClient";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function RoCollectionTableProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.productId;

  // Find the product in Sanity
  const product = await getRoCollectionProductBySlug(productId);

  if (!product) {
    notFound();
  }

  return <RoCollectionTableProductClient product={product} />;
}

// Generate static params for all RO Collection table products
export async function generateStaticParams() {
  const tables = await getRoCollectionTables();
  return tables.map((product) => ({
    productId: product.slug?.current || '',
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.productId;
  const product = await getRoCollectionProductBySlug(productId);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - RO Collection | Kiil`,
    description: typeof product.description === 'string' ? product.description : 'Premium dining table from RO Collection',
  };
}
