import { notFound } from "next/navigation";
import { cushionsData } from "@/lib/cushionsData";
import Image from "next/image";
import Link from "next/link";
import CushionProductClient from "./CushionProductClient";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function CushionProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.productId;

  // Find the product in our cushions data
  const product = cushionsData.find(p => p.slug.current === productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <Link href="/interior" className="hover:text-stone-800">Interior</Link>
            <span>/</span>
            <Link href="/interior/home-accessories" className="hover:text-stone-800">Home Accessories</Link>
            <span>/</span>
            <Link href="/interior/home-accessories/cushions" className="hover:text-stone-800">Cushions</Link>
            <span>/</span>
            <span className="text-stone-800">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Details */}
          <CushionProductClient product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif text-primary mb-8">Related Cushions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cushionsData
              .filter(p => p._id !== product._id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/interior/home-accessories/cushions/${relatedProduct.slug.current}`}
                  className="group"
                >
                  <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">{relatedProduct.brand}</p>
                  <p className="font-semibold text-sm">NOK {relatedProduct.price.toLocaleString()}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// Generate static params for all cushion products
export async function generateStaticParams() {
  return cushionsData.map((product) => ({
    productId: product.slug.current,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.productId;
  const product = cushionsData.find(p => p.slug.current === productId);

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
