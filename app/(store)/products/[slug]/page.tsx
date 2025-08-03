import { getAllProducts } from "@/sanity/lib/products/getAllProductsSimple";
import { notFound } from 'next/navigation';
import dynamicImport from 'next/dynamic';

const ProductPageClient = dynamicImport(() => import('./ProductPageClient'), {
  ssr: false
});

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30 minutes

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const allProducts = await getAllProducts();
  const product = allProducts.find((p: any) => p.slug?.current === slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    
    return products
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        slug: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
