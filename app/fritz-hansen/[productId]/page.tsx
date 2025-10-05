import { getFritzHansenProducts, getFritzHansenProductBySlug } from "@/sanity/lib/products/getFritzHansenProducts";
import { notFound } from "next/navigation";
import FritzHansenProductClient from "./FritzHansenProductClient";

// Use force-static with ISR to avoid freezing - pages are pre-generated at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface FritzHansenProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function FritzHansenProductPage({ params }: FritzHansenProductPageProps) {
  const { productId } = await params;
  
  // Get the specific product directly - much more efficient than fetching all products
  const product = await getFritzHansenProductBySlug(productId);

  if (!product) {
    notFound();
  }

  // Get all Fritz Hansen products for related products
  const allFritzHansenProducts = await getFritzHansenProducts();

  // Create variants array from Sanity data
  const variants = product.variants && Array.isArray(product.variants) && product.variants.length > 0 
    ? product.variants.map((variant: any) => ({
        name: variant?.name || 'Standard',
        image: variant?.image?.asset?.url || product?.images?.[0]?.asset?.url || '/placeholder-image.jpg',
        price: variant?.price || product?.price || 0,
      }))
    : [{
        name: 'Standard',
        image: product?.images?.[0]?.asset?.url || '/placeholder-image.jpg',
        price: product?.price || 0,
      }];

  // Convert to client format
  const convertedProduct = {
    id: product.slug?.current || product._id,
    name: product.name || 'Unnamed Product',
    description: product.description || 'No description available',
    price: product.price || 0,
    image: product?.images?.[0]?.asset?.url || '/placeholder-image.jpg',
    variants,
    category: product.categories?.[0]?.title || 'Furniture',
    details: {
      'Brand': 'Fritz Hansen',
      'Category': product.categories?.[0]?.title || 'Furniture',
      'SKU': product._id,
      'In Stock': product.inStock ? 'Yes' : 'No',
    },
    lifestyleImages: product.images?.slice(1).map((img: any) => ({
      src: img?.asset?.url,
      alt: img?.alt || product.name
    })).filter((img: any) => img.src) || [],
  };

  // Get other Fritz Hansen products for the client
  const fritzHansenProducts = allFritzHansenProducts
    ?.map((p: any) => ({
      id: p?.slug?.current || p?._id,
      name: p?.name || 'Unnamed Product',
      slug: p?.slug?.current,
      price: p?.price || 0,
      variants: p?.variants && Array.isArray(p.variants) && p.variants.length > 0 
        ? p.variants.map((variant: any) => ({
            name: variant?.name || 'Standard',
            image: variant?.image?.asset?.url || p?.images?.[0]?.asset?.url || '/placeholder-image.jpg',
            price: variant?.price || p?.price || 0,
          }))
        : [{
            name: 'Standard',
            image: p?.images?.[0]?.asset?.url || '/placeholder-image.jpg',
            price: p?.price || 0,
          }],
    })) || [];

  return <FritzHansenProductClient product={convertedProduct} products={fritzHansenProducts} />;
}

// Generate static params for all Fritz Hansen products at build time
export async function generateStaticParams() {
  try {
    const fritzHansenProducts = await getFritzHansenProducts();
    
    return fritzHansenProducts
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for Fritz Hansen:', error);
    return [];
  }
}

// Allow dynamic params for new products not yet in the static build
export const dynamicParams = true;
