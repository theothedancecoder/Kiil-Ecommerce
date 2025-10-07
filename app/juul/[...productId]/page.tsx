import { getAllProducts } from "@/sanity/lib/products/getAllProductsSimple";
import { Product } from "@/sanity.types";
import { notFound } from "next/navigation";
import JuulProductClient from "./JuulProductClient";

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30 minutes

interface JuulProductPageProps {
  params: Promise<{
    productId: string[];
  }>;
}

export default async function JuulProductPage({ params }: JuulProductPageProps) {
  const { productId } = await params;
  
  // Handle catch-all route: productId is an array of path segments
  // Extract the actual product slug from the last segment
  const actualProductId = Array.isArray(productId) 
    ? productId[productId.length - 1]
    : productId;
  
  // Get all products from Sanity
  const allProducts = await getAllProducts();
  
  // Find the Juul product by matching the productId with the slug
  const product = allProducts.find((p: any) => 
    p.brand === 'Juul' && 
    (p.slug?.current === actualProductId || p._id === actualProductId)
  );

  if (!product) {
    notFound();
  }

  // Prioritize Sanity variants, but ensure at least one variant exists
  const variants = product.variants && product.variants.length > 0
    ? product.variants.map((variant: any) => ({
        name: variant.name || variant.color || variant.material || 'Default',
        image: variant.image?.asset?.url || variant.image || '',
        material: variant.material || variant.color || '',
        price: variant.price || product.price || 0,
        size: variant.size || undefined,
      }))
    : [{
        name: 'Default',
        image: product.image?.asset?.url || product.image || '',
        material: 'Standard',
        price: product.price || 0,
      }];

  // Convert Sanity product to format expected by JuulProductClient
  const convertedProduct = {
    id: product._id,
    name: product.name,
    description: typeof product.description === 'string' 
      ? product.description 
      : Array.isArray(product.description)
        ? product.description
            .filter((block: any) => block._type === 'block' && 'children' in block)
            .map((block: any) => 
              'children' in block && block.children
                ?.filter((child: any) => child._type === 'span')
                ?.map((child: any) => child.text)
                ?.join(' ')
            )
            .join(' ')
        : 'Premium Danish furniture combining exceptional comfort with timeless Scandinavian design.',
    price: product.price || 0,
    category: product.categories?.[0]?.title || 'Furniture',
    variants,
    designer: 'Juul Design Team',
    features: [
      'Premium Danish craftsmanship',
      'Exceptional comfort and support',
      'High-quality materials',
      'Timeless Scandinavian design',
      'Durable construction',
      'Multiple upholstery options',
      'Sustainable materials',
      'Made in Denmark',
    ],
    specifications: [
      { label: "Designer", value: "Juul Design Team" },
      { label: "Manufacturer", value: "Juul" },
      { label: "Brand", value: product.brand || "Juul" },
      { label: "Category", value: product.categories?.[0]?.title || "Furniture" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "SKU", value: product._id },
      { label: "Warranty", value: "5 years manufacturer warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: product.lifestyleImages?.map((img: any) => img.asset?.url).filter(Boolean) || [],
    relatedProducts: [],
  };

  // Get other Juul products for the client
  const juulProducts = allProducts
    .filter((p: any) => p.brand === 'Juul')
    .map((p: any) => ({
      id: p.slug?.current || p._id,
      _id: p._id,
      name: p.name,
      slug: p.slug?.current,
      price: p.price || 0,
      variants: p.variants?.map((variant: any) => ({
        name: variant.name || variant.color || variant.material || 'Default',
        image: variant.image?.asset?.url || variant.image || '',
        material: variant.material || variant.color || '',
        price: variant.price || p.price || 0,
      })) || []
    }));

  return <JuulProductClient product={convertedProduct} products={juulProducts} />;
}

// Generate static params for all Juul products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    
    return products
      .filter((product: any) => product.brand === 'Juul' && product.slug?.current)
      .map((product: any) => ({
        productId: [product.slug!.current], // Return as array for catch-all route
      }));
  } catch (error) {
    console.error('Error generating static params for Juul products:', error);
    return [];
  }
}
