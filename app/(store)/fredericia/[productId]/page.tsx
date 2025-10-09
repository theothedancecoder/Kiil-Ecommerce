import { getFredericiaProducts, getFredericiaProduct } from "@/sanity/lib/products/getFredericiaProducts";
import { Product } from "@/sanity.types";
import { notFound } from "next/navigation";
import Link from "next/link";
import FredericiaProductClient from "./FredericiaProductClient";

// Use force-static with ISR to avoid freezing - pages are pre-generated at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface FredericiaProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function FredericiaProductPage({ params }: FredericiaProductPageProps) {
  const { productId } = await params;
  
  // Get the specific product directly from Sanity - much more efficient
  const product = await getFredericiaProduct(productId);

  if (!product) {
    notFound();
  }

  // Get all Fredericia products for related products
  const allFredericiaProducts = await getFredericiaProducts();

  // Helper function to convert description (handles both string and block content)
  const convertDescription = (desc: any): string => {
    if (typeof desc === 'string') {
      return desc;
    }
    if (Array.isArray(desc)) {
      return desc
        .filter((block: any) => block?._type === 'block' && 'children' in block)
        .map((block: any) => 
          'children' in block && Array.isArray(block.children)
            ? block.children
                .filter((child: any) => child?._type === 'span')
                .map((child: any) => child?.text)
                .join(' ')
            : ''
        )
        .join(' ');
    }
    return '';
  };

  // Convert Sanity product to format expected by FredericiaProductClient
  const convertedProduct = {
    id: product._id,
    name: product.name,
    description: convertDescription(product.description) || 'Detailed product description available upon request.',
    descriptionNo: convertDescription((product as any).descriptionNo) || convertDescription(product.description) || 'Detaljert produktbeskrivelse tilgjengelig på forespørsel.',
    price: product.price || 0,
    category: product.categories?.[0]?.title || 'Furniture',
    variants: product.variants?.map((variant: any) => ({
      name: variant.name || variant.color || variant.material || 'Default',
      image: variant.image?.asset?.url || '',
      material: variant.material || variant.color || '',
      price: variant.price || product.price || 0,
      size: variant.size || undefined,
    })) || [],
    designer: 'Fredericia Design Team',
    features: [
      'Premium Scandinavian design',
      'High-quality materials',
      'Contemporary aesthetic',
      'Durable construction',
      'Multiple finish options',
      'Sustainable materials',
      'Danish craftsmanship',
      'Timeless design',
    ],
    specifications: [
      { label: "Designer", value: "Fredericia Design Team" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Brand", value: product.brand || "Fredericia" },
      { label: "Category", value: product.categories?.[0]?.title || "Furniture" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "SKU", value: product._id },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: product.lifestyleImages?.map((img: any) => img.asset?.url).filter(Boolean) || [],
    relatedProducts: [], // Could be enhanced to find related products
  };

  // Get other Fredericia products for the client
  const fredericiaProducts = allFredericiaProducts
    .map((p: any) => ({
      id: p._id,
      name: p.name,
      slug: p.slug?.current,
    }));

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/fredericia" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Fredericia Collection
          </Link>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-stone-600 hover:text-stone-800">
              Home
            </Link>
            <span className="text-stone-400">/</span>
            <Link href="/fredericia" className="text-stone-600 hover:text-stone-800">
              Fredericia
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <FredericiaProductClient product={convertedProduct} products={fredericiaProducts} />
    </div>
  );
}

// Generate static params for all Fredericia products at build time
export async function generateStaticParams() {
  try {
    const fredericiaProducts = await getFredericiaProducts();
    
    return fredericiaProducts
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for Fredericia products:', error);
    return [];
  }
}

// Allow dynamic params for new products not yet in the static build
export const dynamicParams = true;

// Legacy static products data - keeping for fallback but not used when Sanity is available
const legacyProducts = [
  {
    id: "bm71-library-table",
    name: "BM71 Library Table",
    description: "Elegant library table designed with clean lines and premium materials. Perfect for modern workspaces and home offices.",
    price: 75750,
    category: "Tables",
    variants: [
      {
        name: "Premium Oak",
        image: "/fredericia/bm71-library-table/main.jpg",
        material: "Premium oak",
        price: 75750,
      },
    ],
    designer: "Fredericia Design Team",
    features: [
      "Premium solid wood construction",
      "Clean lines and modern design",
      "Perfect for workspaces and home offices",
      "Durable finish",
      "Contemporary Scandinavian design",
      "Sustainable materials",
      "Handcrafted details",
      "Suitable for professional environments",
    ],
    specifications: [
      { label: "Designer", value: "Fredericia Design Team" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Premium oak" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Dimensions", value: "H: 74cm, W: 160cm, D: 80cm" },
      { label: "Care", value: "Dust regularly, use wood care products" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: ["/fredericia/bm71-library-table/lifestyle1.jpg"],
    relatedProducts: [
      { id: "mogensen-6284-dining-table", name: "Mogensen 6284 Dining Table" },
      { id: "piloti-coffee-table", name: "Piloti Coffee Table" },
      { id: "risom-magazine-table", name: "Risom Magazine Table" }
    ],
  },
  {
    id: "wegner-ox-chair",
    name: "Wegner Ox Chair",
    description: "Iconic Ox Chair designed by Hans J. Wegner. A masterpiece of Danish furniture design with exceptional comfort and style.",
    price: 139995,
    category: "Chairs",
    variants: [
      {
        name: "Essene Cognac",
        image: "/fredericia/wegner-ox-chair/main.jpg",
        material: "Premium leather",
        price: 139995,
      },
    ],
    designer: "Hans J. Wegner",
    features: [
      "Designed by Hans J. Wegner",
      "Iconic Danish furniture design",
      "Premium leather upholstery",
      "Exceptional comfort and style",
      "Masterpiece of craftsmanship",
      "Timeless design",
      "Museum-quality construction",
      "Perfect for living rooms and studies",
    ],
    specifications: [
      { label: "Designer", value: "Hans J. Wegner" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Premium leather with solid wood frame" },
      { label: "Upholstery", value: "Essene Cognac leather" },
      { label: "Style", value: "Mid-century modern" },
      { label: "Care", value: "Professional leather care recommended" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [],
    relatedProducts: [
      { id: "wegner-j16-rocking-chair", name: "Wegner J16 Rocking Chair" },
      { id: "ej-5-corona-armchair", name: "EJ 5 Corona Armchair" },
      { id: "the-canvas-chair", name: "The Canvas Chair" }
    ],
  },
  // ... other legacy products would continue here
];
